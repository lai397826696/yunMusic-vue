<template>
  <div id="app">
    <router-view></router-view>
    <Playbar></Playbar>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
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
    computed: {
      ...mapGetters([
        'lyricsId'
      ])
    },
    methods: {
      ...mapActions([
        'lyricsfn'
      ])
    },
    watch: {
      'lyricsId': function (newval, oldval) {
        console.log('监测歌词改变');
        this.lyricsfn()
      }
    }

  }
</script>

<style lang="less">
  @import "~vux/src/styles/reset.less";
  @import '~vux/src/styles/1px.less';
  @import './assets/css/main.less';

</style>
