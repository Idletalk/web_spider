const Router = require("koa-router");
const service = require("../lib/mysql");
const controller = require("../controller/userController");
const fs = require("fs");
const path = require("path");

const router = new Router();

router.get("/", (ctx, next) => {
    console.log(__dirname);
    ctx.type = "html";
    var data = fs.readFileSync(`${__dirname}/../index.html`);
    ctx.response.body = data.toString(); 
});
router.post("login", "/login", controller.checkLogin);
router.post("register", "/register", controller.registerUser);

module.exports = router;
