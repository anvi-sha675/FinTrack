import { useState } from "react";
import useStore from "../../store/useStore";
import { fmt, fmtDate, catColor } from "../../utils/helpers";
import TransactionFilters from "./TransactionFilters";
import { ClipboardList, Eye } from "lucide-react";

const COLS = [
  { field: "date", label: "Date" },
  { field: "category", label: "Category" },
  { field: "type", label: "Type" },
  { field: "amount", label: "Amount" },
];

export default function TransactionTable({ onEdit, onToast }) {
  const { role, getFiltered, deleteTransaction, sortField, sortDir, setSort } =
    useStore();
  const rows = getFiltered();
  const [confirmId, setConfirmId] = useState(null);

  const handleDelete = (id) => {
    deleteTransaction(id);
    setConfirmId(null);
    onToast("Transaction deleted", "warning");
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return <span style={{ opacity: 0.2, marginLeft: 3 }}>↕</span>;
    return (
      <span style={{ color: "var(--accent-light)", marginLeft: 3 }}>
        {sortDir === -1 ? "↓" : "↑"}
      </span>
    );
  };

  return (
    <div className="card overflow-hidden animate-fade-up delay-100">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <h3
          className="font-sans font-semibold text-[15px]"
          style={{ color: "var(--text)" }}
        >
          Recent Transactions
        </h3>
        <span
          className="text-[11px] font-body"
          style={{ color: "var(--text3)" }}
        >
          {rows.length} record{rows.length !== 1 ? "s" : ""}
        </span>
      </div>

      <TransactionFilters />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {COLS.map((col) => (
                <th
                  key={col.field}
                  onClick={() => setSort(col.field)}
                  className="px-6 py-3 text-left text-[11px] font-medium font-body uppercase tracking-[0.6px] cursor-pointer select-none transition-colors"
                  style={{
                    color:
                      sortField === col.field
                        ? "var(--accent-light)"
                        : "var(--text3)",
                  }}
                >
                  {col.label}
                  <SortIcon field={col.field} />
                </th>
              ))}
              {role === "admin" && (
                <th
                  className="px-6 py-3 text-left text-[11px] font-medium font-body uppercase tracking-[0.6px]"
                  style={{ color: "var(--text3)" }}
                >
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 5 : 4}
                  className="text-center py-14 font-body"
                  style={{ color: "var(--text3)" }}
                >
                  <div className="flex justify-center mb-2">
                    <ClipboardList
                      size={36}
                      style={{ color: "var(--text3)", opacity: 0.3 }}
                    />
                  </div>
                  No transactions match your filters
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom:
                      i < rows.length - 1 ? "1px solid var(--border3)" : "none",
                  }}
                  className="group"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--surface2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td
                    className="px-6 py-3.5 font-mono text-[12px]"
                    style={{ color: "var(--text2)" }}
                  >
                    {fmtDate(row.date)}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className="flex items-center gap-2 font-body text-[13px] font-semibold"
                      style={{ color: "var(--text)" }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: catColor(row.category) }}
                      />
                      {row.category}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={
                        row.type === "income" ? "badge-income" : "badge-expense"
                      }
                    >
                      {row.type.toUpperCase()}
                    </span>
                  </td>
                  <td
                    className="px-6 py-3.5 font-mono text-[13px] font-medium"
                    style={{
                      color:
                        row.type === "income" ? "var(--green)" : "var(--text)",
                    }}
                  >
                    {row.type === "income" ? "+" : "-"}
                    {fmt(row.amount)}
                  </td>

                  {role === "admin" && (
                    <td className="px-6 py-3.5">
                      {confirmId === row.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="text-[11px] font-body px-2.5 py-1 rounded-lg cursor-pointer"
                            style={{
                              background: "var(--red-dim)",
                              color: "var(--red)",
                              border: "1px solid rgba(239,68,68,0.25)",
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="text-[11px] font-body px-2.5 py-1 rounded-lg cursor-pointer"
                            style={{
                              background: "var(--surface2)",
                              color: "var(--text3)",
                              border: "1px solid var(--border2)",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          <button
                            onClick={() => onEdit(row)}
                            className="text-[11px] font-body px-2.5 py-1 rounded-lg cursor-pointer"
                            style={{
                              background: "var(--accent-dim)",
                              color: "var(--accent-light)",
                              border: "1px solid rgba(99,102,241,0.2)",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setConfirmId(row.id)}
                            className="text-[11px] font-body px-2.5 py-1 rounded-lg cursor-pointer"
                            style={{
                              background: "var(--red-dim)",
                              color: "var(--red)",
                              border: "1px solid rgba(239,68,68,0.18)",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {role === "viewer" && (
        <div
          className="px-6 py-3 text-[11px] font-body flex items-center justify-center gap-1.5"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--text3)",
          }}
        >
          <Eye size={13} />
          View-only mode — switch to Admin to edit transactions
        </div>
      )}
    </div>
  );
}
