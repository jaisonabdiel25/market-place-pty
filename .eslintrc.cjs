module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "node_modules/standard/eslintrc.json",
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // Aquí puedes agregar tus reglas personalizadas
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
    },
  },
};
