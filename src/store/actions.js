import {
    reqAddress,
    reqFoodCategorys,
    reqShopList,
    reqAuto_login} from '@/api'

import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER,
    RECEIVE_TOKEN,

} from './mutationTypes'

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
 
     },
     saveUser({commit},user){
         const token = user.token
         localStorage.setItem('token_key',token)
         delete user.token
         commit(RECEIVE_USER,user)
         commit(RECEIVE_TOKEN,token)

     },
     async getAuto_login({commit,state}){
        const {token,user} = state
        
        if(token&&!user._id){
            
            const result = await reqAuto_login()
            if(result.code===0){
                const user= result.data
                console.log(user)
                commit(RECEIVE_USER,user)
                
            }

        }
         
 
     },
     logoutUser({commit}){
        
        localStorage.removeItem('token_key')
        commit(RECEIVE_USER,{})
        commit(RECEIVE_TOKEN,'')

    },
   
    
}