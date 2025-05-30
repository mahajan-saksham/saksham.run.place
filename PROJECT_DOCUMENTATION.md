# SAKSHAM PORTFOLIO PROJECT - COMPLETE DOCUMENTATION

## 🎯 PROJECT OVERVIEW

### Intent & Purpose
This is a cyberpunk-themed portfolio website for **Saksham Mahajan**, a Senior Product Designer. The website showcases his professional experience, design projects, skills, and provides a unique, interactive experience that stands out from traditional portfolios.

**Live Domain**: https://saksham.run.place

### Key Features
- **Cyberpunk Aesthetic**: Neon colors, glitch effects, CRT monitor simulation
- **Window-based UI**: Draggable, resizable windows like a desktop OS
- **Interactive Elements**: Sound effects, animations, hacker mode
- **Professional Content**: Experience, projects, skills, education, certifications

## 🛠 TECHNICAL STACK

### Core Technologies
- **Framework**: React 18.2.0 with Vite
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Animation**: Framer Motion
- **Package Manager**: npm
- **Build Tool**: Vite
- **Deployment Target**: Vercel

### Key Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^10.16.0",
  "react-rnd": "^10.5.2",  // For draggable/resizable windows
  "react-markdown": "^8.0.0",
  "react-syntax-highlighter": "^15.6.1",
  "tailwindcss": "^3.4.0"
}
```

## 📁 PROJECT STRUCTURE

```
/saksham-portfolio/
├── public/
│   ├── images/           # Profile photos and project images
│   │   ├── saksham-avatar.jpg
│   │   ├── yubi-pools-thumb.jpg
│   │   └── [project-images]...
│   ├── resume/          # PDF resume
│   │   └── saksham-mahajan-resume.pdf
│   └── grid.png         # Background grid pattern
├── src/
│   ├── components/
│   │   ├── Window.jsx       # Draggable window container
│   │   ├── Profile.jsx      # Profile/About section
│   │   ├── Projects.jsx     # Projects gallery
│   │   ├── CV.jsx          # Experience/Skills/Education
│   │   ├── StartMenu.jsx   # Bottom-left menu
│   │   ├── NeonButton.jsx  # Cyberpunk button component
│   │   └── Terminal.jsx    # (Currently unused)
│   ├── data/
│   │   └── portfolioData.js # All portfolio content
│   ├── hooks/
│   │   ├── useSound.js     # Sound effects hook
│   │   └── usePortfolioData.js
│   ├── pages/
│   │   └── Home.jsx        # Main page component
│   ├── styles/
│   │   └── effects.css     # CRT & glitch effects
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css          # Global styles & scrollbars
├── tasks/               # TaskMaster project management
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## 📊 DATA STRUCTURE

All portfolio content is centralized in `/src/data/portfolioData.js`:

```javascript
portfolioData = {
  profile: {
    name: "Saksham Mahajan",
    title: "Senior Product Designer",
    avatar: "/images/saksham-avatar.jpg",
    bio: "Designer from NID...",
    location: "Bengaluru, Karnataka, India",
    email: "sakshammahajan1997@gmail.com",
    phone: "7995657936",
    social: {
      linkedin: "https://www.linkedin.com/in/mahajansaksham/",
      dribbble: "https://dribbble.com/sakshammahajan",
      behance: "https://www.behance.net/saksham-mahajan"
    }
  },
  stats: {
    projects: 13,
    experience: "5+ years",
    companies: 7,
    industries: 3
  },
  skills: {
    design: [...],    // Array of {name, level}
    research: [...],
    technical: [...]
  },
  experience: [...],  // Array of job objects
  education: [...],   // Array of education objects
  certifications: [...],
  projects: [...]     // Array of design projects
}
```

## 🎨 VISUAL DESIGN SYSTEM

### Color Palette
```css
/* Cyberpunk Theme Colors */
--cyber-black: #0a0a0a
--cyber-blue: #00ffff (cyan)
--cyber-pink: #ff00ff (magenta)
--cyber-yellow: #ffff00
--cyber-green: #00ff00 (hacker mode)
```

### Typography
- **Headers**: Orbitron (futuristic)
- **Body**: Share Tech Mono (monospace)
- **Special**: Press Start 2P (retro gaming)

### Visual Effects
1. **CRT Monitor Effect**: Scanlines, screen curvature
2. **Glitch Effect**: Text distortion animation
3. **Neon Glow**: Box shadows with color
4. **Gradient Overlays**: Subtle color transitions
5. **Grid Background**: Tech pattern overlay

### UI Components
1. **Windows**: 
   - Draggable & resizable
   - Pink close button, yellow minimize
   - Custom scrollbars with neon glow
   
2. **Buttons**:
   - Neon borders with hover glow
   - Sound effects on interaction
   
3. **Start Menu**:
   - Bottom-left position
   - Animated slide-up
   - System version footer

## 🔧 KEY FEATURES

### 1. Window System
- Each section opens in a draggable window
- Windows can be resized and repositioned
- Z-index management for window stacking
- Scrollable content with cyberpunk scrollbars

### 2. Hacker Mode (Ctrl+H)
- Switches color scheme to green Matrix-style
- Changes all cyan elements to green
- Maintains functionality with different aesthetic

### 3. Sound Effects
- Click sounds for buttons
- Hover sounds for interactive elements
- Success/error sounds for actions
- Window open/close sounds

### 4. Responsive Design
- Mobile-friendly with adjusted layouts
- Minimum window sizes prevent breaking
- Scalable typography and spacing

## 📝 CONTENT EDITING GUIDE

### To Update Profile Information:
Edit `/src/data/portfolioData.js`:
```javascript
profile: {
  name: "Your Name",
  title: "Your Title",
  bio: "Your bio text...",
  // etc.
}
```

### To Add Projects:
Add to the `projects` array:
```javascript
projects: [
  {
    id: 10,
    title: "New Project Name",
    description: "Project description",
    category: "Mobile App",
    thumbnail: "/images/project-thumb.jpg",
    images: ["/images/project-1.jpg"],
    tags: ["UI/UX", "Mobile"],
    link: "https://dribbble.com/shots/...",
    featured: true
  }
]
```

### To Update Experience:
Modify the `experience` array with your job history.

## 🔗 EXTERNAL LINKS & INTEGRATIONS

### Data Sources
1. **LinkedIn**: Profile information extracted from linkedin.com/in/mahajansaksham/
2. **Dribbble**: Project showcase at dribbble.com/sakshammahajan
3. **Behance**: Additional portfolio at behance.net/saksham-mahajan

### Project Links
All project thumbnails link to Dribbble shots where full designs are hosted.

## 🚀 DEPLOYMENT

### Local Development
```bash
cd /Users/sakshammahajan/Desktop/saksham-portfolio
npm install
npm run dev
# Opens at http://localhost:5173
```

### Production Build
```bash
npm run build
# Creates dist/ folder
```

### Vercel Deployment
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow prompts to connect account
4. Configure domain: saksham.run.place

## 🎯 USER JOURNEY

1. **Landing**: User sees "Saksham.run.place" with glitch effect
2. **Start Menu**: Click to reveal four options
3. **Profile Window**: Personal info, stats, social links
4. **Projects Window**: Gallery with filtering, click for details
5. **CV Window**: Tabbed interface for experience/skills/education
6. **AI Assistant**: Placeholder for future chatbot feature

## ⚙️ SPECIAL FEATURES

### CRT Toggle
- Enable/disable retro monitor effects
- Maintains aesthetic without performance impact

### Project Filtering
- Categories: FinTech, Health & Fitness, E-commerce, etc.
- Featured projects highlighted
- Image gallery with navigation dots

### Download Resume
- PDF download from CV window
- Located at `/public/resume/saksham-mahajan-resume.pdf`

## 🛠 MAINTENANCE NOTES

### Adding Images
1. Save optimized images to `/public/images/`
2. Use WebP format for better performance
3. Thumbnails: 16:9 aspect ratio
4. Full images: Max 1920px width

### Performance Optimization
- Lazy load images in project gallery
- Minimize animation on mobile
- Use production build for deployment

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Custom scrollbars work best in Webkit browsers
- Fallback styles for older browsers

## 📱 RESPONSIVE BREAKPOINTS
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔐 ENVIRONMENT VARIABLES
Currently none required. All data is static.

## 📚 FUTURE ENHANCEMENTS
1. AI Chatbot integration
2. Blog section
3. Case study deep-dives
4. Analytics integration
5. Dynamic project loading from CMS

---

This documentation provides a complete blueprint of the Saksham portfolio project. Any AI or developer can understand the structure, modify content, and extend functionality using this guide.