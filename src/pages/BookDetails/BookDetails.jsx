// src/pages/BookDetails/BookDetails.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, PlayCircle, PauseCircle, Download } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [curTime, setCurTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState("summary");
  const [expandedSummary, setExpandedSummary] = useState(false);
  const audioRef = useRef(null);

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://127.0.0.1:8000/api/book/retrieve/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setBookData(data);

          // fetch related books
          fetchRelatedBooks(data.category_id, data.author);

          // fetch reviews
          fetchReviews(data.id);
        }
      } catch (err) {
        console.error("Error fetching book details:", err);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Related Books
  const fetchRelatedBooks = async (categoryId, author) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/api/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const related = data.filter(
          (b) => (b.category_id === categoryId || b.author === author) && b.id !== parseInt(id)
        ).slice(0, 4);
        setRelatedBooks(related);
      }
    } catch (err) {
      console.error("Error fetching related books:", err);
    }
  };

  // Reviews
  const fetchReviews = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/api/book/${bookId}/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data || []);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // Audio
  const toggleAudio = () => {
    if (!bookData?.audio_file) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const formatTime = (s) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleBorrow = () => {
    localStorage.setItem("borrowNow", JSON.stringify(bookData));
    navigate("/fill-up-form", { state: { borrowNow: bookData } });
  };

  if (!bookData)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading book details...
      </div>
    );

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Cover & Availability */}
        <div className="lg:col-span-1 flex flex-col items-center">
          <div className="w-full max-w-xs border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <img
              src={bookData.cover || "/default-cover.jpg"}
              alt={bookData.title}
              onError={(e) => { e.target.src = "/default-cover.jpg"; }}
              className="w-full h-auto object-contain rounded"
            />
          </div>
          <div className="mt-4 w-full max-w-xs">
            <div className={`text-sm font-medium px-4 py-2 rounded-lg ${
              bookData.copies_available > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {bookData.copies_available > 0 
                ? `${bookData.copies_available} copies available` 
                : "Currently unavailable"}
            </div>
            <button
              onClick={handleBorrow}
              disabled={bookData.copies_available === 0}
              className={`mt-4 w-full py-3 rounded-lg font-semibold ${
                bookData.copies_available > 0 ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {bookData.copies_available > 0 ? "Borrow This Book" : "Not Available"}
            </button>
          </div>
        </div>

        {/* Middle - Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900">{bookData.title}</h1>
          <p className="text-gray-600 mt-2 text-lg">by <span className="text-blue-600 font-medium">{bookData.author}</span></p>
          
          {/* Rating */}
          <div className="flex items-center mt-4">
            {[1,2,3,4,5].map(star => (
              <Star key={star} className={`w-5 h-5 ${star <= Math.floor(bookData.average_rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
            ))}
            <span className="ml-2 text-gray-600">
              {bookData.average_rating > 0 ? bookData.average_rating.toFixed(1) : "No ratings yet"}
            </span>
          </div>

          {/* Audio */}
          {bookData.audio_file && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <button onClick={toggleAudio} className="flex items-center text-blue-600 hover:text-blue-800">
                  {isPlaying ? <PauseCircle className="w-6 h-6 mr-2" /> : <PlayCircle className="w-6 h-6 mr-2" />}
                  Audio Preview
                </button>
                <div className="text-sm text-gray-500">{formatTime(curTime)} / {formatTime(duration)}</div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${duration ? (curTime/duration)*100 : 0}%` }}></div>
              </div>
              <audio
                ref={audioRef}
                src={bookData.audio_file}
                onTimeUpdate={() => setCurTime(audioRef.current?.currentTime || 0)}
                onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          )}

          {/* PDF */}
          {bookData.pdf_file && (
            <div className="mt-4">
              <a href={bookData.pdf_file} download className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">
                <Download className="w-4 h-4 mr-2" /> Download PDF Sample
              </a>
            </div>
          )}

          {/* Tabs */}
          <div className="mt-8 border-b border-gray-200">
            <nav className="flex -mb-px">
              {["summary", "details", "reviews"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab===tab ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab === "summary" ? "Summary" : tab === "details" ? "Book Details" : "Reviews"}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === "summary" && (
              <div>
                <p className="text-gray-700">
                  {expandedSummary ? bookData.description : `${bookData.description.substring(0,200)}...`}
                </p>
                {bookData.description.length > 200 && (
                  <button onClick={() => setExpandedSummary(!expandedSummary)} className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    {expandedSummary ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            )}

            {activeTab === "details" && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-gray-500">Title</p><p className="font-medium">{bookData.title}</p></div>
                <div><p className="text-gray-500">Author</p><p className="font-medium">{bookData.author}</p></div>
                <div><p className="text-gray-500">Format</p><p className="font-medium">{bookData.format?.replace("_"," ")}</p></div>
                <div><p className="text-gray-500">Total Copies</p><p className="font-medium">{bookData.copies_total}</p></div>
                <div><p className="text-gray-500">Available Copies</p><p className="font-medium">{bookData.copies_available}</p></div>
                <div><p className="text-gray-500">Published</p><p className="font-medium">{new Date(bookData.created_at).toLocaleDateString()}</p></div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-sm">No reviews yet.</p>
                ) : (
                  reviews.map(r => (
                    <div key={r.id} className="border-b border-gray-200 py-2">
                      <div className="flex items-center mb-1">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-4 h-4 ${s <= r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                        ))}
                        <span className="ml-2 text-xs text-gray-600">{r.user}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{r.comment}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
