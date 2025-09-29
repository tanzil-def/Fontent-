// src/pages/DonationRequest/DonationRequest.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  HandHeart,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import Sidebar from "../../components/DashboardSidebar/DashboardSidebar";
import Pagination from "../../components/Pagination/Pagination";

// Page size
const PAGE_SIZE = 8;
const API_BASE = "http://127.0.0.1:8000/api/donations";

function fmtDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

function paginate(rows, page, pageSize) {
  const start = (page - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}
function totalPages(rows, pageSize) {
  return Math.max(1, Math.ceil(rows.length / pageSize));
}

// ---- Filter bar ----
function StatusFilterBar({
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <section className="bg-white rounded-lg shadow border border-gray-300">
      <div className="px-4 py-3 flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by donor, author, or book"
            className="w-64 md:w-80 rounded border border-gray-300 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {/* Status select */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="all">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default function DonationRequest() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1); // view switcher (1=list, 2=history)
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Table pages
  const [tablePage, setTablePage] = useState(1);

  // Toast
  const [toast, setToast] = useState({ open: false, type: "accepted", msg: "" });
  const showToast = (type, msg) => {
    setToast({ open: true, type, msg });
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast((t) => ({ ...t, open: false })), 1800);
  };

  // ---- Load donations from API ----
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // যদি JWT token লাগে
        const res = await axios.get(`${API_BASE}/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(res.data || []);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  // ---- Action: Accept/Reject ----
  const actOn = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE}/status/${id}`,
        { status: action.toUpperCase() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update locally
      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, status: action.toUpperCase() } : it
        )
      );
      showToast(action, `${action} donation updated`);
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // ---- Derived ----
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      const matchQ =
        !q ||
        it.book_title.toLowerCase().includes(q) ||
        (it.author || "").toLowerCase().includes(q) ||
        (it.notes || "").toLowerCase().includes(q) ||
        (it.user?.name || "").toLowerCase().includes(q);
      const matchS =
        statusFilter === "all" ? true : it.status === statusFilter;
      return matchQ && matchS;
    });
  }, [items, query, statusFilter]);

  const slice = paginate(filtered, tablePage, PAGE_SIZE);

  const totalPending = items.filter((x) => x.status === "PENDING").length;
  const totalApproved = items.filter((x) => x.status === "APPROVED").length;
  const totalRejected = items.filter((x) => x.status === "REJECTED").length;

  // ---- Table ----
  const Table = ({ rows }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-700 border-b border-gray-300">
          <tr className="text-left">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Donor</th>
            <th className="px-4 py-2">Book</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No records found.
              </td>
            </tr>
          ) : (
            rows.map((r, idx) => (
              <tr key={r.id} className="border-t border-gray-300">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{r.user?.name || "—"}</td>
                <td className="px-4 py-2">
                  <div className="font-medium">{r.book_title}</div>
                  <div className="text-xs text-gray-500">{r.author}</div>
                </td>
                <td className="px-4 py-2">{r.status}</td>
                <td className="px-4 py-2 text-right">
                  {r.status === "PENDING" && (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => actOn(r.id, "APPROVED")}
                        className="bg-green-600 px-3 py-1.5 text-xs font-semibold text-white rounded hover:bg-green-500"
                      >
                        <CheckCircle2 size={14} /> Accept
                      </button>
                      <button
                        onClick={() => actOn(r.id, "REJECTED")}
                        className="bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white rounded hover:bg-rose-500"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <HandHeart className="text-sky-600" /> Donation Requests
        </h1>

        <StatusFilterBar
          query={query}
          setQuery={setQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border">
            Pending: {totalPending}
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            Approved: {totalApproved}
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            Rejected: {totalRejected}
          </div>
        </section>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <section className="bg-white rounded-lg shadow border p-4">
            <Table rows={slice} />
            <Pagination
              page={tablePage}
              setPage={setTablePage}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
            />
          </section>
        )}
      </main>

      {/* Toast */}
      {toast.open && (
        <div className="fixed bottom-6 right-6 z-[60]">
          <div className="bg-white border border-gray-300 shadow-xl rounded-xl p-4 w-[300px]">
            <div className="flex items-start gap-3">
              <div
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${
                  toast.type === "APPROVED"
                    ? "bg-green-50 text-green-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {toast.type === "APPROVED" ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <XCircle size={18} />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">
                  {toast.msg}
                </div>
                <div className="text-xs text-gray-600">Action recorded.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}