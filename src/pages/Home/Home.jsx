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


import Sidebar from "../../components/Sidebar/Sidebar";
import Section from "../../components/Section/Section";
import books from "../../data/sampleBooks";
import BookSlider from "../../components/BookSlider/BookSlider";
import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm mx-4 sm:mx-6 lg:mx-8">
        <Section title="Recommended" books={books.recommended} />
        <Section title="Popular" books={books.popular} />
        <BookSlider />
        <FeaturedBanner />
      </div>
    </div>
  );
}
