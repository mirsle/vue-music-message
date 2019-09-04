const db = require('../../db')

let node_uid = require('node-uid')

//插入数据
const insert = (username,password) => {
    return new Promise((resolve,reject) => {
        db.query('insert into userlist (uid,username,password) values (?,?,?)',[
            node_uid(),username,password
        ],(error,res) => {
            if(!error){
                resolve(res)
            }else{
                reject(error)
            }
        })
    })
}

//判断用户是否登录
const find = (username,password) => {
    return new Promise((resolve,reject) => {
        db.query('select * from userlist where username=? and password=?',[
            username,password
        ],(error,res) => {
            if(!error){
                resolve({...res[0]})
            }else{
                reject(error)
            }
        })
    })
}

//查询用户是否已经存在
const isHas = (username) => {
    return new Promise((resolve,reject) => {
        db.query('select * from userlist where username=?',[username],
        (error,res) => {
            if(!error){
                resolve({...res[0]})
            }else{
                reject(error)
            }
        })
    })
}


module.exports = {
    insert,
    find,
    isHas
}