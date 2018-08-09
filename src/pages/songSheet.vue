<template>
  <div>
    <x-header class="fixed-top" :left-options="{backText: ''}">歌单</x-header>
    <div class="clear-header" :class="{'clear-audio': !!audioPlaying.id}">
      <div class="quality" :style="{backgroundImage: `url(${quality_one.coverImgUrl})`}">
        <div class="bg-blur" :style="{backgroundImage: `url(${quality_one.coverImgUrl})`}">
          <div class="flex">
            <div class="flex_hd">
              <img :src="quality_one.coverImgUrl" alt="歌单封面" class="coverImgUrl">
            </div>
            <div class="flex_bd">
              <p class="">
                <span class="iconbox">
                  <i class="iconfont icon-jingpin"></i>
                </span>
                <span>精品歌单</span>
                <span>
                  <i class="iconfont icon-mjiantou-copy"></i>
                </span>
              </p>
              <p class="name">{{quality_one.name}}</p>
              <p class="copywriter">{{quality_one.copywriter}}</p>
            </div>
          </div>
        </div>

      </div>
      <div class="">
        <label>全部歌单</label>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux';
  import { mapState, mapActions } from 'vuex';
  import { highquality } from '../util/severAPI.js';

  export default {
    name: "songsheet",
    data() {
      return {
        quality: []
      }
    },
    components: {
      XHeader,
    },
    created() {
      this.highquality()
    },
    computed: {
      ...mapState([
        'audioPlaying'
      ]),
      quality_one(){
        if(this.quality.length>0) return this.quality[0]
        return {}
      }
    },
    methods: {
      highquality() {
        highquality().then(res => {
          console.log(res);
          this.quality = res.data.playlists
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .quality {
    position: relative;
    color: #fff;
    background-size: cover;
    background-position: center center;
    .bg-blur {
      position: relative;
      background-size: cover;
      background-position: center center;
      background-color: hsla(0,0%,100%,.3);
      overflow: hidden;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: inherit;
        background-size: cover;
        background-position: center center;
        filter: blur(20px);
      }
    }
    .flex {
      position: relative;
      z-index: 10;
    }
    .coverImgUrl {
      display: block;
      width: 120px;
    }
  }
</style>




