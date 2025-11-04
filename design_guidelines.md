# Design Guidelines: Futuristic "Gully Graphics" Portfolio for Nilambar Behera

## Design Approach: Reference-Based (Street Art/Urban Futurism)

**Primary References**: 
- Urban street art aesthetics (spray-paint textures, stencil fonts, graffiti motifs)
- Cyberpunk/neon-futuristic UI patterns
- Three.js showcase sites with immersive 3D experiences

**Core Principle**: Blend gritty urban "gully" graphics with premium futuristic polish - creating a unique aesthetic that's both raw and refined.

---

## Visual Theme & Aesthetics

**Color Philosophy**:
- Base: Deep dark backgrounds (near-black charcoal tones)
- Accents: Vibrant neon gradients (cyan, magenta, electric purple, acid green)
- Apply spray-paint texture overlays and subtle grain for urban grit
- Use dynamic neon glows on interactive elements and section borders

**Graphic Treatments**:
- Spray-paint splatter effects as section dividers
- Stencil-style cutout patterns for decorative elements
- Low-poly geometric shapes echoing street art murals
- Procedural neon light trails and particle systems

---

## Typography System

**Display/Headings**: Orbitron or Exo 2 (futuristic, geometric sans-serif)
- Hero title: 3.5-4rem (desktop), bold weight
- Section headings: 2.5-3rem, semi-bold
- Card titles: 1.5rem, medium weight

**Body/UI**: Inter or Poppins (clean, neutral)
- Body text: 1rem, regular weight
- UI elements/labels: 0.875-1rem, medium weight
- Small print/captions: 0.75rem

**Character**: Confident, crisp, modern with subtle urban edge

---

## Layout & Spacing System

**Spacing Primitives**: Tailwind units of 4, 8, 12, 16, 20, 24 (consistent rhythm)
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component spacing: gap-8 to gap-12 for grids
- Inner spacing: p-6 to p-8 for cards, p-4 for compact elements

**Container Strategy**:
- Full-width sections with inner max-w-7xl for content
- Text-heavy areas: max-w-4xl for optimal readability
- Hero: 100vh full-bleed immersive experience

---

## Core Sections & Components

### 1. Hero Section (Full-Screen 3D Scene)
- **Layout**: 100vh immersive three.js canvas background
- **3D Scene**: Low-poly urban alley/street mural with:
  - Stylized geometric buildings/walls
  - Neon sign elements (flickering glow animations)
  - Particle dust/fog drifting through scene
  - Subtle parallax camera motion on mouse move
  - Procedural pulsing neon lights synced to timeline
- **Overlay Content** (centered, floating above 3D):
  - Circular profile photo placeholder (200px diameter, bordered with animated neon glow)
  - "Hi, I'm Nilambar Behera" - large display font
  - Subtitle: "BCA Student | Aspiring Data Scientist & Web Dev" - smaller body font
  - Two CTA buttons (side-by-side): "View Projects" (primary neon) + "Download Resume" (secondary outline)
  - Buttons with blurred glass-morphism backgrounds
- **Fallback**: Static hero image if WebGL fails (preserve layout)

### 2. About Section
- **Layout**: Two-column (desktop) - Left: bio text, Right: skills + education timeline
- **Bio**: Import paragraph from reference site, styled with neon accent highlight on key phrases
- **Skills Chips**: Animated tags (HTML-CSS-JS, Python for Data Science, Mathematics-Statistics) with hover glow
- **Education Timeline**: Vertical animated timeline with:
  - 10th: Sanpatpur Nodal High School (88.66%)
  - 12th: Nilgiri Higher Secondary School (83.33%)
  - BCA: Bhadrak Autonomous College - Graduation: YYYY (placeholder)
  - Each entry with subtle stagger animation on scroll

### 3. Projects Grid
- **Layout**: 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- **6 Project Cards**:
  1. Calculator (HTML/CSS/JS)
  2. Portfolio (HTML/CSS/JS)
  3. YouTube Clone
  4. Rock-Paper-Scissor Game
  5. Coin-Flip (Head-Tail)
  6. Data Harvesting
- **Card Design**:
  - Dark card with neon border glow on hover
  - Project title (stencil-style treatment)
  - Tech stack badges
  - Two action buttons: "Live Demo" + "View Code" (or "Know More" for unpublished)
  - Hover: scale(1.05) + intensified neon outline + subtle lift shadow
  - Click opens modal with expanded details, GIF/demo preview, and description

### 4. Skills & Tools Section
- **Layout**: Centered, visually dynamic
- **Presentation**: Animated radial progress bars or circular skill meters
- **Skills**: HTML-CSS-JS, Python for Data Science, Mathematics-Statistics, etc.
- **Animation**: Progress fills on scroll into view with GSAP timeline

### 5. Contact Section
- **Layout**: Two-column - Left: contact form, Right: social links + map/graphic
- **Form Fields**: Name, Email, Message (frontend only, placeholder API endpoint)
- **Social Links**: WhatsApp, Telegram, Email icons with animated neon glow halos
- **Design**: Form inputs with subtle neon underline focus states

### 6. Footer
- **Layout**: Centered, minimal
- **Content**: Copyright text + quick nav links (About, Projects, Contact)
- **Animation**: Small animated spray-paint signature element

---

## Navigation

**Top Bar** (sticky):
- Logo/name on left: "NB" monogram with neon accent
- Nav links on right: About, Projects, Skills, Contact
- Animated neon underline follows active section
- Mobile: Hamburger → smooth drawer reveal from right

---

## Animation Strategy

**Initial Loader**: Short Lottie spray-paint reveal animation (2-3 seconds)

**Scroll-Driven Effects** (GSAP ScrollTrigger):
- Scene lighting intensity adjusts as user scrolls
- UI section borders illuminate progressively
- Parallax layering on 3D hero background

**Micro-Interactions**:
- Button hover: animated stroke outline + glow intensification
- Card hover: scale + neon border pulse
- Skill chips: ripple effect on hover
- Form inputs: neon underline expand on focus

**Custom Cursor** (desktop only):
- Circular cursor that enlarges on interactive elements
- Particle burst on click
- Automatically disabled on mobile/touch devices

**Performance**:
- Lazy-load three.js code (code-splitting)
- Intersection observers pause animations when off-screen
- `prefers-reduced-motion` fallback: disable non-essential animations
- Low-poly 3D models (minimal geometry, limited lights)

---

## Accessibility

- ARIA labels for all interactive components
- Keyboard navigation support (tab order, focus indicators)
- Skip-to-content link at top
- High color contrast ratios (neon on dark meets WCAG AA)
- Semantic HTML5 structure

---

## Images & Assets

**Hero Section**: 
- Large 3D canvas background (no static hero image unless WebGL fallback)
- Placeholder profile photo: `src/assets/photo-placeholder.jpg` (400×400, circular mask, neon border)

**Icons**: lucide-react or Heroicons via CDN
**Fonts**: Google Fonts - Orbitron/Exo + Inter/Poppins
**Graphics**: Inline SVGs for spray-paint elements, custom cursor particles via Canvas

---

## Placeholder Content Management

**Profile Photo**: `src/assets/photo-placeholder.jpg` with admin comment: `<!-- REPLACE: Add your 400x400 profile photo here -->`

**Graduation Year**: "BCA — Bhadrak Autonomous College — Graduation: YYYY" with comment: `<!-- REPLACE: Update graduation year -->`

---

## Deliverables Summary

- Single-page application with smooth scroll navigation
- Runnable Vite + React project
- README with installation, deployment, and content update instructions
- Social meta tags + `/public/og.png` for sharing
- Sample E2E or unit test for key component
- Clean, componentized React code with inline comments