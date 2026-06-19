"use client";
import { motion } from "framer-motion";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "I ask uncomfortable questions first."
    },
    {
      num: "02",
      title: "Define",
      desc: "One problem. One solution. No detours."
    },
    {
      num: "03",
      title: "Design",
      desc: "High fidelity from day one. No wireframe theater."
    },
    {
      num: "04",
      title: "Deliver",
      desc: "I ship. Then I iterate. In that order."
    }
  ];

  return (
    <section id="process" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="font-display font-bold text-[32px] tracking-[-0.03em]">How I work.</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="editorial-border rounded-2xl p-8 bg-surface/50 hover:bg-surface transition-colors"
          >
            <div className="font-mono text-accent text-sm mb-16">{step.num}</div>
            <h3 className="font-display font-bold text-2xl mb-4">{step.title}</h3>
            <p className="text-muted font-body leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
