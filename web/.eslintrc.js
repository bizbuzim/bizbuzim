module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "react-app"
  ],
  plugins: ["@typescript-eslint"],
  env: { browser: true },
  rules: {
    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/order": ["error", { "newlines-between": "always" }],
    "no-console": ["error", { allow: ["warn"] }],
    "react/react-in-jsx-scope": "off"
  },
};


