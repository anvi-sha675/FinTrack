import { create } from "zustand";
import { SEED_TRANSACTIONS } from "../data/transactions";

let _nextId = SEED_TRANSACTIONS.length + 1;

// Load from localStorage
function loadState() {
  try {
    const raw = localStorage.getItem("finvault-v2");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(
      "finvault-v2",
      JSON.stringify({
        transactions: state.transactions,
        theme: state.theme,
        role: state.role,
      }),
    );
  } catch (e) {}
}

const saved = loadState();

const useStore = create((set, get) => ({
  transactions: saved?.transactions || SEED_TRANSACTIONS,
  role: saved?.role || "admin",
  theme: saved?.theme || "dark",
  searchQuery: "",
  filterType: "all",
  filterCategory: "all",
  sortField: "date",
  sortDir: -1,
  activePage: "dashboard",

  setRole: (role) => {
    set({ role });
    saveState({ ...get(), role });
  },

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    set({ theme: next });
    document.body.classList.toggle("light", next === "light");
    saveState({ ...get(), theme: next });
  },

  setActivePage: (page) => set({ activePage: page }),
  setSearch: (q) => set({ searchQuery: q }),
  setFilterType: (t) => set({ filterType: t }),
  setFilterCategory: (c) => set({ filterCategory: c }),

  setSort: (field) =>
    set((s) => ({
      sortField: field,
      sortDir: s.sortField === field ? s.sortDir * -1 : -1,
    })),
  setSortDir: (dir) => set({ sortDir: dir }),

  addTransaction: (txn) => {
    const id = _nextId++;
    const next = [{ ...txn, id }, ...get().transactions];
    set({ transactions: next });
    saveState({ ...get(), transactions: next });
  },

  updateTransaction: (id, data) => {
    const next = get().transactions.map((t) =>
      t.id === id ? { ...t, ...data } : t,
    );
    set({ transactions: next });
    saveState({ ...get(), transactions: next });
  },

  deleteTransaction: (id) => {
    const next = get().transactions.filter((t) => t.id !== id);
    set({ transactions: next });
    saveState({ ...get(), transactions: next });
  },

  getFiltered: () => {
    const {
      transactions,
      searchQuery,
      filterType,
      filterCategory,
      sortField,
      sortDir,
    } = get();
    let list = [...transactions];
    if (filterType !== "all") list = list.filter((t) => t.type === filterType);
    if (filterCategory !== "all")
      list = list.filter((t) => t.category === filterCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.category.toLowerCase().includes(q) ||
          t.type.toLowerCase().includes(q) ||
          t.date.includes(q) ||
          String(t.amount).includes(q),
      );
    }
    list.sort((a, b) => {
      if (sortField === "date") return a.date.localeCompare(b.date) * sortDir;
      if (sortField === "amount") return (a.amount - b.amount) * sortDir;
      if (sortField === "type") return a.type.localeCompare(b.type) * sortDir;
      if (sortField === "category")
        return a.category.localeCompare(b.category) * sortDir;
      return 0;
    });
    return list;
  },

  getStats: () => {
    const { transactions } = get();
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    return {
      income,
      expense,
      balance: income - expense,
      savings: income > 0 ? ((income - expense) / income) * 100 : 0,
    };
  },
}));

export default useStore;
