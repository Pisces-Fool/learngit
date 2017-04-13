var mongoose = require('mongoose')
var config = require('./config')

module.exports = function(){
	db = mongoose.connect(config.mongdb);

	require('../app/models/news.server.model');

	return db;
}