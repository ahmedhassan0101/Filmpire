module.exports = {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // ... other paths
  ],
  theme: {
    extend: {
      // Add if needed for custom animations
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1', 
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards'
      }
    }
  },
  // ... rest of config
}