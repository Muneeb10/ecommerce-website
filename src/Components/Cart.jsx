import React, { useState } from "react";
import { X, Plus, Minus, ArrowLeft } from "lucide-react";

import product1 from "../assets/dress_images/dress_1.jpeg";
import product2 from "../assets/dress_images/dress_2.jpeg";
import product3 from "../assets/dress_images/dress_3.jpeg";

const initialCart = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 25,
    quantity: 2,
    color: "Black",
    size: "M",
    weight: 500,
    image: product1,
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 45,
    quantity: 1,
    color: "Blue",
    size: "32",
    weight: 700,
    image: product2,
  },
  {
    id: 3,
    name: "Denim Jeans",
    price: 45,
    quantity: 1,
    color: "Blue",
    size: "32",
    weight: 700,
    image: product3,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tex = 0.05 * subtotal;
  const shipping =
    (cartItems.reduce((total, item) => total + item.weight * item.quantity, 0) / 1000) *
    0.5 *
    50;
  const total = subtotal + tex + shipping;

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Cart Items */}
          <div className="w-full lg:w-2/3">
            {/* Header Row */}
           <div className="hidden pb-2 md:grid md:grid-cols-[2fr_0.7fr_1fr_1fr] gap-4 text-sm font-semibold text-gray-600 mb-2 px-2">
  <div className="text-left">Product</div>
  <div className="text-center">Price</div>
  <div className="text-center">Quantity</div>
  <div className="text-center">Total</div>
</div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-[2fr_0.7fr_1fr_1fr] gap-2 items-center p-2 rounded-md bg-white shadow-[0_2px_12px_-3px_rgba(0,0,0,0.3)]"
                >
                  {/* Product */}
                  <div className="flex gap-4 items-center justify-start p-2 rounded-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-500 text-sm">Color: {item.color}</p>
                      <p className="text-gray-500 text-sm">Size: {item.size}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-gray-700 font-medium flex items-center justify-center p-2 rounded-md">
                    ${item.price}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 p-2 rounded-md justify-center">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="border border-gray-500 px-2 py-1 rounded disabled:opacity-50"
                      disabled={item.quantity === 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="border border-gray-500 px-2 py-1 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between md:justify-end gap-2 p-2 rounded-md">
                    <span className="font-semibold text-gray-800">
                      ${item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 ml-4 border border-gray-600 rounded-full p-1 hover:text-gray-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8">
              <a
                href="/"
                className="inline-flex items-center text-blue-600 hover:underline font-medium"
              >
                <ArrowLeft className="mr-2" size={18} />
                Continue Shopping
              </a>
            </div>
          </div>

          {/* Right Side: Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(0,0,0,0.3)]">
              <ul className="text-gray-800 space-y-4">
                <li className="flex flex-wrap gap-4 text-sm">
                  Total Qty: <span className="ml-auto font-bold">{totalQty}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Total Items: <span className="ml-auto font-bold">{cartItems.length}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Subtotal <span className="ml-auto font-bold">${subtotal.toFixed(2)}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Shipping <span className="ml-auto font-bold">${shipping.toFixed(2)}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Tax <span className="ml-auto font-bold">${tex.toFixed(2)}</span>
                </li>
                <hr className="border-gray-300" />
                <li className="flex flex-wrap gap-4 text-sm font-bold">
                  Total <span className="ml-auto">${total.toFixed(2)}</span>
                </li>
              </ul>

              <div className="mt-8 space-y-2">
                <button
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-black hover:bg-gray-900 text-white rounded-md"
                >
                  Buy Now
                </button>
                <a
                  href="/"
                  className="block text-center text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
                >
                  Continue Shopping
                </a>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <img
                  src="https://readymadeui.com/images/master.webp"
                  alt="card1"
                  className="w-10 object-contain"
                />
                <img
                  src="https://readymadeui.com/images/visa.webp"
                  alt="card2"
                  className="w-10 object-contain"
                />
                <img
                  src="https://readymadeui.com/images/american-express.webp"
                  alt="card3"
                  className="w-10 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
