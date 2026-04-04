import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const heroNeon = "/assets/hero-neon.jpg";
const grainImage = "/assets/grain.jpg";

import Artist from "../components/Artist";
import Culture from "../components/Culture";
import Sponsor from "../components/Sponsor";
import EventOverview from "../components/EventOverview";

import "../components/css/home.css";
const img1 = "/assets/img7.png";
const alpona2 = "/assets/alpona2.png";
const headup = "/assets/headup.png";
import ScrollReveal from "../components/ScrollReveal";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`w-full border-b border-border/20 last:border-0 transition-all duration-300 rounded-lg ${
        isOpen ? "bg-primary/5 px-4 md:px-6 shadow-sm border-transparent py-2" : "px-2 hover:bg-white/5 hover:px-4 py-2"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left focus:outline-none group bg-transparent"
      >
        <span 
          className={`text-lg md:text-xl font-serif font-bold transition-colors duration-300 pr-4 ${
            isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
          }`}
        >
          {question}
        </span>
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 flex-shrink-0 ${
            isOpen 
              ? "bg-primary border-primary text-white rotate-180" 
              : "border-primary/20 text-muted-foreground group-hover:border-primary group-hover:text-primary"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9L12 15L18 9" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="mt-3 md:mt-6 max-w-2xl text-base md:text-lg font-sans text-muted-foreground leading-relaxed text-left border-t border-primary/10 pt-4 pb-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LogoPieces = () => {
  const pieces = [];
  const gridSize = 5;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      pieces.push({ r, c });
    }
  }

  return (
    <div className="relative w-48 h-48 md:w-80 md:h-80 mb-8 z-20">
      {pieces.map(({ r, c }, i) => {
        const x1 = c * (100 / gridSize);
        const x2 = (c + 1) * (100 / gridSize);
        const y1 = r * (100 / gridSize);
        const y2 = (r + 1) * (100 / gridSize);

        const clipPath = `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`;

        const startX = (Math.random() - 0.5) * 400; // Increased spread
        const startY = (Math.random() - 0.5) * 400;
        const startRotate = (Math.random() - 0.5) * 180;

        return (
          <motion.img
            key={i}
            src="/logo_utopia.png"
            alt="Utopia Logo"
            className="absolute inset-0 w-full h-full object-contain drop-shadow-sm"
            style={{ clipPath }}
            initial={{ opacity: 0, x: startX, y: startY, rotate: startRotate, scale: 0 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            transition={{
              duration: 4,
              delay: 0.2 + (r * 0.05) + (c * 0.05) + Math.random() * 0.3,
              ease: [0.16, 1, 0.3, 1] // Custom ease for dramatic snap effect
            }}
          />
        );
      })}
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const faqs = [

{
  question: "Can I participate across different departments?",
  answer: "Yes, participants from different departments and academic years are allowed.",
},
{
  question: "What is the last date to register?",
  answer: "The last date for registration is April 11, 2026.",
},
{
  question: "How long will the entry gate remain open?",
  answer: "The entry gate timings will be announced by the organizers. Please arrive early to avoid any inconvenience.",
},
{
  question: "Can we bring our friends or family members to the event?",
  answer: "Yes, friends and family members are welcome to attend the event. However, please ensure that they also have valid tickets or registrations if required.",
},
{
  question: "When will the event start?",
  answer: "The event will start as per the scheduled time mentioned on the schedule page. Participants are requested to arrive at least 15–20 minutes early for smooth entry and registration.",
}
  ];
  const [showCustomLoader, setShowCustomLoader] = useState(() => {
    return localStorage.getItem("hasVisitedBefore") !== "true";
  });

  const { scrollYProgress } = useScroll();

  // Element 1: Rotating semicircle (alpona2.png)
  const alponaRotation = useTransform(scrollYProgress, [0, 1], [0, 360]); // Rotate 1 full turn
  const alponaY = useTransform(scrollYProgress, [0, 1], ["-10vh", "80vh"]); // Move vertically

  // Element 2: Infinite Vertical Strip (head.png)
  const stripBgX = useTransform(scrollYProgress, [0, 1], ["0px", "-1000px"]); // Move background like marquee

  useEffect(() => {
    // The loader stays indefinitely until the user clicks the EXPLORE button.
    localStorage.setItem("hasVisitedBefore", "true");
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
              <LogoPieces />

              {/* Typography & Actions */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                className="text-center flex flex-col items-center"
              >
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
        className="hidden md:block fixed left-0 top-0 h-screen w-[150px] pointer-events-none mix-blend-difference"
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

      <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground overflow-x-hidden max-w-[100vw]">
        <div
          id="hero"
          className="preloader-overlay relative w-full min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-[100dvh] md:h-full flex items-center justify-center opacity-[0.9] pointer-events-none -z-0 overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover object-center w-full h-full scale-[1.02]"
            >
              <source src="/playback.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative flex flex-col items-center justify-center z-50 h-full">
            <div className="w-[200px] xs:w-[240px] sm:w-[340px] md:w-[600px] relative flex items-center justify-center">
              {/* Animated glow behind logo */}
              <div 
                className="absolute -inset-8 md:-inset-16 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.4), rgba(236, 72, 153, 0.2) 40%, transparent 70%)',
                  filter: 'blur(40px)',
                  animation: 'heroGlow 4s ease-in-out infinite',
                }}
              />
              <img 
                src="/text 1.png" 
                alt="Utopia Logo" 
                className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[600px] h-auto object-contain drop-shadow-lg pointer-events-none select-none p-4 sm:p-6 md:p-12 mx-auto"
                draggable={false}
              />
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

        <div
          className="relative w-full flex flex-col md:flex-row items-center justify-center py-12 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-transparent z-20 max-w-7xl mx-auto"
        >
          <div className="w-full md:w-[60%] lg:w-[55%] flex flex-col justify-center items-start text-left relative z-10 order-2 md:order-1 mt-12 md:mt-0">
            <ScrollReveal>
              <span className="text-[10px] font-sans uppercase tracking-[0.6em] text-primary">
                Our Story
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="mt-2 md:mt-4 text-[10vw] md:text-[5.2vw] font-serif font-black leading-[0.88] tracking-[-0.03em] text-foreground mb-4">
                About Utopia{" "}
                <span className="italic text-primary">2K26</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <p className="mt-3 md:mt-6 max-w-2xl text-base md:text-lg font-sans text-muted-foreground leading-relaxed text-left">
                <span className="text-foreground font-semibold">UTOPIA</span> is the annual cultural fest of MCKVIE—a grand showcase of talent and togetherness. From music, dance, and drama to fashion shows, gaming contests, and celebrity performances, it offers a platform for students to explore their creative limits.
                <br /><br />
                Utopia-2K26 blends culture with innovation, featuring interactive workshops, exhibitions, and food stalls that create an unforgettable, electrifying atmosphere. It marked an unforgettable celebration of talent and culture, from mesmerizing Octet performances to the electrifying
                <span className="text-primary italic font-semibold"> 'Flight of feet' </span> dance competitions and the glamorous
                <span className="text-primary italic font-semibold"> 'Style Symphony' </span> fashion show, the event showcased the best of our creative spirit.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => navigate("/about")}
                  className={[
                    "group relative inline-flex items-center gap-3",
                    "px-10 py-4",
                    "bg-primary text-primary-foreground",
                    "font-sans text-[11px] font-bold uppercase tracking-[0.25em]",
                    "rounded-sm overflow-hidden",
                    "transition-all duration-300",
                    "hover:shadow-[0_8px_32px_hsl(var(--primary)/0.45)]",
                    "hover:-translate-y-1",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  ].join(" ")}
                >
                  {/* Animated fill layer */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[hsl(var(--crimson))] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                  />

                  {/* Label */}
                  <span className="relative z-10">Read More</span>

                  {/* Arrow icon */}
                  <svg
                    aria-hidden="true"
                    className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </ScrollReveal>

            {/* Ornamental divider */}
            <ScrollReveal delay={0.25}>
              <div className="mt-6 md:mt-10 flex items-center justify-start gap-4">
                <div className="h-px w-20 bg-border" />
                <span className="text-primary text-xs tracking-[0.5em] font-sans uppercase select-none">
                  ◈
                </span>
                <div className="h-px w-12 bg-border" />
              </div>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-[50%] lg:w-[55%] flex justify-center items-center relative z-10 order-1 md:order-2">
            <div className="relative group w-full max-w-[160px] xs:max-w-[200px] sm:max-w-[260px] md:max-w-sm lg:max-w-md">
              {/* Subtle outer glow that pulses gently */}
              <motion.div
                animate={{
                  scale: [0.7, 0.8, 0.6],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-[#B7410E]/40 rounded-full blur-3xl transform pointer-events-none"
              />

              {/* The main subject */}
              <img
                src={img1}
                alt="Utopia Cultural Art"
                className="w-full h-auto object-contain relative z-10 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2 drop-shadow-2xl mx-auto"
                style={{ animation: "floatArtist 6s ease-in-out infinite", filter: "contrast(1.05) brightness(1.02) saturate(1.1)" }}
              />
            </div>
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
          id="featured-artists"
          data-section-id="featured-artists"
          className="w-full"
        >
          {/* Section Divider */}
          <div className="my-6 md:my-16 h-px w-full bg-border/50 max-w-7xl mx-auto" />

          <Artist />
        </div>

        {/* Section Divider */}
        <div className="my-6 md:my-16 h-px w-full bg-border/50 max-w-7xl mx-auto" />
        <div className="w-full">
          <EventOverview />
        </div>

        <div
          id="about"
          data-section-id="about"
          className="w-full"
        >
          {/* Section Divider */}
          <div className="my-6 md:my-16 h-px w-full bg-border/50 max-w-7xl mx-auto" />
          <Culture />
        </div>

        <div
          id="sponsors"
          data-section-id="sponsors"
          className="w-full"
        >
          {/* Section Divider */}
          <div className="my-6 md:my-16 h-px w-full bg-border/50 max-w-7xl mx-auto" />
          <Sponsor />
        </div>

       

        <div
          id="faq"
          data-section-id="faq"
          className="w-full pb-20 md:pb-32"
        >

          
           
          {/* Section Divider */}
          <div className="my-6 md:my-16 h-px w-full bg-border/50 max-w-7xl mx-auto" />

          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-16">

              
<ScrollReveal delay={0.1}>
  <div className="mt-2 overflow-hidden whitespace-nowrap">
    <div className="animate-marquee inline-block">
      
      {/* First copy */}
      <a
        href="https://docs.google.com/document/d/1eYDc8X1kOtJ3gQbe3jK1817Zts2p_nzy/edit"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm md:text-base font-serif font-medium tracking-tight text-gray-900 no-underline hover:no-underline mr-10"
      >
        Interested in production? Contact us. The last date to submit the quotation is 1 PM on 29th March 2026. The quotation will be opened on 30th March 2026.
      </a>

      {/* Second copy (duplicate for smooth loop) */}
      <a
        href="https://docs.google.com/document/d/1eYDc8X1kOtJ3gQbe3jK1817Zts2p_nzy/edit"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm md:text-base font-serif font-medium tracking-tight text-gray-900 no-underline hover:no-underline"
      >
         Interested in production? Contact us. The last date to submit the quotation is 1 PM on 29th March 2026. The quotation will be opened on 30th March 2026.
      </a>

    </div>
  </div>
</ScrollReveal>
<br/><br/>
              
              <ScrollReveal>
                <span className="text-[10px] font-sans uppercase tracking-[0.6em] text-primary">
                  {" "}   
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="mt-2 text-4xl md:text-5xl font-serif font-black tracking-tight text-foreground">
                  Quick <span className="italic text-primary">FAQS</span>
                </h2>
              </ScrollReveal>
            </div>

            <div className="flex flex-col w-full gap-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <FAQItem question={faq.question} answer={faq.answer} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

      </main>
    </>
  );
};

export default Index;