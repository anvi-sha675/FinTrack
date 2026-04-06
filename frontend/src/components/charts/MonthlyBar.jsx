import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import useStore from "../../store/useStore";
import { MONTHLY_DATA } from "../../data/transactions";

Chart.register(...registerables);

export default function MonthlyBar() {
  const { transactions, theme } = useStore();
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const marInc = transactions
      .filter((t) => t.date.startsWith("2026-03") && t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const marExp = transactions
      .filter((t) => t.date.startsWith("2026-03") && t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    const aprInc = transactions
      .filter((t) => t.date.startsWith("2026-04") && t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const aprExp = transactions
      .filter((t) => t.date.startsWith("2026-04") && t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);

    const merged = MONTHLY_DATA.map((m) => {
      if (m.month === "Mar")
        return {
          ...m,
          income: marInc || m.income,
          expense: marExp || m.expense,
        };
      if (m.month === "Apr")
        return {
          ...m,
          income: aprInc || m.income,
          expense: aprExp || m.expense,
        };
      return m;
    });

    const isLight = theme === "light";
    const gridColor = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)";
    const tickColor = isLight ? "#9ca3af" : "#5e6478";

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: merged.map((m) => m.month),
        datasets: [
          {
            label: "Income",
            data: merged.map((m) => m.income),
            backgroundColor: "rgba(34,197,94,0.7)",
            borderRadius: 4,
            borderSkipped: false,
          },
          {
            label: "Expenses",
            data: merged.map((m) => m.expense),
            backgroundColor: "rgba(239,68,68,0.65)",
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isLight ? "#fff" : "#1a1e28",
            borderColor: isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
            borderWidth: 1,
            titleColor: isLight ? "#6b7280" : "rgba(255,255,255,0.5)",
            bodyColor: isLight ? "#111827" : "#fff",
            padding: 10,
            callbacks: { label: (c) => ` $${c.raw.toLocaleString()}` },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: tickColor, font: { size: 11 } },
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { size: 10 },
              callback: (v) =>
                "$" + (v >= 1000 ? (v / 1000).toFixed(0) + "k" : v),
            },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [transactions, theme]);

  return (
    <div className="card p-5 animate-fade-up delay-250">
      <div className="flex items-center justify-between mb-4">
        <h3
          className="font-sans font-semibold text-[14px]"
          style={{ color: "var(--text)" }}
        >
          Monthly Overview
        </h3>
        <div className="flex gap-4">
          {[
            ["#22c55e", "Income"],
            ["#ef4444", "Expenses"],
          ].map(([color, label]) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-[11px] font-body"
              style={{ color: "var(--text2)" }}
            >
              <span
                className="w-2 h-2 rounded-sm flex-shrink-0"
                style={{ background: color }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>
      <div style={{ position: "relative", height: 190 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
