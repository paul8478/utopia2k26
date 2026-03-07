import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroClassical from "@/assets/hero-classical.jpg";
import heroNeon from "@/assets/hero-neon.jpg";
import MagneticButton from "@/components/MagneticButton";
import StaggerText from "@/components/StaggerText";
import ScrollReveal from "@/components/ScrollReveal";

const breathe = {
  scale: [1, 1.03, 1],
  transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Noise overlay */}
      <div className="fixed inset-0 z-[5] pointer-events-none opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Dual Split Background */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full relative overflow-hidden">
            <motion.img
              src={heroClassical}
              alt="Classical Indian dancer"
              className="w-full h-full object-cover"
              initial={{ scale: 1.3 }}
              animate={{ scale: 1, ...breathe }}
              transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
            />
            {/* Golden hour radial */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(30_100%_60%/0.2)_0%,_transparent_70%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
          </div>
          <div className="w-1/2 h-full relative overflow-hidden">
            <motion.img
              src={heroNeon}
              alt="Neon club atmosphere"
              className="w-full h-full object-cover"
              initial={{ scale: 1.3 }}
              animate={{ scale: 1, ...breathe }}
              transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
          </div>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-background/20" />

        {/* Title with mix-blend-mode — BRUTALIST SCALE */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <div className="mix-blend-difference">
            <StaggerText
              text="UTOPIA"
              tag="h1"
              className="text-[22vw] md:text-[18vw] font-serif font-black leading-[0.85] tracking-[-0.04em] text-foreground"
            />
          </div>
          <div className="mix-blend-difference mt-[-3vw]">
            <StaggerText
              text="2K26"
              tag="h1"
              className="text-[12vw] md:text-[12vw] font-sans font-light leading-[0.85] tracking-[0.25em] text-foreground"
              delay={0.4}
            />
          </div>

          <motion.p
            className="mt-10 text-xs md:text-sm font-sans uppercase tracking-[0.6em] text-muted-foreground mix-blend-difference"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          >
            Where Rhythm Evolves
          </motion.p>

          <motion.div
            className="mt-14 flex gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <MagneticButton>
              <Link
                to="/day-1"
                className="px-8 py-3 border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
              >
                Day 01 — Roots
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/day-2"
                className="px-8 py-3 border border-neon-green text-neon-green font-sans text-sm uppercase tracking-widest hover:bg-neon-green hover:text-background transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--neon-green)/0.5)]"
              >
                Day 02 — Neon
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-muted-foreground">Scroll</span>
          <motion.div
            className="w-px h-16 bg-primary/40"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* Tagline Section */}
      <section className="py-40 px-6 md:px-20 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-[8vw] md:text-[5vw] font-serif leading-[0.95] tracking-[-0.02em]">
              A festival that bridges{" "}
              <span className="text-primary italic">ancient rhythm</span> with{" "}
              <span className="text-neon-pink italic">electronic pulse</span>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-10 text-lg md:text-xl text-muted-foreground font-sans max-w-3xl leading-relaxed">
              Two days. Two worlds. One heartbeat. Utopia 2K26 brings together the spiritual depth
              of India's classical traditions and the raw energy of underground electronic culture.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Days Preview */}
      <section className="py-24 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-4 max-w-7xl mx-auto">
          <ScrollReveal direction="left">
            <Link to="/day-1" className="group block relative overflow-hidden aspect-[4/3]">
              <motion.img
                src={heroClassical}
                alt="Day 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                animate={breathe}
              />
              {/* Golden hour glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(30_100%_60%/0.25)_0%,_transparent_60%)]" />
              <div className="absolute inset-0 bg-background/50 group-hover:bg-background/40 transition-colors duration-700 flex flex-col justify-end p-8">
                <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-primary">March 14, 2026</span>
                <h3 className="text-[10vw] md:text-[4vw] font-serif font-black mt-2 leading-[0.9] mix-blend-difference">Day 01</h3>
                <p className="text-lg font-serif italic text-gold mt-1">Roots & Rhythm</p>
              </div>
            </Link>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <Link to="/day-2" className="group block relative overflow-hidden aspect-[4/3]">
              <motion.img
                src={heroNeon}
                alt="Day 2"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                animate={breathe}
              />
              <div className="absolute inset-0 bg-background/50 group-hover:bg-background/40 transition-colors duration-700 flex flex-col justify-end p-8">
                <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-neon-green">March 15, 2026</span>
                <h3 className="text-[10vw] md:text-[4vw] font-serif font-black mt-2 leading-[0.9] mix-blend-difference">Day 02</h3>
                <p className="text-lg font-serif italic text-neon-pink mt-1">Neon Nights</p>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-serif text-2xl font-bold text-primary">UTOPIA 2K26</span>
          <div className="flex gap-8 text-xs font-sans uppercase tracking-[0.3em] text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/gallery" className="hover:text-foreground transition-colors">Gallery</Link>
            <Link to="/day-1" className="hover:text-foreground transition-colors">Day 01</Link>
            <Link to="/day-2" className="hover:text-foreground transition-colors">Day 02</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
