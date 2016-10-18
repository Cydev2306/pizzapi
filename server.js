const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const path = require('path');
const app = require('express')();
const port = process.env.PORT || 3000;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

function indexHtmlHandler(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

function listenningHander(error) {
  if (error) {
    throw error;
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
}

app.use(indexHtmlHandler);
app.listen(port, listenningHander);
