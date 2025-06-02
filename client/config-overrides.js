const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@src': path.resolve(__dirname, 'src'),
    // add more aliases here if needed
  })
);
