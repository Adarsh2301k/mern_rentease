import { Link } from "react-router-dom";

function HeroSection({ isLoggedIn }) {
  return (
    <section className="py-20 flex justify-center">
      <div className="bg-white text-blue-600 rounded-xl shadow-lg p-8 max-w-4xl w-full text-center md:text-left">
        
        {/* Main Headline */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Budget-Friendly. Student-Friendly.
        </h1>

        {/* Short Description */}
        <p className="text-lg md:text-xl mb-6 text-gray-700">
          Buy or rent second-hand essentials from fellow students. Quick, safe, and budget-friendly — your smart student marketplace.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/items"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Browse Items
              </Link>
              <Link
                to="/addItem"
                className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-600 hover:text-white transition"
              >
                Post Your Item
              </Link>
            </>
          ) : (
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Register Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
