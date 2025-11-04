import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Info } from "lucide-react";
import ProjectModal from "./ProjectModal";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  codeUrl?: string;
  features: string[];
  isPublished: boolean;
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
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
      isPublished: true
    },
    {
      title: "Portfolio Website",
      description: "Interactive and responsive portfolio web application showcasing projects and skills.",
      techStack: ["HTML", "CSS", "JavaScript"],
      codeUrl: "https://github.com/NilambarSonu",
      features: [
        "Interactive and responsive",
        "Real-world use cases",
        "Problem-solving demonstrations",
        "Links to live demos and source code"
      ],
      isPublished: true
    },
    {
      title: "YouTube Clone",
      description: "A clone of YouTube's interface with video browsing and playback features.",
      techStack: ["HTML", "CSS", "JavaScript"],
      features: [
        "Video browsing interface",
        "Responsive layout",
        "Search functionality",
        "Modern UI design"
      ],
      isPublished: false
    },
    {
      title: "Rock-Paper-Scissor Game",
      description: "Interactive game implementation of the classic Rock-Paper-Scissor with score tracking.",
      techStack: ["HTML", "CSS", "JavaScript"],
      features: [
        "Interactive gameplay",
        "Score tracking",
        "Animated results",
        "Responsive design"
      ],
      isPublished: false
    },
    {
      title: "Coin-Flip (Head-Tail)",
      description: "Simple coin flip simulator with animated flipping and result tracking.",
      techStack: ["HTML", "CSS", "JavaScript"],
      features: [
        "Coin flip animation",
        "Result history",
        "Clean interface",
        "Probability tracking"
      ],
      isPublished: false
    },
    {
      title: "Data Harvesting",
      description: "Data collection and analysis tool for extracting insights from web sources.",
      techStack: ["Python", "Data Science"],
      features: [
        "Web data extraction",
        "Data analysis capabilities",
        "Export functionality",
        "Visualization tools"
      ],
      isPublished: false
    }
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-32 px-4 bg-background" id="projects">
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
            Explore my collection of web development and data science projects
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group p-6 h-full bg-card/50 backdrop-blur border-card-border hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:scale-105 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs border-primary/30 text-primary/80"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        asChild
                        data-testid={`button-live-${index}`}
                        className="flex-1 bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Live
                        </a>
                      </Button>
                    )}
                    {project.codeUrl && project.isPublished && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        data-testid={`button-code-${index}`}
                        className="flex-1 border-primary/30 hover:border-primary"
                      >
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedProject(project)}
                      data-testid={`button-details-${index}`}
                      className="border-accent/30 hover:border-accent text-accent"
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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
