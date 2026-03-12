import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import aboutImage from "@/assets/aboutusimg.jpg";
import "./GradientButton.css";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const fullHeading = "Welcome to Future Smile Care";
  const [typed, setTyped] = useState("");

  // typing animation
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullHeading.slice(0, i + 1));
      i++;
      if (i >= fullHeading.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen text-white py-16 px-6 flex flex-col md:flex-row items-center justify-between gap-8"
    >

      {/* Left Side: Image */}
      <div className="w-full md:w-5/12 flex justify-center h-full md:justify-end">
        <img
          src={aboutImage}
          alt="About Me"
          className="w-72 h-99 md:w-80 lg:w-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="w-full md:w-7/12 text-center md:text-left relative">

        <div className="absolute left-[40%] -top-4 md:-left-20  lg:top-0 md:top-4 rotate-0 md:rotate-[-90deg] text-sm tracking-widest">
          <div className="flex items-center justify-center gap-1">
            <div className="w-7 h-[1px] bg-white"></div>
            <p>Director message</p>
          </div>
        </div>

        {/* Main Heading with typing effect */}
        <h2 className="text-1xl md:text-4xl font-bold leading-tight mb-6 pl-10 mt-8">
          {typed}
        </h2>

        {/* Description */}
        <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0 mt-5">
          Greetings from Future Smile Care.

          At Future Smile Care, we believe that sustainable growth is built on trust, quality, and commitment. As a subsidiary of Kashi Infra & MK Kashi Vishwanath Enterprises, we have successfully expanded our operations across 21 districts of Uttar Pradesh and Bihar.

          We are actively delivering services in electrical works, civil construction, transportation, manpower supply, warehouse management, and plantation projects. Our collaborations with reputed organizations like GMR, Genus Power, Intelli Smart, and Rudra Infra Tech reflect the confidence our partners have in our capabilities.

          Our vision is to continue strengthening our services, build long-term partnerships, and contribute to sustainable development with professionalism and efficiency.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          {/* <a
            href="#projects"
            className="bg-tertiary text-white font-semibold py-2 px-4 rounded-lg hover:bg-tertiary/80 text-center"
          >
            See Projects
          </a> */}
          <button
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="border border-tertiary text-white font-semibold py-3 px-5 rounded-lg hover:bg-tertiary/10 text-center rotate-button"
          >
            More Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
