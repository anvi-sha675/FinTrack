export default function ToastContainer({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-fade-up flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-body"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border2)",
            color: "var(--text)",
            boxShadow: "var(--shadow)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background:
                t.type === "error"
                  ? "var(--red)"
                  : t.type === "warning"
                    ? "var(--amber)"
                    : "var(--green)",
            }}
          />
          {t.message}
        </div>
      ))}
    </div>
  );
}
