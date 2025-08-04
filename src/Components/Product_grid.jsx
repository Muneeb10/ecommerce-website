import React from 'react';
import ProductCard from './ProductCard';
import HeaderTitle from './Utilitices/HeaderTitle/HeaderTitle';
import data from '../db/data';

const ProductGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center w-full mb-8">
        <HeaderTitle title="Our Product" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product, index) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="w-full flex justify-center pt-10">
        <button className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
          Load More
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
