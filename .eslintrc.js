module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'quotes': 'off',
    'semi': 'warn',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'no-unreachable': 'warn',
    'no-redeclare': 'warn',
  }
}
