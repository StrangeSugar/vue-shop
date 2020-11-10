//向外暴露路由器对象模块

import Vue from 'vue'
import  VueRouter from 'vue-router'
import routes from '@/router/routers'


//声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({
    //项目中所有的路由
    mode:'history', //路由模式没有#号

    routes
})
