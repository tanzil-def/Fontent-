// ManageCategory.jsx

import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Upload,
  Users,
  BookOpen,
  HelpCircle,
  LogOut,
  Layers,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertTriangle, // NEW: for delete confirm
} from "lucide-react";
import sectionedBooks from "../../data/sampleBooks";
import Sidebar from "../../components/DashboardSidebar/DashboardSidebar";
import api from "../../api"; // NEW: import API

// seed (only used if no categories found) — status removed
const seedCategories = [
  { id: 1, name: "Web Design", slug: "web-design" },
  { id: 2, name: "Web Development", slug: "web-development" },
  { id: 3, name: "Programming", slug: "programming" },
  { id: 4, name: "Commerce", slug: "commerce" },
];

// helper: slugify category names
const slugify = (s = "") =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function ManageCategory() {
  useEffect(() => {
    document.title = "Manage Category";
  }, []);

  // NEW: Load categories from API instead of books.json
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        console.log('Fetching categories from API...');
        
        // Make API call to get categories - FIXED: removed extra /api prefix
        const response = await api.get('/categories/list');
        console.log('API Response:', response);
        
        if (response.data && Array.isArray(response.data)) {
          console.log('Categories received:', response.data.length);
          // Transform API data to match our UI structure
          const transformedCategories = response.data.map(cat => ({
            id: cat.id,
            name: cat.name,
            slug: slugify(cat.name),
            book_count: cat.book_count // Keep book count for reference
          }));
          setCategories(transformedCategories);
          setError(null);
        } else {
          console.log('Invalid response format, using seed data');
          setCategories(seedCategories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        console.error('Error details:', err.response?.data || err.message);
        setError('Failed to load categories');
        setCategories(seedCategories); // Fallback to seed data
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // NEW: API functions for CRUD operations - FIXED ENDPOINTS
  const createCategory = async (categoryData) => {
    try {
      const response = await api.post('/categories', {
        name: categoryData.name,
        description: categoryData.name + ' books' // Use category name for description
      });
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      // FIXED: Use the correct endpoint /categories/edit/{id}
      const response = await api.put(`/categories/edit/${id}`, {
        name: categoryData.name,
        description: categoryData.name + ' books' // Use category name for description
      });
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id) => {
    try {
      // FIXED: Use the correct endpoint /categories/delete/{id}
      await api.delete(`/categories/delete/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  // Modal state (Add / Edit)
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit'
  const [editingCategory, setEditingCategory] = useState(null); // NEW: store entire category object
  const [form, setForm] = useState({ name: "" }); // status removed

  const onOpenCreate = () => {
    setMode("create");
    setEditingCategory(null);
    setForm({ name: "" });
    setOpen(true);
  };
  
  const onOpenEdit = (category) => { // CHANGED: accept category object instead of index
    setMode("edit");
    setEditingCategory(category);
    setForm({ name: category.name || "" });
    setOpen(true);
  };
  
  const onClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Saved toast (2s)
  const [savedToast, setSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(''); // NEW: dynamic toast message

  const handleSave = async () => { // CHANGED: make async
    if (!form.name.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      if (mode === "edit" && editingCategory) {
        // Update existing category via API
        const updatedCategory = await updateCategory(editingCategory.id, {
          name: form.name.trim()
        });
        
        // Update local state with API response
        setCategories(prev => prev.map(cat => 
          cat.id === editingCategory.id 
            ? { ...cat, name: updatedCategory.name, slug: slugify(updatedCategory.name) }
            : cat
        ));
        
        setToastMessage('Category updated successfully');
      } else {
        // Create new category via API
        const newCategory = await createCategory({
          name: form.name.trim()
        });
        
        // Add new category to local state
        setCategories(prev => [...prev, {
          id: newCategory.id,
          name: newCategory.name,
          slug: slugify(newCategory.name),
          book_count: 0
        }]);
        
        setToastMessage('Category created successfully');
      }

      setOpen(false);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2000);
    } catch (error) {
      alert(`Error ${mode === 'edit' ? 'updating' : 'creating'} category. Please try again.`);
      console.error('API Error:', error);
    }
  };

  // Delete confirmation
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteCategory, setPendingDeleteCategory] = useState(null); // CHANGED: store category object

  const requestDelete = (category) => { // CHANGED: accept category object
    setPendingDeleteCategory(category);
    setConfirmOpen(true);
  };
  
  const onCloseConfirm = () => {
    setPendingDeleteCategory(null);
    setConfirmOpen(false);
  };
  
  const confirmDelete = async () => { // CHANGED: make async
    if (!pendingDeleteCategory) return;

    try {
      await deleteCategory(pendingDeleteCategory.id);
      
      // Remove from local state
      setCategories(prev => prev.filter(cat => cat.id !== pendingDeleteCategory.id));
      
      setPendingDeleteCategory(null);
      setConfirmOpen(false);
    } catch (error) {
      alert('Error deleting category. Please try again.');
      console.error('Delete Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar — identical styling */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Manage Category
          </h1>
          <button
            type="button"
            onClick={onOpenCreate}
            className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <Plus size={16} /> Add Category
          </button>
        </div>

        {/* NEW: Loading state */}
        {loading && (
          <div className="bg-white rounded shadow p-6 text-center">
            <p className="text-gray-600">Loading categories from API...</p>
          </div>
        )}

        {/* NEW: Error state */}
        {error && !loading && (
          <div className="bg-white rounded shadow p-6 text-center">
            <p className="text-red-600">{error}</p>
            <p className="text-gray-600 text-sm mt-2">Using sample data instead.</p>
          </div>
        )}

        {!loading && categories.length > 0 && (
          <div className="bg-white rounded shadow">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-3 px-4 min-w-[80px]">#</th>
                    <th className="py-3 px-4 min-w-[220px]">Category</th>
                    <th className="py-3 px-4 min-w-[220px]">Slug</th>
                    <th className="py-3 px-4 min-w-[160px]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c, idx) => (
                    <tr key={`${c.id}__${c.slug}`} className="border-b last:border-0 even:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">{idx + 1}</td>
                      <td className="py-3 px-4 text-gray-800 font-medium">{c.name}</td>
                      <td className="py-3 px-4 text-gray-700">{c.slug}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onOpenEdit(c)}  // CHANGED: pass category object
                            className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                          >
                            <Pencil size={14} /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => requestDelete(c)}  // CHANGED: pass category object
                            className="inline-flex items-center gap-1 rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 text-xs text-gray-500 md:hidden">
              Tip: swipe horizontally to see all columns.
            </div>
          </div>
        )}

        {/* Show message if no categories found */}
        {!loading && categories.length === 0 && !error && (
          <div className="bg-white rounded shadow p-6 text-center">
            <p className="text-gray-600">No categories found. Add your first category!</p>
          </div>
        )}
      </main>

      {/* -------- Modal: Add/Edit Category (matches your screenshot) -------- */}
      {open && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 opacity-0 animate-[fadeIn_.2s_ease-out_forwards]" />
          {/* Panel */}
          <div className="absolute inset-0 flex items-start justify-center pt-10">
            <div className="w-full max-w-2xl mx-4 rounded-lg bg-white shadow-lg border border-gray-200 opacity-0 translate-y-2 animate-[popIn_.22s_ease-out_forwards]">
              <div className="px-6 py-4 border-b flex items-center gap-2">
                {/* Screenshot shows plus icon even on Edit, so we keep Plus */}
                <Plus size={20} className="text-gray-700" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {mode === "edit" ? "Edit category" : "Add category"}
                </h3>
              </div>

              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Category Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Type category name"
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t bg-white flex justify-end gap-3">
                {/* Order per screenshot: Save first, then Close */}
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-md px-5 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------- Delete Confirmation Modal (wired up) -------- */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) onCloseConfirm();
          }}
        >
          <div className="absolute inset-0 bg-black/50 opacity-0 animate-[fadeIn_.2s_ease-out_forwards]" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg bg-white shadow-lg opacity-0 translate-y-2 animate-[popIn_.2s_ease-out_forwards]">
              <div className="px-6 py-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertTriangle className="text-amber-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Are you sure you want to delete this record?
                    </h3>
                    {pendingDeleteCategory && (
                      <p className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">
                          {pendingDeleteCategory?.name || "This category"}
                        </span>{" "}
                        will be permanently removed from the list.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-white flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onCloseConfirm}
                  className="rounded-md px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="rounded-md px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------- Saved Toast (2s) -------- */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-[60] pointer-events-none animate-[toastIn_.25s_ease-out]">
          <div className="pointer-events-auto flex items-start gap-3 rounded-xl bg-white shadow-lg ring-1 ring-black/5 px-4 py-3">
            <div className="mt-0.5">
              <CheckCircle2 className="text-green-600" size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Saved</p>
              <p className="text-xs text-gray-600">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* animations */}
      <style>{`
        @keyframes fadeIn { to { opacity: 1 } }
        @keyframes popIn { to { opacity: 1; transform: translateY(0) } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(8px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}