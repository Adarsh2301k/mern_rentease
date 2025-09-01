import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ icon, title, description, link }) => {
  return (
    <Link
      to={link}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </Link>
  );
};

export default CategoryCard;
