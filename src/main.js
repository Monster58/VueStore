//入口文件
import Vue from 'vue'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'




//导入路由
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)
import router from './router.js'


import vuex from 'vuex'
Vue.use(vuex)
let shoppingTrolley = JSON.parse(localStorage.getItem('shoppingTrolley')) || []
const store = new vuex.Store({
    state: {
        /*数据模型
        {id: goodsId, amount: 商品数量, goodsPrice: 商品价格, selected: 默认为true}
        */
        shoppingTrolley: shoppingTrolley
    },
    mutations: {
        addShopTro(state, goodsObj) {
            //判断商品是否存在
            let flag = true
            state.shoppingTrolley.some(item => {
                if (item.id == goodsObj.id) {
                    console.log('已有商品')
                    item.amount += goodsObj.amount
                    flag = false
                }
            })
            if (flag) {
                console.log('添加商品')
                state.shoppingTrolley.push(goodsObj)
                console.log('添加成功')
            }
            localStorage.setItem('shoppingTrolley', JSON.stringify(state.shoppingTrolley))
        },
        increaseAmount(state, id) {
            state.shoppingTrolley.some(val => {
                if (val.id == id) {
                    val.amount++
                }
                localStorage.setItem('shoppingTrolley', JSON.stringify(state.shoppingTrolley))
            })
        },
        reduceAmount(state, id) {
            state.shoppingTrolley.some(val => {
                if (val.id == id) {
                    val.amount--
                }
                localStorage.setItem('shoppingTrolley', JSON.stringify(state.shoppingTrolley))
            })
        },
        delgoods(state, id) {
            state.shoppingTrolley.some((item, i) => {
                if (item.id == id) {
                    state.shoppingTrolley.splice(i, 1)
                }
            })
        },
        changeGoodsSelected(state, id) {
            state.shoppingTrolley.some(item =>　{
                if(item.id == id) {
                    item.selected = !item.selected
                }
            })
        }
    },
    getters: {
        getShopTroAmount(state) {
            let goodsAmount = 0
            if (state.shoppingTrolley.length != 0) {
                state.shoppingTrolley.forEach(item => {
                    goodsAmount += item.amount
                })
            }
            console.log(state.shoppingTrolley)
            return goodsAmount
        },
        getGoodsList(state) {
            return state.shoppingTrolley
        },
        getSelectNum(state) {
            let num = 0
            for(let i in state.shoppingTrolley) {
                if(state.shoppingTrolley[i].selected == true) {
                    num++
                }
            }
            return num
        },
        getAllPrice(state) {
            let num = 0
            for(let i in state.shoppingTrolley) {
                if(state.shoppingTrolley[i].selected == true) {
                    num+= state.shoppingTrolley[i].goodsPrice*state.shoppingTrolley[i].amount
                }
            }
            return num
        },
        getSelect(state) {
            let obj = {}
            state.shoppingTrolley.forEach(item => {
                obj[item.id] = item.selected
            })
            return obj
        }
    },
})


import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 格式化时间
import moment from 'moment'
Vue.use(moment)
moment.suppressDeprecationWarnings = true

// vue-preview缩略图插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)
// with parameters install
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: { top: 0, bottom: 0 },
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
})


//导入根组件
import app from './App.vue'

// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
// import "mint-ui/lib/style.css"
import Mint from "mint-ui"
import "mint-ui/lib/style.css"
// Vue.config.productionTip = false
Vue.use(Mint)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dateStr).format(pattern)
})
const vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
}) 