const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const path = require('path');

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/impresions', function(req, res) {
    res.sendFile(path.join(__dirname + '/mock-data/mock-impresions-data.json'));
});

app.get('/revenue', function(req, res) {
    res.sendFile(path.join(__dirname + '/mock-data/mock-revenue-data.json'));
});

app.get('/visits', function(req, res) {
    res.sendFile(path.join(__dirname + '/mock-data/mock-visits-data.json'));
});

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Metrics app listening on port 3000!\n');
});
