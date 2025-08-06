import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo_black.png";
import { NavLink } from "react-router-dom";
import {
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);
  const [isDressesDropdownOpen, setIsDressesDropdownOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleMenDropdown = () => setIsMenDropdownOpen((prev) => !prev);
  const toggleDressesDropdown = () => setIsDressesDropdownOpen((prev) => !prev);
  const toggleCartDropdown = () => setIsCartDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsMenDropdownOpen(false);
        setIsDressesDropdownOpen(false);
        setIsCartDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "New Arrivals", path: "/new_arrivals" },
    { label: "Home", path: "/" },
    { label: "Men", path: "/men" },
    { label: "Dresses", path: "/dresses" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-100 text-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-center sm:text-left gap-2">
          <div className="text-gray-600 flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>+92 300 1234567</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>+92 301 7654321</span>
            </div>
          </div>
          <div className="text-red-600 font-semibold w-full sm:w-auto">
            <a href="/sale" className="hover:underline">
              Summer Sale: Up to 50% OFF - Shop Now!
            </a>
          </div>
          <div className="flex gap-3 text-gray-600 w-full sm:w-auto justify-center sm:justify-end">
            <a href="#"><Facebook className="w-4 h-4 hover:text-blue-600" /></a>
            <a href="#"><Instagram className="w-4 h-4 hover:text-pink-500" /></a>
            <a href="#"><Twitter className="w-4 h-4 hover:text-blue-400" /></a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 hidden sm:block">
              AK Fashion
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex gap-6 relative">
            {navItems.map(({ label, path }) => {
              if (label === "Men") {
                return (
                  <div key={label} className="relative group">
                    <button className="text-[15px] font-medium px-3 py-1 rounded-lg transition-colors hover:bg-gray-100 hover:text-black">
                      {label}
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-[700px] bg-white shadow-lg border border-gray-200 rounded-md z-30 p-6 grid grid-cols-3 gap-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div>
                        <h4 className="text-md font-semibold mb-2 text-gray-800">Dresses by Fabric</h4>
                        <ul className="space-y-1">
                          <li><NavLink to="/men/shirts" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Cotton Dresses</NavLink></li>
                          <li><NavLink to="/men/pants" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Lawn Dresses</NavLink></li>
                          <li><NavLink to="/men/suits" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Khaddar Dresses</NavLink></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold mb-2 text-gray-800">Dresses by Style</h4>
                        <ul className="space-y-1">
                          <li><NavLink to="/men/accessories" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Shalwar Kameez</NavLink></li>
                          <li><NavLink to="/men/watches" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Bridal Dresses</NavLink></li>
                          <li><NavLink to="/men/wallets" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Party Wear Dresses</NavLink></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold mb-2 text-gray-800">Accessories</h4>
                        <ul className="space-y-1">
                          <li><NavLink to="/men/shoes" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Perfumes</NavLink></li>
                          <li><NavLink to="/men/sneakers" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Wallets</NavLink></li>
                          <li><NavLink to="/men/sandals" className="text-sm text-gray-700 hover:text-black px-2 py-1 rounded hover:bg-gray-100 transition-colors">Watches</NavLink></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              }

              if (label === "Dresses") {
                return (
                  <div key={label} className="relative group">
                    <button className="text-[15px] font-medium px-3 py-1 rounded-lg transition-colors hover:bg-gray-100 hover:text-black">
                      {label}
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg border border-gray-200 rounded-md z-30 py-6 px-4 space-y-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <NavLink to="/dresses/summer" className="block text-sm text-gray-700 hover:text-black px-3 py-1 rounded hover:bg-gray-100 transition-colors">Summer Dresses</NavLink>
                      <NavLink to="/dresses/winter" className="block text-sm text-gray-700 hover:text-black px-3 py-1 rounded hover:bg-gray-100 transition-colors">Winter Dresses</NavLink>
                      <NavLink to="/dresses/festive" className="block text-sm text-gray-700 hover:text-black px-3 py-1 rounded hover:bg-gray-100 transition-colors">Festive Wear</NavLink>
                      <NavLink to="/dresses/casual" className="block text-sm text-gray-700 hover:text-black px-3 py-1 rounded hover:bg-gray-100 transition-colors">Casual Dresses</NavLink>
                      <NavLink to="/dresses/formal" className="block text-sm text-gray-700 hover:text-black px-3 py-1 rounded hover:bg-gray-100 transition-colors">Formal Dresses</NavLink>
                      <NavLink to="/dresses/party" className="block text-sm text-gray-700 hover:text-black px-3 py-1 rounded hover:bg-gray-100 transition-colors">Party Dresses</NavLink>
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={label}
                  to={path}
                  className={({ isActive }) =>
                    `text-[15px] font-medium px-3 py-1 rounded-lg transition-colors ${
                      isActive ? "text-black bg-gray-100 font-semibold" : "hover:bg-gray-100 hover:text-black"
                    }`
                  }
                >
                  {label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            <button onClick={toggleSearch}><Search className="w-5 h-5 text-gray-600 hover:text-[#8f5e2e]" /></button>

            {/* Cart Icon with Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleCartDropdown}
                className="relative p-1"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-[#8f5e2e]" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartQuantity}
                  </span>
                )}
              </button>
              {isCartDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-30 p-4">
                  <h4 className="font-semibold text-sm mb-2 text-gray-700">Your Cart ({cartQuantity} {cartQuantity === 1 ? 'item' : 'items'})</h4>
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-sm">Your cart is empty.</p>
                  ) : (
                    <>
                      <ul className="space-y-3 max-h-60 overflow-y-auto">
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex gap-3 items-center text-sm text-gray-700">
                            <img 
                              src={item.img || item.image} 
                              alt={item.title || item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium truncate">{item.title || item.name}</p>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Qty: {item.quantity}</span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Subtotal:</span>
                          <span className="font-medium">
                            ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                          </span>
                        </div>
                        <NavLink 
                          to="/cart" 
                          className="block text-center w-full text-sm py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                          onClick={() => setIsCartDropdownOpen(false)}
                        >
                          View Cart & Checkout
                        </NavLink>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* User */}
            <div className="relative">
              <User 
                onClick={toggleDropdown} 
                className="w-6 h-6 text-gray-700 cursor-pointer hover:text-[#8f5e2e]" 
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Track Order</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                </div>
              )}
            </div>

            <button onClick={toggleMenu} className="sm:hidden text-gray-700">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Optional: Mobile Nav and Search */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none"
            />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;