<template>
  <div class="detail">
    <x-header class="fixed-top" :left-options="{backText: ''}">{{audioPlaying.name}}</x-header>
    <div class="bg-blur" :style="{backgroundImage: `url(${audioPlaying.album.blurPicUrl})`}"></div>
    <div class="clear-header">
      <div class="turnFixed"><turntable></turntable></div>
      <div class="foot">
        <!-- <flexbox :gutter="0" class="tools">
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
        </flexbox> -->
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
  import turntable from '../components/Turntable';

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
      catalogue,
      turntable
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
      setStyleRoute(initial = false) {
        //initial参数解决播放下一首时，正在转动的角度拨正为0deg
        let turntable = this.$refs.turntable
        if (this.play) {
          this.styleRoute = {
            transition: 'transform 600s',
            transform: 'rotate(7000deg)'
          }
        } else {
          let routes = initial ? 0 : this.getRoutes(turntable)
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
        let vm = this
        this.play = !this.play
        if (this.play) {
          this.setStyleRoute()
        } else {
          setTimeout(function () {
            vm.setStyleRoute()
          }, 400)
        }
      },
      playPrev() {
        let vm = this;
        this.prevPlaynext({ type: 'prev' })
        this.play = false
        this.setStyleRoute(true)
        setTimeout(function () {
          vm.play = true
          vm.setStyleRoute()
        }, 200)
      },
      playNext() {
        let vm = this;
        this.prevPlaynext({ type: 'next' })
        this.play = false
        this.setStyleRoute(true)
        setTimeout(function () {
          vm.play = true
          vm.setStyleRoute()
        }, 200)
      },
      aaa() {
        musicComment({ id: this.audioPlaying.id }).then(res => {
          this.total = res.data.total
          this.play = false
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

    .original {
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      .iconfont {
        font-size: 24px;
      }
      .icon-bofang1 {
        font-size: 52px;
      }
    }
  }
  .icon-jushoucanggift {
    // transition: transform 1s;
    transform: scale(1.8, 1.8);
  }
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

  .turnFixed {
    position: absolute;
    top: 0;
    bottom: 19%;
    z-index: 0;
  }
</style>

<style lang="less">
  .detail .vux-header {
    background-color: transparent !important;
    outline: 1px solid #ccc;
  }
</style>




