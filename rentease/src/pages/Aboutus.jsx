import pic_ak from '../assets/pic_ak.png';

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 mt-10">
      {/* Page Title */}
      <h1 className="text-4xl text-blue-600 font-bold text-center mb-12">About Us</h1>

      {/* Team Member */}
      <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-xl p-6 md:p-10 gap-6 mb-12">
        {/* Photo */}
        <div className="flex-shrink-0">
          <img
            src={pic_ak}
            alt="Photo"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold">Adarsh Kesharwani</h2>
          <p className="text-blue-600 font-medium mb-4">Developer</p>
          <p className="text-gray-700">
            At our company, we believe that innovation and customer satisfaction go hand in hand. Every product and service we offer is carefully designed to solve real problems and enhance everyday life. Our team is driven by a shared passion for quality, integrity, and sustainability, ensuring that our customers receive nothing but the best. We strive to create meaningful experiences that build trust and long-term relationships with everyone we serve.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-2">
          To provide high-quality products with a focus on customer satisfaction
          and sustainability.
        </p>
        <p className="text-gray-700">
          Contact us at{" "}
          <a href="mailto:info@example.com" className="text-blue-600">
            info@example.com
          </a>
        </p>
      </div>
    </div>
  );
}
