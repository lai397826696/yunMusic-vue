<template>
  <div class="detail">
    <x-header class="fixed-top" :left-options="{backText: ''}">{{audioPlaying.name}}</x-header>
    <div class="bg-blur" :style="{backgroundImage: `url(${audioPlaying.album.blurPicUrl})`}"></div>
    <div class="clear-header">
      <div class="turnFixed" @click="togglefn">
        <div class="turntableBox" v-show="toggle">
          <div class="turntable">
            <img src="../../static/images/aag.png" alt="" class="pointer" :class="{upDown: audioPlaying.playing &&zhouRoute.is, downUp: !audioPlaying.playing&& zhouRoute.is}" :style="{'transform': `rotate(-${zhouRoute.route}deg)`}">
            <div class="content" @touchstart="touchstart" @touchmove.prevent="touchmove" @touchend="touchend" :style="{left: movedata.left+'px'}">
              <img src="../assets/play.png" alt="" class="playbg">
              <img :src="`${audioPlaying.album.blurPicUrl}?param=300y300`" alt="" class="playimg" ref="turntable" :style="styleRoute">
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
                    <span class="total">{{totals | num_format(1)}}</span>
                  </div>
                </flexbox-item>
                <flexbox-item>
                  <i class="iconfont icon-more" @click.stop="detailsfn"></i>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>
        <div class="lyric" ref="lyric" v-show="!toggle">
          <div class="lyricRoute">
            <p v-if="!!item" class="text" v-for="(item, index) in lyricData.text" :key="index">{{item}}</p>  
          </div>
          
        </div>
      </div>
      <div class="foot">
        <Drag></Drag>
        <flexbox :gutter="0" class="original">
          <flexbox-item>
            <i class="iconfont" :class="playmode.class" @click="setPlaymode"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-prev" @click="playPrev"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont" :class="{'icon-zanting1': audioPlaying.playing, 'icon-bofang1': !audioPlaying.playing }" @click="plays"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-next" @click="playNext"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-liebiao" @click="playlistfn"></i>
          </flexbox-item>
        </flexbox>
      </div>
      <catalogue ref="catalogue"></catalogue>
    </div>
    <popupDetail ref="popupDetail" v-model="show" type="detail"></popupDetail>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import Drag from '../components/Drag';
  import popupDetail from '../components/popupDetail';
  import catalogue from '../components/Catalogue';
  import turntable from '../components/Turntable';
  import { musicComment, lyric } from '../util/severAPI';

  export default {
    name: "detail",
    data() {
      return {
        data1: 0,
        play: false,
        collection: false,
        show: false,
        id: '',
        total: 0,
        styleRoute: {},
        zhouRoute: {
          route: 27,
          is: false
        },
        toggle: true,
        movedata: {
          x: 0,
          left: 0,
          domleft: 0,
          status: null
        },
        scrolltop: '0'
      }
    },
    components: {
      Drag,
      popupDetail,
      catalogue,
      turntable
    },
    created() {
    },
    mounted() {
    },
    computed: {
      ...mapState([
        'playmode',
        'audioPlaying',
        'lyricData'
      ]),
      totals() {
        musicComment({ id: this.audioPlaying.id }).then(res => {
          this.total = res.data.total
        })
        return this.total
      }
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
      playlistfn() {
        this.$refs.catalogue.show()
      },
      setPlaymode() {
        this.set_playmode()
      },
      plays() {
        let vm = this
        this.set_audioStatus({ playing: this.audioPlaying.playing });
        this.zhouRoute.is = true
        if (this.audioPlaying.playing) {
          this.setStyleRoute()
          this.zhouRoute.route = 2
        } else {
          setTimeout(function () {
            vm.setStyleRoute()
          }, 400)
        }
      },
      playPrev() {
        let vm = this;
        this.prevPlaynext({ type: 'prev' })
        this.set_audioStatus({ playing: false });
        this.setStyleRoute(true)
        setTimeout(function () {
          // vm.play = true
        // this.set_audioStatus({ playing: true });
          vm.setStyleRoute()
        }, 200)
      },
      playNext() {
        let vm = this;
        this.prevPlaynext({ type: 'next' })
        // this.play = false
        this.set_audioStatus({ playing: false });
        this.setStyleRoute(true)
        setTimeout(function () {
          // vm.play = true
        // this.set_audioStatus({ playing: true });
          vm.setStyleRoute()
        }, 200)
      },
      togglefn() {
        this.toggle = !this.toggle
        if (!this.toggle) {
          this.$nextTick(function () {
          })
        }
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
        if (this.audioPlaying.playing) {
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
      touchstart(event) {
        this.movedata.x = event.changedTouches[0].clientX
        this.movedata.domleft = event.target.getBoundingClientRect().left
        this.movedata.status = "false"
      },
      touchmove(event) {
        let move = event.changedTouches[0]
        let domrect = event.target.getBoundingClientRect()
        this.movedata.left = move.clientX - this.movedata.x

        let position = move.clientX < this.movedata.x ? "next" : "prev"
        //达到边界值
        if (-domrect.left >= domrect.width / 2 || domrect.left >= (domrect.width / 2 + this.movedata.domleft * 2)) {
          this.movedata.status = position
        } else {
          this.movedata.status = "false"
        }
      },
      touchend() {
        this.movedata.left = 0
        if (this.movedata.status != 'false') this.prevPlaynext({ type: this.movedata.status })
      },
      lyricRoutefn() {
        let _this=this;
        setInterval(function () {
          _this.$refs.lyric.scrollTop+=34
        }, 2000)
      },
    },
  }
</script>

<style lang="less" scoped>
  @import "../assets/css/mixin.less";
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
      background-color: rgba(0, 0, 0, 0.6);
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
      .icon-zanting1,
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
    left: 0;
    right: 0;
    bottom: 19%;
    z-index: 0;
    overflow: hidden;
  }

  .turntableBox {
    position: relative;
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
        animation: downUp 1s ease-out 0.2s forwards;
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
      margin-top: 22%;
      width: 100%;
    }
    .content {
      position: relative;
      z-index: 0;
      margin: 0 auto;
      padding: 4px;
      width: 80%;
      box-sizing: border-box;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.15);

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
  }
  .lyric {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    color: @FRONT_GRAY;
    .lyricRoute {
      padding: 60% 0;
      width: 100%;
    }
    .text {
      margin: 0 auto 12px;
      width: 80%;
      text-align: center;
    }
  }
</style>

<style lang="less">
  .detail .vux-header {
    background-color: transparent !important;
    outline: 1px solid #ccc;
  }
</style>




