import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Index from "./pages/Index";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Day1 from "./pages/Day1";
import Day2 from "./pages/Day2";
import Schedule from "./pages/Schedule";
import Architects from "./pages/Architects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Disable global Preloader strictly on the home route, as it uses its own custom loader
  const isHomePage = window.location.pathname === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading && !isHomePage && <Preloader onComplete={() => setIsLoading(false)} />}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CustomCursor />
          <Navbar />
          <Routes>
            <Route path="/" element={<Index isLoading={isLoading} />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/schedule" element={<Schedule />} />
  
            <Route path="/day-1" element={<Day1 />} />
            <Route path="/day-2" element={<Day2 />} />
            <Route path="/architects" element={<Architects />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
