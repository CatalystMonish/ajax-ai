/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        heading: "1.875rem",
        title: "2.5rem",
        label: "1.25rem",
        "label-small": "0.9375rem",
        body: "1.125rem",
        content: "1.375rem",
      },
      fontWeight: {
        heading: "500",

        title: "500",

        label: "500",

        "label-small": "500",

        body: "400",

        content: "500",
      },
      colors: {
        white: "#FFFFFF",
        primary: "#000887",
        "text-light": "#939393",
        light: "#f8fafc",
        dark: "#000000",
        green: "#219653",
        lightgray: "#939393",
        highlight: "#f2f5f8",
        border: "#D0D0D0",
        background: "#2E2E54",
        container: "#3E3E72",
        card: "#343563",
      },
      margin: {
        "m-5": "0.313rem",
        "m-10": "0.625rem",
        "m-15": "0.9375rem",
        "m-20": "1.25rem",
        "m-30": "1.875rem",
      },
      spacing: {
        "s-5": "0.313rem",
        "s-10": "0.625rem",
        "s-15": "0.9375rem",
        "s-20": "1.25rem",
        "s-17": "1.0625rem",
      },
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
