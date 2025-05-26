const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Option 1: Ignore the module completely
      webpackConfig.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^@react-native-async-storage\/async-storage$/,
        })
      );

      // Option 2: Alias to a mock (jika file mock kita sebelumnya ingin digunakan secara eksplisit)
      // Jika menggunakan ini, pastikan path ke mock benar dan hapus/komentari Option 1
      // const path = require('path');
      // webpackConfig.resolve.alias = {
      //   ...webpackConfig.resolve.alias,
      //   '@react-native-async-storage/async-storage': path.resolve(__dirname, 'src/__mocks__/@react-native-async-storage/async-storage.js'),
      // };

      return webpackConfig;
    },
  },
}; 