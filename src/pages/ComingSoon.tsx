import React, { useEffect, useRef } from "react";

const ComingSoon: React.FC = () => {
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  const text = "Coming Soon";
  const chars = text.split("");

  return (
    <div style={styles.wrapper}>
      {/* Animated grain overlay */}
      <div style={styles.grain} />

      {/* Radial glow */}
      <div style={styles.glow} />

      {/* Decorative top line */}
      <div style={styles.topBar}>
        <span style={styles.barText}>Utopia 2K26</span>
        <div style={styles.barLine} />
        <span style={styles.barText}>◈</span>
        <div style={styles.barLine} />
        <span style={styles.barText}>Stay Tuned</span>
      </div>

      {/* Main content */}
      <main style={styles.main}>
        {/* Label */}
        <p style={styles.label}>— Something Epic Awaits —</p>

        {/* Big text */}
        <h1 style={styles.heading}>
          {chars.map((char, i) => (
            <span
              key={i}
              style={{
                ...styles.char,
                animationDelay: `${i * 0.06}s`,
                display: char === " " ? "inline" : "inline-block",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Decorative divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerDot} />
          <div style={styles.dividerLine} />
        </div>

        {/* Subtext */}
        <p style={styles.sub}>
          We're crafting something extraordinary.<br />
          The countdown has begun.
        </p>
      </main>

      {/* Bottom decoration */}
      <div style={styles.bottomBar}>
        <span style={styles.barText}>© Utopia 2026</span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=DM+Sans:wght@300;400&display=swap');

        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(40px) skewY(2deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) skewY(0deg);
          }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.08); }
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          20% { transform: translate(3%, 2%); }
          30% { transform: translate(-1%, 4%); }
          40% { transform: translate(2%, -1%); }
          50% { transform: translate(-3%, 3%); }
          60% { transform: translate(1%, -2%); }
          70% { transform: translate(-2%, 1%); }
          80% { transform: translate(3%, -3%); }
          90% { transform: translate(-1%, 2%); }
        }

        @keyframes labelFade {
          from { opacity: 0; letter-spacing: 0.8em; }
          to { opacity: 0.5; letter-spacing: 0.5em; }
        }

        @keyframes subFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 0.6; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    width: "100%",
    background: "#0a0804",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'DM Sans', sans-serif",
  },

  grain: {
    position: "absolute",
    inset: "-50%",
    width: "200%",
    height: "200%",
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
    opacity: 0.04,
    pointerEvents: "none",
    zIndex: 1,
    animation: "grain 0.8s steps(1) infinite",
  },

  glow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    height: "70vw",
    borderRadius: "50%",
    background: "radial-gradient(ellipse, rgba(180,130,60,0.18) 0%, rgba(180,100,30,0.08) 40%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 1,
    animation: "pulseGlow 5s ease-in-out infinite",
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "28px 40px 0",
    zIndex: 2,
    width: "100%",
    boxSizing: "border-box",
  },

  barText: {
    fontSize: "10px",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
    color: "rgba(200,160,80,0.6)",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300,
    whiteSpace: "nowrap",
  },

  barLine: {
    flex: 1,
    height: "1px",
    background: "rgba(200,160,80,0.15)",
  },

  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    zIndex: 2,
    padding: "0 24px",
  },

  label: {
    fontSize: "11px",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
    color: "rgba(200,160,80,0.5)",
    marginBottom: "32px",
    fontWeight: 300,
    animation: "labelFade 1.2s ease forwards",
  },

  heading: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 900,
    fontStyle: "italic",
    fontSize: "clamp(3.5rem, 13vw, 11rem)",
    lineHeight: 0.9,
    letterSpacing: "-0.03em",
    color: "#f5e6c8",
    margin: 0,
    padding: 0,
    textShadow: "0 0 80px rgba(200,140,50,0.25), 0 4px 40px rgba(0,0,0,0.6)",
  },

  char: {
    opacity: 0,
    animation: "fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "40px 0 32px",
    width: "200px",
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(200,160,80,0.2)",
  },

  dividerDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "rgba(200,160,80,0.5)",
    display: "block",
  },

  sub: {
    fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
    color: "rgba(245,230,200,0.6)",
    fontWeight: 300,
    lineHeight: 1.8,
    letterSpacing: "0.03em",
    animation: "subFade 1.4s 0.8s ease forwards",
    opacity: 0,
  },

  bottomBar: {
    padding: "0 40px 28px",
    zIndex: 2,
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
  },
};

export default ComingSoon;