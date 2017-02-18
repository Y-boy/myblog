var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

var path = require('path');
// 路径模块
var multer = require ('multer');
// 引入multer模块

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res) {
	if(req.cookies.islogin){
		res.locals.islogin = req.cookies.islogin;
	}
	res.render('index', { title: 'INDEX', user: res.locals.islogin});
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
		userDao.login(req, res, next, function(err, results){
			console.log(results);
			if(results[0] === undefined){
				res.send('没有该用户');
			}else{
				if(results[0].password === req.body.password){
					req.session.islogin = req.body.userid;
					res.locals.islogin = req.session.islogin;
					res.cookie('islogin', res.locals.islogin, {maxAge:60000});
					res.redirect('/home');
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

router.get('/home', function(req, res) {
	if(req.session.islogin){
		res.locals.islogin = req.session.islogin;
	}else{
		console.log(res.locals.islogin);
		res.redirect('/');
	}
	if(req.cookies.islogin){
		req.session.islogin = req.cookies.islogin;
	}
	res.render('home', {
		title: 'Home',
		user: res.locals.islogin,
		pics: []
	});
});

router.route('/register')
	.get(function(req, res){
		res.render('register', {title:'Register'});
	})
	.post(function(req, res, next) {
		userDao.regUser(req, res, next, function(err, results){
			res.send('注册成功'+"<br/><a href=\"\\login\">返回首页</a>");
		});
	});

// --------------------图片上传-------------------
var path_cover = 'images/uploads/cover';
// 用户封面图片
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/"+path_cover));
  },
  filename: function (req, file, cb) {
    var fileType = file.originalname.split('.')[1];
    // 获取
    cb(null, req.cookies.islogin +'-' + Date.now() +"."+ fileType);
  }
});
var upload = multer({ storage: storage });
router.post('/coverUpload', upload.single('cover'), function (req, res, next) {
  // res.end("upload success");
  // var files = fs.readdirSync('public/images/uploads/cover');
  // console.log(files);
  // res.render('home', {
  //   title: 'Home',
  //   user: res.locals.islogin,
  //   pics: files,
  //   path: req.file.destination
  // });
  res.redirect(path_cover+"/"+req.file.filename);
});
// --------------------图片上传-------------------

module.exports = router;
