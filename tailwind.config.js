module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-theme": "#1a0f31",
        "light-gray": "#cbc8df",
        "gradient-pink": "#f33f72",
        "gradient-orange": "#ff716b",
        "secondary-light-pink": "#fcecf1",
        "secondary-dark-pink": "#f54576",
      },
    },
  },
  plugins: [require("daisyui")],
};
