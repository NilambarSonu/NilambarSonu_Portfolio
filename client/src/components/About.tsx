import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Zap } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

const skills = [
  "HTML-CSS-JS", "Python for Data Science", "ReactJS", "Data Analysis",
  "Web Development", "SQL", "Git & GitHub", "Problem Solving",
  "Critical Thinking", "Mathematics-Statistics"
];

const education = [
  {
    degree: "10th",
    school: "Sanpatpur Nodal High School",
    board: "CHSE",
    percentage: "88.66%",
    year: "Completed"
  },
  {
    degree: "12th",
    school: "Nilgiri Higher Secondary School",
    board: "CHSE, Science",
    percentage: "83.33%",
    year: "Completed"
  },
  {
    degree: "BCA",
    school: "Bhadrak Autonomous College",
    board: "Currently at College",
    percentage: "",
    year: "Expected 2027"
  }
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const educationColumnRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: educationColumnRef,
    offset: ["start end", "end start"],
  });

  // Climber moves bottom → top as user scrolls through the education section
  const boyY = useTransform(scrollYProgress, [0.1, 0.9], ["85%", "5%"]);
  const bubbleOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 bg-[#0a0a0a] st-fog"
      id="about"
    >
      {/* Subtle red line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-st-red/20 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title — ST style */}
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-st-red tracking-[0.1em] uppercase"
            style={{
              textShadow: "0 0 10px rgba(229,9,20,0.4), 0 0 30px rgba(229,9,20,0.15)",
            }}
          >
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Bio with typewriter */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Classified stamp */}
              <div className="absolute -top-2 -right-2 font-retro text-[10px] text-st-red/30 tracking-[0.3em] uppercase transform rotate-6">
                CLASSIFIED
              </div>

              <Card className="p-6 bg-[#111]/50 border border-st-red/15 backdrop-blur">
                <TypeAnimation
                  sequence={[
                    'I am a BCA student with a passion for data science and web development. I have completed certifications like "Python for Data Science and AI" by IBM, which has equipped me with the skills to analyze data and build web applications.',
                    1000,
                    'I am a BCA student with a passion for data science and web development. I have completed certifications like "Python for Data Science and AI" by IBM, which has equipped me with the skills to analyze data and build web applications.\n\nI enjoy working on real-world projects using Python, HTML, CSS, and JavaScript. My goal is to become a data scientist in the future, and I am continuously learning and improving my skills to achieve that.',
                  ]}
                  wrapper="p"
                  speed={60}
                  className="text-base text-foreground/80 leading-relaxed whitespace-pre-line font-mono"
                  repeat={0}
                  cursor={true}
                />
              </Card>
            </motion.div>

            {/* Skills — Power badges */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2 text-st-amber tracking-wider uppercase text-lg">
                <Zap className="w-5 h-5" />
                Powers & Abilities
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
                  >
                    <Badge
                      className="text-sm px-4 py-2 bg-st-red/10 text-st-red/90 border border-st-red/30 hover:bg-st-red/20 hover:shadow-[0_0_15px_rgba(229,9,20,0.3)] hover:border-st-red/60 transition-all duration-300 font-retro"
                      data-testid={`skill-${index}`}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Education Timeline — Hawkins Lab classified documents */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-8 flex items-center gap-2 text-st-teal tracking-wider uppercase text-lg"
              style={{
                textShadow: "0 0 10px rgba(26,107,107,0.3)",
              }}
            >
              <GraduationCap className="w-6 h-6" />
              Subject Files — Education
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" ref={educationColumnRef}>
              {/* ── RED LADDER + CLIMBING MAN ── */}
              <div className="relative hidden md:flex md:col-span-1 items-start justify-center h-80">
                <div className="relative mt-4 h-full w-20">

                  {/* Left rail */}
                  <div className="absolute left-2 top-0 h-full w-[3px] rounded-full"
                    style={{ background: "linear-gradient(to bottom, #e50914cc, #7f0a0acc)" }} />

                  {/* Right rail */}
                  <div className="absolute right-2 top-0 h-full w-[3px] rounded-full"
                    style={{ background: "linear-gradient(to bottom, #e50914cc, #7f0a0acc)" }} />

                  {/* Rungs — evenly spaced */}
                  <div className="absolute inset-x-2 top-0 flex h-full flex-col justify-between py-6">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-[3px] w-full rounded-full"
                        style={{
                          background: "rgba(229,9,20,0.45)",
                          boxShadow: "0 0 6px rgba(229,9,20,0.3)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Glow behind ladder */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at center, rgba(229,9,20,0.08) 0%, transparent 70%)",
                    }}
                  />

                  {/* ── CLIMBER ── */}
                  <motion.div
                    className="absolute left-1/2 h-16 w-16"
                    style={{ y: boyY, x: "-50%" }}
                  >
                    <motion.svg
                      viewBox="0 0 40 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
                      style={{ filter: "drop-shadow(0 0 8px rgba(229,9,20,0.8))" }}
                    >
                      {/* Head */}
                      <circle cx="20" cy="7" r="5" fill="#e50914" />

                      {/* Body */}
                      <rect x="15" y="14" width="10" height="13" rx="3" fill="#e50914" />

                      {/* Left arm — reaches up then down */}
                      <motion.rect
                        x="9" y="14" width="4" height="9" rx="2" fill="#b00710"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
                      />

                      {/* Right arm — opposite phase */}
                      <motion.rect
                        x="27" y="14" width="4" height="9" rx="2" fill="#b00710"
                        animate={{ y: [-5, 0, -5] }}
                        transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
                      />

                      {/* Left leg */}
                      <motion.rect
                        x="13" y="25" width="5" height="10" rx="2" fill="#7f0a0a"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut", delay: 0.5 }}
                      />

                      {/* Right leg — opposite phase */}
                      <motion.rect
                        x="22" y="25" width="5" height="10" rx="2" fill="#7f0a0a"
                        animate={{ y: [-4, 0, -4] }}
                        transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut", delay: 0.5 }}
                      />
                    </motion.svg>

                    {/* Speech bubble — appears near top */}
                    <motion.div
                      className="absolute bottom-full left-full mb-1 ml-1 w-36"
                      style={{ opacity: bubbleOpacity }}
                    >
                      <div
                        className="relative rounded-xl px-3 py-2 text-xs font-retro"
                        style={{
                          background: "rgba(10,0,0,0.85)",
                          border: "1px solid rgba(229,9,20,0.4)",
                          color: "rgba(255,255,255,0.85)",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        Almost at the top!
                      </div>
                    </motion.div>
                  </motion.div>

                </div>
              </div>

              {/* Education cards */}
              <div className="md:col-span-2 space-y-4">
                {[...education].reverse().map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <Card className="p-5 bg-[#111]/60 backdrop-blur border border-st-red/15 hover:border-st-red/40 transition-all relative group st-portal-hover">
                      {/* File number */}
                      <div className="absolute top-2 right-3 font-retro text-[10px] text-st-red/25 tracking-wider">
                        FILE #{String(index + 1).padStart(3, "0")}
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-2.5 h-2.5 rounded-full mt-2 bg-st-red/50 shadow-[0_0_8px_rgba(229,9,20,0.4)] group-hover:bg-st-red group-hover:shadow-[0_0_12px_rgba(229,9,20,0.6)] transition-all" />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h4 className="text-xl font-display font-semibold text-foreground tracking-wide">
                              {edu.degree}
                            </h4>
                            <span className="text-xs text-st-amber/60 font-retro tracking-wider uppercase">
                              {edu.year}
                            </span>
                          </div>
                          <p className="text-foreground/70 mb-1 font-mono text-sm">{edu.school}</p>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span className="font-retro">{edu.board}</span>
                            {edu.percentage && (
                              <>
                                <span>•</span>
                                <span className="text-st-red font-semibold">{edu.percentage}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}