module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eol-last': 0,
    'max-len': 0,
    'no-shadow': 0,
    'no-prototype-builtins': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
