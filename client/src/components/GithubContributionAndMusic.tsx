import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { Github, Music } from "lucide-react";
import LiveStatsDashboard from "@/components/LiveStatsDashboard";

export default function ContributionsAndMusic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const githubUsername = "NilambarSonu";

  const spotifyPlaylistUrl = "https://open.spotify.com/embed/playlist/3nBpNPEsB5cbKUlu6iHVrm?utm_source=generator"

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-4 bg-background"
      id="contributions"
    >
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-9 items-stretch">

          {/* LEFT COLUMN: GitHub Calendar + Stats */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* 1. GitHub Calendar */}
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 flex items-center justify-center lg:justify-start gap-4">
                <Github className="w-10 h-10 text-primary" />
                <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
                  GitHub Contributions
                </span>
              </h2>

              <div className="flex justify-center p-6 bg-card/30 backdrop-blur border border-card-border rounded-lg">
                <GitHubCalendar
                  username={githubUsername}
                  colorScheme="dark"
                  blockSize={14}
                  fontSize={14}
                  theme={{
                    dark: ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353'],
                  }}
                />
              </div>
            </div>

            {/* 2. Stats Dashboard (Mini) */}
            <div className="flex-grow flex flex-col justify-end w-full">
              <LiveStatsDashboard compact={true} />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Spotify */}
          <motion.div
            className="lg:col-span-2 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 flex items-center justify-center lg:justify-start gap-4">
              <Music className="w-10 h-10 text-accent" />
              <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
                Coding Partner
              </span>
            </h2>

            <div className="rounded-lg overflow-hidden border border-card-border flex-grow">
              <iframe
                style={{ borderRadius: "12px", height: "100%" }}
                src={spotifyPlaylistUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="min-h-[352px]"
              ></iframe>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
