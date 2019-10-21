const mysql = require("mysql");
const DBConfig = require("../config/DBcongfig");
// 创建连接池
const pool = mysql.createPool(DBConfig);

let allSqlAction = (sql, value) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err,connection) {  
            if(err){
                console.log(err);
                reject(err);
            } else {
                console.log("数据库连接成功");
                connection.query(sql, function (err, results, fields){
                    connection.release();
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(results);
                    }
                })
            }
        })
    })
}
module.exports = {
    allSqlAction
}