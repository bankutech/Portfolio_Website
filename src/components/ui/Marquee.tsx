"use client";
import { useCursor } from "@/context/CursorContext";

export default function Marquee() {
  const { setCursorState } = useCursor();

  const keywords = [
    "UI Design", "✦", "Interaction", "✦", "Systems", "✦", "Prototyping", "✦", 
    "Motion", "✦", "Strategy", "✦", "React", "✦", "Figma", "✦"
  ];

  return (
    <div 
      className="w-full border-y border-muted/20 py-4 overflow-hidden bg-background flex cursor-none"
      onMouseEnter={() => setCursorState("link")}
      onMouseLeave={() => setCursorState("default")}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}} />
      
      <div className="group flex w-full">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 px-6 items-center">
              {keywords.map((word, j) => (
                <span 
                  key={j} 
                  className={`font-mono text-sm tracking-widest uppercase transition-all duration-300 ease-out 
                    ${word === '✦' ? 'text-accent/50' : 'text-muted hover:text-foreground hover:scale-110'}`}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
