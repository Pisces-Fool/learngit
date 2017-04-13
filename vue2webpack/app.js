var express = require('express');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./build/webpack-base-config');

var app = express();// 创建一个express实例
var compiler = webpack(webpackConfig);// 调用webpack并把配置传递过去
// 使用 webpack-dev-middleware 中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
   publicPath: '/',
   stats: {
     colors: true,
    chunks: false
  }});

app.use(devMiddleware);

module.exports = app;
