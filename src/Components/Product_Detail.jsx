import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import products from "../db/data";
import FilterProducts from "./Product.jsx"

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-4 text-red-600 font-semibold">Product not found</div>;
  }

  // State Hooks
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const addToCart = () => {
    console.log("Added to cart:", { ...product, selectedColor, selectedSize, quantity });
  };

  const buyNow = () => {
    console.log("Buy now clicked:", { ...product, selectedColor, selectedSize, quantity });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-[500px] rounded-xl shadow-md object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>
          <p className="text-lg text-gray-600">{product.company}</p>
          <p className="text-2xl text-green-600 font-semibold">${product.newPrice}</p>
          <p className="text-gray-500 line-through">${product.prevPrice}</p>
          <p className="text-gray-700 text-sm">Category: {product.category}</p>
          <p className="text-gray-700 text-sm">Color: {product.color}</p>
          <p className="text-gray-700 text-sm">Reviews: {product.reviews}</p>

          {/* Color Selection */}
          {product.colors && (
            <div>
              <h4 className="font-medium text-gray-700">Color</h4>
              <div className="flex space-x-3 mt-1">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && (
            <div>
              <h4 className="font-medium text-gray-700">Size</h4>
              <div className="flex space-x-3 mt-1">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-md border ${
                      selectedSize === size
                        ? "bg-gray-900 text-white"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <h4 className="font-medium text-gray-700">Quantity</h4>
            <div className="flex items-center space-x-3 mt-2">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="w-8 h-8 border border-gray-300 rounded-md text-lg font-semibold hover:bg-gray-100"
              >
                −
              </button>
              <span className="text-md font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-8 h-8 border border-gray-300 rounded-md text-lg font-semibold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={addToCart}
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button
              onClick={buyNow}
              className="flex items-center justify-center gap-2 bg-white border border-black text-black px-6 py-3 rounded-xl hover:bg-black hover:text-white transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-10">
        {/* Tab Headers */}
        <div className="flex space-x-6 border-b border-gray-200 mb-4">
          {["description", "additional", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize border-b-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab === "additional" ? "Additional Information" : tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="text-gray-700 text-sm">
          {activeTab === "description" && <p>{product.description || "No description available."}</p>}

          {activeTab === "additional" && (
            <div>
              <p><strong>Material:</strong> {product.material || "Cotton"}</p>
              <p><strong>Weight:</strong> {product.weight || "500g"}</p>
              <p><strong>Dimensions:</strong> {product.dimensions || "30 x 20 x 5 cm"}</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {/* Left Side */}
              <div className="md:col-span-1 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-yellow-400 h-4 rounded-full"
                    style={{ width: `${product.reviewPercentage || 90}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {product.reviewPercentage || 90}% of customers gave 4 or 5 stars
                </p>
                <h3 className="text-xl font-semibold text-gray-900">Share your thoughts</h3>
                <p className="text-sm text-gray-600">
                  If you’ve used this product, share your thoughts with other customers
                </p>

                <button
                  onClick={addToCart}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  Write a review
                </button>
              </div>

              {/* Right Side */}
              <div className="md:col-span-2 pl-10 space-y-4">
                {product.reviewsList?.length ? (
                  product.reviewsList.map((review, i) => (
                    <div key={i} className="flex space-x-4 border-b border-gray-300 pb-4">
                      <img
                        src={review.image || "https://via.placeholder.com/60"}
                        alt={review.user}
                        className="w-14 h-14 rounded-full object-cover border"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{review.user}</p>
                        <div className="flex items-center text-yellow-500 mb-1">
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" stroke="none" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
     <FilterProducts />
    
    </div>
  );
};

export default ProductDetail;
