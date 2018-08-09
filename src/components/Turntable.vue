<template>
  <div class="turntableBox" @click="togglefn">
    <div class="turntable" v-show="toggle">
      <img src="../../static/images/aag.png" alt="" class="pointer" :class="{upDown: play &&zhouRoute.is, downUp: !play&& zhouRoute.is}" :style="{'transform': `rotate(-${zhouRoute.route}deg)`}">
      <div class="content" ref="turntable" :style="styleRoute">
        <img src="../assets/play.png" alt="" class="playbg">
        <img :src="`${audioPlaying.album.blurPicUrl}?param=300y300`" alt="" class="playimg">
      </div>
      <div class="toolbar">
        <flexbox :gutter="0" class="tools">
          <flexbox-item>
            <i class="iconfont icon-jushoucang" :class="{'icon-jushoucanggift text-color-red': collection}" @click.stop="collectionfn"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-download"></i>
          </flexbox-item>
          <flexbox-item>
            <div class="totalBox">
              <i class="iconfont icon-pinglun" @click.stop="pinglun"></i>
              <span class="total">{{totals | numType}}</span>
            </div>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-more" @click.stop="detailsfn"></i>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <div class="lyric" v-show="!toggle">
      显示歌词
    </div>
    <popupDetail ref="popupDetail" v-model="show" type="detail"></popupDetail>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem } from 'vux'
  import { mapState } from 'vuex';
  import { musicComment } from '../util/severAPI';
  import popupDetail from '../components/popupDetail';

  export default {
    name: "turntable",
    data() {
      return {
        styleRoute: {},
        zhouRoute: {
          route: 27,
          is: false
        },
        toggle: true,
        collection: false,
        total: 0,
        show: false,
        id: ''
      };
    },
    components: {
      Flexbox,
      FlexboxItem,
      popupDetail
    },
    directives: {
    },
    computed: {
      ...mapState([
        'audioPlaying'
      ]),
      totals() {
        musicComment({ id: this.audioPlaying.id }).then(res => {
          this.total = res.data.total
        })
        return this.total
      },
      play() {
        if(this.zhouRoute.route==27 || this.zhouRoute.route==2) this.zhouRoute.is=false
        return this.audioPlaying.playing
      }
    },
    methods: {
      togglefn() {
        this.toggle = !this.toggle
      },
      collectionfn() {
        this.collection = !this.collection
      },
      pinglun() {
        this.$router.push({ path: `/comment/${this.audioPlaying.id}` })
      },
      detailsfn() {
        this.show = true
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
      getmatrix(a, b, c, d, e, f) {
        //获取角度转换
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
    },
    filters: {
      numType(val) {
        if (val > 100000) {
          return '10w+'
        } else if (val > 10000) {
          return '1w+'
        } else if (val > 999) {
          return '999+'
        } else {
          return val
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .turntableBox {
    padding: 1% 0;
    width: 100%;
    height: 98%;
    .pointer {
      position: absolute;
      top: -2.5%;
      right: 27%;
      z-index: 5;
      width: 28%;
      transform-origin: 27.03% 10.53% 0;
      transform: rotateZ(-27deg);
      &.upDown {
        animation: upDown 0.5s ease-out forwards;
      }
      &.downUp {
        animation: downUp 0.4s ease-out 0.2s forwards;
      }
      @keyframes upDown {
        0% {
          transform: rotateZ(-27deg);
        }
        100% {
          transform: rotateZ(-2deg);
        }
      }
      @keyframes downUp {
        0% {
          transform: rotateZ(-2deg);
        }
        100% {
          transform: rotateZ(-27deg);
        }
      }
    }
    .turntable {
      margin: 22% auto 0;
      // margin: 0 auto 0;
      padding: 4px;
      width: 80%;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.15);
      box-sizing: border-box;
    }
    .content {
      position: relative;
      z-index: 0;
      .playbg {
        margin: 0 auto;
        display: block;
        width: 100%;
        max-width: 100%;
      }
      .playimg {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: -1;
        margin: -103px;
        width: 206px;
        border-radius: 50%;
      }
    }
    .toolbar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 15px;
      z-index: 10;
      color: #fff;
      .tools {
        margin: 0 auto;
        width: 80%;
        text-align: center;
        .iconfont {
          font-size: 24px;
        }
        .icon-pinglun {
          font-size: 20px;
        }
        .icon-download {
          font-size: 26px;
        }

        .totalBox {
          position: relative;
          display: inline-block;
          vertical-align: middle;

          .total {
            position: absolute;
            top: -11px;
            left: 18px;
            z-index: 1;
          }
        }
      }
    }
    .lyric {
      width: 100%;
      height: 100%;
    }
  }
</style>
