const Koa = require("koa");
const app = new Koa();
//http请求
const superagent = require("superagent");
//字符集
const charset = require("superagent-charset");
charset(superagent);
//页面抓取模块
const cheerio = require('cheerio')
//文件存储模块
var fs = require('fs');
//路由
var Router = require("koa-router");
var router = new Router();
//
var request = require("request")
const items = [];


const baseUrl = 'https://www.qqtn.com/tx/weixintx_1.html'

router.get("/image",async (ctx, next) => {
    var res;
    try{
        res = await superagent.get(baseUrl).charset('gb2312');
        var htmlString = res.text;
        console.log(htmlString)
        const $ = await cheerio.load(htmlString);
        $('div.g-main-bg ul.g-gxlist-imgbox li a').each(function(idx, element) {
            var $element = $(element);
            var $subElement = $element.find('img');
            var thumbImgSrc = $subElement.attr('src');
            items.push({
                title: $(element).attr('title'),
                href: $element.attr('href'),
                thumbSrc: thumbImgSrc
            });
        });
        
        ctx.body = items;
    }catch(err){
        ctx.body = res;
    }
    next();
})

app.use(router.routes());
//得到数据后将图片下载到本地
app.use(async (ctx, next)=>{
    saveImage();
})
function saveImage() { 
    var url; 
    for(let i in items){
        url=items[i].thumbSrc;
        console.log(url)
        request(url).pipe(fs.createWriteStream("./baiduNews/"+items[i].title+".jpg"));
    }
    
}

app.listen(3000);
console.log("[demo] Koa is starting at port 3000");
