module.exports = {
  extends: [
    "../.eslintrc.js",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
  ],
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-curly-brace-presence": ["warn", { props: "always" }],
    "react/jsx-sort-props": ["warn"],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ["vite.config.ts"],
      env: {
        node: true,
      },
    },
    {
      files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:jest-dom/recommended", "plugin:testing-library/react"],
      env: {
        jest: true,
      },
    },
  ],
};
