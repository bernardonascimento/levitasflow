module.exports = {
  root: true,
  env: {
    es2022: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: ["../../../*", "../../../../*", "../../../../../*"]
      }
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"]
  },
  overrides: [
    {
      files: ["*.js", "*.cjs", "*.mjs"],
      rules: {
        "@typescript-eslint/no-require-imports": "off"
      }
    }
  ],
  ignorePatterns: ["node_modules", "dist", "build", ".next", ".turbo", "coverage"]
};
