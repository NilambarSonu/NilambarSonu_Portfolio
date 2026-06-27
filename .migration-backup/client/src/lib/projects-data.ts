import mittiaiThumbnail from "@assets/generated_images/mitti-ai.png";
import agniThumbnail from "@assets/generated_images/agni-sensor.png";
import aestheticThumbnail from "@assets/generated_images/aesthetic-qr.png";
import careerThumbnail from "@assets/generated_images/career-architect.png";
import lecturesnapThumbnail from "@assets/generated_images/lecturesnap-ai.png";
import smartdataThumbnail from "@assets/generated_images/smart-data-analyst.png";
import saathiThumbnail from "@assets/generated_images/saathi-app.png";
import taskManagementThumbnail from "@assets/generated_images/task-management.png";
import v2PortfolioThumbnail from "@assets/generated_images/v2-portfolio.png";
import agni3DThumbnail from "@assets/generated_images/agni-3d.png";
import kalingaTrailsThumbnail from "@assets/generated_images/kalinga-trails.png";
import bistroSeqThumbnail from "@assets/generated_images/bistro-seq.png";
import spendLensThumbnail from "@assets/generated_images/spendlens.png";
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
    title: "Task Management Webapp",
    description: "Robust full-stack task management system featuring role-based access and real-time status tracking.",
    techStack: ["Node.js", "Express", "PostgreSQL", "React", "JWT", "Zod"],
    liveUrl: "https://task-management.nilambarsonu.me/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Full CRUD with RBAC", "Real-time updates via WebSockets", "Comprehensive API documentation", "Automated status workflows"],
    isPublished: false,
    category: "Web Dev",
    thumbnail: taskManagementThumbnail || webPlaceholder
  },
  {
    title: "PortFolio - V2",
    description: "High-end developer portfolio with advanced server-verified site statistics and immersive design.",
    techStack: ["Vite", "React", "Framer Motion", "Neon DB", "Express", "FingerprintJS"],
    liveUrl: "https://nilambar.me/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Fingerprint-based love system", "Server-side view deduplication", "Glassmorphic UI architecture", "Real-time GitHub stats integration"],
    isPublished: true,
    category: "Web Dev",
    thumbnail: v2PortfolioThumbnail || webPlaceholder
  },
  {
    title: "Agni 3D",
    description: "Immersive 3D visualization dashboard for real-time IoT sensor telemetry and data mapping.",
    techStack: ["Three.js", "React Three Fiber", "GLSL Shaders", "IoT"],
    liveUrl: "https://agni-3d.nilambarsonu.me/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Real-time 3D data mapping", "Custom GLSL particle systems", "Interactive sensor nodes", "Low-latency telemetry sync"],
    isPublished: false,
    category: "Web Dev",
    thumbnail: agni3DThumbnail || webPlaceholder
  },
  {
    title: "Kalinga Trails",
    description: "Premium tourism platform for Odisha featuring immersive discovery and server-verified interaction stats.",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Neon DB"],
    liveUrl: "https://kalinga-trails.nilambarsonu.me/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Server-side love/view tracking", "Dynamic location exploration", "High-performance image sequences", "Optimized tourism SEO"],
    isPublished: false,
    category: "Web Dev",
    thumbnail: kalingaTrailsThumbnail || webPlaceholder
  },
  {
    title: "Bistro Sequence",
    description: "High-performance video-to-image sequence conversion model supporting ultra-high frame rates.",
    techStack: ["Next.js", "Canvas API", "Web Workers", "Vanta.js"],
    liveUrl: "https://bistro-seq.nilambarsonu.me/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Support for 120 FPS sequences", "Scroll-triggered cinematic playback", "Offscreen processing workers", "Vanta background integration"],
    isPublished: false,
    category: "Web Dev",
    thumbnail: bistroSeqThumbnail || webPlaceholder
  },
  {
    title: "SpendLens",
    description: "Ai Free webtoll to eveyone for tracking there personal or team Api expenses.",
    techStack: ["React", "Node.js", "Express", "Neon Postgres", "GeminiAI API"],
    liveUrl: "https://spendlens.nilambarsonu.me/",
    codeUrl: "https://github.com/NilambarSonu",
    features: ["Real-time expense tracking", "AI-powered insights and recommendations", "Team collaboration features", "Customizable dashboards"],
    isPublished: true,
    category: "Web Dev",
    thumbnail: spendLensThumbnail || webPlaceholder
  }
];
