import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 800 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest && target.closest("a, button, [role='button'], input, textarea, select, .magnetic-btn")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest && target.closest("a, button, [role='button'], input, textarea, select, .magnetic-btn")) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [handleMouseMove]);

  // Don't show on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 48 : 12,
          height: isHovering ? 48 : 12,
          backgroundColor: isHovering ? "transparent" : "hsl(var(--primary))",
          border: isHovering ? "2px solid hsl(var(--primary))" : "none",
          mixBlendMode: isHovering ? "difference" : "normal",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.3s, height 0.3s, background-color 0.3s, border 0.3s, opacity 0.3s",
          boxShadow: isHovering
            ? "0 0 20px hsl(var(--primary) / 0.4)"
            : "0 0 10px hsl(var(--primary) / 0.6)",
        }}
      />
    </>
  );
};

export default CustomCursor;
