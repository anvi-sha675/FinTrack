# 🚀 FinTrack — Smart Personal Finance Dashboard

<div align="center">

**A full-stack personal finance tracking system with analytics, insights, and role-based access**

Built with **React · Tailwind CSS · Zustand · Chart.js**

</div>

---

## 📌 Overview

**FinTrack** is a modern, scalable personal finance management system designed to help users track income, monitor expenses, and gain actionable financial insights.

The project demonstrates full-stack architecture, combining a high-performance React frontend with a flexible backend API, making it suitable for:

- 💼 Portfolio projects  
- 🎓 Academic submissions  
- 🚀 Real-world application foundations  

---

## 🎯 Objectives

- Provide a centralised platform for managing financial data  
- Enable data-driven insights using charts and analytics  
- Implement role-based access control (RBAC)  
- Demonstrate scalable full-stack architecture  
- Ensure responsive and user-friendly UI/UX  

---

## 🛠 Tech Stack

### 🔹 Frontend
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.x-brown?style=for-the-badge)
![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🏗️ System Architecture
                    ┌──────────────────────────────┐
                    │           USER               │
                    │   (Browser Interaction)      │
                    └─────────────┬────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────────┐
                    │        PRESENTATION          │
                    │         (React UI)           │
                    │  Sidebar · Topbar · Pages    │
                    │  Dashboard · Transactions    │
                    │  Insights · Settings         │
                    └─────────────┬────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────────┐
                    │        COMPONENT LAYER       │
                    │  Charts · Cards · Tables     │
                    │  Filters · Modals · Toasts   │
                    └─────────────┬────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────────┐
                    │       STATE MANAGEMENT       │
                    │        (Zustand Store)       │
                    │  transactions · filters      │
                    │  theme · role · stats        │
                    └─────────────┬────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────────┐
                    │         DATA LAYER           │
                    │  Seed Data (JS Files)        │
                    │  localStorage Persistence    │
                    └─────────────┬────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────────┐
                    │         STYLE LAYER          │
                    │  Tailwind CSS · CSS Vars     │
                    │  Responsive + Dark Mode      │
                    └──────────────────────────────┘
                    
---

## 🧠 Explanation

### 1. User Layer
- User interacts via browser (clicks, filters, inputs)
- Triggers UI updates and state changes

### 2. Presentation Layer (React)
- Handles page rendering and layout  
- Includes:
  - Sidebar navigation  
  - Topbar actions  
  - Pages (Dashboard, Transactions, Insights, Settings)

### 3. Component Layer
- Reusable UI blocks:
  - Charts (Chart.js)
  - Tables (transactions)
  - Cards (KPIs)
  - Modals & Toasts  
- Keeps UI modular and scalable  

### 4. State Management (Zustand)
- Central source of truth  
- Handles:
  - Transactions CRUD  
  - Filters & sorting  
  - Theme & role  
  - Derived stats (balance, savings)

### 5. Data Layer
- Uses:
  - Seed data (`transactions.js`)  
  - `localStorage` for persistence  
- Fully client-side (no backend required currently)

### 6. Style Layer
- Tailwind CSS for layout & utilities  
- CSS variables for theme switching  
- Fully responsive design  

---

## 🔁 Data Flow
User Action → Component → Zustand Store → localStorage
↓
React Re-render

---

## 💡 Key Highlights

- ✔ Unidirectional data flow  
- ✔ Single source of truth (Zustand)  
- ✔ No backend dependency (current version)  
- ✔ Scalable architecture  
- ✔ Clean separation of concerns  

---

## ✨ Features

### 📊 Dashboard
- Financial overview (balance, income, expenses)  
- Interactive charts (line, bar, donut)  
- Smart insights  

### 💳 Transactions
- Add / Edit / Delete  
- Advanced filtering & sorting  
- Category tracking  

### 🔐 Role-Based Access (RBAC)
- **Admin:** Full access  
- **Viewer:** Read-only  

### 📈 Insights
- Spending trends  
- Category breakdown  
- Savings tracking  

### ⚙️ Settings
- Dark/Light theme  
- Role switching  
- Data reset  

---

## 🔄 Application Flow
User → Frontend UI → API Request → Backend → Data Storage

---

## ⚙️ Setup & Installation

### 1. Clone Repository
```bash
git clone https://github.com/your-username/fintrack.git
cd fintrack

