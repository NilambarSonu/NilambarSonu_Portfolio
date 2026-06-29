import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
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
  const [heroRevealed, setHeroRevealed] = useState(false);

  const handleEnter = () => {
    setIsLoading(false);
    // slight delay matches the intro exit animation (1s blur/fade)
    setTimeout(() => setHeroRevealed(true), 200);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <Intro onEnter={handleEnter} />}
      </AnimatePresence>
      <div className="relative">
        {/* Upside Down floating particles — persistent background */}
        <UpsideDownParticles />
        
        <CustomCursor />
        <main>
          <Hero isRevealed={heroRevealed} />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Achievements />
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
