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
        primary: '#FF4D6D',
        secondary: '#4ECDC4',
        accent: '#A0E7E5',
        highlight: '#FFE66D',
        lavender: '#BDB2FF',
        surface: '#FFFFFF',
        card: '#F8FAFC',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(15, 23, 42, 0.08)',
        glow: '0 32px 88px rgba(78, 205, 196, 0.18)',
      },
      fontFamily: {
        display: ['Fredoka', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top left, rgba(255, 77, 109, 0.18), transparent 18%), radial-gradient(circle at bottom right, rgba(78, 205, 196, 0.14), transparent 20%)',
      },
    },
  },
  plugins: [],
}
