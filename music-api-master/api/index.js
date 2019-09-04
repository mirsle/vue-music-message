const express = require('express');

let router = express.Router();

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split('.')
    cb(null,'img-' + Date.now() + '.' +fileName[1])
  }
})
var upload = multer({ storage })

const userController = require('./controller/user');
const baseController = require('./controller/base')
const musicController = require('./controller/music')
const checkLogin = require('./middleware/checkLogin');

//用户相关的接口

//注册接口
router.post('/registry',userController.register)

//登录接口
router.post('/login',userController.login)

router.get('/userinfo',checkLogin,userController.getInfo);

//上传图片
router.post('/upload',upload.single('file'),baseController.upload);

//添加歌曲
router.post('/addmusic',checkLogin,musicController.addmusic);
//修改歌曲
router.post('/updatemusic',checkLogin,musicController.updatemusic);
//上架/下架歌曲
// router.post('/musicshelf',checkLogin,musicController.musicShelf);
//删除歌曲
router.get('/deletemusic',checkLogin,musicController.deletemusic);

//歌曲列表
router.get('/querymusic',checkLogin,musicController.queryMusic);

module.exports = router;
