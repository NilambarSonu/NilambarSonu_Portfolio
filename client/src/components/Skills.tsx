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

const coreLangs = [
  { name: "Python", icon: SiPython, color: "text-st-amber" },
  { name: "C", icon: SiC, color: "text-st-teal" },
  { name: "JavaScript", icon: SiJavascript, color: "text-st-amber" },
  { name: "TypeScript", icon: SiTypescript, color: "text-st-teal" },
  { name: "HTML/CSS", icon: SiHtml5, color: "text-st-red" },
];

const webTech = [
  { name: "React", icon: SiReact, color: "text-st-teal" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-foreground" },
  { name: "NumPy", icon: SiNumpy, color: "text-st-teal" },
  { name: "Pandas", icon: SiPandas, color: "text-st-amber" },
  { name: "Scikit-learn", icon: SiScikitlearn, color: "text-st-red" },
  { name: "SQLite", icon: SiSqlite, color: "text-st-teal" },
];

const tools = [
  { name: "Git", icon: SiGit, color: "text-st-red" },
  { name: "GitHub", icon: SiGithub, color: "text-foreground" },
  { name: "Vercel", icon: SiVercel, color: "text-foreground" },
  { name: "Arduino", icon: SiArduino, color: "text-st-teal" },
  { name: "ESP32", icon: SiEspressif, color: "text-st-red" },
];

interface SkillCardProps {
  icon: IconType;
  name: string;
  color: string;
}

const SkillCard = ({ icon: Icon, name, color }: SkillCardProps) => (
  <div className="flex items-center justify-center gap-3 py-4 px-6 mx-4 border rounded-lg 
                  bg-[#111]/50 border-st-red/15 min-w-[200px]
                  hover:border-st-red/50 hover:shadow-[0_0_15px_rgba(229,9,20,0.15)] transition-all duration-300">
    <Icon className={`w-8 h-8 ${color}`} />
    <span className="text-base font-semibold text-foreground/80 font-retro tracking-wider">{name}</span>
  </div>
);

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-4 bg-[#0a0a0a]"
      id="skills"
    >
      {/* Red top border */}
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-st-red/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-st-red tracking-[0.1em] uppercase"
            style={{
              textShadow: "0 0 10px rgba(229,9,20,0.4), 0 0 30px rgba(229,9,20,0.15)",
            }}
          >
            Skills & Technologies
          </h2>

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