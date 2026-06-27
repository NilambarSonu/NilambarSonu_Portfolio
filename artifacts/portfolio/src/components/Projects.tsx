import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProjectModal from "./ProjectModal";
import ProjectCard from "./ProjectCard";
import FilterBar from "./FilterBar";
import { projects, type Project } from "@/lib/projects-data";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section ref={ref} className="projects-premium-section" id="projects">
      <div className="projects-bg" aria-hidden="true" />
      <div className="projects-blueprint projects-blueprint-large" aria-hidden="true" />
      <div className="projects-blueprint projects-blueprint-small" aria-hidden="true" />
      <div className="projects-slashes" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <svg className="projects-cube" viewBox="0 0 300 300" aria-hidden="true">
        <path d="M150 22 L252 82 L252 200 L150 260 L48 200 L48 82 Z" />
        <path d="M48 82 L150 142 L252 82" />
        <path d="M150 142 L150 260" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="projects-heading">Projects</h2>
          <p className="projects-subtitle">
            Experiments from the lab - web development, AI, and startup projects
          </p>

          <FilterBar
            categories={["All", "Startup", "AI/ML", "Web Dev"]}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(showAllProjects ? filteredProjects : filteredProjects.slice(0, 3)).map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onDetailsClick={setSelectedProject}
              />
            ))}
          </div>

          {!showAllProjects && filteredProjects.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={() => setShowAllProjects(true)}
                className="border border-[#007fff]/35 bg-[#007fff]/15 font-sans tracking-wider text-[#6bc7ff] transition-all hover:bg-[#007fff] hover:text-white hover:shadow-[0_0_24px_rgba(0,127,255,0.34)]"
                size="lg"
              >
                Open More Files
              </Button>
            </motion.div>
          )}

          {showAllProjects && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={() => setShowAllProjects(false)}
                variant="outline"
                className="border-[#007fff]/25 font-sans tracking-wider text-[#6bc7ff]/80 hover:border-[#007fff]/55"
                size="lg"
              >
                Close Files
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <style>{`
        .projects-premium-section {
          position: relative;
          z-index: 40;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
          padding: clamp(5.5rem, 10vh, 7.5rem) 1rem clamp(6rem, 10vh, 8rem);
          background: #030913;
          color: #f5f7fa;
        }

        .projects-bg,
        .projects-bg::before,
        .projects-bg::after {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
        }

        .projects-bg {
          z-index: -5;
          background:
            radial-gradient(ellipse 42% 62% at 14% 30%, rgba(0, 112, 156, 0.24) 0%, rgba(0, 68, 96, 0.1) 42%, transparent 72%),
            radial-gradient(ellipse 32% 36% at 84% 92%, rgba(23, 70, 164, 0.18) 0%, rgba(12, 36, 88, 0.1) 44%, transparent 76%),
            linear-gradient(180deg, #030913 0%, #040b16 52%, #030913 100%);
        }

        .projects-bg::before {
          opacity: 0.22;
          background-image:
            linear-gradient(rgba(24, 66, 118, 0.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(24, 66, 118, 0.13) 1px, transparent 1px);
          background-size: 8rem 8rem;
          mask-image: linear-gradient(180deg, transparent 0%, black 22%, black 78%, transparent 100%);
        }

        .projects-bg::after {
          background:
            linear-gradient(90deg, rgba(2, 8, 16, 0.08) 0%, rgba(2, 8, 16, 0.38) 54%, rgba(2, 8, 16, 0.12) 100%),
            linear-gradient(0deg, rgba(1, 4, 10, 0.62) 0%, transparent 20%, transparent 72%, rgba(1, 4, 10, 0.78) 100%);
        }

        .projects-blueprint {
          position: absolute;
          border: 1px dashed rgba(0, 157, 223, 0.12);
          pointer-events: none;
        }

        .projects-blueprint-large {
          left: 12.5vw;
          bottom: 12.2vh;
          width: min(24vw, 30.5rem);
          height: min(31vh, 21rem);
        }

        .projects-blueprint-small {
          left: 38.7vw;
          bottom: 8.2vh;
          width: min(13.8vw, 17.8rem);
          height: min(18vh, 12rem);
        }

        .projects-cube {
          position: absolute;
          right: clamp(10rem, 19.4vw, 24rem);
          top: clamp(13rem, 37vh, 23rem);
          width: clamp(13rem, 18vw, 22rem);
          height: auto;
          opacity: 0.48;
          filter: drop-shadow(0 0 10px rgba(0, 157, 223, 0.08));
          pointer-events: none;
        }

        .projects-cube path {
          fill: none;
          stroke: rgba(0, 157, 223, 0.28);
          stroke-width: 1.4;
        }

        .projects-slashes {
          position: absolute;
          left: clamp(3.8rem, 6vw, 7.8rem);
          bottom: clamp(2.6rem, 5.5vh, 4.8rem);
          display: flex;
          gap: clamp(1.9rem, 3vw, 3.9rem);
          opacity: 0.34;
          pointer-events: none;
        }

        .projects-slashes span {
          width: 1.35rem;
          height: 1px;
          display: block;
          background: rgba(116, 142, 178, 0.48);
          transform: rotate(-45deg);
        }

        .projects-heading {
          margin: 0 0 0.9rem;
          text-align: center;
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(2rem, 2.45vw, 3.1rem);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.06em;
          text-transform: uppercase;
          color: rgba(0, 157, 223, 0.18);
          -webkit-text-stroke: 1px #007fff;
          text-shadow: 0 0 18px rgba(0, 127, 255, 0.18);
        }

        .projects-subtitle {
          max-width: 44rem;
          margin: 0 auto 2.8rem;
          text-align: center;
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(1rem, 1.2vw, 1.3rem);
          line-height: 1.2;
          letter-spacing: 0.01em;
          color: rgba(245, 247, 250, 0.72);
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.42);
        }

        @media (max-width: 900px) {
          .projects-premium-section {
            padding-top: 4.5rem;
          }

          .projects-cube {
            right: -3.5rem;
            top: 8rem;
            opacity: 0.24;
          }

          .projects-blueprint-large {
            left: -5rem;
            width: 19rem;
          }

          .projects-blueprint-small,
          .projects-slashes {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
