import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// You can use your existing assets representing the days
import day1bg from "@/assets/gallery-1.jpg";
import day2bg from "@/assets/gallery-3.jpg";

const EventHub = () => {
  const [hoveredOption, setHoveredOption] = useState<"day1" | "day2" | null>(null);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col md:flex-row font-sans text-white">
      
      {/* --- BACKGROUND OVERLAYS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-in-out">
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-700 z-10 ${hoveredOption ? "opacity-40" : "opacity-70"}`}
        />
        <img 
          src={day1bg}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hoveredOption === "day1" ? "opacity-100" : "opacity-30"}`}
          alt="Day 1 Background"
        />
        <img 
          src={day2bg}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hoveredOption === "day2" ? "opacity-100" : "opacity-0"}`}
          alt="Day 2 Background"
        />
      </div>

      {/* --- CENTRAL HEADER --- */}
      <div className="absolute top-10 md:top-16 left-1/2 -translate-x-1/2 z-30 text-center w-full px-4 pointer-events-none">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xs md:text-base font-sans uppercase tracking-[0.4em] mb-2 md:mb-4 text-white/80 drop-shadow-lg"
        >
          Choose Your Experience
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white drop-shadow-2xl"
        >
          Which path will you explore first?
        </motion.h1>
      </div>

      {/* --- DAY 1 SPLIT --- */}
      <Link 
        to="/day-1"
        // On mobile: justify-end pushes content down away from the header. On desktop: justify-center.
        className="relative z-20 flex-1 flex flex-col items-center justify-end md:justify-center pb-12 md:pb-0 p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/20 group cursor-pointer h-[50vh] md:h-screen"
        onMouseEnter={() => setHoveredOption("day1")}
        onMouseLeave={() => setHoveredOption(null)}
      >
        <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/20 transition-colors duration-500" />
        
        <div className="relative text-center transform transition-transform duration-700 md:group-hover:-translate-y-4 flex flex-col items-center">
          <span className="block text-[#ff6b35] font-bold tracking-[0.3em] uppercase mb-2 md:mb-4 text-[10px] md:text-sm drop-shadow-md">
            The Beginning
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-serif font-black text-white transition-all duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            DAY 01
          </h2>
          <p className="mt-2 md:mt-6 text-base sm:text-lg md:text-2xl font-serif italic text-white/80 md:group-hover:text-white transition-colors duration-500 drop-shadow-md">
            Roots & Rhythm
          </p>
          
          {/* BUTTON: Always visible on mobile, appears on hover on desktop */}
          <div className="mt-6 md:mt-12 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
            <span className="inline-block px-6 py-2 md:px-8 md:py-3 border border-white/50 bg-black/30 backdrop-blur-sm text-white text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300">
              View Day 1
            </span>
          </div>
        </div>
      </Link>

      {/* --- DAY 2 SPLIT --- */}
      <Link 
        to="/day-2"
        // On mobile: justify-center keeps it perfectly in the middle of the bottom half.
        className="relative z-20 flex-1 flex flex-col items-center justify-center p-8 md:p-16 group cursor-pointer h-[50vh] md:h-screen"
        onMouseEnter={() => setHoveredOption("day2")}
        onMouseLeave={() => setHoveredOption(null)}
      >
        <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/20 transition-colors duration-500" />
        
        <div className="relative text-center transform transition-transform duration-700 md:group-hover:-translate-y-4 flex flex-col items-center">
          <span className="block text-[#4ade80] font-bold tracking-[0.3em] uppercase mb-2 md:mb-4 text-[10px] md:text-sm drop-shadow-md">
            The Climax
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-serif font-black text-white transition-all duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            DAY 02
          </h2>
          <p className="mt-2 md:mt-6 text-base sm:text-lg md:text-2xl font-serif italic text-white/80 md:group-hover:text-white transition-colors duration-500 drop-shadow-md">
            The Roster
          </p>
          
          {/* BUTTON: Always visible on mobile, appears on hover on desktop */}
          <div className="mt-6 md:mt-12 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
            <span className="inline-block px-6 py-2 md:px-8 md:py-3 border border-white/50 bg-black/30 backdrop-blur-sm text-white text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300">
              View Day 2
            </span>
          </div>
        </div>
      </Link>

    </div>
  );
};

export default EventHub;