import { useState, useEffect, useRef, ReactNode, CSSProperties } from "react";
import { Link } from "react-router-dom";
import futuresmileLogo from "../assets/futuresmilelogo.png";
import careerApi from "@/api/careerApi";
import ngoBannerImg from "../assets/NGOBannerimg.webp";
import ngoAboutImg from "../assets/NGOAboutimg.webp";
import ngoFounderImg from "../assets/NGOFounderimg.webp";
import coreMember1 from "../assets/Coremember1.jpg";
import coreMember2 from "../assets/Coremember2.jpg";
import coreMember3 from "../assets/Coremember3.jpg";
import coreMember4 from "../assets/Coremember4.jpg";
import coreMember5 from "../assets/Coremember5.jpg";
import coreMember6 from "../assets/Coremember6.jpg";
import coreMember7 from "../assets/Coremember7.jpg";
import coreMember8 from "../assets/Coremember8.jpg";
// import Gallery from "@/components/Gallery";

// ── Bank Details Modal ────────────────────────────────────────────────────────
function BankDetailsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        padding: "40px",
        maxWidth: 500,
        position: "relative",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <button onClick={onClose} style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "none",
          border: "2px solid #24ca9b",
          borderRadius: "50%",
          width: 32,
          height: 32,
          fontSize: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>✕</button>
        
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "#000", marginBottom: 32, textAlign: "center", fontFamily: "'Playfair Display', serif" }}>Bank Account Details</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div style={{ color: "#666", fontSize: 14, fontWeight: 500 }}>Bank Name</div>
            <div style={{ color: "#000", fontSize: 16, fontWeight: 600, marginTop: 4 }}>STATE BANK OF INDIA</div>
          </div>
          
          <div>
            <div style={{ color: "#666", fontSize: 14, fontWeight: 500 }}>Branch</div>
            <div style={{ color: "#000", fontSize: 16, fontWeight: 600, marginTop: 4 }}>HATHUWA</div>
          </div>
          
          <div>
            <div style={{ color: "#666", fontSize: 14, fontWeight: 500 }}>Branch Code</div>
            <div style={{ color: "#000", fontSize: 16, fontWeight: 600, marginTop: 4 }}>2945</div>
          </div>
          
          <div>
            <div style={{ color: "#666", fontSize: 14, fontWeight: 500 }}>IFSC</div>
            <div style={{ color: "#000", fontSize: 16, fontWeight: 600, marginTop: 4 }}>SBIN0002945</div>
          </div>
          
          <div>
            <div style={{ color: "#666", fontSize: 14, fontWeight: 500 }}>MICR</div>
            <div style={{ color: "#000", fontSize: 16, fontWeight: 600, marginTop: 4 }}>841002112</div>
          </div>
          
          <div>
            <div style={{ color: "#666", fontSize: 14, fontWeight: 500 }}>Account No.</div>
            <div style={{ color: "#000", fontSize: 16, fontWeight: 600, marginTop: 4 }}>42460349806</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
}

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  delay: number;
}

interface Program {
  icon: string;
  title: string;
  desc: string;
  tag: string;
  color: string;
}

interface Member {
  name: string;
  role: string;
  emoji: string;
  image?: string;
  bg: string;
}

interface FooterCol {
  title: string;
  links: string[];
}

interface CarouselControls {
  current: number;
  go: (dir: "prev" | "next") => void;
  pause: () => void;
  resume: () => void;
}

// ── Hooks ──────────────────────────────────────────────────────────────────────
function useInView(options: IntersectionObserverInit = {}): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCounter(target: number, inView: boolean, duration = 2000): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function useCarousel(total: number, visibleCount = 1, auto = true, interval = 3500): CarouselControls {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxIndex = total - visibleCount;

  const go = (dir: "prev" | "next") => {
    setCurrent(c => dir === "next" ? (c >= maxIndex ? 0 : c + 1) : (c <= 0 ? maxIndex : c - 1));
  };

  useEffect(() => {
    if (!auto) return;
    timerRef.current = setInterval(() => go("next"), interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [total, visibleCount, interval]);

  const pause = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const resume = () => { timerRef.current = setInterval(() => go("next"), interval); };

  return { current, go, pause, resume };
}

// ── Reveal ─────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up", className = "" }: RevealProps) {
  const [ref, inView] = useInView();
  const transforms: Record<string, string> = {
    up: "translateY(60px)", down: "translateY(-60px)",
    left: "translateX(-60px)", right: "translateX(60px)", scale: "scale(0.85)"
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : transforms[direction],
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
    }}>
      {children}
    </div>
  );
}

// ── StatCard ───────────────────────────────────────────────────────────────────
function StatCard({ value, label, suffix = "+", delay }: StatCardProps) {
  const [ref, inView] = useInView();
  const count = useCounter(value, inView);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(40px) scale(0.9)",
      transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      textAlign: "center"
    }}>
      <div style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 900, color: "#34d399", marginBottom: 8, fontVariantNumeric: "tabular-nums" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ color: "#9ca3af", fontSize: 12, letterSpacing: 3, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar({ onDonateClick }: { onDonateClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Handle hash navigation scrolling
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const links = ["Main Page","About", "Mission", "Programs", "Team", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(5,10,8,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(52,211,153,0.1)" : "none",
      transition: "all 0.4s ease"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <img src={futuresmileLogo} alt="Future Smile Care" style={{ height: 40, width: "auto" }} />
        </Link>

        {/* Desktop Links */}
        <div className="ngo-hidden-mobile" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {links.map(l => (
            l === "Main Page" ? (
              <Link key={l} to="/"
                style={{ color: "#9ca3af", fontSize: 13, fontWeight: 500, textDecoration: "none", letterSpacing: 0.5, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#34d399")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>{l}</Link>
            ) : (
              <button 
                key={l} 
                onClick={() => scrollToSection(l.toLowerCase())}
                style={{ 
                  color: "#9ca3af", 
                  fontSize: 13, 
                  fontWeight: 500, 
                  textDecoration: "none", 
                  letterSpacing: 0.5, 
                  transition: "color 0.2s",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#34d399")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>
                {l}
              </button>
            )
          ))}
          <button onClick={onDonateClick}
            style={{ background: "linear-gradient(135deg,#34d399,#059669)", color: "#fff", border: "none", padding: "10px 22px", borderRadius: 50, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 20px rgba(52,211,153,0.3)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(52,211,153,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 20px rgba(52,211,153,0.3)"; }}>
            Donate Now
          </button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="ngo-show-mobile"
          style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer" }}>☰</button>
      </div>

      {menuOpen && (
        <div style={{ background: "rgba(5,10,8,0.98)", padding: "20px 24px", borderTop: "1px solid rgba(52,211,153,0.1)" }}>
          {links.map(l => (
            l === "Main Page" ? (
              <Link key={l} to="/" onClick={() => setMenuOpen(false)}
                style={{ display: "block", color: "#9ca3af", padding: "12px 0", fontSize: 15, textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{l}</Link>
            ) : (
              <button 
                key={l} 
                onClick={() => { scrollToSection(l.toLowerCase()); setMenuOpen(false); }}
                style={{ 
                  display: "block", 
                  color: "#9ca3af", 
                  padding: "12px 0", 
                  fontSize: 15, 
                  textDecoration: "none", 
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left"
                }}>
                {l}
              </button>
            )
          ))}
          <button onClick={onDonateClick} style={{ marginTop: 16, width: "100%", background: "linear-gradient(135deg,#34d399,#059669)", color: "#fff", border: "none", padding: "12px", borderRadius: 50, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Donate Now</button>
        </div>
      )}
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero({ onDonateClick }: { onDonateClick: () => void }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fn = () => setOffset(window.scrollY * 0.4);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#050a08" }}>
      {/* Parallax BG */}
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${offset}px)`, transition: "transform 0.1s linear" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(52,211,153,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 300, height: 300, borderRadius: "50%", background: "rgba(52,211,153,0.05)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 200, height: 200, borderRadius: "50%", background: "rgba(16,185,129,0.08)", filter: "blur(40px)" }} />
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#34d399",
            opacity: 0.2, top: `${(i * 7.5) % 90}%`, left: `${(i * 8.3) % 90}%`,
            animation: `ngoFloat ${3 + i * 0.5}s ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px", width: "100%" }}>
        <div className="ngo-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 50, padding: "8px 16px", marginBottom: 28, animation: "ngoFadeInDown 0.8s ease" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399", display: "inline-block", animation: "ngoPulse 2s infinite" }} />
              <span style={{ color: "#34d399", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>Empowering Communities</span>
            </div>
            <h1 style={{ fontSize: "clamp(2.5rem,6vw,3.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.05, fontFamily: "'Playfair Display',serif", marginBottom: 24, animation: "ngoFadeInUp 0.9s ease 0.1s both" }}>
              Bringing smiles and<br />
              <span style={{ color: "#34d399" }}>making a positive</span><br />
              <em style={{ fontStyle: "italic", color: "#6ee7b7", fontSize: 35 }}>impact in communities.</em>
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 17, lineHeight: 1.8, marginBottom: 40, maxWidth: 480, animation: "ngoFadeInUp 0.9s ease 0.2s both" }}>
              We are building a healthier, smarter world — one smile at a time. Join us in our mission to bring sustainable change to communities across India.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "ngoFadeInUp 0.9s ease 0.3s both" }}>
              <button onClick={scrollToContact} style={{ background: "linear-gradient(135deg,#34d399,#059669)", color: "#fff", border: "none", padding: "16px 36px", borderRadius: 50, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 30px rgba(52,211,153,0.35)", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(52,211,153,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 30px rgba(52,211,153,0.35)"; }}>
                🤝 Join Our Mission
              </button>
              <button style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "16px 36px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#34d399"; e.currentTarget.style.color = "#34d399"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}>
                ▶ Watch Story
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", animation: "ngoFadeInRight 1s ease 0.4s both" }}>
            <div style={{ width: 380, height: 480, borderRadius: 32, background: "linear-gradient(135deg,rgba(52,211,153,0.15),rgba(5,150,105,0.05))", border: "1px solid rgba(52,211,153,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, position: "relative", backdropFilter: "blur(10px)", overflow: "hidden" }}>
              <img src={ngoBannerImg} alt="NGO Banner" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 32, position: "absolute", inset: 0 }} />
              <div style={{ position: "absolute", top: 30, right: -20, background: "#059669", borderRadius: 16, padding: "10px 18px", boxShadow: "0 8px 30px rgba(5,150,105,0.4)", animation: "ngoFloat 3s ease-in-out infinite", zIndex: 10 }}>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>2000+</div>
                <div style={{ color: "#a7f3d0", fontSize: 10, letterSpacing: 1 }}>LIVES CHANGED</div>
              </div>
              <div style={{ position: "absolute", bottom: 40, left: -10, background: "#065f46", borderRadius: 16, padding: "10px 16px", border: "1px solid rgba(52,211,153,0.3)", animation: "ngoFloat 4s ease-in-out infinite 1s", zIndex: 10 }}>
                <div style={{ color: "#34d399", fontWeight: 800, fontSize: 16 }}>Since 2018</div>
                <div style={{ color: "#6ee7b7", fontSize: 10, letterSpacing: 1 }}>SERVING INDIA</div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── StatsBar ───────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section style={{ background: "linear-gradient(135deg,#022c22,#064e3b)", padding: "2px 20px", borderTop: "1px solid rgba(52,211,153,0.15)", borderBottom: "1px solid rgba(52,211,153,0.15)" }}>
      <div className="ngo-stats-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
        <StatCard value={2000} label="Lives Impacted" delay={0} />
        <StatCard value={150} label="Volunteers" delay={100} />
        <StatCard value={6} label="Years Active" suffix="" delay={200} />
        <StatCard value={12} label="Programs" delay={300} />
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: "#050a08", padding: "120px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ color: "#34d399", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Who We Are</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, color: "#fff", fontFamily: "'Playfair Display',serif", lineHeight: 1.15 }}>About Future Smile Care</h2>
            <div style={{ width: 60, height: 3, background: "linear-gradient(90deg,#34d399,#059669)", borderRadius: 2, margin: "24px auto 0" }} />
          </div>
        </Reveal>

        <div className="ngo-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <Reveal direction="left">
            <div style={{ position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: 24, background: "linear-gradient(135deg,#022c22,#064e3b)", border: "1px solid rgba(52,211,153,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, position: "relative", overflow: "hidden" }}>
                <img src={ngoAboutImg} alt="About NGO" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", bottom: -20, right: -20, background: "#059669", borderRadius: 20, padding: "20px 28px", boxShadow: "0 20px 40px rgba(5,150,105,0.4)" }}>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: 28 }}>500+</div>
                <div style={{ color: "#a7f3d0", fontSize: 12 }}>Donors Worldwide</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal direction="right" delay={100}>
              <p style={{ color: "#9ca3af", fontSize: 16, lineHeight: 2, marginBottom: 24 }}>
                Future Smile Care is a passionate non-governmental organization committed to transforming lives through innovative health, education, and community development programs across India.
              </p>
            </Reveal>
            <Reveal direction="right" delay={200}>
              <p style={{ color: "#9ca3af", fontSize: 16, lineHeight: 2, marginBottom: 32 }}>
                Founded with a vision of a smile on every face, we work tirelessly to provide access to quality healthcare, educational resources, and wellness programs for underserved communities.
              </p>
            </Reveal>
            <Reveal direction="right" delay={300}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["Registered NGO under Indian Law", "ISO Certified Organization", "100% Transparent Funding"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(52,211,153,0.15)", border: "1px solid #34d399", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "#34d399", fontSize: 12 }}>✓</span>
                    </div>
                    <span style={{ color: "#e5e7eb", fontSize: 15 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Mission ────────────────────────────────────────────────────────────────────
function Mission({ onDonateClick }: { onDonateClick: () => void }) {
  const cards = [
    { icon: "💰", title: "Give a Donation", desc: "Every rupee you donate directly impacts a life. Support our campaigns with financial contributions that fund medical aid, scholarships, and community centers.", color: "#059669" },
    { icon: "🤝", title: "Become a Volunteer", desc: "We are always welcoming passionate volunteers ready to dedicate their time, skills, and energy to meaningful community service.", color: "#0d9488" },
    { icon: "📢", title: "Support Community Outreach", desc: "Collaborate with us to spread awareness, organize events, and mobilize resources for communities that need it most.", color: "#0891b2" },
  ];

  return (
    <section id="mission" style={{ background: "#030806", padding: "120px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ color: "#34d399", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Our Mission</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, color: "#fff", fontFamily: "'Playfair Display',serif" }}>How You Can Help</h2>
          </div>
        </Reveal>
        <div className="ngo-three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 150} direction="up">
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(52,211,153,0.12)", borderRadius: 24, padding: 40, transition: "all 0.4s", cursor: "default", position: "relative", overflow: "hidden" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(52,211,153,0.05)"; e.currentTarget.style.borderColor = "rgba(52,211,153,0.35)"; e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(52,211,153,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(52,211,153,0.12)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${c.color},transparent)` }} />
                <div style={{ fontSize: 48, marginBottom: 10 }}>{c.icon}</div>
                <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 800, marginBottom: 10, fontFamily: "'Playfair Display',serif" }}>{c.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.8 }}>{c.desc}</p>
                <button onClick={() => {
                  if (i === 0) {
                    // Give a Donation - show donate modal
                    onDonateClick();
                  } else {
                    // Become a Volunteer & Support Community Outreach - scroll to contact
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }
                }} style={{ marginTop: 10, background: "transparent", border: `1px solid #059669`, color: "#059669", padding: "10px 24px", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = c.color; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = c.color; }}>
                  Learn More →
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Programs Carousel ──────────────────────────────────────────────────────────
function Programs() {
  const programs: Program[] = [
    { icon: "🩺", title: "Providing Clean Water", desc: "Implementing water purification and distribution systems in rural areas lacking access to clean drinking water.", tag: "Health", color: "#059669" },
    { icon: "📚", title: "Educating Children", desc: "Supporting underprivileged children with scholarships, school supplies, and after-school tutoring programs.", tag: "Education", color: "#0891b2" },
    { icon: "🧘", title: "Health and Wellness", desc: "Organizing medical camps, mental health workshops, and yoga sessions to promote holistic community wellness.", tag: "Wellness", color: "#7c3aed" },
    { icon: "🌱", title: "Environmental Care", desc: "Tree plantation drives, waste management awareness and training rural communities in sustainable living practices.", tag: "Environment", color: "#65a30d" },
    { icon: "💊", title: "Medical Aid", desc: "Free medicine distribution and specialist consultations for families unable to afford quality healthcare.", tag: "Health", color: "#059669" },
    { icon: "👩‍💼", title: "Women Empowerment", desc: "Skill development, self-help groups and entrepreneurship training for women across semi-urban communities.", tag: "Empowerment", color: "#db2777" },
  ];

  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisible(1);
      else if (window.innerWidth < 1024) setVisible(2);
      else setVisible(3);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const { current, go, pause, resume } = useCarousel(programs.length, visible, true, 3200);

  return (
    <section id="programs" style={{ background: "#050a08", padding: "120px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ color: "#34d399", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 5, fontWeight: 600 }}>What We Do</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, color: "#fff", fontFamily: "'Playfair Display',serif" }}>Our Programs</h2>
            <div style={{ width: 60, height: 3, background: "linear-gradient(90deg,#34d399,#059669)", borderRadius: 2, margin: "24px auto 0" }} />
          </div>
        </Reveal>

        <Reveal>
          <div style={{ position: "relative" }} onMouseEnter={pause} onMouseLeave={resume}>
            <div style={{ overflow: "hidden", borderRadius: 20 }}>
              <div style={{
                display: "flex", gap: 24,
                transition: "transform 0.6s cubic-bezier(0.25,1,0.5,1)",
                transform: `translateX(calc(-${current * (100 / visible)}% - ${current * 24 / visible}px))`
              }}>
                {programs.map((p, i) => (
                  <div key={i} style={{ minWidth: `calc(${100 / visible}% - ${(visible - 1) * 24 / visible}px)`, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 36, position: "relative", transition: "border-color 0.3s,box-shadow 0.3s", flexShrink: 0 }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${p.color}60`; e.currentTarget.style.boxShadow = `0 12px 40px ${p.color}18`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${p.color},transparent)`, borderRadius: "20px 20px 0 0" }} />
                    <span style={{ background: `${p.color}20`, color: p.color, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 12px", borderRadius: 50, border: `1px solid ${p.color}40` }}>{p.tag}</span>
                    <div style={{ fontSize: 44, margin: "20px 0 16px" }}>{p.icon}</div>
                    <h3 style={{ color: "#f9fafb", fontSize: 18, fontWeight: 800, marginBottom: 12 }}>{p.title}</h3>
                    <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.85 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {(["prev", "next"] as const).map((dir) => (
              <button key={dir} onClick={() => go(dir)} style={{
                position: "absolute", top: "50%", [dir === "prev" ? "left" : "right"]: -20,
                transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%",
                background: "#064e3b", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399",
                fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 10, transition: "all 0.2s", boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#059669"; e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#064e3b"; e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}>
                {dir === "prev" ? "←" : "→"}
              </button>
            ))}

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
              {Array.from({ length: programs.length - visible + 1 }).map((_, i) => (
                <button key={i} onClick={() => go(i > current ? "next" : "prev")}
                  style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, background: i === current ? "#34d399" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "all 0.35s", padding: 0 }} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Core Members Carousel ──────────────────────────────────────────────────────
function CoreMembersCarousel() {
  const members: Member[] = [
    { name: "Sushil Kumar", role: "Program Director", emoji: "👩", image: coreMember1, bg: "#065f46" },
    { name: "Ramesh Ray", role: "Field Coordinator", emoji: "👨", image: coreMember2, bg: "#0c4a6e" },
    { name: "Yashwant Kumar", role: "Finance Head", emoji: "👨‍💼", image: coreMember3, bg: "#4c1d95" },
    { name: "Raj Kumar Ray", role: "Outreach Manager", emoji: "🧑", image: coreMember4, bg: "#78350f" },
    { name: "Pawan Kumar Singh", role: "Volunteer Lead", emoji: "👦", image: coreMember5, bg: "#881337" },
    { name: "Nitesh Dubey", role: "Health Advisor", emoji: "👩‍⚕️", image: coreMember6, bg: "#14532d" },
    { name: "Sonali Singh", role: "Communications", emoji: "🧑‍💻", image: coreMember7, bg: "#1e3a5f" },
  ];

  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisible(1);
      else if (window.innerWidth < 1024) setVisible(2);
      else setVisible(4);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const { current, go, pause, resume } = useCarousel(members.length, visible, true, 2800);

  return (
    <div style={{ position: "relative" }} onMouseEnter={pause} onMouseLeave={resume}>
      <div style={{ overflow: "hidden" }}>
        <div style={{
          display: "flex", gap: 20,
          transition: "transform 0.55s cubic-bezier(0.25,1,0.5,1)",
          transform: `translateX(calc(-${current * (100 / visible)}% - ${current * 20 / visible}px))`
        }}>
          {members.map((m, i) => (
            <div key={i} style={{ minWidth: `calc(${100 / visible}% - ${(visible - 1) * 20 / visible}px)`, flexShrink: 0, textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "28px 20px", transition: "all 0.3s", cursor: "default" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(52,211,153,0.35)"; e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(52,211,153,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: m.image ? "none" : `linear-gradient(135deg,${m.bg},rgba(0,0,0,0.3))`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: "2px solid rgba(52,211,153,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)", overflow: "hidden" }}>
                {m.image ? <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : m.emoji}
              </div>
              <div style={{ color: "#f9fafb", fontWeight: 700, fontSize: 15 }}>{m.name}</div>
            </div>
          ))}
        </div>
      </div>

      {(["prev", "next"] as const).map((dir) => (
        <button key={dir} onClick={() => go(dir)} style={{
          position: "absolute", top: "50%", [dir === "prev" ? "left" : "right"]: -18,
          transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%",
          background: "#064e3b", border: "1px solid rgba(52,211,153,0.25)", color: "#34d399",
          fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10, transition: "all 0.2s", boxShadow: "0 4px 16px rgba(0,0,0,0.4)"
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#059669"; e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#064e3b"; e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}>
          {dir === "prev" ? "←" : "→"}
        </button>
      ))}

      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 28 }}>
        {Array.from({ length: members.length - visible + 1 }).map((_, i) => (
          <button key={i} style={{ width: i === current ? 24 : 7, height: 7, borderRadius: 4, background: i === current ? "#34d399" : "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", transition: "all 0.35s", padding: 0 }} />
        ))}
      </div>
    </div>
  );
}
// ── Founder ────────────────────────────────────────────────────────────────────
function Founder({ onDonateClick }: { onDonateClick: () => void }) {
  return (
    <section id="team" style={{ background: "#030806", padding: "120px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{ color: "#34d399", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Leadership</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, color: "#fff", fontFamily: "'Playfair Display',serif" }}>Meet Our Founder</h2>
          </div>
        </Reveal>

        <div className="ngo-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(52,211,153,0.12)", borderRadius: 32, padding: 60, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: "radial-gradient(circle,rgba(52,211,153,0.06),transparent)", borderRadius: "50%" }} />
          <Reveal direction="left">
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 200, height: 200, borderRadius: "50%", background: "linear-gradient(135deg,#022c22,#065f46)", border: "3px solid rgba(52,211,153,0.3)", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 70, boxShadow: "0 0 40px rgba(52,211,153,0.15)", overflow: "hidden" }}><img src={ngoFounderImg} alt="Founder" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 20, fontFamily: "'Playfair Display',serif" }}>Dr. Vivek Kumar</div>
              <div style={{ color: "#34d399", fontSize: 13, marginTop: 6, letterSpacing: 1 }}>Founder & Director</div>
            </div>
          </Reveal>
          <div>
            <Reveal direction="right" delay={100}>
              <blockquote style={{ color: "#9ca3af", fontSize: 17, lineHeight: 2, fontStyle: "italic", borderLeft: "3px solid #34d399", paddingLeft: 24, marginBottom: 28 }}>
                "Our vision is simple — a world where every child has access to quality education, every family has access to healthcare, and every community thrives with dignity and joy."
              </blockquote>
            </Reveal>
            <Reveal direction="right" delay={200}>
              <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.9 }}>
                Dr. Vivek Kumar founded Future Smile Care with a strong belief that grassroots action creates lasting change. With a background in public health and community medicine, he has dedicated over a decade to serving India's most underserved populations.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Core Members */}
        <Reveal delay={100}>
          <h3 style={{ textAlign: "center", color: "#fff", fontSize: 28, fontWeight: 800, fontFamily: "'Playfair Display',serif", marginTop: 80, marginBottom: 48 }}>Core Members</h3>
        </Reveal>
        <CoreMembersCarousel />
      </div>
    </section>
  );
}

// ── CTABanner ──────────────────────────────────────────────────────────────────
// function CTABanner() {
//   return (
//     <section style={{ background: "linear-gradient(135deg,#022c22 0%,#064e3b 50%,#022c22 100%)", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%,rgba(52,211,153,0.1) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(16,185,129,0.08) 0%,transparent 50%)" }} />
//       <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
//         <Reveal direction="up">
//           <div style={{ fontSize: 48, marginBottom: 20 }}>💚</div>
//           <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, color: "#fff", fontFamily: "'Playfair Display',serif", marginBottom: 20 }}>Ready to Make a Difference?</h2>
//           <p style={{ color: "#a7f3d0", fontSize: 17, lineHeight: 1.8, marginBottom: 44 }}>
//             Your support — big or small — creates ripples of change. Donate, volunteer, or simply spread the word. Every action counts.
//           </p>
//           <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
//             <button style={{ background: "#fff", color: "#059669", border: "none", padding: "18px 44px", borderRadius: 50, fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 30px rgba(0,0,0,0.2)", transition: "all 0.3s" }}
//               onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.3)"; }}
//               onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)"; }}>
//               💝 Donate Now
//             </button>
//             <button style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", padding: "18px 44px", borderRadius: 50, fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "all 0.3s" }}
//               onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
//               onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; }}>
//               🙋 Volunteer
//             </button>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// ── Contact ────────────────────────────────────────────────────────────────────
function Contact({ onDonateClick }: { onDonateClick: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!form.name || !form.email || !form.message) return;
    try {
      setLoading(true);
      const res = await careerApi.sendContact(form);
      setStatus({ type: "success", message: res.message || "Message sent!" });
      setForm({ name: "", email: "", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setTimeout(() => setStatus(null), 4000);
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Failed to send" });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: CSSProperties = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "16px 20px", borderRadius: 14, fontSize: 15, outline: "none", width: "100%", boxSizing: "border-box", transition: "all 0.3s", fontFamily: "inherit" };

  return (
    <section id="contact" style={{ background: "#050a08", padding: "120px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#34d399", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Get In Touch</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, color: "#fff", fontFamily: "'Playfair Display',serif" }}>Contact Us</h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: 28, padding: 52 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
                <div style={{ color: "#34d399", fontWeight: 800, fontSize: 22 }}>Message Sent!</div>
                <div style={{ color: "#6b7280", marginTop: 8 }}>We'll get back to you soon.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(52,211,153,0.5)"; e.currentTarget.style.background = "rgba(52,211,153,0.04)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }} />
                <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(52,211,153,0.5)"; e.currentTarget.style.background = "rgba(52,211,153,0.04)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }} />
                <textarea placeholder="Your Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(52,211,153,0.5)"; e.currentTarget.style.background = "rgba(52,211,153,0.04)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }} />
                <button onClick={handle} disabled={loading} style={{ background: "linear-gradient(135deg,#34d399,#059669)", color: "#fff", border: "none", padding: "18px", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: loading ? "default" : "pointer", boxShadow: "0 0 30px rgba(52,211,153,0.25)", transition: "all 0.3s", opacity: loading ? 0.6 : 1 }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(52,211,153,0.45)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(52,211,153,0.25)"; e.currentTarget.style.transform = "none"; }}>
                  {loading ? "Sending..." : "Send Message 🚀"}
                </button>
                {status && (
                  <div style={{ marginTop: 12, color: status.type === "success" ? "#34d399" : "#f87171", fontWeight: 600, fontSize: 14 }}>
                    {status.message}
                  </div>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer({ onDonateClick }: { onDonateClick: () => void }) {
  const cols: FooterCol[] = [
    // { title: "Services", links: ["Electrical Work", "Civil Construction", "Transportation", "Highway Projects"] },
    { title: "Quick Links", links: ["Home", "About Us", "Programs", "Donate"] },
    { title: "Contact", links: ["Tola Bada Koirauli, Tola Bada Koirauli, Panch Machhagar Vill: Machhagar Patti Jagdish, Hathua, Gopalganj, Bihar - 841436", "Info@futuresmilecare.com", "+91 7462-032229"] },
  ];

  return (
    <footer style={{ background: "#020704", borderTop: "1px solid rgba(52,211,153,0.1)", padding: "60px 24px 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="ngo-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 0.8fr 1fr 1fr 1fr", gap: 50, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src={futuresmileLogo} alt="Future Smile Care" style={{ height: 40, width: "auto" }} />
            </div>
            <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>Building a better world through health, education, and community empowerment across India.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
            <img src={coreMember5} alt="Pawan Kumar Singh" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", border: "3px solid #34d399", marginBottom: 12 }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#9ca3af", fontSize: 12, fontWeight: 600 }}>Pawan Kumar Singh</div>
              <div style={{ color: "#6b7280", fontSize: 11 }}>CMD</div>
            </div>
           
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 20, letterSpacing: 0.5 }}>{col.title}</div>
              {col.links.map((l, j) => (
                <div key={j} style={{ color: "#4b5563", fontSize: 13, marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#34d399")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 28, display: "flex", justifyContent: "flex-start", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ color: "#374151", fontSize: 13 }}>© 2025 Future Smile Care. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function NGOPage() {
  const [showBankDetails, setShowBankDetails] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #050a08; color: #fff; font-family: 'Segoe UI', system-ui, sans-serif; }
        @keyframes ngoFloat { 0% { transform: translateY(0); } 100% { transform: translateY(-12px); } }
        @keyframes ngoPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes ngoBounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
        @keyframes ngoFadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        @keyframes ngoFadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: none; } }
        @keyframes ngoFadeInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: none; } }
        input::placeholder, textarea::placeholder { color: #4b5563; }
        @media (max-width: 768px) {
          .ngo-hero-grid, .ngo-two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ngo-three-col { grid-template-columns: 1fr !important; }
          .ngo-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ngo-footer-grid { grid-template-columns: 1fr !important; }
          .ngo-hidden-mobile { display: none !important; }
          .ngo-show-mobile { display: block !important; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050a08; }
        ::-webkit-scrollbar-thumb { background: #065f46; border-radius: 4px; }
      `}</style>
      <Navbar onDonateClick={() => setShowBankDetails(true)} />
      <Hero onDonateClick={() => setShowBankDetails(true)} />
      <StatsBar />
      <About />
      <Mission onDonateClick={() => setShowBankDetails(true)} />
      <Programs />
      {/* <Gallery /> */}
      <Founder onDonateClick={() => setShowBankDetails(true)} />
      {/* <CTABanner /> */}
      <Contact onDonateClick={() => setShowBankDetails(true)} />
      <Footer onDonateClick={() => setShowBankDetails(true)} />
      <BankDetailsModal isOpen={showBankDetails} onClose={() => setShowBankDetails(false)} />
    </>
  );
}