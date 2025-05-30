# 🚀 UI UPDATE - QUICK IMPLEMENTATION GUIDE

## Step 1: Update tailwind.config.js

Replace the entire `theme.extend` section with:

```javascript
theme: {
  extend: {
    colors: {
      // New palette
      'deep-blue': '#001F3F',
      'dark-purple': '#4B0082',
      'accent-pink': '#FF6EC7',
      'accent-cyan': '#0FF1CE',
      'accent-teal': '#39FF14',
      // Keep old for gradual migration
      'cyber-blue': '#00ffff',
      'cyber-pink': '#ff00ff',
      'cyber-yellow': '#ffff00',
      'cyber-black': '#0a0a0a',
    },
    backgroundImage: {
      'gradient-main': 'linear-gradient(135deg, #001F3F, #4B0082)',
      'gradient-accent': 'linear-gradient(to right, #FF6EC7, #0FF1CE, #39FF14)',
    },
    fontFamily: {
      'heading': ['Inter', 'sans-serif'],
      'body': ['Poppins', 'sans-serif'],
      'interactive': ['Roboto', 'sans-serif'],
      // Keep old fonts
      'tech': ['Share Tech Mono', 'monospace'],
      'orbitron': ['Orbitron', 'sans-serif'],
    },
    boxShadow: {
      'neon-soft': '0 0 15px rgba(255,110,199,0.6)',
      'neon-accent': '0 0 20px rgba(15,241,206,0.6)',
    },
  },
},
```

## Step 2: Add to index.html (after line 6)

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@300;400;500&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
```

## Step 3: Add to index.css (at the end)

```css
/* New Design System */
:root {
  --bg-gradient: linear-gradient(135deg, #001F3F, #4B0082);
  --accent-gradient: linear-gradient(to right, #FF6EC7, #0FF1CE, #39FF14);
  --window-bg: rgba(21,27,61,0.8);
  --text-primary: #FFFFFF;
  --text-pink: #FF99CC;
}

/* Glass morphism */
.glass {
  background: var(--window-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}

/* Gradient text */
.gradient-text {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Update body background */
body {
  background: var(--bg-gradient);
  background-attachment: fixed;
}
```

## Step 4: Component Updates

### Window.jsx - Replace window styling:
```jsx
// OLD: className="w-full h-full bg-cyber-black border border-cyber-blue shadow-neon rounded-lg"
// NEW:
className={`w-full h-full glass rounded-lg border ${
  hackerMode 
    ? 'border-accent-teal/50 shadow-[0_0_20px_rgba(57,255,20,0.6)]' 
    : 'border-accent-pink/30 shadow-neon-soft'
} overflow-hidden flex flex-col transition-all duration-300`}
```

### NeonButton.jsx - Replace button styling:
```jsx
// OLD: className="px-4 py-2 border border-cyber-blue..."
// NEW:
className={`
  px-4 py-2
  font-interactive font-medium
  text-white
  bg-gradient-to-r from-accent-pink to-accent-cyan
  rounded-md
  shadow-neon-accent
  hover:brightness-110
  hover:shadow-lg
  transition-all duration-300
  active:scale-95
  ${className}
`}
```

### Home.jsx - Update background:
```jsx
// Line 43: Replace bg-cyber-black with gradient
<div className={`min-h-screen p-4 relative overflow-hidden transition-colors duration-500 ${
  hackerMode ? 'bg-gradient-to-br from-black to-green-950' : ''
}`}>
```

### StartMenu.jsx - Update menu styling:
```jsx
// Line 43: Update menu background
className="fixed bottom-12 left-4 w-64 glass rounded-lg shadow-neon-soft overflow-hidden z-50"

// Line 50: Update header gradient
<div className="bg-gradient-to-r from-accent-pink to-accent-cyan p-4 border-b border-white/10">
```

## Step 5: Update Colors Throughout

### Quick Find & Replace:
1. `text-cyber-blue` → `text-accent-cyan`
2. `text-cyber-pink` → `text-accent-pink`
3. `text-cyber-yellow` → `text-accent-teal`
4. `border-cyber-blue` → `border-accent-cyan`
5. `bg-cyber-black` → `glass`

### Update Hover States:
1. `hover:text-cyber-blue` → `hover:text-accent-cyan`
2. `hover:border-cyber-blue` → `hover:border-accent-pink`

## Step 6: Test Checklist

- [ ] Run `npm run dev` - no errors
- [ ] All windows open and close
- [ ] Drag and resize work
- [ ] New fonts load correctly
- [ ] Glass effect visible on windows
- [ ] Gradient backgrounds render
- [ ] Buttons have gradient effect
- [ ] Hacker mode still works (green theme)

## 🎯 Result Preview

The updated design will feature:
- Deep blue to purple gradient background
- Glass morphism windows with subtle borders
- Gradient accents on buttons and highlights
- Softer, more sophisticated neon effects
- Modern font stack (Inter, Poppins, Roboto)
- Smoother animations and transitions

Ready to implement? Start with Step 1 and work through sequentially!