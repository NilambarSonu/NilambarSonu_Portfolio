import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-background/80 backdrop-blur-lg${
          isScrolled
            ? "border-b border-border shadow-lg"
            : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
<div className="flex items-center justify-between h-16">
  <motion.button
    onClick={() => scrollToSection("home")}
    className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    data-testid="link-logo"
  >
    NB
  </motion.button>

  <div className="hidden md:flex items-center gap-8">
    {navItems.map((item) => (
      <button
        key={item.id}
        onClick={() => scrollToSection(item.id)}
        className="relative text-foreground/80 hover:text-foreground transition-colors font-body"
        data-testid={`link-${item.id}`}
      >
        {item.label}
        {activeSection === item.id && (
          <motion.div
            layoutId="activeSection"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
          />
        )}
      </button>
    ))}
  </div>

  <div className="flex items-center gap-4">
    <ThemeToggle />
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden text-foreground"
      data-testid="button-menu-toggle"
    >
      {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </Button>
  </div>
</div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-16 right-0 bottom-0 w-64 bg-card/95 backdrop-blur-lg border-l border-border z-40 md:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-3 px-4 rounded-lg transition-all ${
                    activeSection === item.id
                      ? "bg-primary/20 text-primary font-semibold"
                      : "text-foreground/80 hover:bg-muted hover:text-foreground"
                  }`}
                  data-testid={`mobile-link-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
