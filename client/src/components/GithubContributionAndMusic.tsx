import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { Github, Music } from "lucide-react";

export default function ContributionsAndMusic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const githubUsername = "NilambarSonu"; 

  const spotifyPlaylistUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1E355fVwvZDzug?utm_source=generator";

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-4 bg-background" 
      id="contributions"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* --- 1. CHANGED THIS LINE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-9 items-start">

          {/* This column now takes 3 of the 5 columns */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* --- Title --- */}
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 flex items-center justify-center lg:justify-start gap-4">
              <Github className="w-10 h-10 text-primary" />
              <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
                GitHub Contributions
              </span>
            </h2>

            {/* --- The Calendar Component --- */}
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
          </motion.div>

          {/* --- 3. CHANGED THIS LINE --- */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* --- Title --- */}
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 flex items-center justify-center lg:justify-start gap-4">
              <Music className="w-10 h-10 text-accent" />
              <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
                Coding Partner
              </span>
            </h2>

            {/* --- The Spotify Player --- */}
            <div className="rounded-lg overflow-hidden border border-card-border">
              <iframe
                style={{ borderRadius: "12px" }}
                src={spotifyPlaylistUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}