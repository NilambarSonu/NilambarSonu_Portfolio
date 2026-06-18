import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

const contactLinks = [
  {
    name: "GitHub",
    href: "https://github.com/NilambarSonu",
    icon: "/contact-icon/github.png",
    className: "contact-icon-github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nilambarsonu-behera-37ba0036a/",
    icon: "/contact-icon/linkedin.png",
    className: "contact-icon-linkedin",
  },
  {
    name: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=7205095602&text=Hello+There%21+I+Am+From+Your+Portfolio+Web&type=phone_number&app_absent=0",
    icon: "/contact-icon/wp.png",
    className: "contact-icon-whatsapp",
  },
  {
    name: "Telegram",
    href: "https://t.me/Nilambarbehera",
    icon: "/contact-icon/telegram.png",
    className: "contact-icon-telegram",
  },
  {
    name: "X",
    href: "https://x.com/NilambarBeher?s=08",
    icon: "/contact-icon/x.png",
    className: "contact-icon-x",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/nilambarsonu/",
    icon: "/contact-icon/instagram.png",
    className: "contact-icon-instagram",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/16o7JTxTWW/",
    icon: "/contact-icon/facebook.png",
    className: "contact-icon-facebook",
  },
];

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
        toast({ title: "Signal Sent!", description: "Your message has been received. I'll get back to you soon." });
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

  return (
    <section ref={ref} className="contact-premium-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-bg" aria-hidden="true" />
      <div className="contact-orbit-lines" aria-hidden="true" />

      <h2 id="contact-title" className="contact-heading">Let's Build The Future</h2>

      {contactLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className={`contact-floating-icon ${link.className}`}
          data-cursor="contact"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 + index * 0.08 }}
        >
          <img src={link.icon} alt="" />
          <span>{link.name}</span>
        </motion.a>
      ))}

      <motion.a
        href="mailto:nilambarsonubehera@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Email"
        className="contact-floating-email"
        data-cursor="contact"
        initial={{ opacity: 0, scale: 0.72 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        <Mail className="h-8 w-8" />
        <span>Email</span>
      </motion.a>

      <div className="contact-stage">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="contact-panel"
        >
          <form onSubmit={handleSubmit} className="contact-form">
            <label>
              <span>Your Name</span>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                aria-label="Your Name"
                className="contact-input"
              />
            </label>

            <label>
              <span>Your E-Mail Id</span>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                aria-label="Your Email"
                className="contact-input"
              />
            </label>

            <label>
              <span>Your Message</span>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={7}
                disabled={isSubmitting}
                aria-label="Your Message"
                className="contact-textarea"
              />
            </label>

            <Button type="submit" className="contact-submit" data-cursor="contact" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center"><Send className="mr-2 h-4 w-4" /> Send Message</span>
              )}
            </Button>
          </form>

          <div className="contact-earth-wrap" aria-hidden="true">
            <img src="/contact-icon/earth.png" alt="" className="contact-earth" />
          </div>
        </motion.div>
      </div>

      <style>{`
        .contact-premium-section {
          position: relative;
          z-index: 40;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
          padding: clamp(5.2rem, 8vh, 6.8rem) 1rem clamp(6.5rem, 10vh, 8rem);
          background: #030913;
          color: #f5f7fa;
        }

        .contact-bg,
        .contact-bg::before,
        .contact-bg::after {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
        }

        .contact-bg {
          z-index: -6;
          background:
            radial-gradient(ellipse 42% 58% at 48% 48%, rgba(0, 112, 156, 0.25), transparent 72%),
            radial-gradient(ellipse 28% 50% at 18% 36%, rgba(0, 157, 223, 0.1), transparent 76%),
            radial-gradient(ellipse 30% 42% at 88% 74%, rgba(30, 92, 178, 0.14), transparent 78%),
            linear-gradient(180deg, #03101e 0%, #061424 48%, #030913 100%);
        }

        .contact-bg::before {
          background:
            linear-gradient(90deg, rgba(2, 7, 16, 0.72), transparent 20%, transparent 80%, rgba(2, 7, 16, 0.74)),
            linear-gradient(180deg, rgba(2, 7, 16, 0.82), transparent 18%, transparent 78%, rgba(2, 7, 16, 0.86));
        }

        .contact-bg::after {
          opacity: 0.16;
          background-image:
            linear-gradient(rgba(31, 92, 148, 0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31, 92, 148, 0.18) 1px, transparent 1px);
          background-size: 8rem 8rem;
          mask-image: radial-gradient(circle at 50% 54%, black 0%, transparent 74%);
        }

        .contact-orbit-lines {
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.34;
          pointer-events: none;
          background:
            linear-gradient(27deg, transparent 0%, transparent 49.9%, rgba(70, 137, 202, 0.22) 50%, transparent 50.18%),
            linear-gradient(153deg, transparent 0%, transparent 49.9%, rgba(70, 137, 202, 0.2) 50%, transparent 50.18%),
            linear-gradient(0deg, transparent 0%, transparent 49.9%, rgba(70, 137, 202, 0.16) 50%, transparent 50.15%),
            linear-gradient(90deg, transparent 0%, transparent 49.9%, rgba(70, 137, 202, 0.16) 50%, transparent 50.15%);
          mask-image: radial-gradient(ellipse at 50% 54%, black 0%, black 46%, transparent 72%);
        }

        .contact-heading {
          position: relative;
          z-index: 8;
          margin: 0 auto clamp(5.8rem, 10vh, 8rem);
          text-align: center;
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(2.1rem, 4.2vw, 5.1rem);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: 0;
          text-transform: uppercase;
          color: rgba(0, 157, 223, 0.13);
          -webkit-text-stroke: 1px rgba(0, 127, 255, 0.78);
          text-shadow: 0 0 28px rgba(0, 127, 255, 0.22);
        }

        .contact-stage {
          position: relative;
          z-index: 6;
          max-width: min(66vw, 78rem);
          margin: 0 auto;
        }

        .contact-panel {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(20rem, 0.82fr);
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: center;
          min-height: clamp(30rem, 52vh, 42rem);
          padding: clamp(2rem, 4vw, 3.6rem);
          border: 2px solid rgba(91, 143, 194, 0.42);
          border-radius: 1.8rem;
          background: rgba(7, 48, 70, 0.44);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.34), inset 0 0 80px rgba(0, 191, 255, 0.04);
          backdrop-filter: blur(16px);
        }

        .contact-form {
          display: grid;
          gap: clamp(1.35rem, 2vh, 2rem);
        }

        .contact-form label {
          display: grid;
          gap: 0.55rem;
        }

        .contact-form label span {
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(1.35rem, 1.7vw, 2rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.12em;
          color: rgba(245, 247, 250, 0.9);
          text-shadow: 0 0 14px rgba(255, 255, 255, 0.08);
        }

        .contact-input,
        .contact-textarea {
          border: 1px solid rgba(119, 180, 215, 0.42);
          border-radius: 0.55rem;
          background: rgba(148, 192, 214, 0.18);
          color: #f5f7fa;
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .contact-input {
          height: clamp(3.5rem, 5.6vh, 4.7rem);
        }

        .contact-textarea {
          min-height: clamp(12rem, 25vh, 19rem);
          resize: none;
        }

        .contact-input:focus,
        .contact-textarea:focus {
          border-color: rgba(0, 191, 255, 0.72);
          box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .contact-submit {
          height: 3.2rem;
          border: 1px solid rgba(0, 191, 255, 0.35);
          background: linear-gradient(90deg, rgba(0, 127, 255, 0.9), rgba(0, 191, 255, 0.9));
          color: white;
          font-family: "Inter", sans-serif;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 0 26px rgba(0, 191, 255, 0.24);
        }

        .contact-submit:hover {
          box-shadow: 0 0 34px rgba(0, 191, 255, 0.42);
        }

        .contact-earth-wrap {
          display: grid;
          place-items: center;
          min-height: 22rem;
        }

        .contact-earth {
          width: min(26vw, 24rem);
          min-width: 17rem;
          height: auto;
          filter: drop-shadow(0 0 26px rgba(0, 191, 255, 0.42)) drop-shadow(0 0 60px rgba(0, 127, 255, 0.22));
          animation: contact-earth-breathe 8s ease-in-out infinite;
        }

        .contact-floating-icon,
        .contact-floating-email {
          position: absolute;
          z-index: 12;
          display: grid;
          place-items: center;
          width: 60px;
          height: 60px;
          border-radius: 1rem;
          transition: transform 0.35s ease, filter 0.35s ease;
          animation: contact-liquid-float 9s ease-in-out infinite;
        }

        .contact-floating-icon img {
          width: 60px;
          height: 60px;
          object-fit: contain;
          display: block;
        }

        .contact-floating-icon span,
        .contact-floating-email span {
          position: absolute;
          top: calc(100% + 0.45rem);
          left: 50%;
          transform: translateX(-50%) translateY(0.25rem);
          opacity: 0;
          padding: 0.22rem 0.5rem;
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 999px;
          background: rgba(2, 8, 16, 0.82);
          color: rgba(245, 247, 250, 0.86);
          font-size: 0.68rem;
          white-space: nowrap;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .contact-floating-icon:hover,
        .contact-floating-email:hover {
          transform: translateY(-0.55rem) scale(1.12);
          filter: drop-shadow(0 0 18px rgba(0, 191, 255, 0.5));
        }

        .contact-floating-icon:hover span,
        .contact-floating-email:hover span {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .contact-floating-email {
          left: calc(50% - 30px);
          top: clamp(7.8rem, 13vh, 10.5rem);
          border-radius: 1rem;
          background: linear-gradient(135deg, #ff4d5f, #ffbf4d, #00bfff);
          color: white;
          box-shadow: 0 0 22px rgba(0, 191, 255, 0.18);
          animation-delay: -1.5s;
        }

        .contact-icon-github {
          left: max(3rem, calc(50% - 42rem));
          top: clamp(10.6rem, 19vh, 14rem);
          animation-delay: -0.8s;
        }

        .contact-icon-linkedin {
          right: max(3rem, calc(50% - 42rem));
          top: clamp(10.6rem, 19vh, 14rem);
          animation-delay: -2.2s;
        }

        .contact-icon-whatsapp {
          left: max(2.4rem, calc(50% - 45rem));
          top: 50%;
          transform: translateY(-50%);
          animation-delay: -3.4s;
        }

        .contact-icon-telegram {
          right: max(2.4rem, calc(50% - 45rem));
          top: 50%;
          transform: translateY(-50%);
          animation-delay: -4.1s;
        }

        .contact-icon-x {
          left: max(4rem, calc(50% - 41rem));
          bottom: clamp(2.8rem, 5vh, 4.2rem);
          animation-delay: -5.2s;
        }

        .contact-icon-instagram {
          left: calc(50% - 30px);
          bottom: clamp(2.2rem, 4.6vh, 3.8rem);
          animation-delay: -6.1s;
        }

        .contact-icon-facebook {
          right: max(4rem, calc(50% - 41rem));
          bottom: clamp(2.8rem, 5vh, 4.2rem);
          animation-delay: -7s;
        }

        @keyframes contact-liquid-float {
          0%, 100% {
            translate: 0 0;
            border-radius: 1rem 1.25rem 0.9rem 1.35rem;
          }
          33% {
            translate: 0.45rem -0.85rem;
            border-radius: 1.4rem 0.9rem 1.3rem 1rem;
          }
          66% {
            translate: -0.35rem 0.6rem;
            border-radius: 0.95rem 1.45rem 1.05rem 1.2rem;
          }
        }

        @keyframes contact-earth-breathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-0.65rem) scale(1.025); }
        }

        @media (max-width: 1100px) {
          .contact-stage {
            max-width: 82vw;
          }

          .contact-panel {
            grid-template-columns: 1fr;
          }

          .contact-earth-wrap {
            min-height: 16rem;
            order: -1;
          }
        }

        @media (max-width: 760px) {
          .contact-premium-section {
            min-height: auto;
            padding: 3.2rem 0.85rem 4rem;
          }

          .contact-heading {
            margin-bottom: 11.2rem;
            font-size: clamp(1.72rem, 9.4vw, 2.55rem);
            line-height: 0.95;
          }

          .contact-stage {
            max-width: 100%;
          }

          .contact-panel {
            padding: 1.05rem;
            border-radius: 1.2rem;
            gap: 0.4rem;
          }

          .contact-earth-wrap {
            min-height: 12.5rem;
            padding-top: 0.5rem;
          }

          .contact-earth {
            min-width: 9.8rem;
            width: min(50vw, 12rem);
          }

          .contact-form {
            gap: 1rem;
          }

          .contact-form label {
            gap: 0.45rem;
          }

          .contact-form label span {
            font-size: clamp(1.05rem, 5.2vw, 1.4rem);
            letter-spacing: 0.08em;
          }

          .contact-input {
            height: 2.9rem;
          }

          .contact-textarea {
            min-height: 10.5rem;
          }

          .contact-floating-icon,
          .contact-floating-email {
            right: auto;
            bottom: auto;
            transform: none;
          }

          .contact-icon-github { left: calc(50% - 7.2rem); top: 7.8rem; }
          .contact-icon-whatsapp { left: calc(50% - 2.4rem); top: 7.8rem; }
          .contact-floating-email { left: calc(50% + 2.4rem); top: 7.8rem; }
          .contact-icon-linkedin { left: calc(50% + 7.2rem); top: 7.8rem; }
          .contact-icon-x { left: calc(50% - 7.2rem); top: 12.7rem; }
          .contact-icon-instagram { left: calc(50% - 2.4rem); top: 12.7rem; }
          .contact-icon-telegram { left: calc(50% + 2.4rem); top: 12.7rem; }
          .contact-icon-facebook { left: calc(50% + 7.2rem); top: 12.7rem; }
        }

        @media (max-width: 380px) {
          .contact-premium-section {
            padding-inline: 0.7rem;
          }

          .contact-heading {
            margin-bottom: 10.4rem;
          }

          .contact-icon-github { left: calc(50% - 6.55rem); top: 7.6rem; }
          .contact-icon-whatsapp { left: calc(50% - 2.18rem); top: 7.6rem; }
          .contact-floating-email { left: calc(50% + 2.18rem); top: 7.6rem; }
          .contact-icon-linkedin { left: calc(50% + 6.55rem); top: 7.6rem; }
          .contact-icon-x { left: calc(50% - 6.55rem); top: 12.2rem; }
          .contact-icon-instagram { left: calc(50% - 2.18rem); top: 12.2rem; }
          .contact-icon-telegram { left: calc(50% + 2.18rem); top: 12.2rem; }
          .contact-icon-facebook { left: calc(50% + 6.55rem); top: 12.2rem; }
        }
      `}</style>
    </section>
  );
}
