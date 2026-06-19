"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export default function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let iteration = 0;
      const maxIterations = 15;
      
      const interval = setInterval(() => {
        setDisplayText((prev) => {
          return text
            .split("")
            .map((char, index) => {
              if (index < iteration / (maxIterations / text.length)) {
                return text[index];
              }
              // Return random number 0-9
              return Math.floor(Math.random() * 10).toString();
            })
            .join("");
        });

        iteration++;
        if (iteration > maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 30); // 30ms per tick

      return () => clearInterval(interval);
    }
  }, [isInView, text]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
