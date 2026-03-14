import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import day1bg from "@/assets/gallery-1.jpg";
import day2bg from "@/assets/gallery-3.jpg";

const EventHub = () => {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center font-sans px-4 py-20 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="text-center z-10 mb-12 md:mb-20">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#ff6b35] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4"
        >
          The Experience Awaits
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white drop-shadow-lg"
        >
          Which day do you want to visit first?
        </motion.h1>
      </div>

      {/* --- CARDS CONTAINER --- */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-6xl z-10">
        
        {/* DAY 1 CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 w-full"
        >
          <Link 
            to="/day-1"
            className="group relative block w-full h-[35vh] md:h-[60vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2"
          >
            {/* Background Image */}
            <img 
              src={day1bg} 
              alt="Day 1" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-500 group-hover:bg-black/40" />
            
            {/* Card Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="text-[#ff6b35] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                The Beginning
              </span>
              <h2 className="text-4xl md:text-6xl font-sans font-black text-white transform transition-transform duration-500 group-hover:-translate-y-2">
                DAY 01
              </h2>
              <p className="mt-2 text-white/80 font-serif italic text-lg md:text-xl transform transition-transform duration-500 group-hover:-translate-y-2">
                Roots & Rhythm
              </p>
            </div>
          </Link>
        </motion.div>

        {/* DAY 2 CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex-1 w-full"
        >
          <Link 
            to="/day-2"
            className="group relative block w-full h-[35vh] md:h-[60vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2"
          >
            {/* Background Image */}
            <img 
              src={day2bg} 
              alt="Day 2" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-500 group-hover:bg-black/40" />
            
            {/* Card Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="text-[#4ade80] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                The Climax
              </span>
              <h2 className="text-4xl md:text-6xl font-sans font-black text-white transform transition-transform duration-500 group-hover:-translate-y-2">
                DAY 02
              </h2>
              <p className="mt-2 text-white/80 font-serif italic text-lg md:text-xl transform transition-transform duration-500 group-hover:-translate-y-2">
                The Roster
              </p>
            </div>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default EventHub;