"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";

export default function Preloader() {
  const [showPreloader, setShowPreloader] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Check localStorage
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited === "true") {
      setShowPreloader(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        localStorage.setItem("hasVisited", "true");
        setShowPreloader(false);
        // Trigger a custom event for Hero to start animating
        window.dispatchEvent(new Event("preloaderComplete"));
      }
    });

    // Phase 1 (0.0s - 0.6s): Letters appear
    tl.fromTo(
      lettersRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: "back.out(1.7)" },
      0
    );

    // Phase 2 (0.6s - 1.2s): Line grows
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power2.out", transformOrigin: "left center" },
      0.6
    );

    // Skip button appears
    tl.to(skipRef.current, { opacity: 1, duration: 0.3 }, 0.8);

    // Phase 3 (1.2s - 1.8s): Counter & Progress Bar
    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 0.6,
      ease: "power1.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `${Math.floor(counterObj.val)}%`;
        }
      }
    }, 1.2);
    
    tl.fromTo(
      progressBarRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.6, ease: "power1.inOut", transformOrigin: "bottom center" },
      1.2
    );

    // Phase 4 (1.8s - 2.4s): Slide UP
    tl.to(
      containerRef.current,
      { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
      1.8
    );
  }, { scope: containerRef });

  if (!showPreloader) return null;

  const name = "SAGNIK";

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
    >
      <div className="relative">
        <div className="flex font-display font-bold text-[80px] leading-none tracking-tighter">
          {name.split("").map((letter, i) => (
            <span 
              key={i} 
              ref={(el) => {
                if (el) lettersRef.current[i] = el;
              }}
              className="inline-block"
            >
              {letter}
            </span>
          ))}
        </div>
        <div 
          ref={lineRef}
          className="w-full h-[2px] bg-[#6C63FF] mt-4" 
        />
      </div>

      <div 
        ref={counterRef}
        className="absolute bottom-8 right-8 font-mono text-2xl"
      >
        0%
      </div>

      <div 
        ref={progressBarRef}
        className="absolute left-0 top-0 bottom-0 w-2 bg-[#6C63FF]"
      />

      <button
        ref={skipRef}
        onClick={() => {
          gsap.to(containerRef.current, { yPercent: -100, duration: 0.5, ease: "power3.inOut", onComplete: () => {
            localStorage.setItem("hasVisited", "true");
            setShowPreloader(false);
            window.dispatchEvent(new Event("preloaderComplete"));
          }});
        }}
        className="absolute top-8 right-8 font-mono text-sm uppercase opacity-0 hover:text-[#6C63FF] transition-colors"
      >
        skip →
      </button>
    </div>
  );
}
