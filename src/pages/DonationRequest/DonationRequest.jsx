// src/pages/DonationRequest/DonationRequest.jsx
import { useEffect, useMemo, useState } from "react";
import {
  HandHeart,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Sidebar from "../../components/DashboardSidebar/DashboardSidebar";
import Pagination from "../../components/Pagination/Pagination";
import api from "../../api";

const PAGE_SIZE = 8;

// Format date
function fmtDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

// Pagination helpers
function paginate(rows, page, pageSize) {
  const start = (page - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}

// Filter bar
function StatusFilterBar({ query, setQuery, bsQuery, setBsQuery, statusFilter, setStatusFilter, bsInvalid }) {
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

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            value={bsQuery}
            onChange={(e) => setBsQuery(e.target.value)}
            placeholder="Search by BSID (e.g., BS0001)"
            className={`w-56 md:w-64 rounded border pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              bsInvalid ? "border-rose-300 focus:ring-rose-300" : "border-gray-300 focus:ring-sky-400"
            }`}
          />
        </div>
        {bsInvalid && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600">
            <AlertTriangle size={14} /> Unknown user ID format
          </span>
        )}

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default function DonationRequest() {
  useEffect(() => {
    document.title = "Donation Request";
  }, []);

  // --- State ---
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [query, setQuery] = useState("");
  const [bsQuery, setBsQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pendingPage, setPendingPage] = useState(1);
  const [collectedPage, setCollectedPage] = useState(1);
  const [rejectedPage, setRejectedPage] = useState(1);
  const [historyTablePage, setHistoryTablePage] = useState(1);
  const [toast, setToast] = useState({ open: false, type: "accepted", msg: "" });
  const [loading, setLoading] = useState(true);

  // --- Load from API ---
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await api.get("/donations/list"); 
        if (res.data && Array.isArray(res.data)) {
          const mapped = res.data.map(item => ({
            id: item.id,
            userId: item.user?.username || "",
            donorName: item.user?.name || "Unknown",
            bookTitle: item.book_title,
            author: item.author,
            note: item.notes,
            status: item.status.toLowerCase(),
          }));
          setItems(mapped);

          const hist = mapped
            .filter((item) => item.status !== "pending")
            .map((item) => ({
              id: `${item.id}-${Date.now()}`,
              requestId: item.id,
              action: item.status,
              at: new Date().toISOString(),
              donorName: item.donorName,
              bookTitle: item.bookTitle,
            }));
          setHistory(hist);
        } else {
          setItems([]);
          setHistory([]);
        }
      } catch (err) {
        console.error("Failed to fetch donation requests:", err);
        setItems([]);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // --- Stats ---
  const totalPending = items.filter((i) => i.status === "pending").length;
  const totalAccepted = items.filter((i) => i.status === "accepted").length;
  const totalRejected = items.filter((i) => i.status === "rejected").length;

  // --- Toast ---
  const showToast = (type, msg) => {
    setToast({ open: true, type, msg });
    setTimeout(() => setToast({ open: false, type: "accepted", msg: "" }), 1800);
  };

  // --- Filter ---
  const bsTrim = bsQuery.trim();
  const bsInvalid = bsTrim !== "" && !/^BS\d{4}$/i.test(bsTrim);

  const filtered = useMemo(() => {
    if (bsTrim) {
      const sub = items.filter((item) => item.userId && item.userId.toUpperCase() === bsTrim.toUpperCase());
      return statusFilter === "all" ? sub : sub.filter((item) => item.status === statusFilter);
    }
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch =
        !q ||
        item.donorName.toLowerCase().includes(q) ||
        (item.author || "").toLowerCase().includes(q) ||
        item.bookTitle.toLowerCase().includes(q) ||
        (item.note || "").toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [items, query, statusFilter, bsTrim]);

  const pendingRows = filtered.filter((i) => i.status === "pending");
  const acceptedRows = filtered.filter((i) => i.status === "approved");
  const rejectedRows = filtered.filter((i) => i.status === "rejected");

  // --- Accept/Reject (fixed for 422) ---
  const actOn = async (id, action) => {
  try {
    const numericId = typeof id === "string" && id.includes(":") ? parseInt(id.split(":")[0], 10) : id;

    // Map frontend action to backend enum
    const backendStatus = action.toUpperCase(); // accepted -> ACCEPTED

    await api.put(`/donations/status/${numericId}`, {
      status: backendStatus,
      admin_notes: "Processed via admin panel", // or empty string ""
    });

    // Update frontend state
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: action } : item))
    );

    const donation = items.find((i) => i.id === id);
    setHistory((prevHist) => [
      {
        id: `${id}-${Date.now()}`,
        requestId: numericId,
        action,
        at: new Date().toISOString(),
        donorName: donation?.donorName,
        bookTitle: donation?.bookTitle,
      },
      ...prevHist,
    ]);

    showToast(action, `${action === "accepted" ? "Accepted" : "Rejected"}: ${donation?.donorName}`);
  } catch (err) {
    console.error("Failed to update request:", err);
    alert("Failed to update request. Check console for details.");
  }
};

// --- Table Components ---
  const StatCard = ({ icon, label, value, tone = "sky" }) => (
    <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm">
      <div
        className={`rounded-full p-2 ${
          tone === "green" ? "bg-green-50 text-green-600" : tone === "rose" ? "bg-rose-50 text-rose-600" : "bg-sky-50 text-sky-600"
        }`}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );

  const Table = ({ rows, showActions, pageForCalc }) => (
    <div className="overflow-x-hidden overflow-y-hidden no-scrollbar rounded-lg border border-gray-300">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-700 border-b border-gray-300">
          <tr className="text-left">
            <th className="px-4 py-2 whitespace-nowrap">Serial No #</th>
            <th className="px-4 py-2">Donor</th>
            <th className="px-4 py-2">Book / Purpose</th>
            <th className="px-4 py-2">Status</th>
            {showActions && <th className="px-4 py-2 text-right">Action</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={showActions ? 5 : 4} className="px-4 py-6 text-center text-gray-500">
                No records found.
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={row.id} className="border-t border-gray-300">
                <td className="px-4 py-2 font-medium">{idx + 1 + (pageForCalc - 1) * PAGE_SIZE}</td>
                <td className="px-4 py-2">
                  <div className="font-medium">{row.donorName}</div>
                  {row.userId && <div className="text-[11px] text-gray-500 mt-0.5">BSID: {row.userId}</div>}
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium">{row.bookTitle}</div>
                  <div className="text-xs text-gray-500">Author: {row.author || "Unknown Author"}</div>
                  {row.note && <div className="text-xs text-gray-500">{row.note}</div>}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold border ${
                      row.status === "accepted"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : row.status === "rejected"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {row.status === "accepted" ? <CheckCircle2 size={14} /> : row.status === "rejected" ? <XCircle size={14} /> : <Clock size={14} />}
                    {row.status === "approved" ? "Collected" : row.status === "rejected" ? "Rejected" : "Pending"}
                  </span>
                </td>
                {showActions && (
                  <td className="px-4 py-2">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => actOn(row.id, "approved")} className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500">
                        <CheckCircle2 size={14} /> Accept
                      </button>
                      <button onClick={() => actOn(row.id, "rejected")} className="inline-flex items-center gap-1 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500">
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const HistoryTable = ({ rows, pageForCalc }) => (
    <div className="overflow-x-hidden overflow-y-hidden no-scrollbar rounded-lg border border-gray-300">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-700 border-b border-gray-300">
          <tr className="text-left">
            <th className="px-4 py-2">Serial No #</th>
            <th className="px-4 py-2">Donor</th>
            <th className="px-4 py-2">Book / Purpose</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                No history yet.
              </td>
            </tr>
          ) : (
            rows.map((h, idx) => (
              <tr key={h.id} className="border-t border-gray-300">
                <td className="px-4 py-2 font-medium">{idx + 1 + (pageForCalc - 1) * PAGE_SIZE}</td>
                <td className="px-4 py-2">{h.donorName}</td>
                <td className="px-4 py-2">{h.bookTitle}</td>
                <td className="px-4 py-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold border ${
                    h.action === "accepted" ? "bg-green-50 text-green-700 border-green-200" : "bg-rose-50 text-rose-700 border-rose-200"
                  }`}>
                    {h.action === "approved" ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {h.action === "approved" ? "Collected" : "Rejected"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const pendingSlice = paginate(pendingRows, pendingPage, PAGE_SIZE);
  const collectedSlice = paginate(acceptedRows, collectedPage, PAGE_SIZE);
  const rejectedSlice = paginate(rejectedRows, rejectedPage, PAGE_SIZE);
  const historySlice = paginate(history, historyTablePage, PAGE_SIZE);

  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <HandHeart className="text-sky-600" /> Donation Request
            </h1>
            <p className="text-sm text-gray-600">
              Accept / Reject commissions and view full history (persists on refresh).
            </p>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(1)} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="text-sm font-medium">Page {page} / 2</span>
            <button onClick={() => setPage(2)} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <StatusFilterBar
          query={query}
          setQuery={setQuery}
          bsQuery={bsQuery}
          setBsQuery={setBsQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          bsInvalid={bsInvalid}
        />

        {page === 1 ? (
          <>
            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={<Clock size={18} />} label="Pending" value={totalPending} />
              <StatCard icon={<CheckCircle2 size={18} />} label="Collected" value={totalAccepted} tone="green" />
              <StatCard icon={<XCircle size={18} />} label="Rejected" value={totalRejected} tone="rose" />
            </section>

            {/* Pending Requests */}
            <section className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-300">
                <h3 className="text-sm font-semibold text-gray-800">Pending Requests</h3>
              </div>
              <div className="p-4">
                <Table rows={pendingSlice} showActions pageForCalc={pendingPage} />
                <Pagination page={pendingPage} setPage={setPendingPage} totalItems={pendingRows.length} pageSize={PAGE_SIZE} />
              </div>
            </section>

            {/* Collected Requests */}
            <section className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-300">
                <h3 className="text-sm font-semibold text-gray-800">Collected</h3>
              </div>
              <div className="p-4">
                <Table rows={collectedSlice} showActions={false} pageForCalc={collectedPage} />
                <Pagination page={collectedPage} setPage={setCollectedPage} totalItems={acceptedRows.length} pageSize={PAGE_SIZE} />
              </div>
            </section>
          </>
        ) : (
          <section className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-300">
              <h3 className="text-sm font-semibold text-gray-800">Full History (Accepted & Rejected)</h3>
              <p className="text-xs text-gray-500 mt-1">
                Every accept/reject action is recorded and saved to your browser. Refresh the page and it remains.
              </p>
            </div>
            <div className="p-4">
              <HistoryTable rows={historySlice} pageForCalc={historyTablePage} />
              <Pagination page={historyTablePage} setPage={setHistoryTablePage} totalItems={history.length} pageSize={PAGE_SIZE} />
            </div>
          </section>
        )}
      </main>

      {/* Toast */}
      {toast.open && (
        <div className="fixed bottom-6 right-6 z-[60] animate-[toastIn_.22s_ease-out]">
          <div className="bg-white border border-gray-300 shadow-xl rounded-xl p-4 w-[300px]">
            <div className="flex items-start gap-3">
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${toast.type === "accepted" ? "bg-green-50 text-green-600" : "bg-rose-50 text-rose-600"}`}>
                {toast.type === "accepted" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">{toast.msg}</div>
                <div className="text-xs text-gray-600">Action recorded in history.</div>
              </div>
            </div>
            <div className="mt-3 h-0.5 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-sky-500 origin-left animate-[barShrink_1.6s_linear]"></div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes toastIn { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes barShrink { 0% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
      `}</style>
    </div>
  );
}
