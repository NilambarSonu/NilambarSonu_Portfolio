import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Marquee from "react-fast-marquee";
import { IconType } from "react-icons"; 
import {
  SiPython, SiC, SiTypescript, SiReact, SiNumpy, SiPandas, 
  SiScikitlearn, SiSqlite, SiHtml5, SiGit, SiVercel, 
  SiGithub, 
  SiArduino, SiEspressif, SiNextdotjs, SiJavascript
} from "react-icons/si";

// --- Skill Data ---
const coreLangs = [
  { name: "Python", icon: SiPython, color: "text-yellow-400" },
  { name: "C", icon: SiC, color: "text-blue-600" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
  { name: "HTML/CSS", icon: SiHtml5, color: "text-orange-500" },
];

const webTech = [
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "NumPy", icon: SiNumpy, color: "text-cyan-500" },
  { name: "Pandas", icon: SiPandas, color: "text-blue-500" },
  { name: "Scikit-learn", icon: SiScikitlearn, color: "text-orange-500" },
  { name: "SQLite", icon: SiSqlite, color: "text-cyan-700" },
];

const tools = [
  { name: "Git", icon: SiGit, color: "text-orange-600" },
  { name: "GitHub", icon: SiGithub, color: "text-gray-200" },
  { name: "Vercel", icon: SiVercel, color: "text-white" },
  { name: "Arduino", icon: SiArduino, color: "text-teal-500" },
  { name: "ESP32", icon: SiEspressif, color: "text-red-600" },
];

interface SkillCardProps {
  icon: IconType;
  name: string;
  color: string;
}

const SkillCard = ({ icon: Icon, name, color }: SkillCardProps) => (
  <div className="flex items-center justify-center gap-3 py-4 px-6 mx-4 border rounded-lg 
                  bg-card/30 border-card-border min-w-[200px]
                  hover:border-primary/80 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)] transition-all">
    <Icon className={`w-8 h-8 ${color}`} />
    <span className="text-lg font-semibold text-foreground">{name}</span>
  </div>
);

// --- Main Component ---
export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-4 bg-background"
      id="skills"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* --- Title --- */}
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center 
                         bg-gradient-to-r from-secondary via-accent to-primary 
                         bg-clip-text text-transparent">
            Skills & Technologies
          </h2>

          {/* --- Marquee Rows --- */}
          <div className="space-y-6">
            <Marquee pauseOnHover={true} speed={40} gradient={true} gradientColor="#0a0a0a" gradientWidth={100}>
              {coreLangs.map((skill) => (
                <SkillCard key={skill.name} icon={skill.icon} name={skill.name} color={skill.color} />
              ))}
            </Marquee>
            
            <Marquee pauseOnHover={true} speed={40} direction="right" gradient={true} gradientColor="#0a0a0a" gradientWidth={100}>
              {webTech.map((skill) => (
                <SkillCard key={skill.name} icon={skill.icon} name={skill.name} color={skill.color} />
              ))}
            </Marquee>

            <Marquee pauseOnHover={true} speed={40} gradient={true} gradientColor="#0a0a0a" gradientWidth={100}>
              {tools.map((skill) => (
                <SkillCard key={skill.name} icon={skill.icon} name={skill.name} color={skill.color} />
              ))}
            </Marquee>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}