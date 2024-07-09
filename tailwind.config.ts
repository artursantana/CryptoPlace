import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#ddd',
        customDark: '#3c3c3c',
        customDarkBlue: '#09005c',
        customPurple: '#7927ff',
        customPurple2: '#69029926',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.grid-custom': {
          display: 'grid',
          gridTemplateColumns: '0.5fr 2fr 1fr 1fr 2fr',
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};

export default config;
