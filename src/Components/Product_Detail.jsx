import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../CartSlice/CartSlice.jsx";
import products from "../db/data";
import FilterProducts from "./Product.jsx";

// OPTIONAL: Uncomment below lines if you want toast messages
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedDressSize, setSelectedDressSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return <div className="p-4 text-red-600 font-semibold">Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        selectedColor,
        selectedSize,
        selectedDressSize,
        quantity,
        newPrice: product.newPrice || product.price,
        img: product.img || product.image,
      })
    );

    // Option 1: Navigate immediately after adding to cart
    navigate("/cart");

    // Option 2: Toast message before redirect (if using react-toastify)
    /*
    toast.success("Item added to cart!", {
      onClose: () => navigate("/cart"),
      autoClose: 1000,
    });
    */
  };

  const buyNow = () => {
    const item = {
      ...product,
      selectedColor,
      selectedSize,
      selectedDressSize,
      quantity,
      newPrice: product.newPrice || product.price,
      img: product.img || product.image,
    };

    navigate("/checkout", { state: { buyNowItem: item } });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.img || product.image}
            alt={product.title}
            className="w-full h-[500px] rounded-xl shadow-md object-cover"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>

          <div className="flex items-center gap-2">
            <p className="text-2xl text-green-600 font-semibold">
              ${(product.newPrice || product.price).toFixed(2)}
            </p>
            {product.prevPrice && (
              <p className="text-gray-500 line-through">
                ${product.prevPrice.toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < (product.rating || 4)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  strokeWidth={i < (product.rating || 4) ? 1.5 : 1}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews || 0} reviews)
            </span>
          </div>

          {product.colors?.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700">Color</h4>
              <div className="flex space-x-3 mt-1">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-700">
                Selected:{" "}
                <span className="font-medium capitalize">{selectedColor}</span>
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
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

          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* You can keep the tabs and FilterProducts here as they were */}
      <FilterProducts />
    </div>
  );
};

export default ProductDetail;
