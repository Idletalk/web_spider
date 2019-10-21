const user = require("../service/user");

// 登录
async function checkLogin(ctx, next) {  
    let {name, phone, password} = ctx.request.body;
    let data = await user.checkUser(phone, password);
    return ctx.response.body = data;
}
// 注册
async function registerUser(ctx, next) {  
    let {name, phone, password} = ctx.request.body;
    let data = await user.findUser(name, phone, password);
    return ctx.response.body = data;
}

module.exports = {
    checkLogin,
    registerUser
}