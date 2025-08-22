// // NewBookCollections.jsx

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Star, ChevronRight, ChevronLeft } from "lucide-react";

// const books = [
//   {
//     id: 1,
//     title: "Fundamentals of Software Testing, 2nd Edition",
//     author: " by Bernard Homès",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643480/d9_wxocuv.jpg",
//     rating: 4,
//     status: "Available",
//     category: "Development"
//   },
//   {
//     id: 2,
//     title: "The Coming Wave: AI, Power, and Our Future",
//     author: " Mustafa Suleyman",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643606/ai5_ua61lt.jpg",
//     rating: 4.8,
//     status: "Available",
//   },
//   {
//     id: 3,
//     title: "Co-Intelligence: Living and Working with AI",
//     author: "Ethan Mollick",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643734/ai6_mh7ans.jpg",
//     rating: 5,
//     status: "Out Of Stock",
//   },
//   {
//     id: 4,
//     title: "Ace the Data Science Interview: 201 Real Interview Questions Asked By FAANG, Tech Startups, & Wall Street",
//     author: " Nick Singh &  Kevin Huo",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643910/DS4_ifbyg1.jpg",
//     rating: 4.8,
//     status: "Out Of Stock",
//   },
//   {
//     id: 5,
//     title: "Python for Data Analysis",
//     author: "by Wes McKinney",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644368/ds1_qqs3rd.jpg",
//     rating: 4,
//     status: "Available",
//   },
//   {
//     id: 6,
//     title: "Data Mining: Concepts and Techniques (The Morgan Kaufmann Series in Data Management Systems)",
//     author: "Jiawei Han, Jian Pei &  Hanghang Tong ",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644513/datamining_oy6mhy.jpg",
//     rating: 5,
//     status: "Available",
//   },
//   {
//     id: 7,
//     title: "Python Crash Course",
//     author: "Eric Matthes",
//     image: "https://covers.openlibrary.org/b/id/8671733-L.jpg",
//     rating: 5,
//     status: "Available",
//   },
//   {
//     id: 8,
//     title: "Eloquent JavaScript",
//     author: "Marijn Haverbeke",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754645070/el_ruimml.jpg",
//     rating: 4,
//     status: "Available",
//   },
//   {
//     id: 9,
//     title: "Practice of System and Network Administration",
//     author: "Thomas Limoncelli, Christina Hogan & Strata Chalup ",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644753/network_mezj51.jpg",
//     rating: 5,
//     status: "Available",
//   },
//   // {
//   //   id: 10,
//   //   title: "A Heart So Fierce And Broken",
//   //   author: "Brigid Kemmerer",
//   //   image: "https://covers.openlibrary.org/b/id/9871196-L.jpg",
//   //   rating: 4,
//   //   status: "Out Of Stock",
//   // },
// ];

// export default function NewBookCollections() {
//   const [visibleCount, setVisibleCount] = useState(6);
//   const navigate = useNavigate();

//   const showMore = () => {
//     setVisibleCount((prev) => Math.min(prev + 4, books.length));
//   };

//   const showLess = () => {
//     setVisibleCount(6);
//   };

//   return (
//     <section className="mt-12">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800">NEW BOOK COLLECTIONS</h2>
//         <div className="flex items-center gap-2">
//           {visibleCount < books.length && (
//             <button
//               onClick={showMore}
//               className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
//             >
//               Show More <ChevronRight className="w-4 h-4" />
//             </button>
//           )}
//           {visibleCount > 6 && (
//             <button
//               onClick={showLess}
//               className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
//             >
//               <ChevronLeft className="w-4 h-4" /> Show Less
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {books.slice(0, visibleCount).map((book) => (
//           <div
//             key={book.id}
//             onClick={() =>
//               navigate(`/book/${book.id}`, {
//                 state: { fromSlider: book }, // ✅ pass the actual card data
//               })
//             }
//             className="cursor-pointer bg-white p-3 rounded shadow hover:shadow-md transition-all"
//           >
//             <img
//               src={book.image}
//               alt={book.title}
//               className="w-full h-40 object-cover rounded"
//             />
//             <h3 className="font-semibold text-sm mt-2 line-clamp-2 hover:text-sky-600">
//               {book.title}
//             </h3>
//             <p className="text-xs text-gray-500">{book.author}</p>
//             <div className="flex items-center mt-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-4 h-4 ${
//                     i < book.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//             <p
//               className={`text-xs font-semibold mt-1 ${
//                 book.status === "Available" ? "text-green-500" : "text-red-500"
//               }`}
//             >
//               {book.status}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }



// NewBookCollections.jsx



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Star, ChevronRight, ChevronLeft } from "lucide-react";

// const books = [
//   {
//     id: 1,
//     title: "Fundamentals of Software Testing, 2nd Edition",
//     author: " by Bernard Homès",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643480/d9_wxocuv.jpg",
//     rating: 4,
//     status: "Available",
//     category: "Development"
//   },
//   {
//     id: 2,
//     title: "The Coming Wave: AI, Power, and Our Future",
//     author: " Mustafa Suleyman",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643606/ai5_ua61lt.jpg",
//     rating: 4.8,
//     status: "Available",
//   },
//   {
//     id: 3,
//     title: "Co-Intelligence: Living and Working with AI",
//     author: "Ethan Mollick",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643734/ai6_mh7ans.jpg",
//     rating: 5,
//     status: "Out Of Stock",
//   },
//   {
//     id: 4,
//     title: "Ace the Data Science Interview: 201 Real Interview Questions Asked By FAANG, Tech Startups, & Wall Street",
//     author: " Nick Singh &  Kevin Huo",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643910/DS4_ifbyg1.jpg",
//     rating: 4.8,
//     status: "Out Of Stock",
//   },
//   {
//     id: 5,
//     title: "Python for Data Analysis",
//     author: "by Wes McKinney",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644368/ds1_qqs3rd.jpg",
//     rating: 4,
//     status: "Available",
//   },
//   {
//     id: 6,
//     title: "Data Mining: Concepts and Techniques (The Morgan Kaufmann Series in Data Management Systems)",
//     author: "Jiawei Han, Jian Pei &  Hanghang Tong ",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644513/datamining_oy6mhy.jpg",
//     rating: 5,
//     status: "Available",
//   },
//   {
//     id: 7,
//     title: "Python Crash Course",
//     author: "Eric Matthes",
//     image: "https://covers.openlibrary.org/b/id/8671733-L.jpg",
//     rating: 5,
//     status: "Available",
//   },
//   {
//     id: 8,
//     title: "Eloquent JavaScript",
//     author: "Marijn Haverbeke",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754645070/el_ruimml.jpg",
//     rating: 4,
//     status: "Available",
//   },
//   {
//     id: 9,
//     title: "Practice of System and Network Administration",
//     author: "Thomas Limoncelli, Christina Hogan & Strata Chalup ",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644753/network_mezj51.jpg",
//     rating: 5,
//     status: "Available",
//   },
//   // {
//   //   id: 10,
//   //   title: "A Heart So Fierce And Broken",
//   //   author: "Brigid Kemmerer",
//   //   image: "https://covers.openlibrary.org/b/id/9871196-L.jpg",
//   //   rating: 4,
//   //   status: "Out Of Stock",
//   // },
// ];

// export default function NewBookCollections() {
//   // Start with first row (3 cards). "See More" reveals the second row (next 3).
//   const [visibleCount, setVisibleCount] = useState(3);
//   const navigate = useNavigate();

//   const showMore = () => setVisibleCount((prev) => Math.min(6, books.length));
//   const showLess = () => setVisibleCount(3);

//   // First 3 cards
//   const firstRow = books.slice(0, 3);
//   // Next 3 cards (revealed on See More)
//   const secondRow = books.slice(3, 6);

//   return (
//     <section className="mt-12">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800">NEW BOOK COLLECTIONS</h2>
//         <div className="flex items-center gap-2">
//           {visibleCount < Math.min(6, books.length) && (
//             <button
//               onClick={showMore}
//               className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
//             >
//               See More <ChevronRight className="w-4 h-4" />
//             </button>
//           )}
//           {visibleCount > 3 && (
//             <button
//               onClick={showLess}
//               className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
//             >
//               <ChevronLeft className="w-4 h-4" /> Show Less
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Row 1: always visible (3 cards on sm+, 2 on xs) */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-6 lg:gap-6">
//         {firstRow.map((book) => (
//           <div
//             key={book.id}
//             onClick={() =>
//               navigate(`/book/${book.id}`, {
//                 state: { fromSlider: book }, // ✅ pass the actual card data
//               })
//             }
//             className="cursor-pointer bg-white p-3 rounded shadow hover:shadow-md transition-all"
//           >
//             <img
//               src={book.image}
//               alt={book.title}
//               className="w-full h-40 object-cover rounded"
//             />
//             <h3 className="font-semibold text-sm mt-2 line-clamp-2 hover:text-sky-600">
//               {book.title}
//             </h3>
//             <p className="text-xs text-gray-500">{book.author}</p>
//             <div className="flex items-center mt-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-4 h-4 ${
//                     i < book.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//             <p
//               className={`text-xs font-semibold mt-1 ${
//                 book.status === "Available" ? "text-green-500" : "text-red-500"
//               }`}
//             >
//               {book.status}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Row 2: only appears after "See More" (same layout & gaps) */}
//       {visibleCount > 3 && (
//         <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-6 lg:gap-6">
//           {secondRow.map((book) => (
//             <div
//               key={book.id}
//               onClick={() =>
//                 navigate(`/book/${book.id}`, {
//                   state: { fromSlider: book },
//                 })
//               }
//               className="cursor-pointer bg-white p-3 rounded shadow hover:shadow-md transition-all"
//             >
//               <img
//                 src={book.image}
//                 alt={book.title}
//                 className="w-full h-40 object-cover rounded"
//               />
//               <h3 className="font-semibold text-sm mt-2 line-clamp-2 hover:text-sky-600">
//                 {book.title}
//               </h3>
//               <p className="text-xs text-gray-500">{book.author}</p>
//               <div className="flex items-center mt-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 ${
//                       i < book.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <p
//                 className={`text-xs font-semibold mt-1 ${
//                   book.status === "Available" ? "text-green-500" : "text-red-500"
//                 }`}
//               >
//                 {book.status}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Star, ChevronRight, ChevronLeft } from "lucide-react";

// const books = [
//   {
//     id: 1,
//     title: "Fundamentals of Software Testing, 2nd Edition",
//     author: " by Bernard Homès",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643480/d9_wxocuv.jpg",
//     rating: 4,
//     status: "Available",
//     category: "Development"
//   },
//   {
//     id: 2,
//     title: "The Coming Wave: AI, Power, and Our Future",
//     author: " Mustafa Suleyman",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643606/ai5_ua61lt.jpg",
//     rating: 4.8,
//     status: "Available",
//   },
//   {
//     id: 3,
//     title: "Co-Intelligence: Living and Working with AI",
//     author: "Ethan Mollick",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643734/ai6_mh7ans.jpg",
//     rating: 5,
//     status: "Out Of Stock",
//   },
//   {
//     id: 4,
//     title: "Ace the Data Science Interview: 201 Real Interview Questions Asked By FAANG, Tech Startups, & Wall Street",
//     author: " Nick Singh &  Kevin Huo",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643910/DS4_ifbyg1.jpg",
//     rating: 4.8,
//     status: "Out Of Stock",
//   },
//   {
//     id: 5,
//     title: "Python for Data Analysis",
//     author: "by Wes McKinney",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644368/ds1_qqs3rd.jpg",
//     rating: 4,
//     status: "Available",
//   },
//   {
//     id: 6,
//     title: "Data Mining: Concepts and Techniques (The Morgan Kaufmann Series in Data Management Systems)",
//     author: "Jiawei Han, Jian Pei &  Hanghang Tong ",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644513/datamining_oy6mhy.jpg",
//     rating: 5,
//     status: "Available",
//   },
//   {
//     id: 7,
//     title: "Python Crash Course",
//     author: "Eric Matthes",
//     image: "https://covers.openlibrary.org/b/id/8671733-L.jpg",
//     rating: 5,
//     status: "Available",
//   },
//   {
//     id: 8,
//     title: "Eloquent JavaScript",
//     author: "Marijn Haverbeke",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754645070/el_ruimml.jpg",
//     rating: 4,
//     status: "Available",
//   },
//   {
//     id: 9,
//     title: "Practice of System and Network Administration",
//     author: "Thomas Limoncelli, Christina Hogan & Strata Chalup ",
//     image: "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644753/network_mezj51.jpg",
//     rating: 5,
//     status: "Available",
//   },
//   // {
//   //   id: 10,
//   //   title: "A Heart So Fierce And Broken",
//   //   author: "Brigid Kemmerer",
//   //   image: "https://covers.openlibrary.org/b/id/9871196-L.jpg",
//   //   rating: 4,
//   //   status: "Out Of Stock",
//   // },
// ];

// export default function NewBookCollections() {
//   // Start with first row (3 cards). "See More" reveals the second row (next 3).
//   const [visibleCount, setVisibleCount] = useState(3);
//   const navigate = useNavigate();

//   const showMore = () => setVisibleCount((prev) => Math.min(6, books.length));
//   const showLess = () => setVisibleCount(3);

//   // First 3 cards
//   const firstRow = books.slice(0, 3);
//   // Next 3 cards (revealed on See More)
//   const secondRow = books.slice(3, 6);

//   return (
//     <section className="mt-12">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800">NEW BOOK COLLECTIONS</h2>
//         <div className="flex items-center gap-2">
//           {visibleCount < Math.min(6, books.length) && (
//             <button
//               onClick={showMore}
//               className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
//             >
//               See More <ChevronRight className="w-4 h-4" />
//             </button>
//           )}
//           {visibleCount > 3 && (
//             <button
//               onClick={showLess}
//               className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
//             >
//               <ChevronLeft className="w-4 h-4" /> Show Less
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Row 1: 1 card (mobile), 2 cards (tablet), 3 cards (desktop) */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-6">
//         {firstRow.map((book) => (
//           <div
//             key={book.id}
//             onClick={() =>
//               navigate(`/book/${book.id}`, {
//                 state: { fromSlider: book }, // ✅ pass the actual card data
//               })
//             }
//             className="cursor-pointer bg-white p-3 rounded shadow hover:shadow-md transition-all"
//           >
//             <img
//               src={book.image}
//               alt={book.title}
//               className="w-full h-40 object-cover rounded"
//             />
//             <h3 className="font-semibold text-sm mt-2 line-clamp-2 hover:text-sky-600">
//               {book.title}
//             </h3>
//             <p className="text-xs text-gray-500">{book.author}</p>
//             <div className="flex items-center mt-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-4 h-4 ${
//                     i < book.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//             <p
//               className={`text-xs font-semibold mt-1 ${
//                 book.status === "Available" ? "text-green-500" : "text-red-500"
//               }`}
//             >
//               {book.status}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Row 2: only appears after "See More" (same layout & gaps) */}
//       {visibleCount > 3 && (
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-6">
//           {secondRow.map((book) => (
//             <div
//               key={book.id}
//               onClick={() =>
//                 navigate(`/book/${book.id}`, {
//                   state: { fromSlider: book },
//                 })
//               }
//               className="cursor-pointer bg-white p-3 rounded shadow hover:shadow-md transition-all"
//             >
//               <img
//                 src={book.image}
//                 alt={book.title}
//                 className="w-full h-40 object-cover rounded"
//               />
//               <h3 className="font-semibold text-sm mt-2 line-clamp-2 hover:text-sky-600">
//                 {book.title}
//               </h3>
//               <p className="text-xs text-gray-500">{book.author}</p>
//               <div className="flex items-center mt-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 ${
//                       i < book.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <p
//                 className={`text-xs font-semibold mt-1 ${
//                   book.status === "Available" ? "text-green-500" : "text-red-500"
//                 }`}
//               >
//                 {book.status}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// //NewBookCollections.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Star, ChevronRight, ChevronLeft } from "lucide-react";

// const books = [
//   {
//     id: 1,
//     title: "Fundamentals of Software Testing, 2nd Edition",
//     author: " by Bernard Homès",
//     image:
//       "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643480/d9_wxocuv.jpg",
//     rating: 4,
//     status: "Available",
//     category: "Development",
//   },
//   {
//     id: 2,
//     title: "The Coming Wave: AI, Power, and Our Future",
//     author: " Mustafa Suleyman",
//     image:
//       "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643606/ai5_ua61lt.jpg",
//     rating: 4.8,
//     status: "Available",
//   },
//   {
//     id: 3,
//     title: "Co-Intelligence: Living and Working with AI",
//     author: "Ethan Mollick",
//     image:
//       "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643734/ai6_mh7ans.jpg",
//     rating: 5,
//     status: "Out Of Stock",
//   },
//   {
//     id: 4,
//     title:
//       "Ace the Data Science Interview: 201 Real Interview Questions Asked By FAANG, Tech Startups, & Wall Street",
//     author: " Nick Singh &  Kevin Huo",
//     image:
//       "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643910/DS4_ifbyg1.jpg",
//     rating: 4.8,
//     status: "Out Of Stock",
//   },
//   {
//     id: 5,
//     title: "Python for Data Analysis",
//     author: "by Wes McKinney",
//     image:
//       "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644368/ds1_qqs3rd.jpg",
//     rating: 4,
//     status: "Available",
//   },
//   {
//     id: 6,
//     title:
//       "Data Mining: Concepts and Techniques (The Morgan Kaufmann Series in Data Management Systems)",
//     author: "Jiawei Han, Jian Pei &  Hanghang Tong ",
//     image:
//       "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644513/datamining_oy6mhy.jpg",
//     rating: 5,
//     status: "Available",
//   },
//   {
//     id: 7,
//     title: "Python Crash Course",
//     author: "Eric Matthes",
//     image: "https://covers.openlibrary.org/b/id/8671733-L.jpg",
//     rating: 5,
//     status: "Available",
//   },
//   {
//     id: 8,
//     title: "Eloquent JavaScript",
//     author: "Marijn Haverbeke",
//     image:
//       "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754645070/el_ruimml.jpg",
//     rating: 4,
//     status: "Available",
//   },
//   {
//     id: 9,
//     title: "Practice of System and Network Administration",
//     author: "Thomas Limoncelli, Christina Hogan & Strata Chalup ",
//     image:
//       "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644753/network_mezj51.jpg",
//     rating: 5,
//     status: "Available",
//   },
// ];

// export default function NewBookCollections() {
//   // Start with first row (3 cards). "See More" reveals the second row (next 3).
//   const [visibleCount, setVisibleCount] = useState(3);
//   const navigate = useNavigate();

//   const showMore = () => setVisibleCount((prev) => Math.min(6, books.length));
//   const showLess = () => setVisibleCount(3);

//   // First 3 cards
//   const firstRow = books.slice(0, 3);
//   // Next 3 cards (revealed on See More)
//   const secondRow = books.slice(3, 6);

//   const Card = ({ book }) => (
//     <div
//       onClick={() =>
//         navigate(`/book/${book.id}`, {
//           state: { fromSlider: book },
//         })
//       }
//       className="cursor-pointer bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
//     >
//       {/* Cover */}
//       <img src={book.image} alt={book.title} className="w-full h-40 object-cover" />

//       {/* Body with a thin top divider (same as other sections) */}
//       <div className="border-t border-gray-200 p-3">
//         <h3 className="font-semibold text-sm line-clamp-2 hover:text-sky-600">
//           {book.title}
//         </h3>
//         <p className="text-xs text-gray-500">{book.author}</p>

//         <div className="flex items-center mt-1">
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               className={`w-4 h-4 ${
//                 i < book.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
//               }`}
//             />
//           ))}
//         </div>

//         <p
//           className={`text-xs font-semibold mt-1 ${
//             book.status?.toLowerCase() === "available"
//               ? "text-green-600"
//               : "text-red-500"
//           }`}
//         >
//           {book.status}
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <section className="mt-12">
//       {/* OUTER BORDER like Course Overview / Recommended / Popular */}
//       <div className="rounded-lg border border-gray-300 overflow-hidden bg-white">
//         {/* Header (keep your See More / Show Less exactly) */}
//         <div className="px-4 py-3 flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-800">NEW BOOK COLLECTIONS</h2>

//           <div className="flex items-center gap-2">
//             {visibleCount < Math.min(6, books.length) && (
//               <button
//                 onClick={showMore}
//                 className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
//               >
//                 See More <ChevronRight className="w-4 h-4" />
//               </button>
//             )}
//             {visibleCount > 3 && (
//               <button
//                 onClick={showLess}
//                 className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
//               >
//                 <ChevronLeft className="w-4 h-4" /> Show Less
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Divider under header */}
//         <div className="border-t border-gray-200">
//           {/* Row 1 */}
//           <div className="p-3 sm:p-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {firstRow.map((book) => (
//                 <Card key={book.id} book={book} />
//               ))}
//             </div>
//           </div>

//           {/* Row 2 (revealed by See More) */}
//           {visibleCount > 3 && (
//             <div className="p-3 sm:p-4 pt-0">
//               <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {secondRow.map((book) => (
//                   <Card key={book.id} book={book} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }



// src/components/NewBookCollections/NewBookCollections.jsx
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import BookCard from "../../components/BookCard/BookCard";

const books = [
  {
    id: 1,
    title: "Fundamentals of Software Testing, 2nd Edition",
    author: " by Bernard Homès",
    image:
      "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643480/d9_wxocuv.jpg",
    rating: 4,
    status: "Available",
    category: "Development",
  },
  {
    id: 2,
    title: "The Coming Wave: AI, Power, and Our Future",
    author: " Mustafa Suleyman",
    image:
      "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643606/ai5_ua61lt.jpg",
    rating: 4.8,
    status: "Available",
    category: "General",
  },
  {
    id: 3,
    title: "Co-Intelligence: Living and Working with AI",
    author: "Ethan Mollick",
    image:
      "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643734/ai6_mh7ans.jpg",
    rating: 5,
    status: "Out Of Stock",
    category: "General",
  },
  {
    id: 4,
    title:
      "Ace the Data Science Interview: 201 Real Interview Questions Asked By FAANG, Tech Startups, & Wall Street",
    author: " Nick Singh &  Kevin Huo",
    image:
      "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754643910/DS4_ifbyg1.jpg",
    rating: 4.8,
    status: "Out Of Stock",
    category: "Development",
  },
  {
    id: 5,
    title: "Python for Data Analysis",
    author: "by Wes McKinney",
    image:
      "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644368/ds1_qqs3rd.jpg",
    rating: 4,
    status: "Available",
    category: "Development",
  },
  {
    id: 6,
    title:
      "Data Mining: Concepts and Techniques (The Morgan Kaufmann Series in Data Management Systems)",
    author: "Jiawei Han, Jian Pei &  Hanghang Tong ",
    image:
      "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644513/datamining_oy6mhy.jpg",
    rating: 5,
    status: "Available",
    category: "Development",
  },
  {
    id: 7,
    title: "Python Crash Course",
    author: "Eric Matthes",
    image: "https://covers.openlibrary.org/b/id/8671733-L.jpg",
    rating: 5,
    status: "Available",
    category: "Development",
  },
  {
    id: 8,
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    image:
      "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754645070/el_ruimml.jpg",
    rating: 4,
    status: "Available",
    category: "Development",
  },
  {
    id: 9,
    title: "Practice of System and Network Administration",
    author: "Thomas Limoncelli, Christina Hogan & Strata Chalup ",
    image:
      "https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754644753/network_mezj51.jpg",
    rating: 5,
    status: "Available",
    category: "IT & Software",
  },
];

export default function NewBookCollections() {
  const popRowRef = useRef(null);
  const navigate = useNavigate();

  const goTo = (b) =>
    navigate(`/book/${b.id}`, {
      state: { fromSlider: b },
    });

  // same behavior as your Popular row
  const scrollByAmount = (ref, dir = 1) => {
    const el = ref?.current;
    if (!el) return;
    const step = Math.round(el.clientWidth * 0.9); // nearly a viewport
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const handleRowScroll = () => {
    // kept for parity with Popular (no extra logic required)
  };

  return (
    <section className="mt-12">
      <div className="mb-8 rounded-lg border border-gray-300 overflow-hidden">
        <div className="px-4 py-3 bg-white flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            NEW BOOK COLLECTIONS
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
          {/* edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />

          <div
            ref={popRowRef}
            onScroll={handleRowScroll}
            className="overflow-x-auto no-scrollbar"
          >
            <div className="flex gap-5 p-3 sm:p-4 snap-x snap-mandatory">
              {books.map((b) => (
                <BookCard
                  key={b.id}
                  book={b}
                  variant="row"
                  status={b.status}
                  onClick={() => goTo(b)}
                  onReadThisBook={() => goTo(b)}
                />
              ))}
            </div>
          </div>

          {/* mobile chevrons */}
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
    </section>
  );
}

