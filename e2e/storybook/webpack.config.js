const path = require('path');

module.exports = {
  optimization: {
    minimize: false,
  },

  module: {
    rules: [
      {
        // only applies to the storybook file
        test: /storybook\/load-stories\.js$/,
        enforce: 'pre',
        loader: path.resolve(__dirname, '../scenario-loader.js'),
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
