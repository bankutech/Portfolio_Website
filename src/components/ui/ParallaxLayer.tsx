"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  zIndex?: number;
}

export default function ParallaxLayer({ children, speed = 1, className = "", zIndex = 0 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // speed multiplier: 1 means normal scroll. 0.5 means slower (moves down slightly). 1.5 means faster (moves up).
    // GSAP ScrollTrigger scrub
    const yOffset = (1 - speed) * 200;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: yOffset,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ zIndex }}>
      {children}
    </div>
  );
}
