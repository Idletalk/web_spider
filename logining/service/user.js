const allSqlAction = require("../lib/mysql");

async function checkUser(phone, password) {
    let sql = `select * from elm_user where elm_userPhone = ${phone} and elm_userPassword = ${password}`;
    return allSqlAction.allSqlAction(sql).then(res => {
        if (
            res.length == 1 &&
            res[0].elm_userPhone === phone &&
            res[0].elm_userPassword === password
        ) {
            return { msg: "登录成功", code: 200 };
        } else {
            return { msg: "登录失败", code: 201 };
        }
    });
}

async function findUser(name, phone, password) {
    let sql = `select * from elm_user where elm_userPhone = ${phone}`;
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length == 0) {
            return registerUser(name, phone, password);
        } else {
            return { msg: "用户已存在", code: 202 };
        }
    });
}

async function registerUser(name, phone, password) {
    let sql = `insert into elm_user (elm_userID,elm_userPhone,elm_userPassword) values ('${Math.random()}','${phone}','${password}')`;
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return { msg: "注册成功", code: 200 };
        } else {
            return { msg: "注册失败", code: 200 };
        }
    });
}

module.exports = {
    checkUser,
    findUser,
    registerUser
};
