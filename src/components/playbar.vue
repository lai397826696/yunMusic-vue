<template>
  <div class="videoBar" v-show="vodeShow">
    <flexbox :gutter="10">
      <flexbox-item span="40px">
        <div class="artistsImg">
          <img v-if="isplay.bool && isplay.id==playdatasing.id" src="../../static/images/aal.png" alt="play" class="playImg">
          <img v-else :src="`${playdatasing.album.blurPicUrl}?param=250y250`" :alt="playdatasing.name">
        </div>
      </flexbox-item>
      <flexbox-item>
        <div @click="routelink">
          <div class="name">{{playdatasing.name}}
            <i class="alias">{{playdatasing.alias.length>0?`(${playdatasing.alias[0]})`:''}}</i>
          </div>
          <div class="desc">
            <span v-for="(ai, index) of playdatasing.artists" :key="ai.id">{{index==0?ai.name:'/'+ ai.name}}</span>-{{playdatasing.album.name}}
          </div>
        </div>
      </flexbox-item>
      <flexbox-item span="70px">
        <div class="circleBox" @click="audioPlay">
          <x-circle :percent="percent" :stroke-width="7" :trail-width="7" trail-color="#4d4d4d" stroke-color="#d33a31">
            <i class="jiao"></i>
          </x-circle>
        </div>
        <span class="musicList" @click="playlistfn">列表</span>
      </flexbox-item>
    </flexbox>
    <div v-transfer-dom>
      <popup class="playbarPopup" v-model="modelShow" height="45%">
        <group>
          <cell title="列表循环">
            <div slot="icon">
              <!-- <img src="../../static/images/cm2_icn_loop@2x.png" alt=""> -->
            </div>
          </cell>
          <cell v-for="item in play_list_data" :key="item.id">
            <div slot="title">{{item.name}}</div>
            <div class="after-title" slot="after-title">
              -
              <span v-for="(ai, index) of item.artists" :key="ai.id">{{index==0?ai.name:'/'+ ai.name}}</span>
            </div>
            <div @click="closePlaylist">
              <x-icon class="icon" type="ios-close-empty" size="24"></x-icon>
            </div>
          </cell>
        </group>
      </popup>
    </div>
    <!-- <Audio @audioPlay="audioPlay"></Audio> -->
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
  import { Flexbox, FlexboxItem, XCircle, Cell, Group, Popup, TransferDom } from 'vux'
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
  // import Audio from './Audio.vue';

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
        isplay: {
          id: '',
          bool: false
        },
        modelShow: false,
        vodeShow: true,
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      XCircle,
      Group,
      Cell,
      Popup,
      // Audio
    },
    directives: {
      TransferDom
    },
    created() {
      this.recommendapi();
    },
    computed: {
      ...mapState([
        'play_list_data',
      ]),
      ...mapGetters([
        'playidURL',
        'playdatasing'
      ]),
      data_one() {
        return this.play_list_data.length > 0 ? this.play_list_data[0] : this.playOne
      },
      // playidURL(){
      //   return `http://music.163.com/song/media/outer/url?id=${this.play_list_data[0].id}.mp3`;
      // }
    },
    methods: {
      ...mapActions([
        'recommendapi',
      ]),
      // ...mapMutations([
      //   'playingfn'
      // ]),
      // start() {
      //   this.playingfn({data: { playing: true, id: this.play_list_data[0].id}})
      // },
      playlistfn() {
        this.modelShow = !this.modelShow;
      },
      closePlaylist() {
        console.log(11);
      },
      routelink() {
        this.$router.push('/detail')
      },
      audioPlay() {
        let _this=this;
        let ading = this.$refs.ading;
        if(ading.paused) {
          ading.play();
          console.log('播放');
        } else {
          console.log('暂停');
          ading.pause();
        }
        // this.$emit('audioPlay')
        // ading.addEventListener("loadedmetadata", function() {
        //   console.log(ading.duration);
        // });

        // ading.addEventListener("timeupdate", function() {
        //   var value = Math.round(Math.floor(this.currentTime) / Math.floor(this.duration) * 100, 0);
        //   console.log(this.currentTime);
        // }, false);
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
        if (path == "/" || path == '/tuijian') {
          this.vodeShow = true
        } else {
          this.vodeShow = false
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
    padding: 6px 10px;
    // height: 44px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.95);
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
    }
    .line {
      display: inline-block;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid #000;
    }
    .artistsImg {
      overflow: hidden;
      img {
        display: block;
        width: 100%;
      }
      .playImg {
        margin: 15px auto;
        width: 24px;
        height: 24px;
      }
    }
    .name,
    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
</style>
<style lang="less">
  .playbarPopup {
    .vux-label {
      float: left;
    }
    .after-title {
      display: inline-block;
      font-size: 14px;
      color: #999;
    }
  }
</style>
