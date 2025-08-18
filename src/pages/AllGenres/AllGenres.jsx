// // AllGenres.jsx 


// import { useNavigate, useLocation } from "react-router-dom";
// import { useMemo, useState, useEffect } from "react";
// import books from "../../data/sampleBooks";
// import { Star, Clock } from "lucide-react";
// import Sidebar from "../../components/Sidebar/Sidebar";

// const getStockStatus = (title = "") => {
//   const t = title.toLowerCase();
//   if (t.includes("out")) return "Stock Out";
//   if (t.includes("upcoming")) return "Upcoming";
//   return "Available";
// };

// // tiny helper to format countdowns like "2d 4h", "3h 12m", "12m"
// const formatCountdown = (targetMs, nowMs) => {
//   const diff = Math.max(0, new Date(targetMs).getTime() - nowMs);
//   const mins = Math.floor(diff / 60000);
//   const days = Math.floor(mins / (60 * 24));
//   const hours = Math.floor((mins % (60 * 24)) / 60);
//   const minutes = mins % 60;

//   if (days > 0) return `${days}d ${hours}h`;
//   if (hours > 0) return `${hours}h ${minutes}m`;
//   return `${minutes}m`;
// };

// const isToday = (dt) => {
//   const d = new Date(dt);
//   const n = new Date();
//   return d.getFullYear() === n.getFullYear() &&
//          d.getMonth() === n.getMonth() &&
//          d.getDate() === n.getDate();
// };

// export default function AllGenres() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const allBooks = [
//     ...(books?.recommended || []),
//     ...(books?.popular || []),
//     ...(books?.featuredBooks || []), // safe if missing
//   ];

//   // accept preset (category or subcategory)
//   const [filter, setFilter] = useState(location.state?.filter || null);

//   // "tick" every minute so countdowns update automatically
//   const [now, setNow] = useState(Date.now());
//   useEffect(() => {
//     const id = setInterval(() => setNow(Date.now()), 60000);
//     return () => clearInterval(id);
//   }, []);

//   useEffect(() => {
//     if (location.state?.filter !== undefined) setFilter(location.state.filter);
//   }, [location.state]);

//   const filtered = useMemo(() => {
//     if (!filter) return allBooks;

//     if (filter.type === "all") return allBooks;

//     if (filter.type === "category") {
//       return allBooks.filter(
//         (b) => (b.category || "").toLowerCase() === (filter.value || "").toLowerCase()
//       );
//     }

//     if (filter.type === "subcategory") {
//       return allBooks.filter(
//         (b) =>
//           (b.category || "").toLowerCase() === (filter.parent || "").toLowerCase()
//       );
//     }

//     return allBooks;
//   }, [filter, allBooks]);

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Sidebar — filters in-place with the same behavior as Home */}
//       <Sidebar onSelect={setFilter} />

//       {/* Book Grid */}
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">All Genres</h1>

//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {(filtered.length ? filtered : []).map((book) => {
//             const computedStatus = getStockStatus(book.title);
//             const raw = `${(book.status || "").toLowerCase()} ${(book.title || "").toLowerCase()}`;
//             const isStocking =
//               raw.includes("stocking") ||
//               raw.includes("restock") ||
//               raw.includes("coming soon");

//             // Decide the pill text + color (priority order)
//             let pillText = "Best Seller";
//             let pillClass = "bg-orange-500 text-white";

//             if (computedStatus === "Upcoming") {
//               pillText = "Upcoming";
//               pillClass = "bg-yellow-500 text-white";
//             } else if (isStocking) {
//               pillText = "Stocking";
//               pillClass = "bg-blue-600 text-white";
//             } else if (computedStatus === "Stock Out") {
//               pillText = "Not Available";
//               pillClass = "bg-red-500 text-white";
//             } else if (computedStatus === "Available") {
//               pillText = "Available";
//               pillClass = "bg-green-600 text-white";
//             }

//             // Optional live timing
//             // book.stockOutAt -> future time when it becomes out of stock
//             // book.restockAt  -> future time when it becomes available again
//             const showOutIn =
//               pillText === "Available" && book.stockOutAt;
//             const showArrivesIn =
//               (pillText === "Not Available" || pillText === "Upcoming" || pillText === "Stocking") &&
//               book.restockAt;

//             return (
//               <div
//                 key={book.id}
//                 onClick={() => navigate(`/book/${book.id}`)}
//                 className="group cursor-pointer rounded-xl overflow-hidden bg-white ring-1 ring-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:ring-gray-200 transition-all duration-300 h-full flex flex-col"
//               >
//                 {/* Image + top-left badge */}
//                 <div className="relative">
//                   <img
//                     src={book.image}
//                     alt={book.title}
//                     className="w-full h-48 sm:h-56 md:h-60 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
//                   />
//                   <span className={`absolute top-2 left-2 px-2.5 py-1 rounded-md text-[11px] font-semibold shadow ${pillClass}`}>
//                     {pillText}
//                     {pillText === "Upcoming" && (
//                       <span className="inline-flex items-center ml-1 align-middle">
//                         <span className="w-1 h-1 rounded-full bg-white/90 animate-bounce [animation-delay:-0.2s]"></span>
//                         <span className="w-1 h-1 rounded-full bg-white/90 mx-0.5 animate-bounce [animation-delay:-0.1s]"></span>
//                         <span className="w-1 h-1 rounded-full bg-white/90 animate-bounce"></span>
//                       </span>
//                     )}
//                   </span>
//                 </div>

//                 {/* Body (Amazon-like layout) */}
//                 <div className="p-4 flex-1 flex flex-col">
//                   {/* Title */}
//                   <h3 className="text-base font-semibold leading-snug line-clamp-2 mb-1 group-hover:text-sky-600 transition-colors">
//                     {book.title}
//                   </h3>

//                   {/* by Author */}
//                   <div className="text-sm text-gray-700 mb-2">
//                     by{" "}
//                     <span className="text-sky-600 hover:underline">
//                       {book.author || "Unknown"}
//                     </span>
//                   </div>

//                   {/* Rating */}
//                   <div className="flex items-center gap-2 text-sm text-gray-700">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < (book.rating || 0)
//                               ? "text-orange-500 fill-orange-500"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="font-medium">
//                       {(book.rating || 4.0).toFixed
//                         ? (book.rating || 4.0).toFixed(1)
//                         : book.rating || 4.0}
//                     </span>
//                     <span className="text-gray-500">
//                       ({book.ratingCount || 0})
//                     </span>
//                   </div>

//                   {/* Live timing row (auto-updates) */}
//                   {showOutIn && (
//                     <div className="mt-3 text-xs sm:text-sm text-amber-600 flex items-center gap-2">
//                       <Clock className="w-4 h-4" />
//                       Out in {formatCountdown(book.stockOutAt, now)}
//                     </div>
//                   )}
//                   {showArrivesIn && (
//                     <div className="mt-3 text-xs sm:text-sm text-blue-600 flex items-center gap-2">
//                       <Clock className="w-4 h-4" />
//                       {isToday(book.restockAt)
//                         ? "Arrives today"
//                         : `Arrives in ${formatCountdown(book.restockAt, now)}`}
//                     </div>
//                   )}

//                   {/* Bottom link-style label (use category to mimic format) */}
//                   <div className="mt-3 text-sm text-sky-600 font-semibold hover:underline">
//                     {book.category || "Paperback"}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           {filtered.length === 0 && (
//             <div className="text-sm text-gray-500">No books found.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// AllGenres.jsx 

import { useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import books from "../../data/sampleBooks";
import { Star, Clock } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";

const getStockStatus = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("out")) return "Stock Out";
  if (t.includes("upcoming")) return "Upcoming";
  return "Available";
};

// tiny helper to format countdowns like "2d 4h", "3h 12m", "12m"
const formatCountdown = (targetMs, nowMs) => {
  const diff = Math.max(0, new Date(targetMs).getTime() - nowMs);
  const mins = Math.floor(diff / 60000);
  const days = Math.floor(mins / (60 * 24));
  const hours = Math.floor((mins % (60 * 24)) / 60);
  const minutes = mins % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

const isToday = (dt) => {
  const d = new Date(dt);
  const n = new Date();
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  );
};

export default function AllGenres() {
  const navigate = useNavigate();
  const location = useLocation();

  const allBooks = [
    ...(books?.recommended || []),
    ...(books?.popular || []),
    ...(books?.featuredBooks || []), // safe if missing
  ];

  // accept preset (category or subcategory)
  const [filter, setFilter] = useState(location.state?.filter || null);

  // pagination
  const PAGE_SIZE = 9; // 3 x 3 grid per page
  const [page, setPage] = useState(1);

  // "tick" every minute so countdowns update automatically
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (location.state?.filter !== undefined) setFilter(location.state.filter);
  }, [location.state]);

  const filtered = useMemo(() => {
    if (!filter) return allBooks;

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

  // keep page valid when filter changes
  useEffect(() => {
    setPage(1);
  }, [filter]);

  const totalPages = Math.max(1, Math.ceil((filtered?.length || 0) / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar — filters in-place with the same behavior as Home */}
      <Sidebar onSelect={setFilter} />

      {/* Book Grid */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">All Genres</h1>

        {/* OUTER SECTION BORDER like "Course overview" */}
        <div className="rounded-lg border border-gray-300 overflow-hidden bg-white">
          {/* Simple header bar inside the bordered section */}
          <div className="px-4 py-3 bg-white">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Browse Books
            </h2>
          </div>

          {/* Divider under header */}
          <div className="border-t border-gray-200">
            {/* Grid */}
            {pageItems.length ? (
              <div className="p-4">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {pageItems.map((book) => {
                    const computedStatus = getStockStatus(book.title);
                    const raw = `${(book.status || "").toLowerCase()} ${(book.title || "")
                      .toLowerCase()}`;
                    const isStocking =
                      raw.includes("stocking") ||
                      raw.includes("restock") ||
                      raw.includes("coming soon");

                    // Decide the pill text + color (priority order)
                    let pillText = "Best Seller";
                    let pillClass = "bg-orange-500 text-white";

                    if (computedStatus === "Upcoming") {
                      pillText = "Upcoming";
                      pillClass = "bg-yellow-500 text-white";
                    } else if (isStocking) {
                      pillText = "Stocking";
                      pillClass = "bg-blue-600 text-white";
                    } else if (computedStatus === "Stock Out") {
                      pillText = "Not Available";
                      pillClass = "bg-red-500 text-white";
                    } else if (computedStatus === "Available") {
                      pillText = "Available";
                      pillClass = "bg-green-600 text-white";
                    }

                    // Optional live timing
                    const showOutIn = pillText === "Available" && book.stockOutAt;
                    const showArrivesIn =
                      (pillText === "Not Available" ||
                        pillText === "Upcoming" ||
                        pillText === "Stocking") &&
                      book.restockAt;

                    return (
                      <div
                        key={book.id}
                        onClick={() => navigate(`/book/${book.id}`)}
                        className="group cursor-pointer bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden h-full flex flex-col"
                      >
                        {/* Image + top-left badge */}
                        <div className="relative">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-40 sm:h-44 md:h-48 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <span
                            className={`absolute top-2 left-2 px-2.5 py-1 rounded-md text-[11px] font-semibold shadow ${pillClass}`}
                          >
                            {pillText}
                            {pillText === "Upcoming" && (
                              <span className="inline-flex items-center ml-1 align-middle">
                                <span className="w-1 h-1 rounded-full bg-white/90 animate-bounce [animation-delay:-0.2s]"></span>
                                <span className="w-1 h-1 rounded-full bg-white/90 mx-0.5 animate-bounce [animation-delay:-0.1s]"></span>
                                <span className="w-1 h-1 rounded-full bg-white/90 animate-bounce"></span>
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Body — top divider under image (matches other sections) */}
                        <div className="border-t border-gray-200 p-4 flex-1 flex flex-col">
                          {/* Title */}
                          <h3 className="text-base font-semibold leading-snug line-clamp-2 mb-1 group-hover:text-sky-600 transition-colors">
                            {book.title}
                          </h3>

                          {/* by Author */}
                          <div className="text-sm text-gray-700 mb-2">
                            by{" "}
                            <span className="text-sky-600 hover:underline">
                              {book.author || "Unknown"}
                            </span>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < (book.rating || 0)
                                      ? "text-orange-500 fill-orange-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">
                              {(book.rating || 4.0).toFixed
                                ? (book.rating || 4.0).toFixed(1)
                                : book.rating || 4.0}
                            </span>
                            <span className="text-gray-500">
                              ({book.ratingCount || 0})
                            </span>
                          </div>

                          {/* Live timing row (auto-updates) */}
                          {showOutIn && (
                            <div className="mt-3 text-xs sm:text-sm text-amber-600 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Out in {formatCountdown(book.stockOutAt, now)}
                            </div>
                          )}
                          {showArrivesIn && (
                            <div className="mt-3 text-xs sm:text-sm text-blue-600 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {isToday(book.restockAt)
                                ? "Arrives today"
                                : `Arrives in ${formatCountdown(
                                    book.restockAt,
                                    now
                                  )}`}
                            </div>
                          )}

                          {/* Bottom link-style label */}
                          <div className="mt-3 text-sm text-sky-600 font-semibold hover:underline">
                            {book.category || "Paperback"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-4 text-sm text-gray-500">No books found.</div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && totalPages > 1 && (
              <div className="px-4 pb-4 flex items-center justify-between gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-8 h-8 text-sm rounded-md border ${
                          n === page
                            ? "bg-sky-600 text-white border-sky-600"
                            : "border-gray-300 bg-white hover:bg-gray-50"
                        }`}
                        aria-current={n === page ? "page" : undefined}
                      >
                        {n}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={`px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
