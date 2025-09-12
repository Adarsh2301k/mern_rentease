// src/pages/Profile.jsx
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile, getMyItems } from "../api";
import { FiEdit } from "react-icons/fi";

const Profile = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    const fetchProfileAndItems = async () => {
      try {
        if (!token) return;

        // fetch profile
        const res = await getProfile(token);
        setProfile(res.data.user);

        // fetch user's items
        const resItems = await getMyItems(token);
        setMyItems(resItems.data.items || []);
      } catch (err) {
        console.error("Failed to fetch profile or items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndItems();
  }, [token]);

  const handleUpdate = () => {
    navigate("/updateProfile");
  };
  const handleSeller = () => {
    navigate("/orders/seller");
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">❌ Profile not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 pt-20">
      {/* Profile Section */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-shrink-0">
          <img
            src={
              profile.avatar || "https://via.placeholder.com/150?text=Avatar"
            }
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
          />
        </div>
        <div className="flex-1 space-y-3 text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800">
            {profile?.name}
          </h2>
          <p className="text-gray-600">📧 {profile?.email}</p>
          <p className="text-gray-600">📱 {profile?.mobileNumber}</p>
          {profile?.address && (
            <p className="text-gray-600">🏠 {profile.address}</p>
          )}
          <div className="mt-4 flex gap-4 flex-wrap justify-center md:justify-start">
            <button
              onClick={handleUpdate}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
            <button
              onClick={handleSeller}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Seller Profile
            </button>

            {/* ✅ Show Admin Panel button if admin */}
            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/profile/adminPanel")}
                className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Admin Panel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* My Items Section */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-2xl p-8 mt-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">
          My Published Items
        </h3>

        {myItems.length === 0 ? (
          <p className="text-gray-500 text-center">
            You haven’t published any items yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myItems.map((item) => (
              <div
                key={item._id}
                className=" relative border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h4 className="text-lg font-bold text-blue-600">{item.name}</h4>
                <p className="text-gray-600 text-sm mb-1">
                  {item.category?.charAt(0).toUpperCase() +
                    item.category?.slice(1)} | {item.type?.charAt(0).toUpperCase() + item.type?.slice(1)}
                </p>
                

                <p className="text-gray-700 text-sm mb-2">
                  {item.description}
                </p>
                <p className="text-gray-800 font-medium">Rs {item.price}</p>

                {/* ✅ Status Tag */}
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full
                    ${
                      item.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : item.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                >
                 Item Status : {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Unknown"}
                  
                  
                </span>

                {/* Edit Button */}
                {item.status === "pending" && (
  <button
    onClick={() => navigate(`/updateItem/${item._id}`)}
    className="absolute top-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
  >
    <FiEdit size={18} />
  </button>
)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
