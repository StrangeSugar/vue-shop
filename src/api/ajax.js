import axios from 'axios'
import qs from 'qs'
import {BASE_URL} from '@/config'

const instance = axios.create({
    baseURL:'/api',
    timeout:20000

})
//添加请求拦截器
instance.interceptors.request.use((config)=>{
    console.log('请求了')
    const data = config.data
    if(data instanceof Object){
        config.data = qs.stringify(data)
    }
    return config 
})
instance.interceptors.response.use(
    response =>{
        console.log('响应成功')
        return response.data
    },
    error=>{
        alert('响应失败'+error.message)
        return new Promise(()=>{})
    }
)


export default instance