const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: resolve('src/index.ts'),
  output: {
    filename: 'main.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new DotEnv(),
    new webpack.DefinePlugin({
      'process.env': {
        APOLLO_SERVER_API: JSON.stringify(process.env.APOLLO_SERVER_API),
      },
    }),
    new HTMLWebpackPlugin({
      template: resolve('public/index.html'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 4000,
  },
  devtool: 'source-map',
};
