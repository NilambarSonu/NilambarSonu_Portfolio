import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Sections where the nav should be completely hidden (full-bleed Figma designs)
  const hiddenOnSections = ["skills", "achievements"];
  const hideNav = hiddenOnSections.includes(activeSection);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          // Fade out nav completely on sections that use full-bleed Figma designs
          opacity: hideNav ? 0 : 1,
          pointerEvents: hideNav ? "none" : "auto",
          transition: "opacity 0.4s ease",
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0D1424]/90 backdrop-blur-xl border-b border-[#1A2740] shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Minimalist Logo */}
            <motion.button
              onClick={() => scrollToSection("home")}
              className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="link-logo"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00BFFF] shadow-[0_0_10px_#00BFFF]" />
              <span className="font-sans font-extrabold tracking-wider">NB</span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-xs font-semibold tracking-widest uppercase transition-colors group py-1"
                  data-testid={`link-${item.id}`}
                  style={{
                    color: activeSection === item.id ? "#00BFFF" : "rgba(245,247,250,0.55)",
                  }}
                >
                  <span className="group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#00BFFF] shadow-[0_0_8px_#00BFFF]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-neutral-300 hover:text-white hover:bg-[#1A2740]/40"
              data-testid="button-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 right-0 left-0 bg-[#0D1424]/98 backdrop-blur-2xl border-b border-[#1A2740] z-40 md:hidden shadow-2xl"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col p-6 gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`text-left py-3 px-4 rounded-lg transition-all font-semibold tracking-wider uppercase text-xs ${
                    activeSection === item.id
                      ? "bg-[#1A2740] text-[#00BFFF] border border-[#00BFFF]/20"
                      : "text-neutral-400 hover:bg-[#1A2740]/50 hover:text-white"
                  }`}
                  data-testid={`mobile-link-${item.id}`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
