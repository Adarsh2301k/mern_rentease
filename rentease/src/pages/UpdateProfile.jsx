// src/pages/UpdateProfile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../api";
import { Camera } from "lucide-react";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address: "",   // ✅ new
    avatar: null,  // ✅ file upload
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getProfile(token);
        const user = res.data.user;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          mobileNumber: user.mobileNumber || "",
          address: user.address || "",     // ✅ prefill if exists
          avatar: user.avatar || "",       // ✅ URL from backend
        });
      } catch (err) {
        console.error(err);
        setError("❌ Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("mobileNumber", formData.mobileNumber);
      data.append("address", formData.address);
      if (formData.avatar instanceof File) {
        data.append("avatar", formData.avatar);
      }

      await updateProfile(data, token);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Update Profile
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left side: Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <img
                src={
                  formData.avatar instanceof File
                    ? URL.createObjectURL(formData.avatar) // preview new
                    : formData.avatar || "https://via.placeholder.com/150?text=Profile"
                }
                alt="Profile Avatar"
                className="w-32 h-32 rounded-full object-cover border"
              />
              <label
                htmlFor="avatarUpload"
                className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 cursor-pointer"
              >
                <Camera size={18} />
              </label>
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Update photo</p>
          </div>

          {/* Right side: Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 space-y-5 w-full"
          >
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg mt-1 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg mt-1 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg mt-1 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg mt-1 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
