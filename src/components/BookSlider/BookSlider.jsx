// BookSlider.jsx (4 Cards Responsive with Zoom Hover Effect)
// import React, { useState, useEffect } from 'react';
// import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const BookSlider = () => {
//   const navigate = useNavigate();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   const books = [
//     {
//       id: 1,
//       title: "Building AI Agents with LLMs, RAG, and Knowledge Graphs",
//       author: "Tom Hardy",
//       description: "An adventurer’s perilous quest in the Amazon jungle.",
//       rating: 4,
//       status: "Out Of Stock",
//       image: "https://covers.openlibrary.org/b/id/10523922-L.jpg",
//     },
//     {
//       id: 2,
//       title: "Empire of AI: Dreams and Nightmares in Sam Altman's OpenAI ",
//       author: "Karen Hao",
//       description: "Authentic Italian recipes to bring the flavors of Italy home.",
//       rating: 4,
//       status: "Available",
//       image:"https://res.cloudinary.com/dbm4aqhwi/image/upload/v1754634541/ai3_ob4vyd.jpg",
//     },
//     {
//       id: 3,
//       title: "Learning React",
//       author: "Alex Johnson",
//       description: "A comprehensive guide to mastering React.js and modern web development.",
//       rating: 5,
//       status: "Out Of Stock",
//       image: "https://covers.openlibrary.org/b/id/10523922-L.jpg",
//     },
//     {
//       id: 4,
//       title: "The Silent Forest",
//       author: "David Kim",
//       description: "A chilling suspense story set in a haunted woodland.",
//       rating: 3,
//       status: "Upcoming",
//       image: "https://covers.openlibrary.org/b/id/10523922-L.jpg",
//     },
//     {
//       id: 5,
//       title: "Advanced Node.js",
//       author: "John Smith",
//       description: "Master server-side development with Node.js.",
//       rating: 4,
//       status: "Available",
//       image: "https://covers.openlibrary.org/b/id/10523922-L.jpg",
//     },
//   ];

//   const visibleCards = 4;
//   const maxIndex = books.length - visibleCards;

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex >= maxIndex ? 0 : prevIndex + 1
//     );
//   };

//   const goToPrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex <= 0 ? maxIndex : prevIndex - 1
//     );
//   };

//   const goToDetails = (bookId) => {
//     navigate(`/book/${bookId}`);
//   };

//   return (
//     <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Book</h1>
//       <div className="relative">
//         {/* Slider Controls */}
//         <button
//           onClick={goToPrev}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
//           onMouseEnter={() => setIsAutoPlaying(false)}
//           onMouseLeave={() => setIsAutoPlaying(true)}
//         >
//           <FaChevronLeft className="text-gray-600" />
//         </button>

//         {/* Book Cards */}
//         <div className="overflow-hidden px-6">
//           <div
//             className="flex transition-transform duration-500"
//             style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
//           >
//             {books.map((book) => (
//               <div
//                 key={book.id}
//                 className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
//               >
//                 <div
//                   className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:scale-105 duration-300 cursor-pointer flex flex-col h-full"
//                   onClick={() => goToDetails(book.id)}
//                 >
//                   {/* Book Image with Status Badge */}
//                   <div className="relative">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-48 object-cover"
//                     />
//                     {book.status && (
//                       <span
//                         className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${
//                           book.status === 'Out Of Stock'
//                             ? 'bg-red-600'
//                             : book.status === 'Upcoming'
//                             ? 'bg-orange-500'
//                             : 'bg-green-600'
//                         }`}
//                       >
//                         {book.status}
//                       </span>
//                     )}
//                   </div>

//                   {/* Book Info */}
//                   <div className="p-4 flex flex-col justify-between flex-grow text-center">
//                     <div>
//                       <h2 className="text-sm font-semibold text-gray-800 mb-1">
//                         {book.title}
//                       </h2>
//                       <p className="text-xs text-blue-600 mb-1">{book.author}</p>
//                       <div className="flex justify-center items-center mb-2">
//                         {[...Array(5)].map((_, i) => (
//                           <FaStar
//                             key={i}
//                             className={`${
//                               i < book.rating ? 'text-yellow-400' : 'text-gray-300'
//                             } w-3 h-3`}
//                           />
//                         ))}
//                       </div>
//                       <p className="text-xs text-gray-600 line-clamp-2">
//                         {book.description}
//                       </p>
//                     </div>
//                     <button
//                       className="mt-4 bg-black text-white text-xs py-2 rounded hover:bg-gray-800 w-full"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         goToDetails(book.id);
//                       }}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Next Control */}
//         <button
//           onClick={goToNext}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
//           onMouseEnter={() => setIsAutoPlaying(false)}
//           onMouseLeave={() => setIsAutoPlaying(true)}
//         >
//           <FaChevronRight className="text-gray-600" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookSlider;





// BookSlider.jsx (4 Cards Responsive with Zoom Hover Effect)
import React, { useState, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import booksData from '../../data/sampleBooks'; // ⬅️ use your shared data

const BookSlider = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Use featuredBooks because their IDs (9..12) match books.json
  const books = (booksData?.featuredBooks || []).map((b) => ({
    // keep original fields and provide safe fallbacks used by UI
    ...b,
    rating: b.rating ?? 4,           // stars in slider UI
    status: b.status || b.availability, // badge (if any)
  }));

  const visibleCards = 4;
  const maxIndex = Math.max(0, books.length - visibleCards);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  // Pass full book via route state to guarantee correct details
  const goToDetails = (book) => {
    // IDs in sampleBooks are strings; router param is fine either way
    navigate(`/book/${book.id}`, { state: { fromSlider: book } });
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Book</h1>
      <div className="relative">
        {/* Slider Controls */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <FaChevronLeft className="text-gray-600" />
        </button>

        {/* Book Cards */}
        <div className="overflow-hidden px-6">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {books.map((book) => (
              <div
                key={book.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
              >
                <div
                  className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:scale-105 duration-300 cursor-pointer flex flex-col h-full"
                  onClick={() => goToDetails(book)}
                >
                  {/* Book Image with Status Badge */}
                  <div className="relative">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-48 object-cover"
                    />
                    {book.status && (
                      <span
                        className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${
                          book.status?.toLowerCase().includes('out')
                            ? 'bg-red-600'
                            : book.status?.toLowerCase().includes('upcoming')
                            ? 'bg-orange-500'
                            : 'bg-green-600'
                        }`}
                      >
                        {book.status}
                      </span>
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="p-4 flex flex-col justify-between flex-grow text-center">
                    <div>
                      <h2 className="text-sm font-semibold text-gray-800 mb-1">
                        {book.title}
                      </h2>
                      <p className="text-xs text-blue-600 mb-1">{book.author}</p>
                      <div className="flex justify-center items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${i < (book.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} w-3 h-3`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {book.description}
                      </p>
                    </div>
                    <button
                      className="mt-4 bg-black text-white text-xs py-2 rounded hover:bg-gray-800 w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToDetails(book);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Control */}
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default BookSlider;
