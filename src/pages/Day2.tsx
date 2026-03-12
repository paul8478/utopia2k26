import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  // 1. ADDED REF FOR THE TITLE
  const titleRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const totalFrames = 192; 
    const framesPerPageTurn = 80; 
    
    const currentFrame = (index: number) => 
      `/frames2/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const sequence = { frame: 0 };

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

    const ctx = gsap.context(() => {
      const totalPages = Math.ceil(artistsDay2.length / 2);

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const isLeftPage = index % 2 === 0;
        
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          left: isLeftPage ? "38%" : "62%", 
          top: "48%",                       
          scale: 0.7, 
          rotation: isLeftPage ? -4 : -2,   
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

      // 2. FADE OUT TITLE IMMEDIATELY WHEN SCROLL STARTS
      // The '0' at the end tells GSAP to place this exactly at the beginning of the timeline
      if (titleRef.current) {
        masterTl.to(titleRef.current, {
          autoAlpha: 0,
          duration: 5,
          ease: "power2.out"
        }, 0); 
      }

      for (let page = 0; page < totalPages; page++) {
        const leftCardIndex = page * 2;
        const rightCardIndex = leftCardIndex + 1;
        const leftCard = cardsRef.current[leftCardIndex];
        const rightCard = cardsRef.current[rightCardIndex];

        masterTl.to([leftCard, rightCard].filter(Boolean), {
          autoAlpha: 1,
          duration: 5
        });

        // LIFT LEFT CARD
        if (leftCard) {
          masterTl.to(leftCard, {
            left: "50%",
            top: "50%",
            scale: 1, 
            rotation: 0, 
            rotationX: 10, 
            zIndex: 50,
            boxShadow: "0px 40px 60px rgba(0,0,0,0.5)", 
            duration: 5,
            ease: "power2.inOut"
          })
          .to({}, { duration: 1 }) 
          // PUT LEFT CARD DOWN
          .to(leftCard, {
            left: "38%", 
            top: "48%",  
            scale: 0.7, 
            rotation: -4, 
            rotationX: 0,
            zIndex: 10,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)", 
            duration: 5,
            ease: "power2.inOut"
          });
        }

        // LIFT RIGHT CARD
        if (rightCard) {
          masterTl.to(rightCard, {
            left: "50%",
            top: "50%",
            scale: 1,
            rotation: 0,
            rotationX: 10,
            zIndex: 50,
            boxShadow: "0px 40px 60px rgba(0,0,0,0.5)",
            duration: 5,
            ease: "power2.inOut"
          })
          .to({}, { duration: 1 })
          // PUT RIGHT CARD DOWN
          .to(rightCard, {
            left: "62%", 
            top: "48%",  
            scale: 0.7, 
            rotation: -2, 
            rotationX: 0,
            zIndex: 10,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            duration: 5,
            ease: "power2.inOut"
          });
        }

        // TURN THE PAGE 
        if (page < totalPages - 1) {
          masterTl.to([leftCard, rightCard].filter(Boolean), {
            autoAlpha: 0,
            duration: 1
          }, "+=0.5"); 

          masterTl.to(sequence, {
            frame: (page + 1) * framesPerPageTurn, 
            duration: 4, 
            ease: "power2.inOut",
            onUpdate: () => renderFrame(sequence.frame)
          }, "<"); 

          masterTl.to({}, { duration: 0.1 });
        }
      }

    }, container);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#1A1814] w-full h-screen overflow-hidden font-sans text-[#2C2A25]">
      
      {/* BACKGROUND CANVAS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="opacity-100" />
      </div>

      {/* 3. ATTACHED REF TO THE TITLE DIV */}
      <div 
        ref={titleRef} 
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex flex-col items-center text-center mix-blend-multiply opacity-70"
      >
        <h1 className="text-sm md:text-lg font-sans tracking-[0.6em] text-[#2C2A25] uppercase mb-4">The Roster</h1>
        <p className="text-5xl md:text-7xl font-serif italic text-[#2C2A25]">Day 02</p>
      </div>

      {/* POLAROID CARDS OVERLAY */}
      <div className="absolute inset-0 z-10 pointer-events-none perspective-[1200px]">
        {artistsDay2.map((artist, index) => (
          <div 
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute w-[320px] will-change-transform shadow-[0px_5px_15px_rgba(0,0,0,0.2)] bg-[#FAFAF8] p-3 pb-16 ring-1 ring-black/5 rounded-[2px]"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#EAE8E0] filter sepia-[20%] contrast-[1.1]">
              <img 
                src={artist.image} 
                alt={artist.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 shadow-[inner_0_0_20px_rgba(44,42,37,0.3)]" />
            </div>

            <div className="absolute bottom-4 left-0 w-full text-center px-4">
              <span className="block text-[10px] tracking-widest uppercase text-[#8A9A9D] mb-1">
                {artist.time}
              </span>
              <h2 className="font-serif text-2xl font-bold leading-none text-[#2C2A25]">
                {artist.name}
              </h2>
              <p className="font-sans text-xs italic text-[#B85741] mt-1">
                {artist.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-60">
        <p className="text-xs font-sans tracking-[0.3em] uppercase text-white/70 animate-pulse drop-shadow-md">
          Scroll to Inspect
        </p>
      </div>

    </div>
  );
};

export default Day2;