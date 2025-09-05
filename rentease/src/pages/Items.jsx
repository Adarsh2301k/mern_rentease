// src/pages/Items.jsx
import { useEffect, useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { getItems } from "../api";

const CATEGORY_OPTIONS = [
  { key: "all", label: "All" },
  { key: "furniture", label: "Furniture" },
  { key: "electronics", label: "Electronics" },
  { key: "books", label: "Books" },
  { key: "clothing", label: "Clothing" },
  { key: "stationery", label: "Stationery" },
  { key: "other", label: "Other" },
];

const TYPE_OPTIONS = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "second-hand", label: "Second Hand" },
  { key: "rental", label: "Rental" },
];

const prettyType = (t) =>
  t === "second-hand"
    ? "Second Hand"
    : t
    ? t.charAt(0).toUpperCase() + t.slice(1)
    : "";

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category")?.toLowerCase() || "all";
  const activeType = searchParams.get("type")?.toLowerCase() || "all";

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory !== "all") params.category = activeCategory;
        if (activeType !== "all") params.type = activeType;

        console.log("Fetching items with params:", params);
        const { data } = await getItems(params);
        setItems(data);
      } catch (err) {
        console.error(
          "Error fetching items:",
          err.response?.data || err.message
        );
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [activeCategory, activeType]);

  if (loading) return <p className="text-center mt-20">Loading items...</p>;

  const badgeClass = (t) =>
    (
      {
        new: "bg-green-100 text-green-700",
        "second-hand": "bg-yellow-100 text-yellow-700",
        rental: "bg-purple-100 text-purple-700",
      }[t] || "bg-gray-100 text-gray-700"
    );

  const updateFilter = (category, type) => {
    const params = {};
    if (category && category !== "all") params.category = category;
    if (type && type !== "all") params.type = type;
    setSearchParams(params);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20 px-6">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md rounded-2xl p-6 hidden md:block">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by</h3>

        <div className="mb-6">
          <h4 className="font-medium text-gray-600 mb-2">Category</h4>
          <ul className="space-y-2">
            {CATEGORY_OPTIONS.map(({ key, label }) => (
              <li key={key}>
                <button
                  onClick={() => updateFilter(key, activeType)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    activeCategory === key
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-600 mb-2">Type</h4>
          <ul className="space-y-2">
            {TYPE_OPTIONS.map(({ key, label }) => (
              <li key={key}>
                <button
                  onClick={() => updateFilter(activeCategory, key)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    activeType === key
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-6">
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold text-gray-800">Items</h2>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg"
          >
            <FiFilter /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-xl shadow-sm p-4"
            >
              <img
                src={
                  item.image ||
                  "https://via.placeholder.com/400x240.png?text=No+Image"
                }
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-blue-600">{item.name}</h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${badgeClass(
                    item.type
                  )}`}
                >
                  {prettyType(item.type)}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                {item.category?.charAt(0).toUpperCase() +
                  item.category?.slice(1)}
              </p>
              <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                {item.description}
              </p>
              <p className="text-gray-900 font-semibold mt-3">₹{item.price}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Mobile Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="relative w-72 bg-white shadow-lg p-6 z-50">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Filter by
            </h3>
            <div className="mb-6">
              <h4 className="font-medium text-gray-600 mb-2">Category</h4>
              <ul className="space-y-2">
                {CATEGORY_OPTIONS.map(({ key, label }) => (
                  <li key={key}>
                    <button
                      onClick={() => updateFilter(key, activeType)}
                      className={`w-full text-left px-3 py-2 rounded-lg ${
                        activeCategory === key
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-600 mb-2">Type</h4>
              <ul className="space-y-2">
                {TYPE_OPTIONS.map(({ key, label }) => (
                  <li key={key}>
                    <button
                      onClick={() => updateFilter(activeCategory, key)}
                      className={`w-full text-left px-3 py-2 rounded-lg ${
                        activeType === key
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
