const Router =require("koa-router");
const user = require("./userRouter");

let router = new Router();
router.use(user.routes());

module.exports = router;