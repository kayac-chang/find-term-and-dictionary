module.exports = {
  mode: "jit",
  purge: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: "#F6F8FF",
        text: "#222731",

        blue: {
          darkest: "#697C9A",
          dark: "#4B6A9B",
          light: "#0079FF",
        },

        white: {
          light: "#FEFEFE",
          DEFAULT: "#FFFFFF",
        },
      },

      boxShadow: {
        DEFAULT: "0px 16px 30px -10px rgba(70, 96, 187, 0.198567)",
      },
    },
  },
  plugins: [],
};
