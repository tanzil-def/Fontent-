// src/pages/AuthGate.jsx
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { LogIn, ShieldCheck, BookOpen, Users, Lock } from "lucide-react";

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 p-4 hover:shadow-sm transition">
      <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
}

export default function AuthGate() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Navigate to your login page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1">
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              
              {/* Left Content: Login Info */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium text-sky-700 border-sky-200 bg-sky-50">
                  <ShieldCheck size={16} /> Secure Access
                </span>

                <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Welcome to <span className="text-sky-600">LMS Dashboard</span>
                </h1>

                <p className="mt-4 text-gray-600 text-base sm:text-lg">
                  Your dashboard, borrowed books, progress tracking, and admin tools are protected.
                  Please log in to access your account.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleLogin}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                  >
                    <LogIn size={18} />
                    Log in to LMS
                  </button>

                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                  >
                    <Users size={18} />
                    Create an account
                  </Link>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link to="/login" className="text-sky-600 hover:underline">
                    Go to login
                  </Link>
                </p>
              </div>

              {/* Right Content: Features */}
              <div className="relative">
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Feature
                      icon={<BookOpen size={20} />}
                      title="Access Courses"
                      text="Browse categories, view details, and continue where you left off."
                    />
                    <Feature
                      icon={<Lock size={20} />}
                      title="Protected Content"
                      text="Only authorized users can view library and admin tools."
                    />
                    <Feature
                      icon={<ShieldCheck size={20} />}
                      title="Secure Sessions"
                      text="Your progress and borrowed items are safely stored."
                    />
                    <Feature
                      icon={<Users size={20} />}
                      title="Role-Based Access"
                      text="Member/Admin features unlock automatically on login."
                    />
                  </div>

                  <div className="mt-6 rounded-xl bg-sky-50 border border-sky-100 p-4">
                    <p className="text-sky-800 text-sm">
                      After you log out, you’ll return to this page. Log in again anytime to jump directly to the Home page.
                    </p>
                  </div>
                </div>

                <div className="pointer-events-none absolute -z-10 right-0 top-0 h-40 w-40 rounded-full bg-sky-100 blur-2xl" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
