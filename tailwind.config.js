/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
        'pixel': ['Press Start 2P', 'cursive'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0,0,0,0.1)',
        'medium': '0 4px 20px rgba(0,0,0,0.15)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}