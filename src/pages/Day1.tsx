import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

gsap.registerPlugin(ScrollTrigger);

// Added descriptions to the data array for the modal
const artists = [
  { name: "Priya Venkatesh", role: "Bharatanatyam", time: "6:00 PM", image: gallery1, description: "Experience the grace and precision of traditional Bharatanatyam. Priya Venkatesh brings ancient stories to life through intricate footwork and expressive abhinaya." },
  { name: "Ravi Shankar Collective", role: "Sitar & Tabla Ensemble", time: "7:00 PM", image: gallery5, description: "A mesmerizing classical fusion of Sitar and Tabla. This ensemble pays tribute to the legends while exploring new improvisational soundscapes." },
  { name: "Dhol Foundation", role: "Percussion Ensemble", time: "8:00 PM", image: gallery3, description: "Feel the earth-shattering rhythms of the Dhol. A high-energy percussion performance designed to get your heart racing and feet moving." },
  { name: "Anoushka Menon", role: "Kathak Fusion", time: "9:00 PM", image: gallery1, description: "Blurring the lines between classical Kathak and contemporary movement. Anoushka Menon delivers a visually stunning and emotionally charged performance." },
  { name: "Tala Vādya Ensemble", role: "Classical Orchestra", time: "10:00 PM", image: gallery5, description: "A grand congregation of traditional Indian instruments. The Tala Vādya Ensemble creates a rich, polyrhythmic tapestry of classical melodies." },
  { name: "Ghungroo Collective", role: "Dance Theater", time: "11:00 PM", image: gallery3, description: "A theatrical dance experience combining storytelling, dramatic lighting, and synchronized Ghungroo footwork to end the night on a high note." },
];

const Day1 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  // STATE FOR THE MODAL
  const [selectedArtist, setSelectedArtist] = useState<typeof artists[0] | null>(null);

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

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: 0,
        y: -100, 
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "50vh top", 
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
        <div 
          className="absolute inset-0 block md:hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/day1mobilebg.jpg')` }}
        />
        <canvas 
          ref={canvasRef} 
          className="hidden md:block opacity-100 w-full h-full object-cover" 
        />
      </div>

      {/* CENTERED, FADING TITLE */}
      <div 
        ref={titleRef} 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none flex flex-col items-center justify-center text-center w-full px-4"
      >
        <h1 className="text-[20vw] md:text-[10vw] font-serif font-black leading-none tracking-tighter text-white mix-blend-difference drop-shadow-2xl">
          DAY 1
        </h1>
        <p className="text-2xl md:text-4xl font-serif italic mt-2 text-white/80 mix-blend-difference drop-shadow-lg">
          Roots & Rhythm
        </p>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        <div className="h-[100vh] w-full"></div>
        
        {artists.map((artist, index) => (
          <div 
            key={index}
            className="h-[50vh] md:h-[300vh] w-full flex items-center justify-center px-4 md:px-6 overflow-hidden"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="card-content w-full max-w-lg flex flex-col items-center text-center will-change-transform">
               
               {/* --- SOLID THEMED UI --- */}
               <div className="bg-[#f5efe6] px-6 py-10 md:p-12 border border-[#3b2a1f]/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center w-full rounded-2xl min-h-[55vh] md:min-h-fit relative overflow-hidden pointer-events-auto"> 
                  
                  {/* Subtle Background Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#b64a2b]/5 rounded-bl-[100px] pointer-events-none" />
                  
                  {/* Glowing Theme Ring around the Image */}                  
                  <div className="p-1 rounded-full bg-gradient-to-tr from-[#b64a2b] to-[#3b2a1f]/20 mb-6 md:mb-8 shadow-xl relative z-10">
                    <img 
                      src={artist.image} 
                      alt={artist.name} 
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#f5efe6]" 
                    />
                  </div>
                  
                  {/* Themed Accent Color for Time */}
                  <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.4em] uppercase mb-2 md:mb-3 text-[#b64a2b] relative z-10">
                    {artist.time}
                  </span>
                  
                  {/* High Contrast Dark Text for Name */}
                  <h2 className="text-3xl md:text-4xl font-serif font-black mb-2 tracking-tight text-[#3b2a1f] relative z-10">
                    {artist.name}
                  </h2>
                  
                  {/* Elegant Dark Subtitle */}
                  <p className="text-sm md:text-base font-sans text-[#3b2a1f]/70 font-medium italic mb-8 md:mb-10 relative z-10">
                    {artist.role}
                  </p>

                  {/* Buttons Section */}
                  <div className="flex w-full gap-3 md:gap-4 justify-center mt-auto relative z-10">
                    <button className="flex-1 bg-[#b64a2b] hover:bg-[#8B2635] text-white text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase py-3 md:py-4 rounded-sm transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer">
                      Register
                    </button>
                    <button 
                      onClick={() => setSelectedArtist(artist)}
                      className="flex-1 border border-[#3b2a1f]/30 hover:border-[#3b2a1f] text-[#3b2a1f] text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase py-3 md:py-4 rounded-sm transition-all duration-300 bg-transparent hover:bg-[#3b2a1f]/5 cursor-pointer"
                    >
                      Know More
                    </button>
                  </div>

               </div>

            </div>
          </div>
        ))}

        <div className="h-[50vh] md:h-[100vh] w-full"></div>
        
        {/* CALL TO ACTION - CROSS LINK */}
        <div className="w-full flex justify-center py-20 bg-black/40 backdrop-blur-md border-t border-white/10 z-20 pointer-events-auto">
          <div className="text-center group">
            <p className="text-xs md:text-sm font-sans tracking-[0.4em] uppercase text-white/60 mb-4">
              The Journey Continues
            </p>
            <Link 
              to="/day-2"
              className="inline-flex items-center gap-4 text-2xl md:text-4xl font-serif font-bold text-white hover:text-[#ff6b35] transition-colors duration-300"
            >
              <span>Experience Day 02</span>
              <span className="group-hover:translate-x-4 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* TRANSPARENT GLASSMORPHISM MODAL */}
      {/* ========================================== */}
      {selectedArtist && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop (clicking it closes the modal) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer transition-opacity"
            onClick={() => setSelectedArtist(null)}
          />
          
          {/* Modal Box - Dark Transparent Glassmorphism */}
          <div className="relative w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.7)] text-white animate-in fade-in zoom-in duration-300">
            
            {/* Close Button (X) */}
            <button 
              onClick={() => setSelectedArtist(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Content */}
            <span className="block text-[#b64a2b] text-xs font-bold tracking-[0.3em] uppercase mb-2">
              {selectedArtist.time}
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-1">
              {selectedArtist.name}
            </h3>
            <p className="text-white/70 italic font-serif mb-6 text-sm md:text-base font-medium">
              {selectedArtist.role}
            </p>
            
            {/* Image Preview inside Modal */}
            <div className="w-full aspect-video mb-6 overflow-hidden rounded-xl border border-white/10 shadow-inner">
              <img 
                src={selectedArtist.image} 
                alt={selectedArtist.name} 
                className="w-full h-full object-cover filter contrast-[1.05]" 
              />
            </div>

            <p className="text-sm md:text-base font-sans text-white/80 leading-relaxed font-medium">
              {selectedArtist.description}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Day1;