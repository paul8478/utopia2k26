import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LINKS = [
  { label: "HOME", to: "/" },
  { label: "MANIFESTO", to: "/about" },
  { label: "GALLERY", to: "/gallery" },
  { label: "SCHEDULE", to: "/schedule" },
  { label: "ARCHITECTS", to: "/architects" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lineTopRef = useRef<HTMLSpanElement>(null);
  const lineBottomRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const overlayTl = useRef<gsap.core.Timeline | null>(null);
  const iconTl = useRef<gsap.core.Timeline | null>(null);
  
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const lineTop = lineTopRef.current;
      const lineBottom = lineBottomRef.current;

      if (!overlay || !lineTop || !lineBottom) return;

      overlayTl.current = gsap
        .timeline({ paused: true })
        .set(overlay, {
          pointerEvents: "auto",
        })
        .fromTo(
          overlay,
          {
            clipPath: "circle(0% at 100% 0%)",
          },
          {
            clipPath: "circle(150% at 100% 0%)",
            duration: 1.2,
            ease: "expo.inOut",
          }
        )
        .from(
          linkRefs.current,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.0,
            ease: "power4.out",
            stagger: 0.06,
          },
          "-=0.5"
        )
        .reverse();

      iconTl.current = gsap
        .timeline({ paused: true })
        .to(
          lineTop,
          {
            y: 0,
            rotate: 45,
            duration: 0.3,
            ease: "power3.inOut",
          },
          0
        )
        .to(
          lineBottom,
          {
            y: 0,
            rotate: -45,
            duration: 0.3,
            ease: "power3.inOut",
          },
          0
        )
        .reverse();

      if (buttonRef.current) {
        quickX.current = gsap.quickTo(buttonRef.current, "x", {
          duration: 0.4,
          ease: "power3.out",
        });
        quickY.current = gsap.quickTo(buttonRef.current, "y", {
          duration: 0.4,
          ease: "power3.out",
        });
      }
    },
    { scope: containerRef }
  );

  const toggleMenu = () => {
    if (!overlayTl.current || !iconTl.current) return;

    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        overlayTl.current?.play();
        iconTl.current?.play();
      } else {
        overlayTl.current?.reverse();
        iconTl.current?.reverse();
      }
      return next;
    });
  };

  const handleLinkClick = () => {
    if (!overlayTl.current || !iconTl.current) return;
    setIsOpen(false);
    overlayTl.current.reverse();
    iconTl.current.reverse();
  };

  const handleMagneticMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !quickX.current || !quickY.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    quickX.current(relX * 0.2);
    quickY.current(relY * 0.2);
  };

  const handleMagneticLeave = () => {
    if (!quickX.current || !quickY.current) return;
    quickX.current(0);
    quickY.current(0);
  };

  return (
    <div ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        className="fixed right-5 top-5 z-[10000] flex h-14 w-14 items-center justify-center rounded-full border border-foreground/30 bg-background/60 backdrop-blur-md transition-colors duration-300 hover:border-foreground hover:bg-background/80"
        onClick={toggleMenu}
        onMouseMove={handleMagneticMove}
        onMouseLeave={handleMagneticLeave}
        aria-label="Toggle navigation"
      >
        <div className="relative h-5 w-6">
          <span
            ref={lineTopRef}
            className="absolute left-0 top-1/2 block h-[2px] w-full -translate-y-[6px] rounded-full bg-foreground"
          />
          <span
            ref={lineBottomRef}
            className="absolute left-0 top-1/2 block h-[2px] w-full translate-y-[6px] rounded-full bg-foreground"
          />
        </div>
      </button>

      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[9998] flex items-center justify-center bg-background"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        <div className="flex w-full max-w-6xl flex-col gap-6 px-6 md:gap-10 md:px-10">
          {LINKS.map((link, idx) => (
            <div key={link.to} className="overflow-hidden">
              <Link to={link.to} onClick={handleLinkClick} className="group block">
                <span
                  ref={(el) => {
                    linkRefs.current[idx] = el;
                  }}
                  className="font-syne text-[12vw] leading-[0.9] tracking-[-0.04em] text-foreground md:text-[8vw] transition-transform duration-500 group-hover:italic inline-block"
                >
                  <span className="bg-clip-text text-transparent bg-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-neon-green">
                    {link.label}
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
