<template>
  <div class='footer-guide'>
      <span class = 'guide-item ' :class="{on: $route.path ==='/msite'}" @click="goto('/msite')">
        <span>
          <i class='iconfont iconindex'></i>
        </span>
        <span>首页</span>
      </span>
      <span class = 'guide-item ' :class="{on: $route.path ==='/search'}" @click="goto('/search')">
        <span>
          <i class='iconfont iconsearch2'></i>
        </span>
        <span>搜索</span>
      </span>
      <span class = 'guide-item' :class="{on: $route.path ==='/order'}" @click="goto('/order')">
        <span>
          <i class='iconfont iconmanage-order'></i>
        </span>
        <span>订单</span>
      </span>
      <span class = 'guide-item' :class="{on: $route.path ==='/profile'}" @click="goto('/profile')">
        <span>
          <i class='iconfont iconaccount'></i>
        </span>
      
      <span>个人</span>
      </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'FooterGuide',
    methods:{
      goto(path){
        if(path!==this.$route.path){
            this.$router.replace(path)  
        }else{
          window.history.go()
        }
        

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.footer-guide
  
  background-color #ffffff
  top-border-1px(#cccccc) 
  display flex
  position fixed
  left 0
  bottom 0
  height 50px
  width 100%
  .guide-item
    display flex
    flex-direction column
    justify-content center
    align-items center
    width 25%
    &.on
      color $green
    span
      font-size 12px
      i
        font-size 22px

 
</style>
