module.exports = {
  content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}"],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      animation: {
        text: "text 5s ease infinite",
        background: "background 20s ease infinite",
      },
      keyframes: {
        background: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        text: {
          "0%, 100%": {
            "background-size": "100% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "400% 100%",
            "background-position": "right center",
          },
        },
      },
    },
    fontFamily: {
      bold: ["nunito", "sans-serif"],
      medium: ["nunito", "sans-serif"],
    },
  },
  variants: {},
  plugins: [],
};
