import useStore from "../../store/useStore";

const NAV = [
  {
    section: "Menu",
    items: [
      { id: "dashboard", label: "Dashboard", icon: DashIcon },
      { id: "transactions", label: "Transactions", icon: TxnIcon },
      { id: "insights", label: "Insights", icon: ChartIcon },
    ],
  },
  {
    section: "Account",
    items: [{ id: "settings", label: "Settings", icon: SettingsIcon }],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const { role, setRole, activePage, setActivePage } = useStore();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="lg:hidden fixed inset-0 z-[199]"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" }}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen z-[200] flex flex-col
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{
          width: 232,
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 px-5 py-[22px]"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div
            className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}
          >
            <DollarIcon />
          </div>
          <div>
            <div
              className="font-sans font-bold text-[17px] tracking-tight leading-none"
              style={{ color: "var(--text)" }}
            >
              Fin<span style={{ color: "var(--accent-light)" }}>Track</span>
            </div>
            <div
              className="text-[10px] mt-0.5 font-body"
              style={{ color: "var(--text3)" }}
            >
              Personal Finance
            </div>
          </div>
        </div>

        {/* Role switcher */}
        <div
          className="mx-3.5 mt-3.5 mb-1 rounded-xl p-3"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border2)",
          }}
        >
          <p
            className="text-[10px] uppercase tracking-[1.2px] font-medium mb-1.5 font-body"
            style={{ color: "var(--text3)" }}
          >
            Active Role
          </p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field text-[12px] py-1.5 cursor-pointer"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <div
            className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium font-body"
            style={
              role === "admin"
                ? {
                    background: "var(--accent-dim)",
                    color: "var(--accent-light)",
                  }
                : { background: "var(--green-dim)", color: "var(--green)" }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background:
                  role === "admin" ? "var(--accent-light)" : "var(--green)",
              }}
            />
            {role === "admin" ? "Admin Access" : "View Only"}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2">
          {NAV.map(({ section, items }) => (
            <div key={section}>
              <p
                className="px-5 pt-3 pb-1 text-[10px] uppercase tracking-[1.3px] font-semibold font-body"
                style={{ color: "var(--text3)" }}
              >
                {section}
              </p>
              {items.map(({ id, label, icon: Icon }) => (
                <div
                  key={id}
                  onClick={() => {
                    setActivePage(id);
                    onClose?.();
                  }}
                  className={`nav-link ${activePage === id ? "active" : ""}`}
                >
                  <Icon />
                  {label}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p
            className="text-[10px] font-body"
            style={{ color: "var(--text3)" }}
          >
            FinTrack v1 · April 2026
          </p>
        </div>
      </aside>
    </>
  );
}

function DollarIcon() {
  return (
    <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
    </svg>
  );
}
function DashIcon() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </svg>
  );
}
function TxnIcon() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 21H5c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v9c0 .55-.45 1-1 1zm5 0h-4V3c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v18c0 .55-.45 1-1 1zm5 0h-4v-5c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v5c0 .55-.45 1-1 1z" />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
  );
}
