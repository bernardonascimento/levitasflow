module.exports = {
  extends: [
    require.resolve("./base.cjs"),
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-native/all"
  ],
  env: {
    "react-native/react-native": true,
    es2022: true
  },
  plugins: ["react", "react-native"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-native/no-inline-styles": "off"
  }
};
