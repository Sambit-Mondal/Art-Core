/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'navbar': '#C2C2C2',
      'black': '#000000',
      'white': '#FFFFFF',
      'activeTab': '#6E6E6E',
      'hoverTabs': '#949494',
      'background': '#E5E5E5'
    },
    fontFamily: {
      'jim': ['"Jim Nightshade"'],
      'carter': ['"Carter One"'],
      'inter': ['Inter']
    },
    fontSize: {
      'sm': '0.7rem',
      'xl': '1.8rem',
      '2xl': '2.5rem',
      '3xl': '5.6rem',
      '4xl': '6rem',
      'about': '1.9rem',
      'md': '1.3rem',
      'socials': '0.8rem',
      'artworks': '1rem'
    },
    dropShadow: {
      'btn': '0px 4px 4px rgba(0, 0, 0, 0.50)',
      'login-btn': '0px 4px 10px rgba(0, 0, 0, 0.50)',
      'text': '3px 12px 4px rgba(0, 0, 0, 0.40)'
    },
    boxShadow: {
      'btn': '0px 4px 4px 0px rgba(0, 0, 0, 0.50)',
      'login-btn': '2px 4px 7px 1px rgba(0, 0, 0, 0.50)'
    },
    extend: {},
  },
  plugins: [],
}