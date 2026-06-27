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
        className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        data-testid="project-modal-backdrop"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#111] border border-st-red/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          style={{
            boxShadow: "0 0 40px rgba(229,9,20,0.2), 0 0 80px rgba(229,9,20,0.08)",
          }}
        >
          {/* Classified header */}
          <div className="sticky top-0 bg-[#111]/95 backdrop-blur border-b border-st-red/20 p-6 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-retro text-[10px] text-st-red/40 tracking-[0.3em] uppercase">
                  HAWKINS LAB — PROJECT FILE
                </span>
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-3 tracking-wide">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    className="bg-st-red/15 text-st-red/80 border border-st-red/30 font-retro text-xs tracking-wider"
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
              className="text-muted-foreground hover:text-st-red hover:bg-st-red/10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {project.thumbnail && (
              <div className="relative rounded-lg overflow-hidden border border-st-red/20 bg-[#050505] group">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-auto max-h-[300px] object-contain mx-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]/40 to-transparent pointer-events-none" />
                <div className="absolute top-2 right-2 px-2 py-1 bg-st-red/20 backdrop-blur-md rounded border border-st-red/30 text-[10px] font-retro text-st-red tracking-widest uppercase">
                  Encrypted File
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-display font-semibold mb-3 text-st-red tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-st-red animate-pulse" />
                Description
              </h3>
              <p className="text-foreground/80 leading-relaxed font-mono text-sm">{project.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-display font-semibold mb-3 text-st-amber tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-st-amber animate-pulse" />
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-st-red/60 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/70 font-mono text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!project.isPublished && (
              <div className="bg-st-red/5 border border-st-red/15 rounded-md p-4">
                <p className="text-sm text-muted-foreground font-retro">
                  <strong className="text-st-red">⚠ CLASSIFIED:</strong> This project is not yet published.
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {project.liveUrl && (
                <Button
                  asChild
                  data-testid="button-modal-live"
                  className="flex-1 bg-st-red hover:bg-st-red/80 hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] text-white"
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
                  className="flex-1 border-st-amber/40 text-st-amber hover:border-st-amber hover:shadow-[0_0_15px_rgba(212,160,23,0.3)]"
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
