<template>
  <div>
    <x-header class="fixed-top" :left-options="{backText: ''}">每日歌曲推荐</x-header>
    <div class="clear-header" :class="{'clear-audio': !!audioPlaying.id}">
      <div class="bannBig" v-if="!!bigImg">
        <img :src="bigImg.picUrl" :alt="bigImg.typeTitle">
        <span class="tag">{{bigImg.typeTitle}}</span>
        <div class="tips">根据你的音乐口味生成,每天6:00更新</div>
        <div class="bg"></div>
      </div>
      <Playbox :songData="songs"></Playbox>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux';
  import Playbox from '../components/playbox.vue';
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "tuijian",
    data() {
      return {
      }
    },
    components: {
      XHeader,
      Playbox,
    },
    created() {
      this.recommendapi();
    },
    computed: {
      ...mapState([
        'banners',
        'songs',
        'audioPlaying'
      ]),
      bigImg() {
        return this.banners.find(item => {
          return item.typeTitle == "广告"
        })
      }
    },
    methods: {
      ...mapActions([
        'recommendapi',
      ]),
    }
  }
</script>

<style lang="less" scoped>
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
      background-color: rgba(0, 0, 0, 0.15);
      background-image: linear-gradient(to top, #dcdcdc 0%, transparent 50%);
    }
  }
</style>




