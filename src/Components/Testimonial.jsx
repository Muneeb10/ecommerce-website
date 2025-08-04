import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import bg_1 from "../assets/Testimonial_images/bg_image_1.jpg";
import bg_2 from "../assets/Testimonial_images/bg_image_2.jpg";
import bg_3 from "../assets/Testimonial_images/bg_image_3.jpg";
import bg_4 from "../assets/Testimonial_images/bg_image_4.jpg";
import bg_5 from "../assets/Testimonial_images/bg_image_5.jpg";
import bg_6 from "../assets/Testimonial_images/bg_image_1.jpg";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    description: "Amazing quality and top-notch service. Highly recommended!",
    rating: 5,
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    bgImage: bg_1,
  },
  {
    id: 2,
    name: "Emily Rose",
    description: "Stylish and comfortable wear. Will buy again!",
    rating: 4,
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    bgImage: bg_2,
  },
  {
    id: 3,
    name: "Michael Smith",
    description: "Loved the fabric and fit. Great experience!",
    rating: 5,
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    bgImage: bg_3,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    description: "Perfect fit and beautiful design!",
    rating: 5,
    image: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg",
    bgImage: bg_4,
  },
  {
    id: 5,
    name: "Daniel Lee",
    description: "Quick delivery and great quality clothes!",
    rating: 4,
    image: "https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg",
    bgImage: bg_5,
  },
  {
    id: 6,
    name: "Olivia Jones",
    description: "Great shopping experience and helpful support.",
    rating: 5,
    image: "https://images.pexels.com/photos/2770600/pexels-photo-2770600.jpeg",
    bgImage: bg_6,
  },
];

const Testimonial = () => {
  const scrollRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3); // default

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }

      if (scrollRef.current) {
        const containerWidth = scrollRef.current.offsetWidth;
        setCardWidth(containerWidth / visibleCards - 24);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [visibleCards]);

  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    const maxIndex = reviews.length - visibleCards;
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);
    scrollRef.current.scrollTo({
      left: newIndex * (cardWidth + 24),
      behavior: "smooth",
    });
  };

  const scroll = (direction) => {
    const step = visibleCards;
    const maxIndex = reviews.length - visibleCards;
    const newIndex =
      direction === "left"
        ? Math.max(0, currentIndex - step)
        : Math.min(maxIndex, currentIndex + step);

    scrollToIndex(newIndex);
  };

  return (
    <div className="py-12 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Our Client Reviews
      </h2>

      <div className="relative max-w-7xl mx-auto px-4">
        {currentIndex > 0 && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full z-10 hover:bg-gray-100 transition"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="card flex-shrink-0 h-[400px] bg-cover bg-center rounded-2xl relative transition-all duration-300"
                style={{
                  backgroundImage: `url(${review.bgImage})`,
                  scrollSnapAlign: "start",
                  width: `${cardWidth}px`,
                  minWidth: `${cardWidth}px`,
                }}
              >
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl px-4 pt-16 pb-6 min-h-[200px]">
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-20 h-20 rounded-full border-4 border-white object-cover"
                    />
                  </div>

                  <div className="text-center mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{review.description}</p>
                    <div className="flex justify-center mt-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {currentIndex < reviews.length - visibleCards && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full z-10 hover:bg-gray-100 transition"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.ceil(reviews.length / visibleCards) }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i * visibleCards)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === Math.floor(currentIndex / visibleCards)
                ? "bg-gray-800 w-6"
                : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
