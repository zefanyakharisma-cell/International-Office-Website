/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './JS/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif']
      },
      colors: {
        pcu: {
          red:     '#f7000d',
          orange:  '#fa6632',
          sky:     '#30aeb4',
          purple:  '#8d4bb1',
          yellow:  '#fdd600',
          navy:    '#1d446e',
          green:   '#52ac2d',
          magenta: '#fa207d',
          white:   '#ebe6e5',
          // Aliases used throughout the codebase
          blue:    '#1d446e',
          light:   '#ebe6e5',
          gold:    '#fdd600',
          dark:    '#1d446e'
        }
      }
    }
  },
  plugins: []
};
