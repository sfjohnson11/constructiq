const config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0c2340",       // Deep Blue
        accent: "#ffc72c",        // Rich Gold
        background: "#f4f4f4",    // Light background
        card: "#ffffff",          // White cards
        text: "#1f2937",          // Slate text
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}

export default config;

