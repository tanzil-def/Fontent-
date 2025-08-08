// import { useState } from "react"; 
// import { ChevronUp, Plus, Star } from "lucide-react";
// import { Link } from "react-router-dom";

// const categories = [
//   {
//     name: "Development",
//     subcategories: [
//       "Web Development",
//       "Data Science",
//       "Mobile Development",
//       "Software Testing",
//       "Software Engineering",
//       "Software Development Tools",
//     ],
//   },
//   {
//     name: "Business",
//     subcategories: [
//       "Entrepreneurship",
//       "Business Analytics",
//       "Management & Leadership",
//       "Project Management",
//       // "Business Analytics & Intelligence",
//       // "Human Resources",
//       // "Sales",
//       // "Communications",
//     ],
//   },
//   {
//     name: "Finance & Accounting",
//     subcategories: [
//       "Financial Analysis",
//       "Financial Modeling",
//       "Investing & Trading",
//       "Banking & Insurance",
//       "Cryptocurrency & Blockchain",
//       // "Budgeting & Forecasting",
//       // "Tax Preparation",
//       // "Excel for Finance",
//     ],
//   },
//   {
//     name: "IT & Software",
//     subcategories: [
//       "Network & Security",
//       "Hardware & Operating Systems",
//       "Cloud Computing",
//       "Database Management (SQL, NoSQL)",
//       // "Ethical Hacking",
//       // "Software Testing",
//     ],
//   },
//   // {
//   //   name: "Office Productivity",
//   //   subcategories: [
//   //     "Microsoft Office Suite",
//   //     "Google Workspace",
//   //     "Time Management Tools ",
//   //     "Digital Note-taking",
//   //     "Task Automation",
//   //   ],
//   // },
//   // {
//   //   name:"Personal Development",
//   //   subcategories: [
//   //     "Web Development",
//   //     "Data Science",
//   //     "Mobile Development",
//   //     "Software Testing",
//   //     "Software Engineering",
//   //     "Software Development Tools",
//   //     "No-Code Development",
//   //   ],
//   // },
//   {
//     name: "Design",
//     subcategories: [
//       "UI/UX Design",
//       "Graphic Design",
//       "Branding & Identity ",
//       "Canva/Adobe Tools ",
//     ],
//   },
//   {
//     name:"Marketing",
//     subcategories: [
//       "Digital Marketing",
//       "Social Media Marketing",
//       "SEO & SEM",
//       "Content Strategy",
//       "Email & Automation",
//     ],
//   },
//   // {
//   //   name: "Photography & Video",
//   //   subcategories: [
//   //     "Web Development",
//   //     "Data Science",
//   //     "Mobile Development",
//   //     "Software Testing",
//   //     "Software Engineering",
//   //     "Software Development Tools",
//   //     "No-Code Development",
//   //   ],
//   // },
//   // {
//   //   name:"Music",
//   //   subcategories: [
//   //     "Web Development",
//   //     "Data Science",
//   //     "Mobile Development",
//   //     "Software Testing",
//   //     "Software Engineering",
//   //     "Software Development Tools",
//   //     "No-Code Development",
//   //   ],
//   // },
//   // {
//   //   name: "Health & Fitness",
//   //   subcategories: [
//   //     "Web Development",
//   //     "Data Science",
//   //     "Mobile Development",
//   //     "Software Testing",
//   //     "Software Engineering",
//   //     "Software Development Tools",
//   //     "No-Code Development",
//   //   ],
//   // },
// ];

// const tools = [
//   { name: "HTML 5", users: 1200 },
//   { name: "CSS 3", users: 980 },
//   { name: "React", users: 2200 },
//   { name: "Webflow", users: 540 },
//   { name: "Node.js", users: 870 },
//   { name: "Laravel", users: 640 },
//   { name: "Saas", users: 400 },
//   { name: "Wordpress", users: 1250 },
// ];

// const ratings = [
//   { label: "5 Star", count: 1520 },
//   { label: "4 Star & up", count: 2110 },
//   { label: "3 Star & up", count: 3120 },
//   { label: "2 Star & up", count: 4210 },
//   { label: "1 Star & up", count: 5030 },
// ];

// const durations = [
//   "6-12 Months",
//   "3-6 Months",
//   "1-3 Months",
//   "1-4 Weeks",
//   "1-7 Days",
// ];

// export default function Sidebar() {
//   const [expanded, setExpanded] = useState({});

//   const toggleExpand = (category) => {
//     setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
//   };

//   return (
//     <aside className="hidden md:block w-64 bg-white p-4 border-r border-gray-200 h-[calc(100vh-180px)] sticky top-28 overflow-y-auto space-y-6">
//       {/* Category Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">CATEGORY</h3>

//         {/* All Genre Link */}
//         <ul className="space-y-1 mb-2">
//           <li>
//             <Link
//               to="/all-genres"
//               className="text-sm text-gray-700 px-2 py-1 rounded block hover:bg-sky-100 transition-all duration-200 font-medium"
//             >
//               All Genre
//             </Link>
//           </li>
//         </ul>

//         <ul className="space-y-1">
//           {categories.map((cat) => (
//             <li key={cat.name}>
//               <div
//                 onClick={() => toggleExpand(cat.name)}
//                 className="flex items-center justify-between text-sm px-2 py-1 rounded cursor-pointer hover:bg-sky-100 text-gray-700 transition-all duration-200"
//               >
//                 <span>{cat.name}</span>
//                 {expanded[cat.name] ? <ChevronUp size={14} /> : <Plus size={14} />}
//               </div>
//               {expanded[cat.name] && (
//                 <ul className="ml-4 mt-1 space-y-1">
//                   {cat.subcategories.map((sub) => (
//                     <li key={sub}>
//                       <Link
//                         to={`/subcategory/${sub}`}
//                         className="block text-sm text-gray-600 hover:text-sky-600 hover:bg-sky-100 rounded px-2 py-1 transition-all duration-200"
//                       >
//                         {sub}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Tools Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">TOOLS</h3>
//         <ul className="space-y-1">
//           {tools.map((tool) => (
//             <li key={tool.name} className="flex justify-between items-center px-2 py-1 rounded hover:bg-sky-100 transition-all duration-200">
//               <Link
//                 to={`/tools/${tool.name}`}
//                 className="text-sm text-gray-700 hover:text-sky-600 flex-1"
//               >
//                 {tool.name}
//               </Link>
//               <span className="text-xs text-gray-500">{tool.users}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Rating Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">RATING</h3>
//         <ul className="space-y-1">
//           {ratings.map((rating) => (
//             <li key={rating.label}>
//               <label className="flex items-center justify-between gap-2 text-sm px-2 py-1 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
//                 <div className="flex items-center gap-2">
//                   <input type="checkbox" className="form-checkbox" />
//                   <Star size={14} className="text-yellow-400" />
//                   <span>{rating.label}</span>
//                 </div>
//                 <span className="text-xs text-gray-500">{rating.count}</span>
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Duration Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">DURATION</h3>
//         <ul className="space-y-1">
//           {durations.map((duration) => (
//             <li key={duration}>
//               <label className="flex items-center gap-2 text-sm px-2 py-1 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
//                 <input type="checkbox" className="form-checkbox" />
//                 {duration}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </aside>
//   );
// }


// // Sidebar.jsx
// import { useState } from "react"; 
// import { ChevronUp, Plus, Star } from "lucide-react";


// const categories = [
//   {
//     name: "Development",
//     subcategories: [
//       "Web Development",
//       "Data Science",
//       "Mobile Development",
//       "Software Testing",
//       "Software Engineering",
//       "Software Development Tools",
//     ],
//   },
//   {
//     name: "Business",
//     subcategories: [
//       "Entrepreneurship",
//       "Business Analytics",
//       "Management & Leadership",
//       "Project Management",
//     ],
//   },
//   {
//     name: "Finance & Accounting",
//     subcategories: [
//       "Financial Analysis",
//       "Financial Modeling",
//       "Investing & Trading",
//       "Banking & Insurance",
//       "Cryptocurrency & Blockchain",
//     ],
//   },
//   {
//     name: "IT & Software",
//     subcategories: [
//       "Network & Security",
//       "Hardware & Operating Systems",
//       "Cloud Computing",
//       "Database Management (SQL, NoSQL)",
//     ],
//   },
//   {
//     name: "Design",
//     subcategories: [
//       "UI/UX Design",
//       "Graphic Design",
//       "Branding & Identity ",
//       "Canva/Adobe Tools ",
//     ],
//   },
//   {
//     name:"Marketing",
//     subcategories: [
//       "Digital Marketing",
//       "Social Media Marketing",
//       "SEO & SEM",
//       "Content Strategy",
//       "Email & Automation",
//     ],
//   },
// ];

// const tools = [
//   { name: "HTML 5", users: 1200 },
//   { name: "CSS 3", users: 980 },
//   { name: "React", users: 2200 },
//   { name: "Webflow", users: 540 },
//   { name: "Node.js", users: 870 },
//   { name: "Laravel", users: 640 },
//   { name: "Saas", users: 400 },
//   { name: "Wordpress", users: 1250 },
// ];

// const ratings = [
//   { label: "5 Star", count: 1520 },
//   { label: "4 Star & up", count: 2110 },
//   { label: "3 Star & up", count: 3120 },
//   { label: "2 Star & up", count: 4210 },
//   { label: "1 Star & up", count: 5030 },
// ];

// const durations = [
//   "6-12 Months",
//   "3-6 Months",
//   "1-3 Months",
//   "1-4 Weeks",
//   "1-7 Days",
// ];

// export default function Sidebar({ onSelect }) {
//   const [expanded, setExpanded] = useState({});

//   const toggleExpand = (category) => {
//     setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
//   };

//   const handleCategory = (name) => {
//     if (onSelect) onSelect({ type: "category", value: name });
//   };

//   const handleSubcategory = (sub, parent) => {
//     if (onSelect) onSelect({ type: "subcategory", value: sub, parent });
//   };

//   return (
//     <aside className="hidden md:block w-64 bg-white p-4 border-r border-gray-200 h-[calc(100vh-180px)] sticky top-28 overflow-y-auto space-y-6">
//       {/* Category Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">CATEGORY</h3>

//         {/* All Genre Link */}
//         <ul className="space-y-1 mb-2">
//           <li>
//             <button
//               type="button"
//               onClick={() => onSelect && onSelect({ type: "all" })}
//               className="w-full text-left text-sm text-gray-700 px-2 py-1 rounded block hover:bg-sky-100 transition-all duration-200 font-medium"
//             >
//               All Genre
//             </button>
//           </li>
//         </ul>

//         <ul className="space-y-1">
//           {categories.map((cat) => (
//             <li key={cat.name}>
//               {/* Row keeps SAME styling; name click filters, + expands */}
//               <div className="flex items-center justify-between text-sm px-2 py-1 rounded cursor-pointer hover:bg-sky-100 text-gray-700 transition-all duration-200">
//                 <button
//                   type="button"
//                   onClick={() => handleCategory(cat.name)}
//                   className="text-left flex-1"
//                 >
//                   {cat.name}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleExpand(cat.name);
//                   }}
//                   aria-label={expanded[cat.name] ? "Collapse" : "Expand"}
//                 >
//                   {expanded[cat.name] ? <ChevronUp size={14} /> : <Plus size={14} />}
//                 </button>
//               </div>

//               {expanded[cat.name] && (
//                 <ul className="ml-4 mt-1 space-y-1">
//                   {cat.subcategories.map((sub) => (
//                     <li key={sub}>
//                       <button
//                         type="button"
//                         onClick={() => handleSubcategory(sub, cat.name)}
//                         className="w-full text-left block text-sm text-gray-600 hover:text-sky-600 hover:bg-sky-100 rounded px-2 py-1 transition-all duration-200"
//                       >
//                         {sub}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Tools Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">TOOLS</h3>
//         <ul className="space-y-1">
//           {tools.map((tool) => (
//             <li key={tool.name} className="flex justify-between items-center px-2 py-1 rounded hover:bg-sky-100 transition-all duration-200">
//               <button
//                 type="button"
//                 onClick={() => onSelect && onSelect({ type: "tool", value: tool.name })}
//                 className="text-sm text-gray-700 hover:text-sky-600 flex-1 text-left"
//               >
//                 {tool.name}
//               </button>
//               <span className="text-xs text-gray-500">{tool.users}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Rating Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">RATING</h3>
//         <ul className="space-y-1">
//           {ratings.map((rating) => (
//             <li key={rating.label}>
//               <label className="flex items-center justify-between gap-2 text-sm px-2 py-1 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-checkbox"
//                     onChange={(e) =>
//                       onSelect &&
//                       onSelect({
//                         type: "rating",
//                         value: rating.label,
//                         checked: e.target.checked,
//                       })
//                     }
//                   />
//                   <Star size={14} className="text-yellow-400" />
//                   <span>{rating.label}</span>
//                 </div>
//                 <span className="text-xs text-gray-500">{rating.count}</span>
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Duration Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">DURATION</h3>
//         <ul className="space-y-1">
//           {durations.map((duration) => (
//             <li key={duration}>
//               <label className="flex items-center gap-2 text-sm px-2 py-1 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
//                 <input
//                     type="checkbox"
//                     className="form-checkbox"
//                     onChange={(e) =>
//                       onSelect &&
//                       onSelect({
//                         type: "duration",
//                         value: duration,
//                         checked: e.target.checked,
//                       })
//                     }
//                   />
//                 {duration}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </aside>
//   );
// }


// // Sidebar.jsx
// import { useState } from "react";
// import { ChevronUp, Plus, Star } from "lucide-react";

// const categories = [
//   {
//     name: "Development",
//     subcategories: [
//       "Web Development",
//       "Data Science",
//       "Mobile Development",
//       "Software Testing",
//       "Software Engineering",
//       "AI & Machine Learning",
//       "Software Development Tools",
//     ],
//   },
//   {
//     name: "Business",
//     subcategories: [
//       "Entrepreneurship",
//       "Business Analytics",
//       "Management & Leadership",
//       "Project Management",
//     ],
//   },
//   {
//     name: "Finance & Accounting",
//     subcategories: [
//       "Financial Analysis",
//       "Financial Modeling",
//       "Investing & Trading",
//       "Banking & Insurance",
//       "Cryptocurrency & Blockchain",
//     ],
//   },
//   {
//     name: "IT & Software",
//     subcategories: [
//       "Network & Security",
//       "Hardware & Operating Systems",
//       "Cloud Computing",
//       "Database Management (SQL, NoSQL)",
//     ],
//   },
//   {
//     name: "Design",
//     subcategories: [
//       "UI/UX Design",
//       "Graphic Design",
//       "Branding & Identity",
//       "Canva/Adobe Tools",
//     ],
//   },
//   {
//     name: "Marketing",
//     subcategories: [
//       "Digital Marketing",
//       "Social Media Marketing",
//       "SEO & SEM",
//       "Content Strategy",
//       "Email & Automation",
//     ],
//   },
// ];

// const tools = [
//   { name: "HTML 5", users: 1200 },
//   { name: "CSS 3", users: 980 },
//   { name: "React", users: 2200 },
//   { name: "Webflow", users: 540 },
//   { name: "Node.js", users: 870 },
//   { name: "Laravel", users: 640 },
//   { name: "SaaS", users: 400 },
//   { name: "WordPress", users: 1250 },
// ];

// const ratings = [
//   { label: "5 Star", count: 1520 },
//   { label: "4 Star & up", count: 2110 },
//   { label: "3 Star & up", count: 3120 },
//   { label: "2 Star & up", count: 4210 },
//   { label: "1 Star & up", count: 5030 },
// ];

// const durations = ["6-12 Months", "3-6 Months", "1-3 Months", "1-4 Weeks", "1-7 Days"];

// export default function Sidebar({ onSelect }) {
//   const [expanded, setExpanded] = useState({});

//   const toggleExpand = (category) => {
//     setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
//   };

//   const handleCategory = (name) => {
//     if (onSelect) onSelect({ type: "category", value: name });
//   };

//   const handleSubcategory = (sub, parent) => {
//     if (onSelect) onSelect({ type: "subcategory", value: sub, parent });
//   };

//   return (
//     <aside className="hidden md:block w-64 bg-white p-4 border-r border-gray-200 h-[calc(100vh-180px)] sticky top-28 overflow-y-auto space-y-6">
//       {/* Category Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">CATEGORY</h3>

//         {/* All Genre (in-place show-all) */}
//         <ul className="space-y-1 mb-2">
//           <li>
//             <button
//               type="button"
//               onClick={() => onSelect && onSelect({ type: "all" })}
//               className="w-full text-left text-sm text-gray-700 px-2 py-1 rounded block hover:bg-sky-100 transition-all duration-200 font-medium"
//             >
//               All Genre
//             </button>
//           </li>
//         </ul>

//         <ul className="space-y-1">
//           {categories.map((cat) => (
//             <li key={cat.name}>
//               {/* Row: name click filters, + expands */}
//               <div className="flex items-center justify-between text-sm px-2 py-1 rounded cursor-pointer hover:bg-sky-100 text-gray-700 transition-all duration-200">
//                 <button
//                   type="button"
//                   onClick={() => handleCategory(cat.name)}
//                   className="text-left flex-1"
//                 >
//                   {cat.name}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleExpand(cat.name);
//                   }}
//                   aria-label={expanded[cat.name] ? "Collapse" : "Expand"}
//                 >
//                   {expanded[cat.name] ? <ChevronUp size={14} /> : <Plus size={14} />}
//                 </button>
//               </div>

//               {expanded[cat.name] && (
//                 <ul className="ml-4 mt-1 space-y-1">
//                   {cat.subcategories.map((sub) => (
//                     <li key={sub}>
//                       <button
//                         type="button"
//                         onClick={() => handleSubcategory(sub, cat.name)}
//                         className="w-full text-left block text-sm text-gray-600 hover:text-sky-600 hover:bg-sky-100 rounded px-2 py-1 transition-all duration-200"
//                         title={sub}
//                       >
//                         {sub}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Tools Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">TOOLS</h3>
//         <ul className="space-y-1">
//           {tools.map((tool) => (
//             <li
//               key={tool.name}
//               className="flex justify-between items-center px-2 py-1 rounded hover:bg-sky-100 transition-all duration-200"
//             >
//               <button
//                 type="button"
//                 onClick={() => onSelect && onSelect({ type: "tool", value: tool.name })}
//                 className="text-sm text-gray-700 hover:text-sky-600 flex-1 text-left"
//               >
//                 {tool.name}
//               </button>
//               <span className="text-xs text-gray-500">{tool.users}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Rating Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">RATING</h3>
//         <ul className="space-y-1">
//           {ratings.map((rating) => (
//             <li key={rating.label}>
//               <label className="flex items-center justify-between gap-2 text-sm px-2 py-1 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-checkbox"
//                     onChange={(e) =>
//                       onSelect &&
//                       onSelect({
//                         type: "rating",
//                         value: rating.label,
//                         checked: e.target.checked,
//                       })
//                     }
//                   />
//                   <Star size={14} className="text-yellow-400" />
//                   <span>{rating.label}</span>
//                 </div>
//                 <span className="text-xs text-gray-500">{rating.count}</span>
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Duration Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">DURATION</h3>
//         <ul className="space-y-1">
//           {durations.map((duration) => (
//             <li key={duration}>
//               <label className="flex items-center gap-2 text-sm px-2 py-1 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox"
//                   onChange={(e) =>
//                     onSelect &&
//                     onSelect({
//                       type: "duration",
//                       value: duration,
//                       checked: e.target.checked,
//                     })
//                   }
//                 />
//                 {duration}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </aside>
//   );
// }


// Sidebar.jsx
import { useState } from "react";
import { ChevronUp, Plus, Star } from "lucide-react";
import { Link } from "react-router-dom"; // ⬅️ add this

const categories = [
  {
    name: "Development",
    subcategories: [
      "Web Development",
      "Data Science",
      "Mobile Development",
      "Software Testing",
      "Software Engineering",
      "Software Development Tools",
    ],
  },
  {
    name: "Business",
    subcategories: [
      "Entrepreneurship",
      "Business Analytics",
      "Management & Leadership",
      "Project Management",
    ],
  },
  {
    name: "Finance & Accounting",
    subcategories: [
      "Financial Analysis",
      "Financial Modeling",
      "Investing & Trading",
      "Banking & Insurance",
      "Cryptocurrency & Blockchain",
    ],
  },
  {
    name: "IT & Software",
    subcategories: [
      "Network & Security",
      "Hardware & Operating Systems",
      "Cloud Computing",
      "Database Management (SQL, NoSQL)",
    ],
  },
  {
    name: "Design",
    subcategories: [
      "UI/UX Design",
      "Graphic Design",
      "Branding & Identity",
      "Canva/Adobe Tools",
    ],
  },
  {
    name: "Marketing",
    subcategories: [
      "Digital Marketing",
      "Social Media Marketing",
      "SEO & SEM",
      "Content Strategy",
      "Email & Automation",
    ],
  },
];

const tools = [
  { name: "HTML 5", users: 1200 },
  { name: "CSS 3", users: 980 },
  { name: "React", users: 2200 },
  { name: "Webflow", users: 540 },
  { name: "Node.js", users: 870 },
  { name: "Laravel", users: 640 },
  { name: "SaaS", users: 400 },
  { name: "WordPress", users: 1250 },
];

const ratings = [
  { label: "5 Star", count: 1520 },
  { label: "4 Star & up", count: 2110 },
  { label: "3 Star & up", count: 3120 },
  { label: "2 Star & up", count: 4210 },
  { label: "1 Star & up", count: 5030 },
];

const durations = ["6-12 Months", "3-6 Months", "1-3 Months", "1-4 Weeks", "1-7 Days"];

export default function Sidebar({ onSelect }) {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleCategory = (name) => {
    if (onSelect) onSelect({ type: "category", value: name });
  };

  const handleSubcategory = (sub, parent) => {
    if (onSelect) onSelect({ type: "subcategory", value: sub, parent });
  };

  return (
    <aside className="hidden md:block w-64 bg-white p-4 border-r border-gray-200 h-[calc(100vh-180px)] sticky top-28 overflow-y-auto space-y-6">
      {/* Category Section */}
      <div>
        <h3 className="text-sm font-bold mb-2">CATEGORY</h3>

        {/* All Genre should OPEN the /all-genres page */}
        <ul className="space-y-1 mb-2">
          <li>
            <Link
              to="/all-genres"
              className="w-full text-left text-sm text-gray-700 px-2 py-1 rounded block hover:bg-sky-100 transition-all duration-200 font-medium"
            >
              All Genre
            </Link>
          </li>
        </ul>

        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.name}>
              {/* Row keeps SAME styling; name click filters, + expands */}
              <div className="flex items-center justify-between text-sm px-2 py-1 rounded cursor-pointer hover:bg-sky-100 text-gray-700 transition-all duration-200">
                <button
                  type="button"
                  onClick={() => handleCategory(cat.name)}
                  className="text-left flex-1"
                >
                  {cat.name}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(cat.name);
                  }}
                  aria-label={expanded[cat.name] ? "Collapse" : "Expand"}
                >
                  {expanded[cat.name] ? <ChevronUp size={14} /> : <Plus size={14} />}
                </button>
              </div>

              {expanded[cat.name] && (
                <ul className="ml-4 mt-1 space-y-1">
                  {cat.subcategories.map((sub) => (
                    <li key={sub}>
                      <button
                        type="button"
                        onClick={() => handleSubcategory(sub, cat.name)}
                        className="w-full text-left block text-sm text-gray-600 hover:text-sky-600 hover:bg-sky-100 rounded px-2 py-1 transition-all duration-200"
                        title={sub}
                      >
                        {sub}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Tools Section */}
      <div>
        <h3 className="text-sm font-bold mb-2">TOOLS</h3>
        <ul className="space-y-1">
          {tools.map((tool) => (
            <li
              key={tool.name}
              className="flex justify-between items-center px-2 py-1 rounded hover:bg-sky-100 transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => onSelect && onSelect({ type: "tool", value: tool.name })}
                className="text-sm text-gray-700 hover:text-sky-600 flex-1 text-left"
              >
                {tool.name}
              </button>
              <span className="text-xs text-gray-500">{tool.users}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating Section */}
      <div>
        <h3 className="text-sm font-bold mb-2">RATING</h3>
        <ul className="space-y-1">
          {ratings.map((rating) => (
            <li key={rating.label}>
              <label className="flex items-center justify-between gap-2 text-sm px-2 py-1 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onChange={(e) =>
                      onSelect &&
                      onSelect({
                        type: "rating",
                        value: rating.label,
                        checked: e.target.checked,
                      })
                    }
                  />
                  <Star size={14} className="text-yellow-400" />
                  <span>{rating.label}</span>
                </div>
                <span className="text-xs text-gray-500">{rating.count}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Duration Section */}
      <div>
        <h3 className="text-sm font-bold mb-2">DURATION</h3>
        <ul className="space-y-1">
          {durations.map((duration) => (
            <li key={duration}>
              <label className="flex items-center gap-2 text-sm px-2 py-1 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={(e) =>
                    onSelect &&
                    onSelect({
                      type: "duration",
                      value: duration,
                      checked: e.target.checked,
                    })
                  }
                />
                {duration}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

