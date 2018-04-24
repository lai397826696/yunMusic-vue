<template>
  <div id="app">
    <router-view></router-view>
    <Playbar></Playbar>
    <Audio></Audio>
  </div>
</template>

<script>
  import Playbar from './components/playbar.vue';
  import Audio from './components/Audio.vue';
  
  export default {
    name: 'app',
    components: {
      Playbar,
      Audio
    },
  }
</script>

<style lang="less">
  @import "~vux/src/styles/reset.less";
  @import '~vux/src/styles/1px.less';
  @import './assets/css/global.css';

  body {
    background-color: #fbf9fe;
  }
</style>
