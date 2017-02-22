// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {

	// 用户注册
	regUser: function (req, res, next, callback) {
		pool.getConnection(function(err, connection) {
			var param = req.body;
			connection.query($sql.regUser, [param.userid, param.password], function(err, results) {
				if(err) throw err;
				callback(err, results);
				connection.release();
			});
		});
	},
	addUser: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.body;
			connection.query($sql.addUser, param.userid, function(err, results) {
				if(err) throw err;
				connection.release();
			});
		});
	},

	// 用户登录
	login: function (req, res, next, callback) {
		pool.getConnection(function(err, connection) {
			var param = req.body;
			// console.log(param.userid+" "+param.password);
			connection.query($sql.login, param.userid, function(err, results) {
				// jsonWrite(res, results);
				if(err) throw err;
				callback(err, results);
				connection.release();
			});
		});
	},

	// 读取用户数据
	queryByUserid: function (req, res, next, callback) {
		pool.getConnection(function(err, connection) {
			var param = req.body;
			connection.query($sql.queryByUserid, param.userid, function(err, results) {
				callback(err, results);
				connection.release();
			});
		});
	},

	// 修改用户数据
	updateUserDetail: function (req, res, next, callback) {
		console.log(req.body);
		pool.getConnection(function(err, connection) {
			var param = [req.body.nickName, req.body.email, req.body.motto, req.body.portraitUrl, req.body.coverUrl, req.body.userid];
			console.log(param);
			connection.query($sql.updateUserDetail, param, function(err, results) {
				// console.log(results);
				callback(err, results);
				connection.release();
			});
		});
	},


};