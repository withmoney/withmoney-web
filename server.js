const express = require('express');
const webpack = require('webpack');

const config = require('./webpack.config');

const compiler = webpack(config);

const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  log: false,
  hot: true,
  quiet: true,
  stats: 'none',
}));
app.use(require('webpack-hot-middleware')(compiler));

const port = process.env.NODE_PORT || 8080;

app.listen(port, () => {
  console.log(`Server online on port: ${port}`);
});
