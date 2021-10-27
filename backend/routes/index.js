const { json } = require('express');
var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

const {UrlModel} = require('../db/db');


(async function () {
  const browser = await puppeteer.launch({
      // slowMo:500,
      // devtools: true
  });
  const page = await browser.newPage();
  console.log('开启页面')
  await page.goto('https://nj.lianjia.com/zufang/');


    let total = await page.$eval("div.content__pg",el=>{
        return JSON.parse(el.getAttribute('data-totalpage'))
    })


    //测试单页读取网页内容
    for (let i = 1; i<=1;i++){
      
      //后期处理搜索框城市缩写，类似深圳sz，苏州sz
      //https://城市名字缩写.lianjia.com/zufang/pg${i}/#contentList

      await page.goto(`https://nj.lianjia.com/zufang/pg${i}/#contentList`)
      
      const store = await page.$$eval('div.content__list--item', item => item.map(div =>{
          let name = div.querySelector('.content__list--item--title>a').innerText

          let price = div.querySelector('.content__list--item--main>span').innerText
          
          return {
            address: name,
            price: price,
          }
          
      }))

      await UrlModel.create({
        address: store
      })
      

        
    }
   await browser.close();

 

  
})();  


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expressnm' });
});

router.post('/',function(req,res){
  console.log(req.body)
  // res.send('success')


  UrlModel.findOne(function (err,doc){
      if(err){
        console.log(err)
      }else{
        res.send(JSON.stringify(doc))
      }
  })
  
})


module.exports = router;
