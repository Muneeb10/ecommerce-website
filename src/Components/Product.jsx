// src/Components/FilterProducts.jsx
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import HeaderTitle from './Utilitices/HeaderTitle/HeaderTitle.jsx';
import data from '../db/data.js'; // ✅ Import product data from data.js

const categories = ["All", "Henley", "Polo", "Nike", "Adidas"];

const FilterProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef();

  const filteredProducts =
    selectedCategory === "All"
      ? data
      : data.filter(
          (p) =>
            p.category.toLowerCase() === selectedCategory.toLowerCase() ||
            p.company.toLowerCase() === selectedCategory.toLowerCase()
        );

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const visibleProducts = filteredProducts.slice(currentIndex, currentIndex + 4);

  const scroll = (direction) => {
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (direction === "right" && currentIndex < filteredProducts.length - 4) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full flex flex-col align-center py-20 mx-auto bg-white px-4">
      <div className="flex items-center justify-center w-full mb-8 text-center">
        <HeaderTitle title="Best Selling Products" />
      </div>

      {/* Category Filter Buttons */}
      <div className="flex justify-center w-full mb-6">
        <div className="flex flex-wrap bg-white justify-center p-2 rounded-lg gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Product List */}
      <div className="relative">
        {/* Product Grid */}
        <div ref={scrollRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {visibleProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>

        {/* Arrows - Hidden on small screens */}
        <div className="hidden sm:block">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md ${
              currentIndex === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={currentIndex >= filteredProducts.length - 4}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md ${
              currentIndex >= filteredProducts.length - 4
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Arrows - Visible only on small screens */}
        <div className="sm:hidden flex justify-center gap-4 mt-6">
          <button
            onClick={() => scroll("left")}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full shadow-md ${
              currentIndex === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={currentIndex >= filteredProducts.length - 4}
            className={`p-3 rounded-full shadow-md ${
              currentIndex >= filteredProducts.length - 4
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;