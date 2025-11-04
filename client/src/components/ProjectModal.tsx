import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "./Projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        data-testid="project-modal-backdrop"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card border border-card-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,255,255,0.2)]"
        >
          <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-card-border p-6 flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    className="bg-primary/20 text-primary border border-primary/50"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-modal"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-display font-semibold mb-3 text-primary">
                Description
              </h3>
              <p className="text-foreground/90 leading-relaxed">{project.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-display font-semibold mb-3 text-accent">
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!project.isPublished && (
              <div className="bg-muted/50 border border-border rounded-md p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> This project is not yet published to GitHub Pages.
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {project.liveUrl && (
                <Button
                  asChild
                  data-testid="button-modal-live"
                  className="flex-1 bg-primary hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.codeUrl && project.isPublished && (
                <Button
                  variant="outline"
                  asChild
                  data-testid="button-modal-code"
                  className="flex-1 border-primary/50 hover:border-primary"
                >
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
