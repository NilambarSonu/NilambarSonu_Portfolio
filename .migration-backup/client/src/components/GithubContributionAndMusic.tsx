import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { Github, Radio } from "lucide-react";
import LiveStatsDashboard from "@/components/LiveStatsDashboard";

export default function ContributionsAndMusic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const githubUsername = "NilambarSonu";

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-4 bg-[#0a0a0a]"
      id="contributions"
    >
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-st-red/15 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-9 items-stretch">
          
          {/* LEFT COLUMN: GitHub Calendar + Stats */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 flex items-center justify-center lg:justify-start gap-4">
                <Github className="w-10 h-10 text-st-red" />
                <span className="text-st-red tracking-[0.1em] uppercase"
                  style={{ textShadow: "0 0 10px rgba(229,9,20,0.4), 0 0 30px rgba(229,9,20,0.15)" }}>
                  GitHub Activity
                </span>
              </h2>

              <div className="flex justify-center p-6 bg-[#111]/50 backdrop-blur border border-st-red/15 rounded-lg overflow-x-auto">
                <GitHubCalendar
                  username={githubUsername}
                  colorScheme="dark"
                  blockSize={14}
                  fontSize={14}
                  theme={{
                    dark: ['#161616', '#3a0000', '#6b0000', '#a00000', '#e50914'],
                  }}
                />
              </div>
            </div>

            <div className="flex-grow flex flex-col justify-end w-full">
              <LiveStatsDashboard compact={true} />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Audio / Coding Vibes */}
          <motion.div
            className="lg:col-span-2 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 flex items-center justify-center lg:justify-start gap-4">
              <Radio className="w-10 h-10 text-st-amber" />
              <span className="text-st-amber tracking-[0.1em] uppercase"
                style={{ textShadow: "0 0 10px rgba(212,160,23,0.3)" }}>
                Radio Hawkins
              </span>
            </h2>

            <div className="rounded-lg overflow-hidden border border-st-red/15 flex-grow bg-[#111]/50 flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-6">
                <motion.div
                  className="w-20 h-20 rounded-full bg-st-red/10 border border-st-red/30 flex items-center justify-center mx-auto"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(229,9,20,0.2)",
                      "0 0 0 20px rgba(229,9,20,0)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Radio className="w-10 h-10 text-st-red" />
                </motion.div>
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2 tracking-wider">
                Coding Partner
              </h3>
              <p className="text-muted-foreground font-retro text-sm mb-4 max-w-xs">
                🎵 Use the floating music player (bottom right) to tune into the Stranger Things experience while browsing
              </p>
              <div className="flex items-center gap-2 text-st-red/60 text-xs font-retro tracking-wider">
                <span className="w-2 h-2 rounded-full bg-st-red animate-pulse" />
                SIGNAL ACTIVE
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
