import React, { Component } from 'react';

import store from '../store'

import Map from '../Component/Map'

import { Layout,Input, Space} from 'antd';

import { pinyin } from 'pinyin-pro';

// import store from '../store/index'
import axios from 'axios';


const { Header, Footer, Content } = Layout;

const { Search } = Input;

// const onSearch = value => console.log(value);


class Main extends Component {

    constructor (props) {
        super(props)
        this.state = store.getState()
        console.log(store.getState())
    }

    componentDidMount(){
        
    }

    changeSearch = (e) =>{
        // console.log(e.target.value)
        const action = {
            type:'CHANGE',
            value: e.target.value
        }
        store.dispatch(action)
    }

    // storeChange =()=> {
    //     this.setState(store.getState())
    // }

    // onSearch =()=> {
    //     const action = {
    //         type: 'search'
    //     }
    //     store.dispatch(action)
    // }

    onsearch = (e) =>{
        const a = pinyin(e,{toneType:'none',pattern:'first'})
        const init = a.replace(/\s+/g,"")
        console.log(init) //南京： nj

        axios({
            method:'post',
            url:'http://localhost:4000/',
            data: init //记得做处理
        }).then(
           //do something
            
        )

        const action = {
            type:'SEARCH',
            value: init
            
        }
        store.dispatch(action)
    }

    render() {
        return (
            <div>

                <Layout>
                    <Header>
                        
                        <Search placeholder="输入查看的城市" onSearch={this.onsearch} enterButton className="search" onChange={this.changeSearch}/>
                        
                    </Header>

                    <Content>
                        <Map/>
                    </Content>
                </Layout>

                
            </div>
        );
    }
}

export default Main;