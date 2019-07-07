const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body',
  chunksSortMode: 'dependency',
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, './static'),
    to: 'static',
    ignore: ['.*'],
  },
]);

const CleanWebpackPluginConfig = new CleanWebpackPlugin();

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  mode: 'development',
  entry: ['webpack-hot-middleware/client?path=__webpack_hmr&reload=true', resolve('src/main.js')],
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      api: resolve('src/api'),
      app: resolve('src/'),
      components: resolve('src/components'),
      pages: resolve('src/pages'),
      store: resolve('src/store/modules'),
      styles: resolve('src/assets/style.scss'),
    },
  },
  devtool: 'source-map',
  plugins: [
    CleanWebpackPluginConfig,
    CopyWebpackPluginConfig,
    HtmlWebpackPluginConfig,
    new DotenvPlugin({
      sample: './.env.example',
      path: './.env',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
};
