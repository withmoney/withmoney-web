const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  mode: 'development',
  entry: resolve('src/index.ts'),
  output: {
    filename: 'main.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
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
