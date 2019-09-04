const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        jwt.verify(req.headers.token,'lixd',(err,decoded) => {
            if(!err){
                req.info = decoded;
                if(new Date().getTime() > decoded.exp){
                    res.json({
                        name:'Unauthorized',
                        message:'用户未登录',
                        code:2
                    })
                }else{
                    next()
                }
            }else{
                res.status(401).json({
                    name:'Unauthorized',
                    message:'用户未登录',
                    code:0
                })
            }
        })
    }catch(e){
        res.status(401).json({
            name: 'Unauthorized',
            message: '用户未登录',
            code: 0
        })
    }
}