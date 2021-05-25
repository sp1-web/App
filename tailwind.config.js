module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        xLinear: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' },
        }
      },
      animation: {
        xLinear: 'xLinear 5s ease-in-out infinite'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
