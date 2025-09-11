import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Users,
  BookOpen,
  HelpCircle,
  LogOut,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/DashboardSidebar/DashboardSidebar";
import api from "../../api";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Library Dashboard";
  }, []);

  const [stats, setStats] = useState({
    borrowed: 0,
    returned: 0,
    overdue: 0,
    totalBooks: 0,
    newMembers: 0,
    borrowsPending: 0,
  });

  const [requests, setRequests] = useState([]);
  const [overdueHistory, setOverdueHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => new Date());

  // Confirmation modal state
  const [confirm, setConfirm] = useState({ open: false, type: null, index: -1 });
  const openConfirm = (type, index) => setConfirm({ open: true, type, index });
  const closeConfirm = () => setConfirm({ open: false, type: null, index: -1 });

  // Toast (2s)
  const [toast, setToast] = useState({ show: false, type: "accept", message: "" });
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type, message: "" }), 2000);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch dashboard statistics
        const statsResponse = await api.get("/api/deshbord/statistics");
        const statsData = statsResponse.data;
        setStats({
          borrowed: statsData.borrowed_books || 0,
          returned: statsData.returned_books || 0,
          overdue: statsData.overdue_books || 0,
          totalBooks: statsData.total_books || 0,
          newMembers: statsData.new_members || 0,
          borrowsPending: statsData.borrows_pending || 0,
        });

        // Fetch active borrows (for borrow requests)
        const borrowsResponse = await api.get("/api/borrow/active");
        setRequests(borrowsResponse.data || []);

        // Fetch overdue borrows
        const overdueResponse = await api.get("/api/borrow/overdue");
        setOverdueHistory(overdueResponse.data || []);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Update time every second
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBorrowAction = async (action, borrowId) => {
    try {
      let endpoint = "";
      
      if (action === "accept") {
        endpoint = "/api/borrow/accept";
      } else if (action === "reject") {
        endpoint = "/api/borrow/reject";
      }
      
      await api.put(endpoint, { borrow_id: borrowId });
      
      // Remove the request from the list
      setRequests(prev => prev.filter(req => req.id !== borrowId));
      showToast(action, `Request ${action}ed`);
    } catch (error) {
      console.error(`Failed to ${action} borrow request:`, error);
      showToast("error", `Failed to ${action} request`);
    }
  };

  const doConfirm = () => {
    const { type, index } = confirm;
    if (index > -1 && requests[index]) {
      handleBorrowAction(type, requests[index].id);
    }
    closeConfirm();
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  // -------------------- WEEKLY LINE CHART --------------------
  const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Keep your 3 series but name them Borrowed/Returned/Overdue (weekly base)
  const series = useMemo(
    () => [
      { name: "Borrowed", color: "stroke-sky-500",   dot: "fill-sky-500",   values: [20, 55, 62, 28, 24, 68, 64] },
      { name: "Returned", color: "stroke-amber-500", dot: "fill-amber-400", values: [48, 40, 30, 18, 22, 42, 58] },
      { name: "Overdue",  color: "stroke-rose-500",  dot: "fill-rose-500",  values: [10, 30, 55, 58, 26, 40, 88] },
    ],
    []
  );

  // Chart rendering code remains the same...
  const chartBox = { w: 720, h: 200, padX: 36, padY: 20 };
  const allVals = series.flatMap((s) => s.values);
  const yMax = Math.max(1, Math.ceil(Math.max(...allVals) / 10) * 10);
  const yMin = 0;

  const sx = (i) =>
    chartBox.padX + (i * (chartBox.w - chartBox.padX * 2)) / (WEEK_LABELS.length - 1);
  const sy = (v) =>
    chartBox.h - chartBox.padY - ((v - yMin) / (yMax - yMin)) * (chartBox.h - chartBox.padY * 2);

  const makeSmoothPath = (vals) => {
    const pts = vals.map((v, i) => ({ x: sx(i), y: sy(v) }));
    if (!pts.length) return "";
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const xc = (pts[i - 1].x + pts[i].x) / 2;
      const yc = (pts[i - 1].y + pts[i].y) / 2;
      d += ` Q ${pts[i - 1].x} ${pts[i - 1].y}, ${xc} ${yc}`;
    }
    d += ` T ${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;
    return d;
  };

  const paths = series.map((s) => ({ ...s, d: makeSmoothPath(s.values) }));

  // Stroke-draw animation
  const pathRefs = useRef([]);
  useEffect(() => {
    pathRefs.current.forEach((el, i) => {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      // reflow then animate
      el.getBoundingClientRect();
      el.style.transition = `stroke-dashoffset 900ms ease ${i * 140}ms`;
      el.style.strokeDashoffset = "0";
    });
  }, [paths.map((p) => p.d).join("|")]);

  // "Updated" timestamp
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  if (loading) {
    return (
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-gray-500">Loading dashboard data...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6">
        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Borrowed Books", value: stats.borrowed },
            { label: "Returned Books", value: stats.returned },
            { label: "Overdue Books", value: stats.overdue },
            { label: "Total Books", value: stats.totalBooks },
            { label: "New Members", value: stats.newMembers },
            { label: "Borrows Pending", value: stats.borrowsPending },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded shadow p-4 text-center">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-xl font-bold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Graph + Overdue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold mb-2">Check-Out Statistics</h3>
              <span className="text-xs text-gray-500">Updated {hh}:{mm}:{ss}</span>
            </div>

            <div className="w-full flex justify-center">
              <svg
                viewBox={`0 0 ${chartBox.w} ${chartBox.h}`}
                width="100%"
                height="220"
                className="max-w-full"
                aria-label="Weekly Dynamics Line Chart"
              >
                {/* grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                  const y = chartBox.padY + t * (chartBox.h - chartBox.padY * 2);
                  return (
                    <line
                      key={i}
                      x1={chartBox.padX}
                      x2={chartBox.w - chartBox.padX}
                      y1={y}
                      y2={y}
                      className="stroke-gray-200"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* baseline */}
                <line
                  x1={chartBox.padX}
                  x2={chartBox.w - chartBox.padX}
                  y1={chartBox.h - chartBox.padY}
                  y2={chartBox.h - chartBox.padY}
                  className="stroke-gray-300"
                  strokeWidth="1"
                />

                {/* x labels */}
                {WEEK_LABELS.map((w, i) => (
                  <text
                    key={w}
                    x={sx(i)}
                    y={chartBox.h - 6}
                    textAnchor="middle"
                    className="fill-gray-400"
                    style={{ fontSize: 10 }}
                  >
                    {w}
                  </text>
                ))}

                {/* animated lines + dots */}
                {paths.map((p, idx) => (
                  <g key={idx}>
                    <path
                      ref={(el) => (pathRefs.current[idx] = el)}
                      d={p.d}
                      className={`${p.color}`}
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {p.values.map((v, i) => (
                      <circle
                        key={i}
                        cx={sx(i)}
                        cy={sy(v)}
                        r="3.4"
                        className={`${p.dot} stroke-white`}
                        strokeWidth="1.2"
                      />
                    ))}
                  </g>
                ))}
              </svg>
            </div>

            {/* Weekly legend UNDER chart */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {series.map((s) => (
                <div key={s.name} className="flex items-start gap-3">
                  <span
                    className={`mt-2 inline-block w-8 h-1.5 rounded-full ${s.color.replace(
                      "stroke",
                      "bg"
                    )}`}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{s.name}</p>
                    <p className="text-[11px] leading-4 text-gray-400">Mon – Sun</p>
                    <p className="text-[11px] leading-4 text-gray-400">7 pts</p>
                    <p className="text-[11px] leading-4 text-gray-400">Updated weekly</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overdue History */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-2">Overdue History</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th>#</th>
                  <th>Book name</th>
                  <th>User name</th>
                  <th className="text-center">Email</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {overdueHistory.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td>{index + 1}</td>
                    <td className="font-semibold">{item.book_title}</td>
                    <td>{item.user_name}</td>
                    <td className="text-center">
                      <span className="inline-flex items-center justify-center gap-1 text-gray-700">
                        <Mail size={16} className="text-gray-500" />
                        <span>{item.user_email}</span>
                      </span>
                    </td>
                    <td>{formatDate(item.due_date)}</td>
                  </tr>
                ))}
                {overdueHistory.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      No overdue books at the moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Borrow Request */}
        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Borrow Requests</h3>
            <Link to="/borrow/list" className="text-xs text-green-600 hover:underline">
              View All
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th>#</th>
                <th>Book name</th>
                <th>User name</th>
                <th>Borrowed Date</th>
                <th>Due Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request.id} className="border-b border-gray-200">
                  <td>{index + 1}</td>
                  <td className="font-medium">{request.book_title}</td>
                  <td>{request.user_name}</td>
                  <td>{formatDate(request.borrow_date)}</td>
                  <td>{formatDate(request.due_date)}</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => openConfirm("accept", index)}
                        className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => openConfirm("reject", index)}
                        className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    No pending borrow requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Confirm Modal */}
      {confirm.open && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeConfirm();
          }}
        >
          <div className="absolute inset-0 bg-black/50 opacity-0 animate-[fadeIn_.2s_ease-out_forwards]" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg bg-white shadow-lg border border-gray-200 opacity-0 translate-y-2 animate-[popIn_.22s_ease-out_forwards]">
              <div className="px-6 py-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {confirm.type === "accept" ? (
                      <CheckCircle2 className="text-green-600" size={24} />
                    ) : (
                      <AlertTriangle className="text-amber-500" size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {confirm.type === "accept"
                        ? "Accept this borrow request?"
                        : "Reject this borrow request?"}
                    </h3>
                    {confirm.index > -1 && requests[confirm.index] && (
                      <p className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">
                          {requests[confirm.index].book_title}
                        </span>{" "}
                        — {requests[confirm.index].user_name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeConfirm}
                  className="rounded-md px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={doConfirm}
                  className={`rounded-md px-4 py-2 text-sm font-semibold text-white ${
                    confirm.type === "accept"
                      ? "bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-400"
                      : "bg-red-600 hover:bg-red-500 focus:ring-2 focus:ring-red-400"
                  }`}
                >
                  {confirm.type === "accept" ? "Confirm" : "Reject"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[60] pointer-events-none animate-[toastIn_.25s_ease-out]">
          <div className="pointer-events-auto flex items-start gap-3 rounded-xl bg-white shadow-lg ring-1 ring-black/5 px-4 py-3">
            <div className="mt-0.5">
              {toast.type === "accept" ? (
                <CheckCircle2 className="text-green-600" size={22} />
              ) : toast.type === "reject" ? (
                <XCircle className="text-red-600" size={22} />
              ) : (
                <XCircle className="text-red-600" size={22} />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {toast.type === "accept" ? "Accepted" : toast.type === "reject" ? "Rejected" : "Error"}
              </p>
              <p className="text-xs text-gray-600">{toast.message}</p>
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