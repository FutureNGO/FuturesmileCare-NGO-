import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import p1 from "@/assets/p1.png";
import p2 from "@/assets/p2.png";
import p3 from "@/assets/p3.png";
import p4 from "@/assets/p4.png";

const ClientsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const logos = [p1, p2, p3, p4];

  return (
    <section ref={ref} className="w-full py-5 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="text-primary">Our</span>{" "}
          <span className="text-foreground">Clients</span>
        </h2>
        <div className="w-16 h-1 bg-primary  mx-auto rounded-full " />
      </motion.div>
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee">
          {/* 4 baar repeat karo smooth loop ke liye */}
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-12"
            >
              <img
                src={logo}
                alt={`client-${index}`}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;