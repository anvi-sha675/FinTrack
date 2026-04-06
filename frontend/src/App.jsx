import { useState, useEffect, useCallback } from "react";
import useStore from "./store/useStore";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import ToastContainer from "./components/ui/Toast";
import TransactionModal from "./components/transactions/TransactionModal";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";
import SettingsPage from "./pages/SettingsPage";
import { useToast } from "./hooks/useToast";

export default function App() {
  const { activePage, theme } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { toasts, show: toast } = useToast();

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleAddClick = useCallback(() => setAddModalOpen(true), []);
  const handleMenuClick = useCallback(() => setSidebarOpen((v) => !v), []);

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "var(--bg)", transition: "background 0.2s ease" }}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-h-screen lg:ml-[232px]">
        <Topbar
          onMenuClick={handleMenuClick}
          onAddClick={handleAddClick}
          onToast={toast}
        />
        <main className="flex-1 overflow-y-auto">
          {activePage === "dashboard" && <DashboardPage />}
          {activePage === "transactions" && (
            <TransactionsPage onToast={toast} />
          )}
          {activePage === "insights" && <InsightsPage />}
          {activePage === "settings" && <SettingsPage onToast={toast} />}
        </main>
      </div>

      <TransactionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onToast={toast}
      />
      <ToastContainer toasts={toasts} />
    </div>
  );
}
