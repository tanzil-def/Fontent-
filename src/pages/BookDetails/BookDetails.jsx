import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  PlayCircle,
  PauseCircle,
  Download,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  User,
  Calendar,
  BookOpen,
  Clock,
  AlertCircle,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Heart,
  Share,
  Bookmark,
  Eye,
  Menu,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const API_BASE = "http://127.0.0.1:8000";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [availability, setAvailability] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [user] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showAudioControls, setShowAudioControls] = useState(false);
  const audioRef = useRef(null);

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        // Fetch book details
        const bookResponse = await fetch(`${API_BASE}/api/book/retrieve/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        if (!bookResponse.ok) throw new Error("Failed to fetch book details");
        const bookData = await bookResponse.json();
        setBook(bookData);
        
        // Fetch availability
        const availabilityResponse = await fetch(`${API_BASE}/api/book/${id}/is_available`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        if (availabilityResponse.ok) {
          const availabilityData = await availabilityResponse.json();
          setAvailability(availabilityData.is_available);
        }
        
        // Fetch reviews
        const reviewsResponse = await fetch(`${API_BASE}/api/reviews/api/review/list/book/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData);
        }
        
        // Fetch related books (by same category)
        const booksResponse = await fetch(`${API_BASE}/api/book/list`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        if (booksResponse.ok) {
          const booksData = await booksResponse.json();
          // Filter books by the same category, excluding current book
          const related = booksData.filter(
            b => b.category_id === bookData.category_id && b.id !== bookData.id
          ).slice(0, 4);
          setRelatedBooks(related);
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookDetails();
  }, [id]);

  // Audio player functions
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    setPlaybackRate(newRate);
    audioRef.current.playbackRate = newRate;
  };

  const skip = (seconds) => {
    audioRef.current.currentTime += seconds;
    setCurrentTime(audioRef.current.currentTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleBorrow = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!user || !user.id) {
        alert("Please login to borrow books");
        navigate("/login");
        return;
      }
      
      const borrowResponse = await fetch(`${API_BASE}/api/borrow/create`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user.id,
          book_id: parseInt(id),
          days: 14
        })
      });
      
      if (borrowResponse.ok) {
        alert("Book borrowed successfully!");
        // Refresh availability status
        const availabilityResponse = await fetch(`${API_BASE}/api/book/${id}/is_available`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        if (availabilityResponse.ok) {
          const availabilityData = await availabilityResponse.json();
          setAvailability(availabilityData.is_available);
        }
      } else {
        const errorData = await borrowResponse.json();
        alert(`Error: ${errorData.detail || "Failed to borrow book"}`);
      }
    } catch (err) {
      alert("Error borrowing book: " + err.message);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStarRating = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Book</h2>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
  
  if (!book) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Book Not Found</h2>
        <button 
          onClick={() => navigate("/books")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse Books
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronDown className="w-5 h-5 mr-1 transform rotate-90" />
            Back
          </button>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
              <Share className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleFavorite}
              className={`p-2 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm text-gray-600">
          <button onClick={() => navigate("/")} className="hover:text-blue-600 transition-colors">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate("/books")} className="hover:text-blue-600 transition-colors">Books</button>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate">{book.title}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Left Column - Book Cover & Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md p-6 flex items-center justify-center">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full max-w-xs h-auto object-contain rounded-lg"
                  />
                </div>
                
                <div className="mt-6 flex flex-col space-y-3">
                  {availability ? (
                    <button
                      onClick={handleBorrow}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center shadow-md"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Borrow This Book
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-300 text-gray-500 font-medium py-3 px-6 rounded-lg cursor-not-allowed flex items-center justify-center"
                    >
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Currently Unavailable
                    </button>
                  )}
                  
                  {book.pdf_file && (
                    <a
                      href={book.pdf_file}
                      download
                      className="flex items-center justify-center text-gray-700 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  )}
                </div>
                
                {/* Book Details */}
                <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Format: <span className="font-medium">{book.format.replace('_', ' ')}</span></span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Published: <span className="font-medium">{formatDate(book.created_at)}</span></span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Last updated: <span className="font-medium">{formatDate(book.updated_at)}</span></span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">Category:</span>
                    <span className="font-medium">{book.category_id}</span>
                  </div>
                </div>
                
                {/* Audio Player */}
                {book.audio_file && (
                  <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        <Volume2 className="w-5 h-5 mr-2 text-blue-600" />
                        Audio Preview
                      </h3>
                      <button 
                        onClick={() => setShowAudioControls(!showAudioControls)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {showAudioControls ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {/* Hidden audio element */}
                    <audio
                      ref={audioRef}
                      src={book.audio_file}
                      preload="metadata"
                    />
                    
                    {/* Basic controls (always visible) */}
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={togglePlayPause}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <PauseCircle className="w-6 h-6" />
                        ) : (
                          <PlayCircle className="w-6 h-6" />
                        )}
                      </button>
                      
                      <div className="flex-1 mx-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={duration || 0}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
                          }}
                        />
                      </div>
                      
                      <button 
                        onClick={toggleMute}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    
                    {/* Advanced controls (collapsible) */}
                    {showAudioControls && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => skip(-10)}
                              className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                              aria-label="Rewind 10 seconds"
                            >
                              <SkipBack className="w-4 h-4" />
                            </button>
                            
                            <button 
                              onClick={() => skip(10)}
                              className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                              aria-label="Forward 10 seconds"
                            >
                              <SkipForward className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={changePlaybackRate}
                            className="text-xs font-medium text-gray-700 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                          >
                            {playbackRate}x
                          </button>
                        </div>
                        
                        <div className="mt-3 flex items-center space-x-2">
                          <span className="text-xs text-gray-600">Volume:</span>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="flex-1 h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #2563eb 0%, #2563eb ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Middle Column - Book Details */}
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row md:items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                  <p className="text-xl text-gray-600 mt-1">by {book.author}</p>
                  
                  <div className="flex items-center mt-4">
                    {renderStarRating(Math.floor(book.average_rating))}
                    <span className="ml-2 text-gray-600">
                      {book.average_rating.toFixed(1)} ({reviews.length} reviews)
                    </span>
                  </div>
                </div>
                
                {/* Availability Status */}
                <div className={`mt-4 md:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {availability ? `${book.copies_available} copies available` : 'Currently unavailable'}
                </div>
              </div>
              
              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                <div className="mt-2 relative">
                  <p className={`text-gray-700 ${showFullDescription ? '' : 'line-clamp-3'}`}>
                    {book.description}
                  </p>
                  {book.description.length > 200 && (
                    <button 
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                    >
                      {showFullDescription ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              </div>
              
              {/* Tabs */}
              <div className="mt-8 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {['description', 'details', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700">{book.description}</p>
                  </div>
                )}
                
                {activeTab === 'details' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Total Copies</h4>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{book.copies_total}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Available Copies</h4>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{book.copies_available}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Format</h4>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{book.format.replace('_', ' ')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Category ID</h4>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{book.category_id}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Added Date</h4>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{formatDate(book.created_at)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{formatDate(book.updated_at)}</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Write a Review
                      </button>
                    </div>
                    
                    {reviews.length === 0 ? (
                      <div className="mt-6 text-center py-8 bg-gray-50 rounded-lg">
                        <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No reviews yet for this book.</p>
                        <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Be the first to review
                        </button>
                      </div>
                    ) : (
                      <div className="mt-6 space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-blue-600" />
                                </div>
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center">
                                  <h4 className="text-sm font-bold text-gray-900">
                                    {review.user_name || "Anonymous"}
                                  </h4>
                                  {review.verified && (
                                    <CheckCircle2 className="w-4 h-4 text-green-500 ml-1" />
                                  )}
                                </div>
                                <div className="flex items-center mt-1">
                                  {renderStarRating(review.rating)}
                                  <span className="ml-2 text-xs text-gray-500">
                                    {new Date(review.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="mt-2 text-gray-700">{review.comment}</p>
                                
                                <div className="mt-3 flex items-center space-x-4">
                                  <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                                    <ThumbsUp className="w-3 h-3 mr-1" />
                                    Helpful ({review.helpful_count || 0})
                                  </button>
                                  <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                                    <ThumbsDown className="w-3 h-3 mr-1" />
                                    Not Helpful ({review.not_helpful_count || 0})
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <div 
                  key={relatedBook.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
                  onClick={() => navigate(`/book/${relatedBook.id}`)}
                >
                  <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={relatedBook.cover}
                      alt={relatedBook.title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-1">{relatedBook.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{relatedBook.author}</p>
                    <div className="flex items-center mt-2">
                      {renderStarRating(Math.floor(relatedBook.average_rating))}
                      <span className="text-xs text-gray-600 ml-1">
                        {relatedBook.average_rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {relatedBook.copies_available} of {relatedBook.copies_total} available
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 py-6 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Digital Library. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BookDetails;