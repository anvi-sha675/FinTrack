import CategoryBreakdown from "../components/ui/CategoryBreakdown";
import KeyInsights from "../components/ui/KeyInsights";
import SavingsChart from "../components/charts/SavingsChart";
import SpendingDonut from "../components/charts/SpendingDonut";
import useStore from "../store/useStore";
import { fmt, getCategoryTotals } from "../utils/helpers";

export default function InsightsPage() {
  const { transactions, getStats } = useStore();
  const { income, expense, balance, savings } = getStats();
  const catTotals = getCategoryTotals(transactions, "expense");

  const statsRow = [
    { label: "Net Savings", value: fmt(balance), color: "#22c55e" },
    {
      label: "Savings Rate",
      value: savings.toFixed(1) + "%",
      color: savings > 20 ? "#22c55e" : "#f59e0b",
    },
    { label: "Total Income", value: fmt(income), color: "#6366f1" },
    {
      label: "Top Category",
      value: catTotals[0]?.[0] || "—",
      color: "#f59e0b",
    },
  ];

  return (
    <div className="p-6 max-w-[1280px] w-full">
      {/* Top stat strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {statsRow.map((s) => (
          <div key={s.label} className="card px-5 py-4 animate-fade-up">
            <p className="text-[11px] text-muted uppercase tracking-[1px] font-body font-medium mb-1.5">
              {s.label}
            </p>
            <p
              className="font-mono text-[18px] font-medium"
              style={{ color: s.color }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Category bars + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <CategoryBreakdown />
        <KeyInsights />
      </div>

      {/* Donut + Savings rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SpendingDonut />
        <SavingsChart />
      </div>
    </div>
  );
}
