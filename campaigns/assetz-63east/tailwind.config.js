import preset from "../../shared2/tailwind.preset.js";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../shared2/src/**/*.{js,ts,jsx,tsx}",
  ],
};
