# IonexOS Storybook 元件路線圖

## 第一階段（已完成）

### Foundations
- [x] Colors（primitives + semantic）
- [x] Typography
- [x] Shadows
- [x] Layout（breakpoints / spacing / radius）

### Components - 示範
- [x] Button（3 sizes × 4 variants）
- [x] Badge（6 variants × 2 sizes × 2 shapes）

## 第二階段 - 表單基礎元件（已完成）

對應 Figma：Input/Textfield/Menu、Checkbox/Radiobox、Switch、Dropdown、Datetime

- [x] Input / Textfield
  - states: default、focus、error、disabled、readOnly、viewOnly
  - 支援 prefix/suffix adornment、label、helper text、error text、required mark、badge
- [x] TextArea
  - 支援字數計數、min-height resize
- [x] Checkbox
  - states: unchecked、checked、indeterminate、disabled、checked-disabled
  - 三種 Label 模式：Single、WithText、MultipleText（label + description）
- [x] Radio + RadioGroup
  - 含 Context Provider，自動同步 name / value / disabled
- [x] Switch
  - states: off、on、disabled、focus（pseudo）
  - 支援 labelPlacement
- [x] Select / Dropdown
  - 單選、多選（chip 顯示）、搜尋過濾
  - 鍵盤導航（↑ ↓ Enter Esc）、點擊外部關閉
  - states: default、error、disabled、readOnly
- [x] DatePicker（簡化版）
  - 月曆網格、月份切換、min/max 範圍、自訂顯示格式
  - 留待後續：時間選擇、日期區間 Duration、Datetime-time wheel

## 第三階段 - 反饋元件（已完成）

對應 Figma：Toast、Modal、Notification、Tooltips、Status Indicator、Loading

- [x] StatusIndicator
  - 8 種類型：error、warning、success、info、pending、canceled、paused、loading
  - pending 與 loading 帶 pulse 動畫
- [x] Loading（基礎）
  - Spinner：3 種尺寸 + 自訂 pixel、primary / inherit variant
  - ProgressBar：determinate（含進度文字）+ indeterminate（流動動畫）
  - 不含品牌字母動畫（留待專門批次）
- [x] Notification（Inline Alert）
  - 4 種 status：info、success、warning、error
  - 自動切換 Short / Long 樣式
  - 支援自訂 icon、action、可關閉
- [x] Tooltip
  - 4 方位 placement：top / right / bottom / left
  - 3 種內容組合：純文字、含 title、含 footer（如快捷鍵）
  - 觸發方式：hover / focus / click（可組合）
  - 含 portal 渲染、scroll/resize 自動更新位置
- [x] Modal
  - 3 種 type：modal（670px）/ dialog（580px）/ overlay（744px）
  - ESC 關閉、背景點擊關閉、body scroll lock
  - 含 footer 區、自訂寬度
- [x] Toast
  - `<ToastItem>` 純展示元件
  - `<ToastProvider>` + `useToast()` hook 完整系統
  - 4 種 status × 2 種 variant（default / feedback）
  - 自動消失、堆疊管理、6 種顯示位置、max visible 限制

## 第四階段 - 導航與結構（已完成）

對應 Figma：Navigation、Tabs、Stepper、Title/CardHeader/Content

> 註：本批次撰寫時 Figma 連線無法定位元件節點，因此規格依 Batch 1-3 已建立的設計語彙推導，視覺細節待你檢視 Storybook 後校準。

- [x] Title + Text
  - Title 三個 variant：page / section / card，支援 startContent、actions、subtitle
  - Text 工具元件對應所有 typography token，含 truncate、lineClamp、6 種文字色
- [x] Card + CardHeader + CardBody + CardFooter
  - 三種 variant：elevated（帶 shadow）/ outlined（預設）/ flat
  - interactive 模式（hover、cursor、transform）
  - CardFooter 支援 start / between / end 對齊
- [x] Tabs（複合元件：Tabs + TabList + Tab + TabPanel）
  - 三種 variant：underline / pill / enclosed
  - 鍵盤導航（← → Home End）
  - 支援 icon、counter、disabled
  - fullWidth 模式
- [x] Stepper
  - horizontal / vertical 兩種方向
  - 自動狀態推導（pending / active / completed），可在單一 step override 為 error
  - interactive 模式（已完成步驟可點擊跳回）
- [x] Navigation 元件組
  - **SideNav**：多層、collapsed 模式、header / footer 區、自動展開含當前項目的群組
  - **TopBar**：start / center / end 三區，可 sticky
  - **Breadcrumbs**：含 icon、href / onClick 兩種點擊方式、自訂分隔符

## 第五階段 - 資料顯示（已完成）

對應 Figma：Table、Data Table、Drag & Drop

- [x] Table（純展示）
  - 子元件：Table / Thead / Tbody / Tfoot / Tr / Th / Td / CellText / TableEmpty
  - size: medium / large，density: comfortable / compact
  - 支援 striped、hoverable、selected row、bordered 容器
  - CellText 元件對應 Figma Text+Subtext cell type
  - TableEmpty 對應 No_Data 狀態
- [x] Pagination
  - 兩種 mode：default（精簡）/ page（含跳頁數字、最多 7 個顯示位 + ellipsis）
  - RowsPerPage selector 整合
  - 可選的首末頁按鈕
- [x] DataTable
  - column-based 設定（accessor / accessorFn / cell / sortable / sortFn / align / width）
  - 排序（前端三段切換 none → asc → desc → none，也支援受控伺服器排序）
  - 列選取（多選、全選、indeterminate，配合 Toolbar selected mode）
  - 整合 Pagination（前端切片或伺服器分頁兩模式）
  - DataTableToolbar 三種模式（label / filter / selected），自動切換
  - Loading overlay、Empty state、Row click
- [x] DragDropList
  - 6 種 item state（default、hover、grabbing、edit、delete、disabled）
  - 原生 HTML5 drag API，無第三方相依
  - 支援自訂 renderItem 完全覆寫樣式
  - 拖拉位置指示（border-top 標示插入點）

## 第六階段 - 進階與佈局

對應 Figma：Map、Pin、Organization Picker、Overlay、Page、Page Template、Scroll Bar、Utilities

- [ ] Map 容器（地圖整合介面）
- [ ] Pin / Map Pin Tip
- [ ] Organization Picker
- [ ] Overlay（drawer、popover、bottom sheet）
- [ ] Scroll Bar（custom scrollbar）
- [ ] Page Layout
- [ ] Page Template（dashboard、list、detail）
- [ ] Utilities（共用 helpers）

## 第六階段 - 進階與佈局（已完成）

對應 Figma：Overlay、Map、Pin、Organization Picker、Scroll Bar、Page Template

- [x] Drawer（對應 Overlay）
  - 4 方位 placement：left / right / top / bottom
  - 3 種預設 size + 自訂 width/height
  - 可選 backdrop、ESC 關閉、scroll lock
- [x] Popover
  - 8 種 placement（4 主向 + 4 對齊變體 start/end）
  - 觸發方式：click / hover
  - Portal 渲染、scroll/resize 自動更新位置
- [x] ScrollArea
  - 4px 細軌道對應 Figma Scroll Bar
  - 覆蓋 WebKit + Firefox
  - hideOnIdle 模式
- [x] Map 系列
  - **MapContainer**：地圖容器外殼，含 ZoomTool、overlay slot
  - **MapPin**：4 種類型（num / sp / mega / scooter）× 5 種 tone × selected 狀態
  - **MapPinTip**：兩種狀態（一般 / selected），含 stats 區
- [x] OrganizationPicker
  - single / multiple 兩種模式
  - 3 種狀態：off / on / on-error
  - 含搜尋過濾、自訂 avatar
- [x] PageLayout 系列
  - **PageLayout**：主骨架（SideNav + TopBar + Content）
  - **PageHeader**：頁面標題區（breadcrumbs + 標題 + actions）
  - **PageSection**：區塊容器
  - **PageGrid**：響應式網格
  - 範例：Dashboard / Details / List 三種 Page Template

## 基礎建設補強（已完成）

對應 Figma：Icons & Illustrates、Mode=Dark / Mode=Light

- [x] **Icon System**
  - 統一 `Icon` 元件，強型別 `IconName`
  - 分組命名空間：`system/`, `bullet/`, `nav/`, `24pt/`, `16pt/`
  - 約 100 個常用圖示（System 約 40、Bullet 約 25、Nav 約 25、24pt 約 23、16pt 約 12）
  - Storybook Icon Gallery 含搜尋與分組過濾
  - 點圖示卡片自動複製名稱
  - 剩餘 ~70 個 ionexOS 業務特化圖示可在需求出現時逐步補
- [x] **Light Theme**
  - 新增 `semanticColorsLight`，結構鏡像 dark
  - `lightTheme` export + `getTheme(mode)` helper
  - Storybook toolbar theme switcher（dark / light 切換）
  - GlobalStyle 已用 semantic tokens 自動跟隨切換
  - Theme 對照故事（並排展示 + 色票表）

## 維護任務

- [ ] Spacing tokens 從各元件實測值校準
- [ ] Radius tokens 從各元件實測值校準
- [ ] 剩餘約 70 個 24pt 業務圖示補完整
- [ ] Light theme 視覺細節對齊 Figma Mode=Light（待 Figma 連線恢復）
- [ ] 加入 Visual Regression Test（Chromatic 或 Playwright）
- [ ] 加入 a11y addon 並補上 ARIA 屬性
- [ ] Modal focus trap（Tab 循環）
- [ ] Datetime 完整版：時間選擇 + Duration 區間
- [ ] Tooltip / Popover 引入 Floating UI 處理 collision detection
- [ ] 品牌字母 brand animation（ionex jump / wiggle / flip）
- [ ] DragDrop 觸控與 a11y 加強
