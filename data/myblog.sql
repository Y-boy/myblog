/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : myblog

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-02-22 15:23:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` varchar(16) CHARACTER SET utf8 NOT NULL,
  `password` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('admin', '123456');
INSERT INTO `user` VALUES ('admin-1', '123456');
INSERT INTO `user` VALUES ('admin-2', '123456');

-- ----------------------------
-- Table structure for userdetail
-- ----------------------------
DROP TABLE IF EXISTS `userdetail`;
CREATE TABLE `userdetail` (
  `userid` varchar(16) CHARACTER SET utf8 NOT NULL COMMENT '用户id',
  `nickName` varchar(16) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户昵称',
  `email` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户邮箱',
  `motto` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '封面格言',
  `portraitUrl` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户头像路径',
  `coverUrl` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '封面背景路径',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of userdetail
-- ----------------------------
INSERT INTO `userdetail` VALUES ('admin', 'Y-boy', '1027531092@qq.com', '皮皮虾，我们走', 'images/uploads/portrait/admin-1487746895868.jpg', 'images/uploads/cover/undefined-1487691994866.jpg');
INSERT INTO `userdetail` VALUES ('admin-1', null, null, null, null, null);
INSERT INTO `userdetail` VALUES ('admin-2', null, null, null, null, null);
