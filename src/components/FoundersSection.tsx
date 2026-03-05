import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import founder1 from "@/assets/founder-1.jpg";
import founder2 from "@/assets/founder-2.jpg";
import ngoLogo from "@/assets/ngo-tree-logo.png";

const founders = [
  { name: "Kashi Infra", image: founder1, role: "Founder & CEO" },
  { name: "Kushit Biswanath", image: founder2, role: "Co-Founder & Director" },
];

const FoundersSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20">
        {/* Founder 1 */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center group"
        >
          <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary transition-all duration-500">
            <img
              src={founders[0].image}
              alt={founders[0].name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <h3 className="text-foreground font-bold text-xl italic">{founders[0].name}</h3>
          <p className="text-muted-foreground text-sm">{founders[0].role}</p>
        </motion.div>

        {/* Center Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
            <img src={ngoLogo} alt="NGO Logo" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Founder 2 */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center group"
        >
          <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary transition-all duration-500">
            <img
              src={founders[1].image}
              alt={founders[1].name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <h3 className="text-foreground font-bold text-xl italic">{founders[1].name}</h3>
          <p className="text-muted-foreground text-sm">{founders[1].role}</p>
        </motion.div>
      </div>

      {/* Read More */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center mt-10"
      >
        <button className="bg-primary hover:bg-primary/85 text-primary-foreground font-semibold px-10 py-3 text-sm tracking-wide transition-all duration-300 rounded hover:shadow-lg hover:shadow-primary/30">
          Read More
        </button>
      </motion.div>
    </section>
  );
};

export default FoundersSection;
