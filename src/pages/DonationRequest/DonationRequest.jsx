// src/pages/DonationRequest/DonationRequest.jsx
import { useEffect, useMemo, useState } from "react";
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
import api from "../../api"; // <-- Axios instance

const LS_KEY = "donation_requests_v1";
const PAGE_SIZE = 8;

// ---------- Utility functions ----------
function fmtDate(iso) { const d = new Date(iso); return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString(); }
function attachUserIdsAndAuthor(items) { let idx = 1; return items.map((it) => { const userId = it.userId && /^BS\d{4}$/i.test(it.userId) ? it.userId : `BS${String(idx++).padStart(4,"0")}`; return { author: it.author || "Unknown Author", ...it, userId }; }); }
function paginate(rows, page, pageSize) { const start = (page - 1) * pageSize; return rows.slice(start, start + pageSize); }
function totalPages(rows, pageSize) { return Math.max(1, Math.ceil(rows.length / pageSize)); }

// ---------- Filter bar ----------
function StatusFilterBar({ query, setQuery, bsQuery, setBsQuery, statusFilter, setStatusFilter, bsInvalid }) { 
  return (
    <section className="bg-white rounded-lg shadow border border-gray-300">
      <div className="px-4 py-3 flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by donor, author, or book" className="w-64 md:w-80 rounded border border-gray-300 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input value={bsQuery} onChange={e => setBsQuery(e.target.value)} placeholder="Search by BSID (e.g., BS0001)" className={`w-56 md:w-64 rounded border pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 ${bsInvalid ? "border-rose-300 focus:ring-rose-300" : "border-gray-300 focus:ring-sky-400"}`} />
        </div>
        {bsInvalid && <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600"><AlertTriangle size={14} /> Unknown user (use format: <strong>BS0000</strong>)</span>}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400">
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
  useEffect(() => { document.title = "Donation Request"; }, []);

  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [bsQuery, setBsQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pendingPage, setPendingPage] = useState(1);
  const [collectedPage, setCollectedPage] = useState(1);
  const [rejectedPage, setRejectedPage] = useState(1);
  const [unifiedPage, setUnifiedPage] = useState(1);
  const [historyTablePage, setHistoryTablePage] = useState(1);
  const [toast, setToast] = useState({ open:false, type:"accepted", msg:"" });

  // ---------- API fetch ----------
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await api.get("/donations/list"); // GET all donations
        if (Array.isArray(res.data)) {
          const mapped = res.data.map(d => ({
            id: d.id,
            donorName: d.user?.name || "Unknown",
            email: d.user?.email || "",
            userId: `BS${String(d.user?.id || 0).padStart(4,"0")}`,
            bookTitle: d.book_title,
            author: d.author || "Unknown Author",
            amount: d.amount || 0,
            note: d.notes || "",
            status: d.status.toLowerCase(),
            createdAt: d.created_at,
          }));
          setItems(mapped);

          // Build initial history from non-pending items
          const hist = mapped
            .filter(it => it.status !== "pending")
            .map(it => ({
              id: `${it.id}-INIT`,
              requestId: it.id,
              action: it.status,
              at: it.createdAt,
              amount: it.amount,
              donorName: it.donorName,
              bookTitle: it.bookTitle,
            }));
          setHistory(hist);
        }
      } catch (err) {
        console.error("Fetch donations failed", err);
      }
    };
    fetchDonations();
  }, []);

  // ---------- Derived ----------
  const bsTrim = bsQuery.trim();
  const bsValid = bsTrim === "" || /^BS\d{4}$/i.test(bsTrim);
  const bsInvalid = bsTrim !== "" && !bsValid;
  const filtered = useMemo(() => {
    if (bsTrim) {
      if (!/^BS\d{4}$/i.test(bsTrim)) return [];
      const target = bsTrim.toUpperCase();
      const sub = items.filter(it => it.userId.toUpperCase() === target);
      return statusFilter==="all"?sub:sub.filter(it=>it.status===statusFilter);
    }
    const q = query.trim().toLowerCase();
    return items.filter(it => {
      const matchQ = !q || it.donorName.toLowerCase().includes(q) || it.bookTitle.toLowerCase().includes(q) || (it.author||"").toLowerCase().includes(q) || (it.note||"").toLowerCase().includes(q) || it.email.toLowerCase().includes(q);
      const matchS = statusFilter==="all"?true:it.status===statusFilter;
      return matchQ && matchS;
    });
  }, [items, query, statusFilter, bsTrim]);

  // ---------- Table slices ----------
  const pendingRows = filtered.filter(x=>x.status==="pending");
  const acceptedRows = filtered.filter(x=>x.status==="accepted");
  const rejectedRows = filtered.filter(x=>x.status==="rejected");
  const totalPending = items.filter(x=>x.status==="pending").length;
  const totalAccepted = items.filter(x=>x.status==="accepted").length;
  const totalRejected = items.filter(x=>x.status==="rejected").length;

  // ---------- Accept/Reject ----------
  const actOn = async (id, action) => {
    try {
      await api.put(`/donations/status/${id}`, { status: action.toUpperCase() }); // update backend
      const updatedItems = items.map(it => it.id===id?{...it,status:action}:it);
      setItems(updatedItems);
      const src = items.find(x=>x.id===id);
      const entry = src ? { id:`${id}-${Date.now()}`, requestId:id, action, at:new Date().toISOString(), amount:src.amount, donorName:src.donorName, bookTitle:src.bookTitle } : null;
      if(entry) setHistory([entry,...history]);
      setToast({ open:true, type:action, msg:`${action==="accepted"?"Accepted":"Rejected"}: ${src?.donorName||""}` });
    } catch(err) {
      console.error("Status update failed", err);
    }
  };
  // ---------- Small UI components ----------
  const StatCard = ({ icon, label, value, tone = "sky" }) => (
    <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm">
      <div
        className={`rounded-full p-2 ${
          tone === "green"
            ? "bg-green-50 text-green-600"
            : tone === "rose"
            ? "bg-rose-50 text-rose-600"
            : "bg-sky-50 text-sky-600"
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

  // Table
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
            rows.map((r, idx) => (
              <tr key={r.id} className="border-t border-gray-300">
                <td className="px-4 py-2 font-medium">
                  {idx + 1 + (pageForCalc - 1) * PAGE_SIZE}
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium">{r.donorName}</div>
                  {r.userId && <div className="text-[11px] text-gray-500 mt-0.5">BSID: {r.userId}</div>}
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium">{r.bookTitle}</div>
                  <div className="text-xs text-gray-500">
                    Author: {r.author || "Unknown Author"}
                  </div>
                  {r.note && <div className="text-xs text-gray-500">{r.note}</div>}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold border
                      ${
                        r.status === "accepted"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : r.status === "rejected"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                  >
                    {r.status === "accepted" ? (
                      <CheckCircle2 size={14} />
                    ) : r.status === "rejected" ? (
                      <XCircle size={14} />
                    ) : (
                      <Clock size={14} />
                    )}
                    {r.status === "accepted" ? "Collected" : r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                </td>
                {showActions && (
                  <td className="px-4 py-2">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => actOn(r.id, "accepted")}
                        className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500"
                      >
                        <CheckCircle2 size={14} /> Accept
                      </button>
                      <button
                        onClick={() => actOn(r.id, "rejected")}
                        className="inline-flex items-center gap-1 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500"
                      >
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

  // History page table
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
                <td className="px-4 py-2 font-medium">
                  {idx + 1 + (pageForCalc - 1) * PAGE_SIZE}
                </td>
                <td className="px-4 py-2">{h.donorName}</td>
                <td className="px-4 py-2">{h.bookTitle}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold border
                      ${
                        h.action === "accepted"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                  >
                    {h.action === "accepted" ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {h.action === "accepted" ? "Collected" : "Rejected"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  // Unified table conditions:
  const showUnifiedTable = page === 1 && (statusFilter !== "all" || bsTrim.length > 0);

  // Unified rows & pages
  const unifiedRows = useMemo(() => {
    if (bsTrim) return filtered;
    if (statusFilter === "all") return filtered;
    return filtered.filter((it) => it.status === statusFilter);
  }, [filtered, statusFilter, bsTrim]);
  const unifiedTotalPages = totalPages(unifiedRows, PAGE_SIZE);
  const unifiedSlice = paginate(unifiedRows, unifiedPage, PAGE_SIZE);

  const unifiedHeading = (() => {
    if (bsTrim) return "Search Results";
    if (statusFilter === "accepted") return "Collected";
    return statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1);
  })();

  // Default-page slices
  const pendingTotalPages = totalPages(pendingRows, PAGE_SIZE);
  const pendingSlice = paginate(pendingRows, pendingPage, PAGE_SIZE);

  const collectedTotalPages = totalPages(acceptedRows, PAGE_SIZE);
  const collectedSlice = paginate(acceptedRows, collectedPage, PAGE_SIZE);

  // Rejected slice (only used when unified rejected is showing)
  const rejectedTotalPages = totalPages(rejectedRows, PAGE_SIZE);
  const rejectedSlice = paginate(rejectedRows, rejectedPage, PAGE_SIZE);

  // History slices
  const historyTotalPages = totalPages(history, PAGE_SIZE);
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

          {/* Simple 2-page pagination (view switcher) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="text-sm font-medium">Page {page} / 2</span>
            <button
              onClick={() => setPage((p) => Math.min(2, p + 1))}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Filters */}
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
            {/* Stats (Accepted renamed to Collected) */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={<Clock size={18} />} label="Pending" value={totalPending} />
              <StatCard icon={<CheckCircle2 size={18} />} label="Collected" value={totalAccepted} tone="green" />
              <StatCard icon={<XCircle size={18} />} label="Rejected" value={totalRejected} tone="rose" />
            </section>

            {showUnifiedTable ? (
              // One table when filtering by status or using BSID
              <section className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-300">
                  <h3 className="text-sm font-semibold text-gray-800">{unifiedHeading}</h3>
                </div>
                <div className="p-4">
                  <Table
                    rows={
                      statusFilter === "rejected" && !bsTrim
                        ? rejectedSlice
                        : unifiedSlice
                    }
                    showActions={statusFilter === "pending" && !bsTrim ? true : statusFilter === "pending"}
                    pageForCalc={unifiedPage}
                  />
                  <Pagination
                    page={unifiedPage}
                    setPage={setUnifiedPage}
                    totalItems={statusFilter === "rejected" && !bsTrim ? rejectedRows.length : unifiedRows.length}
                    pageSize={PAGE_SIZE}
                  />
                </div>
              </section>
            ) : (
              // Default view: ONLY Pending + Collected (each paginated)
              <>
                <section className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-800">Pending Requests</h3>
                  </div>
                  <div className="p-4">
                    <Table rows={pendingSlice} showActions pageForCalc={pendingPage} />
                    <Pagination
                      page={pendingPage}
                      setPage={setPendingPage}
                      totalItems={pendingRows.length}
                      pageSize={PAGE_SIZE}
                    />
                  </div>
                </section>

                <section className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-800">Collected</h3>
                  </div>
                  <div className="p-4">
                    <Table rows={collectedSlice} showActions={false} pageForCalc={collectedPage} />
                    <Pagination
                      page={collectedPage}
                      setPage={setCollectedPage}
                      totalItems={acceptedRows.length}
                      pageSize={PAGE_SIZE}
                    />
                  </div>
                </section>
              </>
            )}
          </>
        ) : (
          // Page 2: Full History (paginated)
          <section className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-300">
              <h3 className="text-sm font-semibold text-gray-800">Full History (Accepted & Rejected)</h3>
              <p className="text-xs text-gray-500 mt-1">
                Every accept/reject action is recorded and saved to your browser. Refresh the page and it remains.
              </p>
            </div>
            <div className="p-4">
              <HistoryTable rows={historySlice} pageForCalc={historyTablePage} />
              <Pagination
                page={historyTablePage}
                setPage={setHistoryTablePage}
                totalItems={history.length}
                pageSize={PAGE_SIZE}
              />
            </div>
          </section>
        )}
      </main>

      {/* Toast */}
      {toast.open && (
        <div className="fixed bottom-6 right-6 z-[60] animate-[toastIn_.22s_ease-out]">
          <div className="bg-white border border-gray-300 shadow-xl rounded-xl p-4 w-[300px]">
            <div className="flex items-start gap-3">
              <div
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${
                  toast.type === "accepted" ? "bg-green-50 text-green-600" : "bg-rose-50 text-rose-600"
                }`}
              >
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

      {/* Styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes toastIn { 0% { transform: translateY(10px); opacity: 0 } 100% { transform: translateY(0); opacity: 1 } }
        @keyframes barShrink { 0% { transform: scaleX(1) } 100% { transform: scaleX(0) } }
      `}</style>
    </div>
  );
}