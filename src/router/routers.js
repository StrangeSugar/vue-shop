//所有路由配置的数组
import  MSite from '@/pages/MSite/MSite.vue'
import  Search from '@/pages/Search/Search.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'
import Login from '@/pages/Login/Login.vue'
import Shop from '@/pages/Shop/Shop.vue'
import Foods from '@/pages/Shop/Foods/Foods.vue'
import Info from '@/pages/Shop/Info/Info.vue'
import Rating from '@/pages/Shop/Rating/Rating.vue'

export default [
    {
        path:'/msite',
        component:MSite,
        meta:{
            isShowFooter:true
        }
    },
    {
        path:'/search',
        component:Search,
        meta:{
            isShowFooter:true
        }

    },
    {
        path:'/order',
        component:Order,
        meta:{
            isShowFooter:true
        }
    },
    {
        path:'/profile',
        component:Profile,
        meta:{
            isShowFooter:true
        }
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/shop',
        component:Shop,
        children:[
            {
                path:'/shop/foods',
                component:Foods
            },
            {
                path:'rating',
                component:Rating
            },
            {
                path:'/shop/info',
                component:Info
            },{
                path:'/',
                redirect:'/shop/foods'
            }
        ]
    },
    {
        path:'/',
        redirect:'/msite'
    },
    
]