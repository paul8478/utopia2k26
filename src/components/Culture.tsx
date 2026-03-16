import React from 'react';
import culture from "../assets/Culturex.png";
import { motion } from "framer-motion";

const Culture = () => {
  return (
    <div className="w-full h-full flex justify-center items-center py-10 sm:py-[60px] px-4 sm:px-[20px]">
      <div className="w-full h-full flex flex-col justify-center items-center rounded-xl text-center transition-all duration-300 bg-transparent">
        <div className="relative w-full max-w-[1000px] md:max-w-[1200px] flex justify-center items-center">
          {/* Subtle outer glow that pulses gently */}
          <motion.div
            animate={{
              scale: [1, 1, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-[#B7410E]/40 rounded-full blur-3xl transform pointer-events-none"
          />

          <img
            src={culture}
            alt="Culture Art"
            className="relative z-10 w-[1200px] h-auto object-cover rounded-[10px] transition-all duration-300"
          />
        </div>

        <h2 className="mt-[20px] text-[28px] md:text-[36px] font-bold font-serif tracking-tight">Indian Culture</h2>
        <p className="text-[14px] text-[#555]">
          Discover the beauty and richness of Indian cultural heritage.
        </p>
      </div>
    </div>
  );
};

export default Culture;
