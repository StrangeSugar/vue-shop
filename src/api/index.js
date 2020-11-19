import axios from './ajax.js'


//根据经纬度获取位置
export const reqAddress =(longitude,latitude)=> axios.get(`/position/${longitude},${latitude}`)

//获取食品分类列表
export const reqFoodCategorys = ()=> axios.get(`/index_category`,{headers:{checkToken:true}})
//根据经纬度获取商铺列表
export const reqShopList = ({longitude,latitude})=> axios.get(`/shops`,{params:{longitude,latitude},headers:{checkToken:true}})
//发送短信验证码
export const reqSendCode = (phone)=> axios.get(`/sendcode`,{params:{phone}})
//手机号验证登录
export const reqLogin_sms = (phone,code) => axios.post('/login_sms',{phone,code})
//用户名密码登陆
export const reqLogin_pwd = (name,pwd,captcha) => axios.post('/login_pwd',{name,pwd,captcha})
//用户名密码登陆/auto_login
export const reqAuto_login = () => axios.get('/auto_login',{headers:{checkToken:true}})