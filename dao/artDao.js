// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {

	// 游客查询文章
	queryAllArt: function(req, res, callback){
		pool.getConnection(function(err, connection){
			connection.query($sql.queryAllArt, function(err, results){
				if(err) throw err;
				callback(err, results);
				connection.release();
			});
		});
	},

	// 发布文章
	addArt: function(req, res, callback){
		pool.getConnection(function(err, connection){
			// console.log(req.body);
			var params = [
					req.body.author,
					req.body.author+"-"+Date.now(),
					Date.now(),
					req.body.content,
					req.body.articleCoverUrl,
					req.body.abstract,
					req.body.title
				];
			connection.query($sql.addArt, params, function(err, results){
				if(err) throw err;
				callback(err, results);
				connection.release();
			});
		});
	},

	// 根据作者id获取文章
	queryArtByUserid: function(req, res, callback){
		pool.getConnection(function(err, connection){
			connection.query($sql.queryArtByUserid, req.params.userid, function(err, result){
				if(err) throw err;
				callback(err, result);
				connection.release();
			});
		});
	},

	// 根据文章id获取文章
	queryArtByArticleid: function(req, res, callback){
		pool.getConnection(function(err, connection){
			connection.query($sql.queryArtByArticleid, req.params.articleid, function(err, result){
				if(err) throw err;
				callback(err, result);
				connection.release();
			});
		});
	}
};