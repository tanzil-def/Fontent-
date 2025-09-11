// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";

// Pages
import Home from "./pages/Home/Home";
import BookDetails from "./pages/BookDetails/BookDetails";
import Borrowed from "./pages/Borrowed/Borrowed";
import FillUpForm from "./components/FillUpForm/FillUpForm";
import Dashboard from "./pages/Dashboad/Dashboad";
import UploadBookPage from "./components/Upload/UploadBookPage";
import AllGenres from "./pages/AllGenres/AllGenres";
import ManageBooks from "./pages/ManageBooks/ManageBooks";
import ManageCategory from "./pages/ManageCategory/ManageCategory";
import UserDashboard from "./pages/user/UserDashboard";
import MyLoansBlank from "./pages/MyLoansBlank/MyLoansBlank";
import UserSettings from "./pages/UserSettings/UserSettings";
import UserHistory from "./pages/UserHistory/UserHistory";
import AdminSettings from "./pages/AdminSettings/AdminSettings";
import ManageFeature from "./pages/ManageFeature/ManageFeature";
import DonationRequest from "./pages/DonationRequest/DonationRequest";
import CalendarPage from "./pages/Calendar/CalendarPage";

// Auth
import AuthGate from "./pages/AuthGate/AuthGate";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Layout wrapper */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/borrowed" element={<Borrowed />} />
            <Route path="/fill-up-form" element={<FillUpForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadBookPage />} />
            <Route path="/all-genres" element={<AllGenres />} />
            <Route path="/manage-books" element={<ManageBooks />} />
            <Route path="/manage-category" element={<ManageCategory />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/loans" element={<MyLoansBlank />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/history" element={<UserHistory />} />
            <Route path="/setting" element={<AdminSettings />} />
            <Route path="/manage-feature" element={<ManageFeature />} />
            <Route path="/donation-request" element={<DonationRequest />} />
            <Route path="/authgate" element={<AuthGate />} />
            <Route path="/calendar" element={<CalendarPage />} />

            {/* Redirect unknown paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
