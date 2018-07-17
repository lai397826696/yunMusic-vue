<template>
  <div class="detail">
    <x-header class="fixed-top" :left-options="{backText: ''}">{{audioPlaying.name}}</x-header>
    <div class="bg-blur" :style="{backgroundImage: `url(${audioPlaying.album.blurPicUrl})`}"></div>
    <div class="clear-header">
      <img src="../../static/images/aag.png" alt="" class="aag" :class="{upDown: play, downUp: !play}">
      <div class="turntable" ref="turntable" :style="styleRoute">
        <img src="../../static/images/play.png" alt="" class="playbg">
        <img :src="`${audioPlaying.album.blurPicUrl}?param=200y200`" alt="" class="playimg">
      </div>
      <div class="foot">
        <flexbox :gutter="0" class="tools">
          <flexbox-item>
            <i class="iconfont icon-jushoucang" :class="{'icon-jushoucanggift text-color-red': collection}" @click="collectionfn"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-download"></i>
          </flexbox-item>
          <flexbox-item>
            <div class="totalBox">
              <i class="iconfont icon-pinglun" @click="pinglun"></i>
              <span class="total">{{totals | numType}}</span>
            </div>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-more" @click="detailsfn"></i>
          </flexbox-item>
        </flexbox>
        <Drag></Drag>
        <flexbox :gutter="0" class="original">
          <flexbox-item>
            <i class="iconfont" :class="playmode.class" @click="setPlaymode"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-prev" @click="playPrev"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-bofang1" @click="plays"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-next" @click="playNext"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-liebiao" @click="playlistfn"></i>
          </flexbox-item>
        </flexbox>
      </div>
      <popupDetail ref="popupDetail" v-model="show" type="detail" :id="parseInt(id)"></popupDetail>
      <catalogue ref="catalogue"></catalogue>
    </div>
  </div>
</template>

<script>
  import { XHeader, Flexbox, FlexboxItem } from 'vux'
  import { mapState, mapMutations } from 'vuex';
  import Drag from '../components/Drag';
  import popupDetail from '../components/popupDetail';
  import catalogue from '../components/Catalogue';

  import { musicComment } from '../util/severAPI';

  export default {
    name: "Detail",
    data() {
      return {
        data1: 0,
        play: false,
        styleRoute: {},
        collection: false,
        show: false,
        id: '',
        total: 0
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      XHeader,
      Drag,
      popupDetail,
      catalogue
    },
    computed: {
      ...mapState([
        'playmode',
        'audioPlaying'
      ]),
      totals() {
        musicComment({ id: this.audioPlaying.id }).then(res => {
          this.total = res.data.total
        })
        return this.total
      }
    },
    created() {

    },
    methods: {
      ...mapMutations([
        'set_playmode',
        'prevPlaynext'
      ]),
      collectionfn() {
        this.collection = !this.collection
      },
      pinglun() {
        this.$router.push({ path: `/comment/${this.audioPlaying.id}` })
      },
      detailsfn() {
        this.$refs.popupDetail.showfn(this.audioPlaying)
      },
      setStyleRoute(vnode) {
        if (this.play) {
          this.styleRoute = {
            transition: 'transform 600s',
            transform: 'rotate(7000deg)'
          }
        } else {
          let routes = this.getRoutes(vnode)
          this.styleRoute = {
            transform: `rotate(${routes}deg)`
          }
        }
      },
      getRoutes(el) {
        //el为原生dom元素
        let transform = window.getComputedStyle(el).transform
        let str = transform.substring(transform.indexOf('(') + 1, transform.lastIndexOf(')')).split(",")
        return this.getmatrix(...str)
      },
      getmatrix(a, b, c, d, e, f) { //获取角度
        var aa = Math.round(180 * Math.asin(a) / Math.PI);
        var bb = Math.round(180 * Math.acos(b) / Math.PI);
        var cc = Math.round(180 * Math.asin(c) / Math.PI);
        var dd = Math.round(180 * Math.acos(d) / Math.PI);
        var deg = 0;
        if (aa == bb || -aa == bb) {
          deg = dd;
        } else if (-aa + bb == 180) {
          deg = 180 + cc;
        } else if (aa + bb == 180) {
          deg = 360 - cc || 360 - dd;
        }
        return deg >= 360 ? 0 : deg;
      },
      playlistfn() {
        this.$refs.catalogue.show()
      },
      setPlaymode() {
        this.set_playmode()
      },
      plays() {
        this.play = !this.play
        let turntable = this.$refs.turntable
        this.setStyleRoute(turntable)
      },
      playPrev() {
        this.prevPlaynext({ type: 'prev' })
      },
      playNext() {
        this.prevPlaynext({ type: 'next' })
      },
      aaa(){
        musicComment({ id: this.audioPlaying.id }).then(res => {
          this.total = res.data.total
        })
      }
    },
    filters: {
      numType(val) {
        if (val > 10000) {
          return '1w+'
        } else if (val > 999) {
          return '999+'
        } else {
          return val
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail {
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
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  .turntable {
    position: relative;
    top: 11%;
    z-index: 0;

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
    top: -4.5%;
    right: 27%;
    z-index: 5;
    width: 28%;
    transform: rotateZ(-24deg);
    transform-origin: 60px 0;
    &.upDown {
      animation: upDown 0.5s linear forwards;
    }
    &.downUp {
      animation: downUp 1.5s ease-out;
    }
    @keyframes upDown {
      0% {
        top: -4.5%;
        transform: rotateZ(-24deg);
      }
      100% {
        top: -3%;
        transform: rotateZ(0);
      }
    }
    @keyframes downUp {
      0% {
        top: -3%;
        transform: rotateZ(0);
      }
      100% {
        top: -4.5%;
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
      .icon-pinglun {
        font-size: 20px;
      }
      .icon-download {
        font-size: 26px;
      }
    }

    .range {
      margin: 30px 0;
      width: 95%;
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
  .icon-jushoucanggift {
    // transition: transform 1s;
    transform: scale(1.8, 1.8);
  }
  // .icon-jushoucanggift.red {
  //   transform: scale(1.2)
  // }
  .totalBox {
    position: relative;
    .total {
      position: absolute;
      top: -5px;
      left: 57%;
      z-index: 0;
      line-height: normal;
      font-size: 12px;
    }
  }
</style>

<style lang="less">
  .detail .vux-header {
    background-color: transparent !important;
    outline: 1px solid #ccc;

  }
</style>




