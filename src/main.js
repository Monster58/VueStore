//入口文件
import Vue from 'vue'

import './lib/mui/css/mui.min.css'
import { Header } from 'mint-ui'

//导入根组件
import app from './App.vue'
Vue.component(Header.name, Header)

const vm = new Vue({
        el: '#app',
        render: c => c(app)
    })
    //