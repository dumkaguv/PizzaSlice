import defineConfig from "tailwindcss";

export default defineConfig({
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: ["tailwindcss-animate"],
});
