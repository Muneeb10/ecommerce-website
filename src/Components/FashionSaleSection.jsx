import React, { useState, useEffect, useRef } from 'react';

// Import your images
import fashion1 from '../assets/Sliding_image/dress_1.jpg';
import fashion2 from '../assets/Sliding_image/dress_2.jpg';
import fashion3 from '../assets/Sliding_image/dress_3.jpg';
import fashion4 from '../assets/Sliding_image/dress_4.jpg';
import fashion5 from '../assets/Sliding_image/dress_5.jpg';
import fashion6 from '../assets/Sliding_image/dress_1.jpg';
import fashion7 from '../assets/Sliding_image/dress_2.jpg';
import fashion8 from '../assets/Sliding_image/dress_3.jpg';
import fashion9 from '../assets/Sliding_image/dress_4.jpg';

const FashionSaleSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isCounting, setIsCounting] = useState(true);
  const [scrollPositions, setScrollPositions] = useState([0, 0, 0]);
  const animationRef = useRef(null);
  const columnRefs = [useRef(null), useRef(null), useRef(null)];

  // Countdown Timer
  useEffect(() => {
    if (!isCounting) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const { days, hours, minutes, seconds } = prev;
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;
        let newDays = days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        if (newDays <= 0 && newHours <= 0 && newMinutes <= 0 && newSeconds <= 0) {
          setIsCounting(false);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCounting]);

  // Scroll Animation
  useEffect(() => {
    let lastTimestamp = 0;
    const speed = 0.2;

    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (delta >= 16) {
        setScrollPositions(prev => {
          return prev.map((pos, idx) => {
            let newPos = idx === 1 ? pos - speed : pos + speed;

            const columnEl = columnRefs[idx].current;
            if (columnEl) {
              const contentHeight = columnEl.scrollHeight / 2;

              if (idx === 1 && newPos <= 0) {
                newPos = contentHeight;
              } else if ((idx !== 1) && newPos >= contentHeight) {
                newPos = 0;
              }
            }

            return newPos;
          });
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const imageColumns = [
    [fashion1, fashion2, fashion3],
    [fashion4, fashion5, fashion6],
    [fashion7, fashion8, fashion9]
  ];

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-20 bg-white">
      <div className="container bg-[#f0f2f3] my-10 rounded-lg mx-auto flex flex-col lg:flex-row items-center gap-8">
        
        {/* Left Side - Text and Countdown */}
        <div className="lg:w-1/2 w-full min-h-[400px] h-full flex items-center justify-center px-4">
          <div className="flex flex-col justify-center items-center text-center space-y-6 p-4 md:p-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Flash Sale
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-md">
              Don't miss out on our limited-time fashion sale! Get up to 50% off on selected items. 
              Hurry before the offer ends!
            </p>

            {/* Countdown Timer */}
            <div className="flex flex-wrap justify-center gap-3 my-4">
              {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => {
                const value = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][i];
                return (
                  <div key={label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold bg-gray-200 rounded-lg py-3 px-4 min-w-[60px] transition-all duration-300 transform hover:scale-105">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm mt-1 text-gray-500">{label}</div>
                  </div>
                );
              })}
            </div>

            <button className="bg-black text-white px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-300 transform hover:scale-105 shadow-lg">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Side - Image Columns */}
        <div className="lg:w-1/2 w-full flex justify-center gap-2 sm:gap-4 overflow-hidden h-[400px] sm:h-[500px] px-2 sm:px-4">
          {imageColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col items-center h-full">
              <div
                ref={columnRefs[colIndex]}
                className="flex flex-col items-center"
                style={{
                  transform: `translateY(-${scrollPositions[colIndex]}px)`,
                  transition: 'transform 0.1s linear'
                }}
              >
                {[...column, ...column].map((img, imgIndex) => (
                  <div
                    key={`${colIndex}-${imgIndex}`}
                    className="relative mb-4 h-64 sm:h-72 w-32 sm:w-48 overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`Fashion item ${colIndex * 3 + (imgIndex % 3) + 1}`}
                      className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-500 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FashionSaleSection;
