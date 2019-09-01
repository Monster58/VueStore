import VueRouter from 'vue-router'

//导入对应路由组件



var router = new VueRouter({
    routes: [

    ],
    linkActiveClass: 'mui-active' //默认覆盖路由高亮的类默认叫做router-link-active
})

// 把路由对象暴露出去
export default router