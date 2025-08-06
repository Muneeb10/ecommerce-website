import React, { useState, useEffect, useCallback } from 'react';
import banner_1 from "../assets/banner_images/banner_1.png";
import banner_2 from "../assets/banner_images/banner_2.jpg";
import banner_3 from "../assets/banner_images/banner_3.jpg";

const HeroSection = () => {
  const slides = [
    {
      image: banner_1,
      title: "Summer Collection",
      subtitle: "New Arrivals 2024",
      description: "Discover our hottest styles for the season",
      buttonText: "Shop Now"
    },
    {
      image: banner_2,
      title: "Winter Sale",
      subtitle: "Up to 50% Off",
      description: "Limited time offer on selected items",
      buttonText: "Get Discounts"
    },
    {
      image: banner_3,
      title: "Spring Fashion",
      subtitle: "Trending Now",
      description: "Fresh styles for your wardrobe refresh",
      buttonText: "Explore"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const nextSlide = useCallback(() => {
    setAnimate(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setAnimate(true);
    }, 300);
  }, [slides.length]);

  useEffect(() => {
    setAnimate(true);
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  const goToSlide = (index) => {
    setAnimate(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimate(true);
    }, 300);
  };

  return (
    <div className="mx-4 my-4 rounded-xl overflow-hidden">
      <section className="relative w-full h-[30vh]  sm:h-[45vh] md:h-[80vh]">
        {/* Sliding Images Container */}
        <div 
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className="w-full flex-shrink-0 h-full relative"
            >
              <img 
                src={slide.image} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-full object-cover object-center sm:object-fit"
              />
            </div>
          ))}
        </div>

        {/* Static Text Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className={`max-w-md transition-all duration-500 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">
                {slides[currentIndex].title}
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black mb-2 sm:mb-4">
                {slides[currentIndex].subtitle}
              </h3>
              <p className="text-black text-xs sm:text-sm mb-3 sm:mb-4">
                {slides[currentIndex].description}
              </p>
              <button className="bg-black text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md font-medium hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base">
                {slides[currentIndex].buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-white w-3 sm:w-4' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;