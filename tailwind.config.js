/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./js/**/*.js",
    "./components/**/*.html"
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#adadad',
            h1: { color: 'white' },
            h2: { color: 'white' },
            h3: { color: 'white' },
            h4: { color: 'white' },
            strong: { color: 'white' },
            code: { color: '#4F9BF4' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: { backgroundColor: '#363636' },
            a: { color: '#4F9BF4' },
            blockquote: { color: '#adadad' }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography')
  ],
}