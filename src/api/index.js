import axios from './ajax.js'


//根据经纬度获取位置
export const reqAddress =(longitude,latitude)=> axios.get(`/position/${longitude},${latitude}`)

//获取食品分类列表
export const reqFoodCategorys = ()=> axios.get(`/index_category`)
//根据经纬度获取商铺列表
export const reqShopList = ({longitude,latitude})=> axios.get(`/shops`,{params:{longitude,latitude}})