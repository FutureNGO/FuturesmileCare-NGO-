import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import serviceElectrical from "@/assets/service-electrical.jpg";
import serviceTransport from "@/assets/service-transport.jpg";
import wareHouse from "@/assets/warehouse_services.jpeg";
import Construction from '@/assets/Civil_services.jpeg';
import Plantation from '@/assets/plantation.jpg';
import Painting from '@/assets/paiting_services.jpeg';
import Manpower from '@/assets/manpower_services.jpeg';
import ServiceCarousel from "./ServiceCarousel";

const services = [
 {
    title: "Electrical Works",
    description:
      "Installation, maintenance, and smart metering projects.",
    image: serviceElectrical,
  },
  {
    title: "Manpower Supply",
    description:
      "Skilled & unskilled manpower for hotels, offices, and industries.",
    image: Manpower,
  },
  {
    title: "Transportation Services",
    description:
      "Fleet operations across multiple districts.",
    image: serviceTransport,
  },
  
  {
    title: "Civil Construction",
    description:
      "Residential, commercial, and infrastructure development.",
    image: Construction,
  },
   {
    title: "Warehouse Management",
    description:
      "Handling, storage, and distribution solutions.",
    image: wareHouse,
  },
  {
    title: "Plantation & Highway Beautification",
    description:
      "Roadside greenery and landscaping projects.",
    image: Plantation,
  },
  {
    title: "Painting & Decoration",
    description:
      "Industrial, commercial, and decorative painting works.",
    image: Painting,
  },
 
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="services"
      ref={ref}
      className="w-full px-2 md:px-12 lg:px-12 py-2 md:py-10"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center "
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="text-primary">Our</span>{" "}
          <span className="text-foreground">Services</span>
        </h2>
        <div className="w-16 h-1 bg-primary  mx-auto rounded-full" />
      </motion.div>

      {/* Service Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ServiceCarousel services={services} />
      </motion.div>
    </section>
  );
};

export default ServicesSection;
