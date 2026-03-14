import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

gsap.registerPlugin(ScrollTrigger);

const artists = [
  { name: "Priya Venkatesh", role: "Bharatanatyam", time: "6:00 PM", image: gallery1 },
  { name: "Ravi Shankar Collective", role: "Sitar & Tabla Ensemble", time: "7:00 PM", image: gallery5 },
  { name: "Dhol Foundation", role: "Percussion Ensemble", time: "8:00 PM", image: gallery3 },
  { name: "Anoushka Menon", role: "Kathak Fusion", time: "9:00 PM", image: gallery1 },
  { name: "Tala Vādya Ensemble", role: "Classical Orchestra", time: "10:00 PM", image: gallery5 },
  { name: "Ghungroo Collective", role: "Dance Theater", time: "11:00 PM", image: gallery3 },
];

const Day1 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // 1. ADDED REF FOR THE TITLE
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // --- CANVAS VIDEO SETUP (Desktop Only) ---
    const frameCount = 300; 
    const currentFrame = (index: number) => 
      `/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const sequence = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
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

    // --- MASTER TIMELINES ---
    
    // Background Video Scrubbing
    gsap.to(sequence, {
      frame: frameCount - 1,
      ease: "none", 
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, 
      },
      onUpdate: () => {
        requestAnimationFrame(() => renderFrame(sequence.frame));
      },
    });

    // 2. ANIMATE TITLE FADING OUT ON SCROLL
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: 0,
        y: -100, // Floats upward slightly as it fades
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "50vh top", // Fades out completely after scrolling half a screen down
          scrub: true,
        }
      });
    }

    // Custom Card Choreography
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const content = card.querySelector('.card-content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 70%",  
          end: "bottom 30%", 
          scrub: 1,         
        }
      });

      tl.fromTo(content, 
          { y: "50vh", opacity: 0 }, 
          { y: "0", opacity: 1, duration: 1, ease: "power2.out" }
        )
        .to(content, { y: "0", opacity: 1, duration: 1 }) 
        .to(content, { y: "-50vh", opacity: 0, duration: 1, ease: "power2.in" });
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-black text-white w-full overflow-hidden">
      
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* MOBILE: Static Background Image */}
        <div 
          className="absolute inset-0 block md:hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/day1mobilebg.jpg')` }}
        />

        {/* DESKTOP: Interactive Video Scrub Canvas */}
        <canvas 
          ref={canvasRef} 
          className="hidden md:block opacity-100 w-full h-full object-cover" 
        />
        
      </div>

      {/* 3. CENTERED, FADING TITLE */}
      <div 
        ref={titleRef} 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none flex flex-col items-center justify-center text-center w-full px-4"
      >
        <h1 className="text-[20vw] md:text-[10vw] font-serif font-black leading-none tracking-tighter text-white mix-blend-difference drop-shadow-2xl">
          DAY 1
        </h1>
        <p className="text-2xl md:text-4xl font-serif italic mt-2 text-gold mix-blend-difference drop-shadow-lg">
          Roots & Rhythm
        </p>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Adjusted initial spacer so the first card comes up right after the title fades */}
        <div className="h-[100vh] w-full"></div>
        
        {/* 4. RESPONSIVE HEIGHT WRAPPERS 
            Mobile: 120vh (Faster scrolling)
            Desktop: 300vh (Slow, cinematic video scrubbing)
        */}
        {artists.map((artist, index) => (
          <div 
            key={index}
            className="h-[50vh] md:h-[300vh] w-full flex items-center justify-center px-6 overflow-hidden"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="card-content w-full max-w-3xl flex flex-col items-center text-center will-change-transform">
               
               {/* --- BRIGHT FROSTED GLASSMORPHISM UI --- */}
               <div className="bg-white/20 backdrop-blur-2xl px-6 py-16 md:p-14 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center w-full rounded-2xl min-h-[55vh] md:min-h-fit"> 
                  
                  {/* Glowing Theme Ring around the Image */}                  
                  <div className="p-1 rounded-full bg-gradient-to-tr from-[#ff6b35] to-white/50 mb-6 md:mb-8 shadow-xl">
                    <img 
                      src={artist.image} 
                      alt={artist.name} 
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-white" 
                    />
                  </div>
                  
                  {/* Themed Accent Color for Time */}
                  <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.4em] uppercase mb-3 md:mb-4 text-[#ff6b35] drop-shadow-sm">
                    {artist.time}
                  </span>
                  
                  {/* High Contrast Dark Text for Name */}
                  <h2 className="text-2xl md:text-4xl font-serif font-black mb-2 md:mb-3 tracking-tight text-[#0a0a0a]">
                    {artist.name}
                  </h2>
                  
                  {/* Elegant Dark Subtitle */}
                  <p className="text-base md:text-lg font-sans text-[#0a0a0a]/80 font-medium italic">
                    {artist.role}
                  </p>
               </div>

            </div>
          </div>
        ))}

        <div className="h-[50vh] md:h-[100vh] w-full"></div>
        
        {/* 5. CALL TO ACTION - CROSS LINK */}
        <div className="w-full flex justify-center py-20 bg-background/5 border-t border-white/10 z-20">
          <div className="text-center group">
            <p className="text-xs md:text-sm font-sans tracking-[0.4em] uppercase text-white/60 mb-4">
              The Journey Continues
            </p>
            <Link 
              to="/day-2"
              className="inline-flex items-center gap-4 text-2xl md:text-4xl font-serif font-bold text-white hover:text-gold transition-colors duration-300"
            >
              <span>Experience Day 02</span>
              <span className="group-hover:translate-x-4 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Day1;