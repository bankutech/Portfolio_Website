"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav editorial-border border-t-0 border-x-0 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Monogram */}
        <div className="font-display font-bold text-lg tracking-tighter">SK</div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-body text-sm font-medium">
          {["Work", "Process", "About", "Writing"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Availability Badge */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted">
            <div className="w-2 h-2 rounded-full bg-[#00C48C] animate-pulse" />
            Available for work
          </div>
          <button className="bg-foreground text-background px-5 py-2 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors">
            Let's talk →
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
