// CRUD SQL语句
var user = {
	// insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
	// update:'update user set name=?, age=? where id=?',
	// delete: 'delete from user where id=?',
	// queryById: 'select * from user where id=?',
	// queryAll: 'select * from user',

	// regUser: 'insert into user value(?,?)',
	// regUser: 'insert into user value(?,?)',
	// login: 'select * from user where userid=?',
	regUser: 'insert into user value(?,?)',
	login: 'select * from user where userid=?',

	addUser: 'insert into userdetail(userid) value(?)',
	updateUserDetail: 'update userdetail set nickName=?, email=?, motto=?, portraitUrl=?, coverUrl=? where userid=?',
	queryByUserid: 'select * from userdetail where userid=?',

	queryAllArt: 'select * from userarticle order by createDate desc',
	addArt: 'insert into userarticle(userid, articleid, createDate, content, articleCoverUrl, abstract, title) value(?,?,?,?,?,?,?)',
	queryArtByUserid: 'select * from userarticle where userid=? order by createDate desc',
	queryArtByArticleid: 'select * from userarticle where articleid=? order by createDate desc'
};

module.exports = user;