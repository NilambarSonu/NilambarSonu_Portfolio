# Nilambar Behera - Portfolio Website

A futuristic, highly animated portfolio website featuring "gully graphics" aesthetic with neon accents and modern web animations.

## 🚀 Features

- **Stunning Hero Section** with Canvas particle effects and animated gradients
- **Smooth Animations** using Framer Motion and GSAP
- **Custom Cursor** with particle burst effects (desktop only)
- **Responsive Design** that works on all devices
- **Dark Neon Theme** with cyberpunk-inspired aesthetics
- **Project Showcase** with detailed modal views
- **Contact Form** with social media links
- **Accessibility** features including keyboard navigation and ARIA labels
- **Performance Optimized** with reduced-motion support for accessibility

## 📦 Installation

```bash
npm install
```

## 🎬 Development

```bash
npm run dev
```

The application will start on `http://localhost:5000`

## 🏗️ Build for Production

```bash
npm run build
```

## 🎨 Customization Guide

### Replacing Placeholder Content

#### 1. Profile Photo
**Location:** `client/src/components/Hero.tsx`

Find this line (around line 9):
```tsx
import profilePlaceholder from "@assets/generated_images/Profile_photo_placeholder_dfc6967d.png";
```

**To Update:**
1. Add your 400×400px profile photo to `client/public/` (e.g., `profile.jpg`)
2. Update the import:
   ```tsx
   const profileImage = "/profile.jpg";
   ```
3. Replace the img src in the Hero component (around line 101):
   ```tsx
   <img
     src={profileImage}
     alt="Nilambar Behera"
     className="w-full h-full object-cover"
   />
   ```

#### 2. Graduation Year
**Location:** `client/src/components/About.tsx`

Find this section (around line 38):
```tsx
{
  degree: "BCA",
  school: "Bhadrak Autonomous College",
  board: "Currently at College",
  percentage: "",
  year: "YYYY"  // ⬅️ REPLACE THIS
}
```

**To Update:** Simply change `"YYYY"` to your expected graduation year (e.g., `"2025"`)

#### 3. Social Media Links
**Location:** `client/src/components/Contact.tsx`

Find the `socialLinks` array (around line 28) and update the `href` values:
```tsx
const socialLinks = [
  {
    name: "WhatsApp",
    icon: SiWhatsapp,
    href: "#",  // ⬅️ Add your WhatsApp link
    color: "text-green-500"
  },
  // ... update other links
];
```

#### 4. Resume Download
**Location:** `client/src/components/Hero.tsx`

The "Download Resume" button is currently a placeholder. To make it functional:
1. Add your resume PDF to `client/public/` (e.g., `resume.pdf`)
2. Update the Button component (around line 117):
   ```tsx
   <Button
     size="lg"
     variant="outline"
     asChild
     data-testid="button-download-resume"
     className="border-2 border-primary/50 text-primary hover:bg-primary/10"
   >
     <a href="/resume.pdf" download="Nilambar_Behera_Resume.pdf">
       <Download className="mr-2 h-4 w-4" />
       Download Resume
     </a>
   </Button>
   ```

### Adding/Modifying Projects

**Location:** `client/src/components/Projects.tsx`

Find the `projects` array (around line 17) and modify the project objects:

```tsx
{
  title: "Your Project Name",
  description: "Brief description of your project",
  techStack: ["Tech1", "Tech2", "Tech3"],
  liveUrl: "https://your-live-url.com",  // Optional
  codeUrl: "https://github.com/yourusername/repo",  // Optional
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  isPublished: true  // Set to false if not on GitHub
}
```

### Updating Bio Text

**Location:** `client/src/components/About.tsx`

Find the bio paragraphs (around line 39) and update the text to reflect your own experience.

## 🎨 Design Customization

### Colors
All colors are defined in `client/src/index.css` using CSS custom properties. The current theme uses:
- **Primary (Cyan):** `--primary: 180 100% 50%`
- **Secondary (Magenta):** `--secondary: 300 100% 60%`
- **Accent (Pink):** `--accent: 320 100% 55%`

### Fonts
The project uses:
- **Display Font:** Orbitron, Exo 2 (for headings)
- **Body Font:** Inter, Poppins (for body text)

These are loaded in `client/index.html` and can be changed by updating the Google Fonts link.

## 🧪 Testing

A basic test example is included in the project demonstrating component testing patterns.

## 📱 SEO & Social Sharing

The site includes proper meta tags for SEO and social media sharing:
- Open Graph image at `/public/og.png`
- Meta description and title tags
- Proper semantic HTML structure

## ⚡ Performance

- **Lazy Loading:** Heavy animations are conditionally loaded
- **Reduced Motion:** Respects user's motion preferences
- **Optimized Images:** Use appropriate image formats and sizes
- **Code Splitting:** Components are efficiently bundled

## 🌐 Deployment

The site can be deployed to any static hosting service:
- **Replit:** Click the "Publish" button
- **Vercel/Netlify:** Connect your Git repository
- **GitHub Pages:** Use the build output from `npm run build`

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Credits

Built with ❤️ by Nilambar Behera

**Technologies Used:**
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- GSAP
- Shadcn UI
- Lucide Icons
