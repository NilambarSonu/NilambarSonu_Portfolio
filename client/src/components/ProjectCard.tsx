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
      <Card className="group p-6 bg-[#111]/60 backdrop-blur border border-st-red/15 hover:border-st-red/50 transition-all duration-500 st-portal-hover flex flex-col relative overflow-hidden">
        {/* Subtle scanline effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(229,9,20,0.02) 2px, rgba(229,9,20,0.02) 4px)",
          }}
        />

        <div className="flex-1 relative z-10">
          {project.thumbnail && (
            <div className="mb-4 overflow-hidden rounded-lg border border-st-red/10">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-700"
                style={{
                  filter: "saturate(0.7) contrast(1.1)",
                }}
              />
              {/* Red overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
            </div>
          )}
          <h3 className="text-2xl font-display font-bold mb-3 text-foreground group-hover:text-st-red transition-colors tracking-wide">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3 font-mono text-sm">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs border-st-red/20 text-st-red/70 font-retro tracking-wider"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4 relative z-10">
          {project.liveUrl && (
            <Button
              size="sm"
              asChild
              data-testid={`button-live-${project.title}`}
              className="flex-1 bg-st-red/15 text-st-red border border-st-red/30 hover:bg-st-red hover:text-white hover:shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all"
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
              className="flex-1 border-st-amber/30 text-st-amber/70 hover:border-st-amber hover:text-st-amber transition-all"
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
            className="border-st-teal/30 text-st-teal hover:border-st-teal hover:text-st-teal hover:shadow-[0_0_10px_rgba(26,107,107,0.3)] transition-all"
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}