const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@src': path.resolve(__dirname, 'src'),
      // add more aliases here if needed
    })
  ),

  jest: (config) => {
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      '^@src/(.*)$': '<rootDir>/src/$1',
      '^.+\\.module\\.(css|scss)$': 'identity-obj-proxy',
    };

    config.transformIgnorePatterns = [
      'node_modules/(?!(axios)/)', // Let Babel transform axios if needed
    ];

    return config;
  },
};
