
// BookSlider.jsx (4 Cards Responsive with Zoom Hover Effect)

import React, { useState, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import booksData from '../../data/sampleBooks'; // ⬅️ use your shared data

const BookSlider = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Build up to 8 cards: start with featuredBooks, then pull from popular/recommended
  const base = (booksData?.featuredBooks || []);
  const extrasSource = [
    ...(booksData?.popular || []),
    ...(booksData?.recommended || []),
  ].map((b) => ({
    ...b,
    description: b.description || b.summary, // keep description text in card
    status: b.status || b.availability,      // unify badge if present
  }));

  const needed = Math.max(0, 8 - base.length);
  const extras = extrasSource.slice(0, needed);

  // Final slider list (8 items when available)
  const books = [...base, ...extras].map((b) => ({
    ...b,
    rating: b.rating ?? 4,
    status: b.status || b.availability,
  }));

  const visibleCards = 4;
  const step = 2; // ⬅️ move two-by-two
  const maxIndex = Math.max(0, books.length - visibleCards);
  const lastAligned = Math.max(0, Math.floor(maxIndex / step) * step);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const next = prevIndex + step;
      if (next > maxIndex) return 0; // wrap to start
      return next;
    });
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => {
      const prev = prevIndex - step;
      if (prev < 0) return lastAligned; // wrap to last aligned window
      return prev;
    });
  };

  // Optional autoplay (respects step=2 and pauses on hover)
  useEffect(() => {
    if (!isAutoPlaying || books.length <= visibleCards) return;
    const id = setInterval(goToNext, 4000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoPlaying, books.length, visibleCards, currentIndex]);

  // Pass full book via route state to guarantee correct details
  const goToDetails = (book) => {
    navigate(`/book/${book.id}`, { state: { fromSlider: book } });
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Book</h1>
      <div className="relative">
        {/* Prev Control */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          aria-label="Previous"
          type="button"
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
                      type="button"
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          aria-label="Next"
          type="button"
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default BookSlider;
