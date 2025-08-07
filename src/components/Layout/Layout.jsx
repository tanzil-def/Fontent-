import { Outlet, useLocation, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Newsletter from "../Newsletter/Newsletter";
import Sidebar from "../Sidebar/Sidebar";

export default function Layout() {
  const location = useLocation();
  const isBookDetailsPage = location.pathname.startsWith("/book/");
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Spacer for fixed navbar height */}
      <div className="pt-16">
        {/* Blue Header Section */}
        <div className="bg-sky-500 text-white px-4 sm:px-6 lg:px-8 py-4 text-lg sm:text-xl font-semibold text-left">
          My Library
        </div>

        {/* Breadcrumb with links */}
        <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-2 text-xs text-gray-600">
          <nav className="space-x-2 text-xs text-gray-600">
  <Link to="/" className="hover:underline text-gray-700">Dashboard</Link>
  <span>/</span>
  <Link to="/site" className="hover:underline text-gray-700">Site Page</Link>
  <span>/</span>
  <Link to="/library" className="hover:underline font-semibold text-gray-700">My Library</Link>
</nav>

        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-6 gap-6">
          {/* Sidebar only on Home or Book Details */}
          {(isHomePage || isBookDetailsPage) && <Sidebar />}

          {/* Main content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>

     {/* Newsletter only on home page */}
      {isHomePage && <Newsletter />}
      <Footer />
    </div>
  );
}
