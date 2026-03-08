import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_EVENTS = [
  {
    time: "16:00",
    title: "GATES OPEN · GROUNDING RAGA",
    day: "DAY 01",
    artist: "Ananya Devi Ensemble",
    image:
      "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    time: "17:30",
    title: "TEMPLE RHYTHMS · MRIDANGAM CYCLE",
    day: "DAY 01",
    artist: "Rohit Iyer Collective",
    image:
      "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    time: "19:00",
    title: "CLASSICAL FUSION · RAGA x SYNTH",
    day: "DAY 01",
    artist: "Synaptic Raga",
    image:
      "https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    time: "21:00",
    title: "NEON ASCENT · OPENING SET",
    day: "DAY 02",
    artist: "VOID.EXE",
    image:
      "https://images.pexels.com/photos/1647161/pexels-photo-1647161.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    time: "23:00",
    title: "ACID GREEN CIRCUIT · LIVE AV",
    day: "DAY 02",
    artist: "Neural Drift",
    image:
      "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    time: "01:00",
    title: "ULTRA-LATE RITUAL · FINAL DESCENT",
    day: "DAY 02",
    artist: "Bass Temple",
    image:
      "https://images.pexels.com/photos/1938866/pexels-photo-1938866.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function ScheduleSection() {
  const containerRef = useRef(null);
  const leftLabelRef = useRef(null);
  const rightColumnRef = useRef(null);
  const progressDotRef = useRef(null);
  const daySwitchRef = useRef(null);
  const floatingImageRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeImage, setActiveImage] = useState(null);

  const quickX = useRef(null);
  const quickY = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const rightCol = rightColumnRef.current;
      const dot = progressDotRef.current;
      const daySwitchEl = daySwitchRef.current;
      const leftLabel = leftLabelRef.current;
      const floatingImage = floatingImageRef.current;

      if (rightCol && dot) {
        gsap.to(dot, {
          yPercent: 100,
          ease: "none",
          scrollTrigger: {
            trigger: rightCol,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });
      }

      if (daySwitchEl && container && leftLabel) {
        ScrollTrigger.create({
          trigger: daySwitchEl,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(container, {
              backgroundColor: "#FFFFFF",
              duration: 1.4,
              ease: "power3.inOut",
            });
            gsap.to(".schedule-text", {
              color: "#ADFF2F",
              duration: 1.0,
              ease: "power3.inOut",
            });
            gsap.to(".schedule-time", {
              color: "#FF6FFB",
              duration: 1.0,
              ease: "power3.inOut",
            });
            gsap.to(leftLabel, {
              y: -30,
              opacity: 0,
              duration: 0.4,
              ease: "power3.in",
              onComplete: () => {
                leftLabel.textContent = "DAY 02";
                gsap.set(leftLabel, { y: 30 });
                gsap.to(leftLabel, {
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: "power3.out",
                });
              },
            });
          },
          onLeaveBack: () => {
            gsap.to(container, {
              backgroundColor: "#F6EAC2",
              duration: 1.4,
              ease: "power3.inOut",
            });
            gsap.to(".schedule-text", {
              color: "#FFD27F",
              duration: 1.0,
              ease: "power3.inOut",
            });
            gsap.to(".schedule-time", {
              color: "#FFB347",
              duration: 1.0,
              ease: "power3.inOut",
            });
            gsap.to(leftLabel, {
              y: -30,
              opacity: 0,
              duration: 0.4,
              ease: "power3.in",
              onComplete: () => {
                leftLabel.textContent = "DAY 01";
                gsap.set(leftLabel, { y: 30 });
                gsap.to(leftLabel, {
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: "power3.out",
                });
              },
            });
          },
        });
      }

      if (floatingImage) {
        quickX.current = gsap.quickTo(floatingImage, "x", {
          duration: 0.2,
          ease: "power3.out",
        });
        quickY.current = gsap.quickTo(floatingImage, "y", {
          duration: 0.2,
          ease: "power3.out",
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleItemEnter = (index) => {
    const item = itemRefs.current[index];
    if (!item) return;

    gsap.to(item, {
      skewX: -6,
      duration: 0.35,
      ease: "power3.out",
    });

    const event = SCHEDULE_EVENTS[index];
    if (event && floatingImageRef.current) {
      setActiveImage(event.image);
      gsap.set(floatingImageRef.current, { opacity: 0, scale: 0.9 });
      gsap.to(floatingImageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  };

  const handleItemLeave = (index) => {
    const item = itemRefs.current[index];
    if (!item) return;

    gsap.to(item, {
      skewX: 0,
      duration: 0.4,
      ease: "power3.out",
    });

    if (floatingImageRef.current) {
      gsap.to(floatingImageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power3.inOut",
      });
    }
  };

  const handleItemMove = (e) => {
    if (!containerRef.current || !quickX.current || !quickY.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    quickX.current(x + 30);
    quickY.current(y - 30);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#F6EAC2] text-[#E65100] overflow-hidden"
    >
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        {/* Left sticky typography */}
        <div className="lg:w-2/5 w-full border-r border-[#111111]/10">
          <div className="sticky top-0 flex h-screen flex-col items-start justify-center px-6 py-16 lg:px-10">
            <span className="mb-4 text-xs tracking-[0.35em] uppercase text-[#FFB347]/80">
              UTOPIA 2K26 · SCHEDULE
            </span>
            <h2
              ref={leftLabelRef}
              className="font-syne text-[18vw] lg:text-[9vw] leading-[0.8] tracking-[-0.04em] text-[#E65100]"
            >
              DAY 01
            </h2>
            <p className="mt-6 max-w-sm text-sm text-[#FFCFA0]/70">
              A continuous arc from sacred dusk to neon midnight. Scroll to
              track the pulse of the festival.
            </p>
          </div>
        </div>

        {/* Right scrollable timeline */}
        <div
          ref={rightColumnRef}
          className="relative lg:w-3/5 w-full px-6 py-20 lg:px-12 lg:py-24"
        >
          {/* Central vertical line + progress dot (desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#111111]/10 lg:block">
            <div
              ref={progressDotRef}
              className="absolute left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFB347] shadow-[0_0_25px_rgba(255,179,71,0.9)]"
            />
          </div>

          <div className="space-y-16 lg:space-y-20">
            {SCHEDULE_EVENTS.map((event, index) => {
              const isDay2 = event.day === "DAY 02";
              const day2FirstIndex = SCHEDULE_EVENTS.findIndex(
                (e) => e.day === "DAY 02"
              );
              const isDaySwitchIndex = index === day2FirstIndex;

              return (
                <div
                  key={`${event.time}-${event.title}`}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => handleItemEnter(index)}
                  onMouseLeave={() => handleItemLeave(index)}
                  onMouseMove={handleItemMove}
                  onClick={() => handleItemEnter(index)}
                >
                  {isDaySwitchIndex && (
                    <div
                      ref={daySwitchRef}
                      className="pointer-events-none absolute -top-24 h-24 w-full"
                    />
                  )}

                  <div className="flex flex-col gap-3 lg:flex-row lg:items-baseline">
                    <div className="schedule-time text-xs font-mono tracking-[0.35em] uppercase text-[#FFB347]/90">
                      {event.time} · {event.day}
                    </div>
                    <div className="flex-1">
                      <h3 className="schedule-text font-syne uppercase leading-[0.85] tracking-[-0.04em] text-[#FFD27F] transition-colors duration-700 text-[8vw] lg:text-[4vw]">
                        {event.title}
                      </h3>
                      <p className="mt-3 text-sm font-sans uppercase tracking-[0.25em] text-[#111111]/40">
                        {event.artist}
                      </p>
                    </div>
                  </div>

                  {/* Inline node on mobile */}
                  <div className="mt-6 flex items-center gap-4 lg:hidden">
                    <div className="h-px flex-1 bg-[#111111]/10" />
                    <div
                      className={`h-3 w-3 rounded-full ${
                        isDay2
                          ? "bg-[#ADFF2F] shadow-[0_0_18px_rgba(173,255,47,0.9)]"
                          : "bg-[#FFB347] shadow-[0_0_18px_rgba(255,179,71,0.9)]"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating artist image (desktop) */}
          <div
            ref={floatingImageRef}
            className="pointer-events-none absolute z-30 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-black/20 bg-[#F4F4F0]/80 shadow-[0_18px_60px_rgba(0,0,0,0.8)] lg:block"
          >
            {activeImage && (
              <img
                src={activeImage}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

