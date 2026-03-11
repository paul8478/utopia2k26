import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const counterRef = useRef<HTMLHeadingElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          if (onComplete) onComplete();
          if (wrapperRef.current) {
            gsap.set(wrapperRef.current, { pointerEvents: "none", display: "none" });
          }
        },
      });

      const counterProxy = { val: 0 };

      tl.to(counterProxy, {
        val: 100,
        duration: 2.5,
        ease: "power3.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            const currentVal = Math.round(counterProxy.val);
            counterRef.current.innerText =
              currentVal < 10
                ? `00${currentVal}`
                : currentVal < 100
                ? `0${currentVal}`
                : `${currentVal}`;
          }
        },
      })
        .to(
          counterRef.current,
          {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
          },
          "+=0.2"
        )
        .to(
          [leftPanelRef.current, rightPanelRef.current],
          {
            xPercent: (i) => (i === 0 ? -100 : 100),
            duration: 1.5,
            ease: "power4.inOut",
            stagger: 0,
          },
          "-=0.1"
        );

      return () => {
        document.body.style.overflow = "";
      };
    },
    { scope: wrapperRef }
  );

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto"
    >
      {/* Left Door */}
      <div
        ref={leftPanelRef}
        className="absolute left-0 top-0 w-1/2 h-full bg-background"
      ></div>

      {/* Right Door */}
      <div
        ref={rightPanelRef}
        className="absolute right-0 top-0 w-1/2 h-full bg-background"
      ></div>

      <div className="relative z-10 overflow-hidden mix-blend-difference">
        <h1
          ref={counterRef}
          className="font-syne text-[18vw] text-primary leading-none tracking-tighter"
        >
          000
        </h1>
      </div>
    </div>
  );
}
