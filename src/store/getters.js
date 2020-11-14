import chunk from 'lodash/chunk'


export default {
    // categorysArr:(state)=>{
    //     let cateArr = []
    //     let qumo = Math.ceil(state.categorys.length/8) 
        
    //         for(let y=1; y<=qumo;y++){
    //             cateArr.push([])
    //             for(let i=1;i<=state.categorys.length;i++){
    //                 if(i<=y*8&&i>(y-1)*8){
    //                     cateArr[y-1].push(state.categorys[i-1])
    //                 }
                    

    //             }
    //         }

    //     return cateArr


        


    // }
    categorysArr:(state)=>{
        return chunk(state.categorys,8)
    }
}