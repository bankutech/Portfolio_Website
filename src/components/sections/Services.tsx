"use client";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      title: "Starter",
      tagline: "One thing, done well.",
      desc: "Single-page or audit",
      bullets: ["UX Audit", "Landing Page Design", "Framer Development"]
    },
    {
      title: "Studio",
      tagline: "The full picture.",
      desc: "Full product design",
      bullets: ["0 to 1 Product Design", "Design Systems", "High-Fidelity Prototypes"]
    },
    {
      title: "Retainer",
      tagline: "I'm on your team.",
      desc: "Monthly partnership",
      bullets: ["Ongoing UX Support", "Frontend React Dev", "Priority Communication"]
    }
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((svc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="editorial-border rounded-2xl p-8 bg-surface flex flex-col"
          >
            <div className="mb-12">
              <h3 className="font-display font-bold text-2xl mb-2">{svc.title}</h3>
              <div className="text-accent font-medium mb-4">{svc.tagline}</div>
              <p className="text-muted text-sm">{svc.desc}</p>
            </div>
            
            <ul className="mb-12 space-y-4 flex-1">
              {svc.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted/50" />
                  {b}
                </li>
              ))}
            </ul>

            <button className="w-full py-3 border border-foreground/20 rounded-full font-medium text-sm hover:bg-foreground hover:text-background transition-colors">
              Let's talk →
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
