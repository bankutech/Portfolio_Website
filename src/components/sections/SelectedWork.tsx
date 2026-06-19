"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useCursor } from "@/context/CursorContext";

const projects = [
  {
    id: "01",
    name: "Moodwave",
    category: "React App",
    year: "2025",
    stat: "Real-time emotion tracking API",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    span: "col-span-12",
    height: "h-[600px]",
  },
  {
    id: "02",
    name: "Student Planner Portal",
    category: "Frontend Dev",
    year: "2025",
    stat: "Persistent multi-session data",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    span: "col-span-12 md:col-span-6",
    height: "h-[450px]",
  },
  {
    id: "03",
    name: "Health Monitoring Dash",
    category: "Data Viz",
    year: "2024",
    stat: "Interactive metrics visualization",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    span: "col-span-12 md:col-span-6",
    height: "h-[450px]",
  },
  {
    id: "04",
    name: "QR Code Generator",
    category: "Web & API",
    year: "2024",
    stat: "Dynamic URL rendering",
    image: "https://images.unsplash.com/photo-1633519842602-0e9e4ce75a40?q=80&w=2000&auto=format&fit=crop",
    span: "col-span-12",
    height: "h-[600px]",
  }
];

function ProjectCard({ project, index }: { project: any; index: number }) {
  const { setCursorState } = useCursor();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setCursorState("default");
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorState("project")}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className={`${project.span} group relative project-card cursor-none`}
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`w-full ${project.height} bg-surface rounded-sm overflow-hidden relative mb-6`}
      >
        <motion.img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        
        {/* Layer 1: Dark overlay */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-8 pointer-events-none">
          
          {/* Layer 2: Title */}
          <h3 className="font-display font-bold text-4xl text-white text-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
            {project.name}
          </h3>

          {/* Layer 3: Stat/Year */}
          <div className="font-mono text-sm text-white/80 mt-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-150">
            {project.year} — {project.stat}
          </div>

          {/* Layer 4: Button */}
          <div className="mt-8 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out delay-200">
            <span className="bg-accent text-white px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest">
              View Case Study →
            </span>
          </div>

        </div>
      </motion.div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-display font-bold text-2xl mb-3 text-foreground">
            {project.name}
          </h3>
          <div className="flex gap-2">
            <span className="bg-surface border border-muted/20 px-3 py-1 rounded-full text-xs font-mono text-muted uppercase">
              {project.category}
            </span>
          </div>
        </div>
        <div className="font-mono text-xs text-muted">
          {project.id}
        </div>
      </div>
    </motion.div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="font-display font-bold text-[32px] md:text-[48px] tracking-[-0.03em] mb-4">Things I've made.</h2>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
