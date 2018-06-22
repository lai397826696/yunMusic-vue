<template>
  <div class="DetailPage">
    <x-header class="detail-header" :left-options="{backText: ''}" :right-options="{showMore: true}">
      <div solt="overwrite-title">每日歌曲推荐</div>
    </x-header>
    <div class="bg-blur" :style="{backgroundImage: `url(${playdatasing.album.blurPicUrl})`}"></div>
    <img src="../../static/images/aag.png" alt="" class="aag" :class="{upDown: play, downUp: !play}">
    <div class="turntable" :class="{startplay: play, endplay: !play}">
      <img src="../../static/images/play.png" alt="" class="playbg">
      <img :src="`${playdatasing.album.blurPicUrl}?param=200y200`" alt="" class="playimg">
    </div>
    <div class="foot">
      <flexbox :gutter="0" class="tools">
        <flexbox-item>
          <i class="iconfont icon-jushoucang"></i>
        </flexbox-item>
        <flexbox-item>
          <i class="iconfont icon-download"></i>
        </flexbox-item>
        <flexbox-item>
          <i class="iconfont icon-pinglun"></i>
        </flexbox-item>
        <flexbox-item>
          <i class="iconfont icon-more"></i>
        </flexbox-item>
      </flexbox>
      <div class="range">
        <range v-model="data1" @on-change="onChange"></range>
      </div>
      <flexbox :gutter="0" class="original">
        <flexbox-item>
          <i class="iconfont" :class="playmode.class"></i>
        </flexbox-item>
        <flexbox-item>
          <i class="iconfont icon-prev"></i>
        </flexbox-item>
        <flexbox-item>
          <i class="iconfont icon-bofang1" @click="plays"></i>
        </flexbox-item>
        <flexbox-item>
          <i class="iconfont icon-next"></i>
        </flexbox-item>
        <flexbox-item>
          <i class="iconfont icon-liebiao"></i>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import { XHeader, Flexbox, FlexboxItem, Range } from 'vux'
  import { mapState, mapGetters } from 'vuex';

  export default {
    name: "Detail",
    data() {
      return {
        data1: 10,
        play: false,
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      XHeader,
      Range
    },
    computed: {
      ...mapState([
        'playmode',
      ]),
      ...mapGetters([
        'playdatasing'
      ])
    },
    created() {
    },
    methods: {
      onChange(value) {
      },
      plays(){
        this.play=!this.play
      }
    }
  }
</script>

<style lang="less" scoped>
  .DetailPage {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    .detail-header {
      position: relative;
      z-index: 10;
    }
  }
  .bg-blur {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    filter: blur(70px);
    background-size: cover;
    background-position: center top;
    // background-attachment: fixed;
  }
  .turntable {
    position: relative;
    top: 11%;
    z-index: 0;
    &.startplay {
      animation: route1 30s linear infinite;
    }
    &.endplay {
      animation: route2 1.5s ease;
    }
    @keyframes route1 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes route2 {
      0% {
        // transform: rotate(0deg);
      }
      100% {
        transform: rotate(10deg);
      }
    }
    .playbg {
      margin: 0 auto;
      display: block;
      width: 80%;
      max-width: 100%;
    }
    .playimg {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      margin: -100px;
      border-radius: 50%;
    }
  }
  .aag {
    position: absolute;
    top: 3%;
    right: 27%;
    z-index: 5;
    width: 28%;
    transform: rotateZ(-24deg);
    transform-origin: 60px 0;
    &.upDown {
      animation: upDown .5s linear forwards;
    }
    &.downUp {
      animation: downUp 1.5s ease;
    }
    @keyframes upDown {
      0% {
        top: 3%;
        transform: rotateZ(-24deg);
      }
      100% {
        top: 4.5%;
        transform: rotateZ(0);
      }
    }
    @keyframes downUp {
      0% {
        top: 4.5%;
        transform: rotateZ(0);
      }
      100% {
        top: 3%;
        transform: rotateZ(-24deg);
      }
    }
  }
  .foot {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 15px;
    z-index: 10;
    color: #fff;

    .tools {
      margin: 0 auto;
      width: 80%;
      text-align: center;
      line-height: 30px;
      .iconfont {
        font-size: 24px;
      }
      .icon-download {
        font-size: 26px;
      }
    }

    .range {
      margin: 30px auto;
      width: 90%;
    }

    .original {
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      .iconfont {
        font-size: 24px;
      }
      .icon-bofang1 {
        vertical-align: middle;
        font-size: 52px;
      }
    }
  }
</style>
<style lang="less">
  .range .range-handle {
    // width: 20px;
    // height: 20px;
    // top: 10px;
  }
</style>


