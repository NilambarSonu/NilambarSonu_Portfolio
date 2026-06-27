import profilePlaceholder from "@assets/generated_images/Profile_photo_placeholder_dfc6967d.png";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileOverlay() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Nilambar_Behera_Resume.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <div className="relative -translate-y-8 flex flex-col items-center pointer-events-auto">
        
        {/* Profile Circle */}
        <motion.div
           className="relative mb-6 inline-block"
           whileHover={{ scale: 1.05 }}
           transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute inset-[-4px] rounded-full profile-pulse-border blur-md opacity-80" />
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#0a0808] z-10">
            <img
              src={profilePlaceholder}
              alt="NilambarSonu"
              className="w-full h-full object-cover grayscale-[30%] contrast-125"
            />
          </div>
        </motion.div>

        {/* Name Rectangle */}
        <div className="bg-[#0a0808]/90 px-8 py-3 border border-neutral-800/80 backdrop-blur-md z-10 pointer-events-auto shadow-2xl">
          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-[0.2em] upside-down-text uppercase" 
              style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            NilambarSonu
          </h1>
        </div>

        {/* Action Buttons Preserved */}
        <div className="mt-8 flex flex-col items-center pointer-events-auto z-10 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#e50914]/30 to-[#1e3a5f]/30 blur-xl rounded-lg" />
            <Button
              size="lg"
              asChild
              className="group relative overflow-hidden bg-neutral-900 border border-neutral-800 text-white hover:border-[#e50914]/60 hover:shadow-[0_0_30px_rgba(229,9,20,0.3)] hover:scale-105 transition-all duration-300 px-8 py-4 h-14"
            >
              <a href="https://saathiai.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <span className="mr-3 text-2xl">🌱</span>
                <span className="font-bold tracking-wide">Saathi AI</span>
                <span className="mx-3 text-[#e50914]/80">—</span>
                <span className="text-sm font-medium text-neutral-300">AI for Agriculture</span>
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={handleViewProjects}
              className="group relative overflow-hidden bg-white text-black hover:bg-neutral-200 hover:scale-105 transition-all duration-300 font-bold tracking-wide"
            >
              View Projects
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleDownload}
              className="group relative overflow-hidden border-2 border-neutral-800 bg-[#0a0808]/50 text-neutral-300 hover:bg-neutral-800 hover:text-white hover:border-neutral-600 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="relative flex items-center gap-2">
                <Download className="h-4 w-4" />
                Resume
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
