"use client";
import { motion } from "framer-motion";

export default function Testimonials() {
  const quotes = [
    {
      text: "Sagnik completely re-thought our onboarding flow. Conversion bumped by 20% in the first week. The work speaks for itself.",
      author: "David Lee",
      title: "Founder",
      company: "Acme SaaS"
    },
    {
      text: "Finally, a designer who understands engineering constraints. The React components he delivered were flawless and production-ready.",
      author: "Sarah Jenkins",
      title: "CTO",
      company: "Nexus Fintech"
    }
  ];

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto text-center">
      <div className="mb-24">
        <h2 className="font-display font-bold text-[32px] tracking-[-0.03em]">
          What people say when I'm not in the room.
        </h2>
      </div>

      <div className="space-y-32">
        {quotes.map((quote, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="text-accent text-6xl font-display leading-none mb-6">"</div>
            <p className="font-display italic text-2xl md:text-3xl lg:text-4xl leading-tight max-w-4xl mb-12">
              {quote.text}
            </p>
            <div className="font-mono text-xs uppercase tracking-widest text-muted">
              <span className="text-foreground font-semibold">{quote.author}</span> · {quote.title} · {quote.company}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
