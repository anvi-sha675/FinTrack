import useStore from "../../store/useStore";
import { CATEGORIES } from "../../data/transactions";

export default function TransactionFilters() {
  const {
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    setSort,
    setSortDir,
    searchQuery,
    setSearch,
  } = useStore();

  return (
    <div
      className="flex flex-wrap items-center gap-3 p-4"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* Mobile search */}
      <div className="relative flex items-center md:hidden w-full">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          className="absolute left-3 pointer-events-none"
          style={{ fill: "var(--text3)" }}
        >
          <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions…"
          className="input-field pl-8 w-full"
        />
      </div>

      {/* Type pills */}
      <div className="flex gap-2">
        {["all", "income", "expense"].map((f) => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className="px-3 py-1.5 rounded-full text-[11px] font-body cursor-pointer transition-all duration-150 capitalize"
            style={
              filterType === f
                ? {
                    background: "var(--accent)",
                    color: "#fff",
                    border: "1px solid var(--accent)",
                  }
                : {
                    background: "transparent",
                    color: "var(--text2)",
                    border: "1px solid var(--border2)",
                  }
            }
          >
            {f === "all" ? "All Types" : f}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 ml-auto flex-wrap">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="input-field py-1.5 cursor-pointer text-[11px]"
          style={{ width: "auto", minWidth: 140 }}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => {
            const [field, dir] = e.target.value.split("-");
            setSort(field);
            setSortDir(dir === "asc" ? 1 : -1);
          }}
          className="input-field py-1.5 cursor-pointer text-[11px]"
          style={{ width: "auto", minWidth: 140 }}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>
    </div>
  );
}
