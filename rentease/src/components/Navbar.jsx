import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // fake login state

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="px-8 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-blue-600 tracking-wide">
            RentEase
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-5">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            About Us
          </Link>

          {/* Profile Dropdown */}
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                <FaUserCircle className="mr-2 text-xl" />
                Profile
              </button>

              <div
                className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md py-2 
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                           transition-all duration-200"
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  My Profile
                </Link>
                <Link
                  to="/update-profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Update Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-8 py-4 space-y-4">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                My Profile
              </Link>
              <Link
                to="/update-profile"
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Update Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block text-gray-700 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
