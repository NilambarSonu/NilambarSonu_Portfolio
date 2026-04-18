import mittiaiThumbnail from "@assets/generated_images/mitti-ai.png";
import agniThumbnail from "@assets/generated_images/agni-sensor.png";
import aestheticThumbnail from "@assets/generated_images/aesthetic-qr.png";
import careerThumbnail from "@assets/generated_images/career-architect.png";
import lecturesnapThumbnail from "@assets/generated_images/lecturesnap-ai.png";
import smartdataThumbnail from "@assets/generated_images/smart-data-analyst.png";
import saathiThumbnail from "@assets/generated_images/saathi-app.png";

const webPlaceholder = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  codeUrl?: string;
  features: string[];
  isPublished: boolean;
  category: string;
  thumbnail?: string;
}

export const projects: Project[] = [
  {
    title: "Mitti-AI",
    description: "AI-powered soil analysis and agricultural insights platform for farmers.",
    techStack: ["React", "Python", "Machine Learning"],
    liveUrl: "https://saathiai.org/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["AI-powered soil analysis", "Real-time agricultural insights", "Mobile-friendly interface", "Data visualization"],
    isPublished: true,
    category: "Startup",
    thumbnail: mittiaiThumbnail || webPlaceholder
  },
  {
    title: "Agni Soil Sensor",
    description: "IoT-based soil sensor system for real-time soil health monitoring.",
    techStack: ["Python", "IoT", "Data Science"],
    liveUrl: "https://agni.saathiai.org/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Real-time soil monitoring", "IoT sensor integration", "Data analytics dashboard", "Mobile alerts"],
    isPublished: false,
    category: "Startup",
    thumbnail: agniThumbnail || webPlaceholder
  },
  {
    title: "Saathi App",
    description: "Mobile application for agricultural advisory and crop management.",
    techStack: ["React Native", "Node.js", "MongoDB"],
    liveUrl: "https://saathiai.org/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Crop advisory system", "Weather integration", "Farmer community", "Push notifications"],
    isPublished: false,
    category: "Startup",
    thumbnail: saathiThumbnail || webPlaceholder
  },
  {
    title: "Smart Data Analyst",
    description: "Autonomous data visualization and insight generation tool for complex datasets.",
    techStack: ["Python", "Pandas", "OpenAI API", "Streamlit"],
    liveUrl: "https://analyze.nilambarsonu.me/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Automated EDA", "Natural language querying", "Predictive modeling", "Interactive dashboards"],
    isPublished: false,
    category: "AI/ML",
    thumbnail: smartdataThumbnail || webPlaceholder
  },
  {
    title: "LectureSnap AI",
    description: "Transform lecture recordings and PDFs into structured study notes and flashcards automatically.",
    techStack: ["Next.js", "Whisper AI", "GPT-4", "Supabase"],
    liveUrl: "https://lecturesnap-ai.nilambarsonu.me/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Audio transcription", "Summary generation", "Flashcard export", "Smart search"],
    isPublished: false,
    category: "AI/ML",
    thumbnail: lecturesnapThumbnail || webPlaceholder
  },
  {
    title: "Career Architect",
    description: "AI-driven platform for career path mapping and resume optimization based on market trends.",
    techStack: ["React", "Node.js", "LLM", "PostgreSQL"],
    liveUrl: "https://architect.nilambarsonu.me/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Resume scoring", "Skill gap analysis", "Career path visualization", "Job market insights"],
    isPublished: false,
    category: "Startup",
    thumbnail: careerThumbnail || webPlaceholder
  },
  {
    title: "Aesthetic QR Generator",
    description: "A collection of high-end, cinematic UI components and design systems for modern web apps.",
    techStack: ["React", "Framer Motion", "Three.js", "Tailwind"],
    liveUrl: "https://aesthetic-qr.nilambarsonu.me/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Cinematic animations", "Glassmorphism components", "WebGL integration", "Custom shaders"],
    isPublished: false,
    category: "Web Dev",
    thumbnail: aestheticThumbnail || webPlaceholder
  },
  {
    title: "Rock-Paper-Scissor",
    description: "Interactive game implementation of the classic Rock-Paper-Scissor with score tracking.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://nilambarsonu.github.io/Rock-Paper-Scissor/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Interactive gameplay", "Score tracking", "Animated results", "Responsive design"],
    isPublished: true,
    category: "Web Dev",
    thumbnail: webPlaceholder
  },
  {
    title: "Calculator",
    description: "A responsive web calculator with basic arithmetic operations and a user-friendly interface.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://nilambarsonu.github.io/Calculator.01.036/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Responsive design", "Basic arithmetic operations", "User-friendly interface", "Clean modern UI"],
    isPublished: true,
    category: "Web Dev",
    thumbnail: webPlaceholder
  },
  {
    title: "Portfolio Website",
    description: "Interactive and responsive portfolio web application showcasing projects and skills.",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://saathiai.org/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Interactive and responsive", "Real-world use cases", "Problem-solving demonstrations", "Links to live demos and source code"],
    isPublished: true,
    category: "Web Dev",
    thumbnail: webPlaceholder
  },
  {
    title: "Data Harvesting",
    description: "Data collection and analysis tool for extracting insights from web sources.",
    techStack: ["Python", "Data Science"],
    liveUrl: "https://saathiai.org/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Web data extraction", "Data analysis capabilities", "Export functionality", "Visualization tools"],
    isPublished: false,
    category: "AI/ML",
    thumbnail: webPlaceholder
  }
];
