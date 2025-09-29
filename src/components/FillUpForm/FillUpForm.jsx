// src/components/FillUpForm/FillUpForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import api from "../../api";
import toast, { Toaster } from "react-hot-toast";

export default function FillUpForm() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in
  const checkLogin = async () => {
    try {
      const userRes = await api.get("/dashboard/me");
      return userRes.data;
    } catch (err) {
      toast.error("You must be logged in to borrow books.");
      navigate("/login");
      return null;
    }
  };

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    const fromState = location.state?.borrowNow || location.state?.book || null;
    const fromKey = JSON.parse(localStorage.getItem("borrowNow") || "null");

    const chosen =
      fromState ||
      fromKey ||
      (books.length ? books[0] : null);

    setBorrowedBooks(chosen ? [chosen] : []);
  }, [location.state]);

  const calcBorrowDays = (returnDateStr) => {
    if (!returnDateStr) return "";
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const rtn = new Date(returnDateStr);
    const end = new Date(rtn.getFullYear(), rtn.getMonth(), rtn.getDate());
    const diffMs = end - start;
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const handleChange = (e, bookId) => {
    const { name, value } = e.target;
    if (name === "returnDate") {
      const autoDays = calcBorrowDays(value);
      setFormData((prev) => ({
        ...prev,
        [bookId]: {
          ...prev[bookId],
          returnDate: value,
          days: autoDays,
        },
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const user = await checkLogin();
    if (!user) return; // Stop if not logged in

    try {
      for (const book of borrowedBooks) {
        const data = {
          user_id: user.id,
          book_id: book.id,
          days: formData[book.id]?.days || 14,
        };
        await api.post("/borrow/create", data);
      }

      toast.success("Book borrowed successfully!");
      setTimeout(() => navigate("/my-borrows"), 1500);
    } catch (err) {
      console.error("Error borrowing book:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error("Failed to borrow book. Try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <Toaster position="top-right" />
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Fill Up Book Borrow Form
        </h1>

        <div className="space-y-8">
          {borrowedBooks.length === 0 && (
            <p className="text-gray-500">No book selected to borrow.</p>
          )}
          {borrowedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex items-start gap-6">
                <img
                  src={book.cover || book.image || book.coverImage}
                  alt={book.title}
                  className="w-28 h-36 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{book.authors || book.author}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Borrowing Days
                      </label>
                      <div className="w-full border rounded px-3 py-2 bg-gray-50">
                        {formData[book.id]?.days ?? "—"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Return Date
                      </label>
                      <input
                        type="date"
                        name="returnDate"
                        className="w-full border rounded px-3 py-2"
                        value={formData[book.id]?.returnDate || ""}
                        onChange={(e) => handleChange(e, book.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {borrowedBooks.length > 0 && (
          <div className="mt-10 text-center">
            <button
              onClick={handleSubmit}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-md"
            >
              Borrow
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
