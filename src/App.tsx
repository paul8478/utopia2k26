import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import EventHub from "./pages/EventHub";
import About from "./pages/aboututopiapage";
import Gallery from "./pages/Gallery";
import Day1 from "./pages/Day1";
import Day2 from "./pages/Day2";
import Schedule from "./pages/Schedule";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AboutUtopiaPage from "./pages/aboututopiapage";;

// FIXED: Capitalized the component name
import Teams from "./pages/Teams"; 

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Analytics />
        <BrowserRouter>
          <ScrollToTop />
          <CustomCursor />
          <Navbar />
          <div className="flex min-h-screen flex-col">
            <main className="flex-1 pt-16 md:pt-0">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/event" element={<EventHub />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/day-1" element={<Day1 />} />
                <Route path="/day-2" element={<Day2 />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/aboututopia" element={<AboutUtopiaPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
