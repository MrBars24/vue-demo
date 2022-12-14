/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    "vue/setup-compiler-macros": true,
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
