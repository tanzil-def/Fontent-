import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar/UserSidebar";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export default function UserDashboard() {
  const [myLoans, setMyLoans] = useState([]);
  const [counts, setCounts] = useState({ borrowed: 0, overdue: 0, returned: 0 });
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState({
    open: false,
    type: null,
    loan: null,
    date: "",
    note: "",
  });

  const [toast, setToast] = useState({ show: false, msg: "" });

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 1800);
  };

  const openModal = (type, loan) =>
    setModal({ open: true, type, loan, date: loan?.due || "", note: "" });
  const closeModal = () =>
    setModal({ open: false, type: null, loan: null, date: "", note: "" });

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // adjust if using auth
      const res = await axios.get(`${API_BASE}/borrow/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;
      setMyLoans(Array.isArray(data) ? data : []);

      const borrowed = (data || []).filter((x) => x.status === "Borrowed").length;
      const overdue = (data || []).filter((x) => x.status === "Overdue").length;
      const returned = (data || []).filter((x) => x.status === "Returned").length;

      setCounts({ borrowed, overdue, returned });
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      showToast("Failed to fetch loans");
      setMyLoans([]);
    } finally {
      setLoading(false);
    }
  };

  const confirmModal = async () => {
    if (!modal.loan) return;
    try {
      const token = localStorage.getItem("token");

      if (modal.type === "expected") {
        await axios.put(
          `${API_BASE}/borrow/extend_due_date`,
          {
            user_id: modal.loan.user_id,
            book_id: modal.loan.book_id,
            new_due_date: modal.date,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showToast("Expected date saved");
      } else {
        await axios.put(
          `${API_BASE}/borrow/return`,
          { borrow_id: modal.loan.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showToast("Return recorded");
      }
      fetchLoans();
      closeModal();
    } catch (err) {
      console.error("Failed operation:", err);
      showToast("Operation failed");
    }
  };

  useEffect(() => {
    document.title = "My Library";
    fetchLoans();
  }, []);

  const statusBadge = (s) => {
    const base = "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium";
    if (s === "Overdue") return `${base} bg-red-100 text-red-700`;
    if (s === "Borrowed") return `${base} bg-sky-100 text-sky-700`;
    return `${base} bg-green-100 text-green-700`;
  };

  const currentUserName = "Mark Wood";

  return (
    <div className="min-h-screen flex bg-gray-100">
      <UserSidebar active="dashboard" />
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

        {/* Loans Table */}
        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">My current loans</h3>
            <Link to="/loans" className="text-xs text-green-600 hover:underline">View All</Link>
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
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">Loading…</td>
                  </tr>
                ) : myLoans.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">No active loans.</td>
                  </tr>
                ) : (
                  myLoans.map((l, i) => (
                    <tr key={l.id} className="border-b border-gray-200">
                      <td className="py-2 px-3">{i + 1}</td>
                      <td className="py-2 px-3 font-medium">{l.title}</td>
                      <td className="py-2 px-3">{currentUserName}</td>
                      <td className="py-2 px-3">{l.due}</td>
                      <td className="py-2 px-3"><span className={statusBadge(l.status)}>{l.status}</span></td>
                      <td className="py-2 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => openModal("expected", l)} className="inline-flex items-center gap-1 rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500">Expected</button>
                          <button onClick={() => openModal("return", l)} className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500">Return</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-1 pt-2 text-xs text-gray-500 md:hidden">Tip: swipe horizontally to see all columns.</div>
        </div>
      </main>
    </div>
  );
}
