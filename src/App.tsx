import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Career from "./pages/Career";
import NgoPage from "./pages/Ngo";
import NotFound from "./pages/NotFound";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();

// main layout handles whether common header/footer should appear
function MainLayout() {
  const location = useLocation();
  const isNgoPage = location.pathname === "/ngo";

  return (
    <>
      {!isNgoPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/career" element={<Career />} />
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
