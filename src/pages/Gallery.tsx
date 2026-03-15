import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import TiltImage from "@/components/TiltImage";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const images = [
  { src: gallery1, alt: "Image 1" },
  { src: gallery2, alt: "Image 2" },
  { src: gallery3, alt: "Image 3" },
];

const getSevenImages = () => {
  const arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push(images[i % images.length]);
  }
  return arr;
};

const Gallery = () => {
  const [isOpening, setIsOpening] = useState(true);

  useEffect(() => {
    // 👇 CONTROL 1: INITIAL PAUSE 👇
    const timer = setTimeout(() => setIsOpening(false), 500); 
    return () => clearTimeout(timer);
  }, []);

  const stripeVariants = {
    initial: { 
      x: 0, 
      scaleX: 1, 
      skewX: 0,
      opacity: 1 
    },
    exit: (custom: { direction: "left" | "right", index: number }) => ({
      x: custom.direction === "left" ? "-85vw" : "85vw", 
      scaleX: 0.15, 
      // Slightly more drag to emphasize the slow, heavy weight
      skewX: custom.direction === "left" ? 10 : -10, 
      transition: {
        // 👇 CONTROL 2: SLOWER SPRING PHYSICS 👇
        type: "spring",
        stiffness: 20,  // Lower tension = slower pull
        damping: 16,    // Friction to keep it smooth
        mass: 4,        // Higher mass makes it feel incredibly heavy
        // 👇 CONTROL 3: SLOWER STAGGER DELAY 👇
        delay: custom.direction === "left" 
                ? (5 - custom.index) * 0.2 
                : custom.index * 0.2, // Increased from 0.12 to 0.2
      },
    }),
  };

  const renderRow = (direction: "left" | "right") => {
    const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];
    return (
      <div className="overflow-hidden w-full">
        <motion.div
          animate={{ x: animateX }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex gap-4 lg:gap-6"
        >
          {[...getSevenImages(), ...getSevenImages()].map((img, i) => (
            <div key={i} className="flex-shrink-0 w-40 h-24 sm:w-52 sm:h-32 md:w-64 md:h-40 lg:w-72 lg:h-44">
              <TiltImage src={img.src} alt={img.alt} className="w-full h-full object-cover rounded-xl" />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="relative bg-background min-h-screen overflow-hidden">
      
      <AnimatePresence>
        {isOpening && (
          <div className="fixed inset-0 z-40 flex pointer-events-none">
            
            {/* --- LEFT CURTAIN HALVES --- */}
            <div className="w-1/2 h-full flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`left-${i}`}
                  custom={{ direction: "left", index: i }}
                  variants={stripeVariants}
                  initial="initial"
                  exit="exit"
                  style={{ transformOrigin: "top" }} 
                  className="relative w-[20%] h-full bg-gradient-to-r from-[#3e0a0a] via-[#a31a1a] to-[#3e0a0a] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border-r border-black/60 last:border-r-0 origin-top"
                >
                  <div className="absolute bottom-0 w-full h-6 sm:h-10 bg-gradient-to-b from-[#f9d976] via-[#e9c450] to-[#b38b22] border-t-2 border-[#5a1010] shadow-[0_-5px_15px_rgba(0,0,0,0.4)]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent mix-blend-overlay" />
                </motion.div>
              ))}
            </div>

            {/* --- RIGHT CURTAIN HALVES --- */}
            <div className="w-1/2 h-full flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`right-${i}`}
                  custom={{ direction: "right", index: i }}
                  variants={stripeVariants}
                  initial="initial"
                  exit="exit"
                  style={{ transformOrigin: "top" }}
                  className="relative w-[20%] h-full bg-gradient-to-r from-[#3e0a0a] via-[#a31a1a] to-[#3e0a0a] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border-l border-black/60 first:border-l-0 origin-top"
                >
                  <div className="absolute bottom-0 w-full h-6 sm:h-10 bg-gradient-to-b from-[#f9d976] via-[#e9c450] to-[#b38b22] border-t-2 border-[#5a1010] shadow-[0_-5px_15px_rgba(0,0,0,0.4)]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent mix-blend-overlay" />
                </motion.div>
              ))}
            </div>

          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // 👇 CONTROL 4: DELAYED GALLERY FADE-IN 👇
        // Increased delay from 0.8 to 1.6 to wait for the slower curtains
        transition={{ delay: 1.6, duration: 1.5, ease: "easeOut" }} 
        className="pt-24"
      >
        <section className="px-4 sm:px-10 lg:px-20 py-20 text-center">
          <motion.img
            src="/deb/Culturex-CLmvyJNH.png"
            alt="Gallery"
            className="w-full max-w-6xl mx-auto object-contain drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <p className="mt-10 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            A visual journey through moments, culture, and creativity — where every
            frame captures the spirit of innovation and tradition coming together.
          </p>
        </section>

        <section className="flex flex-col gap-10 sm:gap-12 lg:gap-16 px-4 sm:px-10 lg:px-20 py-16">
          {renderRow("left")}
          {renderRow("right")}
          {renderRow("left")}
        </section>

        <section className="py-20 text-center px-4 sm:px-10 lg:px-20">
          <p className="text-2xl sm:text-3xl font-serif italic text-muted-foreground">
            “Moments fade, but the stories they create live forever.”
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default Gallery;