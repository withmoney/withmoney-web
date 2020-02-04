const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  mode: 'development',
  entry: resolve('src/index.ts'),
  output: {
    filename: 'main.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      // filename: path.relative(__dirname, 'dist/index.html')
      template: resolve('public/index.html')
    })
  ],
  devtool: 'source-map'
};
