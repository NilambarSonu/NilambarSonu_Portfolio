import { useState, useRef } from "react";
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
  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section ref={ref} className="relative py-20 md:py-32 px-4 bg-[#0a0a0a]" id="projects">
      {/* Red top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-st-red/15 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center text-st-red tracking-[0.1em] uppercase"
            style={{
              textShadow: "0 0 10px rgba(229,9,20,0.4), 0 0 30px rgba(229,9,20,0.15)",
            }}
          >
            My Projects
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto font-retro text-sm tracking-wider">
            Experiments from the lab — web development, AI, and startup projects
          </p>

          <FilterBar
            categories={["All", "Startup", "AI/ML", "Web Dev"]}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="text-center mt-8"
            >
              <Button
                onClick={() => setShowAllProjects(true)}
                className="bg-st-red/20 text-st-red border border-st-red/40 hover:bg-st-red hover:text-white hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all font-retro tracking-wider"
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
              className="text-center mt-8"
            >
              <Button
                onClick={() => setShowAllProjects(false)}
                variant="outline"
                className="border-st-red/20 hover:border-st-red/50 text-st-red/70 font-retro tracking-wider"
                size="lg"
              >
                Close Files
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
