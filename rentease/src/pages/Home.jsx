import React from "react";
import HeroSection from "../components/Herosection";
import CategoryCard from "../components/CategoryCard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const categories = [
  { icon: "🆕", title: "New Items", description: "Freshly available products for students.", link: "/items?type=new" },
  { icon: "♻️", title: "Second-Hand", description: "Affordable pre-loved items from other students.", link: "/items?type=second-hand" },
  { icon: "🏠", title: "Rental", description: "Rent items for short-term use at low cost.", link: "/items?type=rental" },
];


  return (
    <div>
      <HeroSection isLoggedIn={isLoggedIn} />

      <section className=" bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <CategoryCard
                key={index}
                icon={cat.icon}
                title={cat.title}
                description={cat.description}
                link={cat.link}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
