import { CAT_COLORS } from "../data/transactions";

export const fmt = (v) =>
  "$" +
  Math.abs(v).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const fmtDate = (d) => {
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export const catColor = (cat) => CAT_COLORS[cat] || "#6b7280";

export const getCategoryTotals = (transactions, type = "expense") => {
  const map = {};
  transactions
    .filter((t) => t.type === type)
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
};

export const getDailyBalance = (transactions, days = 30) => {
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
  if (!sorted.length) return [];

  const end = new Date("2026-04-02");
  const start = new Date(end);
  start.setDate(start.getDate() - days + 1);

  let running = 0;
  // pre-compute balance before window
  sorted.forEach((t) => {
    const d = new Date(t.date + "T00:00:00");
    if (d < start) running += t.type === "income" ? t.amount : -t.amount;
  });

  const points = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dk = d.toISOString().split("T")[0];
    sorted
      .filter((t) => t.date === dk)
      .forEach((t) => {
        running += t.type === "income" ? t.amount : -t.amount;
      });
    points.push({
      date: dk,
      label: `${d.getMonth() + 1}/${String(d.getDate()).padStart(2, "0")}`,
      balance: running,
    });
  }
  return points;
};

export const exportToCSV = (transactions) => {
  const rows = [
    ["Date", "Category", "Type", "Amount"],
    ...transactions.map((t) => [t.date, t.category, t.type, t.amount]),
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "fintrack-export.csv";
  a.click();
};

export const exportToJSON = (transactions) => {
  const json = JSON.stringify(transactions, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "fintrack-export.json";
  a.click();
};
