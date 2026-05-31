/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4D6D',
        'primary-dark': '#E83A54',
        'primary-light': '#FF6B8C',
        'pink-soft': '#FF8FA3',
        secondary: '#4ECDC4',
        'secondary-dark': '#3DB9B0',
        'secondary-light': '#6DD9D2',
        'blue-soft': '#A0E7E5',
        accent: '#FFE66D',
        'accent-dark': '#FFD94D',
        'accent-light': '#FFF0A3',
        'purple-soft': '#BDB2FF',
        'bg-light': '#F8FAFC',
        'text-dark': '#1E293B',
        'text-muted': '#64748B',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Fredoka', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 38, 135, 0.1)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(255, 77, 109, 0.3)',
        'playful': '0 18px 50px rgba(255, 77, 109, 0.14)',
        'mint': '0 18px 44px rgba(78, 205, 196, 0.2)',
      },
      animation: {
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        bounce: 'bounce 2s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        gradient: 'gradient 8s ease infinite',
        blob: 'blob 10s ease-in-out infinite',
      },
      keyframes: {
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(24px, -32px) scale(1.08)' },
          '66%': { transform: 'translate(-18px, 22px) scale(0.94)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
