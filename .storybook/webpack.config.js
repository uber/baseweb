const path = require('path');

module.exports = {
  optimization: {
    minimize: false,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'import-glob',
        include: [path.resolve(__dirname)],
      },
    ],
  },
};
