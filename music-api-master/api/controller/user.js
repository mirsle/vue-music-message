const user = require('../model/user');
const jwt = require('jsonwebtoken');

//获取用户信息
const getInfo = (req,res) => {
    res.json({
        code:1,
        data:{
            username:req.info.username
        }
    })
}

//注册
const register = async(req,res,next) => {
    const {username,password} = req.body;
    if(username && password){
        try {
            const data = await user.isHas(username,password);
            if(JSON.stringify(data) == "{}"){
                await user.insert(username,password)
                res.json({
                    code:1,
                    message:'注册成功'
                })
            }else{
                res.status(422).json({
                    code:2,
                    message:'该用户已经注册'
                })
            }
        }catch(e){
            res.status(422).json({
                name:'ValidateFail',
                message:'注册失败',
                code:0
            })
        }
    }else{
        res.status(422).json({
            name:'ValidateFail',
            message:'参数不完整',
            code:0
        })
    }
}

//登录
const login = async (req,res,next) => {
    const {username,password} = req.body;
    try {
        const data = await user.find(username,password);
        if(Object.keys(data).length <=0){
            res.status(422).json({
                code:0,
                name:'ValidateFail',
                message:'用户名密码错误'
            })
        }else{
            const token = jwt.sign({
                ...data,
                exp:(+new Date())+600000
            },'lixd')
            res.json({
                code:1,
                message:'登录成功',
                token
            })
        }

    }catch(e){
        res.status(422).json({
            code:0,
            name:'ValidateFail',
            message:'用户名密码错误'
        })
    }
}


module.exports = {
    register,
    login,
    getInfo
}