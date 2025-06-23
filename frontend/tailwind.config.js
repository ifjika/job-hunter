module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0e0e0e", // soft black
        primary: "#ffffff",
        secondary: "#9ca3af", // gray-400
        accent: "#38bdf8", // sky-400 (for CTA button, etc.)
      },
    },
  },
  plugins: [],
};
