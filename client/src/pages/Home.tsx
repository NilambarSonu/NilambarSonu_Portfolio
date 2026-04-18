import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import GithubContributions from "@/components/GithubContributionAndMusic";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Intro from "@/components/Intro";
import UpsideDownParticles from "@/components/UpsideDownParticles";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Intro onEnter={() => setIsLoading(false)} />}
      </AnimatePresence>
      <div className="relative">
        {/* Upside Down floating particles — persistent background */}
        <UpsideDownParticles />
        
        <CustomCursor />
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Resume />
          <GithubContributions />
          <Contact />
        </main>
        <Footer />

        {/* Floating audio player */}
        <AudioPlayer />
      </div>
    </>
  );
}
