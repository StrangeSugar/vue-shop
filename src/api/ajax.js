import axios from 'axios'
import qs from 'qs'
import { Indicator } from 'mint-ui'


const instance = axios.create({
    baseURL:'/api',
    timeout:20000

})
//添加请求拦截器
instance.interceptors.request.use((config)=>{
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
        Indicator.close();
        alert('响应失败'+error.message)
        return new Promise(()=>{})
    }
)


export default instance