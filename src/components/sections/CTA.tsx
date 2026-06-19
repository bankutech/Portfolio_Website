"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
      
      <div className="relative w-full rounded-[40px] bg-surface/50 border border-muted/20 backdrop-blur-xl overflow-hidden py-32 px-6 md:px-16 flex flex-col items-center justify-center text-center">
        
        {/* Animated Background Mesh */}
        <motion.div 
          style={{ y: springY }}
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] aspect-square bg-accent/30 rounded-full blur-[120px]" />
        </motion.div>

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="font-display font-bold text-[56px] md:text-[80px] lg:text-[100px] tracking-[-0.04em] leading-[1.05] mb-16">
              Have an idea? <br/>
              <span className="italic font-serif font-light text-accent">Let's build it.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto mb-16">
              {/* Email */}
              <a href="mailto:sagnikmitra1302@gmail.com" className="group p-6 rounded-2xl bg-surface/30 hover:bg-surface/60 border border-muted/10 transition-all duration-300 flex flex-col gap-2">
                <span className="font-mono text-xs text-muted uppercase tracking-widest">Email</span>
                <span className="font-body text-lg md:text-xl text-foreground group-hover:text-accent transition-colors">sagnikmitra1302@gmail.com</span>
              </a>
              
              {/* Phone */}
              <a href="tel:+919520916065" className="group p-6 rounded-2xl bg-surface/30 hover:bg-surface/60 border border-muted/10 transition-all duration-300 flex flex-col gap-2">
                <span className="font-mono text-xs text-muted uppercase tracking-widest">Phone</span>
                <span className="font-body text-lg md:text-xl text-foreground group-hover:text-accent transition-colors">+91 95209 16065</span>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/sagnik-mitra-5b0028347" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl bg-surface/30 hover:bg-surface/60 border border-muted/10 transition-all duration-300 flex flex-col gap-2">
                <span className="font-mono text-xs text-muted uppercase tracking-widest">LinkedIn</span>
                <span className="font-body text-lg md:text-xl text-foreground group-hover:text-accent transition-colors">sagnik-mitra</span>
              </a>

              {/* GitHub */}
              <a href="https://github.com/bankutech" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl bg-surface/30 hover:bg-surface/60 border border-muted/10 transition-all duration-300 flex flex-col gap-2">
                <span className="font-mono text-xs text-muted uppercase tracking-widest">GitHub</span>
                <span className="font-body text-lg md:text-xl text-foreground group-hover:text-accent transition-colors">@bankutech</span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.4}>
            <div className="flex justify-center">
              <MagneticButton variant="solid" onClick={() => window.location.href = "mailto:sagnikmitra1302@gmail.com"}>
                Get in touch
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
