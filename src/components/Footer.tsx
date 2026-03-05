import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import futuresmilelogo from "@/assets/futuresmilelogo.png";

const Footer = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <footer id="contact" ref={ref} className="w-full ">
      {/* Contact Us Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        {/* <span className="bg-primary text-primary-foreground px-8 py-3 font-semibold text-sm tracking-wide">
          Contact Us
        </span> */}
      </motion.div>

      <div className="px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <a href="#home" className="w-22 h-22   flex items-center justify-center overflow-hidden">
                <img src={futuresmilelogo} alt="Future Smile" className="w-full h-full object-contain" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building safety and helping another
              people to achieve their goals through
              smart metering and electrical solutions.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-foreground font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {["Electrical Works", "Smart Metering", "Transportation", "Civil Construction"].map(
                (item) => (
                  <li key={item}>
                    <a href="#services" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-foreground font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Career"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(" ", "")}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
              {/* NGO link with blinking animation and route navigation */}
              <li>
                <Link
                  to="/ngo"
                  className="text-primary text-sm hover:text-primary transition-colors blink"
                >
                  NGO
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Get in Touch */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-foreground font-bold text-lg mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Ranchi, Jharkhand, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">info@futuresmile.com</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border px-6 md:px-12 lg:px-20 py-5 text-center">
        <p className="text-muted-foreground text-xs">
          © 2025 Future Smile Care. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
