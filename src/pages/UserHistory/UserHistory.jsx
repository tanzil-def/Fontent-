// src/pages/user/UserDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { Search, Filter, Eye, X } from "lucide-react";
import UserSidebar from "../../components/UserSidebar/UserSidebar";
import api from "../../api"; // your axios instance

const badge = (type) => {
  const base = "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium";
  switch (type) {
    case "Borrowed":  return `${base} bg-sky-100 text-sky-700`;
    case "Returned":  return `${base} bg-green-100 text-green-700`;
    case "Overdue":   return `${base} bg-red-100 text-red-700`;
    default:          return `${base} bg-gray-100 text-gray-700`;
  }
};

// Helper to compute status dynamically
const computeStatus = (borrow) => {
  if (borrow.return_date) return "Returned";
  const due = new Date(borrow.due_date);
  const now = new Date();
  if (due < now) return "Overdue";
  return "Borrowed";
};

export default function UserDashboard() {
  useEffect(() => { document.title = "My Library"; }, []);

  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters / search
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // Detail modal
  const [detail, setDetail] = useState(null);
  const openDetail = (row) => setDetail(row);
  const closeDetail = () => setDetail(null);

  // Fetch borrows
  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        setLoading(true);
        const res = await api.get("/borrow/user/me");
        setBorrows(res.data.map((b) => ({
          id: `BR-${b.id}`,
          book: b.book.title,
          user: b.user.name,
          borrowedOn: b.borrow_date ? new Date(b.borrow_date).toLocaleDateString() : "",
          dueOn: b.due_date ? new Date(b.due_date).toLocaleDateString() : "",
          returnedOn: b.return_date ? new Date(b.return_date).toLocaleDateString() : "",
          type: computeStatus(b),
          raw: b // keep raw for detail modal
        })));
      } catch (err) {
        console.error("Failed to fetch user borrows:", err);
        setError("Failed to load your loans");
      } finally {
        setLoading(false);
      }
    };
    fetchBorrows();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return borrows.filter((r) => {
      const matchesType   = typeFilter === "All" || r.type === typeFilter;
      const matchesSearch =
        !term ||
        [r.id, r.book, r.user, r.type]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(term));
      return matchesType && matchesSearch;
    });
  }, [borrows, q, typeFilter]);

  // Stats
  const counts = useMemo(() => ({
    borrowed: borrows.filter((b) => b.type === "Borrowed").length,
    overdue:  borrows.filter((b) => b.type === "Overdue").length,
    returned: borrows.filter((b) => b.type === "Returned").length,
  }), [borrows]);

  if (loading) return (
    <div className="min-h-screen flex bg-gray-100">
      <UserSidebar active="dashboard" />
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center text-gray-600">Loading your loans...</div>
      </main>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex bg-gray-100">
      <UserSidebar active="dashboard" />
      <main className="flex-1 p-6 flex items-center justify-center text-red-600">
        {error}
      </main>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      <UserSidebar active="dashboard" />

      <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6">
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">Welcome back!</h1>

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

        {/* Loans table / card */}
        <section className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="p-3 md:p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="inline-flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                <Filter size={16} /> Type:
              </span>
              {["All","Borrowed","Overdue","Returned"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
                    typeFilter === t
                      ? "bg-sky-50 text-sky-700 ring-sky-200"
                      : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"
                  }`}
                >{t}</button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by book, user, id…"
                className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
          </div>

          {/* Mobile cards */}
          <ul className="md:hidden divide-y divide-gray-200 px-3 pb-3">
            {filtered.map((r,i) => (
              <li key={r.id} className="py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">#{i+1}</p>
                      <span className={badge(r.type)}>{r.type}</span>
                    </div>
                    <h3 className="mt-1 font-semibold text-gray-900">{r.book}</h3>
                    <p className="text-sm text-gray-600">{r.user}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openDetail(r)}
                    className="inline-flex items-center gap-1 rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <Eye size={14} /> View
                  </button>
                </div>
              </li>
            ))}
            {filtered.length===0 && <li className="py-6 text-center text-gray-500">No loans found.</li>}
          </ul>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-white">
                <tr className="text-left">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4 min-w-[220px]">Book</th>
                  <th className="py-3 px-4 min-w-[160px]">User</th>
                  <th className="py-3 px-4 min-w-[130px]">Borrowed On</th>
                  <th className="py-3 px-4 min-w-[120px]">Due Date</th>
                  <th className="py-3 px-4 min-w-[130px]">Returned On</th>
                  <th className="py-3 px-4 min-w-[120px]">Status</th>
                  <th className="py-3 px-4 min-w-[140px] text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((r,i)=>(
                  <tr key={r.id} className="even:bg-gray-50">
                    <td className="py-3 px-4">{i+1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{r.book}</td>
                    <td className="py-3 px-4 text-gray-700">{r.user}</td>
                    <td className="py-3 px-4 text-gray-700">{r.borrowedOn||"—"}</td>
                    <td className="py-3 px-4 text-gray-700">{r.dueOn||"—"}</td>
                    <td className="py-3 px-4 text-gray-700">{r.returnedOn||"—"}</td>
                    <td className="py-3 px-4"><span className={badge(r.type)}>{r.type}</span></td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={()=>openDetail(r)}
                        className="inline-flex items-center gap-1 rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length===0 && <tr><td colSpan={8} className="py-6 text-center text-gray-500">No loans found.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Details modal */}
      {detail && (
        <div className="fixed inset-0 z-50" aria-modal="true" role="dialog" onClick={e=>e.target===e.currentTarget && closeDetail()}>
          <div className="absolute inset-0 bg-black/50 opacity-0 animate-[fadeIn_.2s_ease-out_forwards]" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="w-full max-w-lg mx-4 rounded-lg bg-white shadow-lg border border-gray-200 opacity-0 translate-y-2 animate-[popIn_.22s_ease-out_forwards]">
              <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-base md:text-lg font-semibold text-gray-800">Loan Details</h3>
                <button onClick={closeDetail} className="p-1 rounded hover:bg-gray-100" aria-label="Close"><X size={18}/></button>
              </div>
              <div className="px-4 md:px-6 py-4 md:py-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4"><span className="text-gray-500">Record ID</span><span className="font-medium text-gray-800">{detail.id}</span></div>
                <div className="flex justify-between gap-4"><span className="text-gray-500">Book</span><span className="font-medium text-gray-800">{detail.book}</span></div>
                <div className="flex justify-between gap-4"><span className="text-gray-500">User</span><span className="font-medium text-gray-800">{detail.user}</span></div>
                <div className="flex justify-between gap-4"><span className="text-gray-500">Status</span><span className={badge(detail.type)}>{detail.type}</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="rounded border border-gray-200 p-3"><p className="text-xs text-gray-500 mb-1">Borrowed On</p><p className="font-medium text-gray-800">{detail.borrowedOn||"—"}</p></div>
                  <div className="rounded border border-gray-200 p-3"><p className="text-xs text-gray-500 mb-1">Due Date</p><p className="font-medium text-gray-800">{detail.dueOn||"—"}</p></div>
                  <div className="rounded border border-gray-200 p-3"><p className="text-xs text-gray-500 mb-1">Returned On</p><p className="font-medium text-gray-800">{detail.returnedOn||"—"}</p></div>
                </div>
              </div>
              <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 bg-white flex justify-end">
                <button type="button" onClick={closeDetail} className="rounded-md px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { to { opacity: 1 } }
        @keyframes popIn { to { opacity: 1; transform: translateY(0) } }
        .scrollbar-none::-webkit-scrollbar{ display:none }
        .scrollbar-none{ -ms-overflow-style:none; scrollbar-width:none }
      `}</style>
    </div>
  );
}
