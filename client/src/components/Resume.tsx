import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, ExternalLink, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const RESUME_URL = "/resume.pdf";

function MobileResumePage({ pdf, pageNumber }: { pdf: pdfjsLib.PDFDocumentProxy; pageNumber: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let renderTask: pdfjsLib.RenderTask | null = null;

    const renderPage = async () => {
      const canvas = canvasRef.current;
      const frame = frameRef.current;
      if (!canvas || !frame) return;

      const page = await pdf.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const targetWidth = Math.min(frame.clientWidth, 860);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const scale = targetWidth / baseViewport.width;
      const viewport = page.getViewport({ scale: scale * pixelRatio });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / pixelRatio}px`;
      canvas.style.height = `${viewport.height / pixelRatio}px`;

      const context = canvas.getContext("2d");
      if (!context || cancelled) return;
      renderTask?.cancel();
      renderTask = page.render({ canvasContext: context, viewport });

      try {
        await renderTask.promise;
      } catch (error) {
        if (!cancelled) console.warn("Resume page render cancelled", error);
      }
    };

    renderPage();
    const resizeObserver = new ResizeObserver(renderPage);
    if (frameRef.current) resizeObserver.observe(frameRef.current);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      renderTask?.cancel();
    };
  }, [pdf, pageNumber]);

  return (
    <div ref={frameRef} className="resume-mobile-page">
      <canvas ref={canvasRef} aria-label={`Resume page ${pageNumber}`} />
    </div>
  );
}

function MobileResumeViewer() {
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    let active = true;
    const loadingTask = pdfjsLib.getDocument(RESUME_URL);

    loadingTask.promise.then((document) => {
      if (!active) return;
      setPdf(document);
      setPageCount(document.numPages);
    });

    return () => {
      active = false;
      loadingTask.destroy();
    };
  }, []);

  return (
    <div className="resume-mobile-viewer" data-testid="resume-mobile-viewer">
      {!pdf && <div className="resume-mobile-loading">Rendering mobile resume preview...</div>}
      {pdf &&
        Array.from({ length: pageCount }, (_, index) => (
          <MobileResumePage key={index + 1} pdf={pdf} pageNumber={index + 1} />
        ))}
    </div>
  );
}

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
    link.href = RESUME_URL;
    link.download = "Nilambar_Behera_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Download Started", description: "Your resume is downloading..." });
  };

  const handleOpenNewTab = () => window.open(RESUME_URL, "_blank");
  const handleZoomIn = () => {
    if (zoom < 200) setZoom((prev) => Math.min(prev + 10, 200));
  };
  const handleZoomOut = () => {
    if (zoom > 50) setZoom((prev) => Math.max(prev - 10, 50));
  };

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
    <section ref={ref} className="resume-premium-section" id="resume">
      <div className="resume-bg" aria-hidden="true" />
      <div className="resume-paper-ghost" aria-hidden="true">
        <span className="line short" />
        <span className="line tiny" />
        <span className="line" />
        <span className="line" />
        <span className="line medium" />
        <span className="line" />
        <span className="line" />
        <span className="line medium" />
        <span className="line" />
        <span className="line" />
      </div>

      <div className="resume-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="resume-heading">My Resume</h2>
          <p className="resume-subtitle">View and download my latest resume</p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="resume-viewer-card">
              <div className="resume-stamp">CLASSIFIED</div>

              <div className="resume-toolbar">
                <Button size="sm" onClick={handleZoomOut} disabled={zoom <= 50} data-testid="button-zoom-out" variant="outline" className="resume-control desktop-only">
                  <ZoomOut className="w-4 h-4 mr-1" /> Zoom Out
                </Button>
                <Button size="sm" onClick={handleZoomIn} disabled={zoom >= 200} data-testid="button-zoom-in" variant="outline" className="resume-control desktop-only">
                  <ZoomIn className="w-4 h-4 mr-1" /> Zoom In
                </Button>
                <Button size="sm" onClick={handleFullscreen} data-testid="button-fullscreen" variant="outline" className="resume-control desktop-only">
                  <Maximize2 className="w-4 h-4 mr-1" /> Fullscreen
                </Button>
                <Button size="sm" onClick={handleOpenNewTab} data-testid="button-open-tab" variant="outline" className="resume-control">
                  <ExternalLink className="w-4 h-4 mr-1" /> Open in Tab
                </Button>
                <Button size="sm" onClick={handleDownload} data-testid="button-download-resume" className="resume-download" data-cursor="resume">
                  <Download className="w-4 h-4 mr-1" /> Download PDF
                </Button>
              </div>

              <div className="desktop-resume">
                <div className="resume-zoom" data-testid="zoom-indicator">
                  Zoom: <span data-testid="zoom-level">{zoom}%</span>
                </div>

                <div
                  id="resume-container"
                  className="resume-pdf-shell"
                  style={{ height: isFullscreen ? "100vh" : "600px", maxHeight: isFullscreen ? "100vh" : "80vh" }}
                >
                  <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center", width: `${10000 / zoom}%`, minHeight: "100%" }}>
                    <iframe
                      ref={iframeRef}
                      src={RESUME_URL}
                      className="w-full h-full min-h-[600px]"
                      title="Resume PDF"
                      data-testid="resume-iframe"
                      style={{ border: "none", minHeight: isFullscreen ? "100vh" : "600px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mobile-resume">
                <MobileResumeViewer />
              </div>

              <div className="resume-fallback">
                Can't see the resume?{" "}
                <button onClick={handleDownload} data-testid="link-fallback-download" data-cursor="resume">
                  Download it directly
                </button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="resume-stats"
          >
            {[
              { label: "CGPA", value: "8.27" },
              { label: "Projects", value: "10+" },
              { label: "Skills", value: "15+" },
              { label: "Certifications", value: "5+" },
            ].map((stat) => (
              <Card key={stat.label} className="resume-stat-card" data-testid={`stat-card-${stat.label.toLowerCase()}`}>
                <div className="resume-stat-value" data-testid={`stat-value-${stat.label.toLowerCase()}`}>{stat.value}</div>
                <div className="resume-stat-label" data-testid={`stat-label-${stat.label.toLowerCase()}`}>{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .resume-premium-section {
          position: relative;
          z-index: 40;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
          padding: clamp(5.5rem, 10vh, 7.5rem) 1rem clamp(6rem, 10vh, 8rem);
          background: #030913;
          color: #f5f7fa;
        }

        .resume-bg,
        .resume-bg::before,
        .resume-bg::after {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
        }

        .resume-bg {
          z-index: -6;
          background:
            radial-gradient(ellipse 30% 50% at 74% 40%, rgba(28, 72, 156, 0.18), transparent 72%),
            radial-gradient(ellipse 30% 45% at 18% 80%, rgba(0, 157, 223, 0.11), transparent 74%),
            linear-gradient(180deg, #030913 0%, #07111f 50%, #030913 100%);
        }

        .resume-bg::before {
          background:
            linear-gradient(90deg, rgba(2, 7, 16, 0.78), transparent 22%, transparent 78%, rgba(2, 7, 16, 0.78)),
            linear-gradient(180deg, rgba(2, 7, 16, 0.9), transparent 20%, transparent 80%, rgba(2, 7, 16, 0.9));
        }

        .resume-bg::after {
          opacity: 0.18;
          background-image:
            linear-gradient(rgba(31, 71, 122, 0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31, 71, 122, 0.18) 1px, transparent 1px);
          background-size: 8rem 8rem;
          mask-image: radial-gradient(circle at 50% 50%, black 0%, transparent 72%);
        }

        .resume-paper-ghost {
          position: absolute;
          left: 50%;
          top: 8vh;
          z-index: -2;
          width: min(38vw, 45rem);
          min-width: 24rem;
          height: min(78vh, 58rem);
          transform: translateX(-50%);
          border-radius: 0.8rem;
          border: 1px solid rgba(71, 113, 184, 0.14);
          background: rgba(7, 15, 29, 0.36);
          box-shadow: 0 0 80px rgba(0, 0, 0, 0.28), inset 0 0 120px rgba(0, 127, 255, 0.02);
          padding: 5.5rem 4rem;
          opacity: 0.72;
        }

        .resume-paper-ghost .line {
          display: block;
          height: 0.7rem;
          margin: 1.55rem 0;
          border-radius: 999px;
          background: rgba(123, 151, 186, 0.08);
        }

        .resume-paper-ghost .short { width: 46%; }
        .resume-paper-ghost .tiny { width: 32%; }
        .resume-paper-ghost .medium { width: 72%; }

        .resume-content {
          position: relative;
          z-index: 10;
          max-width: 90rem;
          margin: 0 auto;
        }

        .resume-heading {
          margin: 0 0 1rem;
          text-align: center;
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(2.2rem, 3.2vw, 4.2rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #00bfff;
          text-shadow: 0 0 18px rgba(0, 191, 255, 0.36), 2px 0 0 rgba(255, 32, 72, 0.42);
        }

        .resume-subtitle {
          margin: 0 auto 2.8rem;
          text-align: center;
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(1rem, 1.15vw, 1.3rem);
          color: rgba(245, 247, 250, 0.62);
        }

        .resume-viewer-card {
          position: relative;
          padding: clamp(1.1rem, 2vw, 2rem);
          border: 1px solid rgba(0, 127, 255, 0.18);
          border-radius: 0.75rem;
          background: rgba(4, 10, 20, 0.68);
          backdrop-filter: blur(18px);
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .resume-stamp {
          position: absolute;
          top: 1rem;
          right: 1.5rem;
          font-family: "Inter", sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.55em;
          color: rgba(0, 191, 255, 0.28);
        }

        .resume-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-bottom: 1.25rem;
          padding-right: 9rem;
        }

        .resume-control {
          border-color: rgba(0, 127, 255, 0.28);
          color: rgba(107, 199, 255, 0.9);
          background: rgba(0, 127, 255, 0.06);
        }

        .resume-control:hover {
          border-color: rgba(0, 191, 255, 0.58);
          color: white;
          background: rgba(0, 127, 255, 0.15);
        }

        .resume-download {
          background: #00bfff;
          color: white;
          box-shadow: 0 0 22px rgba(0, 191, 255, 0.26);
        }

        .resume-download:hover {
          background: #007fff;
          box-shadow: 0 0 30px rgba(0, 127, 255, 0.4);
        }

        .resume-zoom {
          margin: 0 0 1rem;
          text-align: center;
          font-family: "Inter", sans-serif;
          color: rgba(245, 247, 250, 0.58);
        }

        .resume-zoom span {
          color: #00bfff;
          font-weight: 700;
        }

        .resume-pdf-shell {
          position: relative;
          width: 100%;
          overflow: auto;
          border-radius: 0.5rem;
          border: 1px solid rgba(0, 127, 255, 0.16);
          background: #080c12;
        }

        .mobile-resume {
          display: none;
        }

        .resume-mobile-viewer {
          display: grid;
          gap: 1rem;
        }

        .resume-mobile-loading,
        .resume-mobile-page {
          border-radius: 0.55rem;
          border: 1px solid rgba(0, 127, 255, 0.18);
          background: rgba(3, 8, 16, 0.88);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.36);
        }

        .resume-mobile-loading {
          padding: 3rem 1rem;
          text-align: center;
          color: rgba(245, 247, 250, 0.62);
        }

        .resume-mobile-page {
          overflow: hidden;
          padding: 0.35rem;
        }

        .resume-mobile-page canvas {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 0.35rem;
          background: white;
        }

        .resume-fallback {
          margin-top: 1rem;
          text-align: center;
          font-size: 0.9rem;
          color: rgba(245, 247, 250, 0.54);
        }

        .resume-fallback button {
          color: #00bfff;
          text-decoration: underline;
          text-underline-offset: 0.2rem;
        }

        .resume-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        .resume-stat-card {
          padding: 1.1rem;
          text-align: center;
          border: 1px solid rgba(0, 127, 255, 0.16);
          background: rgba(4, 12, 24, 0.58);
          backdrop-filter: blur(12px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .resume-stat-card:hover {
          border-color: rgba(0, 191, 255, 0.42);
          box-shadow: 0 0 28px rgba(0, 127, 255, 0.16);
        }

        .resume-stat-value {
          margin-bottom: 0.25rem;
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(1.8rem, 2vw, 2.4rem);
          font-weight: 700;
          color: #00bfff;
          text-shadow: 0 0 14px rgba(0, 191, 255, 0.28);
        }

        .resume-stat-label {
          font-family: "Inter", sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(245, 247, 250, 0.52);
        }

        @media (max-width: 768px) {
          .resume-premium-section {
            padding: 4.5rem 0.9rem 5rem;
          }

          .resume-paper-ghost {
            width: 86vw;
            min-width: 0;
            height: 62vh;
            top: 8rem;
            padding: 4rem 2rem;
          }

          .resume-toolbar {
            padding-right: 0;
          }

          .resume-control,
          .resume-download {
            flex: 1 1 100%;
          }

          .desktop-only,
          .desktop-resume {
            display: none;
          }

          .mobile-resume {
            display: block;
          }

          .resume-stamp {
            display: none;
          }

          .resume-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
