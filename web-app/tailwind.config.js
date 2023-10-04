/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.9)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
        collapseShow: {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        collapseHide: {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        overlayShow: "overlayShow 200ms ease",
        contentShow: "contentShow 200ms ease",
        collapseShow: "collapseShow 300ms ease",
        collapseHide: "collapseHide 300ms ease",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
