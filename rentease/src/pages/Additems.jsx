import { useState } from "react";
import axios from "axios";

const CATEGORIES = ["electronics", "books", "furniture", "clothing", "other"];
const TYPES = ["new", "second-hand", "rental"];

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    type: "second-hand",
    image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      const res = await axios.post("/api/items", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Item added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        type: "second-hand",
        image: null,
      });
    } catch (err) {
      setMessage("Failed to add item. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a New Item</h2>
      {message && <p className="mb-4 text-center text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/** Name */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            required
          />
        </div>

        {/** Description */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            rows={3}
          />
        </div>

        {/** Price */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm">Price*</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            required
          />
        </div>

        {/** Category & Type in a row */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium text-sm">Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium text-sm">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            >
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/** Image */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="text-sm"
          />
          {formData.image && (
            <p className="mt-1 text-gray-500 text-xs">{formData.image.name}</p>
          )}
        </div>

        {/** Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors text-sm"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
