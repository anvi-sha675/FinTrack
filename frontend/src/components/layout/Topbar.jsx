import { useState, useRef, useEffect } from "react";
import useStore from "../../store/useStore";
import { exportToCSV, exportToJSON } from "../../utils/helpers";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Menu,
  Search,
  Bell,
  Download,
  Plus,
  Sun,
  Moon,
} from "lucide-react";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  insights: "Insights",
  settings: "Settings",
};

const MOCK_NOTIFS = [
  {
    id: 1,
    Icon: DollarSign,
    color: "var(--amber)",
    bg: "var(--amber-dim)",
    title: "Large expense detected",
    body: "Rent $1,500 was added.",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    Icon: TrendingUp,
    color: "var(--green)",
    bg: "var(--green-dim)",
    title: "Income received",
    body: "Salary $3,200 credited.",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    Icon: AlertTriangle,
    color: "var(--red)",
    bg: "var(--red-dim)",
    title: "Savings rate dropped",
    body: "Rate fell below 20% this month.",
    time: "3h ago",
    unread: true,
  },
  {
    id: 4,
    Icon: CheckCircle,
    color: "var(--green)",
    bg: "var(--green-dim)",
    title: "Export successful",
    body: "CSV exported successfully.",
    time: "1d ago",
    unread: false,
  },
  {
    id: 5,
    Icon: Target,
    color: "var(--accent-light)",
    bg: "var(--accent-dim)",
    title: "Monthly goal reached",
    body: "You hit your savings target!",
    time: "2d ago",
    unread: false,
  },
];

export default function Topbar({ onMenuClick, onAddClick, onToast }) {
  const {
    theme,
    toggleTheme,
    activePage,
    role,
    searchQuery,
    setSearch,
    getFiltered,
  } = useStore();
  const [showExport, setShowExport] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const exportRef = useRef(null);
  const notifRef = useRef(null);
  const unread = notifs.filter((n) => n.unread).length;

  useEffect(() => {
    const fn = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target))
        setShowExport(false);
      if (notifRef.current && !notifRef.current.contains(e.target))
        setShowNotif(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5"
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer transition-opacity hover:opacity-75"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border2)",
          }}
        >
          <Menu size={16} style={{ color: "var(--text2)" }} />
        </button>
        <div>
          <h1
            className="font-sans font-semibold text-[15px] leading-none"
            style={{ color: "var(--text)" }}
          >
            {PAGE_TITLES[activePage] || "Dashboard"}
          </h1>
          <p
            className="text-[11px] mt-0.5 font-body"
            style={{ color: "var(--text3)" }}
          >
            April 2026
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <Search
            size={13}
            className="absolute left-3 pointer-events-none"
            style={{ color: "var(--text3)" }}
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions…"
            className="input-field pl-8 w-52 text-[12px]"
          />
        </div>

        {/* Theme toggle */}
        <IconBtn
          onClick={toggleTheme}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? (
            <Sun size={15} style={{ color: "var(--amber)" }} />
          ) : (
            <Moon size={14} style={{ color: "var(--text2)" }} />
          )}
        </IconBtn>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <IconBtn
            onClick={() => {
              setShowNotif((v) => !v);
              setShowExport(false);
            }}
            title="Notifications"
          >
            <Bell size={15} style={{ color: "var(--text2)" }} />
            {unread > 0 && (
              <span
                className="absolute top-1 right-1 flex items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{
                  minWidth: 14,
                  height: 14,
                  background: "var(--red)",
                  border: "1.5px solid var(--surface)",
                  fontFamily: "DM Mono",
                  lineHeight: 1,
                  padding: "0 2px",
                }}
              >
                {unread}
              </span>
            )}
          </IconBtn>

          {showNotif && (
            <div
              className="absolute right-0 top-11 rounded-2xl overflow-hidden z-[300] animate-fade-in"
              style={{
                width: 320,
                background: "var(--surface)",
                border: "1px solid var(--border2)",
                boxShadow: "var(--shadow)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="font-sans font-semibold text-[13px]"
                    style={{ color: "var(--text)" }}
                  >
                    Notifications
                  </span>
                  {unread > 0 && (
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                      style={{
                        background: "var(--red-dim)",
                        color: "var(--red)",
                      }}
                    >
                      {unread} new
                    </span>
                  )}
                </div>
                {unread > 0 && (
                  <button
                    onClick={() =>
                      setNotifs((n) => n.map((x) => ({ ...x, unread: false })))
                    }
                    className="text-[11px] font-body cursor-pointer"
                    style={{ color: "var(--accent-light)" }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Items */}
              <div style={{ maxHeight: 340, overflowY: "auto" }}>
                {notifs.map((n) => (
                  <div
                    key={n.id}
                    onClick={() =>
                      setNotifs((ns) =>
                        ns.map((x) =>
                          x.id === n.id ? { ...x, unread: false } : x,
                        ),
                      )
                    }
                    className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors"
                    style={{
                      background: n.unread
                        ? "var(--accent-dim)"
                        : "transparent",
                      borderBottom: "1px solid var(--border3)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--surface2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = n.unread
                        ? "var(--accent-dim)"
                        : "transparent")
                    }
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: n.bg }}
                    >
                      <n.Icon size={15} style={{ color: n.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className="text-[12px] font-medium font-body truncate"
                          style={{ color: "var(--text)" }}
                        >
                          {n.title}
                        </p>
                        <span
                          className="text-[10px] flex-shrink-0 font-body"
                          style={{ color: "var(--text3)" }}
                        >
                          {n.time}
                        </span>
                      </div>
                      <p
                        className="text-[11px] mt-0.5 font-body leading-relaxed"
                        style={{ color: "var(--text2)" }}
                      >
                        {n.body}
                      </p>
                    </div>
                    {n.unread && (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="px-4 py-2.5 text-center"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <span
                  className="text-[11px] font-body"
                  style={{ color: "var(--text3)" }}
                >
                  {notifs.length} total notifications
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Export */}
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => {
              setShowExport((v) => !v);
              setShowNotif(false);
            }}
            className="btn-ghost text-xs"
          >
            <Download size={13} /> Export
          </button>
          {showExport && (
            <div
              className="absolute right-0 top-10 rounded-xl overflow-hidden z-[300] animate-fade-in"
              style={{
                background: "var(--surface2)",
                border: "1px solid var(--border2)",
                width: 148,
                boxShadow: "var(--shadow)",
              }}
            >
              {[
                {
                  label: "Export CSV",
                  fn: () => {
                    exportToCSV(getFiltered());
                    setShowExport(false);
                    onToast("Exported as CSV!");
                  },
                },
                {
                  label: "Export JSON",
                  fn: () => {
                    exportToJSON(getFiltered());
                    setShowExport(false);
                    onToast("Exported as JSON!");
                  },
                },
              ].map((item, i) => (
                <button
                  key={item.label}
                  onClick={item.fn}
                  className="w-full text-left px-4 py-2.5 text-xs font-body cursor-pointer transition-colors"
                  style={{
                    color: "var(--text2)",
                    borderTop: i > 0 ? "1px solid var(--border)" : "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--surface3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add (admin only) */}
        {role === "admin" && (
          <button onClick={onAddClick} className="btn-primary">
            <Plus size={13} /> Add
          </button>
        )}
      </div>
    </header>
  );
}

function IconBtn({ children, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="relative flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer transition-opacity hover:opacity-75"
      style={{
        background: "var(--surface2)",
        border: "1px solid var(--border2)",
      }}
    >
      {children}
    </button>
  );
}
