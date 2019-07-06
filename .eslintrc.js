module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
