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
import Form from "./Pages/Form.jsx"
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import ShippingPolicy from "./Pages/ShippingPolicy.jsx"
import ReturnPolicy from "./Pages/ReturnPolicy.jsx";
import BlogNews from "./Pages/BlogNews.jsx";
import FAQPage from "./Pages/FAQPage.jsx"
import OurProcess from "./Pages/OurProcess.jsx"
import ScrollToTop from "./Components/ScrollToTop.jsx"
import CheckoutPage from "./Pages/CheckoutPage.jsx"



function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
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
        <Route path="/form" element={<Form />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />

        <Route path="/blog" element={<BlogNews />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/our-process" element={<OurProcess />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* <Route path="/blog/:id" element={<BlogPost />} /> */}
        {/* <Route path="/blog/category/:category" element={<BlogCategory />} />  */}
      
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
