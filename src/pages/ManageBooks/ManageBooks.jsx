// src/pages/ManageBooks/ManageBooks.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Layers,
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
  Loader2,
  FileText,
  FileAudio2,
  CheckCircle2,
  Search,
  Filter as FilterIcon,
} from "lucide-react";

import Sidebar from "../../components/DashboardSidebar/DashboardSidebar";
import Pagination from "../../components/Pagination/Pagination";

const PLACEHOLDER_IMG = "https://dummyimage.com/80x80/e5e7eb/9ca3af&text=📘";
const PAGE_SIZE = 6;
const API_BASE_URL = "http://127.0.0.1:8000";

// ---------- helpers ----------
function toYMD(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function normalizeFromApi(item) {
  return {
    id: String(item.id),
    title: item.title || "—",
    author: item.author || "—",
    category: item.category_id ? String(item.category_id) : "—",
    copies: item.copies_available || "—",
    updatedOn: toYMD(item.updated_at),
    cover: item.cover || PLACEHOLDER_IMG,
    pdf: item.pdf_file || "",
    audio: item.audio_file || "",
    description: item.description || "",
  };
}

// ---------- Filter Bar COMPONENT ----------
function FilterBarBooks({
  queryTitle,
  setQueryTitle,
  filterAuthor,
  setFilterAuthor,
  filterCategory,
  setFilterCategory,
  authors,
  categories,
  onReset,
}) {
  return (
    <section className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-4 py-3 flex items-center gap-3 flex-wrap">
        {/* Book name search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            value={queryTitle}
            onChange={(e) => setQueryTitle(e.target.value)}
            placeholder="Search by book name"
            className="w-64 md:w-80 rounded border border-gray-300 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {/* Author select */}
        <div className="flex items-center gap-2">
          <FilterIcon size={16} className="text-gray-500" />
          <select
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="all">All authors</option>
            {authors.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Category select */}
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          className="ml-auto inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          Reset filters
        </button>
      </div>
    </section>
  );
}

export default function ManageBooks() {
  useEffect(() => {
    document.title = "Manage Books";
  }, []);

  // --------- load books from API ----------
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchBooks = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showError("Authentication required. Please log in again.");
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/api/book/list`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBooks(data.map(normalizeFromApi));
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        showError("Session expired. Please log in again.");
        // Redirect to login page
        window.location.href = '/login';
      } else {
        console.error("Failed to fetch books");
        showError("Failed to fetch books. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      showError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // displayed list (allows local add/edit/delete)
  const [displayed, setDisplayed] = useState([]);
  useEffect(() => setDisplayed(books), [books]);

  // --------- FILTER STATE ----------
  const [queryTitle, setQueryTitle] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // options reflect the current displayed list
  const options = useMemo(() => {
    const authors = new Set();
    const categories = new Set();
    displayed.forEach((b) => {
      if (b.author && b.author !== "—") authors.add(b.author);
      if (b.category && b.category !== "—") categories.add(b.category);
    });
    return {
      authors: Array.from(authors).sort(),
      categories: Array.from(categories).sort(),
    };
  }, [displayed]);

  const clearFilters = () => {
    setQueryTitle("");
    setFilterAuthor("all");
    setFilterCategory("all");
  };

  // FILTERED ROWS
  const filteredRows = useMemo(() => {
    const q = queryTitle.trim().toLowerCase();
    return displayed.filter((b) => {
      const byTitle = !q || (b.title || "").toLowerCase().includes(q);
      const byAuthor = filterAuthor === "all" || b.author === filterAuthor;
      const byCategory = filterCategory === "all" || b.category === filterCategory;
      return byTitle && byAuthor && byCategory;
    });
  }, [displayed, queryTitle, filterAuthor, filterCategory]);

  // ---------- pagination for table (6 per page) ----------
  const [tablePage, setTablePage] = useState(1);
  const pageRows = useMemo(() => {
    const start = (tablePage - 1) * PAGE_SIZE;
    return filteredRows.slice(start, start + PAGE_SIZE);
  }, [filteredRows, tablePage]);

  // reset to page 1 when filters/data change
  useEffect(() => {
    setTablePage(1);
  }, [queryTitle, filterAuthor, filterCategory, displayed.length]);

  // --------- Add/Edit modal state ----------
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit'
  const [editingId, setEditingId] = useState(null); // book ID

  // --------- Delete confirmation modal state ----------
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // ------------ FORM ------------
  const emptyForm = {
    title: "",
    author: "",
    category_id: "1",
    format: "HARD_COPY",
    copies_total: "1",
    copies_available: "1",
    cover: "",
    pdf_file: "",
    audio_file: "",
    description: "",
  };
  const [form, setForm] = useState(emptyForm);

  const rowToForm = (row) => ({
    title: row.title && row.title !== "—" ? row.title : "",
    author: row.author && row.author !== "—" ? row.author : "",
    category_id: row.category && row.category !== "—" ? row.category : "1",
    format: "HARD_COPY",
    copies_total: row.copies !== undefined && row.copies !== "—" ? String(row.copies) : "1",
    copies_available: row.copies !== undefined && row.copies !== "—" ? String(row.copies) : "1",
    cover: row.cover || "",
    pdf_file: row.pdf || "",
    audio_file: row.audio || "",
    description: row.description || "",
  });

  const onOpenCreate = () => {
    setMode("create");
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const onOpenEdit = (row) => {
    setMode("edit");
    setEditingId(row.id);
    setForm(rowToForm(row));
    setOpen(true);
  };

  const onClose = useCallback(() => setOpen(false), []);
  const onCloseConfirm = useCallback(() => setConfirmOpen(false), []);

  // lock page scroll when any modal open
  useEffect(() => {
    const anyOpen = open || confirmOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";
  }, [open, confirmOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // 2s "Saved" toast
  const [savedToast, setSavedToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message) => {
    setErrorMessage(message);
    setErrorToast(true);
    setTimeout(() => setErrorToast(false), 3000);
  };

  const handleSave = async () => {
    if (!form.title) {
      showError("Please enter a book name.");
      return;
    }
    if (!form.author) {
      showError("Please enter an author name.");
      return;
    }
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showError("Authentication required. Please log in again.");
        setSaving(false);
        window.location.href = '/login';
        return;
      }

      // Prepare book data according to API requirements
      const bookData = {
        title: form.title,
        author: form.author,
        category_id: parseInt(form.category_id) || 1,
        format: form.format || "HARD_COPY",
        copies_total: parseInt(form.copies_total) || 1,
        copies_available: parseInt(form.copies_available) || 1,
        description: form.description || "No description provided",
        cover: form.cover || PLACEHOLDER_IMG,
        pdf_file: form.pdf_file || "",
        audio_file: form.audio_file || ""
      };

      let url, method;
      if (mode === "edit") {
        url = `${API_BASE_URL}/api/book/edit/${editingId}`;
        method = 'PUT';
      } else {
        url = `${API_BASE_URL}/api/book/create`;
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        },
        body: JSON.stringify(bookData)
      });

      if (response.ok) {
        // Refresh the book list
        await fetchBooks();
        
        setSaving(false);
        setOpen(false);

        // Show success toast
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 2000);
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        showError("Session expired. Please log in again.");
        window.location.href = '/login';
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error:", response.status, errorData);
        showError(`Failed to ${mode} book: ${errorData.detail || response.statusText}`);
        setSaving(false);
      }
    } catch (error) {
      console.error('Error saving book:', error);
      showError('Network error. Please try again.');
      setSaving(false);
    }
  };

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showError("Authentication required. Please log in again.");
        window.location.href = '/login';
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/api/book/delete/${pendingDeleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        }
      });

      if (response.ok) {
        // Refresh the book list
        await fetchBooks();
        
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 2000);
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        showError("Session expired. Please log in again.");
        window.location.href = '/login';
      } else {
        const errorData = await response.json().catch(() => ({}));
        showError(`Failed to delete book: ${errorData.detail || response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      showError('Network error. Please try again.');
    } finally {
      setPendingDeleteId(null);
      setConfirmOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <Loader2 className="animate-spin text-sky-600" size={32} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Manage Books</h1>

        {/* Filters */}
        <FilterBarBooks
          queryTitle={queryTitle}
          setQueryTitle={setQueryTitle}
          filterAuthor={filterAuthor}
          setFilterAuthor={setFilterAuthor}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          authors={options.authors}
          categories={options.categories}
          onReset={clearFilters}
        />

        {/* Card – soft shadow */}
        <section className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-medium text-gray-700">Books List</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenCreate}
                className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <Plus size={16} /> Add Book
              </button>
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="py-3 px-4">Book</th>
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 whitespace-nowrap">No of copy</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((b) => (
                    <tr
                      key={b.id}
                      className="border-t last:border-b-0 odd:bg-gray-50 even:bg-white"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.cover || PLACEHOLDER_IMG}
                            alt={b.title}
                            className="h-10 w-10 rounded object-cover bg-gray-100 flex-shrink-0"
                            onError={(e) => {
                              e.target.src = PLACEHOLDER_IMG;
                            }}
                          />
                          <p className="font-semibold text-gray-800 truncate">
                            {b.title}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{b.author}</td>
                      <td className="py-3 px-4 text-gray-700">{b.category}</td>
                      <td className="py-3 px-4 text-gray-700">{b.copies ?? "—"}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onOpenEdit(b)}
                            className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                          >
                            <Pencil size={14} /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => requestDelete(b.id)}
                            className="inline-flex items-center gap-1 rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {pageRows.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 px-4 text-center text-gray-500">
                        No books found with current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Same-to-same pagination design */}
            {filteredRows.length > 0 && (
              <Pagination
                page={tablePage}
                setPage={setTablePage}
                totalItems={filteredRows.length}
                pageSize={PAGE_SIZE}
              />
            )}
          </div>
        </section>
      </main>

      {/* ---------- Add/Edit Book Modal ---------- */}
      {open && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="absolute inset-0 bg-black/50 opacity-0 animate-[fadeIn_.2s_ease-out_forwards]" />
          <div className="absolute inset-0 flex items-start justify-center pt-8 md:pt-12">
            <div
              className="
                w-full max-w-3xl md:max-w-4xl mx-4 rounded-lg bg-white shadow-lg
                opacity-0 translate-y-3 scale-[0.98] animate-[popIn_.22s_ease-out_forwards]
              "
            >
              <div className="px-6 py-4 flex items-center gap-2">
                {mode === "edit" ? (
                  <Pencil size={20} className="text-gray-700" />
                ) : (
                  <Plus size={20} className="text-gray-700" />
                )}
                <h3 className="text-lg font-semibold text-gray-800">
                  {mode === "edit" ? "Edit book" : "Add book"}
                </h3>
              </div>

              <div className="px-6 pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 1) Book */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">Book Title *</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter book title"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      required
                    />
                  </div>

                  {/* 2) Author */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Author *</label>
                    <input
                      name="author"
                      value={form.author}
                      onChange={handleChange}
                      placeholder="Enter author name"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      required
                    />
                  </div>

                  {/* 3) Category ID */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Category ID</label>
                    <input
                      name="category_id"
                      value={form.category_id}
                      onChange={handleChange}
                      placeholder="Category ID (number)"
                      type="number"
                      min="1"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  {/* 4) Format (hidden but included in form) */}
                  <input type="hidden" name="format" value={form.format} />

                  {/* 5) Total Copies */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Total Copies</label>
                    <input
                      name="copies_total"
                      value={form.copies_total}
                      onChange={handleChange}
                      placeholder="Total copies"
                      type="number"
                      min="1"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  {/* 6) Available Copies */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Available Copies</label>
                    <input
                      name="copies_available"
                      value={form.copies_available}
                      onChange={handleChange}
                      placeholder="Available copies"
                      type="number"
                      min="0"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  {/* 7) Cover Image URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">
                      Cover Image URL
                    </label>
                    <input
                      name="cover"
                      value={form.cover}
                      onChange={handleChange}
                      placeholder="https://example.com/cover.jpg"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  {/* 8) PDF File URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">
                      PDF File URL
                    </label>
                    <input
                      name="pdf_file"
                      value={form.pdf_file}
                      onChange={handleChange}
                      placeholder="https://example.com/book.pdf"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  {/* 9) Audio File URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">
                      Audio File URL
                    </label>
                    <input
                      name="audio_file"
                      value={form.audio_file}
                      onChange={handleChange}
                      placeholder="https://example.com/audio.mp3"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  {/* 10) Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Enter book description"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 flex justify-end gap-3 bg-white">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-md px-5 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-70"
                >
                  {mode === "edit" ? (saving ? "Updating…" : "Update") : saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Delete Confirmation Modal ---------- */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) onCloseConfirm();
          }}
        >
          <div className="absolute inset-0 bg-black/50 opacity-0 animate-[fadeIn_.2s_ease-out_forwards]" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg bg-white shadow-lg opacity-0 translate-y-2 animate-[popIn_.2s_ease-out_forwards]">
              <div className="px-6 py-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertTriangle className="text-amber-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Are you sure you want to delete this record?
                    </h3>
                    {pendingDeleteId && (
                      <p className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">
                          {displayed.find((x) => x.id === pendingDeleteId)?.title || "This book"}
                        </span>{" "}
                        will be permanently removed from the list.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-white flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onCloseConfirm}
                  className="rounded-md px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="rounded-md px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved toast (2s) */}
      {savedToast && (
        <div
          className="fixed bottom-6 right-6 z-[60] pointer-events-none animate-[toastIn_.25s_ease-out]"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="pointer-events-auto flex items-start gap-3 rounded-xl bg-white shadow-lg ring-1 ring-black/5 px-4 py-3">
            <div className="mt-0.5">
              <CheckCircle2 className="text-green-600" size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Saved</p>
              <p className="text-xs text-gray-600">Your changes have been updated.</p>
            </div>
          </div>
        </div>
      )}

      {/* Error toast (3s) */}
      {errorToast && (
        <div
          className="fixed bottom-6 right-6 z-[60] pointer-events-none animate-[toastIn_.25s_ease-out]"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="pointer-events-auto flex items-start gap-3 rounded-xl bg-red-50 shadow-lg ring-1 ring-black/5 px-4 py-3">
            <div className="mt-0.5">
              <AlertTriangle className="text-red-600" size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Error</p>
              <p className="text-xs text-gray-600">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* animations */}
      <style>{`
        @keyframes fadeIn { to { opacity: 1 } }
        @keyframes popIn { to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(8px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}