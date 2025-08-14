// // Dashboard.jsx (unchanged except for functional Borrow Request actions)

// import { useEffect, useState } from "react";
// import {
//   CalendarDays,
//   Upload,
//   Users,
//   BookOpen,
//   HelpCircle,
//   LogOut,
//   Library, // optional
//   Layers,  // optional
//   AlertTriangle,
//   CheckCircle2,
//   XCircle
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   useEffect(() => {
//     document.title = "Library Dashboard";
//   }, []);

//   // --- Borrow Request demo data (replace with API later) ---
//   const [requests, setRequests] = useState([
//     { book: "Core Java", user: "Sadia Prova", borrowed: "29/07/2025", returned: "03/08/2025" },
//     { book: "SQL in 10 Minutes", user: "Arman Hasan", borrowed: "01/08/2025", returned: "06/08/2025" },
//   ]);

//   // Confirmation modal state
//   const [confirm, setConfirm] = useState({ open: false, type: null, index: -1 });

//   const openConfirm = (type, index) => setConfirm({ open: true, type, index });
//   const closeConfirm = () => setConfirm({ open: false, type: null, index: -1 });

//   // Toast (2s)
//   const [toast, setToast] = useState({ show: false, type: "accept", message: "" });
//   const showToast = (type, message) => {
//     setToast({ show: true, type, message });
//     setTimeout(() => setToast({ show: false, type, message: "" }), 2000);
//   };

//   const doConfirm = () => {
//     const { type, index } = confirm;
//     if (index > -1) {
//       setRequests((prev) => prev.filter((_, i) => i !== index)); // remove processed row
//       showToast(type, type === "accept" ? "Request accepted" : "Request rejected");
//     }
//     closeConfirm();
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md px-4 py-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-xl font-bold mb-6">Library</h2>
//           <ul className="space-y-3">
//             <li>
//               <Link
//                 to="/dashboard"
//                 className="flex items-center gap-2 text-sky-600 font-medium"
//               >
//                 <CalendarDays size={18} /> Dashboard
//               </Link>
//             </li>

//             {/* NEW — Manage Books */}
//             <li>
//               <Link
//                 to="/manage-books"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <BookOpen size={18} /> Manage Books
//               </Link>
//             </li>

//             {/* NEW — Manage Category */}
//             <li>
//               <Link
//                 to="/manage-category"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <Layers size={18} /> Manage Category
//               </Link>
//             </li>

//             {/* <li>
//               <Link
//                 to="/upload"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <Upload size={18} /> Upload Books
//               </Link>
//             </li> */}
//             <li>
//               <Link
//                 to="/fill-up-form"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <BookOpen size={18} /> Fill Up Form
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/members"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <Users size={18} /> Member
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/check-out"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <BookOpen size={18} /> Check-out Books
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/setting"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <HelpCircle size={18} /> Setting
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <Link
//             to="/logout"
//             className="flex items-center gap-2 text-red-600 font-medium hover:underline underline-offset-4"
//           >
//             <LogOut size={18} /> Logout
//           </Link>
//         </div>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-6 space-y-6">
//         {/* Top Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { label: "Borrowed Books", value: 3504 },
//             { label: "Returned Books", value: 683 },
//             { label: "Overdue Books", value: 145 },
//             // { label: "Missing Books", value: 32 },
//             { label: "Total Books", value: 5654 },
//             // { label: "Visitors", value: 1554 },
//             { label: "New Members", value: 120 },
//             { label: "Borrows Pending", value: 222 },
//           ].map((item, i) => (
//             <div key={i} className="bg-white rounded shadow p-4 text-center">
//               <p className="text-sm text-gray-500">{item.label}</p>
//               <p className="text-xl font-bold text-gray-800">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Graph + Overdue */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded shadow p-4">
//             <h3 className="font-semibold mb-2">Check-Out Statistics</h3>
//             <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
//               Graph Placeholder
//             </div>
//           </div>

//           <div className="bg-white rounded shadow p-4">
//             <h3 className="font-semibold mb-2">Overdue’s History</h3>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left border-b border-gray-200">
//                   <th>Employee ID</th>
//                   <th>Title</th>
//                   <th>ISBN</th>
//                   <th>Due</th>
//                   <th>Fine</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-200">
//                   <td>BS1862</td>
//                   <td className="font-semibold">Core Java</td>
//                   <td>3223</td>
//                   <td>6 days</td>
//                   <td>-</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Borrow Request (functional) */}
//         <div className="bg-white rounded shadow p-4">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-semibold">Borrow Request</h3>
//             <Link to="#" className="text-xs text-green-600 hover:underline">
//               View All
//             </Link>
//           </div>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left border-b border-gray-200">
//                 <th>#</th>
//                 <th>Book name</th>
//                 <th>User name</th>
//                 <th>Borrowed Date</th>
//                 <th>Returned Date</th>
//                 <th className="text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.map((r, i) => (
//                 <tr key={`${r.book}__${r.user}__${i}`} className="border-b border-gray-200">
//                   <td>{i + 1}</td>
//                   <td className="font-medium">{r.book}</td>
//                   <td>{r.user}</td>
//                   <td>{r.borrowed}</td>
//                   <td>{r.returned}</td>
//                   <td className="text-center">
//                     <div className="flex items-center justify-center gap-2">
//                       <button
//                         type="button"
//                         onClick={() => openConfirm("accept", i)}
//                         className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
//                       >
//                         Accept
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => openConfirm("reject", i)}
//                         className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {requests.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="py-6 text-center text-gray-500">
//                     No pending borrow requests.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {/* ---- Confirm Modal (Accept / Reject) ---- */}
//       {confirm.open && (
//         <div
//           className="fixed inset-0 z-50"
//           aria-modal="true"
//           role="dialog"
//           onClick={(e) => {
//             if (e.target === e.currentTarget) closeConfirm();
//           }}
//         >
//           {/* Backdrop */}
//           <div className="absolute inset-0 bg-black/50 opacity-0 animate-[fadeIn_.2s_ease-out_forwards]" />
//           {/* Panel */}
//           <div className="absolute inset-0 flex items-center justify-center px-4">
//             <div className="w-full max-w-md rounded-lg bg-white shadow-lg border border-gray-200 opacity-0 translate-y-2 animate-[popIn_.22s_ease-out_forwards]">
//               <div className="px-6 py-5">
//                 <div className="flex items-start gap-3">
//                   <div className="mt-0.5">
//                     {confirm.type === "accept" ? (
//                       <CheckCircle2 className="text-green-600" size={24} />
//                     ) : (
//                       <AlertTriangle className="text-amber-500" size={24} />
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {confirm.type === "accept"
//                         ? "Accept this borrow request?"
//                         : "Reject this borrow request?"}
//                     </h3>
//                     {confirm.index > -1 && (
//                       <p className="mt-1 text-sm text-gray-600">
//                         <span className="font-medium">
//                           {requests[confirm.index]?.book}
//                         </span>{" "}
//                         — {requests[confirm.index]?.user}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={closeConfirm}
//                   className="rounded-md px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={doConfirm}
//                   className={`rounded-md px-4 py-2 text-sm font-semibold text-white ${
//                     confirm.type === "accept"
//                       ? "bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-400"
//                       : "bg-red-600 hover:bg-red-500 focus:ring-2 focus:ring-red-400"
//                   }`}
//                 >
//                   {confirm.type === "accept" ? "Confirm" : "Reject"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ---- Toast (2s) ---- */}
//       {toast.show && (
//         <div className="fixed bottom-6 right-6 z-[60] pointer-events-none animate-[toastIn_.25s_ease-out]">
//           <div className="pointer-events-auto flex items-start gap-3 rounded-xl bg-white shadow-lg ring-1 ring-black/5 px-4 py-3">
//             <div className="mt-0.5">
//               {toast.type === "accept" ? (
//                 <CheckCircle2 className="text-green-600" size={22} />
//               ) : (
//                 <XCircle className="text-red-600" size={22} />
//               )}
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-gray-900">
//                 {toast.type === "accept" ? "Accepted" : "Rejected"}
//               </p>
//               <p className="text-xs text-gray-600">{toast.message}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* animations */}
//       <style>{`
//         @keyframes fadeIn { to { opacity: 1 } }
//         @keyframes popIn { to { opacity: 1; transform: translateY(0) } }
//         @keyframes toastIn { from { opacity: 0; transform: translateY(8px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
//       `}</style>
//     </div>
//   );
// }




// // Dashboard.jsx (weekly smooth line chart; email column centered with icon; everything else unchanged)

// import { useEffect, useMemo, useState } from "react";
// import {
//   CalendarDays,
//   Upload,
//   Users,
//   BookOpen,
//   HelpCircle,
//   LogOut,
//   Library, // optional
//   Layers,  // optional
//   AlertTriangle,
//   CheckCircle2,
//   XCircle,
//   Mail,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   useEffect(() => {
//     document.title = "Library Dashboard";
//   }, []);

//   // --- Borrow Request demo data (replace with API later) ---
//   const [requests, setRequests] = useState([
//     { book: "Core Java", user: "Sadia Prova", borrowed: "29/07/2025", returned: "03/08/2025" },
//     { book: "SQL in 10 Minutes", user: "Arman Hasan", borrowed: "01/08/2025", returned: "06/08/2025" },
//   ]);

//   // Confirmation modal state
//   const [confirm, setConfirm] = useState({ open: false, type: null, index: -1 });
//   const openConfirm = (type, index) => setConfirm({ open: true, type, index });
//   const closeConfirm = () => setConfirm({ open: false, type: null, index: -1 });

//   // Toast (2s)
//   const [toast, setToast] = useState({ show: false, type: "accept", message: "" });
//   const showToast = (type, message) => {
//     setToast({ show: true, type, message });
//     setTimeout(() => setToast({ show: false, type, message: "" }), 2000);
//   };

//   const doConfirm = () => {
//     const { type, index } = confirm;
//     if (index > -1) {
//       setRequests((prev) => prev.filter((_, i) => i !== index)); // remove processed row
//       showToast(type, type === "accept" ? "Request accepted" : "Request rejected");
//     }
//     closeConfirm();
//   };

//   // -------------------- WEEKLY LINE CHART (replaces pie) --------------------
//   // 7 points = Mon..Sun (keep simple demo numbers; you can wire to live data)
//   const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//   const series = useMemo(
//     () => [
//       {
//         name: "Borrowed",
//         color: "stroke-sky-500",
//         dot: "fill-sky-500",
//         values: [18, 35, 52, 28, 24, 60, 58], // blue (up, down, up) like your sample
//       },
//       {
//         name: "Returned",
//         color: "stroke-amber-500",
//         dot: "fill-amber-400",
//         values: [40, 34, 26, 18, 22, 38, 50], // orange (gently down then up)
//       },
//       {
//         name: "Overdue",
//         color: "stroke-rose-500",
//         dot: "fill-rose-500",
//         values: [10, 22, 48, 54, 20, 28, 72], // red (mid-week peak & strong finish)
//       },
//     ],
//     []
//   );

//   // Build smooth paths (quadratic Bezier mid-point technique)
//   const chartBox = { w: 520, h: 160, padX: 28, padY: 16 }; // fits inside h-40 area nicely
//   const allVals = series.flatMap((s) => s.values);
//   const yMax = Math.max(1, Math.ceil(Math.max(...allVals) / 10) * 10);
//   const yMin = 0;

//   const sx = (i) =>
//     chartBox.padX +
//     (i * (chartBox.w - chartBox.padX * 2)) / (WEEK_LABELS.length - 1);
//   const sy = (v) =>
//     chartBox.h - chartBox.padY - ((v - yMin) / (yMax - yMin)) * (chartBox.h - chartBox.padY * 2);

//   const makeSmoothPath = (vals) => {
//     const pts = vals.map((v, i) => ({ x: sx(i), y: sy(v) }));
//     if (pts.length === 0) return "";
//     if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
//     let d = `M ${pts[0].x} ${pts[0].y}`;
//     for (let i = 1; i < pts.length; i++) {
//       const xc = (pts[i - 1].x + pts[i].x) / 2;
//       const yc = (pts[i - 1].y + pts[i].y) / 2;
//       d += ` Q ${pts[i - 1].x} ${pts[i - 1].y}, ${xc} ${yc}`;
//     }
//     d += ` T ${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;
//     return d;
//   };

//   const paths = series.map((s) => ({ ...s, d: makeSmoothPath(s.values) }));

//   // "Updated" timestamp
//   const [now, setNow] = useState(() => new Date());
//   useEffect(() => {
//     const id = setInterval(() => setNow(new Date()), 1000);
//     return () => clearInterval(id);
//   }, []);
//   const hh = String(now.getHours()).padStart(2, "0");
//   const mm = String(now.getMinutes()).padStart(2, "0");
//   const ss = String(now.getSeconds()).padStart(2, "0");

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md px-4 py-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-xl font-bold mb-6">Library</h2>
//           <ul className="space-y-3">
//             <li>
//               <Link
//                 to="/dashboard"
//                 className="flex items-center gap-2 text-sky-600 font-medium"
//               >
//                 <CalendarDays size={18} /> Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/manage-books"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <BookOpen size={18} /> Manage Books
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/manage-category"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <Layers size={18} /> Manage Category
//               </Link>
//             </li>
//             {/* <li>
//               <Link
//                 to="/upload"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <Upload size={18} /> Upload Books
//               </Link>
//             </li> */}
//             <li>
//               <Link
//                 to="/fill-up-form"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <BookOpen size={18} /> Fill Up Form
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/members"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <Users size={18} /> Member
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/check-out"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <BookOpen size={18} /> Check-out Books
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/setting"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <HelpCircle size={18} /> Setting
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <Link
//             to="/logout"
//             className="flex items-center gap-2 text-red-600 font-medium hover:underline underline-offset-4"
//           >
//             <LogOut size={18} /> Logout
//           </Link>
//         </div>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-6 space-y-6">
//         {/* Top Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { label: "Borrowed Books", value: 3504 },
//             { label: "Returned Books", value: 683 },
//             { label: "Overdue Books", value: 145 },
//             { label: "Total Books", value: 5654 },
//             { label: "New Members", value: 120 },
//             { label: "Borrows Pending", value: 222 },
//           ].map((item, i) => (
//             <div key={i} className="bg-white rounded shadow p-4 text-center">
//               <p className="text-sm text-gray-500">{item.label}</p>
//               <p className="text-xl font-bold text-gray-800">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Graph + Overdue */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* ---------------------- CHECK-OUT STATISTICS (Weekly Line Chart) ---------------------- */}
//           <div className="bg-white rounded shadow p-4">
//             <div className="flex items-center justify-between">
//               <h3 className="font-semibold mb-2">Check-Out Statistics</h3>
//               <span className="text-xs text-gray-500">Updated {hh}:{mm}:{ss}</span>
//             </div>

//             <div className="h-40 rounded flex items-center gap-6">
//               {/* Line Chart */}
//               <svg
//                 viewBox={`0 0 ${chartBox.w} ${chartBox.h}`}
//                 width="100%"
//                 height="160"
//                 className="hidden sm:block"
//                 aria-label="Weekly Check-Out Line Chart"
//               >
//                 {/* grid lines */}
//                 {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
//                   const y = chartBox.padY + t * (chartBox.h - chartBox.padY * 2);
//                   return (
//                     <line
//                       key={i}
//                       x1={chartBox.padX}
//                       x2={chartBox.w - chartBox.padX}
//                       y1={y}
//                       y2={y}
//                       className="stroke-gray-200"
//                       strokeWidth="1"
//                     />
//                   );
//                 })}

//                 {/* x labels */}
//                 {WEEK_LABELS.map((w, i) => (
//                   <text
//                     key={w}
//                     x={sx(i)}
//                     y={chartBox.h - 2}
//                     textAnchor="middle"
//                     className="fill-gray-400"
//                     style={{ fontSize: 10 }}
//                   >
//                     {w}
//                   </text>
//                 ))}

//                 {/* lines + points */}
//                 {paths.map((p, idx) => (
//                   <g key={idx}>
//                     <path
//                       d={p.d}
//                       className={`${p.color}`}
//                       fill="none"
//                       strokeWidth="3"
//                       strokeLinecap="round"
//                     />
//                     {p.values.map((v, i) => (
//                       <circle
//                         key={i}
//                         cx={sx(i)}
//                         cy={sy(v)}
//                         r="3.2"
//                         className={`${p.dot} stroke-white`}
//                         strokeWidth="1.2"
//                       />
//                     ))}
//                   </g>
//                 ))}
//               </svg>

//               {/* Legend (right column) */}
//               <div className="flex-1">
//                 <div className="flex flex-col gap-2 text-sm">
//                   {series.map((s) => (
//                     <div key={s.name} className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <span
//                           className={`inline-block w-8 h-1.5 rounded-full ${s.color.replace(
//                             "stroke",
//                             "bg"
//                           )}`}
//                         />
//                         <span className="text-gray-700">{s.name}</span>
//                       </div>
//                       <span className="text-xs text-gray-400">
//                         W1–W7
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Overview line */}
//                 <p className="mt-2 text-xs text-gray-600">
//                   Weekly dynamics: smooth trends for Borrowed, Returned and Overdue across Mon–Sun.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ---------------------- Overdue’s History (email centered with icon) ---------------------- */}
//           <div className="bg-white rounded shadow p-4">
//             <h3 className="font-semibold mb-2">Overdue’s History</h3>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left border-b border-gray-200">
//                   <th>#</th>
//                   <th>Book name</th>
//                   <th>User name</th>
//                   <th className="text-center">Email</th>
//                   <th>Returned Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-200">
//                   <td>1</td>
//                   <td className="font-semibold">Core Java</td>
//                   <td>Sadia Prova</td>
//                   <td className="text-center">
//                     <span className="inline-flex items-center justify-center gap-1 text-gray-700">
//                       <Mail size={16} className="text-gray-500" />
//                       <span>sadia@company.com</span>
//                     </span>
//                   </td>
//                   <td>03/08/2025</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Borrow Request (functional) */}
//         <div className="bg-white rounded shadow p-4">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-semibold">Borrow Request</h3>
//             <Link to="#" className="text-xs text-green-600 hover:underline">
//               View All
//             </Link>
//           </div>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left border-b border-gray-200">
//                 <th>#</th>
//                 <th>Book name</th>
//                 <th>User name</th>
//                 <th>Borrowed Date</th>
//                 <th>Returned Date</th>
//                 <th className="text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.map((r, i) => (
//                 <tr key={`${r.book}__${r.user}__${i}`} className="border-b border-gray-200">
//                   <td>{i + 1}</td>
//                   <td className="font-medium">{r.book}</td>
//                   <td>{r.user}</td>
//                   <td>{r.borrowed}</td>
//                   <td>{r.returned}</td>
//                   <td className="text-center">
//                     <div className="flex items-center justify-center gap-2">
//                       <button
//                         type="button"
//                         onClick={() => openConfirm("accept", i)}
//                         className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
//                       >
//                         Accept
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => openConfirm("reject", i)}
//                         className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {requests.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="py-6 text-center text-gray-500">
//                     No pending borrow requests.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {/* ---- Confirm Modal (Accept / Reject) ---- */}
//       {confirm.open && (
//         <div
//           className="fixed inset-0 z-50"
//           aria-modal="true"
//           role="dialog"
//           onClick={(e) => {
//             if (e.target === e.currentTarget) closeConfirm();
//           }}
//         >
//           {/* Backdrop */}
//           <div className="absolute inset-0 bg-black/50 opacity-0 animate-[fadeIn_.2s_ease-out_forwards]" />
//           {/* Panel */}
//           <div className="absolute inset-0 flex items-center justify-center px-4">
//             <div className="w-full max-w-md rounded-lg bg-white shadow-lg border border-gray-200 opacity-0 translate-y-2 animate-[popIn_.22s_ease-out_forwards]">
//               <div className="px-6 py-5">
//                 <div className="flex items-start gap-3">
//                   <div className="mt-0.5">
//                     {confirm.type === "accept" ? (
//                       <CheckCircle2 className="text-green-600" size={24} />
//                     ) : (
//                       <AlertTriangle className="text-amber-500" size={24} />
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {confirm.type === "accept"
//                         ? "Accept this borrow request?"
//                         : "Reject this borrow request?"}
//                     </h3>
//                     {confirm.index > -1 && (
//                       <p className="mt-1 text-sm text-gray-600">
//                         <span className="font-medium">
//                           {requests[confirm.index]?.book}
//                         </span>{" "}
//                         — {requests[confirm.index]?.user}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={closeConfirm}
//                   className="rounded-md px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={doConfirm}
//                   className={`rounded-md px-4 py-2 text-sm font-semibold text-white ${
//                     confirm.type === "accept"
//                       ? "bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-400"
//                       : "bg-red-600 hover:bg-red-500 focus:ring-2 focus:ring-red-400"
//                   }`}
//                 >
//                   {confirm.type === "accept" ? "Confirm" : "Reject"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ---- Toast (2s) ---- */}
//       {toast.show && (
//         <div className="fixed bottom-6 right-6 z-[60] pointer-events-none animate-[toastIn_.25s_ease-out]">
//           <div className="pointer-events-auto flex items-start gap-3 rounded-xl bg-white shadow-lg ring-1 ring-black/5 px-4 py-3">
//             <div className="mt-0.5">
//               {toast.type === "accept" ? (
//                 <CheckCircle2 className="text-green-600" size={22} />
//               ) : (
//                 <XCircle className="text-red-600" size={22} />
//               )}
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-gray-900">
//                 {toast.type === "accept" ? "Accepted" : "Rejected"}
//               </p>
//               <p className="text-xs text-gray-600">{toast.message}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* animations */}
//       <style>{`
//         @keyframes fadeIn { to { opacity: 1 } }
//         @keyframes popIn { to { opacity: 1; transform: translateY(0) } }
//         @keyframes toastIn { from { opacity: 0; transform: translateY(8px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
//       `}</style>
//     </div>
//   );
// }



// Dashboard.jsx (weekly legend BELOW chart: Borrowed / Returned / Overdue)

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Upload,
  Users,
  BookOpen,
  HelpCircle,
  LogOut,
  Library, // optional
  Layers,  // optional
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Library Dashboard";
  }, []);

  // --- Borrow Request demo data (replace with API later) ---
  const [requests, setRequests] = useState([
    { book: "Core Java", user: "Sadia Prova", borrowed: "29/07/2025", returned: "03/08/2025" },
    { book: "SQL in 10 Minutes", user: "Arman Hasan", borrowed: "01/08/2025", returned: "06/08/2025" },
  ]);

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

  const doConfirm = () => {
    const { type, index } = confirm;
    if (index > -1) {
      setRequests((prev) => prev.filter((_, i) => i !== index));
      showToast(type, type === "accept" ? "Request accepted" : "Request rejected");
    }
    closeConfirm();
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

  // Smooth path helpers (quadratic mid-point)
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
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-4 py-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Library</h2>
          <ul className="space-y-3">
            <li>
              <Link to="/dashboard" className="flex items-center gap-2 text-sky-600 font-medium">
                <CalendarDays size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/manage-books" className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors">
                <BookOpen size={18} /> Manage Books
              </Link>
            </li>
            <li>
              <Link to="/manage-category" className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors">
                <Layers size={18} /> Manage Category
              </Link>
            </li>
            {/* <li>
              <Link to="/upload" className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors">
                <Upload size={18} /> Upload Books
              </Link>
            </li> */}
            <li>
              <Link to="/fill-up-form" className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors">
                <BookOpen size={18} /> Fill Up Form
              </Link>
            </li>
            <li>
              <Link to="/members" className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors">
                <Users size={18} /> Member
              </Link>
            </li>
            <li>
              <Link to="/check-out" className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors">
                <BookOpen size={18} /> Check-out Books
              </Link>
            </li>
            <li>
              <Link to="/setting" className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors">
                <HelpCircle size={18} /> Setting
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/logout" className="flex items-center gap-2 text-red-600 font-medium hover:underline underline-offset-4">
            <LogOut size={18} /> Logout
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Borrowed Books", value: 3504 },
            { label: "Returned Books", value: 683 },
            { label: "Overdue Books", value: 145 },
            { label: "Total Books", value: 5654 },
            { label: "New Members", value: 120 },
            { label: "Borrows Pending", value: 222 },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded shadow p-4 text-center">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-xl font-bold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Graph + Overdue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ---------------------- CHECK-OUT STATISTICS (Weekly Line Chart; legend BELOW) ---------------------- */}
          <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold mb-2">Check-Out Statistics</h3>
              <span className="text-xs text-gray-500">Updated {hh}:{mm}:{ss}</span>
            </div>

            {/* Chart centered */}
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

            {/* Weekly legend UNDER chart (three horizontal blocks) */}
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

          {/* ---------------------- Overdue’s History (email centered with icon) ---------------------- */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-2">Overdue’s History</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th>#</th>
                  <th>Book name</th>
                  <th>User name</th>
                  <th className="text-center">Email</th>
                  <th>Returned Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td>1</td>
                  <td className="font-semibold">Core Java</td>
                  <td>Sadia Prova</td>
                  <td className="text-center">
                    <span className="inline-flex items-center justify-center gap-1 text-gray-700">
                      <Mail size={16} className="text-gray-500" />
                      <span>sadia@company.com</span>
                    </span>
                  </td>
                  <td>03/08/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Borrow Request (functional) */}
        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Borrow Request</h3>
            <Link to="#" className="text-xs text-green-600 hover:underline">
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
                <th>Returned Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => (
                <tr key={`${r.book}__${r.user}__${i}`} className="border-b border-gray-200">
                  <td>{i + 1}</td>
                  <td className="font-medium">{r.book}</td>
                  <td>{r.user}</td>
                  <td>{r.borrowed}</td>
                  <td>{r.returned}</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => openConfirm("accept", i)}
                        className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => openConfirm("reject", i)}
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

      {/* ---- Confirm Modal (Accept / Reject) ---- */}
      {confirm.open && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeConfirm();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 opacity-0 animate-[fadeIn_.2s_ease-out_forwards]" />
          {/* Panel */}
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
                    {confirm.index > -1 && (
                      <p className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">
                          {requests[confirm.index]?.book}
                        </span>{" "}
                        — {requests[confirm.index]?.user}
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

      {/* ---- Toast (2s) ---- */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[60] pointer-events-none animate-[toastIn_.25s_ease-out]">
          <div className="pointer-events-auto flex items-start gap-3 rounded-xl bg-white shadow-lg ring-1 ring-black/5 px-4 py-3">
            <div className="mt-0.5">
              {toast.type === "accept" ? (
                <CheckCircle2 className="text-green-600" size={22} />
              ) : (
                <XCircle className="text-red-600" size={22} />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {toast.type === "accept" ? "Accepted" : "Rejected"}
              </p>
              <p className="text-xs text-gray-600">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* animations */}
      <style>{`
        @keyframes fadeIn { to { opacity: 1 } }
        @keyframes popIn { to { opacity: 1; transform: translateY(0) } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(8px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}







// // Dashboard.jsx (unchanged except for two new <li>s under Sidebar list)

// import { useEffect } from "react";
// import {
//   CalendarDays,
//   Upload,
//   Users,
//   BookOpen,
//   HelpCircle,
//   LogOut,
//   Library,         // optional icon for Manage Books (we'll keep BookOpen for consistency if you prefer)
//   Layers           // optional icon for Manage Category
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   useEffect(() => {
//     document.title = "Library Dashboard";
//   }, []);

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md px-4 py-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-xl font-bold mb-6">Library</h2>
//           <ul className="space-y-3">
//             <li>
//               <Link
//                 to="/dashboard"
//                 className="flex items-center gap-2 text-sky-600 font-medium"
//               >
//                 <CalendarDays size={18} /> Dashboard
//               </Link>
//             </li>

//             {/* NEW — Manage Books */}
//             <li>
//               <Link
//                 to="/manage-books"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <BookOpen size={18} /> Manage Books
//               </Link>
//             </li>

//             {/* NEW — Manage Category */}
//             <li>
//               <Link
//                 to="/manage-category"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <Layers size={18} /> Manage Category
//               </Link>
//             </li>

//             {/* <li>
//               <Link
//                 to="/upload"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <Upload size={18} /> Upload Books
//               </Link>
//             </li> */}
//             <li>
//               <Link
//                 to="/fill-up-form"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <BookOpen size={18} /> Fill Up Form
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/members"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <Users size={18} /> Member
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/check-out"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <BookOpen size={18} /> Check-out Books
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/setting"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <HelpCircle size={18} /> Setting
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <Link
//             to="/logout"
//             className="flex items-center gap-2 text-red-600 font-medium hover:underline underline-offset-4"
//           >
//             <LogOut size={18} /> Logout
//           </Link>
//         </div>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-6 space-y-6">
//         {/* Top Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { label: "Borrowed Books", value: 3504 },
//             { label: "Returned Books", value: 683 },
//             { label: "Overdue Books", value: 145 },
//             // { label: "Missing Books", value: 32 },
//             { label: "Total Books", value: 5654 },
//             // { label: "Visitors", value: 1554 },
//             { label: "New Members", value: 120 },
//             { label: "Borrows Pending", value: 222 },
//           ].map((item, i) => (
//             <div key={i} className="bg-white rounded shadow p-4 text-center">
//               <p className="text-sm text-gray-500">{item.label}</p>
//               <p className="text-xl font-bold text-gray-800">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Graph + Overdue */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded shadow p-4">
//             <h3 className="font-semibold mb-2">Check-Out Statistics</h3>
//             <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
//               Graph Placeholder
//             </div>
//           </div>

//           <div className="bg-white rounded shadow p-4">
//             <h3 className="font-semibold mb-2">Overdue’s History</h3>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left border-b">
//                   <th>Employee ID</th>
//                   <th>Title</th>
//                   <th>ISBN</th>
//                   <th>Due</th>
//                   <th>Fine</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b">
//                   <td>BS1862</td>
//                   <td className="font-semibold">Core Java</td>
//                   <td>3223</td>
//                   <td>6 days</td>
//                   <td>-</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Recent Checkouts */}
//         <div className="bg-white rounded shadow p-4">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-semibold">Recent Check-Out’s</h3>
//             <Link to="#" className="text-xs text-green-600 hover:underline">
//               View All
//             </Link>
//           </div>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left border-b">
//                 <th>ID</th>
//                 <th>ISBN</th>
//                 <th>Title</th>
//                 <th>Author</th>
//                 <th>Employee</th>
//                 <th>Issue Date</th>
//                 <th>Return Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b">
//                 <td>BS1862</td>
//                 <td>3223</td>
//                 <td>Core Java</td>
//                 <td>Gary S. Horstmann</td>
//                 <td>Sadia Prova</td>
//                 <td>29/07/2025</td>
//                 <td>03/08/2025</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }





































// // Dashboard.jsx (updated to match FillUpForm sidebar styling)

// import { useEffect } from "react";
// import {
//   CalendarDays,
//   Upload,
//   Users,
//   BookOpen,
//   HelpCircle,
//   LogOut,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   useEffect(() => {
//     document.title = "Library Dashboard";
//   }, []);

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md px-4 py-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-xl font-bold mb-6">Library</h2>
//           <ul className="space-y-3">
//             <li>
//               <Link
//                 to="/dashboard"
//                 className="flex items-center gap-2 text-sky-600 font-medium"
//               >
//                 <CalendarDays size={18} /> Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/upload"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <Upload size={18} /> Upload Books
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/fill-up-form"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <BookOpen size={18} /> Fill Up Form
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/members"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <Users size={18} /> Member
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/borrowed"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <BookOpen size={18} /> Check-out Books
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/help"
//                 className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
//               >
//                 <HelpCircle size={18} /> Help
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <Link
//             to="/logout"
//             className="flex items-center gap-2 text-red-600 font-medium hover:underline underline-offset-4"
//           >
//             <LogOut size={18} /> Logout
//           </Link>
//         </div>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-6 space-y-6">
//         {/* Top Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { label: "Borrowed Books", value: 3504 },
//             { label: "Returned Books", value: 683 },
//             { label: "Overdue Books", value: 145 },
//             { label: "Missing Books", value: 32 },
//             { label: "Total Books", value: 5654 },
//             { label: "Visitors", value: 1554 },
//             { label: "New Members", value: 120 },
//             { label: "Pending", value: 222 },
//           ].map((item, i) => (
//             <div key={i} className="bg-white rounded shadow p-4 text-center">
//               <p className="text-sm text-gray-500">{item.label}</p>
//               <p className="text-xl font-bold text-gray-800">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Graph + Overdue */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded shadow p-4">
//             <h3 className="font-semibold mb-2">Check-Out Statistics</h3>
//             <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
//               Graph Placeholder
//             </div>
//           </div>

//           <div className="bg-white rounded shadow p-4">
//             <h3 className="font-semibold mb-2">Overdue’s History</h3>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left border-b">
//                   <th>Employee ID</th>
//                   <th>Title</th>
//                   <th>ISBN</th>
//                   <th>Due</th>
//                   <th>Fine</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b">
//                   <td>BS1862</td>
//                   <td className="font-semibold">Core Java</td>
//                   <td>3223</td>
//                   <td>6 days</td>
//                   <td>-</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Recent Checkouts */}
//         <div className="bg-white rounded shadow p-4">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-semibold">Recent Check-Out’s</h3>
//             <Link to="#" className="text-xs text-green-600 hover:underline">
//               View All
//             </Link>
//           </div>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left border-b">
//                 <th>ID</th>
//                 <th>ISBN</th>
//                 <th>Title</th>
//                 <th>Author</th>
//                 <th>Employee</th>
//                 <th>Issue Date</th>
//                 <th>Return Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b">
//                 <td>BS1862</td>
//                 <td>3223</td>
//                 <td>Core Java</td>
//                 <td>Gary S. Horstmann</td>
//                 <td>Sadia Prova</td>
//                 <td>29/07/2025</td>
//                 <td>03/08/2025</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }
