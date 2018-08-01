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
        <source :src="playidURL" type="audio/ogg" />
        <source :src="playidURL" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
    <!-- <Audio></Audio> -->
  </div>
</template>

<script>
import { XCircle, Popup, TransferDom, Actionsheet } from "vux";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import catalogue from "./Catalogue";
import Audio from './Audio';

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
    Popup,
    Actionsheet,
    catalogue,
    Audio
  },
  directives: {
    TransferDom
  },
  computed: {
    ...mapState(["song_catalogue", "audioPlaying", "playmode"]),
    ...mapGetters(["playidURL"])
  },
  mounted() {
    let ading = this.$refs.ading;
    this.init(ading)
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
    init(ading){
      let vm=this
      console.log(ading);
      //设置音量
      ading.volume=.7;
      // 当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件。
      // 当音频/视频处于加载过程中时，会依次发生以下事件：
      // loadstart
      // durationchange
      // loadedmetadata
      // loadeddata
      // progress
      // canplay
      // canplaythrough
      ading.addEventListener("loadstart", function() {
        console.log('1-当浏览器开始查找音频/视频时');
      })
      ading.addEventListener("durationchange", function() {
        console.log('2-当音频/视频的时长已更改时');
      })
      ading.addEventListener("loadedmetadata", function() {
        console.log('3-当浏览器已加载音频/视频的元数据时');

        //测试，快速听歌 start
        let time=this.duration-20
        this.currentTime=time
        //测试，快速听歌 end
        vm.duration=this.duration
      })
      ading.addEventListener("loadeddata", function() {
        console.log('4-当浏览器已加载音频/视频的当前帧时');
      })
      ading.addEventListener("progress", function() {
        console.log('5-当浏览器正在下载音频/视频时');
      })
      ading.addEventListener("canplay", function() {
        console.log('6-当浏览器可以播放音频/视频时');
      })
      ading.addEventListener("canplaythrough", function() {
        console.log('7-当浏览器可在不因缓冲而停顿的情况下进行播放时');
      })


      if (ading.paused) { //播放是否暂停
        this.set_audioStatus({ playing: false });
      } else {
        this.set_audioStatus({ playing: true });
      }

      ading.addEventListener("timeupdate", function() {
        var value = (Math.floor(this.currentTime) / Math.floor(this.duration) * 100).toFixed(2);
        vm.currentTime=Math.round(value)
      });
      
      ading.addEventListener("pause",function(){
        console.log('暂停');
      })

      ading.addEventListener("play",function(){
        console.log('播放');
      })

      ading.addEventListener("ended",function(){
        console.log('播放结束');
        if(vm.playmode.key==2) {
          this.loop=true
          this.load()
        } else {
          vm.prevPlaynext({ type: 'next' })
        }
      })

      ading.addEventListener("error",function(){
        // 1 = MEDIA_ERR_ABORTED - 取回过程被用户中止
        // 2 = MEDIA_ERR_NETWORK - 当下载时发生错误
        // 3 = MEDIA_ERR_DECODE - 当解码时发生错误
        // 4 = MEDIA_ERR_SRC_NOT_SUPPORTED - 不支持音频/视频
        let err=[0,'取回过程被用户中止','当下载时发生错误','当解码时发生错误','不支持音频/视频']
        console.log('error：'+err[this.error.code]);
        vm.set_audioStatus({ playing: false });
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
    },
    routefn() {
      let path = this.$route.path;
      if (path == "/detail" || path == "/fm") {
        this.vnodeshow = false;
      } else {
        this.vnodeshow = true;
      }
    }
  },
  watch: {
    $route: "routefn"
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
