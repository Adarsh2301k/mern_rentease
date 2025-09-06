// src/pages/UpdateItem.jsx
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemById, updateItem, deleteItem } from "../api";
import { FiCamera } from "react-icons/fi";

const CATEGORY_OPTIONS = ["furniture", "electronics", "books", "clothing", "stationery", "other"];
const TYPE_OPTIONS = ["new", "second-hand", "rental"];

export default function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(null); // start as null
  const [imageFile, setImageFile] = useState(null);

  // Fetch item
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await getItemById(id);
        console.log("Fetched item from API:", data);

        const item = data.item; // ✅ get the item object

        setForm({
          name: item.name || "",
          description: item.description || "",
          price: item.price || "",
          category: item.category || "",
          type: item.type || "second-hand",
          image: item.image || "",
        });
      } catch (err) {
        console.error("Failed to fetch item:", err);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          formData.append(k, v);
        }
      });

      if (imageFile) formData.append("image", imageFile);

      await updateItem(id, formData, token);
      alert("Item updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const token = localStorage.getItem("token");
      await deleteItem(id, token);
      alert("Item deleted successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ⬅️ Don’t render form until data is loaded
  if (!form) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">Update Item</h2>

        <div className="flex gap-6">
          {/* Left: Image box */}
          <div className="relative w-48 h-48 border rounded-lg overflow-hidden bg-gray-50">
            <img
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : form.image || "https://via.placeholder.com/150"
              }
              alt="Item"
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white shadow hover:bg-blue-700"
            >
              <FiCamera size={18} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-3">
            <div>
              <label className="block text-sm text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="2"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-600">Price</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700"
              >
                Delete Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
