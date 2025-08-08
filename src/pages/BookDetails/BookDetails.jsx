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


// BookDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import {
  Star,
  ChevronDown,
  Users,
  PlayCircle,
  Download,
} from "lucide-react";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookData, setBookData] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [showFullSummary, setShowFullSummary] = useState(false);

  // Normalize any book shape into what this page expects
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

    // Show the slider book immediately if it matches the route id
    if (sliderBook && String(sliderBook.id) === String(id)) {
      setBookData(normalize(sliderBook));
    }

    // Enrich/replace with books.json if present
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((b) => String(b.id) === String(id));
        if (found) {
          setBookData(normalize(found));
          const others = data
            .filter((b) => String(b.id) !== String(id))
            .slice(0, 4)
            .map(normalize)
            .filter(Boolean);
          setRelatedBooks(others);
        } else {
          // keep slider data; still try to set related from list if available
          const others = (data || [])
            .filter((b) => String(b.id) !== String(id))
            .slice(0, 4)
            .map(normalize)
            .filter(Boolean);
          setRelatedBooks(others);
        }
      })
      .catch(() => {
        // ignore; slider book already shown if provided
      });
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

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* Left Column */}
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
        </div>

        {/* Book Details */}
        <div className="col-span-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {bookData.title}
          </h1>
          <p className="text-gray-600 mt-1 text-base">
            by{" "}
            <span className="text-sky-600 font-medium">
              {bookData.authors}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {bookData.publisher}, {bookData.publishDate} -{" "}
            <span className="text-sky-600">{bookData.category}</span>
          </p>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {renderStars(bookData.rating)}
            <span className="text-sm text-gray-600 font-semibold">
              {bookData.ratingCount} Ratings
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-500">
              {bookData.reviews || "No Reviews"}
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
                : (bookData.summary || "").split(".")[0] + (bookData.summary ? "..." : "")}
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

          {/* Borrowed Button */}
          <div className="mt-6">
            <button
              onClick={() => {
                const stored = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
                const alreadyExists = stored.find((b) => b.id === bookData.id);

                if (!alreadyExists) {
                  stored.push({ ...bookData, quantity: 1 });
                  localStorage.setItem("borrowedBooks", JSON.stringify(stored));
                }

                navigate("/borrowed");
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-md w-full sm:w-auto block text-center"
            >
              Borrowed
            </button>
          </div>

          {/* Related Books */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Related Books
            </h3>
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
        </div>
      </div>
    </div>
  );
}
