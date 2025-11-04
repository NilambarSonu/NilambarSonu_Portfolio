import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    "HTML-CSS-JS",
    "Python for Data Science",
    "Mathematics-Statistics"
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
      year: "Expected 2026"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-background to-muted/30"
      id="about"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                I am a BCA student with a passion for data science and web development. 
                I have completed certifications like "Python for Data Science and AI" by IBM, 
                which has equipped me with the skills to analyze data and build web applications.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                I enjoy working on real-world projects using Python, HTML, CSS, and JavaScript. 
                My goal is to become a data scientist in the future, and I am continuously 
                learning and improving my skills to achieve that.
              </p>
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

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-8 flex items-center gap-2 text-accent">
              <GraduationCap className="w-6 h-6" />
              Education Timeline
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.15 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur border-card-border hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
