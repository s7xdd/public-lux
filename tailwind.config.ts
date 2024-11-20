// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b88c4f",           // Primary button background
        secondary: "#f0dac6",          // Secondary hover background color
        hoverText: "#343434",          // Hover text color
        borderColor: "#343434",        // For borders on hover
      },
      spacing: {
        sectionPadding: "4rem",       // Padding for sections
        containerPadding: "2rem",     // Padding for containers
        buttonPaddingX: "30px",       // Button horizontal padding
        buttonPaddingY: "8px",        // Button vertical padding
        defaultGap: "1.5rem",         // Default gap between elements
        cardPadding: "1.25rem",       // Padding inside cards
      },
      borderRadius: {
        buttonRadius: "9999px",       // Fully rounded button
      },
      fontFamily: {
        'red-hat-display': ['"Red Hat Display"', 'sans-serif'],
        'philosopher': ['"philosopher"','sans-sherif'],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
};
