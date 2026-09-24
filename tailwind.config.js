/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#BE123C', // Deep anatomical crimson
          light: '#E11D48',
          dark: '#881337',
        },
        secondary: {
          DEFAULT: '#0284C7', // Soft anatomical vein blue
          light: '#38BDF8',
          dark: '#0369A1',
        },
        artery: '#BE123C',
        vein: '#0284C7',
        capillary: '#9333EA',
        tissue: '#FFF1F2',
        surface: '#FFFFFF',
        card: '#F8FAFC',
        navy: {
          DEFAULT: '#0F172A',
          deep: '#020617',
          muted: '#334155',
        }
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.05)',
        glow: '0 24px 70px rgba(190, 18, 60, 0.12)',
        'glow-blue': '0 24px 70px rgba(2, 132, 199, 0.14)',
      },
      fontFamily: {
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top left, rgba(255, 77, 109, 0.18), transparent 18%), radial-gradient(circle at bottom right, rgba(78, 205, 196, 0.14), transparent 20%)',
      },
    },
  },
  plugins: [],
}
