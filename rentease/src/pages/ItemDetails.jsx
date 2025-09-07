import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemById, getItems } from "../api";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemAndRecommendations = async () => {
      try {
        setLoading(true);
        const res = await getItemById(id);
        const fetchedItem = res.data.item;
        setItem(fetchedItem);

        const filters = {
          category: fetchedItem.category,
          type: fetchedItem.type,
        };

        const recRes = await getItems(filters);
        const items = recRes.data.filter((i) => i._id !== fetchedItem._id);
        setRecommendedItems(items);
      } catch (err) {
        console.error("Error fetching item or recommendations:", err);
        setError("Failed to load item details.");
      } finally {
        setLoading(false);
      }
    };
    fetchItemAndRecommendations();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading item details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (!item) {
    return <p className="text-center py-10">Item not found</p>;
  }

  const seller = {
    name: item?.user?.name || "Unknown Seller",
    avatar: "/team/member1.jpg",
    rating: 4.8,
    reviews: 34,
    email: item?.user?.email || "Not available",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline text-sm"
        >
          &larr; Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden gap-4">
        <div className="md:w-1/2 bg-gray-50 p-4 flex justify-center items-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-64 rounded-lg object-cover"
          />
        </div>

        <div className="md:w-1/2 p-4 flex flex-col justify-between gap-3">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{item.name}</h1>
            <p className="text-blue-600 text-xl font-semibold">Rs {item.price}</p>
            <p className="text-gray-500 text-sm">
              <span className="font-medium">Category:</span> {item.category?.charAt(0).toUpperCase() +
                item.category?.slice(1)}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-medium">Type:</span> {item.type}
            </p>
            <p className="text-gray-700 text-sm mt-2">{item.description}</p>
          </div>

          <div className="flex items-center gap-3 mt-4 bg-gray-50 p-3 rounded-lg">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-sm">{seller.name}</p>
              <p className="text-gray-500 text-xs">
                Seller • Rating: {seller.rating} ★ ({seller.reviews} reviews)
              </p>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
              Contact
            </button>
          </div>

          <div className="flex gap-3 mt-3">
            <button className="flex-1 bg-yellow-500 text-white py-2 rounded text-sm hover:bg-yellow-600 transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">You May Also Like</h2>
        {recommendedItems.length === 0 ? (
          <p className="text-center text-gray-500">No recommendations available.</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {recommendedItems.map((rec) => (
              <div
                key={rec._id}
                onClick={() => navigate(`/itemdetails/${rec._id}`)}
                className="flex-shrink-0 w-48 bg-white shadow-md rounded-lg p-3 flex flex-col items-center text-center hover:shadow-lg transition-shadow snap-center cursor-pointer"
              >
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <p className="text-sm font-medium">{rec.name}</p>
                <p className="text-blue-600 font-semibold">Rs {rec.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
