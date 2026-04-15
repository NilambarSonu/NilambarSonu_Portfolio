import { motion } from "framer-motion";
import { Heart, Code } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-st-red/10 py-12 px-4">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-st-red/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-foreground/60 font-retro text-sm tracking-wider"
          >
            <span>Made with</span>
            <Heart className="w-4 h-4 text-st-red fill-st-red animate-pulse" />
            <span>One Plate Biriyani and</span>
            <Code className="w-4 h-4 text-st-amber" />
            <span>by NilambarSonu</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex gap-6"
          >
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-st-red transition-colors font-retro tracking-wider uppercase"
                data-testid={`footer-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground/50 font-retro tracking-wider">
            © {currentYear} Nilambar Behera — Built in Hawkins... err, Odisha, India 🔴
          </p>
          <div className="mt-3 flex justify-center">
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-st-red/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
