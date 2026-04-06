import { useState } from "react";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionModal from "../components/transactions/TransactionModal";
import useStore from "../store/useStore";

export default function TransactionsPage({ onToast }) {
  const { role } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const openAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };
  const openEdit = (row) => {
    setEditData(row);
    setModalOpen(true);
  };

  return (
    <div className="p-6 max-w-[1280px] w-full">
      {/* Page header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-sans font-semibold text-[16px] text-white">
            Transactions
          </h2>
          <p className="text-[12px] text-muted font-body mt-0.5">
            Track and manage all your financial activity
          </p>
        </div>
        {role === "admin" && (
          <button onClick={openAdd} className="btn-primary">
            <PlusIcon /> Add Transaction
          </button>
        )}
      </div>

      <TransactionTable onEdit={openEdit} onToast={onToast} />

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onToast={onToast}
        editData={editData}
      />
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}
