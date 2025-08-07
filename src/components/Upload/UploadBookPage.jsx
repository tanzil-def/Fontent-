// UploadBookPage.jsx
import { useState } from "react";
import {
  CalendarDays,
  Upload,
  Users,
  BookOpen,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function UploadBookPage() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    authorsOptional: "",
    isbn: "",
    mainCategory: "",
    subCategory: "",
    publicationYear: "",
    language: "",
    quantity: "",
    description: "",
    publisher: "",
    shelf: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book submitted:", bookData);
    alert("Book uploaded successfully!");
    // TODO: send to backend
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-4 py-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Library</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="/dashboard"
                className="flex items-center gap-2 text-gray-700 hover:text-sky-500"
              >
                <CalendarDays size={18} /> Dashboard
              </a>
            </li>
            <li>
              <a
                href="/upload"
                className="flex items-center gap-2 text-sky-600 font-medium"
              >
                <Upload size={18} /> Upload Books
              </a>
            </li>
            <li>
              <a
                href="/fillup-form"
                className="flex items-center gap-2 text-gray-700 hover:text-sky-500"
              >
                <BookOpen size={18} /> Fill Up Form
              </a>
            </li>
            <li>
              <a
                href="/members"
                className="flex items-center gap-2 text-gray-700 hover:text-sky-500"
              >
                <Users size={18} /> Member
              </a>
            </li>
            <li>
              <a
                href="/checkout"
                className="flex items-center gap-2 text-gray-700 hover:text-sky-500"
              >
                <BookOpen size={18} /> Check-out Books
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="flex items-center gap-2 text-gray-700 hover:text-sky-500"
              >
                <HelpCircle size={18} /> Help
              </a>
            </li>
          </ul>
        </div>
        <div>
          <a
            href="/logout"
            className="flex items-center gap-2 text-red-600 font-medium"
          >
            <LogOut size={18} /> Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h1>
        <p className="text-sm text-gray-500 mb-8">
          Fill in the details below to add a new book to the library database.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT SECTION */}
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Book Title"
                value={bookData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <input
                type="text"
                name="authorsOptional"
                placeholder="Multiple Authors Names (Optional)"
                value={bookData.authorsOptional}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <select
                name="mainCategory"
                value={bookData.mainCategory}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              >
                <option value="">Choose a category / genre</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
              </select>
              <input
                type="text"
                name="publicationYear"
                placeholder="Publication Year"
                value={bookData.publicationYear}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <input
                type="text"
                name="language"
                placeholder="Book Language"
                value={bookData.language}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity Available"
                value={bookData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <textarea
                name="description"
                rows="4"
                placeholder="Description (Optional)"
                value={bookData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
            </div>

            {/* RIGHT SECTION */}
            <div className="space-y-4">
              <input
                type="text"
                name="author"
                placeholder="Author Name"
                value={bookData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <input
                type="text"
                name="isbn"
                placeholder="ISBN Number"
                value={bookData.isbn}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <select
                name="subCategory"
                value={bookData.subCategory}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              >
                <option value="">Choose a subcategory / genre</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
              </select>
              <input
                type="text"
                name="publisher"
                placeholder="Publisher (Optional)"
                value={bookData.publisher}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <input
                type="text"
                name="shelf"
                placeholder="Shelf Location"
                value={bookData.shelf}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <div className="bg-gray-100 border rounded px-4 py-6 text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Drag & Drop or <span className="text-sky-600 underline">Choose file</span> to upload
                </p>
                <p className="text-sm text-gray-500">or,</p>
                <p className="text-sm text-gray-600">Audio clips upload</p>
              </div>
              <div className="flex justify-between gap-4 mt-4">
                <button
                  type="button"
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
                >
                  Confirm Book
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
