import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Slider.css";

// ✅ Put optimized .webp images in public/slider/
const slides = [
  {
    img: "/slider/bg_(1).webp",
    title: "Modern Web Development",
    subtitle: "Build responsive and dynamic websites with React & Tailwind CSS",
  },
  {
    img: "/slider/bg_(2).webp",
    title: "Clean & Fast UI",
    subtitle: "Design beautiful user interfaces with modern frameworks",
  },
  {
    img: "/slider/bg_(3).webp",
    title: "Powerful Frontend Skills",
    subtitle: "Learn JavaScript, React, and Tailwind to create amazing apps",
  },
  {
    img: "/slider/bg_(4).webp",
    title: "Bring Ideas to Life",
    subtitle: "Turn your designs into functional and interactive websites",
  },
];

const Slider = () => {
  return (
    <div className="relative w-full h-56 md:h-72 lg:h-96 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="w-full h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            {/* Background Image */}
            <img
              src={slide.img}
              alt={slide.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover blur-xs"
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/30 text-white px-4">
              <h2 className="text-xl md:text-3xl font-bold drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="mt-2 text-sm md:text-lg drop-shadow-md">
                {slide.subtitle}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
