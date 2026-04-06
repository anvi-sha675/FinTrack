import useStore from "../../store/useStore";
import { getCategoryTotals, fmt, catColor } from "../../utils/helpers";

export default function CategoryBreakdown() {
  const { transactions } = useStore();
  const totals = getCategoryTotals(transactions, "expense");
  const max = totals[0]?.[1] || 1;

  return (
    <div className="card p-5 animate-fade-up delay-100">
      <div className="mb-4">
        <h3
          className="font-sans font-semibold text-[14px]"
          style={{ color: "var(--text)" }}
        >
          Spending by Category
        </h3>
        <p
          className="text-[11px] mt-0.5 font-body"
          style={{ color: "var(--text3)" }}
        >
          Ranked by total spend
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {totals.length === 0 ? (
          <p
            className="text-center py-6 font-body"
            style={{ color: "var(--text3)" }}
          >
            No expense data
          </p>
        ) : (
          totals.map(([cat, amt]) => (
            <div key={cat}>
              <div className="flex justify-between items-center mb-1.5">
                <span
                  className="flex items-center gap-2 text-[12px] font-body"
                  style={{ color: "var(--text2)" }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: catColor(cat) }}
                  />
                  {cat}
                </span>
                <span
                  className="font-mono text-[12px]"
                  style={{ color: "var(--text)" }}
                >
                  {fmt(amt)}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "var(--surface3)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${((amt / max) * 100).toFixed(1)}%`,
                    background: catColor(cat),
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
