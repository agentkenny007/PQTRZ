const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: { app: './App/index.js' },
  output: {
    filename: '[name].js',
		path: path.join(__dirname, 'Public', 'js'),
		publicPath: '/js',
  },
  devtool: 'inline-source-map',
  plugins: [
      new webpack.DefinePlugin('process.env'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: process.env.NODE_ENV === 'production'
      }),
  ],
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
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
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
  },
  devServer: {
    proxy: {
      contentBase: './dist',
      '*': {
        target: 'http://localhost:8081',
        secure: false,
        headers: { "X-DevServer": "1" }
      }
    }
  }
};
