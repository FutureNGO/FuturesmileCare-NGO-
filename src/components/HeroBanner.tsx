import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./HeroBanner.css";
import bannerBg1 from "@/assets/Banner1.png";
import bannerBg2 from "@/assets/Banner2.png";
import bannerBg3 from "@/assets/Banner3.png";
import bannerBg4 from "@/assets/Banner4.png";
import bannerBg5 from "@/assets/Banner5.png";


const slides = [
  {
    image: bannerBg1,
    title: "Building a Smarter Tomorrow – Smart Meter Installation by Future Smile Care",
    description: "Delivering reliable, transparent, and efficient energy solutions to every household. Our team ensures safe and seamless smart meter installation for a brighter, connected future.",
  },
  {
    image: bannerBg2,
    title: "Building a Smarter Tomorrow – Smart Meter Installation by Future Smile Care",
    description: "Delivering reliable, transparent, and efficient energy solutions to every household. Our team ensures safe and seamless smart meter installation for a brighter, connected future.",
  },
  {
    image: bannerBg3,
    title: "Powering a Brighter Tomorrow – Solar Solutions by Future Smile Care",
    description: "Delivering clean, reliable, and sustainable solar energy solutions for homes and businesses. Future Smile Care ensures expert installation, maximum efficiency, and a smarter, greener future for every customer.",
  },
  {
    image: bannerBg4,
    title: "Future Smile Care – Empowering Industries with Skilled Manpower",
    description: "Delivering trained, reliable, and safety-focused professionals to power your projects with precision, efficiency, and trust.",
  },
  {
    image: bannerBg5,
    title: "Growing Greener Tomorrows with Future Smile Care",
    description: "Committed to sustainable plantation, landscape maintenance, and environmental care to create cleaner, healthier, and more beautiful communities.",
  },

];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home" className="w-full px-4 md:px-6 lg:px-8 pt-20">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slides[current].image}
            alt={slides[current].title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        {/* Dark Overlay */}
        {/* <div className="absolute inset-0" /> */}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-t-5 lg:p-t-5 ml-10 gap-10">
          <div className="flex flex-col items-start justify-center flex-1 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.h1
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-4xl font-bold text-foreground leading-tight mb-8"
              >
                {slides[current].title}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm md:text-l text-foreground/90 mb-10 max-w-2xl"
              >
                {slides[current].description}
              </motion.p>
            </AnimatePresence>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="cyberpunk-btn"
            >
              Know More
            </motion.button>
          </div>

          {/* Navigation Arrows */}
          <div className="relative m-t-10 m-l-10">
            <div className="inline-flex items-center gap-5  px-10 py-4 -ml-10 -mb-5 md:-ml-12 md:-mb-5 lg:-ml-16 lg:-mb-5">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center hover:bg-black/90 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center hover:bg-black/90 transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 right-8 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary w-8" : "bg-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
