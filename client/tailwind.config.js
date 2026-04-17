/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'uttar-clay': '#BC6C4D',
        'uttar-sand': '#F9F6F2',
        'uttar-cream': '#FAF9F6',
        'uttar-charcoal': '#2D2D2D',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
