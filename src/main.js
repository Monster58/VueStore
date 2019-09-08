//入口文件
import Vue from 'vue'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'



//导入路由
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)
import router from './router.js'


import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 格式化时间
import moment from 'moment'
Vue.use(moment)
moment.suppressDeprecationWarnings = true


//导入根组件
import app from './App.vue'

import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

Vue.filter('dateFormat', function(dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dateStr).format(pattern)
})
const vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})