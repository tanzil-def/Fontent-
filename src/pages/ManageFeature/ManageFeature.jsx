import { useEffect, useMemo, useState } from "react";
import {
  RefreshCcw,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Search,
  Filter,
} from "lucide-react";
import Sidebar from "../../components/DashboardSidebar/DashboardSidebar";
import Pagination from "../../components/Pagination/Pagination";

const API_BASE = "http://127.0.0.1:8000";

function Switch({ checked, onChange, disabled }) {
  return (
    <label className="inline-flex items-center select-none cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={!!checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span
        className={`
          w-10 h-5 rounded-full transition-colors
          ${checked ? "bg-green-600" : "bg-gray-300"}
          relative after:content-[''] after:absolute after:top-0.5 after:left-0.5
          after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-md after:transition-transform
          ${checked ? "after:translate-x-5" : ""}
        `}
      />
    </label>
  );
}

const normalizeFeatured = (item) => ({
  featuredId: String(item.id),
  bookId: String(item.book_id),
  title: item.title || "Untitled",
  author: item.author || "Unknown",
  category: item.category || "General",
  cover: item.cover || "/placeholder_book.jpg",
});

export default function ManageFeature() {
  useEffect(() => {
    document.title = "Manage Featured Books";
  }, []);

  const [loading, setLoading] = useState(false);
  const [featured, setFeatured] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("all");
  const [pendingById, setPendingById] = useState({});
  const [confirm, setConfirm] = useState({ open: false, book: null });
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2000);
  };

  const fetchFeatured = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/featured/?skip=0&limit=100`);
      const data = await response.json();
      setFeatured(data.map(normalizeFeatured));
    } catch (e) {
      showToast("Failed to load featured books");
    } finally {
      setLoading(false);
    }
  };

  const fetchCatalog = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/book/list`);
      const data = await response.json();
      setCatalog(
        data.map((b) => ({
          id: String(b.id),
          title: b.title,
          author: b.author,
          category: b.category_id || "General",
          cover: b.cover || "/placeholder_book.jpg",
        }))
      );
    } catch (e) {
      showToast("Failed to load catalog");
    }
  };

  useEffect(() => {
    fetchFeatured();
    fetchCatalog();
  }, []);

  const featuredMap = useMemo(() => {
    const map = new Map();
    featured.forEach((item) => map.set(item.bookId, item));
    return map;
  }, [featured]);

  const filteredCatalog = useMemo(() => {
    const q = search.toLowerCase();
    const list = catalog.filter(
      (b) =>
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
    if (view === "checked") return list.filter((b) => featuredMap.has(b.id));
    if (view === "unchecked") return list.filter((b) => !featuredMap.has(b.id));
    return list;
  }, [catalog, search, view, featuredMap]);

  useEffect(() => setPage(1), [search, view]);

  const pageItems = filteredCatalog.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const setPending = (id, v) => setPendingById((prev) => ({ ...prev, [id]: v }));

  const addFeatured = async (book) => {
    setPending(book.id, true);
    try {
      const res = await fetch(`${API_BASE}/api/featured/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ book_id: book.id }),
      });
      if (res.ok) {
        showToast("Book added to featured");
        fetchFeatured();
      } else {
        showToast("Failed to add book");
      }
    } catch {
      showToast("Failed to add book");
    } finally {
      setPending(book.id, false);
    }
  };

  const removeFeatured = async (featuredId) => {
    try {
      const res = await fetch(`${API_BASE}/api/featured/${featuredId}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Removed from featured");
        fetchFeatured();
      } else {
        showToast("Failed to remove book");
      }
    } catch {
      showToast("Failed to remove book");
    }
  };

  const askRemove = (book) => {
    const f = featuredMap.get(book.id);
    if (f) setConfirm({ open: true, book: f });
  };

  const confirmRemove = () => {
    if (confirm.book) removeFeatured(confirm.book.featuredId);
    setConfirm({ open: false, book: null });
  };

  const cancelRemove = () => setConfirm({ open: false, book: null });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Featured Books</h1>
          <button
            onClick={() => {
              fetchFeatured();
              fetchCatalog();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <RefreshCcw size={16} />}
            Refresh
          </button>
        </div>

        <div className="flex gap-4 mb-4 flex-col md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {["all", "checked", "unchecked"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  view === v ? "bg-gray-200 font-semibold" : "bg-white"
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pageItems.map((book) => {
            const isFeatured = featuredMap.has(book.id);
            const pending = !!pendingById[book.id];

            return (
              <div
                key={book.id}
                className={`border rounded-lg p-4 cursor-pointer transition hover:shadow-lg ${
                  isFeatured ? "bg-green-50 border-green-300" : "bg-white border-gray-200"
                }`}
              >
                <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center mb-3">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-full w-auto object-contain"
                    onError={(e) => (e.target.src = "/placeholder_book.jpg")}
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">{book.title}</h3>
                <p className="text-xs text-gray-600">{book.author}</p>
                <p className="text-xs text-gray-500 mb-2">{book.category}</p>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ring-1 ${
                      isFeatured ? "bg-green-100 text-green-700 ring-green-300" : "bg-red-100 text-red-700 ring-red-300"
                    }`}
                  >
                    {isFeatured ? "Checked" : "Unchecked"}
                  </span>
                  <Switch
                    checked={isFeatured}
                    disabled={pending}
                    onChange={(checked) => {
                      if (checked) addFeatured(book);
                      else askRemove(book);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {pageItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">No books found.</div>
        )}

        {filteredCatalog.length > PAGE_SIZE && (
          <Pagination
            page={page}
            setPage={setPage}
            totalItems={filteredCatalog.length}
            pageSize={PAGE_SIZE}
            className="mt-6"
          />
        )}

        {/* Confirm Modal */}
        {confirm.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-amber-500" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Remove from Featured?</h3>
                  <p className="text-sm text-gray-600">{confirm.book.title}</p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={cancelRemove} className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200">
                  Cancel
                </button>
                <button
                  onClick={confirmRemove}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast.show && (
          <div className="fixed bottom-6 right-6 z-50 bg-white p-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
            <CheckCircle2 className="text-green-500" size={20} />
            <span className="text-sm text-gray-700">{toast.msg}</span>
          </div>
        )}
      </main>
    </div>
  );
}