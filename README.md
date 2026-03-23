# 線上會議報名表 (Conference Registration Form)

此專案為一個極簡且美觀的線上會議報名表單，使用 React 與現代前端開發工具建構，支援完整的工作產業、會議場次及飲食習慣等多層次欄位校驗。

## 🚀 如何啟動專案

專案使用 **Vite** 作為建構工具。請確保您的環境已安裝 Node.js。

```bash
# 1. 安裝依賴 (建議使用 npm 或 pnpm)
npm install

# 2. 啟動開發伺服器
npm run dev

# 3. 建置正式環境版本
npm run build
```

啟動後，瀏覽器通常會自動打開 `http://localhost:5173`。

---

## 🛠 技術選擇與設計想法

### 1. 核心技術堆疊
- **React 19 & TypeScript**: 提供強大的類型檢查，確保大規模開發時的專案穩定性。
- **Vite**: 提供極速的 HMR (Hot Module Replacement) 與開發體驗。
- **Tailwind CSS 4.0**: 以效能優先的可客製化樣式框架，用於實作精準的 UI 設計與互動效果。

### 2. 表單處理與驗證 (核心設計)
- **React Hook Form**: 選擇此庫是為了優化表單效能，減少不必要的重新渲染 (Re-render)，並提供簡潔的 API 來管理複雜的巢狀表單狀態。
- **Zod (Schema Validation)**: 
  - 所有欄位校驗邏輯皆定義於 `src/lib/schemas.ts`。
  - 使用 `zodResolver` 與 React Hook Form 深度整合。
  - 實作了 **條件式驗證 (Conditional Validation)**：例如「若參加晚宴，則必須填寫飲食習慣」以及「其他」類別的連動驗證。

### 3. UI/UX 設計重點
- **原子化 UI 元件**: 在 `src/components/ui/` 下定義了高複用性的 `Input`, `Checkbox`, `Radio` 與 `Select` 元件。
- **反饋與提示**: 當表單驗證失敗時，會有明確的錯誤提示標註；成功送出後則顯示精美的感謝頁面。


### 4. 專案結構建議
- `src/features/`: 存放業務邏輯核心元件。
- `src/lib/`: 存放 schema 定義或共用工具。
- `src/components/ui/`: 存放無狀態的純 UI 展示元件。

---

## 📝 補充說明
表單送出後，資料會經由 Zod 嚴格校驗，通過後將會將 JSON payload 輸出至瀏覽器的 Console 中。

