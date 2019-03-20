<template>
  <div class="fm">
    <x-header class="fixed-top" :left-options="{backText: ''}">{{''}}</x-header>
    <div class="bg-blur" v-show="fm_index==0" :style="{backgroundImage: `url(${fm0.album.blurPicUrl}?param=640y640)`}"></div>
    <div class="bg-blur" v-show="fm_index==1" :style="{backgroundImage: `url(${fm1.album.blurPicUrl}?param=640y640)`}"></div>
    <div class="bg-blur" v-show="fm_index==2" :style="{backgroundImage: `url(${fm2.album.blurPicUrl}?param=640y640)`}"></div>
    <div class="clear-header">
      <div class="turntableBox">
        <div class="box" :style="{transform: `rotateY(-${rotate}deg)`}">
          <div class="turntable">
            <img :src="`${fm0.album.blurPicUrl}?param=640y640`" alt="" class="musicImg">
            <p class="ellipsis musicName">{{fm0.name}}</p>
            <p class="ellipsis artists">
              <span v-for="(ai, index) of fm0.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span>
              <i class="iconfont icon-mjiantou-copy"></i>
            </p>
          </div>
          <div class="turntable">
            <img :src="`${fm1.album.blurPicUrl}?param=640y640`" alt="" class="musicImg">
            <p class="ellipsis musicName">{{fm1.name}}</p>
            <p class="ellipsis artists">
              <span v-for="(ai, index) of fm1.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span>
              <i class="iconfont icon-mjiantou-copy"></i>
            </p>
          </div>
          <div class="turntable">
            <img :src="`${fm2.album.blurPicUrl}?param=640y640`" alt="" class="musicImg">
            <p class="ellipsis musicName">{{fm2.name}}</p>
            <p class="ellipsis artists">
              <span v-for="(ai, index) of fm2.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span>
              <i class="iconfont icon-mjiantou-copy"></i>
            </p>
          </div>
        </div>
      </div>
      <div class="foot">
        <Drag></Drag>
        <flexbox :gutter="0" class="original">
          <flexbox-item>
            <i class="iconfont icon-icon-shanchu" @click="removelist"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-jushoucang" :class="{'icon-jushoucanggift text-color-red': collection}" @click="collectionfn"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-bofang1" @click="plays"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-next" @click="playNext"></i>
          </flexbox-item>
          <flexbox-item>
            <div class="totalBox">
              <i class="iconfont icon-pinglun" @click="pinglun"></i>
              <span class="total">{{totals}}</span>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import Drag from '../components/Drag';

  import { personal_fm, fm_trash } from '../util/severAPI';

  export default {
    name: "fm",
    data() {
      return {
        fmdata: [],
        fm_index: 0,
        collection: false,
        totals: 1000,
        rotate: 0,
        fm0: { album: {} },
        fm1: { album: {} },
        fm2: { album: {} },
      }
    },
    components: {
      Drag,
    },
    created() {
      let _this = this;
      this.personal_fms({ timestamp: new Date().getTime() })
      if (this.fm_index == 0) {
        setTimeout(function () {
          _this.personal_fms({ timestamp: new Date().getTime() })
        }, 500)
      }
    },
    computed: {
      fm_playing() {
        return this[`fm${this.fm_index}`]
      }
    },
    methods: {
      personal_fms(obj) {
        personal_fm(obj).then(res => {
          //防止后台数据只有2条，默认3条
          if (res.data.data.length != 3) {
            res.data.data.push(...this.fmdata)
            res.data.data.splice(3)
          }
          this.fmdata = res.data.data
          if (!this.fm0.hasOwnProperty("id")) {
            this.fm0 = res.data.data[0]
            this.fm1 = res.data.data[1]
            this.fm2 = res.data.data[2]
            if (res.data.data.length == 1) this.fm1 = res.data.data[0]
            if (res.data.data.length == 2) this.fm2 = res.data.data[1]
          }
        })
      },
      removelist() {
        fm_trash({ id: this.fm_playing.id }).then(res => {
          if (res.data.code==200) this.playNext()
        })
      },
      plays() {

      },
      playNext() {
        this.rotate = this.rotate + 120
        this.fm_index++
        if (this.fm_index > 2) this.fm_index = 0
        if (this.fm_index == 0) {
          this.fm2 = this.fmdata[2]
          this.personal_fms({ timestamp: new Date().getTime() })
        }
        if (this.fm_index == 1) this.fm0 = this.fmdata[0]
        if (this.fm_index == 2) this.fm1 = this.fmdata[1]
      },
      collectionfn() { },
      pinglun() {
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/css/mixin.less";
  .fm {
    width: 100%;
    height: 100%;
  }
  .bg-blur {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    filter: blur(70px);
    background-size: cover;
    background-position: center top;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
  .turntableBox {
    perspective: 1000px;
    margin: 0 auto;
    width: 90%;

    .box {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.2s;
      // z-index: 1;
    }
    .turntable {
      position: absolute;
      margin-left: 5%;
      top: 0;
      width: 90%;
      backface-visibility: hidden;
      text-align: center;
      // z-index: 1;

      &:nth-child(1) {
        transform: rotateY(0) translateZ(120px);
      }
      &:nth-child(2) {
        transform: rotateY(120deg) translateZ(120px);
      }
      &:nth-child(3) {
        transform: rotateY(240deg) translateZ(120px);
      }

      .musicImg {
        display: block;
        width: 100%;
        border-radius: 5px;
      }
      .musicName {
        margin: 30px 0 10px;
        color: #fff;
        font-size: 20px;
      }
      .artists {
        color: @FRONT_GRAY;
      }
      .icon-mjiantou-copy {
        margin-left: -3px;
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

    .original {
      text-align: center;
      cursor: pointer;
      .iconfont {
        font-size: 24px;
      }
      .icon-bofang1 {
        font-size: 52px;
      }
    }

    .totalBox {
      position: relative;
      margin-left: -5px;
      display: inline-block;
      .total {
        position: absolute;
        top: -8px;
        left: 20px;
        z-index: 0;
        line-height: normal;
        font-size: 12px;
      }
    }
  }
</style>

<style lang="less">
  .fm .vux-header {
    background-color: transparent !important;
  }
</style>




