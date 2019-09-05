//入口文件
import Vue from 'vue'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import { Header, Swipe, SwipeItem } from 'mint-ui'


//导入路由
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)
import router from './router.js'


import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'http://www.liulongbin.top:3005'


//导入根组件
import app from './App.vue'


Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

const vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})