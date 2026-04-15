import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, ExternalLink, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

export default function Resume() {
  const ref = useRef(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Nilambar_Behera_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Download Started", description: "Your resume is downloading..." });
  };

  const handleOpenNewTab = () => window.open("/resume.pdf", "_blank");
  const handleZoomIn = () => { if (zoom < 200) setZoom(prev => Math.min(prev + 10, 200)); };
  const handleZoomOut = () => { if (zoom > 50) setZoom(prev => Math.max(prev - 10, 50)); };

  const handleFullscreen = () => {
    const container = document.getElementById("resume-container");
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {
        toast({ title: "Fullscreen Error", description: "Unable to enter fullscreen mode", variant: "destructive" });
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 px-4 bg-[#0a0a0a] st-fog"
      id="resume"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-st-red/15 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center text-st-red tracking-[0.1em] uppercase"
            style={{ textShadow: "0 0 10px rgba(229,9,20,0.4), 0 0 30px rgba(229,9,20,0.15)" }}
          >
            My Resume
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto font-retro text-sm tracking-wider">
            ⚠ CLASSIFIED DOCUMENT — View and download my latest resume
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-4 md:p-6 bg-[#111]/60 backdrop-blur border border-st-red/15 relative">
              {/* Classified stamp */}
              <div className="absolute top-3 right-4 font-retro text-[10px] text-st-red/20 tracking-[0.3em] uppercase transform rotate-3">
                CLASSIFIED
              </div>

              {/* Control Buttons */}
              <div className="flex flex-col md:flex-row md:flex-wrap gap-2 mb-4">
                <Button size="sm" onClick={handleZoomOut} disabled={zoom <= 50} data-testid="button-zoom-out"
                  variant="outline" className="w-full md:w-auto border-st-red/20 text-st-red/70 hover:border-st-red/50">
                  <ZoomOut className="w-4 h-4 mr-1" /> Zoom Out
                </Button>
                <Button size="sm" onClick={handleZoomIn} disabled={zoom >= 200} data-testid="button-zoom-in"
                  variant="outline" className="w-full md:w-auto border-st-red/20 text-st-red/70 hover:border-st-red/50">
                  <ZoomIn className="w-4 h-4 mr-1" /> Zoom In
                </Button>
                <Button size="sm" onClick={handleFullscreen} data-testid="button-fullscreen"
                  variant="outline" className="w-full md:w-auto border-st-amber/20 text-st-amber/70 hover:border-st-amber/50">
                  <Maximize2 className="w-4 h-4 mr-1" /> Fullscreen
                </Button>
                <Button size="sm" onClick={handleOpenNewTab} data-testid="button-open-tab"
                  variant="outline" className="w-full md:w-auto border-st-teal/20 text-st-teal hover:border-st-teal/50">
                  <ExternalLink className="w-4 h-4 mr-1" /> Open in Tab
                </Button>
                <Button size="sm" onClick={handleDownload} data-testid="button-download-resume"
                  className="w-full md:w-auto bg-st-red hover:bg-st-red/80 text-white hover:shadow-[0_0_15px_rgba(229,9,20,0.4)]">
                  <Download className="w-4 h-4 mr-1" /> Download PDF
                </Button>
              </div>

              <div className="text-center mb-4" data-testid="zoom-indicator">
                <span className="text-sm text-muted-foreground font-retro">
                  Zoom: <span className="text-st-red font-semibold" data-testid="zoom-level">{zoom}%</span>
                </span>
              </div>

              <div id="resume-container"
                className="relative w-full overflow-auto rounded-lg border border-st-red/15 bg-[#0a0a0a]"
                style={{ height: isFullscreen ? "100vh" : "600px", maxHeight: isFullscreen ? "100vh" : "80vh" }}>
                <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center", width: `${10000 / zoom}%`, minHeight: "100%" }}>
                  <iframe ref={iframeRef} src="/resume.pdf" className="w-full h-full min-h-[600px]" title="Resume PDF"
                    data-testid="resume-iframe" style={{ border: "none", minHeight: isFullscreen ? "100vh" : "600px" }} />
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground font-retro">
                  Can't see the resume?{" "}
                  <button onClick={handleDownload} className="text-st-red hover:underline" data-testid="link-fallback-download">
                    Download it directly
                  </button>
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            {[
              { label: "CGPA", value: "8.27" },
              { label: "Projects", value: "6+" },
              { label: "Skills", value: "15+" },
              { label: "Certifications", value: "4+" },
            ].map((stat) => (
              <Card key={stat.label}
                className="p-4 text-center bg-[#111]/40 backdrop-blur border border-st-red/15 hover:border-st-red/40 transition-all st-portal-hover"
                data-testid={`stat-card-${stat.label.toLowerCase()}`}>
                <div className="text-3xl font-display font-bold text-st-red mb-1" data-testid={`stat-value-${stat.label.toLowerCase()}`}
                  style={{ textShadow: "0 0 8px rgba(229,9,20,0.3)" }}>
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-retro tracking-wider uppercase" data-testid={`stat-label-${stat.label.toLowerCase()}`}>
                  {stat.label}
                </div>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
