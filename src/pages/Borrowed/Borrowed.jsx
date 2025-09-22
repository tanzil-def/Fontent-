import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = import.meta.env.VITE_API_TOKEN;

async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "API Error");
  }
  return res.json();
}

export default function Borrowed() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    async function loadBorrowedBooks() {
      try {
        const userId = 1; // replace with logged-in user ID dynamically if needed
        const data = await fetchAPI(`/borrow/user/${userId}`);
        setBorrowedBooks(data);
      } catch (err) {
        console.error(err.message);
      }
    }
    loadBorrowedBooks();
  }, []);

  const handleRemove = async (id) => {
    try {
      await fetchAPI(`/borrow/return`, {
        method: "PUT",
        body: JSON.stringify({ id }),
      });
      setBorrowedBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleQuantityChange = (id, value) => {
    const updated = borrowedBooks.map((book) =>
      book.id === id ? { ...book, quantity: value } : book
    );
    setBorrowedBooks(updated);
  };

  const increaseQty = (id) => {
    const updated = borrowedBooks.map((book) =>
      book.id === id ? { ...book, quantity: (book.quantity || 1) + 1 } : book
    );
    setBorrowedBooks(updated);
  };

  const decreaseQty = (id) => {
    const updated = borrowedBooks.map((book) =>
      book.id === id
        ? { ...book, quantity: Math.max(1, (book.quantity || 1) - 1) }
        : book
    );
    setBorrowedBooks(updated);
  };

  if (borrowedBooks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-lg text-gray-600 font-medium mb-2">
            You haven't borrowed any books yet.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  const selected = borrowedBooks[0];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Borrowed Books</h2>
      <div className="space-y-6">
        {borrowedBooks.map((book) => (
          <div
            key={book.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={book.coverImage || book.image}
                alt={book.title}
                className="w-24 h-32 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500">{book.authors}</p>

                <div className="mt-2 flex items-center gap-3 text-sm">
                  <label htmlFor={`qty-${book.id}`} className="text-sm">
                    Quantity:
                  </label>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => decreaseQty(book.id)}
                      className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded-l"
                    >
                      -
                    </button>
                    <input
                      id={`qty-${book.id}`}
                      type="number"
                      min="1"
                      className="w-12 text-center border-l border-r px-2 py-1"
                      value={book.quantity || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          book.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                    <button
                      onClick={() => increaseQty(book.id)}
                      className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRemove(book.id)}
              className="mt-4 sm:mt-0 flex items-center text-sm text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/fill-up-form"
          state={{ borrowNow: selected }}
          onClick={() =>
            localStorage.setItem("borrowNow", JSON.stringify(selected))
          }
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-md inline-block mt-8 text-center"
        >
          Fill Up The Form
        </Link>
      </div>
    </div>
  );
}
