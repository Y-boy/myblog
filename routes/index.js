var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// 路径模块
var multer = require ('multer');
// 引入multer模块
var router = express.Router();
var userDao = require('../dao/userDao');
var artDao = require('../dao/artDao');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
	if(req.cookies.islogin){
		res.locals.islogin = req.cookies.islogin;
	}
	artDao.queryAllArt(req, res, function(err, results){
		res.render('index', {
			title: 'welcome',
			user: res.locals.islogin,
			artArr: results
		});
	});
});

router.route('/login')
	.get(function(req, res) {
		if(req.session.islogin){
			res.locals.islogin = req.session.islogin;
		}
		if(req.cookies.islogin){
			req.session.islogin = req.cookies.islogin;
		}
		res.render('login', { title: '用户登录', user: res.locals.islogin});
	})
	.post(function(req, res, next) {
		// console.log(req.body);
		userDao.login(req, res, next, function(err, results){
			if(results[0] === undefined){
				res.send('没有该用户');
			}else{
				if(results[0].password === req.body.password){
					req.session.islogin = req.body.userid;
					res.locals.islogin = req.session.islogin;
					res.cookie('islogin', res.locals.islogin);
					res.redirect('/home/'+req.body.userid);
				}else {
					res.redirect('/login');
				}
			}
		});
	});

router.get('/logout', function(req, res) {
	res.clearCookie('islogin');
	req.session.destroy();
	res.redirect('/');
});

router.route('/register')
	.get(function(req, res){
		res.render('register', {title:'Register'});
	})
	.post(function(req, res, next) {
		userDao.regUser(req, res, next, function(err, results){
			res.send('注册成功'+"<br/><a href=\"\\login\">返回登录页</a>");
		});
		userDao.addUser(req, res, next);
	});

router.route('/home/:userid')
	.get(function(req, res, next) {
		if(req.session.islogin){
			res.locals.islogin = req.session.islogin;
		}
		if(req.cookies.islogin){
			req.session.islogin = req.cookies.islogin;
		}
		userDao.queryByUserid(req, res, next, function(err, results){
			artDao.queryArtByUserid(req, res,function(err, result){
				res.render('home', {
					title: 'Home',
					user: results[0],
					artArr: result
				});
			})
		});
	})
	// .post(function(req, res, next){
	// 	req.body.userid = req.session.islogin;
	// 	console.log(req.body.userid);
	// 	userDao.queryByUserid(req, res, next, function(err, results){
	// 		console.log("------ userDao.queryByUserid ------");
	// 		console.log(results);
	// 		console.log("------ userDao.queryByUserid ------");
			
	// 		// res.render('home');
	// 		res.send({
	// 			userDetail: results
	// 		});
	// 	});
	// });

router.post('/submitUserDetail', function(req, res, next){
	userDao.updateUserDetail(req, res, next, function(err, results){
		res.send({
			data: req.body
		});
	});
});

// --------------------图片上传-------------------
var path_cover = '/images/uploads/cover';
// 用户封面图片
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../public"+path_cover));
	},
	filename: function (req, file, cb) {
		var fileType = file.originalname.split('.')[1];
		// 获取文件后缀
		cb(null, req.cookies.islogin +'-' + Date.now() +"."+ fileType);
		// 为保存的文件设置文件名
	}
});
var upload = multer({ storage: storage });
router.post('/coverUpload', upload.single('cover'), function (req, res, next) {
	if(req.session.islogin){
		res.locals.islogin = req.session.islogin;
	}
	if(req.cookies.islogin){
		req.session.islogin = req.cookies.islogin;
	}
	res.send({
		path: path_cover,
		file: req.file
	});
	// res.location(path_cover +"/"+ req.file.filename);
	// res.redirect(path_cover +"/"+ req.file.filename);
	// var files = fs.readdirSync('public/images/uploads/cover');
	// console.log(files);
	// res.render('home', {
	//   title: 'Home',
	//   user: res.locals.islogin,
	//   pics: files,
	//   path: req.file.destination
	// });
});
var path_portrait = '/images/uploads/portrait';
// 用户封面图片
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../public"+path_portrait));
	},
	filename: function (req, file, cb) {
		var fileType = file.originalname.split('.')[1];
		// 获取文件后缀
		cb(null, req.cookies.islogin +'-' + Date.now() +"."+ fileType);
		// 为保存的文件设置文件名
	}
});
var upload = multer({ storage: storage });
router.post('/portraitUpload', upload.single('portrait'), function (req, res, next) {
	if(req.session.islogin){
		res.locals.islogin = req.session.islogin;
	}
	if(req.cookies.islogin){
		req.session.islogin = req.cookies.islogin;
	}
	res.send({
		path: path_portrait,
		file: req.file
	});
});
// --------------------图片上传-------------------

// 路由到发文章页面
router.route('/publish/:userid')
	.get(function(req, res, next) {
		if(req.session.islogin){
			res.locals.islogin = req.session.islogin;
		}else{
			res.redirect('/');
		}
		if(req.cookies.islogin){
			req.session.islogin = req.cookies.islogin;
		}
		res.render('publish', {
			title: 'Writing Article',
			user: {
				userid: req.params.userid
			}
		});
	});

router.post('/publishArticle', function(req, res, next){
// 发布文章
	console.log(req.body);
	artDao.addArt(req, res, function(err, results){
		res.send({
			data: req.body
		});
	});
});

var path_artCover = '/images/uploads/artCover';
// 用户封面图片
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../public"+path_artCover));
	},
	filename: function (req, file, cb) {
		var fileType = file.originalname.split('.')[1];
		// 获取文件后缀
		cb(null, req.cookies.islogin +'-aritcle-' + Date.now() +"."+ fileType);
		// 为保存的文件设置文件名
	}
});
var upload = multer({ storage: storage });
router.post('/artCoverUpload', upload.single('artcover'), function (req, res, next) {
	if(req.session.islogin){
		res.locals.islogin = req.session.islogin;
	}
	if(req.cookies.islogin){
		req.session.islogin = req.cookies.islogin;
	}
	res.send({
		path: path_artCover,
		file: req.file
	});
});
// --------------------图片上传-------------------

router.get('/article/:articleid', function(req, res, next){
	artDao.queryArtByArticleid(req, res, function(err, result){
		res.render('article',{
			title: 'Article',
			article: result[0]
		})
	})
});
module.exports = router;
