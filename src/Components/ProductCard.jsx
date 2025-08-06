import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../CartSlice/CartSlice.jsx";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({
      ...product,
      // Ensure all required fields are included
      newPrice: product.newPrice || product.price,
      img: product.img || product.image
    }));
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100 hover:border-gray-200 cursor-pointer"
    >
      <div className="relative w-full aspect-square sm:aspect-[3/4] lg:aspect-square xl:aspect-[3/4] rounded-t-lg overflow-hidden">
        <img
          src={product.img || product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-1 sm:mb-2">
          <h3 className="text-sm sm:text-base font-medium line-clamp-2 flex-1">
            {product.title}
          </h3>
          <span className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap">
            ${(product.newPrice || product.price).toFixed(2)}
          </span>
        </div>

        {product.prevPrice && (
          <div className="text-xs sm:text-sm text-gray-400 line-through mb-2 sm:mb-3">
            ${product.prevPrice.toFixed(2)}
          </div>
        )}

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < (product.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  } w-3 h-3 sm:w-4 sm:h-4`}
                  strokeWidth={i < (product.rating || 4) ? 1.5 : 1}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews || 0})
            </span>
          </div>

          <button
            className="flex items-center justify-center bg-gray-900 text-white p-1.5 sm:p-2 rounded-md hover:bg-gray-800 transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs ml-1 hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;