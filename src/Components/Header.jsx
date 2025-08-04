import React, { useState, useRef, useEffect } from 'react';
import logo from "../assets/logo_black.png";
import profileImage from "../assets/profile.jpg"; // <-- Replace with actual profile image path
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Shirt", path: "/shirt" },
    { label: "Pents", path: "/pents" },
    { label: "Suit", path: "/suit" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white border-[0.5px] border-gray-200">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo and Title */}
          <div className="flex items-center space-x-3 px-4">
            <img 
              src={logo}  
              alt="Desi Wear Logo"
              className="w-12 h-12 object-contain"
            />
            <h1
              className="text-3xl text-gray-900 font-black hidden sm:block leading-none"
              style={{ fontFamily: "'Mitr'", lineHeight: '1', marginBottom: '0' }}
            >
              AK Fashion
            </h1>
          </div>

          {/* Center: Search Bar - Only on sm+ */}
          <div className="hidden sm:flex w-[50%]">
            <div className='w-[80%]'>
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none"
              />
            </div>
            <div className="ml-2 p-2 flex justify-center items-center rounded-full border border-gray-300">
              <svg 
                className="h-5 w-5 text-gray-400 hover:text-[#8f5e2e]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right: Cart + Profile + Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                className="lucide lucide-shopping-cart">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                3
              </span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <img
                src={profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer border border-gray-300"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Track Order
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="sm:hidden text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation (includes mobile nav) */}
      <nav className={`text-gray-800 border-t border-gray-200 ${isMenuOpen ? "block" : "hidden"} sm:block`}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 py-3">
            {navItems.map(({ label, path }) => (
              <li key={label}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block font-medium px-2 transition duration-200 text-center sm:text-left ${
                      isActive ? "text-gray-400 font-semibold" : "hover:text-gray-400"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Search Bar */}
          {isMenuOpen && (
            <div className="sm:hidden pb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 mt-2 pl-10 rounded-full border border-gray-300 focus:outline-none"
              />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
