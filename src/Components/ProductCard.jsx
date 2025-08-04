import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { img, title, newPrice, prevPrice, reviews } = product;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div onClick={handleClick} className="w-full bg-[#f0f2f3] p-3 rounded-lg overflow-hidden shadow hover:shadow-md transition flex flex-col">
      {/* Product Image */}
      <div className="relative h-60 mt-0.5 rounded-md overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="pt-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-md font-semibold line-clamp-2 flex-1 mr-2">
            {title}
          </h3>
          <span className="text-lg font-bold text-gray-900">
            ${newPrice.toFixed(2)}
          </span>
        </div>

        <div className="text-sm text-gray-500 line-through mb-1">
          ${prevPrice.toFixed(2)}
        </div>

        <div className="flex justify-between items-center mt-auto">
          {/* Rating */}
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < 4 ? "gold" : "none"} // static 4-star rating
                  stroke="gold"
                  strokeWidth={1.5}
                  className={i < 4 ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({reviews})</span>
          </div>

          {/* Add to Cart Button */}
          <button className="flex items-center bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition">
            <ShoppingCart size={16} className="mr-1" />
            <span className="text-xs">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
