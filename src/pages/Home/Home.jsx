// import Sidebar from "../../components/Sidebar/Sidebar";
// import Section from "../../components/Section/Section";
// import books from "../../data/sampleBooks";
// import Navbar from "../../components/Navbar/Navbar";
// import BookSlider from "../../components/BookSlider/BookSlider";
// import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
// import NewBookCollections from "../../components/NewBookCollections/NewBookCollections";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50 py-15.5">
//       <Navbar />
      
//       {/* Header Section */}
//       <div className="bg-sky-500 text-white px-4 sm:px-6 lg:px-8 py-4 text-lg sm:text-xl font-semibold">
//         My Library
//       </div>
      
//       {/* Breadcrumb */}
//       <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-2 text-xs text-gray-500">
//         Dashboard / Site Page / My Library
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-4 gap-4">
//         {/* Mobile Sidebar Toggle (if needed) */}
//         <Sidebar />

        
//         {/* Content Area */}
//         <main className="flex-1">
//           <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
//             <Section title="Recommended" books={books.recommended} />
//             <Section title="Popular" books={books.popular} />
//             <NewBookCollections />
//                       <BookSlider />
//           </div>
//         </main>
//       </div>
//             <FeaturedBanner />
//     </div>
//   );
// }

//without API
// import Sidebar from "../../components/Sidebar/Sidebar";
// import Section from "../../components/Section/Section";
// import books from "../../data/sampleBooks";
// import BookSlider from "../../components/BookSlider/BookSlider";
// import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50 py-4">
//       <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm mx-4 sm:mx-6 lg:mx-8">
//         <Section title="Recommended" books={books.recommended} />
//         <Section title="Popular" books={books.popular} />
//         <BookSlider />
//         <FeaturedBanner />
//       </div>
//     </div>
//   );
// }


//API Integration 
import { useEffect, useState } from "react";
import axios from "axios";
import Section from "../../components/Section/Section";
import BookSlider from "../../components/BookSlider/BookSlider";
import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";

export default function Home() {
  const [popularBooks, setPopularBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  // ✅ Transform function for any book
  const transformBook = (book, index) => ({
    id: book.id || index,
    title: book.title || "Untitled",
    author: book.author || book.authors || "Unknown Author",
    image: book.image || book.coverImage || "https://via.placeholder.com/150x220.png?text=No+Cover",
    rating: book.rating || 0,
    ratingCount: book.ratingCount || 0,
    summary: book.summary || "",
    publisher: book.publisher || "",
    publishDate: book.publishDate || "",
    category: book.category || "",
    pdfLink: book.pdfLink || "",
  });

  // ✅ Fetch Recommended
  useEffect(() => {
    axios
      .get("/books.json") // your local mock file or API endpoint
      .then((res) => {
        console.log("✅ Recommended Raw Data:", res.data);
        const recBooks = res.data.slice(0, 4).map(transformBook); // pick 4 for example
        setRecommendedBooks(recBooks);
      })
      .catch((err) => {
        console.error("❌ Recommended error:", err);
      });
  }, []);

  // ✅ Fetch Popular
  useEffect(() => {
    axios
      .get("/books.json") // same file for demo
      .then((res) => {
        console.log("✅ Popular Raw Data:", res.data);
        const popBooks = res.data.slice(4, 8).map(transformBook); // pick next 4
        setPopularBooks(popBooks);
      })
      .catch((err) => {
        console.error("❌ Popular error:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm mx-4 sm:mx-6 lg:mx-8">
        <Section title="Recommended" books={recommendedBooks} />
        <Section title="Popular" books={popularBooks} />
        <BookSlider />
        <FeaturedBanner />
      </div>
    </div>
  );
}

