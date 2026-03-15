import React from "react";
import artist1 from "../assets/1.png";
import "../components/css/artist.css";
import ScrollReveal from "./ScrollReveal";

const Artist: React.FC = () => {
  return (
    <>
      {/* ── Section Header ───────────────────────────────────────────────── */}
      {/* ── Section Header ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-0 mb-6 md:mb-16 mt-6 md:mt-12 text-left">
        <ScrollReveal>
          <span className="text-[10px] font-sans uppercase tracking-[0.6em] text-primary">
            Main Event
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-2 md:mt-4 text-[11vw] md:text-[5.5vw] font-serif font-black leading-[0.88] tracking-[-0.03em] text-foreground mb-4">
            Headlining{" "}
            <span className="italic text-primary">Acts</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.18}>
          <p className="mt-3 md:mt-6 max-w-2xl text-base md:text-lg font-sans text-muted-foreground leading-relaxed">
            The climax of each day at Utopia 2K26 features breathtaking performances from India's most celebrated artists. Prepare for unforgettable nights of pure magic.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.22}>
          <div className="mt-6 md:mt-10 flex items-center justify-start gap-4">
            <div className="h-px w-20 bg-border" />
            <span className="text-primary text-xs tracking-[0.5em] font-sans uppercase select-none">
              ◈
            </span>
            <div className="h-px w-12 bg-border" />
          </div>
        </ScrollReveal>
      </div>

      {/* SECTION 1 */}
      <section className="about-section" style={{ marginBottom: "5px" }}>
        <div className="about-container">

          {/* RIGHT IMAGE */}
          <div className="about-image relative group flex justify-center items-center">
            <img src={artist1} alt="Cultural Art" className="relative z-10" />
          </div>

          {/* LEFT CONTENT */}
          <div className="about-content">
            <section className="py-6 px-6 md:px-0 relative">
              <div className="max-w-7xl mx-auto">
                <ScrollReveal delay={0.1}>
                  <h2 className="text-[8vw] md:text-[3vw] font-serif leading-[0.95] tracking-[-0.02em]">
                    Our Day 1 Fest's Artist{" "}
                    <span className="text-primary italic">Arijit Singh</span> in{" "}
                    <span className="text-neon-pink italic">Utopia 2026</span>.
                  </h2>
                </ScrollReveal>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="about-section" style={{ marginBottom: "5px" }}>
        <div className="about-container">

          {/* LEFT CONTENT */}
          <div className="about-content">
            <section className="py-6 px-6 md:px-0 relative">
              <div className="max-w-7xl mx-auto">
                <ScrollReveal delay={0.1}>
                  <h2 className="text-[8vw] md:text-[3vw] font-serif leading-[0.95] tracking-[-0.02em]">
                    Our Day 2 Fest's Artist{" "}
                    <span className="text-primary italic">Arijit Singh</span> in{" "}
                    <span className="text-neon-pink italic">Utopia 2026</span>.
                  </h2>
                </ScrollReveal>
              </div>
            </section>
          </div>

          {/* RIGHT IMAGE */}
          <div className="about-image relative group flex justify-center items-center">
            <img src={artist1} alt="Cultural Art" className="relative z-10 w-[80%]" />
          </div>

        </div>
      </section>
    </>
  );
};

export default Artist;