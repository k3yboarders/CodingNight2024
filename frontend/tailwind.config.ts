import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'gradient-1': '#7286ff',
        'gradient-2': '#fe7587',
        'divider': '#f5f5f51a',
      },
    },
  },
  plugins: [],
} satisfies Config;
