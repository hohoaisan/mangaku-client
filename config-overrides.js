// react-app-rewired config

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules[/\\](?!react-native-vector-icons)/,
    use: {
      loader: 'babel-loader',
      options: {
        // Disable reading babel configuration
        babelrc: false,
        configFile: false,

        // The configuration for compilation
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-flow',
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread',
        ],
      },
    },
  });

  // Include ttf font from react-native-vector-icons for web
  config.module.rules.push({
    test: /\.ttf$/,
    loader: 'file-loader',
    include: path.resolve(__dirname, './static/media/[name].[ext]'),
  });

  return config;
};
