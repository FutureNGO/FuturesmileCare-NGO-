import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./SubsidiariesSection.css";
import futuresmilelogo from "@/assets/futuresmilelogo.png";
import kashiInfra from "@/assets/kashi infra.jpeg";
import kashiViswanath from "@/assets/kashi viswanath.jpeg";

const subsidiaries = [
  {
    name: "Kashi Infra",
    abbr: "KI",
    tag: "Infrastructure & Development",
    color: "#e05c2a",
    description: "Building tomorrow's foundations today",
    image: kashiInfra,
  },
  {
    name: "Kashi Biswanath",
    abbr: "KB",
    tag: "Heritage & Culture",
    color: "#e05c2a",
    description: "Preserving legacy, crafting heritage",
    image: kashiViswanath,
  },
];

const Leaf = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute rounded-full opacity-10 pointer-events-none"
    style={{
      background: "radial-gradient(circle, #da2e17, transparent)",
      ...style,
    }}
  />
);

const SubsidiariesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="subsidiaries"
      ref={ref}
      className="subsidiaries-section relative w-full px-6 py-5  overflow-hidden"
    >
      {/* Background orbs */}
      
      

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#4ade8020 1px, transparent 1px), linear-gradient(90deg, #ed2e1520 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="uppercase tracking-[0.4em] text-xs mb-4"
            style={{ color: "#e8160b", fontFamily: "monospace" }}
          >
            Our Ecosystem
          </p>
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(to right, transparent, #e8160b)" }} />
            {/* Tree Icon */}
            <div className="relative">
              <div
                className="w-25 h-25 rounded-2xl flex items-center justify-center"
                // style={{
                //   background: "linear-gradient(135deg, #ba9c9b, #0f1f0f)",
                //   border: "1px solid #4ade8030",
                //   boxShadow: "0 0 30px #4ade8020",
                // }}
              >
                <img src={futuresmilelogo} alt="Company Logo" className="w-15 h-15 object-contain" />
              </div>
              <div
                className="absolute -inset-2 rounded-3xl -z-10"
                style={{ background: "radial-gradient(circle, #e4bcaf15, transparent)" }}
              />
            </div>
            <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(to left, transparent, #e8160b)" }} />
          </div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{
              background: "linear-gradient(135deg, #f0fdf4, #f07924)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Subsidiaries
          </h1>
          <p className="text-sm" style={{ color: "#fbfafa" }}>
            Rooted in trust, growing with purpose
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {subsidiaries.map((sub, i) => (
            <div
              key={sub.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative cursor-pointer transition-all duration-500"
              style={{
                transform: hovered === i ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
              }}
            >
              {/* Card glow */}
              <div
                className="absolute -inset-px rounded-2xl transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${sub.color}40, transparent, #e8160b)`,
                  opacity: hovered === i ? 1 : 0,
                }}
              />

              <div
                className="relative rounded-2xl p-8 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #462828, #0d140d)",
                  border: `1px solid ${hovered === i ? sub.color + "50" : "#ffffff10"}`,
                  boxShadow: hovered === i ? `0 20px 60px ${sub.color}15, 0 0 0 1px ${sub.color}20` : "0 4px 20px #00000040",
                  transition: "all 0.4s ease",
                }}
              >
                {/* Background pattern */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full -mr-16 -mt-16 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${sub.color}08, transparent)`,
                    opacity: hovered === i ? 1 : 0.5,
                  }}
                />

                <div className="flex items-start gap-5 relative z-10">
                  {/* Avatar with Image */}
                  {sub.image ? (
                    <div
                      className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300"
                      style={{
                        // border: `2px solid ${sub.color}`,
                        boxShadow: hovered === i ? `0 8px 24px ${sub.color}40` : "none",
                      }}
                    >
                      <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${sub.color}, ${sub.color}aa)`,
                        boxShadow: hovered === i ? `0 8px 24px ${sub.color}40` : "none",
                        fontFamily: "monospace",
                      }}
                    >
                      {sub.abbr}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs uppercase tracking-widest mb-1 font-medium"
                      style={{ color: sub.color + "99", fontFamily: "monospace" }}
                    >
                      {sub.tag}
                    </div>
                    <h2
                      className="text-xl font-bold mb-2"
                      style={{
                        color: "#f0fdf4",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {sub.name}
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: "#e8160b" }}>
                      {sub.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  {/* <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      background: hovered === i ? sub.color + "20" : "transparent",
                      border: `1px solid ${hovered === i ? sub.color + "40" : "transparent"}`,
                    }}
                  >
                    <svg viewBox="0 0 16 16" className="w-4 h-4" style={{ color: hovered === i ? sub.color : "#ffffff30" }} fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div> */}
                </div>

                {/* Bottom bar */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 rounded-b-2xl"
                  style={{
                    background: `linear-gradient(to right, ${sub.color}, transparent)`,
                    width: hovered === i ? "100%" : "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          {/* <button
            className="group relative px-10 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              color: "#f0fdf4",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              boxShadow: "0 4px 20px #16a34a30",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 30px #e8160b";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 20px #e8160b";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
                <path d="M8 1a5 5 0 100 10A5 5 0 008 1zM6 8a2 2 0 114 0 2 2 0 01-4 0z" />
              </svg>
              Explore All Subsidiaries
            </span>
          </button> */}
        </motion.div>

        {/* Footer line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex items-center gap-4"
        >
          {/* <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #e8160b)" }} />
          <span className="text-xs" style={{ color: "#e8160b", fontFamily: "monospace" }}>
            KASHI GROUP
          </span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #e8160b)" }} /> */}
        </motion.div>
      </div>
    </section>
  );
};

export default SubsidiariesSection;
