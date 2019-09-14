import VueRouter from 'vue-router'

//导入对应路由组件
import home from './components/tabbar/home.vue'
import member from './components/tabbar/member.vue'
import shopcar from './components/tabbar/shopcar.vue'
import search from './components/tabbar/search.vue'
import news from './components/news/news.vue'
import newsinfo from './components/news/newsinfo.vue'
import img from './components/img/img.vue'
import imginfo from './components/img/imginfo.vue'
import goods from './components/goods/goods.vue'


var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        {
            path: '/home',
            component: home,
            // children: [
            //     { path: '/home/news', component: news }
            // ]
        },
        { path: '/member', component: member },
        { path: '/shopcar', component: shopcar },
        { path: '/search', component: search },
        { path: '/home/news', component: news },
        { path: '/home/img', component: img },
        { path: '/home/img/imginfo/:id', component: imginfo },
        { path: '/home/newsinfo/:id', component: newsinfo },
        { path: '/home/goods', component: goods }
    ],
    linkActiveClass: 'mui-active' //默认覆盖路由高亮的类默认叫做router-link-active
})

// 把路由对象暴露出去
export default router