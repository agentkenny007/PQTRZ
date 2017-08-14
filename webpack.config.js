const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { app: './App/index.js' },
  output: {
    filename: '[name].js',
		path: path.join(__dirname, 'Public', 'js'),
		publicPath: '/js',
  },
  devtool: 'inline-source-map',
//   plugins: [
// +     new CleanWebpackPlugin(['Public/js']),
//       new HtmlWebpackPlugin({
//         title: 'Output Management'
//       })
//   ],
  module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ]
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['babel-preset-react-app'],
            cacheDirectory: true,
          }
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[hash:4].[ext]',
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    }
};
