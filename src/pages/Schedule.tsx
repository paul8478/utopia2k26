import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';

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

const SXS = [72, 78, 84, 90, 96];
const NY = 65;
const BY = 475;

const UtopiaFestival: React.FC = () => {
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [lastSpeed, setLastSpeed] = useState<number>(0.6);

  // Sweep Refs
  const touchedStrings = useRef<Set<number>>(new Set());
  const sweepStartTime = useRef<number>(0);
  const lastInteractionTime = useRef<number>(0);
  const lastPluckTimes = useRef<{ [key: number]: number }>({});
  
  const vibState = useRef<{ [key: number]: Vibration }>({});
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const glowsRef = useRef<(SVGLineElement | null)[]>([]);
  const rubCooldown = useRef<boolean>(false);
  const hasRevealed = useRef<boolean>(false);

  // Audio Refs for MP3s
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Audio Objects (Make sure these are in your public folder, or adjust paths)
    audio1Ref.current = new Audio('/sitar1.mp3');
    audio2Ref.current = new Audio('/sitar2.mp3');

    // Unlock audio context silently on first interaction to bypass browser autoplay policies
    const unlockAudio = () => {
      if (audio1Ref.current) {
        audio1Ref.current.play().then(() => {
          audio1Ref.current!.pause();
          audio1Ref.current!.currentTime = 0;
        }).catch(() => {});
      }
      if (audio2Ref.current) {
        audio2Ref.current.play().then(() => {
          audio2Ref.current!.pause();
          audio2Ref.current!.currentTime = 0;
        }).catch(() => {});
      }
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
    
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    // Vibration Physics Loop
    let rafId: number;
    const tick = () => {
      Object.keys(vibState.current).forEach((key) => {
        const i = parseInt(key);
        const v = vibState.current[i];
        const p = pathsRef.current[i];
        if (!p) return;

        v.phase += 0.4;
        v.amp *= 0.94;
        const x = SXS[i];

        if (v.amp < 0.1) {
          delete vibState.current[i];
          p.setAttribute('d', `M${x},${NY}L${x},${BY}`);
        } else {
          const mid = (NY + BY) / 2;
          const off = Math.sin(v.phase) * v.amp;
          p.setAttribute('d', `M${x},${NY}Q${x + off},${mid - 38} ${x + (Math.sin(v.phase*1.2)*v.amp*0.4)},${mid}Q${x - off * 0.45},${mid + 38} ${x},${BY}`);
        }
      });
      rafId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(rafId);
  }, []);



  const pluck = (i: number) => {
    const now = performance.now();
    const lastTime = lastPluckTimes.current[i] || 0;
    
    // Check if 80ms has passed since THIS string was last played (Debounce)
    if (now - lastTime > 80 && revealedCount < EVENTS.length) {
      
      // MP3 Logic: Play sitar1 on the first string (0), and sitar2 on the last string (4)
      if (i === 0 && audio1Ref.current) {
        audio1Ref.current.currentTime = 0; // Reset to start
        audio1Ref.current.play().catch(e => console.warn("Audio play blocked", e));
      } else if (i === 4 && audio2Ref.current) {
        audio2Ref.current.currentTime = 0; // Reset to start
        audio2Ref.current.play().catch(e => console.warn("Audio play blocked", e));
      }
      
      lastPluckTimes.current[i] = now;
    }

    // Always trigger visual vibration on movement
    vibState.current[i] = { amp: 16, phase: Math.random() * 6 };

    if (hasRevealed.current || revealedCount >= EVENTS.length) return;

    // Reset logic: If the user stops rubbing for more than 500ms, reset the sweep progress
    if (now - lastInteractionTime.current > 500) {
      touchedStrings.current.clear();
      sweepStartTime.current = now;
    }
    
    lastInteractionTime.current = now;
    touchedStrings.current.add(i);

    // Any direction works (0->4 or 4->0 or random order) as long as all 5 are hit
    if (touchedStrings.current.size === 5) {
      const duration = now - sweepStartTime.current;
      // Faster rub = faster flight. Map 100ms-800ms to 0.2s-1.0s transition
      const speed = Math.max(0.6, Math.min(1.4, duration / 400));
      setLastSpeed(speed);
      
      triggerRevealAll();
      touchedStrings.current.clear();
    }
  };

  const triggerRevealAll = () => {
    hasRevealed.current = true;

    // Reveal all cards with staggered delays
    EVENTS.forEach((_, idx) => {
      setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, idx * 400);
    });

    // After all cards have appeared, trigger exit/expand
    const totalRevealTime = (EVENTS.length - 1) * 400;
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsExpanded(true), 1200);
    }, totalRevealTime + 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:wght@300;600&display=swap');
        
        .utopia-body { 
          margin: 0; height: 100vh; width: 100vw; overflow: hidden; 
          background: #f5efe6; color: #3b2a1f; font-family: 'Cormorant Garamond', serif;
        }
        
        #app-root { display: flex; height: 100vh; }

        #sitar-panel {
          width: 240px; background: #eaddcf; border-right: 1px solid rgba(59,42,31,0.1);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: transform 1.2s cubic-bezier(0.7, 0, 0.3, 1), opacity 1s, margin-left 1.2s cubic-bezier(0.7, 0, 0.3, 1);
          z-index: 100;
        }
        #sitar-panel.exit { transform: translateX(-100%); opacity: 0; margin-left: -240px; }

        #timeline-panel { flex: 1; overflow-y: auto; padding: 10vh 5vw; perspective: 1200px; scroll-behavior: smooth; position: relative; }

        /* The Timeline Line */
        #timeline-panel::before {
          content: '';
          position: absolute;
          top: 10vh;
          bottom: 10vh;
          left: calc(5vw + 24px); /* aligns with the card border */
          width: 2px;
          background: rgba(182, 74, 43, 0.2);
          z-index: 0;
          opacity: 0;
          transition: opacity 1s 0.5s;
        }
        #timeline-panel.show-timeline::before {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .utopia-body { overflow-y: auto; height: auto; min-height: 100vh; }
          #app-root { display: block; overflow-y: auto; height: auto; min-height: 100vh; }
          #sitar-panel { display: none; }
          #timeline-panel { padding: 40px 20px 40px 40px; perspective: none; position: relative; }
          
          #timeline-panel::before {
            top: 40px;
            bottom: 40px;
            left: 20px;
            opacity: 1;
            background: rgba(182, 74, 43, 0.4);
          }
          /* Force timeline items visible */
          .ev-row { 
            opacity: 1 !important; 
            filter: blur(0) !important; 
            transform: none !important;
            margin-bottom: 24px;
            display: flex;
          }
          .ev-card { 
            width: 100%; 
            max-width: 100%;
            background: #ffffff;
            padding: 24px;
            border-radius: 8px;
            border-left-width: 4px;
          }
          .card-desc {
            max-height: none !important;
            opacity: 1 !important;
            margin-top: 16px !important;
            padding-top: 16px !important;
            border-top: 1px solid rgba(59,42,31,0.1) !important;
            overflow: visible !important;
          }
          .footer-wrapper {
            opacity: 1;
            pointer-events: auto;
            margin: 60px -20px -40px -20px;
          }
        }

        /* THE FLYING CARD */
        .ev-row { 
          display: flex; margin-bottom: 30px; opacity: 0;
          /* Origin point: Base of strings (approx 240px offset, lower down) rotated and tiny */
          transform: translate3d(-340px, 400px, -200px) rotateZ(180deg) rotateX(45deg) scale(0.01);
          filter: blur(10px);
          transition: 
            transform var(--speed) cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity var(--speed) ease-in,
            filter var(--speed) ease-out;
        }

        .ev-row.visible { 
          opacity: 1; filter: blur(0px);
          /* Spins back to resting rotation and full size at timeline position */
          transform: translate3d(0, 0, 0) rotateZ(0deg) rotateX(0deg) scale(1); 
        }

        .ev-card { 
          position: relative;
          background: #ffffff; border-radius: 4px; border-left: 3px solid var(--c);
          padding: 16px; width: 300px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          transition: all 0.8s ease;
          z-index: 10;
          margin-left: 24px; /* Space from the timeline line */
        }

        /* Dot on the timeline line */
        .ev-card::before {
          content: '';
          position: absolute;
          left: -28.5px; /* Pulls it back onto the timeline line */
          top: 24px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--c);
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          z-index: 1;
        }

        .expanded-row .ev-card { width: 100%; max-width: 650px; background: #ffffff; padding: 30px; border-radius: 12px; }
        
        .card-desc { max-height: 0; opacity: 0; transition: 1s; overflow: hidden; }
        .expanded-row .card-desc { max-height: 300px; opacity: 1; margin-top: 20px; border-top: 1px solid rgba(59,42,31,0.1); padding-top: 20px; }

        .sitar-label { font-family: Cinzel; font-size: 9px; letter-spacing: 0.5em; color: #b64a2b; margin-bottom: 20px; }
        
        .footer-wrapper {
          opacity: 0;
          pointer-events: none;
          transition: opacity 1s 0.5s;
          margin: 10vh -5vw -10vh -5vw;
        }
        .footer-wrapper.show {
          opacity: 1;
          pointer-events: auto;
        }

        /* String UI Feedback */
        .progress-indicator { display: flex; gap: 6px; margin-top: 15px; }
        .dot { width: 5px; height: 5px; border-radius: 50%; background: #d0c0a8; transition: 0.2s; }
        .dot.on { background: #b64a2b; box-shadow: 0 0 8px #b64a2b; transform: scale(1.3); }


      `}</style>

      <div className="utopia-body">
        <div id="app-root">
          
          {/* Instruction Text */}
          <div className={`fixed right-8 md:right-16 top-1/3 flex flex-col items-end pointer-events-none transition-opacity duration-1000 z-50 ${revealedCount > 0 ? 'opacity-0' : 'opacity-100'}`}>
            <div className="hidden md:block text-[#b64a2b] font-serif text-3xl md:text-5xl font-bold mb-3 drop-shadow-sm">
              Play the Instrument
            </div>
            <div className="hidden md:block text-[#3b2a1f] font-sans tracking-[0.2em] uppercase text-xs md:text-sm font-semibold max-w-[200px] text-right opacity-80">
              Strum the strings to bring the festival schedule to life
            </div>
            <div className="hidden md:flex mt-6 flex-col gap-2 opacity-50 relative right-12">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3b2a1f] animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#b64a2b] animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#3b2a1f] animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>

          <div id="sitar-panel" className={isExiting ? 'exit' : ''}>
            <div className="sitar-label">UTOPIA INSTRUMENT</div>
            <svg width="180" height="580" viewBox="0 0 180 580" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))' }}>
              <defs>
                <linearGradient id="wood-neck" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#cfb297"/>
                  <stop offset="50%" stopColor="#eaddcf"/>
                  <stop offset="100%" stopColor="#bfa186"/>
                </linearGradient>
                <radialGradient id="wood-gourd" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
                  <stop offset="0%" stopColor="#eaddcf"/>
                  <stop offset="60%" stopColor="#cfb297"/>
                  <stop offset="100%" stopColor="#8c6a51"/>
                </radialGradient>
              </defs>

              {/* Upper Gourd */}
              <circle cx="84" cy="90" r="30" fill="url(#wood-gourd)" stroke="#3b2a1f" strokeWidth="1" strokeOpacity="0.3"/>
              
              {/* Neck */}
              <path d="M68,50 L100,50 L96,440 L72,440 Z" fill="url(#wood-neck)" stroke="#3b2a1f" strokeWidth="1" strokeOpacity="0.4" />
              
              {/* Frets */}
              {Array.from({length: 18}).map((_, i) => (
                <path key={`fret-${i}`} d={`M${69 + (i*0.1)},${110 + i*17} Q84,${114 + i*17} ${99 - (i*0.1)},${110 + i*17}`} fill="none" stroke="#b64a2b" strokeWidth="1.5" opacity="0.6" />
              ))}

              {/* Tuning Pegs */}
              {Array.from({length: 3}).map((_, i) => (
                <g key={`peg-l-${i}`}>
                  <rect x="55" y={130 + i*40} width="14" height="6" rx="3" fill="#8c6a51" />
                  <circle cx="53" cy={133 + i*40} r="4" fill="#3b2a1f" />
                </g>
              ))}
              {Array.from({length: 4}).map((_, i) => (
                <g key={`peg-r-${i}`}>
                  <rect x="98" y={110 + i*40} width="14" height="6" rx="3" fill="#8c6a51" />
                  <circle cx="114" cy={113 + i*40} r="4" fill="#3b2a1f" />
                </g>
              ))}

              {/* Main Gourd */}
              <path d="M24,475 C24,405 54,405 84,405 C114,405 144,405 144,475 C144,545 124,560 84,560 C44,560 24,545 24,475 Z" fill="url(#wood-gourd)" stroke="#3b2a1f" strokeWidth="1" strokeOpacity="0.3" />
              
              {/* Decorative Leaves/Vines on Gourd */}
              <path d="M38,455 Q54,425 84,425 Q114,425 130,455" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
              <path d="M34,475 Q64,435 84,435 Q104,435 134,475" fill="none" stroke="#fff" strokeWidth="1" opacity="0.2" />

              {/* Bridge */}
              <path d="M68,460 L100,460 L106,490 L62,490 Z" fill="#d0c0a8" stroke="#3b2a1f" strokeWidth="1" strokeOpacity="0.4" />
              <path d="M64,490 Q84,495 104,490 L100,505 L68,505 Z" fill="#b64a2b" opacity="0.8" />
              
              {/* The Strings */}
              {SXS.map((x, i) => (
                <React.Fragment key={i}>
                  <path ref={el => pathsRef.current[i] = el} d={`M${x},${NY}L${x},${BY}`} fill="none" stroke="#b64a2b" strokeWidth={i === 2 ? "1.4" : "0.7"} opacity="0.9" filter="drop-shadow(1px 1px 1px rgba(0,0,0,0.1))" />
                  <rect x={x - 12} y={NY} width="24" height={BY - NY} fill="transparent" style={{ cursor: 'crosshair' }}
                    onMouseEnter={() => pluck(i)} onMouseMove={() => pluck(i)} onTouchStart={() => pluck(i)} />
                </React.Fragment>
              ))}
            </svg>
            <div className="progress-indicator">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className={`dot ${touchedStrings.current.has(i) ? 'on' : ''}`} />
              ))}
            </div>
          </div>

          <div id="timeline-panel" className={revealedCount > 0 ? 'show-timeline' : ''}>
            <div className="md:hidden text-[#b64a2b] font-serif text-4xl font-bold mb-8 text-center drop-shadow-sm">
              Event Schedule
            </div>
            {EVENTS.map((ev, i) => (
              <div 
                key={i} 
                className={`ev-row ${revealedCount > i ? 'visible' : ''} ${isExpanded ? 'expanded-row' : ''}`} 
                style={{ '--c': ev.col, '--speed': `${lastSpeed}s` } as any}
              >
                <div className="ev-card">
                  <div style={{ fontFamily: 'Cinzel', fontSize: '10px', color: ev.col, letterSpacing: '0.2em' }}>{ev.time}</div>
                  <div style={{ fontSize: '22px', margin: '5px 0' }}>{ev.title}</div>
                  <div style={{ fontSize: '14px', fontStyle: 'italic', opacity: 0.5 }}>{ev.sub}</div>
                  <div className="card-desc">{ev.desc}</div>
                </div>
              </div>
            ))}
            
            <div className={`footer-wrapper ${isExpanded ? 'show' : ''}`}>
              <Footer />
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default UtopiaFestival;