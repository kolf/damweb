var path    = require('path');
var express = require('./node_modules/express');
// var webpack = require('webpack');
// var config  = require('./webpack.config.dev');

var app = express();
// var compiler = webpack(config);

// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));

// app.use(require('webpack-hot-middleware')(compiler));

app.use('/src', express.static('src'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const host = "3002";
const ip = "0.0.0.0";
// const ip = "192.168.3.196";

app.listen(host, ip, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at Edit http://'+ip+':'+host);
});