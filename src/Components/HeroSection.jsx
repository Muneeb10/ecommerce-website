import React, { useState, useEffect, useCallback } from 'react';
import banner_1 from "../assets/banner_images/banner_1.jpeg"
import banner_2 from "../assets/banner_images/banner_2.jpeg"
import banner_3 from "../assets/banner_images/banner_3.jpeg"

const HeroSection = () => {
  const slides = [
    banner_1,
    banner_2,
    banner_3,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="m-4 rounded-xl overflow-hidden"> {/* Added margin and rounded corners */}
      <section className="relative w-full h-[70vh] md:h-[70vh]">
        {/* Sliding Images Container */}
        <div 
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className="w-full flex-shrink-0 h-full relative flex items-center justify-center"
            >
              <img 
                src={slide} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-full object-fit"
              />
              {/* Semi-transparent overlay */}
              <div className="absolute inset-0"></div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-white w-4' : 'bg-white bg-opacity-50'
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