import {RECEIVE_ADDRESS,
        RECEIVE_CATEGORYS,
        RECEIVE_SHOPS,
        RECEIVE_USER,
        RECEIVE_TOKEN
} from './mutationTypes'
export default {
    [RECEIVE_ADDRESS] (state,address){ 
        state.address = address
    },
    [RECEIVE_CATEGORYS] (state,categorys){
        state.categorys= categorys
    },
    [RECEIVE_SHOPS] (state,shops){
        state.shops= shops
    },
    [RECEIVE_USER] (state,user){
        state.user= user
    },
    [RECEIVE_TOKEN] (state,token){
        state.token= token
    },

}