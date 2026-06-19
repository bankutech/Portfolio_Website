"use client";
import { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "outline" | "solid";
}

export default function MagneticButton({ children, className = "", variant = "outline", ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { setCursorState } = useCursor();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const handleMouseEnter = () => {
    setCursorState("link");
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setCursorState("default");
  };

  const isSolid = variant === "solid";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      className={`relative overflow-hidden px-8 py-4 rounded-full flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-widest transition-colors duration-300 group cursor-none ${
        isSolid 
          ? "bg-foreground text-background border border-foreground" 
          : "border border-foreground/20 text-foreground"
      } ${className}`}
      {...props}
    >
      {/* Background slide effect */}
      <span className={`absolute inset-0 w-full h-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${
        isSolid ? "bg-accent" : "bg-foreground"
      }`} />
      
      {/* Text needs to be z-10 and change color conditionally */}
      <span className={`relative z-10 transition-colors duration-300 ${
        isSolid ? "text-background group-hover:text-white" : "text-foreground group-hover:text-background"
      }`}>
        {children}
      </span>
    </motion.button>
  );
}
