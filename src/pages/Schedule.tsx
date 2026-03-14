import React, { useEffect, useRef, useState } from 'react';

// --- Types ---
interface FestivalEvent {
  time: string;
  title: string;
  sub: string;
  desc: string;
  col: string;
}

interface Vibration {
  amp: number;
  phase: number;
}

const EVENTS: FestivalEvent[] = [
  { time: "09:00 AM", title: "Opening Ceremony", sub: "Various Artists", desc: "The day begins with a sacred invocation and welcome from the festival founders.", col: "#E8872A" },
  { time: "10:30 AM", title: "Cultural Performance", sub: "Local Talents", desc: "Rising artists from the region present folk, dance, and vibrant storytelling.", col: "#9B6ED4" },
  { time: "01:00 PM", title: "Lunch Break", sub: "Food Court Open", desc: "Explore cuisine from over twelve regional kitchens across the open courtyard.", col: "#3BAA7C" },
  { time: "02:30 PM", title: "Cultural Programme", sub: "Guest Performers", desc: "International guest ensembles bring colour and rhythm to the main stage.", col: "#D44848" },
  { time: "05:00 PM", title: "Main Event", sub: "Headliner", desc: "The grand finale — the most anticipated performance of the entire festival.", col: "#D4AC1E" },
];

const SXS = [65, 72, 81, 90, 97];
const NY = 83;
const BY = 393;

const UtopiaFestival: React.FC = () => {
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [lastSpeed, setLastSpeed] = useState<number>(0.8); // Default speed in seconds

  // Sweep Tracking Refs
  const touchedStrings = useRef<Set<number>>(new Set());
  const sweepStartTime = useRef<number>(0);
  
  const vibState = useRef<{ [key: number]: Vibration }>({});
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const glowsRef = useRef<(SVGLineElement | null)[]>([]);
  const rubCooldown = useRef<boolean>(false);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      Object.keys(vibState.current).forEach((key) => {
        const i = parseInt(key);
        const v = vibState.current[i];
        const p = pathsRef.current[i];
        const g = glowsRef.current[i];
        if (!p) return;

        v.phase += 0.36;
        v.amp *= 0.958;
        const x = SXS[i];

        if (v.amp < 0.2) {
          delete vibState.current[i];
          p.setAttribute('d', `M${x},${NY}L${x},${BY}`);
          if (g) g.setAttribute('opacity', '0');
        } else {
          const mid = (NY + BY) / 2;
          const off = Math.sin(v.phase) * v.amp;
          const off2 = Math.sin(v.phase * 1.65) * v.amp * 0.38;
          p.setAttribute('d', `M${x},${NY}Q${x + off},${mid - 38} ${x + off2},${mid}Q${x - off * 0.45},${mid + 38} ${x},${BY}`);
          if (g) g.setAttribute('opacity', Math.min(v.amp / 12 * 0.32, 0.32).toFixed(3));
        }
      });
      rafId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(rafId);
  }, []);

  const pluck = (i: number) => {
    // 1. Vibration Physics
    vibState.current[i] = { amp: 15, phase: Math.random() * Math.PI * 2 };

    if (rubCooldown.current || revealedCount >= EVENTS.length) return;

    // 2. Sweep Logic: Track which strings are touched
    if (touchedStrings.current.size === 0) {
      sweepStartTime.current = performance.now();
    }
    touchedStrings.current.add(i);

    // 3. Reveal Trigger: Only when all 5 strings are touched
    if (touchedStrings.current.size === 5) {
      const sweepDuration = performance.now() - sweepStartTime.current;
      
      // Calculate travel speed: fast sweep (100ms) = 0.3s travel, slow sweep (1000ms) = 1.2s travel
      const speed = Math.max(0.3, Math.min(1.2, sweepDuration / 600));
      setLastSpeed(speed);
      
      triggerReveal();
      touchedStrings.current.clear(); // Reset for next card
    }
  };

  const triggerReveal = () => {
    rubCooldown.current = true;
    const nextIndex = revealedCount + 1;
    setRevealedCount(nextIndex);

    // Short cooldown to prevent accidental double-firing
    setTimeout(() => { rubCooldown.current = false; }, 600);

    if (nextIndex === EVENTS.length) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => setIsExpanded(true), 1000);
      }, 1500);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;900&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&display=swap');
        
        .utopia-body { 
          margin: 0; padding: 0; height: 100vh; width: 100vw; 
          overflow: hidden; background: #060403; color: #DEC880;
          font-family: 'Cormorant Garamond', serif;
        }
        
        #app-root { display: flex; height: 100vh; width: 100vw; overflow: hidden; }

        #sitar-panel {
          width: 230px; min-width: 230px;
          background: linear-gradient(180deg,#0D0A07,#090604 50%,#0D0A07);
          border-right: 1px solid rgba(200,155,50,0.08);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          position: relative; z-index: 20;
          transition: all 1.5s cubic-bezier(0.76,0,0.24,1);
        }
        #sitar-panel.exit { transform: translateX(-100%); opacity: 0; }

        #timeline-panel { flex: 1; position: relative; overflow-y: auto; padding: 60px 0; perspective: 1000px; }

        /* THE SHOOTING ANIMATION */
        .ev-row { 
          display: flex; align-items: flex-start; margin-bottom: 25px; 
          opacity: 0; 
          /* Start position: Centered on the Sitar's Gourd */
          transform: translate3d(-350px, 200px, -500px) rotateY(40deg) scale(0.2);
          transition: 
            transform var(--speed) cubic-bezier(0.16, 1, 0.3, 1), 
            opacity var(--speed) ease-out;
        }

        .ev-row.visible { 
          opacity: 1; 
          transform: translate3d(0, 0, 0) rotateY(0deg) scale(1); 
        }

        .ev-card { 
          flex: 1; background: #0C0806; border-radius: 4px; 
          border-top: 2px solid var(--c); padding: 12px;
          max-width: 280px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          transition: all 0.8s ease;
        }

        .expanded-row .ev-card { max-width: 600px; background: #0F0B07; padding: 25px; }
        .card-desc { max-height: 0; overflow: hidden; transition: all 1s ease; opacity: 0; }
        .expanded-row .card-desc { max-height: 200px; opacity: 1; margin-top: 15px; }

        #hint { font-family: Cinzel; font-size: 8px; letter-spacing: 0.2em; color: rgba(200,155,50,0.4); text-align: center; margin-top: 20px; }
        .string-progress { display: flex; gap: 4px; margin-top: 10px; }
        .prog-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(200,155,50,0.1); transition: all 0.3s; }
        .prog-dot.active { background: #FFE264; box-shadow: 0 0 5px #FFE264; }
      `}</style>

      <div className="utopia-body">
        <div id="app-root">
          <div id="sitar-panel" className={isExiting ? 'exit' : ''}>
            <div style={{ fontFamily: 'Cinzel', fontSize: '10px', letterSpacing: '0.4em', opacity: 0.5 }}>UTOPIA</div>
            <svg width="160" height="500" viewBox="0 0 162 545">
              <rect x="58" y="72" width="46" height="327" rx="3" fill="#1A0F0A" stroke="#3A1C0E"/>
              {SXS.map((x, i) => (
                <React.Fragment key={i}>
                  <line ref={el => glowsRef.current[i] = el} x1={x} y1={NY} x2={x} y2={BY} stroke="#FFE264" strokeWidth="5" opacity="0" />
                  <path ref={el => pathsRef.current[i] = el} d={`M${x},${NY}L${x},${BY}`} fill="none" stroke="#EDAC14" strokeWidth={i === 2 ? "1.5" : "0.7"} />
                  <line x1={x} y1={NY} x2={x} y2={BY} stroke="transparent" strokeWidth="25" style={{ cursor: 'pointer' }} 
                    onMouseEnter={() => pluck(i)} onMouseMove={() => pluck(i)} />
                </React.Fragment>
              ))}
              <ellipse cx="81" cy="465" rx="60" ry="65" fill="#2A140A" stroke="#3A1C0E"/>
              <circle cx="81" cy="465" r="15" fill="#060404" />
            </svg>
            <div id="hint">
              {revealedCount < 5 ? "SWEEP ALL STRINGS TO LAUNCH" : "FINALE UNLOCKED"}
              <div className="string-progress">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className={`prog-dot ${touchedStrings.current.has(i) ? 'active' : ''}`} />
                ))}
              </div>
            </div>
          </div>

          <div id="timeline-panel">
            <div id="vtrack" style={{ paddingLeft: '80px' }}>
              {EVENTS.map((ev, i) => (
                <div 
                  key={i} 
                  className={`ev-row ${revealedCount > i ? 'visible' : ''} ${isExpanded ? 'expanded-row' : ''}`} 
                  style={{ 
                    '--c': ev.col, 
                    '--speed': `${lastSpeed}s` 
                  } as any}
                >
                  <div className="ev-card">
                    <div style={{ fontFamily: 'Cinzel', fontSize: '9px', color: ev.col }}>{ev.time}</div>
                    <div style={{ fontSize: '18px', fontWeight: 600 }}>{ev.title}</div>
                    <div style={{ fontSize: '13px', opacity: 0.6 }}>{ev.sub}</div>
                    <div className="card-desc">{ev.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UtopiaFestival;