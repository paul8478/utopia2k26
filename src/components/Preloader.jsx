import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const counterRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (onComplete) onComplete();
        gsap.set(wrapperRef.current, { pointerEvents: "none", display: "none" });
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
              : currentVal;
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
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto">
      {/* Left Door */}
      <div ref={leftPanelRef} className="absolute left-0 top-0 w-1/2 h-full bg-[#F4F4F0]"></div>
      
      {/* Right Door */}
      <div ref={rightPanelRef} className="absolute right-0 top-0 w-1/2 h-full bg-[#F4F4F0]"></div>
      
      <div className="relative z-10 overflow-hidden mix-blend-difference">
        <h1
          ref={counterRef}
          className="font-syne text-[18vw] text-[#E65100] leading-none tracking-tighter"
        >
          000
        </h1>
      </div>
    </div>
  );
}

