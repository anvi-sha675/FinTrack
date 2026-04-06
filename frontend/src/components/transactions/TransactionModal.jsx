import { useState, useEffect } from "react";
import useStore from "../../store/useStore";
import { CATEGORIES } from "../../data/transactions";

const EMPTY = { date: "", category: "Groceries", type: "expense", amount: "" };

export default function TransactionModal({
  isOpen,
  onClose,
  onToast,
  editData = null,
}) {
  const { addTransaction, updateTransaction } = useStore();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm(
        editData
          ? {
              date: editData.date,
              category: editData.category,
              type: editData.type,
              amount: String(editData.amount),
            }
          : { ...EMPTY, date: new Date().toISOString().split("T")[0] },
      );
      setErrors({});
    }
  }, [isOpen, editData]);

  if (!isOpen) return null;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.date) e.date = "Date is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const txn = {
      date: form.date,
      category: form.category,
      type: form.type,
      amount: parseFloat(Number(form.amount).toFixed(2)),
    };
    if (editData) {
      updateTransaction(editData.id, txn);
      onToast("Transaction updated!");
    } else {
      addTransaction(txn);
      onToast("Transaction added!");
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl animate-fade-up"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border2)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h2
            className="font-sans font-semibold text-[15px]"
            style={{ color: "var(--text)" }}
          >
            {editData ? "Edit Transaction" : "New Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="text-xl leading-none cursor-pointer transition-opacity hover:opacity-60"
            style={{ color: "var(--text3)" }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Type toggle */}
          <div>
            <Label>Type</Label>
            <div
              className="flex rounded-xl overflow-hidden"
              style={{
                background: "var(--surface2)",
                border: "1px solid var(--border2)",
              }}
            >
              {["expense", "income"].map((t) => (
                <button
                  key={t}
                  onClick={() => set("type", t)}
                  className="flex-1 py-2.5 text-xs font-medium font-body capitalize transition-all duration-150 cursor-pointer"
                  style={
                    form.type === t
                      ? {
                          background:
                            t === "income" ? "var(--green)" : "var(--red)",
                          color: "#fff",
                        }
                      : { background: "transparent", color: "var(--text3)" }
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Category</Label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="input-field"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Amount ($)</Label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              placeholder="0.00"
              className="input-field"
            />
            {errors.amount && (
              <p
                className="text-[11px] mt-1 font-body"
                style={{ color: "var(--red)" }}
              >
                {errors.amount}
              </p>
            )}
          </div>

          <div>
            <Label>Date</Label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className="input-field"
            />
            {errors.date && (
              <p
                className="text-[11px] mt-1 font-body"
                style={{ color: "var(--red)" }}
              >
                {errors.date}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 pb-5">
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary">
            {editData ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <p
      className="text-[11px] uppercase tracking-[0.8px] font-medium font-body mb-1.5"
      style={{ color: "var(--text3)" }}
    >
      {children}
    </p>
  );
}
