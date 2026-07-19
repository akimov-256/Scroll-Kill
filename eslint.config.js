import globals from "globals";
 
export default [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "dist/**", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.browser,
        chrome: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];
 