import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

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

    const ctx = gsap.context(() => {
      
      // BACKGROUND VIDEO SCRUBBING
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
          requestAnimationFrame(() => {
            renderFrame(sequence.frame);
          });
        },
      });

      // STRICT CUSTOM CARD CHOREOGRAPHY
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const content = card.querySelector('.card-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 60%",  
            end: "bottom 40%", 
            scrub: true,
          }
        });

        switch(index) {
          case 0:
            // 1st Card: Center, Slide Right to Left (As it was)
            tl.fromTo(content, { x: "100vw", y: 0, opacity: 0 }, { x: "0", y: 0, opacity: 1, duration: 1 })
              .to(content, { x: "0", opacity: 1, duration: 1.5 })
              .to(content, { x: "-100vw", opacity: 0, duration: 1 });
            break;
            
          case 1:
            // 2nd Card: Lower middle left
            tl.fromTo(content, { x: "-25vw", y: "40vh", opacity: 0 }, { x: "-25vw", y: "25vh", opacity: 1, duration: 1 })
              .to(content, { x: "-25vw", y: "25vh", opacity: 1, duration: 1.5 })
              .to(content, { x: "-25vw", y: "40vh", opacity: 0, duration: 1 });
            break;

          case 2:
            // 3rd Card: Right top under navbar
            tl.fromTo(content, { x: "25vw", y: "-40vh", opacity: 0 }, { x: "25vw", y: "-25vh", opacity: 1, duration: 1 })
              .to(content, { x: "25vw", y: "-25vh", opacity: 1, duration: 1.5 })
              .to(content, { x: "25vw", y: "-40vh", opacity: 0, duration: 1 });
            break;

          case 3:
            // 4th Card: Paper untwist from bottom
            // Set 3D perspective and hinge point at the bottom of the card
            gsap.set(content, { transformPerspective: 1000, transformOrigin: "bottom center" });
            tl.fromTo(content, 
                // Folded completely down/away (-90deg) at the bottom
                { rotationX: -90, y: "35vh", x: "0", opacity: 0 }, 
                // Unfold to flat (0deg)
                { rotationX: 0, y: "25vh", x: "0", opacity: 1, duration: 1, ease: "back.out(1.5)" }
              )
              .to(content, { rotationX: 0, y: "25vh", opacity: 1, duration: 1.5 })
              // Fold back down and disappear
              .to(content, { rotationX: 90, y: "35vh", opacity: 0, duration: 1, ease: "power2.in" });
            break;

          case 4:
            // 5th Card: Left middle appear
            tl.fromTo(content, { x: "-50vw", y: "0", opacity: 0 }, { x: "-35vw", y: "0", opacity: 1, duration: 1 })
              .to(content, { x: "-35vw", y: "0", opacity: 1, duration: 1.5 })
              .to(content, { x: "-50vw", y: "0", opacity: 0, duration: 1 });
            break;

          case 5:
            // 6th Card: Direct middle appear
            tl.fromTo(content, { x: "0", y: "0", scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 })
              .to(content, { scale: 1, opacity: 1, duration: 1.5 })
              .to(content, { scale: 1.2, opacity: 0, duration: 1 });
            break;

          default:
            break;
        }
      });

    }, container);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black text-white w-full overflow-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas 
          ref={canvasRef} 
          className="opacity-100" 
        />
      </div>

      <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50 pointer-events-none">
        <h1 className="text-[12vw] md:text-[6vw] font-serif font-black leading-none tracking-tighter text-white mix-blend-difference">
          DAY 1
        </h1>
        <p className="text-xl md:text-2xl font-serif italic ml-2 mt-2 text-gold mix-blend-difference">Roots & Rhythm</p>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        <div className="h-[100vh] w-full"></div>

        {artists.map((artist, index) => (
          <div 
            key={index}
            className="h-[300vh] w-full flex items-center justify-center px-6 overflow-hidden"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="card-content w-full max-w-lg flex flex-col items-center text-center will-change-transform">
               <div className="bg-white/5 backdrop-blur-xl p-10 md:p-14 border border-white/10 shadow-[-20px_0_50px_rgb(0,0,0,0.5)] flex flex-col items-center w-full rounded-sm">
                  <img 
                    src={artist.image} 
                    alt={artist.name} 
                    className="w-32 h-32 rounded-full object-cover mb-8 filter grayscale opacity-80" 
                  />
                  <span className="text-xs font-sans tracking-[0.4em] uppercase mb-4 text-white/50">
                    {artist.time}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 tracking-tight text-white">
                    {artist.name}
                  </h2>
                  <p className="text-lg font-sans text-gold/80 italic">
                    {artist.role}
                  </p>
               </div>
            </div>
          </div>
        ))}

        <div className="h-[100vh] w-full"></div>
        
      </div>
    </div>
  );
};

export default Day1;