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


// // Sidebar.jsx
// import { useState } from "react";
// import { ChevronUp, Plus, Star } from "lucide-react";
// import { Link } from "react-router-dom"; // ⬅️ add this

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

//         {/* All Genre should OPEN the /all-genres page */}
//         <ul className="space-y-1 mb-2">
//           <li>
//             <Link
//               to="/all-genres"
//               className="w-full text-left text-sm text-gray-700 px-2 py-1 rounded block hover:bg-sky-100 transition-all duration-200 font-medium"
//             >
//               All Genre
//             </Link>
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

// // Sidebar.jsx
// import { useState } from "react";
// import { ChevronUp, Plus, Star } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

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
//   const navigate = useNavigate();

//   // exactly one category expanded
//   const [expandedKey, setExpandedKey] = useState(null);
//   // single active selection
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [activeSubcategory, setActiveSubcategory] = useState(null);

//   const setFilter = (payload) => {
//     if (onSelect) {
//       onSelect(payload);
//     } else {
//       if (payload) {
//         navigate("/all-genres", { state: { filter: payload } });
//       }
//     }
//   };

//   const toggleExpand = (category) => {
//     if (expandedKey === category) {
//       setExpandedKey(null);
//       setActiveCategory(null);
//       setActiveSubcategory(null);
//       if (onSelect) setFilter(null);
//     } else {
//       setExpandedKey(category);
//       setActiveCategory(null);
//       setActiveSubcategory(null);
//       if (onSelect) setFilter(null);
//     }
//   };

//   const handleCategory = (name) => {
//     setActiveCategory(name);
//     setActiveSubcategory(null);
//     setFilter({ type: "category", value: name });
//   };

//   const handleSubcategory = (sub, parent) => {
//     if (activeSubcategory === sub && activeCategory === parent) {
//       setActiveSubcategory(null);
//       setActiveCategory(parent);
//       if (onSelect) setFilter(null);
//       else setFilter(null);
//     } else {
//       setActiveCategory(parent);
//       setActiveSubcategory(sub);
//       setFilter({ type: "subcategory", value: sub, parent });
//     }
//   };

//   return (
//     <aside className="hidden md:block w-64 bg-white p-4 border-r border-gray-200 sticky top-28 overflow-y-hidden space-y-6">
//       {/* Category Section */}
//       <div>
//         <h3 className="text-sm font-bold mb-2">CATEGORY</h3>

//         {/* All Genre should OPEN the /all-genres page */}
//         <ul className="space-y-1 mb-2">
//           <li>
//             <Link
//               to="/all-genres"
//               className="w-full text-left text-sm text-gray-700 px-2 py-2 rounded block hover:bg-sky-100 transition-all duration-200 font-medium"
//             >
//               All Genre
//             </Link>
//           </li>
//         </ul>

//         <ul className="space-y-1">
//           {categories.map((cat) => (
//             <li key={cat.name}>
//               {/* Row (same look, taller) */}
//               <div className="flex items-center justify-between text-sm px-2 py-2 rounded cursor-pointer hover:bg-sky-100 text-gray-700 transition-all duration-200">
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
//                   aria-label={expandedKey === cat.name ? "Collapse" : "Expand"}
//                 >
//                   {expandedKey === cat.name ? <ChevronUp size={14} /> : <Plus size={14} />}
//                 </button>
//               </div>

//               {expandedKey === cat.name && (
//                 <ul className="ml-4 mt-1 space-y-1">
//                   {cat.subcategories.map((sub) => (
//                     <li key={sub}>
//                       <button
//                         type="button"
//                         onClick={() => handleSubcategory(sub, cat.name)}
//                         className="w-full text-left block text-sm text-gray-600 hover:text-sky-600 hover:bg-sky-100 rounded px-2 py-2 transition-all duration-200"
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
//               className="flex justify-between items-center px-2 py-2 rounded hover:bg-sky-100 transition-all duration-200"
//             >
//               <button
//                 type="button"
//                 onClick={() => setFilter({ type: "tool", value: tool.name })}
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
//               <label className="flex items-center justify-between gap-2 text-sm px-2 py-2 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-checkbox"
//                     onChange={(e) =>
//                       setFilter({
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
//               <label className="flex items-center gap-2 text-sm px-2 py-2 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox"
//                   onChange={(e) =>
//                     setFilter({
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
import { useState, useEffect, useMemo } from "react";
import { ChevronUp, Plus, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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

// Labels stay the same (UI unchanged). Counts will be computed live.
const ratings = [
  { label: "5 Star" },
  { label: "4 Star & up" },
  { label: "3 Star & up" },
  { label: "2 Star & up" },
  { label: "1 Star & up" },
];

const durations = ["6-12 Months", "3-6 Months", "1-3 Months", "1-4 Weeks", "1-7 Days"];

/**
 * Props still supported:
 *  - onSelect?: (filter) => void
 *  - ratingCounts? ignored now (we compute from /books.json to be real)
 */
export default function Sidebar({ onSelect }) {
  const navigate = useNavigate();

  // exactly one category expanded
  const [expandedKey, setExpandedKey] = useState(null);
  // single active selection
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  // Single-select states for Rating & Duration (UI remains checkbox look)
  const [selectedRating, setSelectedRating] = useState(null);    // rating.label
  const [selectedDuration, setSelectedDuration] = useState(null); // duration string

  // NEW: load all books once and compute real rating counts
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch("/books.json")
      .then((r) => r.json())
      .then((data) => {
        if (!isMounted) return;
        setAllBooks(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        // fail silently; counts will show 0 if fetch fails
        if (isMounted) setAllBooks([]);
      });
    return () => { isMounted = false; };
  }, []);

  const setFilter = (payload) => {
    if (onSelect) {
      onSelect(payload);
    } else {
      if (payload) {
        navigate("/all-genres", { state: { filter: payload } });
      }
    }
  };

  const toggleExpand = (category) => {
    if (expandedKey === category) {
      setExpandedKey(null);
      setActiveCategory(null);
      setActiveSubcategory(null);
      if (onSelect) setFilter(null);
    } else {
      setExpandedKey(category);
      setActiveCategory(null);
      setActiveSubcategory(null);
      if (onSelect) setFilter(null);
    }
  };

  const handleCategory = (name) => {
    setActiveCategory(name);
    setActiveSubcategory(null);
    setFilter({ type: "category", value: name });
  };

  const handleSubcategory = (sub, parent) => {
    if (activeSubcategory === sub && activeCategory === parent) {
      setActiveSubcategory(null);
      setActiveCategory(parent);
      if (onSelect) setFilter(null);
      else setFilter(null);
    } else {
      setActiveCategory(parent);
      setActiveSubcategory(sub);
      setFilter({ type: "subcategory", value: sub, parent });
    }
  };

  // Parse "5 Star", "4 Star & up", "4.5 Star & up" (if you ever add it)
  const parseRatingValue = (label) => {
    const m = label.match(/(\d+(?:\.\d+)?)/);
    return m ? parseFloat(m[1]) : null;
  };

  // Compute REAL counts from books.json
  const ratingCountsReal = useMemo(() => {
    const counts = {};
    const ratingsOnly = (allBooks || []).map((b) => Number(b?.rating ?? 0));
    ratings.forEach(({ label }) => {
      const th = parseRatingValue(label) ?? 0;
      // exact 5 for "5 Star", and threshold >= for others
      if (/^5\s*Star$/i.test(label)) {
        counts[label] = ratingsOnly.filter((r) => r >= 5).length; // treat 5.0 as 5 star
      } else {
        counts[label] = ratingsOnly.filter((r) => r >= th).length;
      }
    });
    return counts;
  }, [allBooks]);

  // Make Rating single-select (auto unselect previous), and emit numeric threshold
  const handleRatingClick = (label) => {
    const same = selectedRating === label;
    if (same) {
      setSelectedRating(null);
      setFilter(null);
    } else {
      setSelectedRating(label);
      const value = parseRatingValue(label); // 5, 4, 3, ...
      // Special: "5 Star" => we filter by 5 exactly/up to you; common UX is >= 5 (same as exact)
      setFilter({ type: "rating", value });
    }
  };

  // Make Duration single-select
  const handleDurationClick = (duration) => {
    const same = selectedDuration === duration;
    if (same) {
      setSelectedDuration(null);
      setFilter(null);
    } else {
      setSelectedDuration(duration);
      setFilter({ type: "duration", value: duration });
    }
  };

  return (
    <aside className="hidden md:block w-64 bg-white p-4 border-r border-gray-200 sticky top-28 overflow-y-hidden space-y-6">
      {/* Category Section */}
      <div>
        <h3 className="text-sm font-bold mb-2">CATEGORY</h3>

        {/* All Genre should OPEN the /all-genres page */}
        <ul className="space-y-1 mb-2">
          <li>
            <Link
              to="/all-genres"
              className="w-full text-left text-sm text-gray-700 px-2 py-2 rounded block hover:bg-sky-100 transition-all duration-200 font-medium"
            >
              All Genre
            </Link>
          </li>
        </ul>

        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.name}>
              {/* Row (same look, taller) */}
              <div className="flex items-center justify-between text-sm px-2 py-2 rounded cursor-pointer hover:bg-sky-100 text-gray-700 transition-all duration-200">
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
                  aria-label={expandedKey === cat.name ? "Collapse" : "Expand"}
                >
                  {expandedKey === cat.name ? <ChevronUp size={14} /> : <Plus size={14} />}
                </button>
              </div>

              {expandedKey === cat.name && (
                <ul className="ml-4 mt-1 space-y-1">
                  {cat.subcategories.map((sub) => (
                    <li key={sub}>
                      <button
                        type="button"
                        onClick={() => handleSubcategory(sub, cat.name)}
                        className="w-full text-left block text-sm text-gray-600 hover:text-sky-600 hover:bg-sky-100 rounded px-2 py-2 transition-all duration-200"
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
              className="flex justify-between items-center px-2 py-2 rounded hover:bg-sky-100 transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setFilter({ type: "tool", value: tool.name })}
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
          {ratings.map((rating) => {
            const label = rating.label;
            const checked = selectedRating === label; // single-select
            const count = ratingCountsReal[label] ?? 0;
            return (
              <li key={label}>
                <label className="flex items-center justify-between gap-2 text-sm px-2 py-2 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
                  <div className="flex items-center gap-2">
                    {/* keep checkbox UI, but control it like a radio */}
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={checked}
                      onChange={() => handleRatingClick(label)}
                    />
                    <Star size={14} className="text-yellow-400" />
                    <span>{label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{count}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Duration Section */}
      <div>
        <h3 className="text-sm font-bold mb-2">DURATION</h3>
        <ul className="space-y-1">
          {durations.map((duration) => {
            const checked = selectedDuration === duration; // single-select
            return (
              <li key={duration}>
                <label className="flex items-center gap-2 text-sm px-2 py-2 cursor-pointer hover:bg-sky-100 rounded transition-all duration-200">
                  {/* keep checkbox UI, but control it like a radio */}
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={checked}
                    onChange={() => handleDurationClick(duration)}
                  />
                  {duration}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
