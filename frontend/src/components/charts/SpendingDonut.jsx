import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import useStore from "../../store/useStore";
import { getCategoryTotals, fmt, catColor } from "../../utils/helpers";

Chart.register(...registerables);

export default function SpendingDonut() {
  const { transactions, theme } = useStore();
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const catTotals = getCategoryTotals(transactions, "expense");
  const total = catTotals.reduce((s, [, v]) => s + v, 0);

  useEffect(() => {
    if (!canvasRef.current || !catTotals.length) return;
    if (chartRef.current) chartRef.current.destroy();

    const isLight = theme === "light";
    const labels = catTotals.map(([c]) => c);
    const data = catTotals.map(([, v]) => v);
    const colors = labels.map((l) => catColor(l));

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
            borderWidth: 2.5,
            borderColor: isLight ? "#fff" : "#13161d",
            hoverBorderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "72%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isLight ? "#fff" : "#1a1e28",
            borderColor: isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
            borderWidth: 1,
            titleColor: isLight ? "#6b7280" : "rgba(255,255,255,0.5)",
            bodyColor: isLight ? "#111827" : "#fff",
            padding: 10,
            callbacks: {
              label: (c) =>
                ` ${fmt(c.raw)} (${Math.round((c.raw / total) * 100)}%)`,
            },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [transactions, theme]);

  return (
    <div className="card p-5 animate-fade-up delay-200">
      <h3
        className="font-sans font-semibold text-[14px] mb-4"
        style={{ color: "var(--text)" }}
      >
        Spending by Category
      </h3>
      <div
        className="relative mx-auto mb-4"
        style={{ width: 190, height: 190 }}
      >
        <canvas ref={canvasRef} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p
            className="font-mono text-[17px] font-medium leading-none"
            style={{ color: "var(--text)" }}
          >
            {fmt(total)}
          </p>
          <p
            className="text-[10px] mt-1 font-body"
            style={{ color: "var(--text3)" }}
          >
            Total Spent
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-center">
        {catTotals.map(([cat]) => (
          <span
            key={cat}
            className="flex items-center gap-1.5 text-[11px] font-body"
            style={{ color: "var(--text2)" }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: catColor(cat) }}
            />
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
