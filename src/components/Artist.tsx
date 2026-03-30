import React from "react";
const artist1 = "/assets/1.png";
import "../components/css/artist.css";
import ScrollReveal from "./ScrollReveal";

interface ArtistProps {
  flag?: 0 | 1;
}

const Artist: React.FC<ArtistProps> = ({ flag = 1 }) => {
  const imageStyle = flag === 1 ? { filter: "blur(25px)" } : {};

  const BlurOverlay = () => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: "900",
          color: "#ffffff",
          lineHeight: 1,
          textShadow: "0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)",
          fontFamily: "serif",
        }}
      >
        ?
      </span>
      <span
        style={{
          fontSize: "clamp(0.65rem, 2vw, 1rem)",
          fontWeight: "700",
          color: "#ffffff",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginTop: "6px",
          textShadow: "0 0 16px rgba(0,0,0,0.9), 0 0 32px rgba(0,0,0,0.6)",
          fontFamily: "sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        Coming Soon !!!
      </span>
    </div>
  );

  return (
    <>
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
            <div className="relative flex justify-center items-center">
              {/* Mandala Background */}
              <div className="mandala-orbit">
                <img
                  src="/avatar_mandala.png"
                  alt="Mandala Background"
                  className="mandala-bg animate-slow-rotate"
                  style={imageStyle}
                />
              </div>
              <img
                src={artist1}
                alt="Cultural Art"
                className="artist-photo"
                style={imageStyle}
              />
              {/* Overlay shown only when flag === 1 */}
              {flag === 1 && <BlurOverlay />}
            </div>
          </div>

          {/* LEFT CONTENT */}
          <div className="about-content">
            <section className="py-6 px-6 md:px-0 relative">
              <div className="max-w-7xl mx-auto">
                <ScrollReveal delay={0.1}>
                  <h2 className="text-[8vw] md:text-[3vw] font-serif leading-[0.95] tracking-[-0.02em]">
                    Our Day 1 Fest's Artist{" "}
                    {/* <span className="text-primary italic">Arijit Singh</span> in{" "} */}
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
                    {/* <span className="text-primary italic">Arijit Singh</span> in{" "} */}
                    <span className="text-neon-pink italic">Utopia 2026</span>.
                  </h2>
                </ScrollReveal>
              </div>
            </section>
          </div>

          {/* RIGHT IMAGE */}
          <div className="about-image relative group flex justify-center items-center">
            <div className="relative flex justify-center items-center">
              {/* Mandala Background */}
              <div className="mandala-orbit">
                <img
                  src="/avatar_mandala.png"
                  alt="Mandala Background"
                  className="mandala-bg animate-slow-rotate"
                  style={imageStyle}
                />
              </div>
              <img
                src={artist1}
                alt="Cultural Art"
                className="artist-photo w-[80%]"
                style={imageStyle}
              />
              {/* Overlay shown only when flag === 1 */}
              {flag === 1 && <BlurOverlay />}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Artist;