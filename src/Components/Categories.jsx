import React from 'react';
import HeaderTitle from './Utilitices/HeaderTitle/HeaderTitle';

import image_1 from "../assets/category/image_1.jpg";
import image_2 from "../assets/category/image_2.jpg";
import image_3 from "../assets/category/image_3.jpeg";
import image_4 from "../assets/category/image_4.jpeg";
import image_5 from "../assets/category/image_5.jpg";
import image_6 from "../assets/category/image_6.jpg";

const products = [
  {
    id: 1,
    name: 'Slim Fit Blazer',
    price: '$120',
    image: image_1,
  },
  {
    id: 2,
    name: 'Casual Denim Shirt',
    price: '$60',
    image: image_2,
  },
  {
    id: 3,
    name: 'Leather Jacket',
    price: '$200',
    image: image_3,
  },
  {
    id: 4,
    name: 'Tailored Pants',
    price: '$85',
    image: image_5,
  },
  {
    id: 5,
    name: 'Basic White Tee',
    price: '$25',
    image: image_6,
  },
  {
    id: 6,
    name: 'Slim Fit Jeans',
    price: '$70',
    image: image_4,
  },
];

const CategoryGrid = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
               <HeaderTitle title="Shop by Category" />
               <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                 Revamp your wardrobe with Pk Fashion's featured collection at unbeatable prices online in Pakistan. Discover trendy pieces that won't break the bank, and step up your style game without compromising on quality!
               </p>
             </div>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
        {products.map((product, index) => {
          const spanClasses =
            index === 0 || index === 3 || index === 4 ? 'lg:row-span-2' : '';

          return (
            <div
              key={product.id}
              className={`bg-white shadow-sm rounded-lg overflow-hidden group border border-gray-200 ${spanClasses} relative`}
            >
              <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay container */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-center pointer-events-none">
                  {/* Semi-transparent dark background on hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-all duration-300 z-0" />

                  {/* Text and button shown only on hover */}
                  <div className="relative z-10 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto px-2">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm sm:text-base mb-3">{product.price}</p>
                    <button className="bg-white text-black text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-gray-200 transition">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
