"use client";
import { motion } from "framer-motion";
import { Clock, Globe2, Code2, GraduationCap } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto bg-surface mt-16 rounded-[40px] editorial-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 p-8 md:p-12">
        
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="col-span-1 md:col-span-2"
        >
          <h2 className="font-display font-bold text-[32px] md:text-[48px] tracking-[-0.03em] mb-8">A student of systems, a student of feeling.</h2>
          
          <div className="text-lg md:text-xl text-foreground mb-12 space-y-6 max-w-3xl">
            <p>I'm in my second year at SRM Institute of Science and Technology, studying Computer Science with a specialization in Artificial Intelligence and Machine Learning. My work sits at the intersection of pragmatic engineering and human-centered design.</p>
            <p>Outside of coursework, I build small, opinionated web apps — tools that try to feel personal. I think about typography, restraint, and how software behaves when no one is watching.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
