// Sidebar.jsx
import { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const CAT_MAX_H = "max-h-72";             // whole category list (mini scroll)
const SUB_MAX_H = "max-h-44 md:max-h-52"; // inner subcategory list (mini scroll)

export default function Sidebar({ onSelect }) {
  const navigate = useNavigate();

  const [expandedKey, setExpandedKey] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await api.get("/categories/list");
        if (!isMounted) return;
        // Add empty subcategories array for future-proof
        const formatted = res.data?.map(c => ({ ...c, subcategories: [] }));
        setCategories(Array.isArray(formatted) ? formatted : []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        if (isMounted) setErrorMsg("Failed to load categories");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter handler
  const setFilter = (payload) => {
    if (onSelect) {
      onSelect(payload);
    } else {
      if (payload) {
        navigate("/all-genres", { state: { filter: payload } });
      }
    }
  };

  const toggleExpand = (category) => {
    if (expandedKey === category) {
      setExpandedKey(null);
      setActiveCategory(null);
      setActiveSubcategory(null);
      setFilter(null);
    } else {
      setExpandedKey(category);
      setActiveCategory(null);
      setActiveSubcategory(null);
      setFilter(null);
    }
  };

  const categoryToSubs = useMemo(() => {
    const map = {};
    categories.forEach((c) => {
      map[c.name] = c.subcategories || [];
    });
    return map;
  }, [categories]);

  const handleCategory = (name) => {
    setActiveCategory(name);
    setActiveSubcategory(null);
    const subs = categoryToSubs[name] || [];
    setFilter({ type: "category", value: name, subcategories: subs });
  };

  const handleSubcategory = (sub, parent) => {
    setActiveCategory(parent);
    setActiveSubcategory(sub);
    setFilter({ type: "subcategory", value: sub, parent });
  };

  const catCounts = useMemo(() => {
    const m = {};
    categories.forEach((c) => (m[c.name] = (c.subcategories || []).length));
    return m;
  }, [categories]);

  const toggleCategoryCheckbox = (catName) => {
    if (activeCategory === catName && !activeSubcategory) {
      setActiveCategory(null);
      setExpandedKey(null);
      setFilter(null);
    } else {
      handleCategory(catName);
      setExpandedKey(catName);
    }
  };

  const toggleSubcategoryCheckbox = (sub, parent) => {
    if (activeSubcategory === sub) {
      setActiveSubcategory(null);
      const subs = categoryToSubs[parent] || [];
      setFilter({ type: "category", value: parent, subcategories: subs });
    } else {
      handleSubcategory(sub, parent);
    }
  };

  return (
    <aside className="hidden md:block w-64 bg-white p-4 border-r border-gray-200 sticky top-28 overflow-y-hidden space-y-6">
      {loading && <div className="text-sm text-gray-500">Loading categories...</div>}
      {errorMsg && <div className="text-sm text-red-500">{errorMsg}</div>}

      <div>
        <h3 className="text-base font-semibold mb-2">Categories</h3>
        <div
          className={`overflow-y-auto ${CAT_MAX_H} pr-1
            [scrollbar-gutter:stable]
            [scrollbar-width:thin]
            [-ms-overflow-style:none]
            [scrollbar-color:rgba(209,213,219,.25)_transparent]
            [&::-webkit-scrollbar]:w-[3px]
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-300/30
            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/60
            [&::-webkit-scrollbar-thumb]:rounded-full
          `}
        >
          <ul className="space-y-1 mb-2">
            <li>
              <Link
                to="/all-genres"
                className="w-full text-left text-sm text-gray-700 px-2 py-2 rounded block hover:bg-sky-100 transition-all duration-200 font-medium"
              >
                All Genre
              </Link>
            </li>
          </ul>

          <ul className="space-y-1">
            {categories.map((cat) => {
              const open = expandedKey === cat.name;
              const catChecked = activeCategory === cat.name && !activeSubcategory;

              return (
                <li key={cat.id}>
                  <div className="flex items-center justify-between px-2 py-2 rounded hover:bg-sky-50">
                    <label className="flex items-center gap-2 flex-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={catChecked}
                        onChange={() => toggleCategoryCheckbox(cat.name)}
                        className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className={`text-sm ${catChecked ? "text-sky-700 font-medium" : "text-gray-700"}`}>
                        {cat.name}
                      </span>
                    </label>

                    <span className="text-xs text-gray-400 mr-2">({catCounts[cat.name] ?? 0})</span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(cat.name);
                      }}
                      aria-label={open ? "Collapse" : "Expand"}
                      className="p-1 rounded hover:bg-white/60"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${open ? "rotate-180" : ""} text-gray-500`}
                      />
                    </button>
                  </div>

                  {/* INNER SUBCATEGORY LIST — safe for future */}
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="min-h-0">
                      {open && cat.subcategories.length > 0 && (
                        <ul
                          className={`ml-6 mt-1 pr-1 space-y-1 overflow-y-auto ${SUB_MAX_H}`}
                          aria-label={`${cat.name} subcategories`}
                        >
                          {cat.subcategories.map((sub) => {
                            const subChecked = activeSubcategory === sub;
                            return (
                              <li key={sub}>
                                <label className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-sky-50 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={subChecked}
                                    onChange={() => toggleSubcategoryCheckbox(sub, cat.name)}
                                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                  />
                                  <span className={`text-sm ${subChecked ? "text-sky-700 font-medium" : "text-gray-600"}`}>
                                    {sub}
                                  </span>
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
