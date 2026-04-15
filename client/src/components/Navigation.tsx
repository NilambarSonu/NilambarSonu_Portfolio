import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-st-red/20 shadow-[0_2px_20px_rgba(229,9,20,0.1)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo with red neon flicker */}
            <motion.button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-display font-bold text-st-red tracking-[0.15em] uppercase"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="link-logo"
              style={{
                textShadow: "0 0 10px rgba(229,9,20,0.6), 0 0 20px rgba(229,9,20,0.3)",
              }}
            >
              <span className="animate-st-flicker">NB</span>
            </motion.button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-sm font-retro tracking-[0.15em] uppercase transition-colors group"
                  data-testid={`link-${item.id}`}
                  style={{
                    color: activeSection === item.id ? "#e50914" : "rgba(255,255,255,0.5)",
                  }}
                >
                  <span className="group-hover:text-st-red transition-colors duration-300">
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-st-red"
                      style={{
                        boxShadow: "0 0 8px rgba(229,9,20,0.6), 0 0 16px rgba(229,9,20,0.3)",
                      }}
                    />
                  )}
                  {/* Hover glow line */}
                  <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-st-red/0 group-hover:bg-st-red/40 transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-st-red hover:bg-st-red/10"
              data-testid="button-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — Upside Down portal slide */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-16 right-0 bottom-0 w-72 bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-st-red/20 z-40 md:hidden"
            data-testid="mobile-menu"
          >
            {/* Red fog effect in mobile menu */}
            <div className="absolute inset-0 bg-gradient-to-b from-st-red/5 to-transparent pointer-events-none" />
            
            <div className="flex flex-col p-6 gap-2 relative z-10">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-left py-3 px-4 rounded-lg transition-all font-retro tracking-[0.15em] uppercase text-sm ${
                    activeSection === item.id
                      ? "bg-st-red/15 text-st-red border border-st-red/30"
                      : "text-white/50 hover:bg-st-red/5 hover:text-st-red/80"
                  }`}
                  data-testid={`mobile-link-${item.id}`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-st-red/30 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
