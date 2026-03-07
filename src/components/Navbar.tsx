import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import futuresmilelogo from "@/assets/futuresmilelogo.png";
import "./Navbar.css";
import ContactModal from "./ContactModal";

const navLinks = [
  { label: "Home", href: "/", isRoute: true, active: true },
  { label: "About Us", href: "#about", isRoute: false },
  { label: "Our Services", href: "#services", isRoute: false },
  { label: "Career", href: "/career", isRoute: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState<"light"|"dark">(
    () => {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        return stored as "light" | "dark";
      }
      // default to dark/night mode when no preference yet
      return "dark";
    }
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // apply theme class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);


  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Logo area */}
      <div className="flex items-center gap-2">
        <a href="#home" className="flex items-center">
          <img
            src={futuresmilelogo}
            alt="Future Smile"
            className="w-30 h-12"
          />
        </a>
        {/* Compact social icons */}
        {/* <div className="ml-3">
          <div className="example-1">
            <ul>
              <li className="icon-content">
                <a href="#" className="link" data-social="spotify" aria-label="Spotify">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" /></svg>
                </a>
              </li>
              <li className="icon-content">
                <a href="#" className="link" data-social="pinterest" aria-label="Pinterest">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" /></svg>
                </a>
              </li>
              <li className="icon-content">
                <a href="#" className="link" data-social="dribbble" aria-label="Dribbble">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" /></svg>
                </a>
              </li>
            </ul> */}
          {/* </div> */}
        {/* </div> */}
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          link.isRoute ? (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium transition-colors relative group ${
                link.active ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors relative group ${
                link.active ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          )
        ))}
        {/* theme toggle between links and contact */}
        
      </div>

      {/* Right side */}
      <div className="hidden md:flex items-center justify-center">
        <button
          type="button"
          className="contact-button"
          onClick={() => setShowModal(true)}
        >
          <div className="fold"></div>
          <div className="points_wrapper">
            <div className="point"></div>
            <div className="point"></div>
            <div className="point"></div>
            <div className="point"></div>
            <div className="point"></div>
            <div className="point"></div>
            <div className="point"></div>
            <div className="point"></div>
            <div className="point"></div>
            <div className="point"></div>
          </div>
          <div className="inner">Contact Us</div>
        </button>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden text-foreground z-50"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-background z-40 p-8 pt-20 flex flex-col gap-6 border-l border-border shadow-2xl"
          >
            {navLinks.map((link, i) => (
              link.isRoute ? (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={`text-lg font-medium block ${
                      link.active ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-lg font-medium block ${
                    link.active ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              )
            ))}
            <button
              type="button"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex items-center justify-center mb-4 p-2 rounded-full text-foreground hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              type="button"
              className="contact-button w-full"
              onClick={() => { setShowModal(true); setMobileOpen(false); }}
            >
              <div className="fold"></div>
              <div className="points_wrapper">
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
              </div>
              <div className="inner">Contact Us</div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <ContactModal open={showModal} onClose={() => setShowModal(false)} />
    </motion.nav>
  );
};

export default Navbar;

