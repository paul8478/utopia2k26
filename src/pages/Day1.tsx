import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const artists = [
  { name: "Priya Venkatesh", role: "Bharatanatyam", time: "6:00 PM", image: gallery1 },
  { name: "Ravi Shankar Collective", role: "Sitar & Tabla Ensemble", time: "7:00 PM", image: gallery5 },
  { name: "Dhol Foundation", role: "Percussion Ensemble", time: "8:00 PM", image: gallery3 },
  { name: "Anoushka Menon", role: "Kathak Fusion", time: "9:00 PM", image: gallery1 },
  { name: "Tala Vādya Ensemble", role: "Classical Orchestra", time: "10:00 PM", image: gallery5 },
  { name: "Ghungroo Collective", role: "Dance Theater", time: "11:00 PM", image: gallery3 },
];

const Day1 = () => {
  const [hoveredArtist, setHoveredArtist] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="min-h-screen bg-[#F6EAC2] pt-24 relative" onMouseMove={handleMouseMove}>
      {/* Noise overlay */}
      <div className="fixed inset-0 z-[5] pointer-events-none opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />

      {/* Golden hour ambient glow */}
      <div className="fixed top-0 right-0 w-[60vw] h-[60vh] pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top_right,_hsl(30_100%_60%/0.3)_0%,_transparent_70%)]" />

      {/* Cursor-following image */}
      <AnimatePresence>
        {hoveredArtist !== null && (
          <motion.div
            className="fixed pointer-events-none z-30 w-72 h-96 overflow-hidden"
            initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              x: mousePos.x - 144,
              y: mousePos.y - 192,
            }}
            exit={{ opacity: 0, scale: 0.7, rotate: 5 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
          >
            <img
              src={artists[hoveredArtist].image}
              alt={artists[hoveredArtist].name}
              className="w-full h-full object-cover"
              style={{ filter: "sepia(40%) saturate(1.4) brightness(0.85)" }}
            />
            {/* Golden hour overlay on image */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(30_100%_60%/0.15)_0%,_transparent_70%)]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-h-[calc(100vh-6rem)] relative z-10">
        {/* Sticky Sidebar */}
        <aside className="hidden lg:flex w-80 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] flex-col justify-between p-8 border-r border-border">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-primary">March 14, 2026</span>
            <h2 className="text-[8vw] lg:text-[5vw] font-serif font-black mt-4 leading-[0.85] tracking-[-0.03em]">
              DAY<br />
              <span className="text-primary">01</span>
            </h2>
            <p className="mt-4 text-xl font-serif italic text-gold">Roots & Rhythm</p>
            <p className="mt-6 text-sm text-muted-foreground font-sans leading-relaxed">
              An evening dedicated to the sacred foundations of Indian rhythm. From the temples to the stage.
            </p>
          </div>
          <div className="text-[10px] font-sans uppercase tracking-[0.3em] text-muted-foreground">
            6:00 PM — 12:00 AM
          </div>
        </aside>

        {/* Artist Lineup */}
        <main className="flex-1 px-6 md:px-16 py-12">
          {/* Mobile header */}
          <div className="lg:hidden mb-12">
            <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-primary">March 14, 2026</span>
            <h1 className="text-[14vw] font-serif font-black mt-2 leading-[0.85] tracking-[-0.03em]">
              DAY <span className="text-primary">01</span>
            </h1>
            <p className="text-xl font-serif italic text-gold mt-1">Roots & Rhythm</p>
          </div>

          <div className="space-y-0">
            {artists.map((artist, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div
                  className="group py-8 border-b border-border cursor-pointer"
                  onMouseEnter={() => setHoveredArtist(i)}
                  onMouseLeave={() => setHoveredArtist(null)}
                >
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-sans text-muted-foreground mr-4 tracking-widest">{artist.time}</span>
                      <h3 className="inline text-2xl md:text-[3.5vw] font-serif font-bold leading-[0.95] tracking-[-0.02em] group-hover:text-primary transition-colors duration-500">
                        {artist.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold hidden md:block">
                      {artist.role}
                    </span>
                  </div>
                  <p className="text-sm font-sans text-muted-foreground mt-1 md:hidden">{artist.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Day1;
