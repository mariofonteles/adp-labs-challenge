const path = require('path');

module.exports = {
  mode: 'none',
  entry: './frontend/src/index.js',
  output: {
    path: `${__dirname}/frontend/dist`,
    filename: 'bundle.js',
    library: 'bundle',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'frontend', 'dist'),
    publicPath: '/frontend/dist',
  },
};
