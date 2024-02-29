/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    screens: {
      sm: "640px",

      md: "786px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {

      colors: {
        "primary-color": "var(--primary-color)",
        "text-primary-color": "var(--text-primary-color)",
        "white-color": "var(--white-color)",
      },

      backgroundImage: {
        'main-bg': "url('/image/main/bg.png')",
        'auth-form-bg': "url('/image/main/authFormbg.png')",
      }
    },
  },
  plugins: [],
}

