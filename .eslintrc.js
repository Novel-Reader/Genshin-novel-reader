module.exports = {
  settings: {
    react: {
      version: "detect" // 或者明确指定版本号，例如 "17.0"
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
    quotes: "off",
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
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
  },
};
