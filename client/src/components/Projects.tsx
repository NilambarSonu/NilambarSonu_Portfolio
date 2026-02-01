import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Info } from "lucide-react";
import ProjectModal from "./ProjectModal";
import ProjectCard from "./ProjectCard";
import FilterBar from "./FilterBar";

// Import images/placeholders
import mittiaiThumbnail from "@assets/generated_images/mitti-ai.png";
import agniThumbnail from "@assets/generated_images/agni-sensor.png";
import saathiThumbnail from "@assets/generated_images/saathi-app.png";

// Placeholder for web projects
const webPlaceholder = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  codeUrl?: string;
  features: string[];
  isPublished: boolean;
  category: string;
  thumbnail?: string;
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects: Project[] = [
    {
      title: "Mitti-AI",
      description: "AI-powered soil analysis and agricultural insights platform for farmers.",
      techStack: ["React", "Python", "Machine Learning"],
      liveUrl: "https://saathiai.org/",
      codeUrl: "https://github.com/NilambarSonu",
      features: [
        "AI-powered soil analysis",
        "Real-time agricultural insights",
        "Mobile-friendly interface",
        "Data visualization"
      ],
      isPublished: true,
      category: "Startup",
      thumbnail: mittiaiThumbnail || webPlaceholder
    },
    {
      title: "Agni Soil Sensor",
      description: "IoT-based soil sensor system for real-time soil health monitoring.",
      techStack: ["Python", "IoT", "Data Science"],
      codeUrl: "https://github.com/NilambarSonu",
      features: [
        "Real-time soil monitoring",
        "IoT sensor integration",
        "Data analytics dashboard",
        "Mobile alerts"
      ],
      isPublished: false,
      category: "Startup",
      thumbnail: agniThumbnail || webPlaceholder
    },
    {
      title: "Saathi App",
      description: "Mobile application for agricultural advisory and crop management.",
      techStack: ["React Native", "Node.js", "MongoDB"],
      codeUrl: "https://github.com/NilambarSonu",
      features: [
        "Crop advisory system",
        "Weather integration",
        "Farmer community",
        "Push notifications"
      ],
      isPublished: false,
      category: "Startup",
      thumbnail: saathiThumbnail || webPlaceholder
    },
    {
      title: "Rock-Paper-Scissor",
      description: "Interactive game implementation of the classic Rock-Paper-Scissor with score tracking.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://nilambarsonu.github.io/Rock-Paper-Scissor/",
      codeUrl: "https://github.com/NilambarSonu",
      features: [
        "Interactive gameplay",
        "Score tracking",
        "Animated results",
        "Responsive design"
      ],
      isPublished: true,
      category: "Web Dev",
      thumbnail: webPlaceholder
    },
    {
      title: "Calculator",
      description: "A responsive web calculator with basic arithmetic operations and a user-friendly interface.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://nilambarsonu.github.io/Calculator.01.036/",
      codeUrl: "https://github.com/NilambarSonu",
      features: [
        "Responsive design",
        "Basic arithmetic operations",
        "User-friendly interface",
        "Clean modern UI"
      ],
      isPublished: true,
      category: "Web Dev",
      thumbnail: webPlaceholder
    },
    {
      title: "Portfolio Website",
      description: "Interactive and responsive portfolio web application showcasing projects and skills.",
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      codeUrl: "https://github.com/NilambarSonu",
      features: [
        "Interactive and responsive",
        "Real-world use cases",
        "Problem-solving demonstrations",
        "Links to live demos and source code"
      ],
      isPublished: true,
      category: "Web Dev",
      thumbnail: webPlaceholder
    },
    {
      title: "Data Harvesting",
      description: "Data collection and analysis tool for extracting insights from web sources.",
      techStack: ["Python", "Data Science"],
      codeUrl: "https://github.com/NilambarSonu",
      features: [
        "Web data extraction",
        "Data analysis capabilities",
        "Export functionality",
        "Visualization tools"
      ],
      isPublished: false,
      category: "AI/ML",
      thumbnail: webPlaceholder
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section ref={ref} className="relative py-20 md:py-32 px-4 bg-background transition-colors duration-500" id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore my collection of web development, AI, and startup projects
          </p>

          <FilterBar
            categories={["All", "Startup", "AI/ML", "Web Dev"]}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllProjects ? filteredProjects : filteredProjects.slice(0, 3)).map((project, index) => (
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
                className="bg-primary hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                size="lg"
              >
                See More Projects
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
                className="border-primary/30 hover:border-primary text-primary"
                size="lg"
              >
                See Less Projects
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
