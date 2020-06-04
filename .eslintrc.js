module.exports = {
  env: {
    browser: false,
    es6: true,
  },
  extends: ["airbnb", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "prettier/prettier": "error",
  },
};
