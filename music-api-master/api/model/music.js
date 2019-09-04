const db = require('../../db')

//插入数据
const insert = (id,music_name,singer_name,pic,isup) => {
    return new Promise((resolve,reject) => {
        let create_time = new Date();
        db.query('insert into song (id,music_name,singer_name,pic,isup,create_time) values (?,?,?,?,?,?)',[
            id,music_name,singer_name,pic,isup,create_time
        ],(error,res) => {
            if(!error){
                resolve(res)
            }else{
                reject(error)
            }
        })
    })
}

//判断歌曲是否存在
const find = (music_name) => {
    return new Promise((resolve,reject) => {
        db.query('select * from song where music_name=?',[
            music_name
        ],(error,res) => {
            if(!error){
                resolve({...res[0]})
            }else{
                reject(error)
            }
        })
    })
}

//修改歌曲
const update = (id,music_name,singer_name,pic,isup) => {
    return new Promise((resolve,reject) => {
        db.query('update song set music_name=?,singer_name=?,isup=?,pic=? where id=?',[music_name,singer_name,isup,pic,id],
        (error,res) => {
            if(!error){
                resolve(res)
            }else{
                reject(error)
            }
        })
    })
}
//修改歌曲图片
const updatePic = (id,pic) => {
    return new Promise((resolve,reject) => {
        db.query('update song set pic=? where id=?',[pic,id],
        (error,res) => {
            if(!error){
                resolve(res)
            }else{
                reject(error)
            }
        })
    })
}
//删除歌曲
const deleteMusic = (id) => {
    return new Promise((resolve,reject) => {
        db.query('delete from song where id=?',[id],
        (error,res) => {
            if(!error){
                resolve(res)
            }else{
                reject(error)
            }
        })
    })

}
//查询歌曲
const querymusic = (pagenum,limitNum) => {
    let start = (pagenum-1)*limitNum;
    return new Promise((resolve,reject) => {
        db.query('select * from song order by create_time limit ?,?',[start,limitNum*1],(error,res) => {
            if(!error){
                resolve(res)
            }else{
                reject(error)
            }
        })
    })
}

//查询的所有条数
const count = () => {
    return new Promise((resolve,reject) => {
        db.query('select count(id) from song',(error,res) => {
            if(!error){
                resolve(res)
            }else{
                reject(error)
            }
        })
    })
}

module.exports = {
    insert,
    find,
    update,
    updatePic,
    deleteMusic,
    querymusic,
    count
}