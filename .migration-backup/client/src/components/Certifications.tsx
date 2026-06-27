import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  logo?: string;
}

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps"
  }, [Autoplay({ delay: 3000, stopOnInteraction: true })]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const certifications: Certification[] = [
    {
      title: "Python for Data Science",
      issuer: "IBM",
      date: "2023",
      url: "https://www.coursera.org/account/accomplishments/verify/XYZ123"
    },
    {
      title: "Machine Learning",
      issuer: "Stanford University (Coursera)",
      date: "2023",
      url: "https://www.coursera.org/account/accomplishments/verify/ABC456"
    },
    {
      title: "Full Stack Web Development",
      issuer: "freeCodeCamp",
      date: "2022",
      url: "https://www.freecodecamp.org/certification/fcc123"
    },
    {
      title: "React - The Complete Guide",
      issuer: "Udemy",
      date: "2023",
      url: "https://www.udemy.com/certificate/UC-XYZ789"
    },
    {
      title: "Data Structures and Algorithms",
      issuer: "GeeksforGeeks",
      date: "2023",
      url: "https://www.geeksforgeeks.org/certificate/verify/XYZ123"
    },
    {
      title: "Introduction to Artificial Intelligence",
      issuer: "LinkedIn Learning",
      date: "2024",
      url: "#"
    }
  ];

  return (
    <section ref={ref} className="relative py-20 px-4 bg-background transition-colors duration-500" id="certifications">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center justify-between mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-center bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              Certifications
            </h2>
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                className="rounded-full border-primary/20 hover:bg-primary/10 hover:border-primary/50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                className="rounded-full border-primary/20 hover:bg-primary/10 hover:border-primary/50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full p-6 bg-card/50 backdrop-blur border-card-border hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] flex flex-col justify-between min-h-[220px]">
                      <div>
                        <div className="mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-3xl">
                            📜
                          </div>
                        </div>
                        <h3 className="text-lg font-display font-bold mb-1 text-foreground line-clamp-2">
                          {cert.title}
                        </h3>
                        <p className="text-sm font-medium text-primary mb-2">
                          {cert.issuer}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 border-t border-border/50 pt-4">
                        <span className="text-xs text-muted-foreground">{cert.date}</span>
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                          >
                            Verify <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}