import { useState } from "react";
import useStore from "../store/useStore";
import {
  User,
  Palette,
  ShieldCheck,
  Bell,
  Database,
  Info,
  Trash2,
  Check,
  Eye,
} from "lucide-react";

export default function SettingsPage({ onToast }) {
  const { theme, toggleTheme, role, setRole, transactions } = useStore();
  const [profile, setProfile] = useState({
    name: "Alice",
    email: "alice@fintrack.app",
    currency: "USD",
  });
  const [notifPrefs, setNotifPrefs] = useState({
    largeExpense: true,
    incomeAlert: true,
    savingsGoal: true,
    weeklyReport: false,
    monthlyReport: true,
  });

  const handleSaveProfile = () => onToast("Profile saved successfully!");
  const handleClearData = () => {
    if (window.confirm("Reset all transactions to default seed data?")) {
      try {
        localStorage.removeItem("finvault-v2");
      } catch (e) {}
      onToast("Data cleared — refresh to reload defaults.", "warning");
    }
  };

  return (
    <div className="p-6 max-w-[860px] w-full animate-fade-up">
      <div className="mb-6">
        <h2
          className="font-sans font-semibold text-[16px]"
          style={{ color: "var(--text)" }}
        >
          Settings
        </h2>
        <p
          className="text-[12px] font-body mt-0.5"
          style={{ color: "var(--text3)" }}
        >
          Manage your account, preferences, and app behaviour
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Profile */}
        <Section title="Profile" Icon={User}>
          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
              style={{
                background: "linear-gradient(135deg,#6366f1,#818cf8)",
                color: "#fff",
                fontFamily: "Syne",
              }}
            >
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p
                className="font-sans font-semibold text-[14px]"
                style={{ color: "var(--text)" }}
              >
                {profile.name}
              </p>
              <p
                className="text-[12px] font-body mt-0.5"
                style={{ color: "var(--text3)" }}
              >
                {profile.email}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Full Name">
              <input
                className="input-field"
                value={profile.name}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, name: e.target.value }))
                }
              />
            </Field>
            <Field label="Email Address">
              <input
                className="input-field"
                value={profile.email}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, email: e.target.value }))
                }
              />
            </Field>
            <Field label="Currency">
              <select
                className="input-field cursor-pointer"
                value={profile.currency}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, currency: e.target.value }))
                }
              >
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="GBP">GBP — British Pound</option>
                <option value="INR">INR — Indian Rupee</option>
                <option value="JPY">JPY — Japanese Yen</option>
              </select>
            </Field>
          </div>
          <button onClick={handleSaveProfile} className="btn-primary">
            <Check size={13} /> Save Profile
          </button>
        </Section>

        {/* Appearance */}
        <Section title="Appearance" Icon={Palette}>
          <Row label="Dark Mode" sub="Switch between dark and light interface">
            <Toggle
              checked={theme === "dark"}
              onChange={toggleTheme}
              color="var(--accent)"
            />
          </Row>
        </Section>

        {/* Role */}
        <Section title="Access & Role" Icon={ShieldCheck}>
          <Row
            label="Current Role"
            sub="Admin can add, edit and delete. Viewer has read-only access."
          >
            <div className="flex gap-2">
              {["admin", "viewer"].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    onToast(`Role switched to ${r}`);
                  }}
                  className="px-4 py-1.5 rounded-lg text-[12px] font-body font-medium capitalize cursor-pointer transition-all"
                  style={
                    role === r
                      ? {
                          background: "var(--accent)",
                          color: "#fff",
                          border: "1px solid var(--accent)",
                        }
                      : {
                          background: "transparent",
                          color: "var(--text2)",
                          border: "1px solid var(--border2)",
                        }
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </Row>
          <div
            className="mt-3 p-3 rounded-xl flex items-start gap-2"
            style={{
              background:
                role === "admin" ? "var(--accent-dim)" : "var(--green-dim)",
              border: `1px solid ${role === "admin" ? "rgba(99,102,241,0.2)" : "rgba(34,197,94,0.2)"}`,
            }}
          >
            {role === "admin" ? (
              <ShieldCheck
                size={14}
                style={{
                  color: "var(--accent-light)",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              />
            ) : (
              <Eye
                size={14}
                style={{ color: "var(--green)", flexShrink: 0, marginTop: 1 }}
              />
            )}
            <p
              className="text-[12px] font-body"
              style={{
                color:
                  role === "admin" ? "var(--accent-light)" : "var(--green)",
              }}
            >
              {role === "admin"
                ? "Admin — you can add, edit, delete transactions and export data."
                : "Viewer — you can view and export data, but cannot modify transactions."}
            </p>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notification Preferences" Icon={Bell}>
          {[
            {
              key: "largeExpense",
              label: "Large expense alert",
              sub: "Notify when a single expense exceeds $500",
            },
            {
              key: "incomeAlert",
              label: "Income received",
              sub: "Notify when income transactions are added",
            },
            {
              key: "savingsGoal",
              label: "Savings goal warning",
              sub: "Alert when savings rate drops below 20%",
            },
            {
              key: "weeklyReport",
              label: "Weekly summary",
              sub: "Receive a weekly spending summary",
            },
            {
              key: "monthlyReport",
              label: "Monthly report",
              sub: "Get a full monthly financial overview",
            },
          ].map((item) => (
            <Row key={item.key} label={item.label} sub={item.sub}>
              <Toggle
                checked={notifPrefs[item.key]}
                onChange={() =>
                  setNotifPrefs((p) => ({ ...p, [item.key]: !p[item.key] }))
                }
                color="var(--green)"
              />
            </Row>
          ))}
        </Section>

        {/* Data */}
        <Section title="Data Management" Icon={Database}>
          <Row
            label="Stored Transactions"
            sub="Total records currently in your local storage"
          >
            <span
              className="font-mono text-[13px] font-medium px-3 py-1 rounded-lg"
              style={{
                background: "var(--accent-dim)",
                color: "var(--accent-light)",
              }}
            >
              {transactions.length} records
            </span>
          </Row>
          <div
            className="mt-4 pt-4"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p
              className="text-[12px] font-body font-medium mb-1"
              style={{ color: "var(--text)" }}
            >
              Danger Zone
            </p>
            <p
              className="text-[11px] font-body mb-3"
              style={{ color: "var(--text3)" }}
            >
              These actions cannot be undone. Please proceed with caution.
            </p>
            <button
              onClick={handleClearData}
              className="text-[12px] font-body font-medium px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-2"
              style={{
                background: "var(--red-dim)",
                color: "var(--red)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(239,68,68,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--red-dim)")
              }
            >
              <Trash2 size={14} /> Reset to Default Data
            </button>
          </div>
        </Section>

        {/* About */}
        <Section title="About" Icon={Info}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ["App", "FinTrack"],
              ["Version", "v1"],
              ["Build", "Apr 2026"],
              ["Stack", "React + Tailwind CSS"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl p-3 text-center"
                style={{
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                }}
              >
                <p
                  className="text-[10px] font-body uppercase tracking-[0.8px] mb-1"
                  style={{ color: "var(--text3)" }}
                >
                  {label}
                </p>
                <p
                  className="font-mono text-[13px] font-medium"
                  style={{ color: "var(--text)" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ── Sub-components ── */
function Section({ title, Icon, children }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="flex items-center gap-2 mb-4"
        style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}
      >
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--accent-dim)" }}
        >
          <Icon size={13} style={{ color: "var(--accent-light)" }} />
        </div>
        <h3
          className="font-sans font-semibold text-[13px]"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Row({ label, sub, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p
          className="text-[13px] font-body font-medium"
          style={{ color: "var(--text)" }}
        >
          {label}
        </p>
        {sub && (
          <p
            className="text-[11px] font-body mt-0.5"
            style={{ color: "var(--text3)" }}
          >
            {sub}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <p
        className="text-[10px] font-body uppercase tracking-[0.8px] font-medium mb-1.5"
        style={{ color: "var(--text3)" }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, color = "#6366f1" }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className="relative flex-shrink-0 cursor-pointer transition-all duration-200"
      style={{
        width: 42,
        height: 24,
        borderRadius: 12,
        background: checked ? color : "var(--surface4)",
        border: "none",
        outline: "none",
      }}
    >
      <span
        className="absolute top-[3px] rounded-full transition-all duration-200"
        style={{
          width: 18,
          height: 18,
          background: "#fff",
          left: checked ? 21 : 3,
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}
