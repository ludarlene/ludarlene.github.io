# IonexOS Storybook

IonexOS WebKit Design System v1.8 的 React + Storybook 實作。

## 技術棧

- React 18 + TypeScript
- Styled Components 6
- Storybook 8 (with Vite)
- Tokens 來源：Figma Variables

## 快速開始

```bash
# 安裝相依
npm install

# 啟動 Storybook（預設 port: 6006）
npm run storybook

# 建構 Storybook 靜態頁
npm run build-storybook
```

## 目錄結構

```
src/
├── tokens/           # Design tokens（colors, typography, shadow, layout）
│   ├── colors.ts            # 原始色階 primitives
│   ├── semantic-colors.ts   # 語意化 tokens（推薦使用）
│   ├── typography.ts
│   ├── shadows.ts
│   ├── layout.ts            # breakpoints, spacing, radius
│   └── theme.ts             # 整合 theme 物件
├── styles/
│   ├── GlobalStyle.ts       # CSS reset、字型載入
│   └── styled.d.ts          # styled-components 型別擴充
├── components/
│   ├── _foundations/        # tokens 視覺化頁
│   ├── Button/
│   └── Badge/
└── index.ts          # library 出口
```

## 元件開發規範

1. **每個元件一個資料夾**：`Component.tsx`、`Component.stories.tsx`、`index.ts`
2. **樣式來自 theme**：透過 `${({ theme }) => theme.semantic.xxx}` 取值，禁止 hardcode 色碼或尺寸
3. **TypeScript 嚴格**：所有 props 需匯出 type，命名 `ComponentNameProps`
4. **Story 命名**：`Playground`（控制台）、語意化變體（`Primary`、`Outline`...）、`AllVariants`（總覽）
5. **autodocs tag**：所有 stories meta 加上 `tags: ['autodocs']` 自動產生文件

## Figma 同步流程

1. 從 Figma Variables 抓取最新 tokens
2. 更新 `src/tokens/*.ts`
3. 元件樣式檢查是否有需要更新的引用

## 元件路線圖

詳見 `ROADMAP.md`
