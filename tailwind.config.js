/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00ffff',
        'cyber-pink': '#ff00ff',
        'cyber-yellow': '#ffff00',
        'cyber-black': '#0a0a0a',
      },
      fontFamily: {
        'tech': ['Share Tech Mono', 'monospace'],
        'pixel': ['Press Start 2P', 'cursive'],
        'orbitron': ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.cyber-blue), 0 0 10px theme(colors.cyber-blue)',
        'neon-pink': '0 0 5px theme(colors.cyber-pink), 0 0 10px theme(colors.cyber-pink)',
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'pulse-neon': 'pulse-neon 2s infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-1px, -1px)' },
          '60%': { transform: 'translate(2px, 1px)' },
          '80%': { transform: 'translate(-1px, 2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 5px theme(colors.cyber-blue), 0 0 10px theme(colors.cyber-blue)' },
          '50%': { boxShadow: '0 0 10px theme(colors.cyber-blue), 0 0 20px theme(colors.cyber-blue)' },
        },
      },
    },
  },
  plugins: [],
} 