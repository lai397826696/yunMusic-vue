<template>
  <div class="vux-1px-t videoBar" v-show="vnodeshow && !!audioPlaying.id">
    <div class="flex">
      <div class="flex_hd">
        <div class="artistsImg">
          <img :src="`${audioPlaying.album.blurPicUrl}?param=250y250`" :alt="audioPlaying.name">
        </div>
      </div>
      <div class="flex_bd" @click="routelink">
        <div class="trans">
          <div class="name">{{audioPlaying.name}}
            <em class="alias">{{audioPlaying.alias.length>0?`(${audioPlaying.alias[0]})`:''}}</em>
          </div>
        </div>
        <div class="ellipsis desc">
          <span v-for="(ai, index) of audioPlaying.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span>-{{audioPlaying.album.name}}
        </div>
      </div>
      <div class="flex_ft">
        <div class="mg_lr5 circleBox" @click="playingfn">
          <x-circle :percent="percent" :stroke-width="7" :trail-width="7" trail-color="#4d4d4d" stroke-color="#d33a31">
            <i class="jiao" v-show="!audioPlaying.playing"></i>
            <i class="staricon" v-show="audioPlaying.playing"></i>
          </x-circle>
        </div>
        <span class="musicList" @click="playlistfn">
          <i class="iconfont icon-liebiao"></i>
        </span>
      </div>
    </div>
    <catalogue ref="catalogue"></catalogue>
    <div class="audioBox">
      <audio :src="playidURL" ref="ading">
        <source :src="playidURL" type="audio/ogg" />
        <source :src="playidURL" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</template>

<script>
  import { XCircle, Popup, TransferDom, Actionsheet } from 'vux'
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
  import catalogue from './Catalogue';

  export default {
    name: 'playbar',
    data() {
      return {
        msg: 'Hello World!',
        percent: 0,
        playOne: {
          album: {},
          alias: [],
          artists: []
        },
        vnodeshow: true,
        modelShow: false,
        actionShow: false,
        menu7: {
          menu1: '北京烤鸭',
          menu2: '陕西油泼面',
          menu3: '西安肉夹馍'
        },
      }
    },
    components: {
      XCircle,
      Popup,
      Actionsheet,
      catalogue
    },
    directives: {
      TransferDom
    },
    computed: {
      ...mapState([
        'song_catalogue',
        'audioPlaying',
        'playmode'
      ]),
      ...mapGetters([
        'playidURL',
      ]),
    },
    methods: {
      ...mapMutations([
        'set_audioStatus'
      ]),
      playlistfn() {
        // this.modelShow = true
        this.$refs.catalogue.show()
      },
      routelink() {
        this.$router.push('/detail')
      },
      playingfn() {
        let _this = this;
        let ading = this.$refs.ading;
        if (ading.paused) {
          this.set_audioStatus({ playing: true })
          ading.play();
        } else {
          this.set_audioStatus({ playing: false })
          ading.pause();
        }
      },
      routefn() {
        let path = this.$route.path;
        if (path == "/detail" || path == '/fm') {
          this.vnodeshow = false;
        } else {
          this.vnodeshow = true;
        }
      }
    },
    watch: {
      '$route': 'routefn'
    }
  }
</script>

<style lang="less" scoped>
  .videoBar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    overflow: hidden;
    background-color: #fff;
    .circleBox {
      float: left;
      width: 30px;
      height: 30px;
      .jiao {
        margin: 0 auto;
        // margin-left: 10px;
        display: block;
        width: 0;
        height: 0;
        line-height: 0;
        border: 8px solid transparent;
        border-left-color: #4d4d4d;
        border-right: none;
        // border-radius: 50%;
      }
      .staricon {
        display: inline-block;
        width: 6px;
        height: 10px;
        border-left: 2px solid red;
        border-right: 2px solid red;
      }
    }
    .artistsImg {
      margin-right: 6px;
      overflow: hidden;
      width: 46px;
      height: 46px;
      img {
        display: block;
        width: 100%;
      }
    }
    .trans {
      position: relative;
      height: 0.293333rem;
      line-height: 0.293333rem;
      overflow: hidden;
    }
    .name {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      word-break: break-all;
      // width: 105%;
      // animation: line 8s linear infinite;
    }
    @keyframes line {
      0% {
        left: 0;
      }
      100% {
        left: -200%;
      }
    }
    .desc {
      font-size: 0.16rem;
      color: #666;
    }

    .musicList {
      float: right;
      height: 30px;
      line-height: 30px;
    }
    .icon {
      vertical-align: middle;
    }
  }

  .icon-liebiao {
    margin-left: 10px;
    font-size: 26px;
    color: #666;
    vertical-align: middle;
  }
  .vux-1px-b:after {
    left: 10px;
  }
</style>
