/*
Navicat MySQL Data Transfer

Source Server         : lixd
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : music-after

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-08-05 08:40:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for song
-- ----------------------------
DROP TABLE IF EXISTS `song`;
CREATE TABLE `song` (
  `id` varchar(11) NOT NULL,
  `music_name` varchar(255) DEFAULT NULL,
  `singer_name` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `isup` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of song
-- ----------------------------
INSERT INTO `song` VALUES ('30kw2sl4ya0', 'lixd1', '123456', '1', '1');
