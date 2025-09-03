import React from "react";

export default function ItemDetails() {
  // Mock item data
  const item = {
    name: "Wireless Headphones",
    price: 120,
    category: "Electronics",
    type: "New",
    description:
      "High-quality wireless headphones with noise-cancellation, long battery life, and comfortable fit. Perfect for music lovers and professionals.",
    image: "/items/headphones.jpg",
    highlights: ["Noise-Cancellation", "20h Battery Life", "Bluetooth 5.0"],
  };

  // Mock seller data
  const seller = {
    name: "Alice Smith",
    avatar: "/team/member1.jpg",
    rating: 4.8,
    reviews: 34,
    email: "alice@example.com",
  };

  // Mock recommendations
  const recommendedItems = [
    { name: "Bluetooth Earbuds", price: 60, image: "/items/earbuds.jpg" },
    { name: "Noise Cancelling Headphones", price: 150, image: "/items/headphones2.jpg" },
    { name: "Portable Speaker", price: 80, image: "/items/speaker.jpg" },
    { name: "Over-Ear Headphones", price: 100, image: "/items/headphones3.jpg" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Back Button */}
      <div>
        <button className="text-blue-600 hover:underline text-sm">&larr; Back to Items</button>
      </div>

      {/* Main Item + Seller Block */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden gap-4">
        {/* Left: Image */}
        <div className="md:w-1/2 bg-gray-50 p-4 flex justify-center items-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Right: Info + Seller + Actions */}
        <div className="md:w-1/2 p-4 flex flex-col justify-between gap-3">
          {/* Item Info */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{item.name}</h1>
            <p className="text-blue-600 text-xl font-semibold">${item.price}</p>
            <p className="text-gray-500 text-sm">
              <span className="font-medium">Category:</span> {item.category}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-medium">Type:</span> {item.type}
            </p>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              {item.highlights.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <p className="text-gray-700 text-sm mt-2">{item.description}</p>
          </div>

          {/* Seller Info */}
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

          {/* Actions */}
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

      {/* Recommendation Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {recommendedItems.map((rec, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              <img
                src={rec.image}
                alt={rec.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <p className="text-sm font-medium">{rec.name}</p>
              <p className="text-blue-600 font-semibold">${rec.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
