// import { useNavigate } from "react-router-dom";
// import books from "../../data/sampleBooks"; // Adjust path as needed
// import { Star } from "lucide-react";
// import Sidebar from "../../components/Sidebar/Sidebar";

// const getStockStatus = (title) => {
//   if (title.toLowerCase().includes("out")) return "Stock Out";
//   if (title.toLowerCase().includes("upcoming")) return "Upcoming";
//   return "Available";
// };

// export default function AllGenres() {
//   const navigate = useNavigate();

//   const allBooks = [
//     ...books.recommended,
//     ...books.popular,
//     ...books.featuredBooks,
//   ];

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Book Grid */}
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">All Genres</h1>
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {allBooks.map((book) => {
//             const status = getStockStatus(book.title);
//             const stockColor =
//               status === "Available"
//                 ? "text-green-600"
//                 : status === "Stock Out"
//                 ? "text-red-500"
//                 : "text-yellow-500";

//             return (
//               <div
//                 key={book.id}
//                 onClick={() => navigate(`/book/${book.id}`)}
//                 className="cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200"
//               >
//                 <img
//                   src={book.image}
//                   alt={book.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <div className="text-xs uppercase text-orange-500 font-semibold mb-1">
//                     {book.category || "General"}
//                   </div>
//                   <h3 className="text-md font-semibold line-clamp-2 mb-2">
//                     {book.title}
//                   </h3>

//                   <div className="flex items-center text-sm text-gray-600 gap-2">
//                     <Star size={16} className="text-yellow-400" />
//                     {book.rating || 4.0}
//                     <span className="text-xs text-gray-400">
//                       ({book.ratingCount || 0})
//                     </span>
//                   </div>

//                   <div className={`mt-2 font-medium ${stockColor}`}>
//                     {status}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useNavigate } from "react-router-dom";
// import books from "../../data/sampleBooks";
// import { Star } from "lucide-react";
// import Sidebar from "../../components/Sidebar/Sidebar";

// const getStockStatus = (title) => {
//   if (title.toLowerCase().includes("out")) return "Stock Out";
//   if (title.toLowerCase().includes("upcoming")) return "Upcoming";
//   return "Available";
// };

// export default function AllGenres() {
//   const navigate = useNavigate();

//   const allBooks = [
//     ...books.recommended,
//     ...books.popular,
//     ...books.featuredBooks,
//   ];

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Sidebar (no onSelect here; this page is a full list) */}
//       <Sidebar />

//       {/* Book Grid */}
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">All Genres</h1>
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {allBooks.map((book) => {
//             const status = getStockStatus(book.title);
//             const stockColor =
//               status === "Available"
//                 ? "text-green-600"
//                 : status === "Stock Out"
//                 ? "text-red-500"
//                 : "text-yellow-500";

//             return (
//               <div
//                 key={book.id}
//                 onClick={() => navigate(`/book/${book.id}`)}
//                 className="cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200"
//               >
//                 <img
//                   src={book.image}
//                   alt={book.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <div className="text-xs uppercase text-orange-500 font-semibold mb-1">
//                     {book.category || "General"}
//                   </div>
//                   <h3 className="text-md font-semibold line-clamp-2 mb-2">
//                     {book.title}
//                   </h3>

//                   <div className="flex items-center text-sm text-gray-600 gap-2">
//                     <Star size={16} className="text-yellow-400" />
//                     {book.rating || 4.0}
//                     <span className="text-xs text-gray-400">
//                       ({book.ratingCount || 0})
//                     </span>
//                   </div>

//                   <div className={`mt-2 font-medium ${stockColor}`}>
//                     {status}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useNavigate } from "react-router-dom";
// import books from "../../data/sampleBooks";
// import { Star } from "lucide-react";
// import Sidebar from "../../components/Sidebar/Sidebar";

// const getStockStatus = (title = "") => {
//   const t = title.toLowerCase();
//   if (t.includes("out")) return "Stock Out";
//   if (t.includes("upcoming")) return "Upcoming";
//   return "Available";
// };

// export default function AllGenres() {
//   const navigate = useNavigate();

//   const allBooks = [
//     ...(books?.recommended || []),
//     ...(books?.popular || []),
//     ...(books?.featuredBooks || []), // ⬅️ safe if missing
//   ];

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Sidebar (no onSelect here; this page is a full list) */}
//       <Sidebar />

//       {/* Book Grid */}
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">All Genres</h1>
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {allBooks.map((book) => {
//             const status = getStockStatus(book.title);
//             const stockColor =
//               status === "Available"
//                 ? "text-green-600"
//                 : status === "Stock Out"
//                 ? "text-red-500"
//                 : "text-yellow-500";

//             return (
//               <div
//                 key={book.id}
//                 onClick={() => navigate(`/book/${book.id}`)}
//                 className="cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200"
//               >
//                 <img
//                   src={book.image}
//                   alt={book.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <div className="text-xs uppercase text-orange-500 font-semibold mb-1">
//                     {book.category || "General"}
//                   </div>
//                   <h3 className="text-md font-semibold line-clamp-2 mb-2">
//                     {book.title}
//                   </h3>

//                   <div className="flex items-center text-sm text-gray-600 gap-2">
//                     <Star size={16} className="text-yellow-400" />
//                     {book.rating || 4.0}
//                     <span className="text-xs text-gray-400">
//                       ({book.ratingCount || 0})
//                     </span>
//                   </div>

//                   <div className={`mt-2 font-medium ${stockColor}`}>
//                     {status}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           {allBooks.length === 0 && (
//             <div className="text-sm text-gray-500">No books found.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import books from "../../data/sampleBooks";
import { Star } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";

const getStockStatus = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("out")) return "Stock Out";
  if (t.includes("upcoming")) return "Upcoming";
  return "Available";
};

export default function AllGenres() {
  const navigate = useNavigate();
  const location = useLocation();

  const allBooks = [
    ...(books?.recommended || []),
    ...(books?.popular || []),
    ...(books?.featuredBooks || []), // ⬅️ safe if missing
  ];

  // 🔎 accept preset filter via navigation (e.g., from BookDetails category click)
  const [filter, setFilter] = useState(location.state?.filter || null);

  // keep in sync if coming back with a different preset
  useEffect(() => {
    if (location.state?.filter) setFilter(location.state.filter);
  }, [location.state]);

  // 🔁 same filtering rules as Home
  const filtered = useMemo(() => {
    if (!filter) return allBooks;

    if (filter.type === "all") return allBooks;

    if (filter.type === "category") {
      return allBooks.filter(
        (b) => (b.category || "").toLowerCase() === (filter.value || "").toLowerCase()
      );
    }

    if (filter.type === "subcategory") {
      // until you store subcategory on each book, map subcategory → parent
      return allBooks.filter(
        (b) => (b.category || "").toLowerCase() === (filter.parent || "").toLowerCase()
      );
    }

    return allBooks;
  }, [filter, allBooks]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar — now wired to set the filter, same as Home */}
      <Sidebar onSelect={setFilter} />

      {/* Book Grid */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">All Genres</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {(filtered.length ? filtered : []).map((book) => {
            const status = getStockStatus(book.title);
            const stockColor =
              status === "Available"
                ? "text-green-600"
                : status === "Stock Out"
                ? "text-red-500"
                : "text-yellow-500";

            return (
              <div
                key={book.id}
                onClick={() => navigate(`/book/${book.id}`)}
                className="cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="text-xs uppercase text-orange-500 font-semibold mb-1">
                    {book.category || "General"}
                  </div>
                  <h3 className="text-md font-semibold line-clamp-2 mb-2">
                    {book.title}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <Star size={16} className="text-yellow-400" />
                    {book.rating || 4.0}
                    <span className="text-xs text-gray-400">
                      ({book.ratingCount || 0})
                    </span>
                  </div>

                  <div className={`mt-2 font-medium ${stockColor}`}>
                    {status}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-sm text-gray-500">No books found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
