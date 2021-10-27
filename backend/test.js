const puppeteer = require('puppeteer');



const {UrlModel} = require('./db/db');


(async function () {
  const browser = await puppeteer.launch({
      slowMo:500,
      devtools: true
  });
  const page = await browser.newPage();
  console.log('开启页面')
  await page.goto('https://nj.lianjia.com/zufang/');
//   await page.focus('#kw')
//   await page.keyboard.sendCharacter('南京链家');
//   await page.click('.s_newBtn') //button的类名字

  console.log('page goto')

  //当页面完成加载以后
  
    // const sources = await page.evaluate( () => {
    //     // const images =  document.getElementsByClassName('main_img')
    //     // // console.log(images)
    //     // return [...images].map(img=> img.src)
        
       
    // })

    // for (let src of sources){
    //     // await srcToImg(src, path.resolve(__dirname, 'img'))
    //     // await UrlModel.create({
    //     //     url: src
    //     // })
    //     await UrlModel.deleteMany({},function(err){
    //         console.log('success')
    //     })
    // }

    let total = await page.$eval("div.content__pg",el=>{
        return JSON.parse(el.getAttribute('data-totalpage'))
    })

    for (let i = 1; i<=1;i++){
        
            await page.goto(`https://nj.lianjia.com/zufang/pg${i}/#contentList`)
            
            const store = await page.$$eval('div.content__list--item', item => item.map(div =>{
                let name = div.querySelector('.content__list--item--title>a').innerText.split(' ')
                
                return name
                
            }))

            await UrlModel.create({address: store})

            

            // const save = function(obj){
            //     return new Promise((resolve,reject)=>{
            //         UrlModel.create({address:store},function(err,data){
            //             if(err){
            //                 reject(err)
            //             }else{
            //                 resolve(data)
            //             }
            //         })
            //     })
            // }

            

            // const save = function(e){
            //     return new Promise((resolve,reject)=>{
            //         UrlModel.create({
            //                     address: e
            //                 })
            //                 resolve()
            //         })
            // }


            // (async ()=>{

            //      await save(store)
            // //     await UrlModel.create({
            // //         url: src
            // //    })
            // //    await UrlModel.deleteMany({},function(err){
            // //        console.log('success')
            // //    })
   
            //  })

            

            
            

        
    }



    // other actions...
   await browser.close();

 

  
})();