import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import './Slider.css'

const images = [
  "/slider/bg_(1).jpg",
  "/slider/bg_(2).jpg",
  "/slider/bg_(3).jpg",
  "/slider/bg_(4).jpg",
];

const captions = [
  {
    title: "Modern Web Development",
    subtitle: "Build responsive and dynamic websites with React & Tailwind CSS",
  },
  {
    title: "Clean & Fast UI",
    subtitle: "Design beautiful user interfaces with modern frameworks",
  },
  {
    title: "Powerful Frontend Skills",
    subtitle: "Learn JavaScript, React, and Tailwind to create amazing apps",
  },
  {
    title: "Bring Ideas to Life",
    subtitle: "Turn your designs into functional and interactive websites",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full h-56 md:h-72 lg:h-96 overflow-hidden rounded-2xl shadow-lg border border-gray-700">
      {/* Image */}
      <img
        src={images[current]}
        alt="slider"
         loading="lazy"                // ✅ lazy load images
        decoding="async"              // ✅ hint browser to decode async
        className="w-full h-full object-cover transition-opacity duration-700 blur-[2px]"
      />

      {/* Text Overlay with Animation */}
      <div
        key={current} // forces re-render to restart animation each slide
        className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/30 p-4 animate-fade-slide"
      >
        <h2 className="text-xl md:text-3xl font-bold drop-shadow-lg">
          {captions[current].title}
        </h2>
        <p className="mt-2 text-sm md:text-lg drop-shadow-md">
          {captions[current].subtitle}
        </p>
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
