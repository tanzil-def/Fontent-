// src/pages/Home/Home.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
import BookCard from "../../components/BookCard/BookCard";
import { useNavigate } from "react-router-dom";
import { Filter, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [filter, setFilter] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [books, setBooks] = useState([]);
  const [newCollection, setNewCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const recRowRef = useRef(null);
  const popRowRef = useRef(null);
  const newColRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/book/list", {
          headers: {
            Authorization: "Bearer YOUR_API_TOKEN_HERE",
            Accept: "application/json",
          },
        });
        const data = await res.json();
        setBooks(data || []);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchNewCollection = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/book/new-collection", {
          headers: {
            Authorization: "Bearer YOUR_API_TOKEN_HERE",
            Accept: "application/json",
          },
        });
        const data = await res.json();
        setNewCollection(data || []);
      } catch (err) {
        console.error("Failed to fetch new collection:", err);
      }
    };
    fetchNewCollection();
  }, []);

  // POST function to add new book
  const addBook = async (bookData) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/book/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_API_TOKEN_HERE",
        },
        body: JSON.stringify(bookData),
      });
      if (!res.ok) throw new Error("Failed to save book");
      const savedBook = await res.json();
      setBooks((prev) => [...prev, savedBook]); // Update state so UI shows new book
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  // Serializing books as: Recommended → Popular → New Collection
  const recommended = useMemo(() => books.slice(0, 5), [books]);
  const popular = useMemo(() => books.slice(5, 15), [books]);

  const filtered = useMemo(() => {
    if (!filter) return [];
    if (filter.type === "all") return books;
    if (filter.type === "category") {
      return books.filter(
        (b) => (b.category_id || "").toString() === (filter.value || "")
      );
    }
    return books;
  }, [filter, books]);

  const goTo = (id) => navigate(`/book/${id}`);
  const getStatus = (b) => (b.copies_available > 0 ? "Available" : "Stock Out");

  const scrollByAmount = (node, dir = 1) => {
    if (!node?.current) return;
    const container = node.current;
    const step = Math.min(360, container.clientWidth * 0.8);
    container.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  if (loading) return <div className="p-4 text-center text-gray-600">Loading books...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-7xl w-full flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-4 gap-4">
        <aside className="hidden md:block w-full md:w-64 lg:w-72 flex-none md:sticky md:top-20">
          <Sidebar onSelect={setFilter} />
        </aside>

        <main className="flex-1 min-w-0">
          <div className="md:hidden mb-3">
            <button
              type="button"
              onClick={() => setOpenFilters(true)}
              className="inline-flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 rounded-md"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
            {!filter ? (
              <>
                {/* Recommended */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">Recommended</h2>
                    <div className="hidden sm:flex gap-2">
                      <button onClick={() => scrollByAmount(recRowRef, -1)} className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button onClick={() => scrollByAmount(recRowRef, 1)} className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div ref={recRowRef} className="flex gap-5 p-3 overflow-x-auto no-scrollbar">
                    {recommended.map((b) => (
                      <BookCard key={b.id} book={{ ...b, coverImage: b.cover }} variant="row" status={getStatus(b)} onClick={() => goTo(b.id)} />
                    ))}
                  </div>
                </div>

                {/* Popular */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">Popular</h2>
                    <div className="hidden sm:flex gap-2">
                      <button onClick={() => scrollByAmount(popRowRef, -1)} className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button onClick={() => scrollByAmount(popRowRef, 1)} className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div ref={popRowRef} className="flex gap-5 p-3 overflow-x-auto no-scrollbar">
                    {popular.map((b) => (
                      <BookCard key={b.id} book={{ ...b, coverImage: b.cover }} variant="row" status={getStatus(b)} onClick={() => goTo(b.id)} />
                    ))}
                  </div>
                </div>

                {/* New Collection */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">New Collection</h2>
                    <div className="hidden sm:flex gap-2">
                      <button onClick={() => scrollByAmount(newColRef, -1)} className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button onClick={() => scrollByAmount(newColRef, 1)} className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div ref={newColRef} className="flex gap-5 p-3 overflow-x-auto no-scrollbar">
                    {newCollection.map((b) => (
                      <BookCard key={b.id} book={{ ...b, coverImage: b.cover }} variant="row" status={getStatus(b)} onClick={() => goTo(b.id)} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>
                {filtered.length === 0 ? (
                  <div className="text-gray-500 text-sm">No books found.</div>
                ) : (
                  <div className="flex flex-wrap gap-5">
                    {filtered.map((b) => (
                      <BookCard key={b.id} book={{ ...b, coverImage: b.cover }} variant="grid" size="scroller" status={getStatus(b)} onClick={() => goTo(b.id)} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Featured Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeaturedBanner />
      </div>

      {/* Mobile Sidebar */}
      {openFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setOpenFilters(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-2xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-gray-800">Filters</h3>
              <button aria-label="Close filters" onClick={() => setOpenFilters(false)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <Sidebar
              onSelect={(v) => {
                setFilter(v);
                setOpenFilters(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
