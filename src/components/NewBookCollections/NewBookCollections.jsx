// NewBookCollections.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";

const books = [
  {
    id: 1,
    title: "A Heart So Fierce And Broken",
    author: "Brigid Kemmerer",
    image: "https://covers.openlibrary.org/b/id/9871196-L.jpg",
    rating: 4,
    status: "Available",
  },
  {
    id: 2,
    title: "Follow Me To Ground",
    author: "Sue Rainsford",
    image: "https://covers.openlibrary.org/b/id/10506258-L.jpg",
    rating: 3,
    status: "Available",
  },
  {
    id: 3,
    title: "Long Bright River",
    author: "Liz Moore",
    image: "https://covers.openlibrary.org/b/id/10523922-L.jpg",
    rating: 5,
    status: "Out Of Stock",
  },
  {
    id: 4,
    title: "Empire Of AI",
    author: "Karen Hao",
    image: "https://m.media-amazon.com/images/I/91a-1i4-MZL.AC_UF1000,1000_QL80.jpg",
    rating: 4,
    status: "Out Of Stock",
  },
  {
    id: 5,
    title: "Ember Queen",
    author: "Laura Sebastian",
    image: "https://covers.openlibrary.org/b/id/10523922-L.jpg",
    rating: 4,
    status: "Available",
  },
  {
    id: 6,
    title: "Data Mining",
    author: "Jiawei Han",
    image: "https://covers.openlibrary.org/b/id/9871196-L.jpg",
    rating: 5,
    status: "Available",
  },
  {
    id: 7,
    title: "Python Crash Course",
    author: "Eric Matthes",
    image: "https://covers.openlibrary.org/b/id/8671733-L.jpg",
    rating: 5,
    status: "Available",
  },
  {
    id: 8,
    title: "Java: The Complete Reference",
    author: "Herbert Schildt",
    image: "https://covers.openlibrary.org/b/id/9259613-L.jpg",
    rating: 4,
    status: "Available",
  },
  {
    id: 9,
    title: "Long Bright River",
    author: "Liz Moore",
    image: "https://covers.openlibrary.org/b/id/10523922-L.jpg",
    rating: 5,
    status: "Available",
  },
  {
    id: 10,
    title: "A Heart So Fierce And Broken",
    author: "Brigid Kemmerer",
    image: "https://covers.openlibrary.org/b/id/9871196-L.jpg",
    rating: 4,
    status: "Out Of Stock",
  },
];

export default function NewBookCollections() {
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, books.length));
  };

  const showLess = () => {
    setVisibleCount(6);
  };

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">NEW BOOK COLLECTIONS</h2>
        <div className="flex items-center gap-2">
          {visibleCount < books.length && (
            <button
              onClick={showMore}
              className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
            >
              Show More <ChevronRight className="w-4 h-4" />
            </button>
          )}
          {visibleCount > 6 && (
            <button
              onClick={showLess}
              className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
            >
              <ChevronLeft className="w-4 h-4" /> Show Less
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.slice(0, visibleCount).map((book) => (
          <div
            key={book.id}
            onClick={() => navigate(`/book/${book.id}`)}
            className="cursor-pointer bg-white p-3 rounded shadow hover:shadow-md transition-all"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-semibold text-sm mt-2 line-clamp-2 hover:text-sky-600">
              {book.title}
            </h3>
            <p className="text-xs text-gray-500">{book.author}</p>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < book.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p
              className={`text-xs font-semibold mt-1 ${
                book.status === "Available" ? "text-green-500" : "text-red-500"
              }`}
            >
              {book.status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
