// // Home.jsx


// import { useMemo, useState } from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import Section from "../../components/Section/Section";
// import books from "../../data/sampleBooks";
// import Navbar from "../../components/Navbar/Navbar";
// import BookSlider from "../../components/BookSlider/BookSlider";
// import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
// import NewBookCollections from "../../components/NewBookCollections/NewBookCollections";
// import { Link } from "react-router-dom";
// import { Star, Filter, X } from "lucide-react";

// export default function Home() {
//   const [filter, setFilter] = useState(null);
//   const [openFilters, setOpenFilters] = useState(false); // mobile sidebar

//   const allBooks = useMemo(
//     () => [...(books?.recommended || []), ...(books?.popular || [])],
//     []
//   );

//   const filtered = useMemo(() => {
//     if (!filter) return [];

//     if (filter.type === "all") return allBooks;

//     if (filter.type === "category") {
//       return allBooks.filter(
//         (b) =>
//           (b.category || "").toLowerCase() ===
//           (filter.value || "").toLowerCase()
//       );
//     }

//     if (filter.type === "subcategory") {
//       return allBooks.filter(
//         (b) =>
//           (b.category || "").toLowerCase() ===
//           (filter.parent || "").toLowerCase()
//       );
//     }

//     return allBooks;
//   }, [filter, allBooks]);

//   const renderStars = (rating = 0) =>
//     [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${
//           i < (rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
//         }`}
//       />
//     ));

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       {/* Main Content (centered container) */}
//       <div className="mx-auto max-w-7xl w-full flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-4 gap-4">
//         {/* Desktop/Tablet Sidebar */}
//         <aside className="hidden md:block w-full md:w-64 lg:w-72 flex-none md:sticky md:top-20">
//           <Sidebar onSelect={setFilter} />
//         </aside>

//         {/* Content Area */}
//         <main className="flex-1 min-w-0">
//           {/* Mobile Filters Button */}
//           <div className="md:hidden mb-3">
//             <button
//               type="button"
//               onClick={() => setOpenFilters(true)}
//               className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
//             >
//               <Filter className="w-4 h-4" />
//               Filters
//             </button>
//           </div>

//           <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
//             {!filter ? (
//               <>
//                 <Section title="Recommended" books={books.recommended} />
//                 <Section title="Popular" books={books.popular} />
//                 <NewBookCollections />
//                 {/* <BookSlider /> */}
//               </>
//             ) : (
//               <>
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//                     Showing results for:{" "}
//                     <span className="text-sky-600">
//                       {filter.type === "subcategory"
//                         ? `${filter.parent} → ${filter.value}`
//                         : filter.value || "All"}
//                     </span>
//                   </h2>
//                   <button
//                     onClick={() => setFilter(null)}
//                     className="text-sm text-gray-600 hover:text-sky-600"
//                   >
//                     Clear
//                   </button>
//                 </div>

//                 {/* Filtered grid */}
//                 {filtered.length === 0 ? (
//                   <div className="text-gray-500 text-sm">No books found.</div>
//                 ) : (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {filtered.map((b) => (
//                       <div
//                         key={b.id}
//                         className="bg-white rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out p-3 flex flex-col"
//                       >
//                         <img
//                           src={b.image}
//                           alt={b.title}
//                           className="w-full h-40 object-cover rounded-md"
//                         />
//                         <div className="mt-3 flex-1">
//                           <h4 className="font-semibold text-sm text-gray-800">
//                             {b.title}
//                           </h4>
//                           <p className="text-xs text-gray-600">{b.author}</p>
//                           <div className="flex items-center mt-1">
//                             {renderStars(b.rating)}
//                             <span className="ml-2 text-xs text-gray-500">
//                               {b.ratingCount?.toLocaleString?.() || 0}
//                             </span>
//                           </div>
//                           <p
//                             className={`text-xs font-medium mt-2 ${
//                               (b.title || "")
//                                 .toLowerCase()
//                                 .includes("empire")
//                                 ? "text-red-500"
//                                 : "text-green-600"
//                             }`}
//                           >
//                             {(b.title || "").toLowerCase().includes("empire")
//                               ? "Out Of Stock"
//                               : "Available"}
//                           </p>
//                         </div>
//                         <div className="mt-3">
//                           <Link
//                             to={`/book/${b.id}`}
//                             className="inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-md"
//                           >
//                             View Details
//                           </Link>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </main>
//       </div>

//       {/* Center the banner to match the content width */}
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <FeaturedBanner />
//       </div>

//       {/* Mobile Sidebar Drawer */}
//       {openFilters && (
//         <div className="fixed inset-0 z-50 md:hidden">
//           <div
//             className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
//             onClick={() => setOpenFilters(false)}
//           />
//           <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-2xl p-4 overflow-y-auto">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-base font-semibold text-gray-800">Filters</h3>
//               <button
//                 aria-label="Close filters"
//                 onClick={() => setOpenFilters(false)}
//                 className="p-2 rounded-md hover:bg-gray-100"
//               >
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//             <Sidebar
//               onSelect={(v) => {
//                 setFilter(v);
//                 setOpenFilters(false);
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/Home/Home.jsx

import { useMemo, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Section from "../../components/Section/Section";
import books from "../../data/sampleBooks";
import Navbar from "../../components/Navbar/Navbar";
import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
import NewBookCollections from "../../components/NewBookCollections/NewBookCollections";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Filter,
  X,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const [filter, setFilter] = useState(null);
  const [openFilters, setOpenFilters] = useState(false); // mobile sidebar
  const [openMenuId, setOpenMenuId] = useState(null); // kebab menu per-card
  const navigate = useNavigate();

  // ----- data for global filtered state (unchanged) -----
  const allBooks = useMemo(
    () => [...(books?.recommended || []), ...(books?.popular || [])],
    []
  );

  const filtered = useMemo(() => {
    if (!filter) return [];

    if (filter.type === "all") return allBooks;

    if (filter.type === "category") {
      return allBooks.filter(
        (b) =>
          (b.category || "").toLowerCase() ===
          (filter.value || "").toLowerCase()
      );
    }

    if (filter.type === "subcategory") {
      return allBooks.filter(
        (b) =>
          (b.category || "").toLowerCase() ===
          (filter.parent || "").toLowerCase()
      );
    }

    return allBooks;
  }, [filter, allBooks]);

  const renderStars = (rating = 0) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < (rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }`}
      />
    ));

  // Data
  const recommended = books?.recommended || [];
  const popular = books?.popular || [];

  // status helper
  const getStatus = (b) => {
    const raw = (b.status || b.stock || "").toString().trim().toLowerCase();

    if (raw === "available") return "Available";
    if (raw === "stock out" || raw === "out of stock" || raw === "out")
      return "Stock Out";
    if (raw === "upcoming" || raw === "coming soon") return "Upcoming";

    if ((b.title || "").toLowerCase().includes("empire")) return "Stock Out";
    return "Available";
  };

  const statusClasses = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "available") return "text-green-600";
    if (s === "stock out") return "text-red-500";
    if (s === "upcoming") return "text-amber-600";
    return "text-gray-600";
  };

  // navigation + kebab
  const goTo = (id) => navigate(`/book/${id}`);
  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenuId((prev) => (prev === id ? null : id));
  };
  const handleReadThisBook = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(null);
    goTo(id);
  };

  // shared card classes
  const cardBase =
    "group cursor-pointer border border-gray-300 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-500 relative";
  const imgBase =
    "w-full h-40 object-cover transition-transform duration-300 group-hover:scale-[1.02]";

  // --- Horizontal scroll refs & helpers (left↔right scrolling) ---
  const recRowRef = useRef(null);
  const popRowRef = useRef(null);

  const scrollByAmount = (node, dir = 1) => {
    if (!node?.current) return;
    const container = node.current;
    // Scroll by ~one card (includes gap)
    const step = Math.min(360, container.clientWidth * 0.8);
    container.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  // close any open kebab on scroll
  const handleRowScroll = () => {
    if (openMenuId !== null) setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content (centered container) */}
      <div className="mx-auto max-w-7xl w-full flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-4 gap-4">
        {/* Desktop/Tablet Sidebar */}
        <aside className="hidden md:block w-full md:w-64 lg:w-72 flex-none md:sticky md:top-20">
          <Sidebar onSelect={setFilter} />
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {/* Mobile Filters Button */}
          <div className="md:hidden mb-3">
            <button
              type="button"
              onClick={() => setOpenFilters(true)}
              className="inline-flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 rounded-md"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
            {!filter ? (
              <>
                {/* ======== RECOMMENDED (outer border + header divider like screenshot) ======== */}
                <div className="mb-8 rounded-lg border border-gray-300 overflow-hidden">
                  {/* Header bar inside the outer border */}
                  <div className="px-4 py-3 bg-white flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      Recommended
                    </h2>

                    {/* arrows */}
                    <div className="hidden sm:flex gap-2">
                      <button
                        onClick={() => scrollByAmount(recRowRef, -1)}
                        className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollByAmount(recRowRef, 1)}
                        className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Divider line under the header — matches screenshot */}
                  <div className="border-t border-gray-200 relative bg-white">
                    {/* edge fade masks */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />

                    {/* Horizontal scroller */}
                    <div
                      ref={recRowRef}
                      onScroll={handleRowScroll}
                      className="overflow-x-auto no-scrollbar"
                    >
                      <div className="flex gap-5 p-3 sm:p-4 snap-x snap-mandatory">
                        {recommended.map((b) => {
                          const status = getStatus(b);
                          const menuOpen = openMenuId === b.id;
                          return (
                            <div
                              key={b.id}
                              role="button"
                              tabIndex={0}
                              onClick={() => goTo(b.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  goTo(b.id);
                                }
                              }}
                              className={`${cardBase} min-w-[240px] sm:min-w-[280px] snap-start`}
                            >
                              {/* Cover */}
                              <img src={b.image} alt={b.title} className={imgBase} />

                              {/* Card body with TOP divider (line) like screenshot */}
                              <div className="border-t border-gray-200 p-4">
                                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                                  {b.title}
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">
                                  {b.category || "Category"}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                  <span
                                    className={`text-xs font-medium ${statusClasses(
                                      status
                                    )}`}
                                  >
                                    {status}
                                  </span>

                                  {/* 3-dot menu */}
                                  <div className="relative">
                                    <button
                                      type="button"
                                      className="p-1.5 hover:bg-gray-100 rounded"
                                      aria-haspopup="menu"
                                      aria-expanded={menuOpen}
                                      aria-label="More options"
                                      title="More options"
                                      onClick={(e) => toggleMenu(e, b.id)}
                                    >
                                      <MoreVertical className="h-4 w-4 text-gray-500" />
                                    </button>

                                    {menuOpen && (
                                      <div
                                        role="menu"
                                        className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-10"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <button
                                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                          onClick={(e) => handleReadThisBook(e, b.id)}
                                        >
                                          Read this Book
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* mobile arrows overlay */}
                    <div className="sm:hidden absolute inset-y-0 left-1 flex items-center">
                      <button
                        onClick={() => scrollByAmount(recRowRef, -1)}
                        className="p-2 rounded-md border border-gray-300 bg-white/90 hover:bg-white shadow"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="sm:hidden absolute inset-y-0 right-1 flex items-center">
                      <button
                        onClick={() => scrollByAmount(recRowRef, 1)}
                        className="p-2 rounded-md border border-gray-300 bg-white/90 hover:bg-white shadow"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* ======== /RECOMMENDED ======== */}

                {/* ======== POPULAR (same outer border + header divider) ======== */}
                <div className="mb-8 rounded-lg border border-gray-300 overflow-hidden">
                  <div className="px-4 py-3 bg-white flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      Popular
                    </h2>

                    <div className="hidden sm:flex gap-2">
                      <button
                        onClick={() => scrollByAmount(popRowRef, -1)}
                        className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollByAmount(popRowRef, 1)}
                        className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 relative bg-white">
                    {/* edge fade masks */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />

                    <div
                      ref={popRowRef}
                      onScroll={handleRowScroll}
                      className="overflow-x-auto no-scrollbar"
                    >
                      <div className="flex gap-5 p-3 sm:p-4 snap-x snap-mandatory">
                        {popular.map((b) => {
                          const status = getStatus(b);
                          const menuOpen = openMenuId === b.id;
                          return (
                            <div
                              key={b.id}
                              role="button"
                              tabIndex={0}
                              onClick={() => goTo(b.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  goTo(b.id);
                                }
                              }}
                              className={`${cardBase} min-w-[240px] sm:min-w-[280px] snap-start`}
                            >
                              {/* Cover */}
                              <img src={b.image} alt={b.title} className={imgBase} />

                              {/* Card body with TOP divider */}
                              <div className="border-t border-gray-200 p-4">
                                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                                  {b.title}
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">
                                  {b.category || "Category"}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                  <span
                                    className={`text-xs font-medium ${statusClasses(
                                      status
                                    )}`}
                                  >
                                    {status}
                                  </span>

                                  {/* 3-dot menu */}
                                  <div className="relative">
                                    <button
                                      type="button"
                                      className="p-1.5 hover:bg-gray-100 rounded"
                                      aria-haspopup="menu"
                                      aria-expanded={menuOpen}
                                      aria-label="More options"
                                      title="More options"
                                      onClick={(e) => toggleMenu(e, b.id)}
                                    >
                                      <MoreVertical className="h-4 w-4 text-gray-500" />
                                    </button>

                                    {menuOpen && (
                                      <div
                                        role="menu"
                                        className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-10"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <button
                                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                          onClick={(e) => handleReadThisBook(e, b.id)}
                                        >
                                          Read this Book
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* mobile arrows overlay */}
                    <div className="sm:hidden absolute inset-y-0 left-1 flex items-center">
                      <button
                        onClick={() => scrollByAmount(popRowRef, -1)}
                        className="p-2 rounded-md border border-gray-300 bg-white/90 hover:bg-white shadow"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="sm:hidden absolute inset-y-0 right-1 flex items-center">
                      <button
                        onClick={() => scrollByAmount(popRowRef, 1)}
                        className="p-2 rounded-md border border-gray-300 bg-white/90 hover:bg-white shadow"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* ======== /POPULAR ======== */}

                {/* Keep rest as-is */}
                <NewBookCollections />
                {/* <BookSlider /> */}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Showing results for:{" "}
                    <span className="text-sky-600">
                      {filter.type === "subcategory"
                        ? `${filter.parent} → ${filter.value}`
                        : filter.value || "All"}
                    </span>
                  </h2>
                  <button
                    onClick={() => setFilter(null)}
                    className="text-sm text-gray-600 hover:text-sky-600"
                  >
                    Clear
                  </button>
                </div>

                {/* Filtered grid (unchanged layout) */}
                {filtered.length === 0 ? (
                  <div className="text-gray-500 text-sm">No books found.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map((b) => {
                      const status =
                        (b.title || "").toLowerCase().includes("empire")
                          ? "Stock Out"
                          : "Available";
                      const menuOpen = openMenuId === b.id;

                      return (
                        <div
                          key={b.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => goTo(b.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              goTo(b.id);
                            }
                          }}
                          className="cursor-pointer bg-white border border-gray-300 shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out p-3 flex flex-col rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-500 relative"
                        >
                          <img
                            src={b.image}
                            alt={b.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="mt-3 flex-1">
                            <h4 className="font-semibold text-sm text-gray-800">
                              {b.title}
                            </h4>
                            <p className="text-xs text-gray-600">{b.author}</p>
                            <div className="flex items-center mt-1">
                              {renderStars(b.rating)}
                              <span className="ml-2 text-xs text-gray-500">
                                {b.ratingCount?.toLocaleString?.() || 0}
                              </span>
                            </div>
                            <p
                              className={`text-xs font-medium mt-2 ${
                                status === "Stock Out"
                                  ? "text-red-500"
                                  : "text-green-600"
                              }`}
                            >
                              {status}
                            </p>
                          </div>

                          <div className="mt-3">
                            <div className="inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded">
                              View Details
                            </div>
                          </div>

                          {/* kebab menu bottom-right for filtered grid */}
                          <div className="absolute right-2 bottom-2">
                            <div className="relative">
                              <button
                                type="button"
                                className="p-1.5 hover:bg-gray-100 rounded bg-white/70"
                                aria-haspopup="menu"
                                aria-expanded={menuOpen}
                                aria-label="More options"
                                title="More options"
                                onClick={(e) => toggleMenu(e, b.id)}
                              >
                                <MoreVertical className="h-4 w-4 text-gray-600" />
                              </button>

                              {menuOpen && (
                                <div
                                  role="menu"
                                  className="absolute right-0 bottom-8 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-10"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                    onClick={(e) => handleReadThisBook(e, b.id)}
                                  >
                                    Read this Book
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Center the banner to match the content width */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeaturedBanner />
      </div>

      {/* Mobile Sidebar Drawer */}
      {openFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={() => setOpenFilters(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-2xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-gray-800">Filters</h3>
              <button
                aria-label="Close filters"
                onClick={() => setOpenFilters(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <Sidebar
              onSelect={(v) => {
                setFilter(v);
                setOpenFilters(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

