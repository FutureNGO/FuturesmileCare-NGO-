import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Career from "./pages/Career";
import NgoPage from "./pages/Ngo";
import GalleryPage from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

// simple modal for mega hiring
function MegaHiringModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div style={{position: "fixed", inset: 0, background: "rgba(0,0,0,0.0)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, pointerEvents: "none"}}>
      <div style={{background: "#170a0a", padding: "2rem", borderRadius: 12, maxWidth: 360, textAlign: "center", position: "relative", pointerEvents: "auto"}}>
        <button onClick={onClose} style={{position: "absolute", top: 10, right: 12, background: "none", border: "none", fontSize: 20, cursor: "pointer", pointerEvents: "auto"}}>
          ×
        </button>
        <h2 style={{marginBottom: "1rem", fontSize: "1.5rem"}}>🚨 Mega Hiring Going On!</h2>
        <p style={{marginBottom: "1.5rem"}}>We're expanding our team – click below to view current openings and apply now.</p>
        <Link to="/career">
          <button style={{background: "#d34934", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 6, cursor: "pointer", pointerEvents: "auto"}}>See Careers</button>
        </Link>
      </div>
    </div>
  );
}

// main layout handles whether common header/footer should appear
function MainLayout() {
  const location = useLocation();
  const isNgoPage = location.pathname === "/ngo";
  const [showHiring, setShowHiring] = useState(false);

  useEffect(() => {
    // only show once per session
    if (!sessionStorage.getItem("hiringPopupShown")) {
      setShowHiring(true);
      sessionStorage.setItem("hiringPopupShown", "1");
    }
  }, []);

  return (
    <>
      {!isNgoPage && <Navbar />}
+      <MegaHiringModal open={showHiring} onClose={() => setShowHiring(false)} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/career" element={<Career />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/ngo" element={<NgoPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isNgoPage && <Footer />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
