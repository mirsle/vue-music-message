const mysql = require('mysql');

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'music-after'
})

connection.connect((error) => {
    if(error){
        console.log("链接成功")
    }else{
        console.log("链接成功")
    }
})
module.exports = connection