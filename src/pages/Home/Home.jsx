// // import Sidebar from "../../components/Sidebar/Sidebar";
// // import Section from "../../components/Section/Section";
// // import books from "../../data/sampleBooks";
// // import Navbar from "../../components/Navbar/Navbar";
// // import BookSlider from "../../components/BookSlider/BookSlider";
// // import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
// // import NewBookCollections from "../../components/NewBookCollections/NewBookCollections";

// // export default function Home() {
// //   return (
// //     <div className="min-h-screen bg-gray-50 py-15.5">
// //       <Navbar />
      
// //       {/* Header Section */}
// //       <div className="bg-sky-500 text-white px-4 sm:px-6 lg:px-8 py-4 text-lg sm:text-xl font-semibold">
// //         My Library
// //       </div>
      
// //       {/* Breadcrumb */}
// //       <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-2 text-xs text-gray-500">
// //         Dashboard / Site Page / My Library
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-4 gap-4">
// //         {/* Mobile Sidebar Toggle (if needed) */}
// //         <Sidebar />

        
// //         {/* Content Area */}
// //         <main className="flex-1">
// //           <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
// //             <Section title="Recommended" books={books.recommended} />
// //             <Section title="Popular" books={books.popular} />
// //             <NewBookCollections />
// //                       <BookSlider />
// //           </div>
// //         </main>
// //       </div>
// //             <FeaturedBanner />
// //     </div>
// //   );
// // }

// //without API
// // import Sidebar from "../../components/Sidebar/Sidebar";
// // import Section from "../../components/Section/Section";
// // import books from "../../data/sampleBooks";
// // import BookSlider from "../../components/BookSlider/BookSlider";
// // import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";

// // export default function Home() {
// //   return (
// //     <div className="min-h-screen bg-gray-50 py-4">
// //       <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm mx-4 sm:mx-6 lg:mx-8">
// //         <Section title="Recommended" books={books.recommended} />
// //         <Section title="Popular" books={books.popular} />
// //         <BookSlider />
// //         <FeaturedBanner />
// //       </div>
// //     </div>
// //   );
// // }


// //API Integration 
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Section from "../../components/Section/Section";
// import BookSlider from "../../components/BookSlider/BookSlider";
// import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";

// export default function Home() {
//   const [popularBooks, setPopularBooks] = useState([]);
//   const [recommendedBooks, setRecommendedBooks] = useState([]);

//   // ✅ Transform function for any book
//   const transformBook = (book, index) => ({
//     id: book.id || index,
//     title: book.title || "Untitled",
//     author: book.author || book.authors || "Unknown Author",
//     image: book.image || book.coverImage || "https://via.placeholder.com/150x220.png?text=No+Cover",
//     rating: book.rating || 0,
//     ratingCount: book.ratingCount || 0,
//     summary: book.summary || "",
//     publisher: book.publisher || "",
//     publishDate: book.publishDate || "",
//     category: book.category || "",
//     pdfLink: book.pdfLink || "",
//   });

//   // ✅ Fetch Recommended
//   useEffect(() => {
//     axios
//       .get("/books.json") // your local mock file or API endpoint
//       .then((res) => {
//         console.log("✅ Recommended Raw Data:", res.data);
//         const recBooks = res.data.slice(0, 4).map(transformBook); // pick 4 for example
//         setRecommendedBooks(recBooks);
//       })
//       .catch((err) => {
//         console.error("❌ Recommended error:", err);
//       });
//   }, []);

//   // ✅ Fetch Popular
//   useEffect(() => {
//     axios
//       .get("/books.json") // same file for demo
//       .then((res) => {
//         console.log("✅ Popular Raw Data:", res.data);
//         const popBooks = res.data.slice(4, 8).map(transformBook); // pick next 4
//         setPopularBooks(popBooks);
//       })
//       .catch((err) => {
//         console.error("❌ Popular error:", err);
//       });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-4">
//       <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm mx-4 sm:mx-6 lg:mx-8">
//         <Section title="Recommended" books={recommendedBooks} />
//         <Section title="Popular" books={popularBooks} />
//         <BookSlider />
//         <FeaturedBanner />
//       </div>
//     </div>
//   );
// }

// Home.jsx
import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Section from "../../components/Section/Section";
import books from "../../data/sampleBooks";
import Navbar from "../../components/Navbar/Navbar";
import BookSlider from "../../components/BookSlider/BookSlider";
import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
import NewBookCollections from "../../components/NewBookCollections/NewBookCollections";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function Home() {
  const [filter, setFilter] = useState(null);

  const allBooks = useMemo(
    () => [...(books?.recommended || []), ...(books?.popular || [])],
    []
  );

  const filtered = useMemo(() => {
    if (!filter) return [];

    if (filter.type === "all") return allBooks;

    if (filter.type === "category") {
      return allBooks.filter(
        (b) => (b.category || "").toLowerCase() === filter.value.toLowerCase()
      );
    }

    if (filter.type === "subcategory") {
      // Until subcategory exists on each book, map subcategories to their parent
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      {/* <div className="bg-sky-500 text-white px-4 sm:px-6 lg:px-8 py-4 text-lg sm:text-xl font-semibold">
        My Library
      </div> */}

      {/* Breadcrumb */}
      {/* <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-2 text-xs text-gray-500">
        Dashboard / Site Page / My Library
      </div> */}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-4 gap-4">
        {/* Sidebar (filters in-place) */}
        <Sidebar onSelect={setFilter} />

        {/* Content Area */}
        <main className="flex-1">
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
            {!filter ? (
              <>
                <Section title="Recommended" books={books.recommended} />
                <Section title="Popular" books={books.popular} />
                <NewBookCollections />
                <BookSlider />
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Showing results for:{" "}
                    <span className="text-sky-600">
                      {filter.type === "all"
                        ? "All Genre"
                        : filter.type === "subcategory"
                        ? `${filter.parent} → ${filter.value}`
                        : filter.value}
                    </span>
                  </h2>
                  <button
                    onClick={() => setFilter(null)}
                    className="text-sm text-gray-600 hover:text-sky-600"
                  >
                    Clear
                  </button>
                </div>

                {/* Filtered grid */}
                {filtered.length === 0 ? (
                  <div className="text-gray-500 text-sm">No books found.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map((b) => (
                      <div
                        key={b.id}
                        className="bg-white rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out p-3 flex flex-col"
                      >
                        <img
                          src={b.image}
                          alt={b.title}
                          className="w-full h-40 object-cover rounded-md"
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
                          {/* Stock badge (example rule only) */}
                          <p
                            className={`text-xs font-medium mt-2 ${
                              (b.title || "")
                                .toLowerCase()
                                .includes("empire")
                                ? "text-red-500"
                                : "text-green-600"
                            }`}
                          >
                            {(b.title || "").toLowerCase().includes("empire")
                              ? "Out Of Stock"
                              : "Available"}
                          </p>
                        </div>
                        <div className="mt-3">
                          <Link
                            to={`/book/${b.id}`}
                            className="inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-md"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <FeaturedBanner />
    </div>
  );
}

