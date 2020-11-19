import Vue from 'vue'
import App from './App.vue'
import {Button} from 'mint-ui'

import 'lib-flexible'
import router from './router'
import Header from './components/Header/Header.vue'
import store from '@/store'
import Star from '@/components/Star/Star.vue'
import './utils/validate'
import i18n from './i18n'


Vue.component('Star',Star)
Vue.component('Header',Header)
Vue.component(Button.name,Button)
new Vue({
    // components:{
    //     App
    // },
    // template:'<App/>',
    render(h) {
        return h(App)
    },

    //所有组件都可以看到$router和$route   <router-link>  <router-view>
    router,

    i18n,
    store
}).$mount('#app')