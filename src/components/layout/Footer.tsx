"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111110] text-[#888785] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
        <div>© {new Date().getFullYear()} · Sagnik</div>
        <div className="tracking-widest uppercase">Designed & built by me.</div>
        <button onClick={scrollToTop} className="hover:text-white transition-colors">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
