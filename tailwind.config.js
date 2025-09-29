/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme premium color palette
        primary: '#3b82f6',      // Sophisticated blue
        secondary: '#8b5cf6',    // Premium purple
        accent: '#06b6d4',       // Professional cyan
        success: '#10b981',      // Success green
        warning: '#f59e0b',      // Warning amber
        danger: '#ef4444',       // Error red
        gold: '#fbbf24',         // Premium gold

        // Dark theme backgrounds
        'dark-bg': '#0f172a',    // Primary dark background
        'dark-card': '#1e293b',  // Card backgrounds
        'dark-hover': '#334155', // Hover states
        'dark-border': '#475569', // Borders

        // Text colors for dark theme
        'dark-text': '#f8fafc',  // Primary text
        'dark-text-secondary': '#cbd5e1', // Secondary text
        'dark-text-muted': '#94a3b8', // Muted text

        // Gradient colors
        'gradient-from': '#1e293b',
        'gradient-to': '#0f172a'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}