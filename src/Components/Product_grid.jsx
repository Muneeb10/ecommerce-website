import React from 'react';
import ProductCard from './ProductCard';
import HeaderTitle from './Utilitices/HeaderTitle/HeaderTitle';
import data from '../db/data';

const ProductGrid = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <HeaderTitle title="Trending Products" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Revamp your wardrobe with Pk Fashion's featured collection at unbeatable prices online in Pakistan. Discover trendy pieces that won't break the bank, and step up your style game without compromising on quality!
          </p>
        </div>

        {/* Product Grid - Responsive columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
            Load More Products
            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;