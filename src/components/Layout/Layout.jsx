

// components/Layout/Layout.jsx
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
  <div className="bg-sky-500 text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-4 sm:py-6">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">
          My Library
        </h1>
      </div>
    </div>
  </div>

  {/* Breadcrumb with links */}
  <div className="bg-gray-100 border-b border-gray-200">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="flex items-center py-2 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 sm:space-x-2">
          <li>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-sky-600 hover:underline transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <Link
              to="/"
              className="text-gray-600 hover:text-sky-600 hover:underline transition-colors"
            >
              Site Page
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <Link
              to="/all-genres"
              className="font-medium text-gray-900 hover:text-sky-600 hover:underline transition-colors"
            >
              My Library
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  </div>

  {/* Main Content Layout */}
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar appears ONLY on Book Details here (Home renders its own) */}
      {isBookDetailsPage && (
        <aside className="w-full md:w-64 lg:w-72 flex-none">
          <Sidebar />
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  </div>
</div>


      {/* Newsletter only on home page */}
      {isHomePage && <Newsletter />}
      <Footer />
    </div>
  );
}
