<template>
  <header class="header">
        <slot name="left"></slot>
        <slot name="center"></slot>
        <slot name="right"></slot>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
      props:{
          title:String
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
  header()
 
</style>
