import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import SelectedWork from "@/components/sections/SelectedWork";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Services from "@/components/sections/Services";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      
      <main>
        <Hero />
        <Marquee />
        <SelectedWork />
        <About />
        <Process />
        {/* <Testimonials /> */}
        <Services />
        <CTA />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
