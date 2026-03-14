import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import heroClassical from "@/assets/hero-classical.jpg";
import heroNeon from "@/assets/hero-neon.jpg";
import grainImage from "@/assets/grain.jpg";

import Artist from "../components/Artist";
import Homecontact from "../components/Homecontact";
import Culture from "../components/Culture";
import Sponsor from "../components/Sponsor";
import EventOverview from "../components/EventOverview";

import "../components/css/home.css";
import img1 from "../assets/img7.png";
import alpona2 from "../assets/alpona2.png";
import headup from "../assets/headup.png";

const Index = () => {
  const [showCustomLoader, setShowCustomLoader] = useState(true);

  const { scrollYProgress } = useScroll();

  // Element 1: Rotating semicircle (alpona2.png)
  const alponaRotation = useTransform(scrollYProgress, [0, 1], [0, 360]); // Rotate 1 full turn
  const alponaY = useTransform(scrollYProgress, [0, 1], ["-10vh", "80vh"]); // Move vertically

  // Element 2: Infinite Vertical Strip (head.png)
  const stripBgX = useTransform(scrollYProgress, [0, 1], ["0px", "-1000px"]); // Move background like marquee

  useEffect(() => {
    // The loader stays indefinitely until the user clicks the EXPLORE button.
  }, []);

  return (
    <>
      <AnimatePresence>
        {showCustomLoader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f5efe6] overflow-hidden"
          >
            {/* Subtle decorative background ring pattern */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
            >
              <svg viewBox="0 0 200 200" className="w-[90vmin] h-[90vmin]">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#3b2a1f"
                  strokeWidth="0.5"
                  strokeDasharray="2 6"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#b64a2b"
                  strokeWidth="0.5"
                  strokeDasharray="10 5 2 5"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#3b2a1f"
                  strokeWidth="0.2"
                />
                <path
                  d="M100 5 L100 15 M100 185 L100 195 M5 100 L15 100 M185 100 L195 100"
                  stroke="#b64a2b"
                  strokeWidth="1"
                />
                <path
                  d="M33 33 L40 40 M167 167 L160 160 M33 167 L40 160 M167 33 L160 40"
                  stroke="#3b2a1f"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>

            <div className="relative z-10 flex flex-col items-center">
              {/* Animated minimalist logo mark */}
              <div className="relative w-28 h-28 mb-8">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full drop-shadow-sm"
                >
                  {/* Outer circle ink stroke */}
                  <motion.path
                    d="M50 10 C72 10, 90 28, 90 50 C90 72, 72 90, 50 90 C28 90, 10 72, 10 50 C10 28, 28 10, 50 10"
                    fill="none"
                    stroke="#b64a2b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                  {/* Inner tribal diamond/hourglass outline */}
                  <motion.path
                    d="M50 25 L75 50 L50 75 L25 50 Z"
                    fill="none"
                    stroke="#3b2a1f"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 1.8,
                      delay: 0.8,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Center glowing core */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="6"
                    fill="#b64a2b"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
                  />
                </svg>
              </div>

              {/* Typography & Actions */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                className="text-center flex flex-col items-center"
              >
                <h1 className="text-4xl md:text-5xl font-serif tracking-[0.15em] text-[#3b2a1f] mb-4">
                  UTOPIA<span className="text-[#b64a2b]">2K26</span>
                </h1>
                <p className="text-[#3b2a1f]/70 uppercase tracking-[0.4em] text-xs font-sans font-medium mb-8">
                  Welcome to the Experience
                </p>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.2 }}
                  onClick={() => setShowCustomLoader(false)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 border-0 py-3 bg-[#B7410E] hover:bg-[#8B2635] text-white h-12 px-10 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 rounded-sm cursor-pointer pointer-events-auto"
                >
                  EXPLORE
                </motion.button>
              </motion.div>
            </div>

            {/* Subtle bottom fade artwork */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
              className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#3b2a1f]/5 to-transparent pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Decorative Column */}
      <div
        className="desktop-decorative-column fixed left-0 top-0 h-screen w-[150px] pointer-events-none mix-blend-difference"
        style={{ zIndex: 10 }}
      >
        {/* Element 1: Rotating Semicircle (alpona2.png) */}
        <motion.div
          className="absolute left-[-150px] top-0"
          style={{
            marginTop: "0vh",
            y: alponaY,
            rotate: alponaRotation,
          }}
        >
          <img
            src={alpona2}
            alt="Decorative Alpona"
            className="w-[300px] h-auto opacity-70"
          />
        </motion.div>

        {/* Element 2: Infinite Vertical Strip (head.png) - Rotated 90deg to be vertical */}
        <div className="absolute left-[10px] top-0 h-screen w-[40px]">
          <motion.div
            className="origin-top-left"
            style={{
              x: 30, // Shift right so it stays within the container after rotation
              backgroundImage: `url(${headup})`,
              backgroundRepeat: "repeat-x",
              backgroundPositionX: stripBgX,
              backgroundSize: "contain",
              rotate: 90,
              width: "100vh", // After rotation, this becomes height
              height: "40px", // After rotation, this becomes width
            }}
          />
        </div>
      </div>

      <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
        <div
          id="hero"
          className="preloader-overlay relative w-full min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.9] pointer-events-none">
            <img
              alt="Decorative bg"
              decoding="async"
              className="object-cover hidden md:block w-full h-full"
              src={heroClassical}
            />
            <img
              alt="Decorative bg"
              decoding="async"
              className="object-cover object-bottom w-full h-full md:hidden"
              src={heroClassical}
            />
          </div>
          <div className="relative flex flex-col items-center gap-6 z-50">
            <div className="lg:w-[350px] w-[250px] aspect-square mt-[-10vh]">
              <div className="w-full h-full flex items-center justify-center p-8 relative"></div>
            </div>
            <div className="text-center mb-8 w-full px-4 overflow-hidden z-20">
              <h1 className="text-[12vw] sm:text-7xl md:text-[8rem] font-bold text-[#2C1810] uppercase tracking-tighter drop-shadow-sm leading-none flex justify-center mix-blend-difference text-white">
                <span>U</span>
                <span>T</span>
                <span>O</span>
                <span>P</span>
                <span>I</span>
                <span>A</span>
                <span>&nbsp;</span>
                <span>2</span>
                <span>K</span>
                <span>2</span>
                <span>6</span>
              </h1>
            </div>
          </div>

          {/* Decorative Mandala-Tech Fusion Pattern (Mobile Only) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 md:hidden pointer-events-none">
            <svg
              width="200"
              height="80"
              viewBox="0 0 200 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-40"
            >
              {/* Outer circle mandala */}
              <circle
                cx="100"
                cy="40"
                r="35"
                stroke="rgba(182, 74, 43, 0.3)"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="100"
                cy="40"
                r="28"
                stroke="rgba(182, 74, 43, 0.2)"
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="4 4"
              />
              {/* Inner geometric pattern */}
              <path
                d="M100 15 L110 30 L125 30 L112 40 L117 55 L100 45 L83 55 L88 40 L75 30 L90 30 Z"
                stroke="rgba(182, 74, 43, 0.4)"
                strokeWidth="0.8"
                fill="rgba(182, 74, 43, 0.05)"
              />
              {/* Tech circuit lines */}
              <line
                x1="50"
                y1="40"
                x2="70"
                y2="40"
                stroke="rgba(182, 74, 43, 0.3)"
                strokeWidth="0.5"
              />
              <line
                x1="130"
                y1="40"
                x2="150"
                y2="40"
                stroke="rgba(182, 74, 43, 0.3)"
                strokeWidth="0.5"
              />
              <circle cx="70" cy="40" r="2" fill="rgba(182, 74, 43, 0.4)" />
              <circle cx="130" cy="40" r="2" fill="rgba(182, 74, 43, 0.4)" />
              {/* Decorative dots */}
              <circle cx="100" cy="10" r="1.5" fill="rgba(182, 74, 43, 0.5)" />
              <circle cx="100" cy="70" r="1.5" fill="rgba(182, 74, 43, 0.5)" />
            </svg>
          </div>
        </div>

        <div hidden>
          <audio loop preload="auto" crossOrigin="anonymous"></audio>
          <audio loop preload="auto" crossOrigin="anonymous"></audio>
          <audio
            src="/music/THUNDER.mp3"
            loop
            preload="auto"
            crossOrigin="anonymous"
          ></audio>
        </div>

        <div
          style={{ minHeight: "200px" }}
          className="md:min-h-[400px]"
          id="about"
          data-section-id="about"
        >
          <Culture />
        </div>

        <div
          style={{ minHeight: "200px" }}
          className="md:min-h-[400px]"
          id="featured-artists"
          data-section-id="featured-artists"
        >
          <Artist />
        </div>

        <EventOverview />

        <div className="ab flex flex-col md:flex-row my-20">
          <div className="ab1 w-full md:w-1/2 p-10 flex items-center">
            <p className="text-2xl font-serif text-muted-foreground leading-relaxed">
              UTOPIA-2K26 marked an unforgettable celebration of talent and
              culture. From mesmerizing Octet performances to the electrifying
              'Flight of feet' dance competitions and the glamorous 'Style
              Symphony' fashion show, the event showcased the best of our
              creative spirit.
            </p>
          </div>
          <div className="ab2 w-full md:w-1/2 flex justify-center items-center">
            <img
              src={img1}
              alt="example"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>

        <div
          style={{ minHeight: "200px" }}
          className="md:min-h-[400px]"
          id="sponsors"
          data-section-id="sponsors"
        >
          <Sponsor />
        </div>
        <div
          className="w-full px-4 md:px-8 mb-20 flex justify-center"
          id="contact"
          data-section-id="contact"
        >
          <Homecontact />
        </div>

      </main>
    </>
  );
};

export default Index;
