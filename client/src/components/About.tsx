// --- 1. UPDATED IMPORTS ---
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef } from "react"; 
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, MessageSquare } from "lucide-react";
import { TypeAnimation } from "react-type-animation"; // --- 1. IMPORTED THE TYPEWRITER ---

// --- Data (moved outside component for clarity) ---
const skills = [
  "HTML-CSS-JS", "Python for Data Science", "ReactJS", "Data Analysis",
  "Web Development", "SQL", "Git & GitHub", "Problem Solving",
  "Critical Thinking", "Mathematics-Statistics"
];

const education = [
  {
    degree: "BCA",
    school: "Bhadrak Autonomous College",
    board: "Currently at College",
    percentage: "",
    year: "Expected 2027"
  },
  {
    degree: "12th",
    school: "Nilgiri Higher Secondary School",
    board: "CHSE, Science",
    percentage: "83.33%",
    year: "Completed"
  },
  {
    degree: "10th",
    school: "Sanpatpur Nodal High School",
    board: "CHSE",
    percentage: "88.66%",
    year: "Completed"
  }
];

// --- NEW LADDER RUNG COMPONENT ---
const LadderRung = () => (
  <div className="h-1 w-full bg-primary/30 rounded-full" />
);

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const educationColumnRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: educationColumnRef,
    offset: ["start end", "end start"],
  });

  const boyY = useTransform(scrollYProgress, [0.1, 0.9], ["90%", "10%"]); 
  const bubbleOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

  return (
    <section
      ref={sectionRef} 
      className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-background to-muted/30"
      id="about"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* --- ABOUT ME & SKILLS --- */}
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* --- 2. REPLACED STATIC <p> TAGS WITH THIS --- */}
              <TypeAnimation
                sequence={[
                  // Your text, split by a pause
                  'I am a BCA student with a passion for data science and web development. I have completed certifications like "Python for Data Science and AI" by IBM, which has equipped me with the skills to analyze data and build web applications.',
                  1000, // Pause for 1 second
                  'I am a BCA student with a passion for data science and web development. I have completed certifications like "Python for Data Science and AI" by IBM, which has equipped me with the skills to analyze data and build web applications.\n\nI enjoy working on real-world projects using Python, HTML, CSS, and JavaScript. My goal is to become a data scientist in the future, and I am continuously learning and improving my skills to achieve that.',
                ]}
                wrapper="p"
                speed={60} // Typing speed
                className="text-lg text-foreground/90 leading-relaxed whitespace-pre-line" // 'whitespace-pre-line' respects the \n\n for a new paragraph
                repeat={0} // Type only once
                cursor={true}
              />
              {/* --- END OF REPLACEMENT --- */}

            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2 text-primary">
                <Award className="w-6 h-6" />
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <Badge
                      className="text-sm px-4 py-2 bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                      data-testid={`skill-${index}`}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* --- EDUCATION TIMELINE (No Changes) --- */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-8 flex items-center gap-2 text-accent">
              <GraduationCap className="w-6 h-6" />
              Education Timeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="relative hidden md:flex md:col-span-1 h-96 mt-16">
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-16 flex flex-col justify-between">
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary/30 rounded-full" />
                  <div className="absolute top-0 bottom-0 right-0 w-1 bg-primary/30 rounded-full" />
                  <div className="h-full flex flex-col justify-between py-10">
                    <LadderRung /> <LadderRung /> <LadderRung /> <LadderRung /> <LadderRung /> <LadderRung /> <LadderRung />
                  </div>
                </div>

                <motion.div
                  className="absolute left-1/2 w-16 h-16 text-primary"
                  style={{ y: boyY, x: "-50%" }}
                >
                  <motion.svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" 
                    className="w-full h-full drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]"
                  >
                    <motion.circle cx="20" cy="10" r="5" fill="currentColor" />
                    <motion.rect x="15" y="17" width="10" height="15" rx="3" fill="currentColor"/>
                    <motion.rect x="13" y="30" width="4" height="8" rx="2" fill="white"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    />
                    <motion.rect x="23" y="30" width="4" height="8" rx="2" fill="white"
                      animate={{ y: [-4, 0, -4] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    />
                    <motion.rect x="10" y="19" width="4" height="8" rx="2" fill="currentColor"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.5 }}
                    />
                    <motion.rect x="26" y="19" width="4" height="8" rx="2" fill="currentColor"
                      animate={{ y: [-3, 0, -3] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.5 }}
                    />
                  </motion.svg>
                  
                  <motion.div
                    className="absolute bottom-full right-full mr-2 mb-2 w-48"
                    style={{ opacity: bubbleOpacity }}
                  >
                    <div className="relative bg-card p-3 rounded-lg border border-primary/50 shadow-lg">
                      <MessageSquare className="w-4 h-4 text-primary/50 absolute -bottom-2 -right-1 transform scale-x-[-1]" /> 
                      <p className="text-foreground text-sm">
                        Time is moving fast...
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <div className="md:col-span-2 space-y-6" ref={educationColumnRef}>
                {[...education].reverse().map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <Card className="p-6 bg-card/50 backdrop-blur border-card-border hover:border-primary/50 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 rounded-full mt-2 bg-primary/30 shadow-[0_0_10px_rgba(0,255,255,0.3)]" />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h4 className="text-xl font-display font-semibold text-foreground">
                              {edu.degree}
                            </h4>
                            <span className="text-sm text-muted-foreground">
                              {edu.year}
                            </span>
                          </div>
                          <p className="text-foreground/80 mb-1">{edu.school}</p>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span>{edu.board}</span>
                            {edu.percentage && (
                              <>
                                <span>•</span>
                                <span className="text-primary font-semibold">{edu.percentage}</span>
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