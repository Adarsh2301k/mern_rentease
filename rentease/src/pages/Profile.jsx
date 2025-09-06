// src/pages/Profile.jsx
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile, getMyItems } from "../api";
import { FiEdit } from "react-icons/fi";  // API function

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [myItems, setMyItems] = useState([]); // ✅ rename correctly

  useEffect(() => {
    const fetchProfileAndItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // fetch profile
        const res = await getProfile(token);
        setProfile(res.data.user);

        // fetch user's items
        const resItems = await getMyItems(token)

        setMyItems(resItems.data.items || []);
        console.log("Fetched my items:", resItems.data.items);
      } catch (err) {
        console.error("Failed to fetch profile or items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndItems();
  }, []);

  const handleUpdate = () => {
    navigate("/updateProfile");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 pt-20">
      {/* Profile Section */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-shrink-0">
          <img
            src={profile?.avatar || "https://via.placeholder.com/150?text=Avatar"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
          />
        </div>
        <div className="flex-1 space-y-3 text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800">{profile?.name}</h2>
          <p className="text-gray-600">📧 {profile?.email}</p>
          <p className="text-gray-600">📱 {profile?.mobileNumber}</p>
          <div className="mt-4">
            <button
              onClick={handleUpdate}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
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
                key={item._id} // ✅ backend likely uses _id, not id
                className=" relative border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h4 className="text-lg font-bold text-blue-600">{item.title}</h4>
                <p className="text-gray-600 text-sm mb-1">{item.category?.charAt(0).toUpperCase() +
                  item.category?.slice(1)}</p>
                <p className="text-gray-700 text-sm mb-2">{item.description}</p>
                <p className="text-gray-800 font-medium">{item.price}</p>

                <button
                  onClick={() => navigate(`/updateItem/${item._id}`)}
                  className="absolute top-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                  <FiEdit size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
