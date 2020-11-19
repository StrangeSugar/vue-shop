import axios from 'axios'
import qs from 'qs'
import { Indicator ,Toast} from 'mint-ui'
import store from '@/store'
import router from '@/router'

const instance = axios.create({
    baseURL:'/api',
    timeout:20000,
    

})
//添加请求拦截器
instance.interceptors.request.use((config)=>{
    
    const token = store.state.token
    if(token){
        config.headers.Authorization = token

    }else{
        console.log(config.headers.checkToken)
        if(config.headers.checkToken){
            throw new Error('身份信息失效')
        }
        console.log('2')
    }
    
    Indicator.open();
    const data = config.data
    if(data instanceof Object){
        config.data = qs.stringify(data)
    }
    return config 
})
instance.interceptors.response.use(
    response =>{
        Indicator.close();
        return response.data
    },
    error=>{
        console.log(error.response)
        if(!error.response){
           
            console.log("++1")
            if(router.currentRoute.path!=='/login'){
                Toast(error.message)
                console.log("++2")
                router.replace('/login')
            }
            
            return new Promise(()=>{})

        }

       if(error.response.status=="401"){
          
        //   location.replace('/login')  // 原生跳转 方式会慢一点
        store.dispatch('logoutUser')
        
        
        if(router.currentRoute.path!=='/login'){

            console.log("-----------")
            
            router.replace('/login')
            Toast("请重新登录")
        }
            
            
        
        
        
        Indicator.close();
       }else{
        Indicator.close();
        
        
       }
       return new Promise(()=>{})
        
    }
)


export default instance