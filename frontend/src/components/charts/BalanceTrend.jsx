import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import useStore from "../../store/useStore";
import { getDailyBalance } from "../../utils/helpers";

Chart.register(...registerables);
const PERIODS = [
  { label: "1W", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
];

export default function BalanceTrend() {
  const { transactions, theme } = useStore();
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [period, setPeriod] = useState("1W");

  useEffect(() => {
    if (!canvasRef.current) return;
    const days = PERIODS.find((p) => p.label === period)?.days || 7;
    const data = getDailyBalance(transactions, days);
    if (chartRef.current) chartRef.current.destroy();

    const ctx = canvasRef.current.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, 0, 220);
    grad.addColorStop(0, "rgba(99,102,241,0.28)");
    grad.addColorStop(1, "rgba(99,102,241,0.01)");

    const isLight = theme === "light";
    const gridColor = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)";
    const tickColor = isLight ? "#9ca3af" : "#5e6478";
    const tooltipBg = isLight ? "#fff" : "#1a1e28";
    const tooltipBorder = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";
    const tooltipTitle = isLight ? "#6b7280" : "rgba(255,255,255,0.5)";
    const tooltipBody = isLight ? "#111827" : "#fff";

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => d.label),
        datasets: [
          {
            label: "Balance",
            data: data.map((d) => d.balance),
            borderColor: "#6366f1",
            backgroundColor: grad,
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#6366f1",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            borderColor: tooltipBorder,
            borderWidth: 1,
            titleColor: tooltipTitle,
            bodyColor: tooltipBody,
            padding: 10,
            callbacks: {
              label: (c) =>
                " $" +
                Math.abs(c.raw).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                }),
            },
          },
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { size: 10, family: "DM Mono" },
              maxTicksLimit: 8,
            },
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { size: 10 },
              callback: (v) =>
                "$" + (v >= 1000 ? (v / 1000).toFixed(1) + "k" : v),
            },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [transactions, period, theme]);

  return (
    <div className="card p-5 mb-5 animate-fade-up delay-100">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3
            className="font-sans font-semibold text-[14px]"
            style={{ color: "var(--text)" }}
          >
            Balance Trend
          </h3>
          <p
            className="text-[11px] mt-0.5 font-body"
            style={{ color: "var(--text3)" }}
          >
            Running balance over time
          </p>
        </div>
        <div className="flex gap-1">
          {PERIODS.map((p) => (
            <button
              key={p.label}
              onClick={() => setPeriod(p.label)}
              className="px-3 py-1 rounded-lg text-[11px] font-body border transition-all duration-150 cursor-pointer"
              style={
                period === p.label
                  ? {
                      background: "var(--accent)",
                      color: "#fff",
                      borderColor: "var(--accent)",
                    }
                  : {
                      background: "transparent",
                      color: "var(--text3)",
                      borderColor: "var(--border2)",
                    }
              }
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ position: "relative", height: 220 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
