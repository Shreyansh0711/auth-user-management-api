/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        surface: '#1E293B',
        primary: '#3B82F6',
        primaryHover: '#2563EB',
        accent: '#8B5CF6',
        textMain: '#F8FAFC',
        textMuted: '#94A3B8',
        border: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
        glow: '0 0 15px rgba(59, 130, 246, 0.5)',
      }
    },
  },
  plugins: [],
}
