"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const ref = useRef(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if preloader is skipped
    if (localStorage.getItem("hasVisited") === "true") {
      setHasLoaded(true);
    }

    const handlePreloader = () => setHasLoaded(true);
    window.addEventListener("preloaderComplete", handlePreloader);
    return () => window.removeEventListener("preloaderComplete", handlePreloader);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headline = "Designing calm software from a noisy world.";
  const words = headline.split(" ");

  const wordVariants = {
    hidden: { y: "100%", clipPath: "inset(100% 0 0 0)" },
    visible: (i: number) => ({
      y: "0%",
      clipPath: "inset(0% 0 0 0)",
      transition: {
        delay: 0.1 * i + 0.2, // slight delay after slide up
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1] as const
      }
    })
  };

  const fadeBlurVariants = {
    hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)", 
      y: 0,
      transition: { delay: 0.6, duration: 0.8, ease: "easeOut" as const }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { delay: 0.9, duration: 0.6, ease: "easeOut" as const } 
    }
  };

  return (
    <motion.section 
      ref={ref} 
      initial={{ y: "10vh" }}
      animate={{ y: hasLoaded ? "0vh" : "10vh" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }}
      className="relative min-h-screen pt-32 pb-16 px-6 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="max-w-4xl">
          
          <h1 className="font-display font-bold text-[44px] md:text-[72px] lg:text-[80px] leading-[1.1] tracking-[-0.03em] mb-6 flex flex-wrap gap-[0.25em]">
            {words.map((word, i) => (
              <span key={i} className="overflow-hidden inline-flex pt-2">
                <motion.span
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate={hasLoaded ? "visible" : "hidden"}
                  className={word === "world." ? "italic font-serif text-accent" : ""}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p 
            variants={fadeBlurVariants}
            initial="hidden"
            animate={hasLoaded ? "visible" : "hidden"}
            className="text-xl md:text-2xl text-muted mb-12 max-w-2xl"
          >
            I'm Sagnik Mitra — a Computer Science undergraduate specializing in AI & ML at SRM, Chennai. I build interfaces where engineering meets editorial care.
          </motion.p>

          <motion.div 
            variants={ctaVariants}
            initial="hidden"
            animate={hasLoaded ? "visible" : "hidden"}
            className="flex items-center gap-6"
          >
            <a href="#work" className="font-mono text-sm uppercase tracking-widest text-foreground hover:text-accent transition-colors">
              View selected work →
            </a>
            <a href="https://github.com/bankutech" target="_blank" rel="noopener noreferrer" className="font-mono text-sm uppercase tracking-widest text-muted hover:text-foreground transition-colors">
              GitHub
            </a>
          </motion.div>
        </div>
      </div>

      {/* Abstract Animated Background */}
      <motion.div 
        style={{ y, opacity }}
        animate={{ 
          filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute right-[-10%] top-[10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-accent/10 blur-[100px] z-0 pointer-events-none"
      />

      {/* Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={hasLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-12 right-6 md:right-12 flex flex-col items-center gap-4 pointer-events-none"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted [writing-mode:vertical-lr]">Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-muted/30 relative overflow-hidden"
        >
          <motion.div 
            className="w-full h-full bg-accent origin-top"
            animate={{ scaleY: [0, 1, 0], translateY: ["-100%", "0%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "circInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
