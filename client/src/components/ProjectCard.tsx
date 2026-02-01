import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Info } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
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

interface ProjectCardProps {
  project: Project;
  onDetailsClick: (project: Project) => void;
}

export default function ProjectCard({ project, onDetailsClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "0px" }}
    >
      <Card className="group p-6 bg-card/50 backdrop-blur border-card-border hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:scale-105 flex flex-col">
        <div className="flex-1">
          {project.thumbnail && (
            <div className="mb-4">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}
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
              data-testid={`button-live-${project.title}`}
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
              data-testid={`button-code-${project.title}`}
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
            onClick={() => onDetailsClick(project)}
            data-testid={`button-details-${project.title}`}
            className="border-accent/30 hover:border-accent text-accent"
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}