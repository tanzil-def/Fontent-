import { Bell, Download, MessageSquare, Search, Upload, UserCircle } from "lucide-react";
import { CgMenuGridR } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Container with max-width and centered content */}
      <div className="flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 h-16">
        {/* Left side: Logo + App Grid icon */}
        <div className="flex items-center h-full">
          <Link to="/" className="flex items-center h-full">
            <img
              src="/BSlogo-removebg-preview.png"
              alt="Logo"
              className="h-[80] w-auto max-h-[120px] object-contain cursor-pointer px-15"
            />
          </Link>

          {/* Official grid menu icon from react-icons */}
          <CgMenuGridR className="w-6 h-6 text-gray-500 cursor-pointer" />
        </div>

        {/* Right side: Upload button + icons */}
        <div className="flex items-center gap-3 sm:gap-4 h-full">
          <Link
            to="/upload"
            className="flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full text-sm sm:text-base"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Bell className="w-5 h-5 text-gray-700 cursor-pointer" />
            <MessageSquare className="w-5 h-5 text-gray-700 cursor-pointer" />
            <Search className="w-5 h-5 text-gray-700 cursor-pointer" />
            <UserCircle className="w-6 h-6 text-gray-700 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
}