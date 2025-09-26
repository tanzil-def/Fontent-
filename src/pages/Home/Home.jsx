// src/pages/Home/Home.jsx
import { useMemo, useRef, useState, useEffect, forwardRef } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
import BookCard from "../../components/BookCard/BookCard";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import api from "../../api";

// Normalize book data
const normalizeBookData = (book) => ({
  id: book.id,
  title: book.title,
  author: book.author,
  coverImage: book.cover || book.cover_image || book.image,
  category: typeof book.category === "string" 
              ? book.category 
              : book.category?.name || "uncategorized",
  audioFile: book.audio_file,
  pdfFile: book.pdf_file,
  rating: book.average_rating || 0,
  status: book.copies_available > 0 ? "Available" : "Stock Out",
  stock: book.copies_available,
 
});

export default function Home() {
  const [filter, setFilter] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const navigate = useNavigate();

  // API states
  const [recommended, setRecommended] = useState([]);
  const [popular, setPopular] = useState([]);
  const [newBookCollections, setNewBookCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const recRowRef = useRef(null);
  const popRowRef = useRef(null);
  const newColRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const [recRes, popRes, newRes] = await Promise.all([
          api.get("/book/recommended-books"),
          api.get("/book/popular-books"),
          api.get("/book/new-collection"),
        ]);
        setRecommended((recRes.data || []).map(normalizeBookData));
        setPopular((popRes.data || []).map(normalizeBookData));
        setNewBookCollections((newRes.data || []).map(normalizeBookData));
      } catch (err) {
        console.error("Failed to fetch books:", err);
        setErrorMsg("Failed to load book data.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const allBooks = useMemo(() => [...recommended, ...popular, ...newBookCollections], [recommended, popular, newBookCollections]);


  const filtered = useMemo(() => {
  if (!filter) return [];
  if (filter.type === "all") return allBooks;
  if (filter.type === "category") 
    return allBooks.filter(b => ((b.category?.name || "")).toLowerCase() === (filter.value || "").toLowerCase());
  if (filter.type === "subcategory") 
    return allBooks.filter(b => ((b.category?.name || "")).toLowerCase() === (filter.parent || "").toLowerCase());
  return allBooks;
}, [filter, allBooks]);


  const getStatus = (b) => {
    const raw = (b.status || b.stock || "").toString().trim().toLowerCase();
    if (raw === "available") return "Available";
    if (raw === "stock out" || raw === "out of stock" || raw === "out") return "Stock Out";
    if (raw === "upcoming" || raw === "coming soon") return "Upcoming";
    if ((b.title || "").toLowerCase().includes("empire")) return "Stock Out";
    return "Available";
  };

  const goTo = (id) => navigate(`/book/${id}`);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p>Loading books...</p></div>;
  if (errorMsg) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-500"><p>{errorMsg}</p></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl w-full flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-4 gap-4">
        <aside className="hidden md:block w-full md:w-64 lg:w-72 flex-none md:sticky md:top-20">
          <Sidebar onSelect={setFilter} />
        </aside>

        <main className="flex-1 min-w-0">
          {/* Mobile filter button */}
          <div className="md:hidden mb-3">
            <button type="button" onClick={() => setOpenFilters(true)} className="inline-flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 rounded-md">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
            {!filter ? (
              <>
                {recommended.length > 0 && <CollectionBox title="Recommended" books={recommended} ref={recRowRef} goTo={goTo} getStatus={getStatus} />}
                {popular.length > 0 && <CollectionBox title="Popular" books={popular} ref={popRowRef} goTo={goTo} getStatus={getStatus} />}
                {newBookCollections.length > 0 && <CollectionBox title="New Collection" books={newBookCollections} ref={newColRef} goTo={goTo} getStatus={getStatus} />}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Showing results for:{" "}
                    <span className="text-sky-600">{filter.type === "subcategory" ? `${filter.parent} → ${filter.value}` : filter.value || "All"}</span>
                  </h2>
                  <button onClick={() => setFilter(null)} className="text-sm text-gray-600 hover:text-sky-600">Clear</button>
                </div>

                {filtered.length === 0 ? (
                  <div className="text-gray-500 text-sm">No books found.</div>
                ) : (
                  <div className="flex flex-wrap gap-5">
                    {filtered.map((b) => (
                      <BookCard key={b.id} book={{ ...b, coverImage: b.coverImage || b.image }} variant="grid" size="scroller" status={getStatus(b)} onClick={() => goTo(b.id)} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Featured Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeaturedBanner />
      </div>

      {/* Mobile sidebar */}
      {openFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setOpenFilters(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-2xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text_base font-semibold text-gray-800">Filters</h3>
              <button aria-label="Close filters" onClick={() => setOpenFilters(false)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <Sidebar onSelect={(v) => { setFilter(v); setOpenFilters(false); }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ----- CollectionBox with working scroll -----
const CollectionBox = forwardRef(({ title, books, goTo, getStatus }, ref) => {
  const scrollRef = ref || useRef(null);

  const scrollByAmount = (dir = 1) => {
    if (!scrollRef.current) return;
    const step = 220 * 3; // approx 3 books
    scrollRef.current.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div className="mb-8 rounded-lg border border-gray-300 overflow-hidden relative">
      <div className="px-4 py-3 bg-white flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h2>
        {/* Desktop buttons */}
        <div className="hidden sm:flex gap-2">
          <button onClick={() => scrollByAmount(-1)} className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={() => scrollByAmount(1)} className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <div ref={scrollRef} className="overflow-x-auto flex gap-5 p-3 sm:p-4 snap-x snap-mandatory scroll-smooth">
        {books.map((b) => (
          <BookCard key={b.id} book={{ ...b, coverImage: b.coverImage || b.image }} variant="row" status={getStatus(b)} onClick={() => goTo(b.id)} className="flex-shrink-0 w-[200px]" />
        ))}
      </div>

      {/* Mobile buttons */}
      <div className="sm:hidden absolute inset-y-0 left-1 flex items-center">
        <button onClick={() => scrollByAmount(-1)} className="p-2 rounded-md border border-gray-300 bg-white/90 hover:bg-white shadow"><ChevronLeft className="w-4 h-4" /></button>
      </div>
      <div className="sm:hidden absolute inset-y-0 right-1 flex items-center">
        <button onClick={() => scrollByAmount(1)} className="p-2 rounded-md border border-gray-300 bg-white/90 hover:bg-white shadow"><ChevronRight className="w-4 h-4" /></button>
      </div>
    </div>
  );
});
