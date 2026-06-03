/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './JS/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        // Petra-style: single Inter family across body + headings.
        // `display` kept as an alias so existing font-display/font-serif
        // markup still renders Inter (no need to strip those classes).
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      },
      colors: {
        pcu: {
          // Accents softened toward Petra's brighter pastel palette
          red:     '#e56767',
          orange:  '#e5ae67',
          sky:     '#4cb6c7',
          purple:  '#8451d6',
          yellow:  '#fdd600',
          navy:    '#1d446e',
          green:   '#30c78d',
          magenta: '#ff6c9d',
          white:   '#f8f9fa',
          // Aliases used throughout the codebase.
          // `blue` is now Petra's periwinkle primary (#5179d6); `navy`
          // stays the deep shade reserved for text/structure.
          blue:    '#5179d6',
          light:   '#f8f9fa',
          gold:    '#fdd600',
          dark:    '#1d446e',
          primary: '#5179d6'
        }
      }
    }
  },
  plugins: []
};
