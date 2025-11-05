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
    
    toast({
      title: "Download Started",
      description: "Your resume is downloading...",
    });
  };

  const handleOpenNewTab = () => {
    window.open("/resume.pdf", "_blank");
  };

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(prev => Math.min(prev + 10, 200));
    }
  };

  const handleZoomOut = () => {
    if (zoom > 50) {
      setZoom(prev => Math.max(prev - 10, 50));
    }
  };

  const handleFullscreen = () => {
    const container = document.getElementById("resume-container");
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        toast({
          title: "Fullscreen Error",
          description: "Unable to enter fullscreen mode",
          variant: "destructive",
        });
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 px-4 bg-gradient-to-br from-purple-950/20 via-background to-purple-900/10"
      id="resume"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            My Resume
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            View and download my latest resume
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-4 md:p-6 bg-card/50 backdrop-blur border-card-border">
              {/* Control Buttons */}
              <div className="flex flex-col md:flex-row md:flex-wrap gap-2 mb-4">
                <Button
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoom <= 50}
                  data-testid="button-zoom-out"
                  variant="outline"
                  className="w-full md:w-auto border-primary/30"
                >
                  <ZoomOut className="w-4 h-4 mr-1" />
                  Zoom Out
                </Button>
                <Button
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoom >= 200}
                  data-testid="button-zoom-in"
                  variant="outline"
                  className="w-full md:w-auto border-primary/30"
                >
                  <ZoomIn className="w-4 h-4 mr-1" />
                  Zoom In
                </Button>
                <Button
                  size="sm"
                  onClick={handleFullscreen}
                  data-testid="button-fullscreen"
                  variant="outline"
                  className="w-full md:w-auto border-secondary/30"
                >
                  <Maximize2 className="w-4 h-4 mr-1" />
                  Fullscreen
                </Button>
                <Button
                  size="sm"
                  onClick={handleOpenNewTab}
                  data-testid="button-open-tab"
                  variant="outline"
                  className="w-full md:w-auto border-accent/30"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Open in Tab
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  data-testid="button-download-resume"
                  className="w-full md:w-auto"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download PDF
                </Button>
              </div>

              {/* Zoom Level Indicator */}
              <div className="text-center mb-4" data-testid="zoom-indicator">
                <span className="text-sm text-muted-foreground">
                  Zoom: <span className="text-primary font-semibold" data-testid="zoom-level">{zoom}%</span>
                </span>
              </div>

              {/* PDF Viewer Container */}
              <div
                id="resume-container"
                className="relative w-full overflow-auto rounded-lg border-2 border-border bg-background shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                style={{
                  height: isFullscreen ? "100vh" : "600px",
                  maxHeight: isFullscreen ? "100vh" : "80vh",
                }}
              >
                <div
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top center",
                    width: `${10000 / zoom}%`,
                    minHeight: "100%",
                  }}
                >
                  <iframe
                    ref={iframeRef}
                    src="/resume.pdf"
                    className="w-full h-full min-h-[600px]"
                    title="Resume PDF"
                    data-testid="resume-iframe"
                    style={{
                      border: "none",
                      minHeight: isFullscreen ? "100vh" : "600px",
                    }}
                  />
                </div>
              </div>

              {/* Fallback Message */}
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Can't see the resume?{" "}
                  <button
                    onClick={handleDownload}
                    className="text-primary hover:underline"
                    data-testid="link-fallback-download"
                  >
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
            ].map((stat, index) => (
              <Card
                key={stat.label}
                className="p-4 text-center bg-card/30 backdrop-blur border-card-border hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.1)]"
                data-testid={`stat-card-${stat.label.toLowerCase()}`}
              >
                <div className="text-3xl font-display font-bold text-primary mb-1" data-testid={`stat-value-${stat.label.toLowerCase()}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground" data-testid={`stat-label-${stat.label.toLowerCase()}`}>{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
