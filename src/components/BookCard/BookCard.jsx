// import { Link } from "react-router-dom";

// export default function BookCard({ id, title, author, image }) {
//   return (
//     // The entire card is wrapped in a Link, which will navigate to `/book/THE_BOOK_ID`
//     <Link to={`/book/${id}`} className="w-[140px] space-y-1 block group">
//       <div className="w-full h-48 overflow-hidden rounded shadow">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//         />
//       </div>
//       <h4 className="text-sm font-semibold mt-2 group-hover:text-sky-600">{title}</h4>
//       <p className="text-xs text-gray-500">{author}</p>
//     </Link>
//   );
// } 

// src/components/BookCard/BookCard.jsx
import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

export default function BookCard({
  book,
  onClick,                 // e.g. () => navigate(`/book/${book.id}`)
  onReadThisBook,          // e.g. () => navigate(`/book/${book.id}`)
  variant = "row",         // "row" for horizontal scrollers, "grid" for lists
  status,                  // optional; if not provided we derive from book.status/stock/title
  size = "auto",           // NEW: "auto" | "scroller"  -> "scroller" locks to same width as Recommended/Popular
  className = "",
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cardRef = useRef(null);
  const menuRef = useRef(null);

  // derive status same way your Home page does
  const defaultGetStatus = (b) => {
    const raw = (b?.status || b?.stock || "").toString().trim().toLowerCase();
    if (raw === "available") return "Available";
    if (raw === "stock out" || raw === "out of stock" || raw === "out") return "Stock Out";
    if (raw === "upcoming" || raw === "coming soon") return "Upcoming";
    if ((b?.title || "").toLowerCase().includes("empire")) return "Stock Out";
    return "Available";
  };
  const finalStatus = status || defaultGetStatus(book);

  const statusClasses = (s) => {
    const v = (s || "").toLowerCase();
    if (v === "available") return "text-green-600";
    if (v === "stock out") return "text-red-500";
    if (v === "upcoming") return "text-amber-600";
    return "text-gray-600";
  };

  // close menu on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (!menuOpen) return;
      if (
        cardRef.current &&
        !cardRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  // design tokens copied from your Home.jsx (Recommended/Popular cards)
  const cardBase =
    "group cursor-pointer border border-gray-300 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-500 relative";
  const imgBase =
    "w-full h-40 object-cover transition-transform duration-300 group-hover:scale-[1.02]";
  const bodyBase = "border-t border-gray-200 p-4";
  const rowClasses = "min-w-[240px] sm:min-w-[280px] snap-start";
  const gridClasses = "w-full";

  // NEW: lock to the exact same width as the scroller cards when requested
  const sizeClasses = size === "scroller" ? "w-[240px] sm:w-[280px]" : "";

  const containerClass =
    `${cardBase} ${variant === "row" ? rowClasses : gridClasses} ${sizeClasses} ${className}`.trim();

  const handleRead = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    onReadThisBook?.();
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={containerClass}
    >
      {/* Cover */}
      <img src={book?.image} alt={book?.title} className={imgBase} />

      {/* Body (top divider) */}
      <div className={bodyBase}>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {book?.title}
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {book?.category || "Category"}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className={`text-xs font-medium ${statusClasses(finalStatus)}`}>
            {finalStatus}
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
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((s) => !s);
              }}
            >
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </button>

            {menuOpen && (
              <div
                ref={menuRef}
                role="menu"
                className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  onClick={handleRead}
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
}
