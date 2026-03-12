import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// --- DATA ---
const CARDS_DATA = [
  { id: 0, title: "Beverage Branding", img: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&h=800&fit=crop" },
  { id: 1, title: "Apparel Design", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=800&fit=crop" },
  { id: 2, title: "Luxury Packaging", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=800&fit=crop" },
  { id: 3, title: "Cosmetics Brand", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=800&fit=crop" },
  { id: 4, title: "Fashion Editorial", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=800&fit=crop" },
  { id: 5, title: "Botanical Series", img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=800&fit=crop" },
  { id: 6, title: "Product Photography", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop" },
  { id: 7, title: "Streetwear Brand", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=800&fit=crop" },
  { id: 8, title: "Tech Accessories", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop" },
  { id: 9, title: "Wellness Products", img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=800&fit=crop" },
  { id: 10, title: "Home Decor", img: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&h=800&fit=crop" }
];

// We duplicate the array 3 times to create a seamless infinite loop track
const INFINITE_CARDS = [...CARDS_DATA, ...CARDS_DATA, ...CARDS_DATA];

export default function Teams() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // 1. SETUP THE INFINITE LOOP MARQUEE
    // Width of 11 cards (240px width + 8px gap = 248px per card)
    const singleSetWidth = 11 * 248; 
    
    // Start track shifted left by one full set so there are always cards off-screen
    gsap.set(track, { x: -singleSetWidth });

    // Animate track moving left continuously. When it moves exactly one set's width, it resets flawlessly.
    gsap.to(track, {
      x: `-=${singleSetWidth}`,
      duration: 20, // ⏳ SPEED CONTROL: Change to 15 (faster) or 30 (slower)
      repeat: -1,
      ease: "none"
    });

    // 2. REAL-TIME 3D MATH ENGINE
    // This runs 60 times a second, calculating exact 3D angles based on screen position
    const update3D = () => {
      const screenCenter = window.innerWidth / 2;
      const trackX = track.getBoundingClientRect().left;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        // Calculate where the exact center of THIS specific card is on the screen right now
        const cardLocalX = (i * 248) + 120; // 248 is card+gap, 120 is half width
        const cardGlobalX = trackX + cardLocalX;
        
        // Distance from the center of the screen
        const offset = cardGlobalX - screenCenter;
        
        // Normalize the distance (0 = center, 1 = far edge)
        // 1200px is roughly the distance to the edge of the screen
        let progress = Math.min(Math.abs(offset) / 1200, 1);
        
        // Apply an easing curve to match your original exact heights perfectly
        progress = Math.sin(progress * (Math.PI / 2)); 

        // Apply your exact original parameters dynamically!
        const height = 310 + (310 * progress);      // Center = 310, Edges = 620
        const z = progress * 240;                   // Center = 0 (far away), Edges = 240 (close)
        const rotateY = (offset / 1200) * -55;      // Left cards angle right (+), Right cards angle left (-)

        // Dynamic clip-path logic matching your original trapezoids
        const squeeze = progress * 10;
        let clipPath;
        if (offset < 0) {
          // Card is on the Left side
          clipPath = `polygon(0px 0px, 100% ${squeeze}%, 100% ${100 - squeeze}%, 0px 100%)`;
        } else {
          // Card is on the Right side
          clipPath = `polygon(0px ${squeeze}%, 100% 0px, 100% 100%, 0px ${100 - squeeze}%)`;
        }

        // Apply all properties instantly without transition delay for a buttery smooth 3D effect
        gsap.set(card, {
          height,
          z,
          rotateY,
          clipPath
        });
      });
    };

    // Attach to GSAP's rendering engine
    gsap.ticker.add(update3D);

    // Cleanup
    return () => gsap.ticker.remove(update3D);
  }, []);

  return (
    // h-screen and overflow-hidden completely kill scrolling on this page
    <div className="h-screen w-full flex flex-col items-center justify-center font-sans overflow-hidden select-none relative">      
      {/* Required CSS for 3D card borders & thickness */}
      <div 
        className="absolute inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
        // Replace this URL with your imported image variable like: backgroundImage: `url(${bgImage})`
        style={{ backgroundImage: `url(/tmbg.avif)` }}
      />
      <style>{`
        .track-3d { 
          transform-style: preserve-3d; 
        }
        .card-3d { 
          transform-style: preserve-3d; 
          will-change: transform, height, clip-path;
        }
        .card-3d::before {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.15), transparent 30%, transparent 70%, rgba(0,0,0,0.15));
          transform: translateZ(-8px); pointer-events: none;
        }
        .card-3d::after {
          content: ""; position: absolute; inset: 0;
          background: #e0e0e0; transform: translateZ(-16px);
          box-shadow: 0 0 40px rgba(0,0,0,0.3); pointer-events: none;
        }
      `}</style>

      {/* Header */}
      <div className="text-center mt-32 mb-2 relative z-50">
        <h1 className="text-[clamp(36px,5vw,56px)] font-black text-[#0a0a0a] leading-[1.1]">Our Team that made it possible</h1>
      </div>

      {/* Main 3D Slider Container */}
      <div className="w-full max-w-[1400px] perspective-[1500px] overflow-visible">
        
        {/* The continuously moving track */}
        <div 
          ref={trackRef} 
          className="flex items-center gap-[8px] track-3d w-max"
        >
          {INFINITE_CARDS.map((card, i) => (
            <div
              key={`${card.id}-${i}`}
              ref={el => (cardRefs.current[i] = el)}
              // Width matches your exact original layout, heights change dynamically!
              className="card-3d flex-shrink-0 w-[240px] bg-white relative pointer-events-none"
            >
              <img 
                src={card.img} 
                alt={card.title} 
                className="w-full h-full object-cover relative z-[1]" 
              />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}