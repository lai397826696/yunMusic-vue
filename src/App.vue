<template>
  <div id="app">
    <router-view></router-view>
    <Playbar></Playbar>
  </div>
</template>

<script>
  import Playbar from './components/playbar.vue';
  
  export default {
    name: 'app',
    data(){
      return {
      }
    },
    components: {
      Playbar
    },

  }
</script>

<style lang="less">
  @import "~vux/src/styles/reset.less";
  @import '~vux/src/styles/1px.less';
  @import './assets/css/main.less';

</style>
