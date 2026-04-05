const path = require('path');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            [
              'react-app',
              {
                flow: false,
                typescript: true,
              },
            ],
          ],
        },
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  // Required for absolute imports in Storybook
  const resolvedModules = config.resolve.modules || [];
  config.resolve.modules = [...resolvedModules, path.resolve(process.cwd(), 'src')];

  // react-resize-detector v12 requires Webpack 5 / ES modules support.
  // Replace it with a lightweight CJS shim for Storybook's Webpack 4 build.
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-resize-detector': path.resolve(__dirname, 'mocks/react-resize-detector.js'),
  };

  return config;
};
