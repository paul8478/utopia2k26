import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Day1 from "./pages/Day1";
import Day2 from "./pages/Day2";
import Schedule from "./pages/Schedule";
import Architects from "./pages/Architects";
import NotFound from "./pages/NotFound";

// FIXED: Capitalized the component name
import Teams from "./pages/Teams"; 

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <CustomCursor />
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/schedule" element={<Schedule />} />
            
            // FIXED: Capitalized the JSX element
            <Route path="/teams" element={<Teams />} /> 
            
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