// SQL语句
var post = {
  insert:'INSERT INTO post(id, title, content) VALUES(0,?,?)',
  update:'update post set title=?, content=? where id=?',
  delete: 'delete from post where id=?',
  queryById: 'select * from post where id=?',
  queryAll: 'select * from post'
};

module.exports = post;