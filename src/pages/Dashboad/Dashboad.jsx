// // Dashboard.jsx
// import { LayoutDashboard, Upload, ClipboardList, Users, BookOpen, HelpCircle, LogOut } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const navItems = [
//     { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
//     { name: "Upload Books", icon: Upload, path: "/upload" },
//     { name: "Fill Up From", icon: ClipboardList, path: "/fill-up-form" },
//     { name: "Member", icon: Users, path: "/members" },
//     { name: "Check-out Books", icon: BookOpen, path: "/borrowed" },
//     { name: "Help", icon: HelpCircle, path: "/help" },
//   ];

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r">
//         <h2 className="text-xl font-bold p-5 border-b">Library</h2>
//         <ul className="space-y-1 p-4">
//           {navItems.map((item, idx) => (
//             <li key={idx}>
//               <Link
//                 to={item.path}
//                 className="flex items-center gap-3 px-3 py-2 rounded hover:text-sky-500 hover:border-l-4 hover:border-sky-500 group"
//               >
//                 <item.icon className="w-4 h-4" />
//                 <span>{item.name}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//         <div className="absolute bottom-4 left-4 text-red-500 flex items-center gap-2 cursor-pointer hover:underline">
//           <LogOut size={16} />
//           <span>Logout</span>
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
//               {/* Replace this with Chart.js or Recharts */}
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


// Dashboard.jsx (updated to match FillUpForm sidebar styling)
import { useEffect } from "react";
import {
  CalendarDays,
  Upload,
  Users,
  BookOpen,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Library Dashboard";
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-4 py-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Library</h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sky-600 font-medium"
              >
                <CalendarDays size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
              >
                <Upload size={18} /> Upload Books
              </Link>
            </li>
            <li>
              <Link
                to="/fill-up-form"
                className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
              >
                <BookOpen size={18} /> Fill Up Form
              </Link>
            </li>
            <li>
              <Link
                to="/members"
                className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
              >
                <Users size={18} /> Member
              </Link>
            </li>
            <li>
              <Link
                to="/borrowed"
                className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
              >
                <BookOpen size={18} /> Check-out Books
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className="flex items-center gap-2 text-gray-700 hover:text-sky-500 transition-colors"
              >
                <HelpCircle size={18} /> Help
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Link
            to="/logout"
            className="flex items-center gap-2 text-red-600 font-medium hover:underline underline-offset-4"
          >
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
            { label: "Missing Books", value: 32 },
            { label: "Total Books", value: 5654 },
            { label: "Visitors", value: 1554 },
            { label: "New Members", value: 120 },
            { label: "Pending", value: 222 },
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
            <h3 className="font-semibold mb-2">Check-Out Statistics</h3>
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
              Graph Placeholder
            </div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-2">Overdue’s History</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th>Employee ID</th>
                  <th>Title</th>
                  <th>ISBN</th>
                  <th>Due</th>
                  <th>Fine</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td>BS1862</td>
                  <td className="font-semibold">Core Java</td>
                  <td>3223</td>
                  <td>6 days</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Checkouts */}
        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Recent Check-Out’s</h3>
            <Link to="#" className="text-xs text-green-600 hover:underline">
              View All
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th>ID</th>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Employee</th>
                <th>Issue Date</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td>BS1862</td>
                <td>3223</td>
                <td>Core Java</td>
                <td>Gary S. Horstmann</td>
                <td>Sadia Prova</td>
                <td>29/07/2025</td>
                <td>03/08/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
