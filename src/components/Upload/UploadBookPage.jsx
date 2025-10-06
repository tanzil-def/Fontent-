// UploadBookPage.jsx
import { useState } from "react";
import {
  Image as ImageIcon,
  FileText,
  FileAudio,
  Loader2,
  CheckCircle2,
  PartyPopper,
  X,
  HandHeart,
} from "lucide-react";
import UserSidebar from "../UserSidebar/UserSidebar";
import api from "../../api"; // Fixed import path - removed /src

export default function UploadBookPage() {
  const initialBookData = {
    title: "",
    author: "",
    mainCategory: "",
    quantity: "",
    description: "",
    bsEmail: "",
    bsIdNo: "",
    bookIdNo: "",
  };

  const [bookData, setBookData] = useState(initialBookData);
  const [coverPreview, setCoverPreview] = useState(null);
  const [pdfSelected, setPdfSelected] = useState(false);
  const [audioSelected, setAudioSelected] = useState(false);
  const [loadingCover, setLoadingCover] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [files, setFiles] = useState({
    cover: null,
    pdf: null,
    audio: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const simulateDelay = (ms = 3000) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // ==== Upload logic ====
  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoadingCover(true);
    setFiles((prev) => ({ ...prev, cover: file }));
    await simulateDelay(3000);
    const url = URL.createObjectURL(file);
    setCoverPreview(url);
    setLoadingCover(false);
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoadingPDF(true);
    setFiles((prev) => ({ ...prev, pdf: file }));
    await simulateDelay(3000);
    setPdfSelected(true);
    setLoadingPDF(false);
  };

  const handleAudioUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoadingAudio(true);
    setFiles((prev) => ({ ...prev, audio: file }));
    await simulateDelay(3000);
    setAudioSelected(true);
    setLoadingAudio(false);
  };

  const resetForm = () => {
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setBookData(initialBookData);
    setFiles({ cover: null, pdf: null, audio: null });
    setCoverPreview(null);
    setPdfSelected(false);
    setAudioSelected(false);
    setLoadingCover(false);
    setLoadingPDF(false);
    setLoadingAudio(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare form data for file upload
      const formData = new FormData();
      formData.append("user_id", bookData.bsIdNo.replace("BS-", "") || 2);
      formData.append("book_title", bookData.title);
      formData.append("author", bookData.author);
      formData.append("isbn", bookData.bookIdNo || "N/A");
      formData.append("notes", `Category: ${bookData.mainCategory}, Quantity: ${bookData.quantity}, BS Email: ${bookData.bsEmail}, Description: ${bookData.description}`);

      // Append files if they exist
      if (files.cover) formData.append("cover", files.cover);
      if (files.pdf) formData.append("pdf", files.pdf);
      if (files.audio) formData.append("audio", files.audio);

      console.log("Submitting form data with files:");
      console.log("Cover file:", files.cover?.name);
      console.log("PDF file:", files.pdf?.name);
      console.log("Audio file:", files.audio?.name);

      // Axios POST with multipart/form-data
      const response = await api.post("/donations/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Donation created:", response.data);

      // Save to local storage (optional)
      try {
        const history = JSON.parse(localStorage.getItem("donationHistory") || "[]");
        history.push({ 
          ...bookData, 
          files: {
            cover: files.cover?.name || null,
            pdf: files.pdf?.name || null,
            audio: files.audio?.name || null,
          }, 
          apiResponse: response.data, 
          createdAt: new Date().toISOString() 
        });
        localStorage.setItem("donationHistory", JSON.stringify(history));
      } catch (storageError) {
        console.warn("Could not save to local storage:", storageError);
      }

      // Show success popup + reset
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        resetForm();
        setSubmitting(false);
      }, 2500);

    } catch (error) {
      console.error("Submit error:", error);
      setSubmitting(false);
      
      let errorMessage = "An unexpected error occurred. Please try again.";
      
      if (error.response) {
        console.error("API Error Response:", error.response.data);
        
        if (error.response.status === 422) {
          const details = error.response.data.detail;
          if (Array.isArray(details)) {
            errorMessage = details.map(err => 
              `Field: ${err.loc.join('.')}, Error: ${err.msg}`
            ).join('\n');
          } else {
            errorMessage = "Validation failed. Please check your input.";
          }
        } else if (error.response.status === 401) {
          errorMessage = "Authentication failed. Please log in again.";
        } else if (error.response.status === 400) {
          errorMessage = "Bad request. Please check your input data.";
        } else {
          errorMessage = `Server error (${error.response.status}). Please try again later.`;
        }
      } else if (error.request) {
        console.error("Network Error:", error.request);
        errorMessage = "Network error: Please check your connection and try again.";
      } else {
        console.error("Error:", error.message);
      }
      
      alert(errorMessage);
    }
  };

  // Stepper states
  const detailsComplete = Boolean(String(bookData.bsIdNo || "").trim().length > 0);
  const uploadsComplete = Boolean(audioSelected); // Audio is required for step 2 completion

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                <HandHeart className="text-sky-500" size={24} />
                Donation Book
              </h1>
            </div>
            <p className="text-sm text-gray-600 mb-8">
              Fill in the details below to add a new book to the library database.
            </p>
          </div>

          {/* Stepper */}
          <div className="mt-6">
            <div className="flex items-center gap-3 text-[10px] sm:text-xs">
              {/* Step 1 */}
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sky-600 text-white grid place-items-center font-semibold">
                  1
                </span>
                <span className="font-medium text-gray-800">Book Details</span>
              </div>

              {/* Line 1 */}
              <div className="relative flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    detailsComplete ? "w-full bg-sky-500" : "w-0 bg-sky-500"
                  }`}
                />
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full grid place-items-center font-semibold text-white transition-colors ${
                    detailsComplete
                      ? uploadsComplete
                        ? "bg-sky-600"
                        : "bg-rose-600"
                      : "bg-gray-300"
                  }`}
                >
                  2
                </span>
                <span
                  className={`font-medium transition-colors ${
                    detailsComplete
                      ? uploadsComplete
                        ? "text-gray-800"
                        : "text-rose-600"
                      : "text-gray-400"
                  }`}
                >
                  Upload Files
                </span>
              </div>

              {/* Line 2 */}
              <div className="relative flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    uploadsComplete ? "w-full bg-sky-500" : "w-0 bg-sky-500"
                  }`}
                />
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full grid place-items-center font-semibold text-white transition-colors ${
                    uploadsComplete ? "bg-sky-600" : "bg-gray-300"
                  }`}
                >
                  3
                </span>
                <span
                  className={`font-medium ${
                    uploadsComplete ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  Review & Confirm
                </span>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT SECTION — Book Details */}
              <div className="space-y-4 bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-800">Book Details</h2>
                  <div className="hidden sm:flex items-center gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 text-sky-700 px-2 py-0.5">
                      <ImageIcon size={12} />
                      Cover
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-700 px-2 py-0.5">
                      <FileText size={12} />
                      PDF
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5">
                      <FileAudio size={12} />
                      Audio
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Book Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Book Title"
                    value={bookData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category / Genre
                    </label>
                    <input
                      type="text"
                      name="mainCategory"
                      placeholder="e.g., Software Engineering"
                      value={bookData.mainCategory}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity Available
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      name="quantity"
                      placeholder="e.g., 3"
                      value={bookData.quantity}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    placeholder="e.g., Author Name"
                    value={bookData.author}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                {/* BS Email & BS ID No */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      BS Email
                    </label>
                    <input
                      type="email"
                      name="bsEmail"
                      placeholder="e.g., user@brainstation-23.com"
                      value={bookData.bsEmail}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      BS ID No <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="bsIdNo"
                      placeholder="e.g., BS-0000"
                      value={bookData.bsIdNo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                    <p
                      className={`mt-1 text-xs ${
                        detailsComplete ? "text-sky-600" : "text-gray-400"
                      }`}
                    >
                      {detailsComplete
                        ? "Step 1 completed ✓"
                        : "Fill BS ID No to complete Step 1"}
                    </p>
                  </div>
                </div>

                {/* Book ID No */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Book ID No
                  </label>
                  <input
                    type="text"
                    name="bookIdNo"
                    placeholder="e.g., BK-000123"
                    value={bookData.bookIdNo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Description <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <span className="text-xs text-gray-400">
                      {bookData.description?.length || 0}/600
                    </span>
                  </div>
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Add a short summary, edition info, condition notes, etc."
                    value={bookData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    maxLength={600}
                  />
                </div>
              </div>

              {/* RIGHT SECTION — Upload Files */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 space-y-4">
                  <h2 className="text-sm font-semibold text-gray-800">Upload Files</h2>

                  {/* Cover Image Upload */}
                  <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center space-y-3">
                    <p className="text-sm text-gray-700 font-medium">Cover image upload</p>

                    {!coverPreview && !loadingCover && (
                      <p className="text-sm text-gray-600">
                        Drag & Drop or{" "}
                        <label className="text-sky-600 underline cursor-pointer">
                          Choose image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverUpload}
                            className="hidden"
                          />
                        </label>{" "}
                        <span className="text-gray-400">(JPG/PNG)</span>
                      </p>
                    )}

                    {loadingCover && (
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Loader2 className="animate-spin" size={18} />
                        <span className="text-sm">Uploading cover…</span>
                      </div>
                    )}

                    {coverPreview && !loadingCover && (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={coverPreview}
                          alt="Cover preview"
                          className="w-28 h-36 object-cover rounded shadow"
                        />
                        <div className="flex items-center gap-2 text-gray-700">
                          <ImageIcon size={18} />
                          <span className="text-sm">Image uploaded</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PDF File Upload */}
                  <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center space-y-3">
                    <p className="text-sm text-gray-700 font-medium">PDF file upload</p>

                    {!pdfSelected && !loadingPDF && (
                      <p className="text-sm text-gray-600">
                        Drag & Drop or{" "}
                        <label className="text-sky-600 underline cursor-pointer">
                          Choose PDF
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={handlePDFUpload}
                            className="hidden"
                          />
                        </label>{" "}
                        <span className="text-gray-400">(Max ~50MB)</span>
                      </p>
                    )}

                    {loadingPDF && (
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Loader2 className="animate-spin" size={18} />
                        <span className="text-sm">Uploading PDF…</span>
                      </div>
                    )}

                    {pdfSelected && !loadingPDF && (
                      <div className="flex flex-col items-center gap-2 text-gray-700">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100">
                          <FileText className="text-rose-600" size={28} />
                        </span>
                        <span className="text-sm font-medium text-rose-700">
                          PDF uploaded {files?.pdf?.name ? `• ${files.pdf.name}` : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Audio Clip Upload (completes Step 2) */}
                  <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center space-y-3">
                    <p className="text-sm text-gray-700 font-medium">
                      Audio clip upload <span className="text-rose-500">*</span>
                    </p>

                    {!audioSelected && !loadingAudio && (
                      <p className="text-sm text-gray-600">
                        Drag & Drop or{" "}
                        <label className="text-sky-600 underline cursor-pointer">
                          Choose audio
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={handleAudioUpload}
                            className="hidden"
                          />
                        </label>{" "}
                        <span className="text-gray-400">(MP3/WAV)</span>
                      </p>
                    )}

                    {loadingAudio && (
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Loader2 className="animate-spin" size={18} />
                        <span className="text-sm">Uploading audio…</span>
                      </div>
                    )}

                    {audioSelected && !loadingAudio && (
                      <div className="flex flex-col items-center gap-2 text-gray-700">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100">
                          <FileAudio className="text-indigo-600" size={28} />
                        </span>
                        <span className="text-sm font-medium text-indigo-700">
                          Audio uploaded {files?.audio?.name ? `• ${files.audio.name}` : ""}
                        </span>
                        <p className="text-xs text-sky-600">Step 2 completed ✓</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md"
                      onClick={resetForm}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2"
                      disabled={submitting || !detailsComplete || !uploadsComplete}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Submitting...
                        </>
                      ) : (
                        "Confirm Book"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Donation Guidelines */}
          <div className="mt-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Donation Guidelines
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-emerald-700">Include (Good to Have)</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Original, legally shareable content you own or have rights to donate.</li>
                    <li>Clear title, author, category/genre, and approximate quantity.</li>
                    <li>Short description (edition, language, condition, highlights).</li>
                    <li>High-quality cover image (JPG/PNG) for catalog visibility.</li>
                    <li>Optional PDF and/or short audio sample (intro, synopsis, author note).</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-rose-700">Do Not Include</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Pirated or copyrighted material without explicit permission.</li>
                    <li>Broken files, password-protected PDFs, or corrupted audio.</li>
                    <li>Offensive or illegal content.</li>
                    <li>Blurry/low-resolution covers that make the book hard to identify.</li>
                    <li>Personal data inside files (IDs, phone numbers, addresses, etc.).</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                By submitting, you confirm the content complies with all applicable laws and you have
                the right to donate and distribute it.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Animated Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 animate-fade-in" />

          {/* Card */}
          <div
            className="
              relative z-10 w-[92%] sm:w-[86%] md:w-[90%] max-w-md rounded-2xl bg-white shadow-xl
              px-6 py-8 text-center
              transition-all duration-300 ease-out
              opacity-100 scale-100
              animate-[pop_0.28s_ease-out]
            "
          >
            <button
              className="absolute right-3 top-3 p-1 rounded-full hover:bg-gray-100"
              onClick={() => setShowSuccess(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="mx-auto mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100">
              <CheckCircle2 className="text-emerald-600" size={36} />
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
              Book Uploaded Successfully
              <PartyPopper className="text-amber-500 animate-bounce" size={20} />
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Your book information and files have been recorded.
            </p>
          </div>

          {/* Tiny CSS keyframes for pop + backdrop fade */}
          <style>{`
            @keyframes pop {
              0% { transform: scale(0.9); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            .animate-fade-in {
              animation: fade-in 0.25s ease-out forwards;
            }
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}