import React, { Component } from 'react';
import axios from 'axios'

//后期从数据库读取链接
import test from '../img/111.jpg'

var BMap = window.BMap

const center = '南京'

const myGeo = new BMap.Geocoder()



class Map extends Component {

    constructor(props) {
        super(props)
        this.state={
           long:0,
           lati:0
        }
    }

    //添加redux状态处理 

    componentDidMount(){

        const map = new BMap.Map("bmap");

         axios({
             method:'post',
             url:'http://localhost:4000/',
             
         }).then(
            //  res =>{
            //     //  if(res.data === 'success'){
            //     //      console.log('succ')
            //     //  }
            //     console.log(res)
            //  }
            function(res){
                for (let i=0; i<res.data.address.length;i++){

                    const address = res.data.address[i].address.split(' ')[0]
                    
                    const price = res.data.address[i].price
                    myGeo.getPoint(address,function(point){


                        map.centerAndZoom(center,11)
                        let marker = new BMap.Marker(point)
                        map.addOverlay(marker)
                        map.enableScrollWheelZoom();
                        
                        //后期拆解字符串address
                        //后期后端返回对应的租房详情页面
                        const sContent = `<div class="infowindow">
                                            <h4>${address}</h4>
                                            <a href="https://nj.lianjia.com/zufang/rs/" target="_blank">
                                                <img src=${test} id='imgDemo'></img>
                                            </a>
                                            <p>${address}</p> 
                                            <p class='price'>${price}</p>
                                            <p class='type'><span>在售</span></p>
                                        </div>`;

                        var infoWindow = new BMap.InfoWindow(sContent);
                        // marker添加点击事件
                        marker.addEventListener('click', function () {
                            this.openInfoWindow(infoWindow);
                            // 图片加载完毕重绘infoWindow
                            document.getElementById('imgDemo').onload = function () {
                                infoWindow.redraw(); 
                            };
                        });
                    },'南京') //先设置初始位置
            
                }
                
            }
         )

        


    }

  
    
    render() {
        return (
            <div>


                <div id='bmap' style={{height:"100vh"}}>

                </div>

            </div>
        );
    }
}

export default Map;