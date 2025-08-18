// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
// import { Star, ChevronDown, Users, PlayCircle, Download } from "lucide-react";

// /**
//  * Per‑book reviews (examples).
//  * Add or edit by ID (string or number). If an ID is missing, the page will show “No reviews yet”.
//  * Vary counts (8–9, 3–4, 1, or none) per your instruction.
//  */
// const REVIEWS_DB = {
//   // Many reviews (sample)
//   "5": {
//     heading: "Employee Review",
//     overall: 4.7,
//     total: 2713,
//     breakdown: { 5: 82, 4: 12, 3: 4, 2: 1, 1: 1 },
//     images: [
//       "https://images.unsplash.com/photo-1544937950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
//     ],
//     reviews: [
//       { id: "r1", name: "Humayun Kabir", title: "An absolute masterpiece even in 2025", stars: 5, country: "Bangladesh", date: "July 2, 2025", verified: true, body: "Moves you from low‑level to high‑level architectural thinking. Evergreen patterns and trade‑offs. Senior engineers loved it.", helpful: 56 },
//       { id: "r2", name: "Lubaba Jahan", title: "Must Read", stars: 5, country: "Bangladesh", date: "May 26, 2025", verified: false, body: "Seminal work. Not a quick read, but worth the effort. Clear patterns and timeless insights.", helpful: 14 },
//       { id: "r3", name: "Rashedul Zaman", title: "Great print, good quality cover", stars: 4, country: "Bangladesh", date: "April 22, 2025", verified: true, body: "Well packaged, arrived flat. Solid examples and commentary.", helpful: 9 },
//       { id: "r4", name: "Tasmania Rosa .", title: "Practical patterns", stars: 5, country: "Bangladesh", date: "March 02, 2025", verified: true, body: "Explains trade‑offs clearly. Helped our team refactor services.", helpful: 11 },
//       { id: "r5", name: "Shuvo Rahman", title: "Dense but rewarding", stars: 4, country: "Bangladesh", date: "Feb 18, 2025", verified: false, body: "Take it slow. Examples are timeless.", helpful: 7 },
//       { id: "r6", name: "Maruf Islam", title: "Go‑to reference", stars: 5, country: "Bangladesh", date: "January 11, 2025", verified: true, body: "Keep it on my desk. Patterns map to modern stacks easily.", helpful: 18 },
//       { id: "r7", name: "Sazal Uddin.", title: "Bridges theory and practice", stars: 5, country: "Bangladesh", date: "Nov 3, 2024", verified: true, body: "Rare book that improves code quality quickly.", helpful: 6 },
//       { id: "r8", name: "Naimur Hasan", title: "A classic", stars: 5, country: "Bangladesh", date: "Sep 1, 2024", verified: false, body: "Still relevant, even with new frameworks.", helpful: 4 },
//     ],
//   },
//   // 3–4 reviews
//   "2": {
//     heading: "Employee Review",
//     overall: 4.9,
//     total: 1045,
//     breakdown: { 5: 88, 4: 9, 3: 2, 2: 1, 1: 0 },
//     images: [],
//     reviews: [
//       { id: "r9", name: "Nadia Zahan.", title: "Clear cloud strategy playbook", stars: 5, country: "Bangladesh", date: "May 10, 2024", verified: true, body: "Vendor‑neutral frameworks. Helped us choose a service model and avoid re‑architecture.", helpful: 22 },
//       { id: "r10", name: "Vitul Shohan", title: "Strong patterns", stars: 4, country: "Bangladesh", date: "Aug 8, 2024", verified: false, body: "Good balance of business & tech requirements.", helpful: 5 },
//       { id: "r11", name: "Purification Meril", title: "Great case studies", stars: 5, country: "Bangladesh", date: "Jan 20, 2025", verified: true, body: "Real migrations and pitfalls. Very useful.", helpful: 9 },
//     ],
//   },
//   // 1 review
//   "1": {
//     heading: "Employee Review",
//     overall: 4.0,
//     total: 1,
//     breakdown: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
//     images: [],
//     reviews: [
//       { id: "r12", name: "Alisha Rahman", title: "Inspiring for founders", stars: 5, country: "Bangladesh", date: "March 5, 2023", verified: true, body: "Concise, motivating, and practical.", helpful: 3 },
//     ],
//   },
//   // No reviews entries for other ids on purpose (e.g., "8", "11")
// };

// export default function BookDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [bookData, setBookData] = useState(null);
//   const [relatedBooks, setRelatedBooks] = useState([]);
//   const [showFullSummary, setShowFullSummary] = useState(false);

//   const normalize = (b) => {
//     if (!b) return null;
//     return {
//       id: b.id,
//       title: b.title,
//       authors: b.authors || b.author || "Unknown",
//       coverImage: b.coverImage || b.image,
//       rating: b.rating ?? 0,
//       ratingCount: b.ratingCount ?? 0,
//       reviews: b.reviews ?? null,
//       publisher: b.publisher ?? "—",
//       publishDate: b.publishDate ?? "",
//       category: b.category ?? "General",
//       summary: b.summary ?? b.description ?? "",
//       pdfLink: b.pdfLink ?? "#",
//       wants: b.wants ?? 0,
//       status: b.status,
//       image: b.image,
//     };
//   };

//   useEffect(() => {
//     const sliderBook = location.state?.fromSlider;
//     if (sliderBook && String(sliderBook.id) === String(id)) {
//       setBookData(normalize(sliderBook));
//     }

//     fetch("/books.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const found = data.find((b) => String(b.id) === String(id));
//         if (found) {
//           if (!(sliderBook && String(sliderBook.id) === String(id))) {
//             setBookData(normalize(found));
//           }
//           const others = data
//             .filter((b) => String(b.id) !== String(id))
//             .slice(0, 4)
//             .map(normalize)
//             .filter(Boolean);
//           setRelatedBooks(others);
//         } else {
//           const others = (data || [])
//             .filter((b) => String(b.id) !== String(id))
//             .slice(0, 4)
//             .map(normalize)
//             .filter(Boolean);
//           setRelatedBooks(others);
//         }
//       })
//       .catch(() => {});
//   }, [id, location.state]);

//   const renderStars = (rating) =>
//     [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${
//           i < (rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
//         }`}
//       />
//     ));

//   if (!bookData) {
//     return (
//       <div className="text-center text-gray-600 py-20">
//         Loading book details...
//       </div>
//     );
//   }

//   // Reviews for this book (may be null/undefined)
//   const pack = REVIEWS_DB[String(bookData.id)] || null;

//   // === STRICT display logic: always count from REVIEWS_DB; if none => 0 | No Reviews
//   const localReviewCount = pack?.reviews?.length ?? 0;
//   const ratingCountDisplay = pack ? localReviewCount : 0;
//   const reviewsTextDisplay = pack
//     ? (localReviewCount > 0 ? `${localReviewCount} Reviews` : "No Reviews")
//     : "No Reviews";
//   // === END

//   return (
//     <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
//         {/* LEFT COLUMN */}
//         <div className="col-span-1 flex flex-col items-center">
//           <img
//             src={bookData.coverImage}
//             alt={bookData.title}
//             className="w-[250px] sm:w-[280px] h-auto object-cover rounded shadow-md"
//           />
//           {/* <button className="mt-4 w-full bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-200 flex justify-between items-center">
//             WANT TO READ
//             <ChevronDown className="w-4 h-4" />
//           </button> */}

//           {/* Employee Review summary panel (LEFT SIDE) [kept disabled to avoid duplication above] */}
//           {false && (
//             <div className="w-full mt-8">
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 {pack?.heading || "Employee Review"}
//               </h3>

//               {!pack || pack.total === 0 ? (
//                 <div className="text-sm text-gray-500">
//                   No reviews yet for this book.
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <div className="text-lg font-semibold">
//                       {pack.overall.toFixed(1)}{" "}
//                       <span className="text-gray-500 text-base">out of 5</span>
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {pack.total.toLocaleString()} global ratings
//                     </div>

//                     {/* Bars sections */}
//                     <div className="mt-4 space-y-1">
//                       {[5, 4, 3, 2, 1].map((star) => (
//                         <div key={star} className="flex items-center gap-3">
//                           <span className="w-10 text-sm">{star} star</span>
//                           <div className="flex-1 h-2 bg-gray-200 rounded">
//                             <div
//                               className="h-2 bg-orange-500 rounded"
//                               style={{ width: `${pack.breakdown[star] || 0}%` }}
//                             />
//                           </div>
//                           <span className="w-10 text-right text-sm text-gray-600">
//                             {(pack.breakdown[star] || 0)}%
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="pt-4 border-t">
//                     <div className="text-sm text-gray-700 mb-2">
//                       Share your thoughts with other customers
//                     </div>
//                     <button className="w-full rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
//                       Write an employee review
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="col-span-2">
//           {/* Book core details */}
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             {bookData.title}
//           </h1>
//           <p className="text-gray-600 mt-1 text-base">
//             by{" "}
//             <span className="text-sky-600 font-medium">{bookData.authors}</span>
//           </p>
//           <p className="text-sm text-gray-500 mt-1">
//             {bookData.publisher}, {bookData.publishDate} -{" "}
//             <Link
//               to="/all-genres"
//               state={{ filter: { type: "category", value: bookData.category } }}
//               className="text-sky-600 hover:underline"
//             >
//               {bookData.category}
//             </Link>
//           </p>

//           <div className="flex items-center gap-2 mt-3 flex-wrap">
//             {renderStars(bookData.rating)}
//             <span className="text-sm text-gray-600 font-semibold">
//               {ratingCountDisplay} Ratings
//             </span>
//             <span className="text-gray-400">|</span>
//             <span className="text-sm text-gray-500">
//               {reviewsTextDisplay}
//             </span>
//           </div>

//           <div className="mt-2 flex items-center text-sm text-gray-600">
//             <Users className="w-4 h-4 mr-2" />
//             {bookData.wants} users want this item!
//           </div>

//           {/* Summary */}
//           <div className="mt-6">
//             <h3 className="font-bold text-gray-800">Summary of the Book</h3>
//             <p className="text-sm text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
//               {showFullSummary
//                 ? bookData.summary
//                 : (bookData.summary || "").split(".")[0] +
//                   (bookData.summary ? "..." : "")}
//               {(bookData.summary || "").split(".").length > 1 && (
//                 <button
//                   onClick={() => setShowFullSummary(!showFullSummary)}
//                   className={`ml-2 font-semibold hover:underline transition ${
//                     showFullSummary ? "text-gray-400" : "text-sky-600"
//                   }`}
//                 >
//                   {showFullSummary ? "Read Less" : "Read More"}
//                 </button>
//               )}
//             </p>
//           </div>

//           {/* Availability + Audio + PDF */}
//           <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <span className="text-green-600 font-medium text-sm inline-flex items-center">
//                 <span className="h-3 w-3 bg-green-500 rounded-full animate-ping mr-2"></span>
//                 Available
//               </span>
//               <div className="flex items-center mt-3 gap-2 text-sm">
//                 <PlayCircle className="w-5 h-5 text-gray-600" />
//                 <span className="text-gray-700">Audio Clip</span>
//                 <div className="w-32 h-1 bg-gray-200 rounded-full mx-2">
//                   <div className="w-1/3 h-full bg-sky-500 rounded-full"></div>
//                 </div>
//               </div>
//             </div>

//             <a
//               href={bookData.pdfLink}
//               download
//               className="flex items-center gap-1 text-sm text-gray-700 font-semibold border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
//             >
//               <Download className="w-4 h-4" />
//               PDF
//             </a>
//           </div>

//           <div className="mt-6">
//              <button
//               onClick={() => {
//                 const stored = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
//                 const alreadyExists = stored.find((b) => b.id === bookData.id);

//                 if (!alreadyExists) {
//                   stored.push({ ...bookData, quantity: 1 });
//                   localStorage.setItem("borrowedBooks", JSON.stringify(stored));
//                 }

//                 navigate("/borrowed");
//               }}
//               className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-md w-full sm:w-auto block text-center"
//             >
//               Borrowed
//             </button>
//            </div>

//           {/* Related Books (unchanged) */}
//           {/* <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">Related Books</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {relatedBooks.map((book) => (
//                 <div
//                   key={book.id}
//                   className="bg-white rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out p-3 flex flex-col justify-between"
//                 >
//                   <img
//                     src={book.coverImage || book.image}
//                     alt={book.title}
//                     className="w-full h-40 object-cover rounded-md"
//                   />
//                   <div className="mt-3">
//                     <h4 className="font-semibold text-sm text-gray-800">
//                       {book.title}
//                     </h4>
//                     <p className="text-xs text-gray-600">
//                       {book.authors || book.author}
//                     </p>
//                     <div className="flex items-center mt-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < (book.rating ?? 0)
//                               ? "text-yellow-500 fill-yellow-500"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <p
//                       className={`text-xs font-medium mt-1 ${
//                         book.status === "Out Of Stock"
//                           ? "text-red-500"
//                           : "text-green-600"
//                       }`}
//                     >
//                       {book.status || "Available"}
//                     </p>
//                   </div>
//                   <div className="mt-3">
//                     <Link
//                       to={`/book/${book.id}`}
//                       className="inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-md"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//           <div className="col-span-3">
//           <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Related Books</h3>
//             <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
//               {relatedBooks.map((book) => (
//                 <div
//                   key={book.id}
//                   className="bg-white rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out p-3 flex flex-col justify-between w-full"
//                 >
//                   <img
//                     src={book.coverImage || book.image}
//                     alt={book.title}
//                     className="w-full h-40 object-cover rounded-md"
//                   />
//                   <div className="mt-3">
//                     <h4 className="font-semibold text-sm text-gray-800">
//                       {book.title}
//                     </h4>
//                     <p className="text-xs text-gray-600">
//                       {book.authors || book.author}
//                     </p>
//                     <div className="flex items-center mt-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < (book.rating ?? 0)
//                               ? "text-yellow-500 fill-yellow-500"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <p
//                       className={`text-xs font-medium mt-1 ${
//                         book.status === "Out Of Stock"
//                           ? "text-red-500"
//                           : "text-green-600"
//                       }`}
//                     >
//                       {book.status || "Available"}
//                     </p>
//                   </div>
//                   <div className="mt-3">
//                     <Link
//                       to={`/book/${book.id}`}
//                       className="inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-md"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//           {/* ===== end related ===== */}
//         </div>

//         {/* LEFT summary (under Want to Read) */}
//         <div className="col-span-1">
//           <div className="w-full mt-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-2">
//               {pack?.heading || "Employee Review"}
//             </h3>

//             {!pack || pack.total === 0 ? (
//               <div className="text-sm text-gray-500">No reviews yet for this book.</div>
//             ) : (
//               <div className="space-y-4">
//                 <div>
//                   <div className="text-lg font-semibold">
//                     {pack.overall.toFixed(1)}{" "}
//                     <span className="text-gray-500 text-base">out of 5</span>
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     {pack.total.toLocaleString()} global ratings
//                   </div>

//                   {/* Bars */}
//                   <div className="mt-4 space-y-1">
//                     {[5, 4, 3, 2, 1].map((star) => (
//                       <div key={star} className="flex items-center gap-3">
//                         <span className="w-10 text-sm">{star} star</span>
//                         <div className="flex-1 h-2 bg-gray-200 rounded">
//                           <div
//                             className="h-2 bg-orange-500 rounded"
//                             style={{ width: `${pack.breakdown[star] || 0}%` }}
//                           />
//                         </div>
//                         <span className="w-10 text-right text-sm text-gray-600">
//                           {(pack.breakdown[star] || 0)}%
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="pt-4">
//                   <div className="text-sm text-gray-700 mb-2">
//                     Share your thoughts with other customers
//                   </div>
//                   <button className="w-full rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
//                     Write an employee review
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT reviews (images + list) */}
//         <div className="col-span-2">
//           <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-3">
//               {pack?.heading || "Employee Review"}
//             </h3>

//             {!pack || pack.total === 0 ? (
//               <div className="text-sm text-gray-500">No reviews yet for this book.</div>
//             ) : (
//               <>
//                 {pack.images?.length > 0 && (
//                   <div className="mb-6">
//                     <div className="flex items-center justify-between mb-2">
//                       <h4 className="text-base font-semibold">Reviews with images</h4>
//                       <button className="text-sm text-sky-600 hover:underline">
//                         See all photos
//                       </button>
//                     </div>
//                     <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 pr-1">
//                       {pack.images.map((src, idx) => (
//                         <img
//                           key={idx}
//                           src={src}
//                           alt={`review-${idx}`}
//                           className="h-24 w-24 object-cover rounded-md flex-shrink-0"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="space-y-6">
//                   {pack.reviews.map((r) => (
//                     <article key={r.id} className="border-b pb-6">
//                       <div className="flex items-center gap-2">
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`w-4 h-4 ${
//                                 i < r.stars
//                                   ? "text-yellow-500 fill-yellow-500"
//                                   : "text-gray-300"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                         <h5 className="font-semibold text-gray-900">{r.title}</h5>
//                       </div>

//                       <div className="text-xs text-gray-500 mt-1">
//                         {r.name} — Reviewed in the {r.country} on {r.date}
//                         {r.verified && (
//                           <span className="ml-1 text-green-600">• Verified Purchase</span>
//                         )}
//                       </div>

//                       <p className="text-sm text-gray-700 mt-3 leading-relaxed">{r.body}</p>

//                       <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
//                         <button className="rounded-full border px-3 py-1 hover:bg-gray-50">
//                           Helpful
//                         </button>
//                         <button className="rounded-full border px-3 py-1 hover:bg-gray-50">
//                           Report
//                         </button>
//                         <span className="text-gray-500">
//                           {r.helpful} people found this helpful
//                         </span>
//                       </div>
//                     </article>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         {/* ===== end new row ===== */}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
// import { Star, ChevronDown, Users, PlayCircle, Download } from "lucide-react";

// /**
//  * Per-book reviews (examples).
//  * Add or edit by ID (string or number). If an ID is missing, the page will show “No reviews yet”.
//  * Vary counts (8–9, 3–4, 1, or none) per your instruction.
//  */
// const REVIEWS_DB = {
//   // Many reviews (sample)
//   "5": {
//     heading: "Employee Review",
//     overall: 4.7,
//     total: 2713,
//     breakdown: { 5: 82, 4: 12, 3: 4, 2: 1, 1: 1 },
//     images: [
//       "https://images.unsplash.com/photo-1544937950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
//     ],
//     reviews: [
//       { id: "r1", name: "Humayun Kabir", title: "An absolute masterpiece even in 2025", stars: 5, country: "Bangladesh", date: "July 2, 2025", verified: true, body: "Moves you from low-level to high-level architectural thinking. Evergreen patterns and trade-offs. Senior engineers loved it.", helpful: 56 },
//       { id: "r2", name: "Lubaba Jahan", title: "Must Read", stars: 5, country: "Bangladesh", date: "May 26, 2025", verified: false, body: "Seminal work. Not a quick read, but worth the effort. Clear patterns and timeless insights.", helpful: 14 },
//       { id: "r3", name: "Rashedul Zaman", title: "Great print, good quality cover", stars: 4, country: "Bangladesh", date: "April 22, 2025", verified: true, body: "Well packaged, arrived flat. Solid examples and commentary.", helpful: 9 },
//       { id: "r4", name: "Tasmania Rosa .", title: "Practical patterns", stars: 5, country: "Bangladesh", date: "March 02, 2025", verified: true, body: "Explains trade-offs clearly. Helped our team refactor services.", helpful: 11 },
//       { id: "r5", name: "Shuvo Rahman", title: "Dense but rewarding", stars: 4, country: "Bangladesh", date: "Feb 18, 2025", verified: false, body: "Take it slow. Examples are timeless.", helpful: 7 },
//       { id: "r6", name: "Maruf Islam", title: "Go-to reference", stars: 5, country: "Bangladesh", date: "January 11, 2025", verified: true, body: "Keep it on my desk. Patterns map to modern stacks easily.", helpful: 18 },
//       { id: "r7", name: "Sazal Uddin.", title: "Bridges theory and practice", stars: 5, country: "Bangladesh", date: "Nov 3, 2024", verified: true, body: "Rare book that improves code quality quickly.", helpful: 6 },
//       { id: "r8", name: "Naimur Hasan", title: "A classic", stars: 5, country: "Bangladesh", date: "Sep 1, 2024", verified: false, body: "Still relevant, even with new frameworks.", helpful: 4 },
//     ],
//   },
//   // 3–4 reviews
//   "2": {
//     heading: "Employee Review",
//     overall: 4.9,
//     total: 1045,
//     breakdown: { 5: 88, 4: 9, 3: 2, 2: 1, 1: 0 },
//     images: [],
//     reviews: [
//       { id: "r9", name: "Nadia Zahan.", title: "Clear cloud strategy playbook", stars: 5, country: "Bangladesh", date: "May 10, 2024", verified: true, body: "Vendor-neutral frameworks. Helped us choose a service model and avoid re-architecture.", helpful: 22 },
//       { id: "r10", name: "Vitul Shohan", title: "Strong patterns", stars: 4, country: "Bangladesh", date: "Aug 8, 2024", verified: false, body: "Good balance of business & tech requirements.", helpful: 5 },
//       { id: "r11", name: "Purification Meril", title: "Great case studies", stars: 5, country: "Bangladesh", date: "Jan 20, 2025", verified: true, body: "Real migrations and pitfalls. Very useful.", helpful: 9 },
//     ],
//   },
//   // 1 review
//   "1": {
//     heading: "Employee Review",
//     overall: 4.0,
//     total: 1,
//     breakdown: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
//     images: [],
//     reviews: [
//       { id: "r12", name: "Alisha Rahman", title: "Inspiring for founders", stars: 5, country: "Bangladesh", date: "March 5, 2023", verified: true, body: "Concise, motivating, and practical.", helpful: 3 },
//     ],
//   },
//   // No reviews entries for other ids on purpose (e.g., "8", "11")
// };

// export default function BookDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [bookData, setBookData] = useState(null);
//   const [relatedBooks, setRelatedBooks] = useState([]);
//   const [showFullSummary, setShowFullSummary] = useState(false);

//   const normalize = (b) => {
//     if (!b) return null;
//     return {
//       id: b.id,
//       title: b.title,
//       authors: b.authors || b.author || "Unknown",
//       coverImage: b.coverImage || b.image,
//       rating: b.rating ?? 0,
//       ratingCount: b.ratingCount ?? 0,
//       reviews: b.reviews ?? null,
//       publisher: b.publisher ?? "—",
//       publishDate: b.publishDate ?? "",
//       category: b.category ?? "General",
//       summary: b.summary ?? b.description ?? "",
//       pdfLink: b.pdfLink ?? "#",
//       wants: b.wants ?? 0,
//       status: b.status,
//       image: b.image,
//     };
//   };

//   useEffect(() => {
//     const sliderBook = location.state?.fromSlider;
//     if (sliderBook && String(sliderBook.id) === String(id)) {
//       setBookData(normalize(sliderBook));
//     }

//     fetch("/books.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const found = data.find((b) => String(b.id) === String(id));
//         if (found) {
//           if (!(sliderBook && String(sliderBook.id) === String(id))) {
//             setBookData(normalize(found));
//           }
//           const others = data
//             .filter((b) => String(b.id) !== String(id))
//             .slice(0, 3) // ← EXACTLY THREE
//             .map(normalize)
//             .filter(Boolean);
//           setRelatedBooks(others);
//         } else {
//           const others = (data || [])
//             .filter((b) => String(b.id) !== String(id))
//             .slice(0, 3) // ← EXACTLY THREE
//             .map(normalize)
//             .filter(Boolean);
//           setRelatedBooks(others);
//         }
//       })
//       .catch(() => {});
//   }, [id, location.state]);

//   const renderStars = (rating) =>
//     [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${
//           i < (rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
//         }`}
//       />
//     ));

//   if (!bookData) {
//     return (
//       <div className="text-center text-gray-600 py-20">
//         Loading book details...
//       </div>
//     );
//   }

//   // Reviews for this book (may be null/undefined)
//   const pack = REVIEWS_DB[String(bookData.id)] || null;

//   // STRICT: use REVIEWS_DB counts only
//   const localReviewCount = pack?.reviews?.length ?? 0;
//   const ratingCountDisplay = pack ? localReviewCount : 0;
//   const reviewsTextDisplay = pack
//     ? (localReviewCount > 0 ? `${localReviewCount} Reviews` : "No Reviews")
//     : "No Reviews";

//   return (
//     <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
//         {/* LEFT COLUMN */}
//         <div className="col-span-1 flex flex-col items-center">
//           <img
//             src={bookData.coverImage}
//             alt={bookData.title}
//             className="w-[250px] sm:w-[280px] h-auto object-cover rounded shadow-md"
//           />
//           {/* <button className="mt-4 w-full bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-200 flex justify-between items-center">
//             WANT TO READ
//             <ChevronDown className="w-4 h-4" />
//           </button> */}

//           {/* Employee Review summary panel (LEFT SIDE) [kept disabled to avoid duplication above] */}
//           {false && (
//             <div className="w-full mt-8">
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 {pack?.heading || "Employee Review"}
//               </h3>

//               {!pack || pack.total === 0 ? (
//                 <div className="text-sm text-gray-500">
//                   No reviews yet for this book.
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <div className="text-lg font-semibold">
//                       {pack.overall.toFixed(1)}{" "}
//                       <span className="text-gray-500 text-base">out of 5</span>
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {pack.total.toLocaleString()} global ratings
//                     </div>

//                     {/* Bars sections */}
//                     <div className="mt-4 space-y-1">
//                       {[5, 4, 3, 2, 1].map((star) => (
//                         <div key={star} className="flex items-center gap-3">
//                           <span className="w-10 text-sm">{star} star</span>
//                           <div className="flex-1 h-2 bg-gray-200 rounded">
//                             <div
//                               className="h-2 bg-orange-500 rounded"
//                               style={{ width: `${pack.breakdown[star] || 0}%` }}
//                             />
//                           </div>
//                           <span className="w-10 text-right text-sm text-gray-600">
//                             {(pack.breakdown[star] || 0)}%
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="pt-4 border-t">
//                     <div className="text-sm text-gray-700 mb-2">
//                       Share your thoughts with other customers
//                     </div>
//                     <button className="w-full rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
//                       Write an employee review
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="col-span-2">
//           {/* Related Books blocks here are intentionally commented to avoid duplicates */}
//           {/*
//           <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">Related Books</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               ...
//             </div>
//           </div>
//           */}

//           {/* Book core details */}
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             {bookData.title}
//           </h1>
//           <p className="text-gray-600 mt-1 text-base">
//             by{" "}
//             <span className="text-sky-600 font-medium">{bookData.authors}</span>
//           </p>
//           <p className="text-sm text-gray-500 mt-1">
//             {bookData.publisher}, {bookData.publishDate} -{" "}
//             <Link
//               to="/all-genres"
//               state={{ filter: { type: "category", value: bookData.category } }}
//               className="text-sky-600 hover:underline"
//             >
//               {bookData.category}
//             </Link>
//           </p>

//           <div className="flex items-center gap-2 mt-3 flex-wrap">
//             {renderStars(bookData.rating)}
//             <span className="text-sm text-gray-600 font-semibold">
//               {ratingCountDisplay} Ratings
//             </span>
//             <span className="text-gray-400">|</span>
//             <span className="text-sm text-gray-500">
//               {reviewsTextDisplay}
//             </span>
//           </div>

//           <div className="mt-2 flex items-center text-sm text-gray-600">
//             <Users className="w-4 h-4 mr-2" />
//             {bookData.wants} users want this item!
//           </div>

//           {/* Summary */}
//           <div className="mt-6">
//             <h3 className="font-bold text-gray-800">Summary of the Book</h3>
//             <p className="text-sm text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
//               {showFullSummary
//                 ? bookData.summary
//                 : (bookData.summary || "").split(".")[0] +
//                   (bookData.summary ? "..." : "")}
//               {(bookData.summary || "").split(".").length > 1 && (
//                 <button
//                   onClick={() => setShowFullSummary(!showFullSummary)}
//                   className={`ml-2 font-semibold hover:underline transition ${
//                     showFullSummary ? "text-gray-400" : "text-sky-600"
//                   }`}
//                 >
//                   {showFullSummary ? "Read Less" : "Read More"}
//                 </button>
//               )}
//             </p>
//           </div>

//           {/* Availability + Audio + PDF */}
//           <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <span className="text-green-600 font-medium text-sm inline-flex items-center">
//                 <span className="h-3 w-3 bg-green-500 rounded-full animate-ping mr-2"></span>
//                 Available
//               </span>
//               <div className="flex items-center mt-3 gap-2 text-sm">
//                 <PlayCircle className="w-5 h-5 text-gray-600" />
//                 <span className="text-gray-700">Audio Clip</span>
//                 <div className="w-32 h-1 bg-gray-200 rounded-full mx-2">
//                   <div className="w-1/3 h-full bg-sky-500 rounded-full"></div>
//                 </div>
//               </div>
//             </div>

//             <a
//               href={bookData.pdfLink}
//               download
//               className="flex items-center gap-1 text-sm text-gray-700 font-semibold border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
//             >
//               <Download className="w-4 h-4" />
//               PDF
//             </a>
//           </div>

//           <div className="mt-6">
//             <button
//               onClick={() => {
//                 const stored = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
//                 const alreadyExists = stored.find((b) => b.id === bookData.id);

//                 if (!alreadyExists) {
//                   stored.push({ ...bookData, quantity: 1 });
//                   localStorage.setItem("borrowedBooks", JSON.stringify(stored));
//                 }

//                 navigate("/borrowed");
//               }}
//               className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-md w-full sm:w-auto block text-center"
//             >
//               Borrowed
//             </button>
//           </div>
//         </div>

//         {/* === CENTERED Related Books (exactly 3) BEFORE BOTH REVIEW SECTIONS === */}
//         <div className="col-span-3">
//           <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Related Books</h3>
//             <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
//               {relatedBooks.map((book) => (
//                 <div
//                   key={book.id}
//                   className="bg-white rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out p-3 flex flex-col justify-between w-full"
//                 >
//                   <img
//                     src={book.coverImage || book.image}
//                     alt={book.title}
//                     className="w-full h-40 object-cover rounded-md"
//                   />
//                   <div className="mt-3">
//                     <h4 className="font-semibold text-sm text-gray-800">
//                       {book.title}
//                     </h4>
//                     <p className="text-xs text-gray-600">
//                       {book.authors || book.author}
//                     </p>
//                     <div className="flex items-center mt-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < (book.rating ?? 0)
//                               ? "text-yellow-500 fill-yellow-500"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <p
//                       className={`text-xs font-medium mt-1 ${
//                         book.status === "Out Of Stock"
//                           ? "text-red-500"
//                           : "text-green-600"
//                       }`}
//                     >
//                       {book.status || "Available"}
//                     </p>
//                   </div>
//                   <div className="mt-3">
//                     <Link
//                       to={`/book/${book.id}`}
//                       className="inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-md"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/* ===== end CENTERED related ===== */}

//         {/* LEFT summary (under Want to Read) */}
//         <div className="col-span-1">
//           <div className="w-full mt-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-2">
//               {pack?.heading || "Employee Review"}
//             </h3>

//             {!pack || pack.total === 0 ? (
//               <div className="text-sm text-gray-500">No reviews yet for this book.</div>
//             ) : (
//               <div className="space-y-4">
//                 <div>
//                   <div className="text-lg font-semibold">
//                     {pack.overall.toFixed(1)}{" "}
//                     <span className="text-gray-500 text-base">out of 5</span>
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     {pack.total.toLocaleString()} global ratings
//                   </div>

//                   {/* Bars */}
//                   <div className="mt-4 space-y-1">
//                     {[5, 4, 3, 2, 1].map((star) => (
//                       <div key={star} className="flex items-center gap-3">
//                         <span className="w-10 text-sm">{star} star</span>
//                         <div className="flex-1 h-2 bg-gray-200 rounded">
//                           <div
//                             className="h-2 bg-orange-500 rounded"
//                             style={{ width: `${pack.breakdown[star] || 0}%` }}
//                           />
//                         </div>
//                         <span className="w-10 text-right text-sm text-gray-600">
//                           {(pack.breakdown[star] || 0)}%
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="pt-4">
//                   <div className="text-sm text-gray-700 mb-2">
//                     Share your thoughts with other customers
//                   </div>
//                   <button className="w-full rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
//                     Write an employee review
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT reviews (images + list) */}
//         <div className="col-span-2">
//           <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-3">
//               {pack?.heading || "Employee Review"}
//             </h3>

//             {!pack || pack.total === 0 ? (
//               <div className="text-sm text-gray-500">No reviews yet for this book.</div>
//             ) : (
//               <>
//                 {pack.images?.length > 0 && (
//                   <div className="mb-6">
//                     <div className="flex items-center justify-between mb-2">
//                       <h4 className="text-base font-semibold">Reviews with images</h4>
//                       <button className="text-sm text-sky-600 hover:underline">
//                         See all photos
//                       </button>
//                     </div>
//                     <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 pr-1">
//                       {pack.images.map((src, idx) => (
//                         <img
//                           key={idx}
//                           src={src}
//                           alt={`review-${idx}`}
//                           className="h-24 w-24 object-cover rounded-md flex-shrink-0"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="space-y-6">
//                   {pack.reviews.map((r) => (
//                     <article key={r.id} className="border-b pb-6">
//                       <div className="flex items-center gap-2">
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`w-4 h-4 ${
//                                 i < r.stars
//                                   ? "text-yellow-500 fill-yellow-500"
//                                   : "text-gray-300"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                         <h5 className="font-semibold text-gray-900">{r.title}</h5>
//                       </div>

//                       <div className="text-xs text-gray-500 mt-1">
//                         {r.name} — Reviewed in the {r.country} on {r.date}
//                         {r.verified && (
//                           <span className="ml-1 text-green-600">• Verified Purchase</span>
//                         )}
//                       </div>

//                       <p className="text-sm text-gray-700 mt-3 leading-relaxed">{r.body}</p>

//                       <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
//                         <button className="rounded-full border px-3 py-1 hover:bg-gray-50">
//                           Helpful
//                         </button>
//                         <button className="rounded-full border px-3 py-1 hover:bg-gray-50">
//                           Report
//                         </button>
//                         <span className="text-gray-500">
//                           {r.helpful} people found this helpful
//                         </span>
//                       </div>
//                     </article>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         {/* ===== end new row ===== */}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
// import { Star, ChevronDown, PlayCircle, Download, BookOpen } from "lucide-react";

// /** Demo reviews DB (unchanged) */
// const REVIEWS_DB = {
//   "5": {
//     heading: "Employee Review",
//     overall: 4.7,
//     total: 2713,
//     breakdown: { 5: 82, 4: 12, 3: 4, 2: 1, 1: 1 },
//     images: [
//       "https://images.unsplash.com/photo-1544937950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=400&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
//     ],
//     reviews: [
//       { id: "r1", name: "Humayun Kabir", title: "An absolute masterpiece even in 2025", stars: 5, country: "Bangladesh", date: "July 2, 2025", verified: true, body: "Moves you from low-level to high-level architectural thinking. Evergreen patterns and trade-offs. Senior engineers loved it.", helpful: 56 },
//       { id: "r2", name: "Lubaba Jahan", title: "Must Read", stars: 5, country: "Bangladesh", date: "May 26, 2025", verified: false, body: "Seminal work. Not a quick read, but worth the effort. Clear patterns and timeless insights.", helpful: 14 },
//       { id: "r3", name: "Rashedul Zaman", title: "Great print, good quality cover", stars: 4, country: "Bangladesh", date: "April 22, 2025", verified: true, body: "Well packaged, arrived flat. Solid examples and commentary.", helpful: 9 },
//       { id: "r4", name: "Tasmania Rosa .", title: "Practical patterns", stars: 5, country: "Bangladesh", date: "March 02, 2025", verified: true, body: "Explains trade-offs clearly. Helped our team refactor services.", helpful: 11 },
//       { id: "r5", name: "Shuvo Rahman", title: "Dense but rewarding", stars: 4, country: "Bangladesh", date: "Feb 18, 2025", verified: false, body: "Take it slow. Examples are timeless.", helpful: 7 },
//       { id: "r6", name: "Maruf Islam", title: "Go-to reference", stars: 5, country: "Bangladesh", date: "January 11, 2025", verified: true, body: "Keep it on my desk. Patterns map to modern stacks easily.", helpful: 18 },
//       { id: "r7", name: "Sazal Uddin.", title: "Bridges theory and practice", stars: 5, country: "Bangladesh", date: "Nov 3, 2024", verified: true, body: "Rare book that improves code quality quickly.", helpful: 6 },
//       { id: "r8", name: "Naimur Hasan", title: "A classic", stars: 5, country: "Bangladesh", date: "Sep 1, 2024", verified: false, body: "Still relevant, even with new frameworks.", helpful: 4 },
//     ],
//   },
//   "2": {
//     heading: "Employee Review",
//     overall: 4.9,
//     total: 1045,
//     breakdown: { 5: 88, 4: 9, 3: 2, 2: 1, 1: 0 },
//     images: [],
//     reviews: [
//       { id: "r9", name: "Nadia Zahan.", title: "Clear cloud strategy playbook", stars: 5, country: "Bangladesh", date: "May 10, 2024", verified: true, body: "Vendor-neutral frameworks. Helped us choose a service model and avoid re-architecture.", helpful: 22 },
//       { id: "r10", name: "Vitul Shohan", title: "Strong patterns", stars: 4, country: "Bangladesh", date: "Aug 8, 2024", verified: false, body: "Good balance of business & tech requirements.", helpful: 5 },
//       { id: "r11", name: "Purification Meril", title: "Great case studies", stars: 5, country: "Bangladesh", date: "Jan 20, 2025", verified: true, body: "Real migrations and pitfalls. Very useful.", helpful: 9 },
//     ],
//   },
//   "1": {
//     heading: "Employee Review",
//     overall: 4.0,
//     total: 1,
//     breakdown: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
//     images: [],
//     reviews: [
//       { id: "r12", name: "Alisha Rahman", title: "Inspiring for founders", stars: 5, country: "Bangladesh", date: "March 5, 2023", verified: true, body: "Concise, motivating, and practical.", helpful: 3 },
//     ],
//   },
// };

// export default function BookDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [bookData, setBookData] = useState(null);
//   const [relatedBooks, setRelatedBooks] = useState([]);
//   const [catalog, setCatalog] = useState([]);            // ← keep catalog to derive stats
//   const [stats, setStats] = useState({ available: 0, upcoming: 0, unavailable: 0 });
//   const [showFullSummary, setShowFullSummary] = useState(false);

//   const normalize = (b) =>
//     !b
//       ? null
//       : {
//           id: b.id,
//           title: b.title,
//           authors: b.authors || b.author || "Unknown",
//           coverImage: b.coverImage || b.image,
//           rating: b.rating ?? 0,
//           ratingCount: b.ratingCount ?? 0,
//           reviews: b.reviews ?? null,
//           publisher: b.publisher ?? "—",
//           publishDate: b.publishDate ?? "",
//           category: b.category ?? "General",
//           summary: b.summary ?? b.description ?? "",
//           pdfLink: b.pdfLink ?? "#",
//           wants: b.wants ?? 0,
//           status: b.status,
//           image: b.image,
//         };

//   // helper: classify a status string
//   const bucket = (s) => {
//     const v = String(s || "Available").toLowerCase();
//     if (v.includes("upcoming") || v.includes("coming")) return "upcoming";
//     if (v.includes("out") || v.includes("not available") || v.includes("stock"))
//       return "unavailable";
//     return "available";
//   };

//   useEffect(() => {
//     const sliderBook = location.state?.fromSlider;

//     fetch("/books.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setCatalog(data || []);

//         // current book
//         const found = data.find((b) => String(b.id) === String(id));
//         const active = found || (sliderBook && String(sliderBook.id) === String(id) ? sliderBook : null);

//         if (active) setBookData(normalize(active));

//         // related (still 3)
//         const others = (data || [])
//           .filter((b) => String(b.id) !== String(id))
//           .slice(0, 3)
//           .map(normalize)
//           .filter(Boolean);
//         setRelatedBooks(others);

//         // stats BY CATEGORY so it’s not constant on every page
//         const targetCategory = active?.category ?? "General";
//         const scope = (data || []).filter(
//           (b) => (b.category ?? "General") === targetCategory
//         );
//         const totals = scope.reduce(
//           (acc, b) => {
//             acc[bucket(b.status)] += 1;
//             return acc;
//           },
//           { available: 0, upcoming: 0, unavailable: 0 }
//         );
//         setStats(totals);
//       })
//       .catch(() => {});
//   }, [id, location.state]);

//   const renderStars = (rating) =>
//     [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${
//           i < (rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
//         }`}
//       />
//     ));

//   if (!bookData) {
//     return (
//       <div className="text-center text-gray-600 py-20">
//         Loading book details...
//       </div>
//     );
//   }

//   const pack = REVIEWS_DB[String(bookData.id)] || null;
//   const localReviewCount = pack?.reviews?.length ?? 0;
//   const ratingCountDisplay = pack ? localReviewCount : 0;
//   const reviewsTextDisplay = pack
//     ? localReviewCount > 0
//       ? `${localReviewCount} Reviews`
//       : "No Reviews"
//     : "No Reviews";

//   return (
//     <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
//         {/* LEFT COLUMN */}
//         <div className="col-span-1 flex flex-col items-center">
//           <img
//             src={bookData.coverImage}
//             alt={bookData.title}
//             className="w-[250px] sm:w-[280px] h-auto object-cover rounded shadow-md"
//           />
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="col-span-2">
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             {bookData.title}
//           </h1>
//           <p className="text-gray-600 mt-1 text-base">
//             by <span className="text-sky-600 font-medium">{bookData.authors}</span>
//           </p>
//           <p className="text-sm text-gray-500 mt-1">
//             {bookData.publisher}, {bookData.publishDate} -{" "}
//             <Link
//               to="/all-genres"
//               state={{ filter: { type: "category", value: bookData.category } }}
//               className="text-sky-600 hover:underline"
//             >
//               {bookData.category}
//             </Link>
//           </p>

//           <div className="flex items-center gap-2 mt-3 flex-wrap">
//             {renderStars(bookData.rating)}
//             <span className="text-sm text-gray-600 font-semibold">
//               {ratingCountDisplay} Ratings
//             </span>
//             <span className="text-gray-400">|</span>
//             <span className="text-sm text-gray-500">{reviewsTextDisplay}</span>
//           </div>

//           {/* Counts line (books icon) */}
//           <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-700">
//             <span className="inline-flex items-center">
//               <BookOpen className="w-4 h-4 mr-2" />
//               <span className="font-semibold">{stats.available}</span>&nbsp;Available
//             </span>
//             <span className="hidden sm:inline text-gray-300">|</span>
//             <span className="inline-flex items-center">
//               <span className="font-semibold">{stats.upcoming}</span>&nbsp;Upcoming
//             </span>
//             <span className="hidden sm:inline text-gray-300">|</span>
//             <span className="inline-flex items-center">
//               <span className="font-semibold">{stats.unavailable}</span>&nbsp;Not available
//             </span>
//           </div>

//           {/* Summary */}
//           <div className="mt-6">
//             <h3 className="font-bold text-gray-800">Summary of the Book</h3>
//             <p className="text-sm text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
//               {showFullSummary
//                 ? bookData.summary
//                 : (bookData.summary || "").split(".")[0] +
//                   (bookData.summary ? "..." : "")}
//               {(bookData.summary || "").split(".").length > 1 && (
//                 <button
//                   onClick={() => setShowFullSummary(!showFullSummary)}
//                   className={`ml-2 font-semibold hover:underline transition ${
//                     showFullSummary ? "text-gray-400" : "text-sky-600"
//                   }`}
//                 >
//                   {showFullSummary ? "Read Less" : "Read More"}
//                 </button>
//               )}
//             </p>
//           </div>

//           {/* Availability + Audio + PDF */}
//           {/* <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <span className="text-green-600 font-medium text-sm inline-flex items-center">
//                 <span className="h-3 w-3 bg-green-500 rounded-full animate-ping mr-2"></span>
//                 Available
//               </span>
//               <div className="flex items-center mt-3 gap-2 text-sm">
//                 <PlayCircle className="w-5 h-5 text-gray-600" />
//                 <span className="text-gray-700">Audio Clip</span>
//                 <div className="w-32 h-1 bg-gray-200 rounded-full mx-2">
//                   <div className="w-1/3 h-full bg-sky-500 rounded-full"></div>
//                 </div>
//               </div>
//             </div>

//             <a
//               href={bookData.pdfLink}
//               download
//               className="flex items-center gap-1 text-sm text-gray-700 font-semibold border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
//             >
//               <Download className="w-4 h-4" />
//               PDF
//             </a>
//           </div> */}

//           {/* Availability + Audio + PDF (PDF right, aligned with Audio) */}
// <div className="mt-6">
//   {/* Availability badge stays above */}
//   <span className="text-green-600 font-medium text-sm inline-flex items-center">
//     <span className="h-3 w-3 bg-green-500 rounded-full animate-ping mr-2"></span>
//     Available
//   </span>

//   {/* Row: Audio (left) + PDF (right) */}
//   <div className="mt-3 flex flex-wrap items-center gap-3">
//     {/* Audio section */}
//     <div className="flex items-center gap-2 text-sm">
//       <PlayCircle className="w-5 h-5 text-gray-600" />
//       <span className="text-gray-700">Audio Clip</span>
//       <div className="w-32 h-1 bg-gray-200 rounded-full mx-2 sm:mx-3">
//         <div className="w-1/3 h-full bg-sky-500 rounded-full"></div>
//       </div>
//     </div>

//     {/* PDF button stays on the right side */}
//     <a
//       href={bookData.pdfLink}
//       download
//       className="ml-auto inline-flex items-center gap-1 text-sm text-gray-700 font-semibold border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
//     >
//       <Download className="w-4 h-4" />
//       PDF
//     </a>
//   </div>
// </div>


//           <div className="mt-6">
//             <button
//               onClick={() => {
//                 const stored = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
//                 const alreadyExists = stored.find((b) => b.id === bookData.id);
//                 if (!alreadyExists) {
//                   stored.push({ ...bookData, quantity: 1 });
//                   localStorage.setItem("borrowedBooks", JSON.stringify(stored));
//                 }
//                 navigate("/fill-up-form");
//               }}
//               className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-md w-full sm:w-auto block text-center"
//             >
//               Borrowed
//             </button>
//           </div>
//         </div>

//         {/* === CENTERED Related Books (exactly 3) BEFORE reviews === */}
//         <div className="col-span-3">
//           <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Related Books</h3>
//             <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
//               {relatedBooks.map((book) => (
//                 <div
//                   key={book.id}
//                   className="bg-white rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out p-3 flex flex-col justify-between w-full"
//                 >
//                   <img
//                     src={book.coverImage || book.image}
//                     alt={book.title}
//                     className="w-full h-40 object-cover rounded-md"
//                   />
//                   <div className="mt-3">
//                     <h4 className="font-semibold text-sm text-gray-800">{book.title}</h4>
//                     <p className="text-xs text-gray-600">{book.authors || book.author}</p>
//                     <div className="flex items-center mt-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < (book.rating ?? 0)
//                               ? "text-yellow-500 fill-yellow-500"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <p
//                       className={`text-xs font-medium mt-1 ${
//                         book.status === "Out Of Stock" ? "text-red-500" : "text-green-600"
//                       }`}
//                     >
//                       {book.status || "Available"}
//                     </p>
//                   </div>
//                   <div className="mt-3">
//                     <Link
//                       to={`/book/${book.id}`}
//                       className="inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-md"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* LEFT summary (bars panel) */}
//         <div className="col-span-1">
//           <div className="w-full mt-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-2">{pack?.heading || "Employee Review"}</h3>

//             {!pack || pack.total === 0 ? (
//               <div className="text-sm text-gray-500">No reviews yet for this book.</div>
//             ) : (
//               <div className="space-y-4">
//                 <div>
//                   <div className="text-lg font-semibold">
//                     {pack.overall.toFixed(1)}{" "}
//                     <span className="text-gray-500 text-base">out of 5</span>
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     {pack.total.toLocaleString()} global ratings
//                   </div>

//                   <div className="mt-4 space-y-1">
//                     {[5, 4, 3, 2, 1].map((star) => (
//                       <div key={star} className="flex items-center gap-3">
//                         <span className="w-10 text-sm">{star} star</span>
//                         <div className="flex-1 h-2 bg-gray-200 rounded">
//                           <div
//                             className="h-2 bg-orange-500 rounded"
//                             style={{ width: `${pack.breakdown[star] || 0}%` }}
//                           />
//                         </div>
//                         <span className="w-10 text-right text-sm text-gray-600">
//                           {(pack.breakdown[star] || 0)}%
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="pt-4">
//                   <div className="text-sm text-gray-700 mb-2">
//                     Share your thoughts with other customers
//                   </div>
//                   <button className="w-full rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
//                     Write an employee review
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT reviews (images + list) — YOUR DESIGN, with JSX fixes */}
//         <div className="col-span-2">
//           <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-3">
//               {pack?.heading || "Employee Review"}
//             </h3>

//             {!pack || pack.total === 0 ? (
//               <div className="text-sm text-gray-500">No reviews yet for this book.</div>
//             ) : (
//               <>
//                 {pack.images?.length > 0 && (
//                   <div className="mb-6">
//                     <div className="flex items-center justify-between mb-2">
//                       <h4 className="text-base font-semibold">Reviews with images</h4>
//                       <button className="text-sm text-sky-600 hover:underline">See all photos</button>
//                     </div>
//                     <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 pr-1">
//                       {pack.images.map((src, idx) => (
//                         <img
//                           key={idx}
//                           src={src}
//                           alt={`review-${idx}`}
//                           className="h-24 w-24 object-cover rounded-md flex-shrink-0"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="space-y-6">
//                   {pack.reviews.map((r) => (
//                     <article key={r.id} className="border-b pb-6">
//                       <div className="flex items-center gap-2">
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`w-4 h-4 ${
//                                 i < r.stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                         <h5 className="font-semibold text-gray-900">{r.title}</h5>
//                       </div>

//                       <div className="text-xs text-gray-500 mt-1">
//                         {r.name} — Reviewed in the {r.country} on {r.date}
//                         {r.verified && <span className="ml-1 text-green-600">• Verified Purchase</span>}
//                       </div>

//                       <p className="text-sm text-gray-700 mt-3 leading-relaxed">{r.body}</p>

//                       <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
//                         <button className="rounded-full border px-3 py-1 hover:bg-gray-50">Helpful</button>
//                         <button className="rounded-full border px-3 py-1 hover:bg-gray-50">Report</button>
//                         <span className="text-gray-500">{r.helpful} people found this helpful</span>
//                       </div>
//                     </article>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import {
  Star,
  PlayCircle,
  PauseCircle,
  Download,
  X,
  CheckCircle2,
  ChevronDown,
  Check,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

/** Demo reviews DB (unchanged) */
const REVIEWS_DB = {
  "5": {
    heading: "Employee Review",
    overall: 4.7,
    total: 2713,
    breakdown: { 5: 82, 4: 12, 3: 4, 2: 1, 1: 1 },
    images: [
      "https://images.unsplash.com/photo-1544937950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
    ],
    reviews: [
      { id: "r1", name: "Humayun Kabir", title: "An absolute masterpiece even in 2025", stars: 5, country: "Bangladesh", date: "July 2, 2025", verified: true, body: "Moves you from low-level to high-level architectural thinking. Evergreen patterns and trade-offs. Senior engineers loved it.", helpful: 56 },
      { id: "r2", name: "Lubaba Jahan", title: "Must Read", stars: 5, country: "Bangladesh", date: "May 26, 2025", verified: false, body: "Seminal work. Not a quick read, but worth the effort. Clear patterns and timeless insights.", helpful: 14 },
      { id: "r3", name: "Rashedul Zaman", title: "Great print, good quality cover", stars: 4, country: "Bangladesh", date: "April 22, 2025", verified: true, body: "Well packaged, arrived flat. Solid examples and commentary.", helpful: 9 },
      { id: "r4", name: "Tasmania Rosa .", title: "Practical patterns", stars: 5, country: "Bangladesh", date: "March 02, 2025", verified: true, body: "Explains trade-offs clearly. Helped our team refactor services.", helpful: 11 },
      { id: "r5", name: "Shuvo Rahman", title: "Dense but rewarding", stars: 4, country: "Bangladesh", date: "Feb 18, 2025", verified: false, body: "Take it slow. Examples are timeless.", helpful: 7 },
      { id: "r6", name: "Maruf Islam", title: "Go-to reference", stars: 5, country: "Bangladesh", date: "January 11, 2025", verified: true, body: "Keep it on my desk. Patterns map to modern stacks easily.", helpful: 18 },
      { id: "r7", name: "Sazal Uddin.", title: "Bridges theory and practice", stars: 5, country: "Bangladesh", date: "Nov 3, 2024", verified: true, body: "Rare book that improves code quality quickly.", helpful: 6 },
      { id: "r8", name: "Naimur Hasan", title: "A classic", stars: 5, country: "Bangladesh", date: "Sep 1, 2024", verified: false, body: "Still relevant, even with new frameworks.", helpful: 4 },
    ],
  },
  "2": {
    heading: "Employee Review",
    overall: 4.9,
    total: 1045,
    breakdown: { 5: 88, 4: 9, 3: 2, 2: 1, 1: 0 },
    images: [],
    reviews: [
      { id: "r9", name: "Nadia Zahan.", title: "Clear cloud strategy playbook", stars: 5, country: "Bangladesh", date: "May 10, 2024", verified: true, body: "Vendor-neutral frameworks. Helped us choose a service model and avoid re-architecture.", helpful: 22 },
      { id: "r10", name: "Vitul Shohan", title: "Strong patterns", stars: 4, country: "Bangladesh", date: "Aug 8, 2024", verified: false, body: "Good balance of business & tech requirements.", helpful: 5 },
      { id: "r11", name: "Purification Meril", title: "Great case studies", stars: 5, country: "Bangladesh", date: "Jan 20, 2025", verified: true, body: "Real migrations and pitfalls. Very useful.", helpful: 9 },
    ],
  },
  "1": {
    heading: "Employee Review",
    overall: 4.0,
    total: 1,
    breakdown: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
    images: [],
    reviews: [
      { id: "r12", name: "Alisha Rahman", title: "Inspiring for founders", stars: 5, country: "Bangladesh", date: "March 5, 2023", verified: true, body: "Concise, motivating, and practical.", helpful: 3 },
    ],
  },
};

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [bookData, setBookData] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [stats, setStats] = useState({ available: 0, upcoming: 0, unavailable: 0 });

  // Spec & Summary state
  const [pdTab, setPdTab] = useState("summary");
  const [pdExpanded, setPdExpanded] = useState(false);
  const specRef = useRef(null);

  // Author follow modal/state
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [authorFollowers, setAuthorFollowers] = useState(0);
  const [rolePicked, setRolePicked] = useState("");

  // “Want to read” dropdown + toast
  const [showReadBox, setShowReadBox] = useState(false);
  const [readStatus, setReadStatus] = useState("");
  const [toast, setToast] = useState({ open: false, msg: "" });
  const readBoxRef = useRef(null);

  // EXPANDED review items
  const [expanded, setExpanded] = useState({}); // {id: boolean}

  // Helpful/Not Helpful votes
  const [votes, setVotes] = useState({}); // {id: {up, down, my}}
  const [bump, setBump] = useState({}); // {id: {up:boolean, down:boolean}}

  // NEW: Professional popup for helpful/unhelpful
  const [feedbackToast, setFeedbackToast] = useState({
    open: false,
    type: "", // 'up' | 'down' | 'clear'
    msg: "",
  });

  // ====== NEW: Audio player state & refs ======
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [curTime, setCurTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ---------- utils ----------
  const splitSentences = (txt = "") =>
    (txt || "")
      .replace(/\n+/g, " ")
      .trim()
      .split(/(?<=[.!?\u0964\u0965])\s+/)
      .filter(Boolean);

  const makeIntroTail = (txt = "", introCount = 6, tailCount = 4) => {
    const parts = splitSentences(txt);
    if (!parts.length) return { intro: "", tail: "" };
    const intro = parts.slice(0, introCount).join(" ");
    const tail = parts.slice(Math.max(parts.length - tailCount, 0)).join(" ");
    return { intro, tail };
  };

  // Accept many possible audio key names so you don't have to rename fields
  const pickAudio = (b) =>
    b?.audio || b?.audioSrc || b?.audioLink || b?.audio_clip || b?.audioURL || null;

  const normalize = (b) =>
    !b
      ? null
      : {
          id: b.id,
          title: b.title,
          authors: b.authors || b.author || "Unknown",
          coverImage: b.coverImage || b.image,
          rating: b.rating ?? 0,
          ratingCount: b.ratingCount ?? 0,
          publisher: b.publisher ?? "—",
          publishDate: b.publishDate ?? "",
          category: b.category ?? "General",
          pdfLink: b.pdfLink ?? "#",
          status: b.status,
          image: b.image,
          summary: b.longSummary || b.summary || b.description || "",
          summaryIntro: b.summaryIntro || b.summary_intro || null,
          summaryTail: b.summaryTail || b.summary_tail || null,
          authorPhoto:
            b.authorPhoto ||
            b.author_image ||
            b.authorImage ||
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=240&h=240&fit=crop",
          authorFollowers: Number(b.authorFollowers || b.followers || 16),
          authorBio: b.authorBio || b.author_bio || b.authorStory || "",
          // NEW: audio source
          audioSrc: pickAudio(b),
        };

  const bucket = (s) => {
    const v = String(s || "Available").toLowerCase();
    if (v.includes("upcoming") || v.includes("coming")) return "upcoming";
    if (v.includes("out") || v.includes("not available") || v.includes("stock"))
      return "unavailable";
    return "available";
  };

  useEffect(() => {
    const sliderBook = location.state?.fromSlider;

    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((b) => String(b.id) === String(id));
        const active =
          found ||
          (sliderBook && String(sliderBook.id) === String(id) ? sliderBook : null);

        if (active) {
          const n = normalize(active);
          setBookData(n);
          setAuthorFollowers(n.authorFollowers);
        }

        const others = (data || [])
          .filter((b) => String(b.id) !== String(id))
          .slice(0, 3)
          .map(normalize)
          .filter(Boolean);
        setRelatedBooks(others);

        const targetCategory = (active?.category ?? "General").toLowerCase();
        const totals = (data || []).reduce(
          (acc, b) => {
            if ((b.category ?? "General").toLowerCase() !== targetCategory) return acc;
            acc[bucket(b.status)] += 1;
            return acc;
          },
          { available: 0, upcoming: 0, unavailable: 0 }
        );
        setStats(totals);
      })
      .catch(() => {});
  }, [id, location.state]);

  // init votes when book changes (from your DB)
  useEffect(() => {
    if (!bookData?.id) return;
    const p = REVIEWS_DB[String(bookData.id)];
    if (p?.reviews) {
      const next = {};
      p.reviews.forEach((r) => {
        next[r.id] = { up: r.helpful || 0, down: 0, my: null };
      });
      setVotes(next);
      setExpanded({});
    } else {
      setVotes({});
      setExpanded({});
    }
  }, [bookData?.id]);

  // close the read box when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showReadBox && readBoxRef.current && !readBoxRef.current.contains(e.target)) {
        setShowReadBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showReadBox]);

  // ====== NEW: Audio DOM event listeners ======
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onLoaded = () => {
      setDuration(el.duration || 0);
    };
    const onTime = () => {
      setCurTime(el.currentTime || 0);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCurTime(0);
    };

    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);

    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
    };
  }, [bookData?.audioSrc]);

  // ====== NEW: Reset when audio src changes ======
  useEffect(() => {
    setIsPlaying(false);
    setCurTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = bookData?.audioSrc || "";
      if (bookData?.audioSrc) audioRef.current.load(); // eager metadata
    }
  }, [bookData?.audioSrc]);

  // ====== NEW: Safer toggle ======
  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el || !bookData?.audioSrc) return;

    // ensure current src is correct absolute URL
    const want = new URL(bookData.audioSrc, window.location.href).href;
    if (el.src !== want) {
      el.src = bookData.audioSrc;
    }

    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      if (Number.isNaN(el.duration) || !el.duration) {
        el.load();
      }
      el.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play() failed:", err?.message || err);
          setIsPlaying(false);
        });
    }
  };

  const format = (sec = 0) => {
    if (!isFinite(sec)) return "0:00";
    const s = Math.floor(sec % 60);
    const m = Math.floor(sec / 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const progress = duration ? Math.min(1, Math.max(0, curTime / duration)) : 0;

  const onSeekClick = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * duration;
    setCurTime(pct * duration);
  };

  const onSeekKeyDown = (e) => {
    if (!audioRef.current) return;
    if (e.key === "ArrowRight") {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 5);
    } else if (e.key === "ArrowLeft") {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < (rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
      />
    ));

  const renderStarsLarge = (val) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.round(val || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
      />
    ));

  if (!bookData) {
    return (
      <div className="text-center text-gray-600 py-20">
        Loading book details...
      </div>
    );
  }

  const pack = REVIEWS_DB[String(bookData.id)] || null;
  const localReviewCount = pack?.reviews?.length ?? 0;
  const ratingCountDisplay = pack ? localReviewCount : 0;
  const reviewsTextDisplay = pack
    ? localReviewCount > 0
      ? `${localReviewCount} Reviews`
      : "No Reviews"
    : "No Reviews";

  // compute per-book preview blocks
  const baseSummary = bookData.summary || "No summary available.";
  const introTail = makeIntroTail(baseSummary);
  const summaryIntro = bookData.summaryIntro ?? introTail.intro;
  const summaryTail = bookData.summaryTail ?? introTail.tail;

  // helpers for the shelf options
  const shelfOptions = [
    { key: "want", label: "Want to read" },
    { key: "current", label: "Currently reading" },
    { key: "read", label: "Read" },
  ];
  const onPickShelf = (opt) => {
    setReadStatus(opt.key);
    setShowReadBox(false);
    setToast({ open: true, msg: `Successfully added: ${opt.label}` });
    setTimeout(() => setToast({ open: false, msg: "" }), 1400);
  };

  const countFor = (stars) =>
    Math.round(((pack?.total || 0) * ((pack?.breakdown?.[stars] || 0) / 100)));

  const vote = (id, dir) => {
    const cur = votes[id] || { up: 0, down: 0, my: null };
    let { up, down, my } = cur;

    if (dir === "up") {
      if (my === "up") {
        up -= 1;
        my = null;
      } else {
        if (my === "down") down -= 1;
        up += 1;
        my = "up";
      }
    } else {
      if (my === "down") {
        down -= 1;
        my = null;
      } else {
        if (my === "up") up -= 1;
        down += 1;
        my = "down";
      }
    }

    const next = { up: Math.max(0, up), down: Math.max(0, down), my };
    setVotes((prev) => ({ ...prev, [id]: next }));

    setBump((p) => ({ ...p, [id]: { ...(p[id] || {}), [dir]: true } }));
    setTimeout(() => {
      setBump((p) => ({ ...p, [id]: { ...(p[id] || {}), [dir]: false } }));
    }, 220);

    const type = my === "up" ? "up" : my === "down" ? "down" : "clear";
    const msg =
      type === "up"
        ? "Marked as Helpful"
        : type === "down"
        ? "Marked as Not Helpful"
        : "Feedback removed";

    setFeedbackToast({ open: true, type, msg });
    clearTimeout(vote._t);
    vote._t = setTimeout(() => setFeedbackToast({ open: false, type: "", msg: "" }), 1700);
  };

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      {/* Page grid */}
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
        {/* LEFT COLUMN (cover) */}
        <div className="lg:col-span-1 flex flex-col items-center">
          <div className="w-[340px] max-w-full border border-gray-300 rounded-md p-4 bg-white">
            <img
              src={bookData.coverImage}
              alt={bookData.title}
              className="w-full h-[460px] object-contain"
            />
          </div>

          {/* Want to read control (kept commented exactly as you had) */}
          {/* <div className="mt-3 w-[340px] max-w-full" ref={readBoxRef}> ... </div> */}
        </div>

        {/* RIGHT COLUMN (book info) */}
        <div className="lg:col-span-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{bookData.title}</h1>
          <p className="text-gray-600 mt-1 text-base">
            by <span className="text-sky-600 font-medium">{bookData.authors}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {bookData.publisher}, {bookData.publishDate} —{" "}
            <Link
              to="/all-genres"
              state={{ filter: { type: "category", value: bookData.category } }}
              className="text-sky-600 hover:underline"
            >
              {bookData.category}
            </Link>
          </p>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {renderStars(bookData.rating)}
            <span className="text-sm text-gray-600 font-semibold">{ratingCountDisplay} Ratings</span>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-500">{reviewsTextDisplay}</span>
          </div>

          {/* Short summary teaser */}
          <div className="mt-6">
            <h3 className="font-bold text-gray-800">Summary of the Book</h3>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
              {baseSummary.split(".")[0] + (baseSummary ? "..." : "")}
              {baseSummary.split(".").length > 1 && (
                <button
                  onClick={() => {
                    setPdTab("summary");
                    setPdExpanded(false);
                    specRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="ml-2 font-semibold hover:underline text-sky-600"
                >
                  Read More
                </button>
              )}
            </p>
          </div>

          {/* Availability + Audio + PDF */}
          <div className="mt-6">
            <span className="text-green-600 font-medium text-sm inline-flex items-center">
              <span className="h-3 w-3 bg-green-500 rounded-full animate-ping mr-2"></span>
              Available
            </span>

            {/* ======= UPDATED AUDIO ROW ======= */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleAudio}
                disabled={!bookData.audioSrc}
                className={`flex items-center gap-2 text-sm ${
                  bookData.audioSrc
                    ? "text-gray-700 hover:text-sky-600"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
              >
                {isPlaying ? (
                  <PauseCircle className="w-5 h-5" />
                ) : (
                  <PlayCircle className="w-5 h-5" />
                )}
                <span>Audio Clip</span>
              </button>

              {/* Progress bar (click/seek) */}
              <div
                className="w-40 sm:w-56 h-1 bg-gray-200 rounded-full mx-2 sm:mx-3 relative cursor-pointer select-none"
                onClick={onSeekClick}
                onKeyDown={onSeekKeyDown}
                role="slider"
                tabIndex={0}
                aria-valuemin={0}
                aria-valuemax={Math.max(1, Math.floor(duration))}
                aria-valuenow={Math.floor(curTime)}
                aria-label="Seek audio"
              >
                <div
                  className="absolute left-0 top-0 h-full bg-sky-500 rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              {/* Timing */}
              <div className="text-xs text-gray-600 min-w-[84px]">
                {format(curTime)} / {format(duration)}
              </div>

              {/* Hidden audio element (keeps your layout unchanged) */}
              <audio
                ref={audioRef}
                src={bookData.audioSrc || undefined}
                preload="auto"
                crossOrigin="anonymous"
              />
              {/* ======= END AUDIO ROW ======= */}

              <a
                href={bookData.pdfLink}
                download
                className="ml-auto inline-flex items-center gap-1 text-sm text-gray-700 font-semibold border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
              >
                <Download className="w-4 h-4" />
                PDF
              </a>
            </div>

            {!bookData.audioSrc && (
              <div className="mt-2 text-xs text-gray-500">
                No audio clip provided for this book.
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                const stored = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
                const alreadyExists = stored.find((b) => b.id === bookData.id);
                if (!alreadyExists) {
                  stored.push({ ...bookData, quantity: 1 });
                  localStorage.setItem("borrowedBooks", JSON.stringify(stored));
                }
                navigate("/fill-up-form");
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-md w-full sm:w-auto block text-center"
            >
              Borrowed
            </button>
          </div>
        </div>

        {/* ============== SPECIFICATION & SUMMARY ============== */}
        <div ref={specRef} className="lg:col-span-2">
          <div className="mt-10 rounded-lg border border-gray-300 overflow-hidden bg-white">
            <div className="px-4 py-3">
              <h3 className="text-lg font-bold text-gray-800">Specification &amp; Summary</h3>
            </div>

            <div className="border-t border-gray-300">
              <div className="px-4 pt-3">
                <div className="flex items-center gap-2">
                  {["summary", "spec", "author"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPdTab(t)}
                      className={`px-3 py-1.5 text-sm rounded-md border ${
                        pdTab === t
                          ? "bg-green-100 border-green-300 text-green-700"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {t === "summary" ? "Summary" : t === "spec" ? "Specification" : "Author"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                {pdTab === "summary" && (
                  <>
                    {!pdExpanded ? (
                      <>
                        <div className="text-gray-800 text-[15px] leading-7 space-y-4">
                          <div className="relative">
                            <p className="line-clamp-3">{summaryIntro}</p>
                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
                          </div>

                          <div className="border-t border-gray-300" />

                          <p className="italic text-gray-700">{summaryTail}</p>
                        </div>

                        <div className="mt-4 flex justify-center">
                          <button
                            onClick={() => setPdExpanded(true)}
                            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50"
                          >
                            Show More
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-gray-800 text-[15px] leading-7 whitespace-pre-line">
                          {baseSummary}
                        </div>
                        <div className="mt-4 flex justify-center">
                          <button
                            onClick={() => setPdExpanded(false)}
                            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50"
                          >
                            Show Less
                          </button>
                        </div>
                      </>
                    )}

                    <div className="mt-4 border-t border-b border-gray-300 py-3">
                      <div className="text-center">
                        <button className="inline-flex items-center gap-2 text-red-500 hover:text-sky-600 text-sm">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-current">
                            <span className="text-[10px] font-bold">i</span>
                          </span>
                          Report incorrect information
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {pdTab === "spec" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-500">Title</span>
                      <div className="font-medium text-gray-800">{bookData.title}</div>
                    </div>
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-500">Author</span>
                      <div className="font-medium text-gray-800">{bookData.authors}</div>
                    </div>
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-500">Category</span>
                      <div className="font-medium text-gray-800">{bookData.category}</div>
                    </div>
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-500">Publisher</span>
                      <div className="font-medium text-gray-800">{bookData.publisher}</div>
                    </div>
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-500">Publish Date</span>
                      <div className="font-medium text-gray-800">{bookData.publishDate || "—"}</div>
                    </div>
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-500">Rating</span>
                      <div className="font-medium text-gray-800">
                        {(bookData.rating || 0).toFixed ? bookData.rating.toFixed(1) : bookData.rating}
                      </div>
                    </div>
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-500">Status</span>
                      <div className="font-medium text-gray-800">{bookData.status || "Available"}</div>
                    </div>
                  </div>
                )}

                {pdTab === "author" && (
                  <div className="flex items-start gap-5">
                    <div className="w-36 shrink-0 text-center">
                      <img
                        src={bookData.authorPhoto}
                        alt={bookData.authors}
                        className="w-24 h-24 rounded-full object-cover border mx-auto"
                      />
                      <div className="mt-2 text-xs text-gray-600">{authorFollowers} followers</div>
                      <button
                        onClick={() => setShowFollowModal(true)}
                        className={`mt-2 w-24 text-sm font-semibold rounded-full px-3 py-1.5 transition ${
                          isFollowing ? "bg-gray-200 text-gray-700 cursor-default" : "bg-sky-500 text-white hover:bg-sky-600"
                        }`}
                        disabled={isFollowing}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{bookData.authors}</h4>
                      <p className="mt-2 text-[15px] leading-7 text-gray-800 whitespace-pre-line">
                        {bookData.authorBio || "No additional author story provided."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== REVIEWS & RATINGS ===== */}
        <div className="lg:col-span-2 mt-10">
          <h3 className="text-2xl font-semibold text-gray-900">Reviews and Ratings</h3>
        </div>

        {/* LEFT SIDE: rate + reviews list */}
        <div className="lg:col-span-1">
          <div className="">
            <div className="text-sm text-gray-700 font-semibold">Rate this product</div>
            <div className="mt-2 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-gray-300" />
              ))}
            </div>
            <button className="mt-3 inline-flex items-center border border-gray-300 text-sky-600 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-sky-50">
              Review Write
            </button>
          </div>

          {!pack || pack.total === 0 ? (
            <div className="text-sm text-gray-500 mt-6">No reviews yet for this book.</div>
          ) : (
            <div className="space-y-6 mt-20">
              {pack.reviews.map((r) => {
                const isLong = (r.body || "").length > 220;
                const open = !!expanded[r.id];
                const body = !isLong || open ? r.body : r.body.slice(0, 220) + "…";
                const firstLetter = r.name?.trim()?.[0]?.toUpperCase() || "?";
                const v = votes[r.id] || { up: r.helpful || 0, down: 0, my: null };
                return (
                  <article key={r.id} className="border-b border-gray-300 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                        {firstLetter}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-semibold text-gray-900">{r.name}</span>
                          <span className="text-gray-500">, {r.date}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < r.stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          {r.verified && (
                            <span className="text-xs text-green-600 border border-green-300 rounded-full px-2 py-0.5">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <h5 className="mt-3 font-semibold text-gray-900">{r.title}</h5>

                    <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                      {body}{" "}
                      {isLong && (
                        <button
                          onClick={() => setExpanded((s) => ({ ...s, [r.id]: !open }))}
                          className="text-sky-600 font-medium hover:underline"
                        >
                          {open ? "Read less" : "Read More"}
                        </button>
                      )}
                    </p>

                    <div className="mt-3 text-xs text-gray-500">Was this review helpful to you?</div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                      <button
                        onClick={() => vote(r.id, "up")}
                        className={`inline-flex items-center gap-1 rounded border px-3 py-1 transition
                          ${v.my === "up" ? "border-green-500 text-green-700 bg-green-50" : "border-gray-300"}
                          ${bump[r.id]?.up ? "animate-[popVote_.2s_ease-out]" : ""}`}
                      >
                        <ThumbsUp className="w-4 h-4" /> Helpful ({v.up})
                      </button>
                      <button
                        onClick={() => vote(r.id, "down")}
                        className={`inline-flex items-center gap-1 rounded border px-3 py-1 transition
                          ${v.my === "down" ? "border-rose-500 text-rose-700 bg-rose-50" : "border-gray-300"}
                          ${bump[r.id]?.down ? "animate-[popVote_.2s_ease-out]" : ""}`}
                      >
                        <ThumbsDown className="w-4 h-4" /> Not Helpful ({v.down})
                      </button>
                      <span className="ml-2 text-gray-500">
                        {r.helpful} people found this helpful
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Average + bars + sort */}
        <div className="lg:col-span-1">
          {!pack || pack.total === 0 ? null : (
            <div className="mt-4 flex items-start gap-8">
              <div>
                <div className="text-3xl font-semibold">{(pack.overall ?? 0).toFixed(2)}</div>
                <div className="mt-1 flex">{renderStarsLarge(pack.overall ?? 0)}</div>
                <div className="mt-1 text-xs text-gray-600">
                  {pack.total.toLocaleString()} Ratings and {localReviewCount} Reviews
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-1">
                  {[5, 4, 3, 2, 1].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <div className="w-14 text-sm flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < s ? "text-orange-400 fill-orange-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-orange-400 rounded"
                          style={{ width: `${pack.breakdown[s] || 0}%` }}
                        />
                      </div>
                      <div className="w-10 text-right text-sm text-gray-700">{countFor(s)}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <select className="border border-gray-300 text-sm rounded-md px-3 py-1.5 text-gray-700">
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Top rated</option>
                  <option>Lowest rated</option>
                </select>
              </div>
            </div>
          )}

          {pack?.images?.length > 0 && (
            <div className="mb-6 mt-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-semibold">Reviews with images</h4>
                <button className="text-sm text-sky-600 hover:underline">See all photos</button>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 pr-1">
                {pack.images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`review-${idx}`}
                    className="h-24 w-24 object-cover rounded-md flex-shrink-0 border border-gray-300"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ==== RELATED BOOKS ==== */}
        <div className="lg:col-span-2">
          <div className="mt-10 rounded-lg border border-gray-300 overflow-hidden bg-white">
            <div className="px-4 py-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Related Books</h3>
            </div>

            <div className="border-t border-gray-300">
              <div className="p-3 sm:p-4">
                <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                  {relatedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden w-full"
                    >
                      <img
                        src={book.coverImage || book.image}
                        alt={book.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="border-t border-gray-300 p-4">
                        <h4 className="font-semibold text-sm text-gray-800 line-clamp-2">
                          {book.title}
                        </h4>
                        <p className="text-xs text-gray-600">{book.authors || book.author}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < (book.rating ?? 0)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p
                          className={`text-xs font-medium mt-1 ${
                            (book.status || "").toLowerCase().includes("out")
                              ? "text-red-500"
                              : "text-green-600"
                          }`}
                        >
                          {book.status || "Available"}
                        </p>

                        <div className="mt-3">
                          <Link
                            to={`/book/${book.id}`}
                            className="inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  {relatedBooks.length === 0 && (
                    <div className="text-sm text-gray-500">No related books.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Follow modal (animated) ===== */}
      {showFollowModal && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-100"
            onClick={() => setShowFollowModal(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-300 p-5 animate-[pop_220ms_ease-out]">
              <div className="flex items-start justify-between">
                <h4 className="text-lg font-semibold">Follow Author</h4>
                <button
                  className="p-2 hover:bg-gray-100 rounded"
                  onClick={() => setShowFollowModal(false)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <img
                  src={bookData.authorPhoto}
                  alt={bookData.authors}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <div className="font-medium text-gray-900">{bookData.authors}</div>
                  <div className="text-xs text-gray-500">{authorFollowers} followers</div>
                </div>
              </div>

              {!rolePicked ? (
                <>
                  <p className="mt-4 text-sm text-gray-700">
                    Choose how you want to follow this author.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setRolePicked("Client")}
                      className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold hover:border-sky-400 hover:bg-sky-50 transition"
                    >
                      Follow as Client
                    </button>
                    <button
                      onClick={() => setRolePicked("Employee")}
                      className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold hover:border-sky-400 hover:bg-sky-50 transition"
                    >
                      Follow as Employee
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-6 flex flex-col items-center text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500 animate-bounce" />
                  <div className="mt-2 font-semibold">Following as {rolePicked}</div>
                  <div className="text-sm text-gray-600">
                    You'll see updates from this author.
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-2">
                {!rolePicked ? (
                  <button
                    onClick={() => setShowFollowModal(false)}
                    className="px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (!isFollowing) {
                        setIsFollowing(true);
                        setAuthorFollowers((c) => c + 1);
                      }
                      setTimeout(() => {
                        setShowFollowModal(false);
                        setRolePicked("");
                      }, 1100);
                    }}
                    className="px-4 py-2 rounded-md bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast for shelf add */}
      {toast.open && (
        <div className="fixed left-1/2 bottom-8 -translate-x-1/2 z-[60] bg-green-600 text-white px-4 py-2 rounded-md shadow-lg animate-[toastPop_.22s_ease-out]">
          {toast.msg}
        </div>
      )}

      {/* NEW: Helpful / Unhelpful popup */}
      {feedbackToast.open && (
        <div className="fixed bottom-8 right-6 z-[70] animate-[slideIn_.22s_ease-out]">
          <div className="bg-white border border-gray-300 shadow-xl rounded-lg p-3 w-[290px]">
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full
                ${feedbackToast.type === "up" ? "bg-green-50 text-green-600" : feedbackToast.type === "down" ? "bg-rose-50 text-rose-600" : "bg-gray-50 text-gray-500"}`}
              >
                {feedbackToast.type === "up" ? (
                  <ThumbsUp className="w-4 h-4" />
                ) : feedbackToast.type === "down" ? (
                  <ThumbsDown className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">{feedbackToast.msg}</div>
                <div className="text-xs text-gray-600">Thanks for your feedback.</div>
              </div>
              <button
                onClick={() => setFeedbackToast({ open: false, type: "", msg: "" })}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="mt-3 h-0.5 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-sky-500 origin-left animate-[bar_1.6s_linear]"></div>
            </div>
          </div>
        </div>
      )}

      {/* keyframes */}
      <style>{`
        @keyframes pop { 0% { transform: scale(.95); opacity: 0 } 100% { transform: scale(1); opacity: 1 } }
        @keyframes toastPop { 0% { transform: translate(-50%, 8px); opacity: 0 } 100% { transform: translate(-50%, 0); opacity: 1 } }
        @keyframes popVote { 0% { transform: scale(.96) } 60% { transform: scale(1.06) } 100% { transform: scale(1) } }
        @keyframes slideIn { 0% { transform: translateY(10px); opacity: 0 } 100% { transform: translateY(0); opacity: 1 } }
        @keyframes bar { 0% { transform: scaleX(1) } 100% { transform: scaleX(0) } }
      `}</style>
    </div>
  );
}



