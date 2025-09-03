// src/pages/Items.jsx
import { useState } from "react";
import { FiX, FiFilter } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


const Items = () => {
  const categories = ["All", "Furniture", "Electronics", "Books"];
  const types = ["New", "Second-Hand", "Rental"];

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const typeParam = queryParams.get("type");

useEffect(() => {
  if (typeParam) {
    setActiveType(typeParam); // e.g., "Rental"
  }
}, [typeParam]);

  

  // Fake items (later from backend)
  const items = [
    {
      id: 1,
      title: "Laptop",
      category: "Electronics",
      description: "Lightly used laptop in excellent condition.",
      price: "$500",
      type: "Second-Hand",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Bike Rental",
      category: "Vehicles",
      description: "Affordable bike rental for daily use.",
      price: "$15/day",
      type: "Rental",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "Study Desk",
      category: "Furniture",
      description: "Brand new wooden desk, perfect for students.",
      price: "$120",
      type: "New",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20 px-6">
      {/* Sidebar for desktop */}
      <aside className="w-64 bg-white shadow-md rounded-2xl p-6 hidden md:block">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by</h3>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-600 mb-2">Category</h4>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Types */}
        <div>
          <h4 className="font-medium text-gray-600 mb-2">Type</h4>
          <ul className="space-y-2">
            {["All", ...types].map((t) => (
              <li key={t}>
                <button
                  onClick={() => setActiveType(t)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    activeType === t
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 md:ml-6">
        {/* Mobile Filter Button */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold text-gray-800">Items</h2>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <FiFilter /> Filters
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items
  .filter((item) => activeType === "All" || item.type === activeType)
  .filter((item) => activeCategory === "All" || item.category === activeCategory)
  .map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-blue-600">
                  {item.title}
                </h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.type === "New"
                      ? "bg-green-100 text-green-700"
                      : item.type === "Second-Hand"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {item.type}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{item.category}</p>
              <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                {item.description}
              </p>
              <p className="text-gray-900 font-semibold mt-3">{item.price}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Mobile Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsFilterOpen(false)}
          ></div>

          {/* Drawer Content */}
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

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-600 mb-2">Category</h4>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg ${
                        activeCategory === cat
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Types */}
            <div>
              <h4 className="font-medium text-gray-600 mb-2">Type</h4>
              <ul className="space-y-2">
                {["All", ...types].map((t) => (
                  <li key={t}>
                    <button
                      onClick={() => setActiveType(t)}
                      className={`w-full text-left px-3 py-2 rounded-lg ${
                        activeType === t
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {t}
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
};

export default Items;
