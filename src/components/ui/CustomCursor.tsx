"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
  const { cursorState } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [clickPositions, setClickPositions] = useState<{ id: number; x: number; y: number }[]>([]);

  // We use slightly different springs for the dot vs the ring
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  // Snappy dot
  const dotSpringX = useSpring(dotX, { damping: 40, stiffness: 400, mass: 0.1 });
  const dotSpringY = useSpring(dotY, { damping: 40, stiffness: 400, mass: 0.1 });

  // Laggy ring
  const ringSpringX = useSpring(ringX, { damping: 30, stiffness: 150, mass: 0.6 });
  const ringSpringY = useSpring(ringY, { damping: 30, stiffness: 150, mass: 0.6 });

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClickPositions(prev => [...prev, newClick]);
      setTimeout(() => {
        setClickPositions(prev => prev.filter(c => c.id !== newClick.id));
      }, 400); // Remove ripple after animation
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!isVisible) return null;

  // Variants for Ring
  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      border: "1px solid var(--accent)",
      backgroundColor: "transparent",
      opacity: 0.2,
      rotate: 0,
      transition: { duration: 0.2 }
    },
    link: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      border: "0px solid var(--accent)",
      backgroundColor: "var(--accent)",
      opacity: 0.15,
      rotate: 0,
      transition: { duration: 0.2 }
    },
    project: {
      width: 80,
      height: 32,
      borderRadius: "9999px", // Pill
      border: "1px solid transparent",
      backgroundColor: "var(--accent)",
      opacity: 1,
      rotate: -5,
      transition: { duration: 0.3, type: "spring" as const, stiffness: 300, damping: 20 }
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: "50%",
      border: "1px dashed var(--accent)",
      backgroundColor: "transparent",
      opacity: 0.6,
      rotate: 360,
      transition: { rotate: { repeat: Infinity, duration: 3, ease: "linear" as const } }
    }
  };

  // Variants for Inner Dot
  const dotVariants = {
    default: {
      width: 8,
      height: 8,
      backgroundColor: "var(--accent)",
      opacity: 1,
      scale: isClicking ? 0.5 : 1
    },
    link: {
      width: 0,
      height: 0,
      opacity: 0
    },
    project: {
      width: 0,
      height: 0,
      opacity: 0
    },
    image: {
      width: 8,
      height: 8,
      backgroundColor: "var(--accent)",
      opacity: 1
    }
  };

  return (
    <>
      {/* RIPPLES */}
      {clickPositions.map(click => (
        <motion.div
          key={click.id}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: click.x,
            top: click.y,
            width: 24,
            height: 24,
            x: "-50%",
            y: "-50%",
            borderRadius: "50%",
            backgroundColor: "var(--accent)",
            pointerEvents: "none",
            zIndex: 9998
          }}
        />
      ))}

      {/* OUTER RING */}
      <motion.div
        style={{
          x: ringSpringX,
          y: ringSpringY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformOrigin: "center center"
        }}
      >
        <motion.div
          variants={ringVariants}
          animate={cursorState}
          style={{ x: "-50%", y: "-50%" }}
          className="flex items-center justify-center overflow-hidden whitespace-nowrap text-white font-mono"
        >
          {cursorState === "link" && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] uppercase font-bold text-foreground opacity-100">
              CLICK
            </motion.span>
          )}
          {cursorState === "project" && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] uppercase font-bold tracking-widest text-white">
              VIEW →
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* INNER DOT */}
      <motion.div
        style={{
          x: dotSpringX,
          y: dotSpringY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 10000,
        }}
      >
        <motion.div
          variants={dotVariants}
          animate={cursorState}
          style={{ x: "-50%", y: "-50%" }}
          className="rounded-full"
        />
      </motion.div>
    </>
  );
}
