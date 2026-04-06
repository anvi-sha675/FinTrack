import useStore from "../../store/useStore";
import { fmt } from "../../utils/helpers";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ChevronUp,
  Check,
  AlertTriangle,
} from "lucide-react";

export default function SummaryCards() {
  const { getStats } = useStore();
  const { income, expense, balance, savings } = getStats();

  const cards = [
    {
      label: "Total Balance",
      value: fmt(balance),
      color: "var(--accent)",
      iconBg: "var(--accent-dim)",
      Icon: Wallet,
      change: (
        <>
          <ChevronUp size={13} /> vs last period
        </>
      ),
      changeColor: "var(--text3)",
      delay: "delay-50",
    },
    {
      label: "Total Income",
      value: fmt(income),
      color: "var(--green)",
      iconBg: "var(--green-dim)",
      Icon: TrendingUp,
      change: (
        <>
          <ChevronUp size={13} /> +5.2% vs last month
        </>
      ),
      changeColor: "var(--green)",
      delay: "delay-100",
    },
    {
      label: "Total Expenses",
      value: fmt(expense),
      color: "var(--red)",
      iconBg: "var(--red-dim)",
      Icon: TrendingDown,
      change: (
        <>
          <ChevronUp size={13} style={{ transform: "rotate(180deg)" }} /> 3.1%
          vs last month
        </>
      ),
      changeColor: "var(--red)",
      delay: "delay-150",
    },
    {
      label: "Savings Rate",
      value: savings.toFixed(1) + "%",
      color: savings > 20 ? "var(--green)" : "var(--amber)",
      iconBg: savings > 20 ? "var(--green-dim)" : "var(--amber-dim)",
      Icon: PiggyBank,
      change:
        savings > 20 ? (
          <>
            <Check size={12} /> On track
          </>
        ) : (
          <>
            <AlertTriangle size={12} /> Below 20% target
          </>
        ),
      changeColor: savings > 20 ? "var(--green)" : "var(--amber)",
      delay: "delay-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`card p-5 flex items-center justify-between animate-fade-up ${c.delay} group transition-all duration-200 relative overflow-hidden`}
        >
          <div>
            <p
              className="text-[11px] uppercase tracking-[1px] font-medium font-body mb-2"
              style={{ color: "var(--text3)" }}
            >
              {c.label}
            </p>
            <p
              className="font-mono text-[22px] font-medium tracking-tight leading-none"
              style={{ color: c.color }}
            >
              {c.value}
            </p>
            <p
              className="text-[11px] mt-2 font-body flex items-center gap-0.5"
              style={{ color: c.changeColor }}
            >
              {c.change}
            </p>
          </div>

          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
            style={{ background: c.iconBg }}
          >
            <c.Icon size={18} style={{ color: c.color }} />
          </div>

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top right, ${c.color}20, transparent 60%)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
