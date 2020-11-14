import Vue from 'vue'
import App from './App.vue'

import 'lib-flexible'
import router from './router'
import Header from './components/Header/Header.vue'
import store from '@/store'



Vue.component('Header',Header)
new Vue({
    // components:{
    //     App
    // },
    // template:'<App/>',
    render(h) {
        return h(App)
    },
    router,  //所有组件都可以看到$router和$route   <router-link>  <router-view>
    store
}).$mount('#app')