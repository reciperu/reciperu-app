module.exports = {
  root: true,
  extends: [
    'universe/native',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
