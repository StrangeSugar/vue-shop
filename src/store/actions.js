import {reqAddress,reqFoodCategorys,reqShopList} from '@/api'
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS} from './mutationTypes'

export default {
   async getAddress({commit,state}){
       const {latitude,longitude} = state
        const result = await reqAddress(40.10038,116.36867)
        if(result.code===0){
            const address= result.data
           
            commit(RECEIVE_ADDRESS,address)
        }

    },
    async getFoodCategorys({commit}){
        
         const result = await reqFoodCategorys()
         if(result.code===0){
             const categorys= result.data
             commit(RECEIVE_CATEGORYS,categorys)
         }
 
     },
     async getShopList({commit,state}){
        const {latitude,longitude} = state
         const result = await reqShopList({latitude,longitude})
         if(result.code===0){
             const shops= result.data
             commit(RECEIVE_SHOPS,shops)
         }
 
     }
   
    
}