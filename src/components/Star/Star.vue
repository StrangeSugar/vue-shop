<template>
  <div class='star' :class="`star-${size}`">
     <span class="star-item on" v-for="(val,index) in ratingValon" :key="index+10"></span>
    <span class="star-item half" v-show="rating%1<=0.5&&rating%1>0"></span>
    <span class="star-item off"  v-for="(val,index) in ratingValoff" :key="index+1"></span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    
    props:{
      rating:Number,
      size:String
    }
    ,
    computed:{
        ratingValon(value){
            //4.2
             let val=  Math.floor(this.rating)
             if(this.rating%1>0.5){
              val++
             }
          

             return val  //4
            
             
             

        },
        ratingValoff(value){
          



          
            return Math.floor(5-this.rating)
          

          
          
          
           
             

        }
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/star48_on')
      &.half
        bg-image('./images/star48_half')
      &.off
        bg-image('./images/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star36_on')
      &.half
        bg-image('./images/star36_half')
      &.off
        bg-image('./images/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star24_on')
      &.half
        bg-image('./images/star24_half')
      &.off
        bg-image('./images/star24_off')


</style>
