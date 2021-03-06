module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["warn", 2],
    "no-irregular-whitespace": "warn",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "no-trailing-spaces": "error",
    semi: ["error", "always"],
    "semi-style": ["error", "last"],
  },
};
