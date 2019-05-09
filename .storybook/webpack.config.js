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
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
