import { motion } from "framer-motion";
import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image }) => {
  return (
    <motion.div
      className="w-[320px] h-[240px] p-2 bg-white/30 rounded-lg backdrop-blur-sm border-b-[3px] border-white/40 border-l-[2px] border-white/55 shadow-lg transform skew-x-3 transition-all duration-400 overflow-hidden text-white relative"
      whileHover={{ height: 254, skewX: 0 }}
    >
      {/* optional image background */}
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
      )}

      {/* circles in top-left */}
      <div className="flex flex-row gap-1 absolute top-2 left-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff605c] shadow-sm" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd44] shadow-sm" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#00ca4e] shadow-sm" />
      </div>

      <h1 className="text-center mt-8 text-lg font-semibold text-[#daf4ed] drop-shadow-lg">
        {title}
      </h1>
      <p className="text-xs mt-2 text-white/80">
        {description}
      </p>
    </motion.div>
  );
};

export default ServiceCard;
