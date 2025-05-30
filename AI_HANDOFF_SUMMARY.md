# SAKSHAM PORTFOLIO - AI HANDOFF SUMMARY

## Overview
This is a cyberpunk-themed portfolio website for Saksham Mahajan, a Senior Product Designer. The site uses a unique window-based UI where each section (Profile, Projects, CV) opens in a draggable, resizable window - like a futuristic desktop OS.

## Key Information
- **Live URL**: https://saksham.run.place
- **Local Dev**: http://localhost:5174
- **Project Path**: /Users/sakshammahajan/Desktop/saksham-portfolio

## Core Concept
Instead of a traditional scrolling website, this portfolio mimics a cyberpunk computer interface:
- Neon cyan/pink/yellow color scheme
- Glitch text effects on the header
- CRT monitor scanlines (toggleable)
- Sound effects for interactions
- "Hacker mode" (Ctrl+H) switches to green Matrix theme

## Data Architecture
All content is stored in a single file: `/src/data/portfolioData.js`
- **Profile**: Name, title, bio, contact, social links
- **Experience**: 7 companies with detailed achievements
- **Projects**: 9 design projects with thumbnails and Dribbble links
- **Skills**: Categorized with progress bars (design/research/technical)
- **Education & Certifications**: Academic and professional credentials

## Technical Implementation
- **React + Vite**: Fast, modern JavaScript framework
- **Tailwind CSS**: Utility-first styling with custom cyberpunk theme
- **Framer Motion**: Smooth animations and transitions
- **React RnD**: Powers the draggable/resizable windows

## Visual Design System
```
Colors:
- Background: #0a0a0a (near black)
- Primary: #00ffff (cyan neon)
- Secondary: #ff00ff (pink neon)
- Accent: #ffff00 (yellow)
- Hacker Mode: #00ff00 (green)

Fonts:
- Headers: Orbitron (futuristic)
- Body: Share Tech Mono (monospace)
- UI: Press Start 2P (retro pixel)
```

## Key Features
1. **Start Menu** (bottom-left): Opens windows for Profile, Projects, CV, AI Assistant
2. **Window System**: Each section in its own draggable window with custom scrollbars
3. **Projects Gallery**: Grid layout with category filtering and lightbox view
4. **CV Tabs**: Experience timeline, skill bars, education, certifications
5. **Resume Download**: PDF download button in CV window

## Content Sources
- **LinkedIn**: Professional experience and education data
- **Dribbble**: Design project showcases (13 projects identified)
- **Resume PDFs**: Two versions provided by Saksham

## File Structure
```
/src/data/portfolioData.js    → All content
/src/pages/Home.jsx          → Main page with "Saksham.run.place" header
/src/components/
  - Profile.jsx              → About section
  - Projects.jsx             → Portfolio gallery
  - CV.jsx                   → Experience/Skills
  - Window.jsx               → Draggable container
  - StartMenu.jsx            → Navigation menu
```

## To Edit Content
1. Open `/src/data/portfolioData.js`
2. Update the relevant section (profile, projects, experience, etc.)
3. Save and the site auto-refreshes

## To Add Projects
Add to the projects array in portfolioData.js:
```javascript
{
  id: 10,
  title: "New Project",
  description: "Description",
  category: "Mobile App",
  thumbnail: "/images/project-thumb.jpg",
  images: ["/images/project-1.jpg"],
  tags: ["UI", "Mobile"],
  link: "https://dribbble.com/shots/..."
}
```

## Deployment
- Build: `npm run build`
- Deploy: Vercel (automatic from GitHub)
- Domain: saksham.run.place (configure in Vercel)

## Important Notes
- All project images should be saved in `/public/images/`
- Resume PDF goes in `/public/resume/`
- The site is fully responsive but optimized for desktop
- Sound effects can be muted by users if needed
- Terminal component was removed to keep focus on design work

## Future Enhancements
- AI chatbot for answering questions about Saksham's work
- Case study deep-dives for featured projects
- Blog section for design articles
- Integration with Dribbble API for automatic updates

---

This portfolio showcases Saksham's journey from NID through companies like Yubi, cure.fit, and others, highlighting his expertise in FinTech, Health & Fitness, and Education sectors through an innovative, memorable interface that stands out in the design community.