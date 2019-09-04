/*
Navicat MySQL Data Transfer

Source Server         : lixd
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : music-after

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-08-05 08:40:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for userlist
-- ----------------------------
DROP TABLE IF EXISTS `userlist`;
CREATE TABLE `userlist` (
  `uid` varchar(11) NOT NULL DEFAULT '0',
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userlist
-- ----------------------------
INSERT INTO `userlist` VALUES ('v65vxtvkte8', 'lixd', '123456');
INSERT INTO `userlist` VALUES ('23cypzyoww8', 'zs', '123');
INSERT INTO `userlist` VALUES ('23umzxwvwz3', 'ls', '123');
