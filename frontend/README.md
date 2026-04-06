# FinTrack — Personal Finance Dashboard

<div align="center">

```
    FINTRACK
```

**A modern, production-grade personal finance dashboard**
**built with React 19 · Tailwind CSS 3 · Chart.js 4 · Zustand 5**

---

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.x-brown?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## 📋 Table of Contents

- [Objective](#-objective)
- [Introduction](#-introduction)
- [Tech Stack](#-tech-stack)
- [Requirements](#-requirements)
- [Features](#-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Application Flowchart](#-application-flowchart)
- [Component Flowchart](#-component-flowchart)
- [State Management Flow](#-state-management-flow)
- [Role-Based Access Control](#-role-based-access-control)
- [Responsive Breakpoints](#-responsive-breakpoints)
- [Advantages](#-advantages)
- [Setup & Installation](#-setup--installation)
- [Available Scripts](#-available-scripts)
- [Environment Notes](#-environment-notes)

---

## 🎯 Objective

FinTrack is a **frontend finance dashboard** designed to help individuals track, visualise, and understand their personal financial activity. The primary objectives are:

- Provide a **clean, intuitive interface** for viewing income, expenses, and overall balance
- Enable users to **explore transactions** with powerful filtering, sorting, and search
- Surface **actionable insights** through interactive charts and key metric cards
- Demonstrate **role-based UI behaviour** (Admin vs Viewer) without a backend
- Serve as a **production-quality frontend reference implementation** showing how to structure a React application at scale

---

## 📖 Introduction

Managing personal finances is often fragmented across bank apps, spreadsheets, and manual records. FinTrack consolidates this into a single, beautiful dashboard that gives users an at-a-glance view of their financial health.

The application is **entirely frontend** — there is no backend or database. Data is seeded from a local JavaScript file and persisted to `localStorage`, making it instantly runnable without any server setup. This makes it ideal for:

- **Portfolio demonstrations** — shows real-world React architecture patterns
- **Assignment submissions** — covers every stated requirement with clear justification
- **Rapid prototyping** — swap the seed data layer for a real API with minimal changes

The UI is built around a dark-first design system using CSS custom properties, making the light/dark theme toggle instant and system-consistent across every component.

---

## 🛠 Tech Stack

### Core Framework

| Technology | Version | Role | Why Chosen |
|---|---|---|---|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black&style=flat) **React** | 19.x | UI rendering & component architecture | Industry-standard, composable, concurrent-mode ready |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=flat) **Vite** | 8.x | Build tool & dev server | Sub-100ms HMR, native ESM, fastest DX available |
| ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat) **JavaScript** | ES2023 | Language | No TS overhead for a demo-scale project |

### Styling

| Technology | Version | Role | Why Chosen |
|---|---|---|---|
| ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-38BDF8?logo=tailwindcss&logoColor=white&style=flat) **Tailwind CSS** | 3.x | Utility-first styling | Eliminates CSS naming overhead, dark mode trivial |
| **CSS Custom Properties** | Native | Theme system (dark/light) | Single variable switch changes every component |
| **Google Fonts** | CDN | Typography (Syne, DM Sans, DM Mono) | Distinctive, professional type hierarchy |

### Data Visualisation

| Technology | Version | Role | Why Chosen |
|---|---|---|---|
| ![Chart.js](https://img.shields.io/badge/-Chart.js-FF6384?logo=chartdotjs&logoColor=white&style=flat) **Chart.js** | 4.x | All charts | Lightweight, highly customisable, canvas-based |
| **react-chartjs-2** | 5.x | React wrapper for Chart.js | Declarative chart components with lifecycle hooks |

### State Management

| Technology | Version | Role | Why Chosen |
|---|---|---|---|
| **Zustand** | 5.x | Global application state | Zero boilerplate, no Provider wrapping, tiny bundle |

### Icons & Utilities

| Technology | Version | Role | Why Chosen |
|---|---|---|---|
| ![Lucide](https://img.shields.io/badge/-Lucide_React-f67373?style=flat) **lucide-react** | 1.x | All UI icons | Consistent, thin-stroke, tree-shakeable icon set |
| **date-fns** | 4.x | Date formatting | Lightweight, modular, locale-aware |

### Tooling

| Technology | Version | Role |
|---|---|---|
| **PostCSS** | 8.x | CSS processing pipeline for Tailwind |
| **Autoprefixer** | 10.x | Vendor prefix injection |
| **ESLint** | 9.x | Code quality & consistency |

---

## 📦 Requirements

### System Requirements

```
Node.js    >= 18.0.0
npm        >= 9.0.0
```

### npm Dependencies

```json
{
  "dependencies": {
    "react":           "^19.2.4",
    "react-dom":       "^19.2.4",
    "chart.js":        "^4.5.1",
    "react-chartjs-2": "^5.3.1",
    "zustand":         "^5.0.12",
    "lucide-react":    "^1.7.0",
    "date-fns":        "^4.1.0"
  },
  "devDependencies": {
    "vite":                        "^8.0.1",
    "@vitejs/plugin-react":        "^6.0.1",
    "tailwindcss":                 "^3.4.19",
    "postcss":                     "^8.5.8",
    "autoprefixer":                "^10.4.27",
    "eslint":                      "^9.39.4",
    "eslint-plugin-react-hooks":   "^7.0.1",
    "eslint-plugin-react-refresh":  "^0.5.2"
  }
}
```

### Browser Support

| Browser | Minimum Version |
|---|---|
| Chrome / Edge | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Mobile Chrome | 90+ |
| Mobile Safari | 14+ |

---

## ✨ Features

### 1. Dashboard Overview

- **4 KPI Summary Cards** — Total Balance, Total Income, Total Expenses, Savings Rate — each with a colour-coded accent bar, Lucide icon, and period-over-period change indicator
- **Balance Trend Chart** — Line chart showing running balance over time with **1W / 1M / 3M** period toggle
- **Spending Donut Chart** — Category-level expense breakdown with a centred total and colour-coded legend
- **Monthly Overview Bar Chart** — Grouped income vs expense bars for the last 6 months
- **Key Insights Panel** — 5 auto-computed observations: cash flow, top expense category, largest transaction, savings rate, and average transaction value

### 2. Transactions Section

- **Full data table** — Date, Category (with colour dot), Type badge (INCOME / EXPENSE), Amount
- **Free-text search** — Filters rows in real time across category, type, date, and amount fields
- **Type filter pills** — All / Income / Expense toggle buttons
- **Category dropdown filter** — Filter to any single category
- **Multi-field sort** — Click any column header; chevron indicates current sort and direction
- **Sort direction select** — Newest first, Oldest first, Highest amount, Lowest amount

### 3. Role-Based UI (RBAC)

| Capability | Admin | Viewer |
|---|:---:|:---:|
| View all data and charts | ✅ | ✅ |
| Export CSV / JSON | ✅ | ✅ |
| Add new transaction (modal) | ✅ | ❌ |
| Edit existing transaction | ✅ | ❌ |
| Delete transaction (2-step confirm) | ✅ | ❌ |
| Add button visible in topbar | ✅ | ❌ |
| View-only footer notice in table | ❌ | ✅ |
| Role info banner in settings | ✅ | ✅ |

Switch roles instantly via the **sidebar dropdown** or **Settings → Access & Role**.

### 4. Insights Page

- **4-card stat strip** — Net Savings, Savings Rate, Total Income, Top Category
- **Category Breakdown** — Horizontal progress bars ranked by total spend
- **Key Insights panel** — Same 5 insights as the dashboard
- **Savings Rate Chart** — Monthly bars colour-coded green (>25%), amber (10–25%), red (<10%)
- **Spending Donut** — Full interactive donut chart

### 5. Settings Page

- **Profile** — Edit name, email, currency preference with toast confirmation on save
- **Appearance** — Dark / light mode toggle
- **Access & Role** — Switch between Admin / Viewer with live role description
- **Notification Preferences** — 5 toggle switches for alert types
- **Data Management** — Record count display + Reset to Default Data (danger zone)
- **About** — App version, build date, stack info

### 6. Optional Enhancements (All Implemented)

| Enhancement | Implementation |
|---|---|
| **Dark / Light mode** | CSS custom properties toggled by `body.light`; persisted to localStorage |
| **Data persistence** | Manual localStorage read/write on every store mutation |
| **CSV export** | Exports currently filtered view as `.csv` |
| **JSON export** | Exports currently filtered view as `.json` |
| **Animations** | Staggered `fadeUp` on cards, `fadeIn` on dropdowns, `slideIn` on modals |
| **Edit transactions** | Full edit modal pre-populated with existing values (Admin only) |
| **2-step delete confirm** | Confirm/Cancel inline buttons replace actions before deletion |
| **Advanced filtering** | Type + category + free-text + sort direction all composable simultaneously |
| **Full responsiveness** | Dedicated `responsive.css` covering xs through 2xl + print + a11y |
| **Notification panel** | Dropdown with unread badge, per-item read tracking, mark-all-read |
| **Print styles** | Sidebar/topbar hidden, white background, cards with print-safe borders |
| **Reduced motion** | All animations disabled when `prefers-reduced-motion` is active |
| **Touch optimisation** | Action buttons always visible on touch-only devices |
| **High contrast** | Badge and button colours preserved under `forced-colors` mode |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                       PRESENTATION LAYER                         │
│                                                                  │
│  ┌─────────────┐  ┌──────────────────┐  ┌─────────────────────┐ │
│  │  Sidebar    │  │     Topbar       │  │   Page Components   │ │
│  │  nav + role │  │  search + theme  │  │  Dashboard          │ │
│  │  switcher   │  │  notifs + export │  │  Transactions       │ │
│  └─────────────┘  └──────────────────┘  │  Insights           │ │
│                                          │  Settings           │ │
│                                          └─────────────────────┘ │
├──────────────────────────────────────────────────────────────────┤
│                        COMPONENT LAYER                           │
│                                                                  │
│  Charts              UI                  Transactions            │
│  ┌───────────────┐   ┌────────────────┐  ┌──────────────────┐   │
│  │ BalanceTrend  │   │ SummaryCards   │  │ TransactionTable │   │
│  │ SpendingDonut │   │ KeyInsights    │  │ TransactionFilters│  │
│  │ MonthlyBar    │   │ CategoryBreakdown TransactionModal   │   │
│  │ SavingsChart  │   │ Toast          │  └──────────────────┘   │
│  └───────────────┘   └────────────────┘                         │
├──────────────────────────────────────────────────────────────────┤
│                         STATE LAYER                              │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    Zustand Store                           │  │
│  │  transactions | role | theme | filters | sort | activePage │  │
│  │  addTransaction() | updateTransaction() | deleteTransaction │  │
│  │  getFiltered()  →  filtered + sorted list                  │  │
│  │  getStats()     →  { income, expense, balance, savings }   │  │
│  └────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│                          DATA LAYER                              │
│                                                                  │
│  ┌───────────────────┐        ┌──────────────────────────────┐   │
│  │  transactions.js  │        │        localStorage          │   │
│  │  SEED_TRANSACTIONS│  ───►  │  key: 'FinTrack-v2'          │   │
│  │  CAT_COLORS       │        │  { transactions, theme, role}│   │
│  │  MONTHLY_DATA     │        └──────────────────────────────┘   │
│  │  CATEGORIES       │                                           │
│  └───────────────────┘                                           │
├──────────────────────────────────────────────────────────────────┤
│                          STYLE LAYER                             │
│                                                                  │
│  index.css                        responsive.css                 │
│  ┌──────────────────────────┐     ┌────────────────────────────┐ │
│  │ :root  → dark variables  │     │ @media xs  (< 480px)       │ │
│  │ .light → light variables │     │ @media sm  (480–639px)     │ │
│  │ .card  .btn-* .input-*   │     │ @media md  (640–767px)     │ │
│  │ .badge-income/expense    │     │ @media lg  (768–1023px)    │ │
│  │ .nav-link  .text-muted   │     │ @media xl  (1024px+)       │ │
│  │ animation keyframes      │     │ @media print               │ │
│  └──────────────────────────┘     │ prefers-reduced-motion     │ │
│                                   │ hover:none  forced-colors  │ │
│                                   └────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
FinTrack/
│
├── public/                          # Static assets
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   ├── charts/
│   │   │   ├── BalanceTrend.jsx     # Line chart — 1W/1M/3M period tabs
│   │   │   ├── SpendingDonut.jsx    # Doughnut — centred total + legend
│   │   │   ├── MonthlyBar.jsx       # Grouped bar — income vs expenses
│   │   │   └── SavingsChart.jsx     # Bar — colour-coded savings rate
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx          # Nav, role switcher, logo, footer
│   │   │   └── Topbar.jsx           # Search, theme, notifs, export, add
│   │   │
│   │   ├── transactions/
│   │   │   ├── TransactionTable.jsx # Full RBAC table with sort/edit/delete
│   │   │   ├── TransactionFilters.jsx # Type pills + category + sort selects
│   │   │   └── TransactionModal.jsx # Add / Edit modal with validation
│   │   │
│   │   └── ui/
│   │       ├── SummaryCards.jsx     # 4 KPI cards with icons and changes
│   │       ├── KeyInsights.jsx      # 5 auto-computed insight items
│   │       ├── CategoryBreakdown.jsx# Ranked horizontal progress bars
│   │       └── Toast.jsx            # Stacked notification toasts
│   │
│   ├── data/
│   │   └── transactions.js          # Seed data + CAT_COLORS + MONTHLY_DATA
│   │
│   ├── hooks/
│   │   └── useToast.js              # Lightweight toast state hook
│   │
│   ├── pages/
│   │   ├── DashboardPage.jsx        # Overview layout assembly
│   │   ├── TransactionsPage.jsx     # Table + modal wiring
│   │   ├── InsightsPage.jsx         # Analytics layout assembly
│   │   └── SettingsPage.jsx         # Profile + theme + role + data
│   │
│   ├── store/
│   │   └── useStore.js              # Zustand: state + CRUD + getters
│   │
│   ├── utils/
│   │   └── helpers.js               # fmt, fmtDate, catColor, getDailyBalance,
│   │                                #   exportToCSV, exportToJSON
│   │
│   ├── App.jsx                      # Root: sidebar + topbar + page router
│   ├── main.jsx                     # Entry: mounts App, imports CSS files
│   ├── index.css                    # CSS vars + Tailwind + component classes
│   └── responsive.css               # All breakpoints + print + a11y rules
│
├── index.html                       # HTML shell with #root mount
├── tailwind.config.js               # Content paths, darkMode: 'class'
├── postcss.config.js                # Tailwind + Autoprefixer
├── vite.config.js                   # Vite + React plugin
├── package.json                     # Dependencies + scripts
└── README.md                        # This file
```

---

## 🔄 Application Flowchart

```
                         USER OPENS APP
                               │
                               ▼
                   ┌───────────────────────┐
                   │      main.jsx         │
                   │  loads index.css      │
                   │  loads responsive.css │
                   │  mounts <App />       │
                   └───────────┬───────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │   useStore.js init    │
                   │   read localStorage   │
                   │   'FinTrack-v2'       │
                   └───────────┬───────────┘
                               │
               ┌───────────────┴───────────────┐
           key exists                      key missing
               │                               │
     load saved state                   use seed data
     {transactions,                      from
      theme, role}                       transactions.js
               │                               │
               └───────────────┬───────────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │     App renders       │
                   │  Sidebar + Topbar +   │
                   │  DashboardPage        │
                   └───────────┬───────────┘
                               │
         ┌─────────────────────┼───────────────────────┐
         │                     │                       │
    Navigate              Theme Toggle           Data Interaction
    (sidebar nav)         (topbar btn)           (table / modal)
         │                     │                       │
         ▼                     ▼                       ▼
  setActivePage()        toggleTheme()          role === 'admin'?
         │                     │                       │
  render new page        flip CSS var         ┌────────┴────────┐
         │               body.light          YES               NO
         │                     │              │                │
         │               charts rebuild  Can mutate      Read only
         │               with new theme  data             view only
         │                               │
         └───────────────────────────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │    useStore.js        │
                   │    mutation runs      │
                   │    (add/edit/delete)  │
                   └───────────┬───────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │    localStorage       │
                   │    .setItem()         │
                   │    state persisted    │
                   └───────────┬───────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │   React re-renders    │
                   │   all Zustand         │
                   │   subscribers update  │
                   └───────────────────────┘
```

---

## 🧩 Component Flowchart

```
App.jsx
  │
  ├─── Sidebar.jsx
  │       ├── Logo + brand name
  │       ├── Role switcher dropdown ─────────────► useStore.setRole()
  │       ├── Nav items (Dashboard / Transactions  
  │       │             Insights / Settings) ──────► useStore.setActivePage()
  │       └── Footer (version)
  │
  ├─── Topbar.jsx
  │       ├── Hamburger (mobile only) ─────────────► toggle sidebar open/close
  │       ├── Page title ◄───────────────────────── useStore.activePage
  │       ├── Search input ───────────────────────► useStore.setSearch()
  │       ├── Theme toggle ───────────────────────► useStore.toggleTheme()
  │       ├── Notification Bell
  │       │       └── Dropdown (5 items, unread badge, mark-all-read)
  │       ├── Export Dropdown
  │       │       ├── Export CSV ─────────────────► exportToCSV(getFiltered())
  │       │       └── Export JSON ────────────────► exportToJSON(getFiltered())
  │       └── Add button (admin only) ────────────► open TransactionModal
  │
  ├─── DashboardPage.jsx
  │       ├── SummaryCards ◄──────────────────────── useStore.getStats()
  │       ├── BalanceTrend ◄──────────────────────── transactions + theme
  │       ├── SpendingDonut ◄─────────────────────── getCategoryTotals()
  │       ├── KeyInsights ◄───────────────────────── getStats() + catTotals
  │       └── MonthlyBar ◄────────────────────────── MONTHLY_DATA + live txns
  │
  ├─── TransactionsPage.jsx
  │       ├── TransactionTable
  │       │       ├── TransactionFilters
  │       │       │       ├── Type pills ─────────► setFilterType()
  │       │       │       ├── Category select ────► setFilterCategory()
  │       │       │       └── Sort select ────────► setSort() / setSortDir()
  │       │       ├── Table rows ◄────────────────── getFiltered()
  │       │       ├── Edit button (admin) ─────────► open modal (edit mode)
  │       │       └── Delete button (admin) ───────► deleteTransaction()
  │       └── TransactionModal
  │               ├── Add mode ──────────────────► addTransaction()
  │               └── Edit mode ─────────────────► updateTransaction()
  │
  ├─── InsightsPage.jsx
  │       ├── Stat strip (4 cards) ◄──────────────── getStats() + catTotals
  │       ├── CategoryBreakdown ◄──────────────────── getCategoryTotals()
  │       ├── KeyInsights (shared) ◄─────────────────  getStats()
  │       ├── SpendingDonut (shared) ◄────────────────  transactions
  │       └── SavingsChart ◄───────────────────────── MONTHLY_DATA + txns
  │
  ├─── SettingsPage.jsx
  │       ├── Profile form (local state) ──────────► onToast on save
  │       ├── Appearance toggle ───────────────────► toggleTheme()
  │       ├── Role buttons ───────────────────────► setRole()
  │       ├── Notification toggles (local state)
  │       └── Reset data ──────────────────────────► localStorage.removeItem()
  │
  ├─── TransactionModal.jsx  (global — opened from Topbar Add button)
  │       └── addTransaction()
  │
  └─── ToastContainer.jsx
          └── useToast hook → timed notifications stack
```

---

## 🗃 State Management Flow

```
  ┌──────────────────────────────────────────────────────────────┐
  │                    useStore.js  (Zustand)                    │
  │                                                              │
  │  STATE SLICE          TYPE            PERSISTED              │
  │  ─────────────────────────────────────────────────────────   │
  │  transactions[]       Transaction[]   YES (localStorage)     │
  │  role                 'admin'|'viewer' YES                   │
  │  theme                'dark'|'light'  YES                    │
  │  searchQuery          string          NO  (session only)     │
  │  filterType           string          NO                     │
  │  filterCategory       string          NO                     │
  │  sortField            string          NO                     │
  │  sortDir              1 | -1          NO                     │
  │  activePage           string          NO                     │
  │                                                              │
  │  ACTIONS                                                     │
  │  ─────────────────────────────────────────────────────────   │
  │  addTransaction(txn)        → prepend to transactions[]      │
  │  updateTransaction(id,data) → map replace by id              │
  │  deleteTransaction(id)      → filter out by id               │
  │  setRole(r)                 → update role + persist          │
  │  toggleTheme()              → flip dark↔light + persist      │
  │  setActivePage(p)           → update activePage              │
  │  setSearch(q)               → update searchQuery             │
  │  setFilterType(t)           → update filterType              │
  │  setFilterCategory(c)       → update filterCategory          │
  │  setSort(field)             → toggle sort field + dir        │
  │  setSortDir(dir)            → set explicit sort direction     │
  │                                                              │
  │  DERIVED GETTERS (computed on every call)                    │
  │  ─────────────────────────────────────────────────────────   │
  │  getFiltered()  → applies type + category + search + sort    │
  │  getStats()     → { income, expense, balance, savings% }     │
  └──────────────────────────────────────────────────────────────┘
                               │
             ┌─────────────────▼──────────────────┐
             │    Component Subscriptions          │
             │                                     │
             │  SummaryCards    ← getStats()        │
             │  BalanceTrend    ← transactions,theme│
             │  SpendingDonut   ← transactions,theme│
             │  MonthlyBar      ← transactions,theme│
             │  SavingsChart    ← transactions,theme│
             │  KeyInsights     ← transactions,stats│
             │  CategoryBreakdown ← transactions    │
             │  TransactionTable  ← getFiltered(),  │
             │                       role           │
             │  TransactionFilters ← filter state   │
             │  Topbar          ← theme,role,search │
             │  Sidebar         ← role,activePage   │
             │  SettingsPage    ← theme,role,txns   │
             └─────────────────────────────────────┘
```

---

## 🔐 Role-Based Access Control

```
             ┌──────────────────────────────────┐
             │         Role Selector             │
             │   Sidebar dropdown / Settings     │
             └─────────────┬────────────────────┘
                           │
                           ▼
             ┌──────────────────────────────────┐
             │       useStore.role              │
             └──────────┬───────────────────────┘
                        │
          ┌─────────────▼──────────────────────────────┐
          │                                            │
    role === 'admin'                       role === 'viewer'
          │                                            │
  ┌───────▼──────────┐                   ┌────────────▼──────────┐
  │   FULL ACCESS     │                   │   READ-ONLY ACCESS    │
  │                   │                   │                       │
  │  View all data    │                   │  View all data        │
  │  Add transaction  │                   │  Export CSV / JSON    │
  │  Edit transaction │                   │                       │
  │  Delete (confirm) │                   │  No Add button        │
  │  Export CSV/JSON  │                   │  No Edit button       │
  │                   │                   │  No Delete button     │
  │  (no notice shown)│                   │  View-only notice     │
  └───────────────────┘                   └───────────────────────┘
```

---

## 🚀 Advantages

### Developer Experience
- **Zero configuration** — `npm install && npm run dev` and it works immediately
- **Hot Module Replacement** — sub-100ms UI updates during development via Vite
- **No backend required** — seed data + localStorage = instant runnable demo
- **Modular components** — swap any chart, replace a page, or add a route with zero side effects

### Architecture Quality
- **Single store pattern** — all state in one Zustand store; no prop drilling, no Context boilerplate
- **CSS variable theming** — `body.light` class toggle repaints every component without JS re-renders
- **Computed derived state** — `getFiltered()` and `getStats()` are always fresh, no stale data
- **Clean layer separation** — data / store / utils / components / pages never create circular imports

### User Experience
- **Instant theme switching** — CSS variables make dark-to-light transitions imperceptible
- **Persistent state** — data, theme, and role survive browser refresh automatically
- **Responsive everywhere** — dedicated `responsive.css` handles xs → 2xl, print, touch, and a11y
- **Accessible** — `prefers-reduced-motion` respected, `forced-colors` supported, ARIA on toggles
- **Touch-friendly** — `hover:none` media query ensures action buttons visible on all touch devices

### Scalability Path
- **Add a real API** — replace `SEED_TRANSACTIONS` and localStorage writes with `fetch()` calls in `useStore.js` only
- **Add authentication** — `role` is already first-class state; replace the dropdown with a JWT/session check
- **Add more pages** — extend the `NAV` array in `Sidebar.jsx` and add a route in `App.jsx`
- **Add TypeScript** — file structure and JSDoc patterns are already migration-friendly

---

## ⚙ Setup & Installation

### 1. Navigate into your project and create the frontend folder

```bash
cd your-project-name
mkdir frontend
cd frontend
```

### 2. Initialise Vite React app

```bash
npm create vite@latest . -- --template react
npm install
```

### 3. Install Tailwind CSS

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### 4. Install project packages

```bash
npm install chart.js react-chartjs-2 zustand date-fns lucide-react
```

### 5. Create the folder structure

```bash
mkdir -p src/components/charts src/components/layout src/components/ui \
         src/components/transactions src/store src/data src/hooks \
         src/utils src/pages
```

### 6. Copy all source files into place

Refer to the [Project Structure](#-project-structure) section above for exact file destinations.

### 7. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| **Dev server** | `npm run dev` | Start Vite dev server with HMR at localhost:5173 |
| **Build** | `npm run build` | Production build output to `dist/` |
| **Preview** | `npm run preview` | Serve the production build locally |
| **Lint** | `npm run lint` | Run ESLint across all source files |

---

## 🌐 Environment Notes

- **No environment variables required** — the app runs entirely in the browser
- **No API keys** — all data is local
- **localStorage key** — `FinTrack-v2` stores `{ transactions, theme, role }`
- **Reset data** — Settings → Data Management → Reset to Default Data, or clear `FinTrack-v2` from DevTools
- **Port** — defaults to `5173`; change with `npm run dev -- --port 3000`
- **Production build** — outputs to `dist/`, can be deployed to any static host (Vercel, Netlify, GitHub Pages)

---

<div align="center">

```
  React · Tailwind CSS · Chart.js · Zustand · Lucide · Vite
```

**FinTrack v2.0.0 · April 2026**

</div>