import useStore from "../../store/useStore";
import { getCategoryTotals, fmt } from "../../utils/helpers";
import {
  TrendingUp,
  Flame,
  Shield,
  Star,
  BarChart2,
  Lightbulb,
} from "lucide-react";

export default function KeyInsights() {
  const { transactions, getStats } = useStore();
  const { income, expense, balance } = getStats();
  const catTotals = getCategoryTotals(transactions, "expense");
  const topCat = catTotals[0] || ["N/A", 0];
  const biggest = transactions.reduce(
    (m, t) => (t.amount > m.amount ? t : m),
    transactions[0] || { amount: 0, category: "N/A", type: "income" },
  );
  const savingsRate =
    income > 0 ? (((income - expense) / income) * 100).toFixed(1) : "0.0";
  const avgTxn = transactions.length
    ? transactions.reduce((s, t) => s + t.amount, 0) / transactions.length
    : 0;

  const items = [
    {
      Icon: TrendingUp,
      bg: "var(--green-dim)",
      color: "var(--green)",
      title: "Positive Cash Flow",
      body: `You've earned ${fmt(balance)} more than you spent.`,
    },
    {
      Icon: Flame,
      bg: "var(--amber-dim)",
      color: "var(--amber)",
      title: "Top Expense Category",
      body: `You spent the most on ${topCat[0]} (${fmt(topCat[1])}).`,
    },
    {
      Icon: Shield,
      bg: "var(--accent-dim)",
      color: "var(--accent-light)",
      title: "Largest Transaction",
      body: `A ${biggest.type} of ${fmt(biggest.amount)} for ${biggest.category}.`,
    },
    {
      Icon: Star,
      bg: "var(--green-dim)",
      color: "var(--green)",
      title: "Savings Rate",
      body: `You saved ${savingsRate}% of your income this period.`,
    },
    {
      Icon: BarChart2,
      bg: "var(--blue-dim)",
      color: "var(--blue)",
      title: "Average Transaction",
      body: `Each transaction averages ${fmt(avgTxn)} across ${transactions.length} entries.`,
    },
  ];

  return (
    <div className="card p-5 animate-fade-up delay-250 flex flex-col">
      <h3
        className="font-sans font-semibold text-[14px] mb-4 flex items-center gap-2"
        style={{ color: "var(--text)" }}
      >
        <Lightbulb size={16} style={{ color: "var(--amber)" }} />
        Key Insights
      </h3>
      <div className="flex flex-col gap-3">
        {items.map((ins, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl transition-all duration-150 cursor-default"
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border3)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--surface3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--surface2)")
            }
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: ins.bg }}
            >
              <ins.Icon size={15} style={{ color: ins.color }} />
            </div>
            <div>
              <p
                className="text-[12px] font-medium leading-none mb-1 font-body"
                style={{ color: "var(--text)" }}
              >
                {ins.title}
              </p>
              <p
                className="text-[11px] font-body leading-relaxed"
                style={{ color: "var(--text3)" }}
              >
                {ins.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
