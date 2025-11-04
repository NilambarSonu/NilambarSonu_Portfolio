# Nilambar Behera - Portfolio Website

## Overview

A futuristic portfolio website showcasing the work of Nilambar Behera, a BCA student and aspiring data scientist from Odisha, India. The site features a cyberpunk-inspired "gully graphics" aesthetic with neon accents, particle effects, and smooth animations throughout. Built as a single-page application with smooth scrolling between sections including Hero, About, Projects, Resume, and Contact.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type safety and component-based architecture
- **Vite** as the build tool and development server, providing fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing (single-page app with fallback routes)
- **Path aliases** configured via TypeScript and Vite for clean imports (`@/`, `@shared/`, `@assets/`)

**State Management & Data Fetching**
- **TanStack Query (React Query)** for server state management with custom query client configuration
- No global client state library - uses React's built-in state management (useState, useContext)
- Custom query function wrapper for standardized API calls with error handling

**Styling & UI**
- **Tailwind CSS** with custom configuration for dark/neon theme
- **shadcn/ui** component library (New York style) with extensive Radix UI primitives
- Custom CSS variables for theme colors supporting light/dark modes
- Responsive design system with mobile-first breakpoints
- Custom utility classes for elevation effects (`hover-elevate`, `active-elevate-2`)

**Animation Libraries**
- **Framer Motion** for declarative UI animations and scroll-triggered effects
- **GSAP** (imported but primary animation through Framer Motion)
- Canvas-based particle systems for hero section effects
- Custom cursor component with particle burst effects (desktop only)

**Design System**
- Display fonts: Orbitron and Exo 2 (futuristic geometric sans-serif)
- Body fonts: Inter and Poppins (clean, neutral)
- Color palette: Dark charcoal backgrounds with neon gradients (cyan, magenta, purple, green)
- Consistent spacing using Tailwind's 4px-based scale
- Custom border radius values (sm: 3px, md: 6px, lg: 9px)

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for type-safe server code
- Custom middleware for request logging with duration tracking
- JSON body parsing with raw body capture for webhook support
- Environment-aware setup (development vs production)

**Development Setup**
- **Vite middleware mode** integration for seamless dev experience
- Custom Vite server setup with HMR support over HTTP server
- Automatic process termination on Vite errors
- Hot module replacement for both client and server code

**Production Build**
- **esbuild** for server-side bundling (ESM format, Node platform)
- Vite for client-side bundling with optimized asset handling
- Static file serving from `dist/public` in production
- Separate build outputs for client and server code

**Storage Layer**
- In-memory storage implementation (`MemStorage`) as default
- Interface-based design (`IStorage`) for easy swapping to persistent storage
- CRUD operations for user management (currently minimal schema)
- UUID generation for entity IDs

### Data Layer

**Database Schema**
- **Drizzle ORM** configured for PostgreSQL with schema-first approach
- **Neon Database** serverless PostgreSQL (@neondatabase/serverless)
- Minimal schema currently defined (users table with username/password)
- Migration support via drizzle-kit with migrations output to `/migrations`
- Schema validation using Zod integration (drizzle-zod)

**Database Configuration**
- Connection via `DATABASE_URL` environment variable (required for build)
- PostgreSQL dialect with serverless-optimized connection pooling
- Schema located in `shared/schema.ts` for type sharing between client/server

### Accessibility & Performance

**Accessibility Features**
- ARIA labels on interactive components
- Keyboard navigation support throughout
- Skip-to-content functionality
- Semantic HTML structure
- Color contrast compliance for neon theme

**Performance Optimizations**
- Reduced-motion media query support (disables loader animation)
- Lazy loading for route components
- Optimized particle counts for mobile devices
- Custom cursor disabled on touch devices
- Image optimization with proper sizing (400×400 profile placeholder)

**SEO & Meta**
- Comprehensive meta tags in HTML head
- Open Graph protocol support
- Descriptive title and meta description
- Favicon and social preview image support

## External Dependencies

### Third-Party UI Libraries
- **Radix UI** - Comprehensive collection of unstyled, accessible component primitives (accordion, dialog, dropdown, popover, select, tabs, toast, tooltip, etc.)
- **Embla Carousel** - Touch-friendly carousel component
- **cmdk** - Command menu component
- **Lucide React** - Icon library
- **React Icons** - Additional icons (social media icons: WhatsApp, Telegram)
- **Vaul** - Drawer component

### Animation & Graphics
- **Framer Motion** - Production-ready animation library
- **GSAP** - Professional-grade animation platform (referenced but not actively used)
- **Canvas API** - Native browser API for particle effects

### Form Handling
- **React Hook Form** - Performant form validation
- **@hookform/resolvers** - Validation schema resolvers
- **Zod** - TypeScript-first schema validation

### Build & Development Tools
- **Vite** - Next-generation frontend build tool
- **esbuild** - Fast JavaScript bundler for server code
- **TypeScript** - Static type checking
- **PostCSS** - CSS transformation with Tailwind and Autoprefixer
- **@replit/vite-plugin-runtime-error-modal** - Development error overlay
- **@replit/vite-plugin-cartographer** - Replit-specific tooling
- **@replit/vite-plugin-dev-banner** - Development banner

### Database & ORM
- **Neon Database** - Serverless PostgreSQL provider
- **Drizzle ORM** - TypeScript ORM with excellent type inference
- **drizzle-kit** - Schema management and migration tool
- **drizzle-zod** - Zod schema generation from Drizzle schemas

### Utilities
- **date-fns** - Date manipulation library
- **nanoid** - Unique ID generator
- **clsx** - Conditional className utility
- **tailwind-merge** - Tailwind class merging utility
- **class-variance-authority** - Type-safe variant management

### Server Dependencies
- **connect-pg-simple** - PostgreSQL session store (imported but sessions not configured)

### Fonts
- **Google Fonts** - Orbitron, Exo 2, Inter, Poppins (loaded via CDN in HTML)

### Notable Configuration
- Portfolio is designed to work without a database in development (uses in-memory storage)
- PostgreSQL database can be added later for features requiring persistence
- All API routes should be prefixed with `/api`
- Custom cursor and heavy animations respect user's motion preferences