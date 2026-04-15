import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, MessageCircle, Github, Linkedin, Twitter, MapPin } from "lucide-react";
import { SiWhatsapp, SiTelegram, SiInstagram, SiFacebook } from "react-icons/si";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const responseText = await response.text();
      let result;
      try { result = JSON.parse(responseText); } catch { throw new Error('Invalid response from server'); }
      if (result.success) {
        toast({ title: "Signal Sent! 📡", description: "Your message has been received. I'll get back to you from the Upside Down." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error: any) {
      toast({ title: "Signal Lost!", description: error.message || "Failed to send message. Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const socialLinks = [
    { name: "WhatsApp", icon: SiWhatsapp, href: "https://api.whatsapp.com/send/?phone=7205095602&text=Hello+There%21+I+Am+From+Your+Portfolio+Web&type=phone_number&app_absent=0", color: "text-green-500" },
    { name: "Telegram", icon: SiTelegram, href: "https://t.me/Nilambarbehera", color: "text-blue-400" },
    { name: "Email", icon: Mail, href: "mailto:nilambarsonubehera@gmail.com", color: "text-st-red" },
  ];

  const otherSocials = [
    { name: "GitHub", icon: Github, href: "https://github.com/NilambarSonu", color: "hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/nilambarsonu-behera-37ba0036a/", color: "hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]" },
    { name: "Instagram", icon: SiInstagram, href: "https://www.instagram.com/nilambarsonu/", color: "hover:text-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]" },
    { name: "Twitter", icon: Twitter, href: "https://x.com/NilambarBeher?s=08", color: "hover:text-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)]" },
    { name: "Facebook", icon: SiFacebook, href: "https://www.facebook.com/share/16o7JTxTWW/", color: "hover:text-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 px-4 bg-[#0a0a0a] st-fog"
      id="contact"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-st-red/15 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center text-st-red tracking-[0.1em] uppercase"
            style={{ textShadow: "0 0 10px rgba(229,9,20,0.4), 0 0 30px rgba(229,9,20,0.15)" }}>
            Send a Signal
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto font-retro text-sm tracking-wider">
            📡 Reach out through the void — I'll receive your message from the other side
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-8 bg-[#111]/60 backdrop-blur border border-st-red/15 relative">
                <div className="absolute top-3 right-4 font-retro text-[10px] text-st-red/20 tracking-[0.3em] uppercase transform rotate-3">
                  ENCRYPTED
                </div>
                <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2 text-st-red tracking-wider uppercase">
                  <Send className="w-5 h-5" />
                  Transmit Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required disabled={isSubmitting}
                    className="bg-[#0a0a0a]/80 border-st-red/15 focus:border-st-red/50 focus:ring-st-red/20 font-mono text-sm placeholder:text-muted-foreground/40" />
                  <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required disabled={isSubmitting}
                    className="bg-[#0a0a0a]/80 border-st-red/15 focus:border-st-red/50 focus:ring-st-red/20 font-mono text-sm placeholder:text-muted-foreground/40" />
                  <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required rows={5} disabled={isSubmitting}
                    className="bg-[#0a0a0a]/80 border-st-red/15 focus:border-st-red/50 focus:ring-st-red/20 resize-none font-mono text-sm placeholder:text-muted-foreground/40" />
                  <Button type="submit" className="w-full bg-st-red hover:bg-st-red/80 text-white hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] font-retro tracking-wider" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Transmitting...
                      </span>
                    ) : (
                      <span className="flex items-center"><Send className="w-4 h-4 mr-2" /> Send Signal</span>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col h-full"
            >
              <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2 text-st-amber tracking-wider uppercase">
                <MessageCircle className="w-5 h-5" />
                Direct Channels
              </h3>
              <div className="space-y-4 flex-1">
                {socialLinks.map((social, index) => (
                  <motion.div key={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}>
                    <Card className="p-4 bg-[#111]/40 backdrop-blur border border-st-red/10 hover:border-st-red/40 transition-all st-portal-hover">
                      <a href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                        <div className={`p-3 rounded-lg bg-[#0a0a0a]/80 ${social.color} group-hover:shadow-[0_0_15px_currentColor] transition-shadow`}>
                          <social.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-st-red transition-colors font-retro tracking-wider">{social.name}</h4>
                          <p className="text-xs text-muted-foreground">Connect via {social.name}</p>
                        </div>
                      </a>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div className="mt-6 pt-6 border-t border-st-red/10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}>
                <div className="flex justify-center gap-4">
                  {otherSocials.map((social) => (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}
                      className={`p-3 bg-[#111]/40 rounded-full text-muted-foreground ${social.color} transition-all duration-300`}>
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }} className="w-full">
            <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2 text-st-teal tracking-wider uppercase"
              style={{ textShadow: "0 0 8px rgba(26,107,107,0.3)" }}>
              <MapPin className="w-5 h-5" /> Known Location
            </h3>
            <Card className="p-2 bg-[#111]/40 backdrop-blur border border-st-red/10 overflow-hidden h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.41011831867!2d86.43859666276846!3d21.068156689895052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1bf588d0cf9047%3A0xe5a201c70e201275!2sBhadrak%2C%20Odisha!5e0!3m2!1sen!2sin!4v1716631628189!5m2!1sen!2sin"
                width="100%" height="100%"
                style={{ border: 0, borderRadius: 'var(--radius)', filter: "hue-rotate(180deg) invert(0.92) contrast(1.2) saturate(0.3)" }}
                allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location Map" className="rounded-lg"
              />
              {/* Dark red overlay */}
              <div className="absolute inset-0 bg-st-red/5 pointer-events-none rounded-lg" />
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
