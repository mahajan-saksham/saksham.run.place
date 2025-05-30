# 🔄 COLOR MIGRATION MAP

## Quick Reference - Class Replacements

### Text Colors
```
text-cyber-blue    → text-accent-cyan
text-cyber-pink    → text-accent-pink
text-cyber-yellow  → text-accent-teal
text-cyber-black   → text-deep-blue
```

### Border Colors
```
border-cyber-blue   → border-accent-cyan/50
border-cyber-pink   → border-accent-pink/50
border-cyber-yellow → border-accent-teal/50
border-cyber-black  → border-deep-blue
```

### Background Colors
```
bg-cyber-blue      → bg-gradient-to-r from-accent-cyan to-accent-teal
bg-cyber-pink      → bg-gradient-to-r from-accent-pink to-accent-cyan
bg-cyber-yellow    → bg-accent-teal
bg-cyber-black     → glass (or bg-deep-blue/80)
```

### Shadow Colors
```
shadow-neon        → shadow-neon-soft
shadow-neon-pink   → shadow-[0_0_15px_rgba(255,110,199,0.6)]
```

## Component-Specific Updates

### 1. Window.jsx (66 occurrences)
- Window background: `bg-cyber-black` → `glass`
- Window border: `border-cyber-blue` → `border-accent-pink/30`
- Close button: Keep `bg-cyber-pink` → `bg-accent-pink`
- Minimize button: `bg-cyber-yellow` → `bg-accent-teal`

### 2. Projects.jsx (272 occurrences) 
- Card borders: `border-cyber-blue` → `border-accent-cyan/30`
- Title text: `text-cyber-yellow` → `gradient-text`
- Featured badge: `bg-cyber-pink/20` → `bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20`

### 3. Profile.jsx (176 occurrences)
- Name: `text-cyber-yellow` → `text-heading gradient-text`
- Stats background: `bg-cyber-blue/10` → `bg-gradient-to-r from-accent-pink/10 to-accent-cyan/10`
- Social buttons: Individual gradient colors

### 4. CV.jsx (209 occurrences)
- Tab active: `bg-cyber-blue/20` → `bg-gradient-accent`
- Headers: `text-cyber-yellow` → `gradient-text`
- Progress bars: `bg-cyber-blue` → `bg-gradient-accent`

### 5. StartMenu.jsx (71 occurrences)
- Menu background: `bg-cyber-black` → `glass`
- Header gradient: Already gradient, update colors
- Hover states: `hover:bg-cyber-blue/10` → `hover:bg-accent-cyan/20`

### 6. NeonButton.jsx (15 occurrences)
- Complete redesign with gradient fill
- Remove border-based design
- Add gradient background

## Hacker Mode Adjustments

For elements that check `hackerMode`:
```javascript
// OLD:
hackerMode ? 'text-[#00ff00]' : 'text-cyber-blue'

// NEW:
hackerMode ? 'text-accent-teal' : 'text-accent-cyan'
```

## CSS Variable Usage

Replace direct color usage with CSS variables where possible:
```javascript
// Instead of:
className="text-cyber-blue"

// Use:
className="text-[var(--text-primary)]"
```

## Testing Each Component

After updating each component:
1. Check default state
2. Check hover states
3. Check hacker mode
4. Check responsive behavior
5. Verify animations still work

Ready to start the migration!