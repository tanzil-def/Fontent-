// BookDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import {
//   Star,
//   ChevronDown,
//   Users,
//   PlayCircle,
//   Download,
// } from "lucide-react";

// export default function BookDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [bookData, setBookData] = useState(null);
//   const [relatedBooks, setRelatedBooks] = useState([]);
//   const [showFullSummary, setShowFullSummary] = useState(false);

//   useEffect(() => {
//     fetch("/books.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const found = data.find((b) => b.id === parseInt(id));
//         setBookData(found || null);
//         const others = data.filter((b) => b.id !== parseInt(id)).slice(0, 4);
//         setRelatedBooks(others);
//       });
//   }, [id]);

//   const renderStars = (rating) =>
//     [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${
//           i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
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

//   return (
//     <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
//         {/* Left Column */}
//         <div className="col-span-1 flex flex-col items-center">
//           <img
//             src={bookData.coverImage}
//             alt={bookData.title}
//             className="w-[250px] sm:w-[280px] h-auto object-cover rounded shadow-md"
//           />
//           <button className="mt-4 w-full bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-200 flex justify-between items-center">
//             WANT TO READ
//             <ChevronDown className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Book Details */}
//         <div className="col-span-2">
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             {bookData.title}
//           </h1>
//           <p className="text-gray-600 mt-1 text-base">
//             by {" "}
//             <span className="text-sky-600 font-medium">
//               {bookData.authors}
//             </span>
//           </p>
//           <p className="text-sm text-gray-500 mt-1">
//             {bookData.publisher}, {bookData.publishDate} - {" "}
//             <span className="text-sky-600">{bookData.category}</span>
//           </p>

//           <div className="flex items-center gap-2 mt-3 flex-wrap">
//             {renderStars(bookData.rating)}
//             <span className="text-sm text-gray-600 font-semibold">
//               {bookData.ratingCount} Ratings
//             </span>
//             <span className="text-gray-400">|</span>
//             <span className="text-sm text-gray-500">
//               {bookData.reviews || "No Reviews"}
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
//                 : bookData.summary?.split(".")[0] + "..."}
//               {bookData.summary?.split(".").length > 1 && (
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

//           {/* Borrowed Button */}
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

//           {/* Related Books */}
//           <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">
//               Related Books
//             </h3>
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
//                             i < book.rating
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
//       </div>
//     </div>
//   );
// }


// // BookDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
// import {
//   Star,
//   ChevronDown,
//   Users,
//   PlayCircle,
//   Download,
// } from "lucide-react";

// export default function BookDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [bookData, setBookData] = useState(null);
//   const [relatedBooks, setRelatedBooks] = useState([]);
//   const [showFullSummary, setShowFullSummary] = useState(false);

//   // Normalize any book shape into what this page expects
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

//     // Show the slider book immediately if it matches the route id
//     if (sliderBook && String(sliderBook.id) === String(id)) {
//       setBookData(normalize(sliderBook));
//     }

//     // Enrich/replace with books.json if present
//     fetch("/books.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const found = data.find((b) => String(b.id) === String(id));
//         if (found) {
//           setBookData(normalize(found));
//           const others = data
//             .filter((b) => String(b.id) !== String(id))
//             .slice(0, 4)
//             .map(normalize)
//             .filter(Boolean);
//           setRelatedBooks(others);
//         } else {
//           // keep slider data; still try to set related from list if available
//           const others = (data || [])
//             .filter((b) => String(b.id) !== String(id))
//             .slice(0, 4)
//             .map(normalize)
//             .filter(Boolean);
//           setRelatedBooks(others);
//         }
//       })
//       .catch(() => {
//         // ignore; slider book already shown if provided
//       });
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

//   return (
//     <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
//         {/* Left Column */}
//         <div className="col-span-1 flex flex-col items-center">
//           <img
//             src={bookData.coverImage}
//             alt={bookData.title}
//             className="w-[250px] sm:w-[280px] h-auto object-cover rounded shadow-md"
//           />
//           <button className="mt-4 w-full bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-200 flex justify-between items-center">
//             WANT TO READ
//             <ChevronDown className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Book Details */}
//         <div className="col-span-2">
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             {bookData.title}
//           </h1>
//           <p className="text-gray-600 mt-1 text-base">
//             by{" "}
//             <span className="text-sky-600 font-medium">
//               {bookData.authors}
//             </span>
//           </p>
//           <p className="text-sm text-gray-500 mt-1">
//             {bookData.publisher}, {bookData.publishDate} -{" "}
//             <span className="text-sky-600">{bookData.category}</span>
//           </p>

//           <div className="flex items-center gap-2 mt-3 flex-wrap">
//             {renderStars(bookData.rating)}
//             <span className="text-sm text-gray-600 font-semibold">
//               {bookData.ratingCount} Ratings
//             </span>
//             <span className="text-gray-400">|</span>
//             <span className="text-sm text-gray-500">
//               {bookData.reviews || "No Reviews"}
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
//                 : (bookData.summary || "").split(".")[0] + (bookData.summary ? "..." : "")}
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

//           {/* Borrowed Button */}
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

//           {/* Related Books */}
//           <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">
//               Related Books
//             </h3>
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
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// BookDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
// import {
//   Star,
//   ChevronDown,
//   Users,
//   PlayCircle,
//   Download,
// } from "lucide-react";

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
//           setBookData(normalize(found));
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

//   return (
//     <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
//         {/* Left Column */}
//         <div className="col-span-1 flex flex-col items-center">
//           <img
//             src={bookData.coverImage}
//             alt={bookData.title}
//             className="w-[250px] sm:w-[280px] h-auto object-cover rounded shadow-md"
//           />
//           <button className="mt-4 w-full bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-200 flex justify-between items-center">
//             WANT TO READ
//             <ChevronDown className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Book Details */}
//         <div className="col-span-2">
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             {bookData.title}
//           </h1>
//           <p className="text-gray-600 mt-1 text-base">
//             by{" "}
//             <span className="text-sky-600 font-medium">
//               {bookData.authors}
//             </span>
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
//               {bookData.ratingCount} Ratings
//             </span>
//             <span className="text-gray-400">|</span>
//             <span className="text-sm text-gray-500">
//               {bookData.reviews || "No Reviews"}
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
//                 : (bookData.summary || "").split(".")[0] + (bookData.summary ? "..." : "")}
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

//           {/* Borrowed Button */}
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

//           {/* Related Books */}
//           <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">
//               Related Books
//             </h3>
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
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
// import {
//   Star,
//   ChevronDown,
//   Users,
//   PlayCircle,
//   Download,
// } from "lucide-react";

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

//     // If navigated from NewBookCollections and ID matches, show it immediately
//     if (sliderBook && String(sliderBook.id) === String(id)) {
//       setBookData(normalize(sliderBook));
//     }

//     // Load from books.json, but DO NOT overwrite slider book if present for same id
//     fetch("/books.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const found = data.find((b) => String(b.id) === String(id));
//         if (found) {
//           // Only replace if we did NOT come from slider for this id
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
//           // No exact match in books.json; keep slider data if any, but still try to show related
//           const others = (data || [])
//             .filter((b) => String(b.id) !== String(id))
//             .slice(0, 4)
//             .map(normalize)
//             .filter(Boolean);
//           setRelatedBooks(others);
//         }
//       })
//       .catch(() => {
//         // ignore network error; slider data (if any) is already shown
//       });
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

//   return (
//     <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
//         {/* Left Column */}
//         <div className="col-span-1 flex flex-col items-center">
//           <img
//             src={bookData.coverImage}
//             alt={bookData.title}
//             className="w-[250px] sm:w-[280px] h-auto object-cover rounded shadow-md"
//           />
//           <button className="mt-4 w-full bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-200 flex justify-between items-center">
//             WANT TO READ
//             <ChevronDown className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Book Details */}
//         <div className="col-span-2">
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             {bookData.title}
//           </h1>
//           <p className="text-gray-600 mt-1 text-base">
//             by{" "}
//             <span className="text-sky-600 font-medium">
//               {bookData.authors}
//             </span>
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
//               {bookData.ratingCount} Ratings
//             </span>
//             <span className="text-gray-400">|</span>
//             <span className="text-sm text-gray-500">
//               {bookData.reviews || "No Reviews"}
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
//                 : (bookData.summary || "").split(".")[0] + (bookData.summary ? "..." : "")}
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

//           {/* Borrowed Button */}
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

//           {/* Related Books */}
//           <div className="mt-10">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">
//               Related Books
//             </h3>
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
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
//       { id: "r1", name: "Iatrophus Lauroti", title: "An absolute masterpiece even in 2025", stars: 5, country: "United States", date: "September 2, 2025", verified: true, body: "Moves you from low‑level to high‑level architectural thinking. Evergreen patterns and trade‑offs. Senior engineers loved it.", helpful: 56 },
//       { id: "r2", name: "Subhrosha", title: "Must Read", stars: 5, country: "United States", date: "January 26, 2017", verified: false, body: "Seminal work. Not a quick read, but worth the effort. Clear patterns and timeless insights.", helpful: 14 },
//       { id: "r3", name: "Marcus", title: "Great print, good quality cover", stars: 4, country: "Netherlands", date: "April 22, 2025", verified: true, body: "Well packaged, arrived flat. Solid examples and commentary.", helpful: 9 },
//       { id: "r4", name: "Sofia T.", title: "Practical patterns", stars: 5, country: "Canada", date: "June 02, 2025", verified: true, body: "Explains trade‑offs clearly. Helped our team refactor services.", helpful: 11 },
//       { id: "r5", name: "Hiro", title: "Dense but rewarding", stars: 4, country: "Japan", date: "May 18, 2025", verified: false, body: "Take it slow. Examples are timeless.", helpful: 7 },
//       { id: "r6", name: "Ana", title: "Go‑to reference", stars: 5, country: "Brazil", date: "March 11, 2025", verified: true, body: "Keep it on my desk. Patterns map to modern stacks easily.", helpful: 18 },
//       { id: "r7", name: "Sam P.", title: "Bridges theory and practice", stars: 5, country: "UK", date: "July 3, 2025", verified: true, body: "Rare book that improves code quality quickly.", helpful: 6 },
//       { id: "r8", name: "Nilesh", title: "A classic", stars: 5, country: "India", date: "February 1, 2025", verified: false, body: "Still relevant, even with new frameworks.", helpful: 4 },
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
//       { id: "r9", name: "Nadia Z.", title: "Clear cloud strategy playbook", stars: 5, country: "Canada", date: "May 10, 2024", verified: true, body: "Vendor‑neutral frameworks. Helped us choose a service model and avoid re‑architecture.", helpful: 22 },
//       { id: "r10", name: "Victor", title: "Strong patterns", stars: 4, country: "United States", date: "Aug 8, 2024", verified: false, body: "Good balance of business & tech requirements.", helpful: 5 },
//       { id: "r11", name: "Mei", title: "Great case studies", stars: 5, country: "Singapore", date: "Jan 20, 2025", verified: true, body: "Real migrations and pitfalls. Very useful.", helpful: 9 },
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
//       { id: "r12", name: "Alisha", title: "Inspiring for founders", stars: 5, country: "United States", date: "March 5, 2023", verified: true, body: "Concise, motivating, and practical.", helpful: 3 },
//     ],
//   },
//   // No reviews (leave some ids absent on purpose): e.g., "8", "11"
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
//           <button className="mt-4 w-full bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-200 flex justify-between items-center">
//             WANT TO READ
//             <ChevronDown className="w-4 h-4" />
//           </button>

//           {/* Employee Review summary panel (LEFT SIDE) */}
//           {/* <div className="w-full mt-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-2">
//               {pack?.heading || "Employee Review"}
//             </h3>

//             {!pack || pack.total === 0 ? (
//               <div className="text-sm text-gray-500">
//                 No reviews yet for this book.
//               </div>
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

//                 <div className="pt-4 border-t">
//                   <div className="text-sm text-gray-700 mb-2">
//                     Share your thoughts with other customers
//                   </div>
//                   <button className="w-full rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
//                     Write an employee review
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div> */}
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="col-span-2">
//           {/* Book core details */}
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             {bookData.title}
//           </h1>
//           <p className="text-gray-600 mt-1 text-base">
//             by{" "}
//             <span className="text-sky-600 font-medium">
//               {bookData.authors}
//             </span>
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
//               {bookData.ratingCount} Ratings
//             </span>
//             <span className="text-gray-400">|</span>
//             <span className="text-sm text-gray-500">
//               {bookData.reviews || "No Reviews"}
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

//           {/* Related Books (unchanged) */}
//           <div className="mt-10">
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
//           </div>
//           {/* ===== end related ===== */}

//           {/* ===== Reviews with images + Top reviews (RIGHT SIDE, above Related) ===== */}
//           <div className="mt-10">
//              {/* Employee Review summary panel (LEFT SIDE) */}
//           <div className="w-full mt-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-2">
//               {pack?.heading || "Employee Review"}
//             </h3>

//             {!pack || pack.total === 0 ? (
//               <div className="text-sm text-gray-500">
//                 No reviews yet for this book.
//               </div>
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

//                 <div className="pt-4 border-t">
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
//             <h3 className="text-lg font-bold text-gray-800 mb-3">
//               {pack?.heading || "Employee Review"}
//             </h3>

//             {!pack || pack.total === 0 ? (
//               <div className="text-sm text-gray-500">No reviews yet for this book.</div>
//             ) : (
//               <>
//                 {/* Reviews with images carousel-like row */}
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

//                 {/* Top reviews list */}
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
//                         <h5 className="font-semibold text-gray-900">
//                           {r.title}
//                         </h5>
//                       </div>

//                       <div className="text-xs text-gray-500 mt-1">
//                         {r.name} — Reviewed in the {r.country} on {r.date}
//                         {r.verified && (
//                           <span className="ml-1 text-green-600">• Verified Purchase</span>
//                         )}
//                       </div>

//                       <p className="text-sm text-gray-700 mt-3 leading-relaxed">
//                         {r.body}
//                       </p>

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
//       </div>
//     </div>
//   );
// }


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
//       { id: "r9", name: "Nadia Z.", title: "Clear cloud strategy playbook", stars: 5, country: "Canada", date: "May 10, 2024", verified: true, body: "Vendor‑neutral frameworks. Helped us choose a service model and avoid re‑architecture.", helpful: 22 },
//       { id: "r10", name: "Victor", title: "Strong patterns", stars: 4, country: "United States", date: "Aug 8, 2024", verified: false, body: "Good balance of business & tech requirements.", helpful: 5 },
//       { id: "r11", name: "Mei", title: "Great case studies", stars: 5, country: "Singapore", date: "Jan 20, 2025", verified: true, body: "Real migrations and pitfalls. Very useful.", helpful: 9 },
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
//       { id: "r12", name: "Alisha", title: "Inspiring for founders", stars: 5, country: "United States", date: "March 5, 2023", verified: true, body: "Concise, motivating, and practical.", helpful: 3 },
//     ],
//   },
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

//   const pack = REVIEWS_DB[String(bookData.id)] || null;

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
//           <button className="mt-4 w-full bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-200 flex justify-between items-center">
//             WANT TO READ
//             <ChevronDown className="w-4 h-4" />
//           </button>

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
//               {bookData.ratingCount} Ratings
//             </span>
//             <span className="text-gray-400">|</span>
//             <span className="text-sm text-gray-500">
//               {bookData.reviews || "No Reviews"}
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

//           {/* Related Books (unchanged) */}
//           <div className="mt-10">
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
//           </div>
//           {/* ===== end related ===== */}
//         </div>

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

//         {/* RIGHT: Reviews with images + list under the main content column */}
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
//                     <article key={r.id} className="border-b-amber-400 pb-6">
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


import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Star, ChevronDown, Users, PlayCircle, Download } from "lucide-react";

/**
 * Per‑book reviews (examples).
 * Add or edit by ID (string or number). If an ID is missing, the page will show “No reviews yet”.
 * Vary counts (8–9, 3–4, 1, or none) per your instruction.
 */
const REVIEWS_DB = {
  // Many reviews (sample)
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
      { id: "r1", name: "Humayun Kabir", title: "An absolute masterpiece even in 2025", stars: 5, country: "Bangladesh", date: "July 2, 2025", verified: true, body: "Moves you from low‑level to high‑level architectural thinking. Evergreen patterns and trade‑offs. Senior engineers loved it.", helpful: 56 },
      { id: "r2", name: "Lubaba Jahan", title: "Must Read", stars: 5, country: "Bangladesh", date: "May 26, 2025", verified: false, body: "Seminal work. Not a quick read, but worth the effort. Clear patterns and timeless insights.", helpful: 14 },
      { id: "r3", name: "Rashedul Zaman", title: "Great print, good quality cover", stars: 4, country: "Bangladesh", date: "April 22, 2025", verified: true, body: "Well packaged, arrived flat. Solid examples and commentary.", helpful: 9 },
      { id: "r4", name: "Tasmania Rosa .", title: "Practical patterns", stars: 5, country: "Bangladesh", date: "March 02, 2025", verified: true, body: "Explains trade‑offs clearly. Helped our team refactor services.", helpful: 11 },
      { id: "r5", name: "Shuvo Rahman", title: "Dense but rewarding", stars: 4, country: "Bangladesh", date: "Feb 18, 2025", verified: false, body: "Take it slow. Examples are timeless.", helpful: 7 },
      { id: "r6", name: "Maruf Islam", title: "Go‑to reference", stars: 5, country: "Bangladesh", date: "January 11, 2025", verified: true, body: "Keep it on my desk. Patterns map to modern stacks easily.", helpful: 18 },
      { id: "r7", name: "Sazal Uddin.", title: "Bridges theory and practice", stars: 5, country: "Bangladesh", date: "Nov 3, 2024", verified: true, body: "Rare book that improves code quality quickly.", helpful: 6 },
      { id: "r8", name: "Naimur Hasan", title: "A classic", stars: 5, country: "Bangladesh", date: "Sep 1, 2024", verified: false, body: "Still relevant, even with new frameworks.", helpful: 4 },
    ],
  },
  // 3–4 reviews
  "2": {
    heading: "Employee Review",
    overall: 4.9,
    total: 1045,
    breakdown: { 5: 88, 4: 9, 3: 2, 2: 1, 1: 0 },
    images: [],
    reviews: [
      { id: "r9", name: "Nadia Z.", title: "Clear cloud strategy playbook", stars: 5, country: "Canada", date: "May 10, 2024", verified: true, body: "Vendor‑neutral frameworks. Helped us choose a service model and avoid re‑architecture.", helpful: 22 },
      { id: "r10", name: "Victor", title: "Strong patterns", stars: 4, country: "United States", date: "Aug 8, 2024", verified: false, body: "Good balance of business & tech requirements.", helpful: 5 },
      { id: "r11", name: "Mei", title: "Great case studies", stars: 5, country: "Singapore", date: "Jan 20, 2025", verified: true, body: "Real migrations and pitfalls. Very useful.", helpful: 9 },
    ],
  },
  // 1 review
  "1": {
    heading: "Employee Review",
    overall: 4.0,
    total: 1,
    breakdown: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
    images: [],
    reviews: [
      { id: "r12", name: "Alisha", title: "Inspiring for founders", stars: 5, country: "United States", date: "March 5, 2023", verified: true, body: "Concise, motivating, and practical.", helpful: 3 },
    ],
  },
  // No reviews entries for other ids on purpose (e.g., "8", "11")
};

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookData, setBookData] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [showFullSummary, setShowFullSummary] = useState(false);

  const normalize = (b) => {
    if (!b) return null;
    return {
      id: b.id,
      title: b.title,
      authors: b.authors || b.author || "Unknown",
      coverImage: b.coverImage || b.image,
      rating: b.rating ?? 0,
      ratingCount: b.ratingCount ?? 0,
      reviews: b.reviews ?? null,
      publisher: b.publisher ?? "—",
      publishDate: b.publishDate ?? "",
      category: b.category ?? "General",
      summary: b.summary ?? b.description ?? "",
      pdfLink: b.pdfLink ?? "#",
      wants: b.wants ?? 0,
      status: b.status,
      image: b.image,
    };
  };

  useEffect(() => {
    const sliderBook = location.state?.fromSlider;
    if (sliderBook && String(sliderBook.id) === String(id)) {
      setBookData(normalize(sliderBook));
    }

    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((b) => String(b.id) === String(id));
        if (found) {
          if (!(sliderBook && String(sliderBook.id) === String(id))) {
            setBookData(normalize(found));
          }
          const others = data
            .filter((b) => String(b.id) !== String(id))
            .slice(0, 4)
            .map(normalize)
            .filter(Boolean);
          setRelatedBooks(others);
        } else {
          const others = (data || [])
            .filter((b) => String(b.id) !== String(id))
            .slice(0, 4)
            .map(normalize)
            .filter(Boolean);
          setRelatedBooks(others);
        }
      })
      .catch(() => {});
  }, [id, location.state]);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < (rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }`}
      />
    ));

  if (!bookData) {
    return (
      <div className="text-center text-gray-600 py-20">
        Loading book details...
      </div>
    );
  }

  // Reviews for this book (may be null/undefined)
  const pack = REVIEWS_DB[String(bookData.id)] || null;

  // === STRICT display logic: always count from REVIEWS_DB; if none => 0 | No Reviews
  const localReviewCount = pack?.reviews?.length ?? 0;
  const ratingCountDisplay = pack ? localReviewCount : 0;
  const reviewsTextDisplay = pack
    ? (localReviewCount > 0 ? `${localReviewCount} Reviews` : "No Reviews")
    : "No Reviews";
  // === END

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* LEFT COLUMN */}
        <div className="col-span-1 flex flex-col items-center">
          <img
            src={bookData.coverImage}
            alt={bookData.title}
            className="w-[250px] sm:w-[280px] h-auto object-cover rounded shadow-md"
          />
          <button className="mt-4 w-full bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-200 flex justify-between items-center">
            WANT TO READ
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Employee Review summary panel (LEFT SIDE) [kept disabled to avoid duplication above] */}
          {false && (
            <div className="w-full mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {pack?.heading || "Employee Review"}
              </h3>

              {!pack || pack.total === 0 ? (
                <div className="text-sm text-gray-500">
                  No reviews yet for this book.
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="text-lg font-semibold">
                      {pack.overall.toFixed(1)}{" "}
                      <span className="text-gray-500 text-base">out of 5</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {pack.total.toLocaleString()} global ratings
                    </div>

                    {/* Bars sections */}
                    <div className="mt-4 space-y-1">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="w-10 text-sm">{star} star</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded">
                            <div
                              className="h-2 bg-orange-500 rounded"
                              style={{ width: `${pack.breakdown[star] || 0}%` }}
                            />
                          </div>
                          <span className="w-10 text-right text-sm text-gray-600">
                            {(pack.breakdown[star] || 0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-700 mb-2">
                      Share your thoughts with other customers
                    </div>
                    <button className="w-full rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
                      Write an employee review
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-2">
          {/* Book core details */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {bookData.title}
          </h1>
          <p className="text-gray-600 mt-1 text-base">
            by{" "}
            <span className="text-sky-600 font-medium">{bookData.authors}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {bookData.publisher}, {bookData.publishDate} -{" "}
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
            <span className="text-sm text-gray-600 font-semibold">
              {ratingCountDisplay} Ratings
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-500">
              {reviewsTextDisplay}
            </span>
          </div>

          <div className="mt-2 flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {bookData.wants} users want this item!
          </div>

          {/* Summary */}
          <div className="mt-6">
            <h3 className="font-bold text-gray-800">Summary of the Book</h3>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
              {showFullSummary
                ? bookData.summary
                : (bookData.summary || "").split(".")[0] +
                  (bookData.summary ? "..." : "")}
              {(bookData.summary || "").split(".").length > 1 && (
                <button
                  onClick={() => setShowFullSummary(!showFullSummary)}
                  className={`ml-2 font-semibold hover:underline transition ${
                    showFullSummary ? "text-gray-400" : "text-sky-600"
                  }`}
                >
                  {showFullSummary ? "Read Less" : "Read More"}
                </button>
              )}
            </p>
          </div>

          {/* Availability + Audio + PDF */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-green-600 font-medium text-sm inline-flex items-center">
                <span className="h-3 w-3 bg-green-500 rounded-full animate-ping mr-2"></span>
                Available
              </span>
              <div className="flex items-center mt-3 gap-2 text-sm">
                <PlayCircle className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Audio Clip</span>
                <div className="w-32 h-1 bg-gray-200 rounded-full mx-2">
                  <div className="w-1/3 h-full bg-sky-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <a
              href={bookData.pdfLink}
              download
              className="flex items-center gap-1 text-sm text-gray-700 font-semibold border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            >
              <Download className="w-4 h-4" />
              PDF
            </a>
          </div>

          {/* Related Books (unchanged) */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Related Books</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out p-3 flex flex-col justify-between"
                >
                  <img
                    src={book.coverImage || book.image}
                    alt={book.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <div className="mt-3">
                    <h4 className="font-semibold text-sm text-gray-800">
                      {book.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {book.authors || book.author}
                    </p>
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
                        book.status === "Out Of Stock"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {book.status || "Available"}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Link
                      to={`/book/${book.id}`}
                      className="inline-block w-full text-center bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ===== end related ===== */}
        </div>

        {/* LEFT summary (under Want to Read) */}
        <div className="col-span-1">
          <div className="w-full mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {pack?.heading || "Employee Review"}
            </h3>

            {!pack || pack.total === 0 ? (
              <div className="text-sm text-gray-500">No reviews yet for this book.</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="text-lg font-semibold">
                    {pack.overall.toFixed(1)}{" "}
                    <span className="text-gray-500 text-base">out of 5</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {pack.total.toLocaleString()} global ratings
                  </div>

                  {/* Bars */}
                  <div className="mt-4 space-y-1">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="w-10 text-sm">{star} star</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded">
                          <div
                            className="h-2 bg-orange-500 rounded"
                            style={{ width: `${pack.breakdown[star] || 0}%` }}
                          />
                        </div>
                        <span className="w-10 text-right text-sm text-gray-600">
                          {(pack.breakdown[star] || 0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <div className="text-sm text-gray-700 mb-2">
                    Share your thoughts with other customers
                  </div>
                  <button className="w-full rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
                    Write an employee review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT reviews (images + list) */}
        <div className="col-span-2">
          <div className="mt-10">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              {pack?.heading || "Employee Review"}
            </h3>

            {!pack || pack.total === 0 ? (
              <div className="text-sm text-gray-500">No reviews yet for this book.</div>
            ) : (
              <>
                {pack.images?.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-semibold">Reviews with images</h4>
                      <button className="text-sm text-sky-600 hover:underline">
                        See all photos
                      </button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 pr-1">
                      {pack.images.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`review-${idx}`}
                          className="h-24 w-24 object-cover rounded-md flex-shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {pack.reviews.map((r) => (
                    <article key={r.id} className="border-b pb-6">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < r.stars
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <h5 className="font-semibold text-gray-900">{r.title}</h5>
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        {r.name} — Reviewed in the {r.country} on {r.date}
                        {r.verified && (
                          <span className="ml-1 text-green-600">• Verified Purchase</span>
                        )}
                      </div>

                      <p className="text-sm text-gray-700 mt-3 leading-relaxed">{r.body}</p>

                      <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
                        <button className="rounded-full border px-3 py-1 hover:bg-gray-50">
                          Helpful
                        </button>
                        <button className="rounded-full border px-3 py-1 hover:bg-gray-50">
                          Report
                        </button>
                        <span className="text-gray-500">
                          {r.helpful} people found this helpful
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {/* ===== end new row ===== */}
      </div>
    </div>
  );
}
