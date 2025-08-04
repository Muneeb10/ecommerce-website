// src/Components/ProductPage.jsx
import React, { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import data from "../db/data.js";
import { Filter, X } from "lucide-react";

const uniqueCategories = [...new Set(data.map((item) => item.category))];
const uniqueColor = [...new Set(data.map((item) => item.color))];

const ProductPage = () => {
  const [priceRange, setPriceRange] = useState(300);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleCheckbox = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filteredProducts = data.filter((product) => {
    const matchPrice = product.newPrice <= priceRange;
    const matchCategory = categories.length ? categories.includes(product.category) : true;
    const matchColor = colors.length ? colors.includes(product.color) : true;
    const matchSize = sizes.length ? sizes.includes(product.size) : true;
    return matchPrice && matchCategory && matchColor && matchSize;
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 py-6 bg-gray-50 min-h-screen">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="md:hidden flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg mb-4 w-full"
      >
        <Filter className="w-4 h-4" />
        Filters
      </button>

      {/* Sidebar - Hidden on mobile unless showMobileFilters is true */}
      <div
        className={`${showMobileFilters ? "block fixed inset-0 z-50 bg-white p-4 overflow-y-auto" : "hidden"} md:block w-full md:w-1/4 p-6 bg-white shadow-md rounded-lg md:sticky md:top-4 h-fit`}
      >
        {/* Close button for mobile */}
        {showMobileFilters && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Filter Products</h2>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Price Slider */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Price: ${priceRange}</label>
          <input
            type="range"
            min={0}
            max={300}
            step={10}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$0</span>
            <span>$300</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-100">Category</h3>
          <div className="space-y-2">
            {uniqueCategories.map((cat) => (
              <label key={cat} className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => handleCheckbox(setCategories, cat)}
                  className="rounded text-black focus:ring-black h-4 w-4"
                />
                <span className="capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-100">Color</h3>
          <div className="space-y-2">
            {uniqueColor.map((color) => (
              <label key={color} className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={colors.includes(color)}
                  onChange={() => handleCheckbox(setColors, color)}
                  className="rounded text-black focus:ring-black h-4 w-4"
                />
                <span className="capitalize">{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-100">Size</h3>
          <div className="grid grid-cols-3 gap-2">
            {[6, 7, 8, 9, 10, 11].map((size) => (
              <label key={size} className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={sizes.includes(size)}
                  onChange={() => handleCheckbox(setSizes, size)}
                  className="hidden peer"
                />
                <div className="w-full py-1.5 text-center text-sm rounded-md border border-gray-300 peer-checked:bg-black peer-checked:text-white peer-checked:border-black cursor-pointer hover:border-gray-500">
                  {size}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Apply button for mobile */}
        {showMobileFilters && (
          <button
            onClick={() => setShowMobileFilters(false)}
            className="w-full bg-black text-white py-2 rounded-lg mt-4 flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>
        )}
      </div>

      {/* Product Display */}
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">Recommended</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No products found</p>
          )}
        </div>

        <div className="mt-6 text-center">
          <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
            Show All New Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;