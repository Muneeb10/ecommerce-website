import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer.jsx";

import Home from "./Pages/Home.jsx";
import Shirt from "./Pages/Shirt.jsx";
import AboutPage from "./Pages/About.jsx";
import ContactPage from "./Pages/Contact.jsx";
import ProductDetail from "./Components/Product_Detail.jsx";
import Cart from "./Components/Cart.jsx"


function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/new_arrivals" element={<Shirt />} />
        <Route path="/" element={<Home />} />
        <Route path="/men/shirts" element={<Shirt />} />
        <Route path="/pents" element={<Shirt />} />
        <Route path="/suit" element={<Shirt />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
