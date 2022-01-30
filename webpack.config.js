
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: {
    index: './src/index.tsx'
  },

  // output
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
  },

  // plugins
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/components/order/order.php' },
        { from: './src/index.html' },
        { from: './src/components/assets' }
      ]
    })
  ],

  // devserver
  devServer: {
    host: 'localhost',
    port: 8989,
    contentBase: 'dist',
    open: true,
  },

  // loaders
  module: {
    rules: [
      { test: /\.html$/i, loader: 'html-loader' },
      { test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      })
    ],
  },
};
