module.exports = {
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    es6: true,
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  ignorePatterns: [
    "build/*",
    "dist/*",
    "node_modules/*",
    "src/tests/*",
    "src/locale/*",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react-hooks"],
  rules: {
    indent: "off",
    "n/handle-callback-err": "off",
    eqeqeq: "off",
    "prefer-const": "off",
    quotes: "off",
    "react/prop-types": "off",
    camelcase: "off",
    semi: [2, "always"],
    "no-console": "warn",
    "no-unused-vars": "warn",
    "no-unreachable": "warn",
    "no-redeclare": "warn",
    "no-multiple-empty-lines": "off",
    "padded-blocks": "off",
    "no-trailing-spaces": "off",
    "react/no-children-prop": "off",
    "space-before-function-paren": "off",
    "multiline-ternary": "off",
    "comma-dangle": "off",
    "no-useless-return": "off",
    "operator-linebreak": "off",
    "object-shorthand": "off",
    "brace-style": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
