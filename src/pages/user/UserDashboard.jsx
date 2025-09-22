// src/pages/user/UserDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar/UserSidebar";
import api from "../../api"; // make sure your axios instance is set up

export default function UserDashboard() {
  useEffect(() => {
    document.title = "My Library";
  }, []);

  const [myLoans, setMyLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------- Modal state (Expected / Return) ----------
  const [modal, setModal] = useState({
    open: false,
    type: null, // 'expected' | 'return'
    loan: null,
    date: "",
    note: "",
  });

  const openModal = (type, loan) =>
    setModal({
      open: true,
      type,
      loan,
      date: loan?.due_date ? new Date(loan.due_date).toISOString().split("T")[0] : "",
      note: "",
    });

  const closeModal = () =>
    setModal({ open: false, type: null, loan: null, date: "", note: "" });

  // simple toast
  const [toast, setToast] = useState({ show: false, msg: "" });
  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 1800);
  };

  const confirmModal = () => {
    if (modal.type === "expected") {
      showToast("Expected date saved");
    } else {
      showToast("Return recorded");
    }
    closeModal();
  };

  // ---------- Fetch user data ----------
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Fetch user loans
        const response = await api.get("/borrow/user/me");
        setMyLoans(response.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load your dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // compute stats dynamically
  const counts = {
    borrowed: myLoans.filter((x) => x.status === "ACCEPTED" || x.status === "REQUESTED").length,
    overdue: myLoans.filter((x) => x.status === "OVERDUE").length,
    returned: myLoans.filter((x) => x.status === "RETURNED").length,
  };

  const currentUserName = myLoans[0]?.user?.name || "User";

  const statusBadge = (s) => {
    const base = "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium";
    if (s === "OVERDUE") return `${base} bg-red-100 text-red-700`;
    if (s === "ACCEPTED" || s === "REQUESTED") return `${base} bg-sky-100 text-sky-700`;
    return `${base} bg-green-100 text-green-700`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex bg-gray-100">
        <UserSidebar active="dashboard" />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex bg-gray-100">
        <UserSidebar active="dashboard" />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center text-red-600">
            <p className="text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <UserSidebar active="dashboard" />

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Welcome back!</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-sm text-gray-500">Borrowed</p>
            <p className="text-xl font-bold text-gray-800">{counts.borrowed}</p>
          </div>
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-sm text-gray-500">Overdue</p>
            <p className="text-xl font-bold text-red-600">{counts.overdue}</p>
          </div>
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-sm text-gray-500">Returned</p>
            <p className="text-xl font-bold text-gray-800">{counts.returned}</p>
          </div>
        </div>

        {/* My Loans */}
        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">My current loans</h3>
            <Link to="/loans" className="text-xs text-green-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3 min-w-[180px]">Title</th>
                  <th className="py-2 px-3 min-w-[160px]">User Name</th>
                  <th className="py-2 px-3 min-w-[140px]">Due Date</th>
                  <th className="py-2 px-3 min-w-[120px]">Status</th>
                  <th className="py-2 px-3 min-w-[220px] text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {myLoans.map((loan, i) => (
                  <tr key={loan.id} className="border-b border-gray-200">
                    <td className="py-2 px-3">{i + 1}</td>
                    <td className="py-2 px-3 font-medium">{loan.book?.title || "Unknown Book"}</td>
                    <td className="py-2 px-3">{loan.user?.name || currentUserName}</td>
                    <td className="py-2 px-3">
                      {loan.due_date ? new Date(loan.due_date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-2 px-3">
                      <span className={statusBadge(loan.status)}>{loan.status}</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openModal("expected", loan)}
                          className="inline-flex items-center gap-1 rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        >
                          Expected
                        </button>
                        <button
                          type="button"
                          onClick={() => openModal("return", loan)}
                          className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                          Return
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {myLoans.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      No active loans.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-1 pt-2 text-xs text-gray-500 md:hidden">
            Tip: swipe horizontally to see all columns.
          </div>
        </div>

        {/* Quick search placeholder */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Find a book</h3>
          <input
            placeholder="Search by title, author, ISBN…"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
      </main>

      {/* ---- Modal (Expected / Return) ---- */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="absolute inset-0 bg-black/50 opacity-0 animate-[fadeIn_.2s_ease-out_forwards]" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg bg-white shadow-lg border border-gray-200 opacity-0 translate-y-2 animate-[popIn_.22s_ease-out_forwards]">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  {modal.type === "expected" ? "Set Expected Date" : "Confirm Return"}
                </h3>
                {modal.loan && (
                  <p className="mt-1 text-sm text-gray-600">
                    {modal.loan.book?.title} — current due{" "}
                    {modal.loan.due_date ? new Date(modal.loan.due_date).toLocaleDateString() : "N/A"}
                  </p>
                )}
              </div>

              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    {modal.type === "expected" ? "Expected Date" : "Return Date"}
                  </label>
                  <input
                    type="date"
                    value={modal.date}
                    onChange={(e) => setModal((m) => ({ ...m, date: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Note (optional)</label>
                  <textarea
                    rows={3}
                    value={modal.note}
                    onChange={(e) => setModal((m) => ({ ...m, note: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    placeholder={
                      modal.type === "expected"
                        ? "Any extra info for the expected date…"
                        : "Condition / remarks on return…"
                    }
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmModal}
                  className={`rounded-md px-5 py-2 text-sm font-semibold text-white ${
                    modal.type === "expected"
                      ? "bg-sky-600 hover:bg-sky-500 focus:ring-2 focus:ring-sky-400"
                      : "bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-400"
                  }`}
                >
                  {modal.type === "expected" ? "Save Expected" : "Confirm Return"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- Toast ---- */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[60] pointer-events-none animate-[toastIn_.25s_ease-out]">
          <div className="pointer-events-auto flex items-start gap-3 rounded-xl bg-white shadow-lg ring-1 ring-black/5 px-4 py-3">
            <div className="mt-0.5">
              <svg
                className="text-green-600"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Success</p>
              <p className="text-xs text-gray-600">{toast.msg}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { to { opacity: 1 } }
        @keyframes popIn { to { opacity: 1; transform: translateY(0) } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(8px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}
