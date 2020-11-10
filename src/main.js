import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import router from './router'


new Vue({
    // components:{
    //     App
    // },
    // template:'<App/>',
    render(h) {
        return h(App)
    },
    router,  //所有组件都可以看到$router和$route   <router-link>  <router-view>
}).$mount('#app')