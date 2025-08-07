// BookSlider.jsx (4 Cards Responsive with Zoom Hover Effect)
import React, { useState, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import useApiFetch from '../../hooks/useApiFetch'

const BookSlider = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  // const [books, setBooks] = useState([]);

  const transformBook = (book, index) => ({
    id: book.id || index,
    title: book.name || "Untitled",
    author: book.author || book.authors || "Unknown Author",
    image: book.book_cover_url || book.coverImage || "https://via.placeholder.com/150x220.png?text=No+Cover",
    rating: book.average_rating || 0,
    ratingCount: book.rating_count || 0,
    summary: book.short_description || "",
    publisher: book.publisher || "",
    publishDate: book.publishDate || "",
    category: book.category?.category_name || "",
    pdfLink: book.pdf_file_url || "",
  });

  const { data: books, loading: loading, error: error } = useApiFetch(
    "/book/new-collection",
    transformBook
  );

  const visibleCards = 4;
  const maxIndex = books.length - visibleCards;

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

  const goToDetails = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">Failed to load books.</p>;

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
                  onClick={() => goToDetails(book.id)}
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
                        className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${book.status === 'Out Of Stock'
                          ? 'bg-red-600'
                          : book.status === 'Upcoming'
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
                            className={`${i < book.rating ? 'text-yellow-400' : 'text-gray-300'
                              } w-3 h-3`}
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
                        goToDetails(book.id);
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
