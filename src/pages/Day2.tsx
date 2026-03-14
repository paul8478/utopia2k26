import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

gsap.registerPlugin(ScrollTrigger);

const artistsDay2 = [
  // PAGE 1
  { name: "Priya Venkatesh", role: "Bharatanatyam", time: "6:00 PM", image: gallery1 },
  { name: "Ravi Shankar Collective", role: "Sitar & Tabla Ensemble", time: "7:00 PM", image: gallery5 },
  // PAGE 2
  { name: "Dhol Foundation", role: "Percussion Ensemble", time: "8:00 PM", image: gallery3 },
  { name: "Anoushka Menon", role: "Kathak Fusion", time: "9:00 PM", image: gallery1 },
  // PAGE 3
  { name: "Tala Vādya Ensemble", role: "Classical Orchestra", time: "10:00 PM", image: gallery5 },
  { name: "Ghungroo Collective", role: "Dance Theater", time: "11:00 PM", image: gallery3 },
];

const Day2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const endCTA = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  // Added wrappersRef for mobile scrolling distances
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- GSAP MATCHMEDIA FOR RESPONSIVE ANIMATIONS ---
    const mm = gsap.matchMedia();

    // ==========================================
    // DESKTOP LOGIC (Pinned Canvas + Page Turns)
    // ==========================================
    mm.add("(min-width: 768px)", () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;

      const totalFrames = 192; 
      const framesPerPageTurn = 80; 
      const currentFrame = (index: number) => `/frames2/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

      const images: HTMLImageElement[] = [];
      const sequence = { frame: 0 };

      // Load frames only on desktop
      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      const renderFrame = (index: number) => {
        const img = images[Math.round(index)];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };

      const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        renderFrame(sequence.frame);
      };

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();
      images[0].onload = () => renderFrame(0);

      const totalPages = Math.ceil(artistsDay2.length / 2);

      // Set initial desktop card positions
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const isLeftPage = index % 2 === 0;
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          left: isLeftPage ? "38%" : "62%", 
          top: "48%",                       
          scale: 0.7, 
          rotation: isLeftPage ? -4 : 2,   
          autoAlpha: 0,                     
          transformPerspective: 1000,
        });
      });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalPages * 1500}vh`, 
          scrub: 1, 
          pin: true,
        }
      });

      // Fade out title
      if (titleRef.current) {
        masterTl.to(titleRef.current, { autoAlpha: 0, duration: 5, ease: "power2.out" }, 0); 
      }

      // Animate Pages
      for (let page = 0; page < totalPages; page++) {
        const leftCardIndex = page * 2;
        const rightCardIndex = leftCardIndex + 1;
        const leftCard = cardsRef.current[leftCardIndex];
        const rightCard = cardsRef.current[rightCardIndex];

        masterTl.to([leftCard, rightCard].filter(Boolean), { autoAlpha: 1, duration: 5 });

        if (leftCard) {
          masterTl.to(leftCard, { left: "50%", top: "50%", scale: 1, rotation: 0, rotationX: 10, zIndex: 50, boxShadow: "0px 40px 60px rgba(0,0,0,0.5)", duration: 5, ease: "power2.inOut" })
          .to({}, { duration: 1 }) 
          .to(leftCard, { left: "38%", top: "48%", scale: 0.7, rotation: -4, rotationX: 0, zIndex: 10, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)", duration: 5, ease: "power2.inOut" });
        }

        if (rightCard) {
          masterTl.to(rightCard, { left: "50%", top: "50%", scale: 1, rotation: 0, rotationX: 10, zIndex: 50, boxShadow: "0px 40px 60px rgba(0,0,0,0.5)", duration: 5, ease: "power2.inOut" })
          .to({}, { duration: 1 })
          .to(rightCard, { left: "62%", top: "48%", scale: 0.7, rotation: 2, rotationX: 0, zIndex: 10, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)", duration: 5, ease: "power2.inOut" });
        }

        if (page < totalPages - 1) {
          masterTl.to([leftCard, rightCard].filter(Boolean), { autoAlpha: 0, duration: 1 }, "+=0.5"); 
          masterTl.to(sequence, { frame: (page + 1) * framesPerPageTurn, duration: 4, ease: "power2.inOut", onUpdate: () => renderFrame(sequence.frame) }, "<"); 
          masterTl.to({}, { duration: 0.1 });
        } else {
          // Final page: Fade out last cards then reveal the Return link
          masterTl.to([leftCard, rightCard].filter(Boolean), { autoAlpha: 0, duration: 2 }, "+=1");
          if (endCTA.current) {
            masterTl.to(endCTA.current, { autoAlpha: 1, duration: 3, ease: "power2.out" });
          }
        }
      }

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    });

    // ==========================================
    // MOBILE LOGIC (Vertical Scroll, Day 1 Style)
    // ==========================================
    mm.add("(max-width: 767px)", () => {
      
      // 1. Fade title out early
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "40vh top",
            scrub: true,
          }
        });
      }

      // 2. Individual vertical scroll for cards
      cardsRef.current.forEach((card, index) => {
        const wrapper = wrappersRef.current[index];
        if (!card || !wrapper) return;

        // Clear desktop styles
        gsap.set(card, { clearProps: "all" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          }
        });

        // Add a slight alternating tilt for polaroid charm (-2deg or +2deg)
        const tilt = index % 2 === 0 ? -2 : 2;

        tl.fromTo(card, 
            { y: "50vh", opacity: 0, rotation: tilt * 2 }, 
            { y: "0", opacity: 1, rotation: tilt, duration: 1, ease: "power2.out" }
          )
          .to(card, { y: "0", opacity: 1, rotation: tilt, duration: 1 }) 
          .to(card, { y: "-50vh", opacity: 0, rotation: tilt * -1, duration: 1, ease: "power2.in" });
      });

      // 3. Reveal Return Link at bottom of mobile scroll
      if (endCTA.current) {
        gsap.fromTo(endCTA.current,
          { autoAlpha: 0 },
          { 
            autoAlpha: 1, 
            scrollTrigger: {
              trigger: endCTA.current,
              start: "top 90%",
              end: "bottom bottom",
              scrub: true
            }
          }
        );
      }

    });

  }, { scope: containerRef });

  return (
    // Note: overflow-x-hidden instead of overflow-hidden allows mobile vertical scrolling!
    <div ref={containerRef} className="relative bg-[#1A1814] w-full min-h-screen md:h-screen overflow-x-hidden md:overflow-hidden font-sans text-[#2C2A25]">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* MOBILE: Static background */}
        <div 
          className="fixed inset-0 block md:hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/day2mobilebg.jpg')` }}
        />
        {/* DESKTOP: Canvas Video */}
        <canvas ref={canvasRef} className="hidden md:block opacity-100 w-full h-full object-cover" />
      </div>

      {/* --- TITLE --- */}
      <div 
        ref={titleRef} 
        className="fixed md:absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex flex-col items-center text-center mix-blend-multiply opacity-70 w-full px-4"
      >
        <h1 className="text-sm md:text-lg font-sans tracking-[0.6em] text-[#2C2A25] uppercase mb-4">The Roster</h1>
        <p className="text-5xl md:text-7xl font-serif italic text-[#2C2A25]">Day 02</p>
      </div>

      {/* --- CARDS CONTAINER --- */}
      {/* Mobile: Standard relative flex flow. Desktop: Absolute overlay */}
      <div className="relative z-10 w-full flex flex-col items-center md:absolute md:inset-0 md:block md:pointer-events-none perspective-[1200px]">
        
        {/* Initial mobile spacer so cards start below the fold */}
        <div className="h-[100vh] w-full block md:hidden"></div>

        {artistsDay2.map((artist, index) => (
          <div 
            key={index}
            ref={(el) => (wrappersRef.current[index] = el)}
            // Mobile uses h-[80vh] wrapper. Desktop wrapper is basically invisible/absolute.
            className="h-[80vh] w-full flex items-center justify-center px-6 overflow-hidden md:h-auto md:w-auto md:block md:absolute md:inset-0 md:overflow-visible"
          >
            <div 
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative md:absolute will-change-transform shadow-[0px_5px_15px_rgba(0,0,0,0.2)] bg-[#FAFAF8] p-3 pb-14 md:pb-16 ring-1 ring-black/5 rounded-[2px] w-[280px] md:w-[320px]"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#EAE8E0] filter sepia-[20%] contrast-[1.1]">
                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 shadow-[inner_0_0_20px_rgba(44,42,37,0.3)]" />
              </div>

              <div className="absolute bottom-3 md:bottom-4 left-0 w-full text-center px-4">
                <span className="block text-[9px] md:text-[10px] tracking-widest uppercase text-[#8A9A9D] mb-1">
                  {artist.time}
                </span>
                <h2 className="font-serif text-xl md:text-2xl font-bold leading-none text-[#2C2A25]">
                  {artist.name}
                </h2>
                <p className="font-sans text-[10px] md:text-xs italic text-[#B85741] mt-1">
                  {artist.role}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="h-[50vh] w-full block md:hidden"></div>
      </div>

      {/* --- INSTRUCTION --- */}
      <div className="fixed md:absolute top-8 md:bottom-8 md:top-auto left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-60">
        <p className="text-xs font-sans tracking-[0.3em] uppercase text-[#2C2A25]/70 animate-pulse drop-shadow-md whitespace-nowrap bg-white/50 px-4 py-2 rounded-full md:bg-transparent">
          Scroll to Inspect
        </p>
      </div>

      {/* --- CALL TO ACTION - CROSS LINK (Appears at bottom of scroll) --- */}
      <div ref={endCTA} className="relative z-20 w-full flex justify-center py-20 md:py-32 bg-black/40 backdrop-blur-md border-t border-[#2C2A25]/10 mt-20 opacity-0 invisible md:absolute md:bottom-0 md:bg-black/60 md:mt-0">
        <div className="text-center group">
          <p className="text-xs md:text-sm font-sans tracking-[0.4em] uppercase text-white/60 mb-4 mix-blend-difference text-white">
            Where It All Began
          </p>
          <Link 
            to="/day-1"
            className="inline-flex items-center gap-4 text-2xl md:text-4xl font-serif font-bold text-white hover:text-[#B85741] transition-colors duration-300 drop-shadow-lg"
          >
            <span className="group-hover:-translate-x-4 transition-transform duration-300">←</span>
            <span>Return to Day 01</span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Day2;