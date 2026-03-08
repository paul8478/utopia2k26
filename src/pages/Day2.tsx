import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";

const artists = [
  { name: "PRISM", genre: "Techno", time: "10:00 PM" },
  { name: "NØVA", genre: "House / Deep Bass", time: "11:00 PM" },
  { name: "SYNTH RAGA", genre: "Electronic Fusion", time: "12:00 AM" },
  { name: "VOID.EXE", genre: "Industrial Techno", time: "1:00 AM" },
  { name: "BASS TEMPLE", genre: "Drum & Bass", time: "2:00 AM" },
  { name: "NEURAL DRIFT", genre: "Ambient / Experimental", time: "3:00 AM" },
];

const Day2 = () => {
  return (
    <div className="min-h-screen bg-white text-foreground relative overflow-hidden">
      {/* Noise overlay */}
      <div className="fixed inset-0 z-[5] pointer-events-none opacity-[0.06] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />

      {/* Neon ambient glow - top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_hsl(var(--neon-violet)/0.5)_0%,_transparent_70%)]" />

      {/* Infinite Marquee Background */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-[25vw] font-serif font-black mx-8 leading-none" style={{ color: "hsl(var(--neon-green))" }}>
              DANCE DANCE DANCE
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24">
        {/* Hero */}
        <section className="px-6 md:px-20 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <span
              className="text-[10px] font-sans uppercase tracking-[0.6em]"
              style={{ color: "hsl(var(--neon-pink))" }}
            >
              March 15, 2026
            </span>

            <h1
              className="glitch-text text-[16vw] md:text-[14vw] font-serif font-black mt-4 leading-[0.82] tracking-[-0.04em] mix-blend-exclusion drop-shadow-[0_0_40px_hsl(var(--neon-green)/0.3)]"
              data-text="NEON NIGHTS"
              style={{ color: "hsl(var(--foreground))" }}
            >
              NEON NIGHTS
            </h1>

            <motion.p
              className="mt-8 text-base md:text-lg font-sans max-w-xl leading-relaxed"
              style={{ color: "hsl(var(--muted-foreground))" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            >
              The underground awakens. Descend into the void where beats shatter reality
              and bass frequencies rewire your consciousness.
            </motion.p>
          </motion.div>
        </section>

        {/* Artist Grid */}
        <section className="px-6 md:px-20 py-16">
          <div className="max-w-5xl">
            {artists.map((artist, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="group py-6 md:py-8 border-b flex items-baseline justify-between cursor-pointer" style={{ borderColor: "hsl(var(--neon-green) / 0.12)" }}>
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="text-[10px] font-sans tracking-widest" style={{ color: "hsl(var(--neon-green) / 0.4)" }}>
                      {artist.time}
                    </span>
                    <h3
                      className="text-2xl md:text-[4vw] font-sans font-bold tracking-[-0.03em] leading-[0.95] transition-all duration-500"
                      style={{ color: "hsl(var(--foreground))" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "hsl(var(--neon-green))";
                        e.currentTarget.style.textShadow = "0 0 15px hsl(var(--neon-green) / 0.8), 0 0 40px hsl(var(--neon-green) / 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "hsl(var(--foreground))";
                        e.currentTarget.style.textShadow = "none";
                      }}
                    >
                      {artist.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.3em] hidden md:block" style={{ color: "hsl(var(--neon-pink) / 0.5)" }}>
                    {artist.genre}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-20 py-40 text-center relative">
          {/* Neon glow behind CTA */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[50vw] h-[30vh] bg-[radial-gradient(circle,_hsl(var(--neon-green)/0.08)_0%,_transparent_70%)]" />
          </div>
          <ScrollReveal>
            <h2
              className="text-[10vw] md:text-[8vw] font-serif font-black leading-[0.85] tracking-[-0.03em] neon-glow-green drop-shadow-[0_0_60px_hsl(var(--neon-green)/0.5)]"
              style={{ color: "hsl(var(--neon-green))" }}
            >
              ARE YOU READY?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-12">
              <MagneticButton>
                <button
                  className="px-14 py-5 font-sans text-xs uppercase tracking-[0.4em] transition-all duration-500 border"
                  style={{
                    borderColor: "hsl(var(--neon-pink))",
                    color: "hsl(var(--neon-pink))",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "hsl(var(--neon-pink))";
                    e.currentTarget.style.color = "hsl(var(--neon-bg))";
                    e.currentTarget.style.boxShadow = "0 0 40px hsl(var(--neon-pink) / 0.6), 0 0 80px hsl(var(--neon-pink) / 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "hsl(var(--neon-pink))";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Enter the Void
                </button>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
};

export default Day2;
