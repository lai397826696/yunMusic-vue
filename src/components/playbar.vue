<template>
  <div class="vux-1px-t videoBar" v-show="playbarShow && !!audioPlaying.id">
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
          <x-circle :percent="currentTime" :stroke-width="7" :trail-width="7" trail-color="#4d4d4d" stroke-color="#d33a31">
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
      <audio :src="playidURL" ref="ading" autoplay>
        <source :src="playidURL" type="audio/mpeg" />
        <source :src="playidURL" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <!-- <video id='my-video' class='video-js' preload='auto' data-setup='{}'>
        <source :src='MY_VIDEO.mp4' type='video/mp4'>
        <source :src='MY_VIDEO.webm' type='video/webm'>
        <p class='vjs-no-js'>
    To view this video please enable JavaScript, and consider upgrading to a web browser that
          <a href='https://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a>
        </p>
      </video> -->
    </div>
    <!-- <Audio></Audio> -->
  </div>
</template>

<script>
  import { XCircle, Actionsheet } from "vux";
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  import catalogue from "./Catalogue";
  import Audio from './Audio';
  import { clearTimeout } from 'timers';

  // import video from 'video.js';

  export default {
    name: "playbar",
    data() {
      return {
        playOne: {
          album: {},
          alias: [],
          artists: []
        },
        vnodeshow: true,
        modelShow: false,
        actionShow: false,
        menu7: {
          menu1: "北京烤鸭",
          menu2: "陕西油泼面",
          menu3: "西安肉夹馍"
        },
        duration: 0,
        currentTime: 0,
        index: 0
      };
    },
    components: {
      XCircle,
      Actionsheet,
      catalogue,
      Audio
    },

    mounted() {
      let ading = this.$refs.ading;
      this.init(ading)
    },
    computed: {
      ...mapState([
        "song_catalogue",
        "audioPlaying",
        "playmode",
        "playbarShow"
      ]),
      ...mapGetters([
        "playidURL"
      ])
    },
    methods: {
      ...mapMutations([
        "set_audioStatus",
        "prevPlaynext",
      ]),
      playlistfn() {
        this.$refs.catalogue.show();
      },
      routelink() {
        this.$router.push("/detail");
      },
      init(ading) {
        let vm = this
        //设置音量
        ading.volume = .3;
        // 当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件。
        // 当音频/视频处于加载过程中时，会依次发生以下事件：
        // loadstart
        // durationchange
        // loadedmetadata
        // loadeddata
        // progress
        // canplay
        // canplaythrough
        ading.addEventListener("loadstart", function () {
          console.log('1-当浏览器开始查找音频/视频时');
          vm.$emit("loadstart", this)
        })
        ading.addEventListener("durationchange", function () {
          console.log('2-当音频/视频的时长已更改时');
          vm.$emit("durationchange", this)
        })
        ading.addEventListener("loadedmetadata", function () {
          console.log('3-当浏览器已加载音频/视频的元数据时');

          //测试，快速听歌 start
          // let time = this.duration - 20
          // this.currentTime = time
          //测试，快速听歌 end
          vm.duration = this.duration
          vm.$emit("loadedmetadata", this)
        })
        ading.addEventListener("loadeddata", function () {
          console.log('4-当浏览器已加载音频/视频的当前帧时');
          vm.$emit("loadeddata", this)
        })
        ading.addEventListener("progress", function (event) {
          // console.log('5-告知媒体相关部分的下载进度时周期性地触发');
          //加载缓冲的地方
          // console.log(this.buffered, this.seekable);
          vm.$emit("progress", this)
        }, false)
        ading.addEventListener("canplay", function () {
          console.log('6-当浏览器可以播放音频/视频时');
          vm.$emit("canplay", this)
        })
        ading.addEventListener("canplaythrough", function () {
          console.log('7-当浏览器可在不因缓冲而停顿的情况下进行播放时');
          vm.$emit("canplaythrough", this)
        })

        ading.addEventListener("stalled", function () {
          console.log('8-在尝试获取媒体数据，但数据不可用时触发');
          vm.$emit("stalled", this)
        })

        ading.addEventListener("timeupdate", function (event) {
          // console.log(this.currentTime)
          var value = (Math.floor(this.currentTime) / Math.floor(this.duration) * 100).toFixed(2);
          vm.currentTime = Math.round(value)

          // var spu = 0;
          // for (var i = 0; i < ading.buffered.length; i++) {
          //   spu += ading.buffered.end(i) - ading.buffered.start(i);
          // }
          // console.log(spu / ading.duration * 100);

          const timeRanges = ading.buffered
          // 获取已缓存的时间
          if(timeRanges.length<=0) return false;
          timeRanges.end(timeRanges.length - 1)
          console.log(timeRanges, timeRanges.end(timeRanges.length - 1));
          console.log(timeRanges.end(timeRanges.length - 1)/ading.duration*100)
          // parseInt(timeRanges.end(timeRanges.length - 1) * 100 / audio.duration * 100) / 100
          vm.$emit("timeupdate", this)
        });

        ading.addEventListener("pause", function () {
          console.log('暂停');
          vm.set_audioStatus({ playing: false });
          vm.$emit("pause", this)
        })

        ading.addEventListener("play", function () {
          console.log('播放');
          vm.set_audioStatus({ playing: true });
          vm.$emit("play", this)
        })

        ading.addEventListener("ended", function () {
          console.log('播放结束');
          // vm.set_audioStatus({ playing: false });
          if (vm.playmode.key == 2) {
            this.loop = true
            this.load()
          } else {
            vm.prevPlaynext({ type: 'next' })
          }
          vm.$emit("ended", this)
        })

        ading.addEventListener("error", function () {
          // 1 = MEDIA_ERR_ABORTED - 取回过程被用户中止
          // 2 = MEDIA_ERR_NETWORK - 当下载时发生错误
          // 3 = MEDIA_ERR_DECODE - 当解码时发生错误
          // 4 = MEDIA_ERR_SRC_NOT_SUPPORTED - 不支持音频/视频
          let err = [0, '取回过程被用户中止', '当下载时发生错误', '当解码时发生错误', '不支持音频/视频']
          console.log('error：' + err[this.error.code]);
          vm.set_audioStatus({ playing: false });
          vm.$emit("error", this)
        })

      },
      playingfn() {
        let ading = this.$refs.ading;
        if (ading.paused) { //播放是否暂停
          this.set_audioStatus({ playing: true });
          ading.play();
        } else {
          this.set_audioStatus({ playing: false });
          ading.pause();
        }
      },
      transTime(time) {
        var duration = parseInt(time);
        var minute = parseInt(duration / 60);
        var sec = duration % 60 + "";
        var isM0 = ":";
        if (minute == 0) {
          minute = "00";
        } else if (minute < 10) {
          minute = "0" + minute;
        }
        if (sec.length == 1) sec = "0" + sec
        return minute + isM0 + sec;
      }
    }
  };
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

<style lang="less">
  .playbarPopup {
    svg {
      display: block;
    }
  }
</style>
