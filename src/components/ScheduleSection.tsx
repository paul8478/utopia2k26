import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SCHEDULE_EVENTS } from "@/data/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ScheduleSection() {
  const containerRef = useRef<HTMLElement>(null);
  const leftLabelRef = useRef<HTMLHeadingElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const daySwitchRef = useRef<HTMLDivElement>(null);
  const floatingImageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
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
              backgroundColor: "hsl(var(--background))",
              duration: 1.4,
              ease: "power3.inOut",
            });
            gsap.to(".schedule-text", {
              color: "hsl(var(--neon-green))",
              duration: 1.0,
              ease: "power3.inOut",
            });
            gsap.to(".schedule-time", {
              color: "hsl(var(--neon-pink))",
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
              backgroundColor: "hsl(var(--primary) / 0.1)", // Roots bg tint
              duration: 1.4,
              ease: "power3.inOut",
            });
            gsap.to(".schedule-text", {
              color: "hsl(var(--primary))",
              duration: 1.0,
              ease: "power3.inOut",
            });
            gsap.to(".schedule-time", {
              color: "hsl(var(--gold))",
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
    },
    { scope: containerRef }
  );

  const handleItemEnter = (index: number) => {
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

  const handleItemLeave = (index: number) => {
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

  const handleItemMove = (e: React.MouseEvent) => {
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
      className="relative min-h-screen w-full bg-primary/10 overflow-hidden transition-colors"
    >
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        {/* Left sticky typography */}
        <div className="lg:w-2/5 w-full border-r border-foreground/10">
          <div className="sticky top-0 flex h-screen flex-col items-start justify-center px-6 py-16 lg:px-10">
            <span className="mb-4 text-xs tracking-[0.35em] uppercase text-gold/80">
              UTOPIA 2K26 · SCHEDULE
            </span>
            <h2
              ref={leftLabelRef}
              className="font-syne text-[18vw] lg:text-[9vw] leading-[0.8] tracking-[-0.04em] text-primary"
            >
              DAY 01
            </h2>
            <p className="mt-6 max-w-sm text-sm text-gold/70">
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
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-foreground/10 lg:block">
            <div
              ref={progressDotRef}
              className="absolute left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_25px_rgba(var(--gold)_0.9)]"
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
                    <div className="schedule-time text-xs font-mono tracking-[0.35em] uppercase text-gold/90 transition-colors duration-700">
                      {event.time} · {event.day}
                    </div>
                    <div className="flex-1">
                      <h3 className="schedule-text font-syne uppercase leading-[0.85] tracking-[-0.04em] text-primary transition-colors duration-700 text-[8vw] lg:text-[4vw]">
                        {event.title}
                      </h3>
                      <p className="mt-3 text-sm font-sans uppercase tracking-[0.25em] text-foreground/40">
                        {event.artist}
                      </p>
                    </div>
                  </div>

                  {/* Inline node on mobile */}
                  <div className="mt-6 flex items-center gap-4 lg:hidden">
                    <div className="h-px flex-1 bg-foreground/10" />
                    <div
                      className={`h-3 w-3 rounded-full transition-colors ${
                        isDay2
                          ? "bg-neon-green shadow-sm shadow-neon-green/90"
                          : "bg-gold shadow-sm shadow-gold/90"
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
            className="pointer-events-none absolute z-30 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-black/20 bg-background/80 shadow-[0_18px_60px_rgba(0,0,0,0.8)] lg:block"
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
