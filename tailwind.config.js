/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#fff8ed',
          100: '#ffefd5',
          500: '#f19a3e',
          600: '#d87922',
        },
        leaf: {
          50: '#f0f8ee',
          100: '#dcefd6',
          500: '#6ea86a',
          700: '#3f7442',
        },
        ink: '#2f302c',
      },
      fontFamily: {
        sans: ['Inter', 'Microsoft YaHei', 'PingFang SC', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gentle: '0 18px 45px rgba(93, 67, 37, 0.11)',
      },
    },
  },
  plugins: [],
};
