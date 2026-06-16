#!/usr/bin/env python3
"""Search YouTube by category and write results to videos.json."""

import json
import os
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

API_KEY = os.environ.get("YT_API_KEY", "")
if not API_KEY:
    raise SystemExit("[ERROR] YT_API_KEY environment variable is not set.")

YT_BASE = "https://www.googleapis.com/youtube/v3"

# 每個分類對應的搜尋關鍵字（可自行調整）
SEARCHES = [
    ("ai",      "AI tools technology 2026"),
    ("ai",      "artificial intelligence trends 2026"),
    ("design",  "UI UX design trends 2026"),
    ("design",  "graphic design trends 2026"),
    ("finance", "investing stock market outlook 2026"),
    ("finance", "financial trends 2026"),
]

MAX_PER_SEARCH = 6   # 每個關鍵字最多抓幾支
MAX_TOTAL      = 30  # 全部上限


def yt_request(endpoint, params):
    params["key"] = API_KEY
    url = f"{YT_BASE}/{endpoint}?" + urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(url, timeout=15) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        raise RuntimeError(f"HTTP {e.code} {e.reason} — {body}") from e


def month_str(iso_date):
    dt = datetime.fromisoformat(iso_date.replace("Z", "+00:00"))
    return dt.strftime("%b %Y")


# 只抓過去 1 個月的影片
published_after = (
    datetime.now(timezone.utc) - timedelta(days=365)
).strftime("%Y-%m-%dT%H:%M:%SZ")

seen   = set()
videos = []

for cat, query in SEARCHES:
    if len(videos) >= MAX_TOTAL:
        break
    try:
        data = yt_request("search", {
            "q":               query,
            "part":            "id,snippet",
            "type":            "video",
            "order":           "relevance",
            "publishedAfter":  published_after,
            "maxResults":      MAX_PER_SEARCH,
            "relevanceLanguage": "en",
        })
    except Exception as e:
        print(f"[WARN] Search failed for '{query}': {e}")
        continue

    for item in data.get("items", []):
        vid_id = item["id"]["videoId"]
        if vid_id in seen:
            continue
        seen.add(vid_id)
        snippet = item["snippet"]
        videos.append({
            "id": vid_id,
            "t":  snippet["title"],
            "c":  cat,
            "d":  month_str(snippet["publishedAt"]),
        })

# 依發布日期由新到舊排序
def sort_key(v):
    try:
        return datetime.strptime(v["d"], "%b %Y")
    except ValueError:
        return datetime.min

videos.sort(key=sort_key, reverse=True)
videos = videos[:MAX_TOTAL]

output = {
    "updated": datetime.now(timezone.utc).strftime("%Y.%m.%d"),
    "videos":  videos,
}

out_path = os.path.join(os.path.dirname(__file__), "..", "videos.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"✓ Wrote {len(videos)} videos to videos.json (updated: {output['updated']})")
