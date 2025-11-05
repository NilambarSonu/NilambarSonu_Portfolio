import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, MessageCircle, Github, Linkedin, Twitter } from "lucide-react";
import { SiWhatsapp, SiTelegram, SiInstagram, SiFacebook } from "react-icons/si";
import axios from "axios"; 

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const API_URL = "/api/send"; 

    try {
      const response = await axios.post(API_URL, formData);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Oh no! Something went wrong.",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: SiWhatsapp,
      href: "https://api.whatsapp.com/send/?phone=7205095602&text=Hello+There%21+I+Am+From+Your+Portfolio+Web&type=phone_number&app_absent=0",
      color: "text-green-500"
    },
    {
      name: "Telegram",
      icon: SiTelegram,
      href: "https://t.me/Nilambarbehera",
      color: "text-blue-500"
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:nilambarsonubehera@gmail.com", 
      color: "text-primary"
    }
  ];
  const otherSocials = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/NilambarSonu",
      color: "hover:text-white" 
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/nilambarsonu-behera-37ba0036a/", 
      color: "hover:text-blue-500"
    },
    {
      name: "Instagram",
      icon: SiInstagram,
      href: "https://www.instagram.com/ramamanibehera001/", 
      color: "hover:text-pink-500" 
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://x.com/NilambarBeher?s=08", 
      color: "hover:text-blue-400"
    },
    {
      name: "Facebook",
      icon: SiFacebook,
      href: "https://www.facebook.com/share/16o7JTxTWW/",
      color: "hover:text-blue-600"
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-background to-muted/30"
      id="contact"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Feel free to reach out through any of the following platforms or send me a message
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* --- Form Column --- */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-8 bg-card/50 backdrop-blur border-card-border">
                <h3 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2 text-primary">
                  <Send className="w-6 h-6" />
                  Send a Message
                </h3>
                {/* ... (Your form code remains the same) ... */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      data-testid="input-name"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      data-testid="input-email"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      disabled={isSubmitting}
                      data-testid="input-message"
                      className="bg-background/50 border-border focus:border-primary resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    data-testid="button-submit-contact"
                    className="w-full bg-primary hover:shadow-[0_0_20px_rgba(0,255,25F,0.4)]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* --- Social Column --- */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2 text-accent">
                <MessageCircle className="w-6 h-6" />
                Connect on Social
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    {/* --- 2. REDUCED PADDING HERE (p-4 from p-6) --- */}
                    <Card className="p-4 bg-card/30 backdrop-blur border-card-border hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 group"
                        data-testid={`link-${social.name.toLowerCase()}`}
                      >
                        <div className={`p-3 rounded-lg bg-background/50 ${social.color} group-hover:shadow-[0_0_15px_currentColor] transition-shadow`}>
                          <social.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {social.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Connect via {social.name}
                          </p>
                        </div>
                      </a>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* --- 3. MOVED THIS SECTION INSIDE THE COLUMN --- */}
              <motion.div
                className="mt-4 pt-3 border-t border-card-border/50" 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex justify-center gap-4">
                  {otherSocials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`p-3 bg-card/30 rounded-full text-muted-foreground ${social.color} hover:shadow-[0_0_15px_currentColor] transition-all`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </motion.div>
              {/* --- END OF MOVED SECTION --- */}

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}