import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "common-modal-open": {
          "0%": {
            transform: "scale(0)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        "common-modal-close": {
          "100%": {
            transform: "scale(0)",
          },
          "0%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        commonModalOpen: "common-modal-open 0.2s forwards ease-in",
        commonModalClose: "common-modal-close 0.2s forwards ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
