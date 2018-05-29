<template>
  <div class="tuijian" :class="{tj_bottom: !!audiodata.id}">
    <x-header :left-options="{backText: ''}" :right-options="{showMore: true}">每日歌曲推荐</x-header>
    <div class="bannBig" v-if="!!bigImg">
      <img :src="bigImg.picUrl" :alt="bigImg.typeTitle">
      <span class="tag">{{bigImg.typeTitle}}</span>
      <div class="tips">根据你的音乐口味生成,每天6:00更新</div>
      <div class="bg"></div>
    </div>
    <!-- <Audios :id="''+songs[0].id"></Audios> -->
    <Playbox :songData="songs"></Playbox>
  </div>
</template>

<script>
  import { XHeader, Cell, Group, Popup, TransferDom } from 'vux';
  import Playbox from '../components/playbox.vue';
  import Audios from '../components/Audio.vue';
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "tuijian",
    data() {
      return {
        idurl: '455358996',
      }
    },
    created() {
      let _this = this
    },
    components: {
      XHeader,
      Cell,
      Group,
      Popup,
      Playbox,
      Audios
    },
    directives: {
      TransferDom
    },
    created(){
      this.recommendapi();
    },
    computed: {
      ...mapState([
        'banners',
        'songs',
        'audiodata'
      ]),
      bigImg(){
        return this.banners.find(item=>{
          return item.typeTitle=="广告"
        })
      }
    },
    methods: {
      ...mapActions([
        'recommendapi',
      ]),
      fn(){
        console.log(111);
      },
    }
  }
</script>

<style lang="less" scoped>
  .tuijian {
  }
  .tj_bottom {
    margin-bottom: 55px;
  }
  .bannBig {
    position: relative;
    img {
      display: block;
      width: 100%;
    }
    .tag {
      position: absolute;
      right: 20px;
      top: 10px;
      z-index: 1;
      color: #fff;
    }
    .tips {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 7px;
      z-index: 1;
      padding-left: 20px;
      font-size: 14px;
      color: #fff;
    }
    .bg {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 0;
      background-color: rgba(0, 0, 0, .15);
      background-image: linear-gradient(to top, #dcdcdc 0%, transparent 50%);
    }
  }
  
</style>




