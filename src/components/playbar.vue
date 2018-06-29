<template>
  <div class="videoBar" v-show="vnodeshow && !!audioPlaying.id">
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
    <div v-transfer-dom>
      <popup class="playbarPopup" v-model="modelShows" height="52%" @on-hide="popuphide">
        <div class="flex vux-1px-b headlist">
          <div class="flex_hd" @click="playmodefn">
            <i class="iconfont" :class="playmode.class"></i>
            {{`${playmode.name}（${song_catalogue.length}）`}}
          </div>
          <div class="flex_bd collection">
            <span @click="collection"><i class="iconfont icon-shoucang mg_r5"></i>收藏全部</span>
          </div>
          <div class="flex_ft" @click="empty"><i class="iconfont icon-icon-shanchu"></i></div>
        </div>
        <div class="popupbox" @scroll="scrollpoput" ref="popupss">
          <div class="flex vux-1px-b" v-for="(item, index) in song_catalogue" :key="item.id">
            <div class="flex_hd" v-show="item.id==audioPlaying.id">
              <i class="iconfont icon-shengyin"></i>
            </div>
            <div class="flex_bd">
              <p class="ellipsis" :class="{'active':item.id==audioPlaying.id}" @click="playfn(item)">
                <span class="name">{{item.name}}</span>
                -
                <em v-for="(ai, index) of item.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</em>
              </p>
            </div>
            <div class="flex_ft" @click="removePlay(index, item.id)">
              <i class="iconfont icon-guanbi mg_r5"></i>
            </div>
          </div>
        </div>
      </popup>
      <Actionsheet v-model="actionShow" theme="android" :menus="menu7" @on-click-menu="clickmenu"></Actionsheet>
    </div>
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
      modelShows: {
        get() {
          if (this.song_catalogue.length == 0) return false;
          return this.modelShow
        },
        set() {

        }
      }
    },
    methods: {
      ...mapMutations([
        'set_audioStatus',
        'remove_songCatalogue',
        'set_changePlaylist',
        'set_playing',
        'set_playmode',
        'empty_songCatalogue'
      ]),
      scrollpoput(event){
        console.log(this.$refs.popupss.scrollTop);
      },
      playlistfn() {
        this.modelShow = true
      },
      removePlay(index, id) {
        this.remove_songCatalogue({ index: index, id: id })
        console.log(this.audioPlaying.id);
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
      popuphide() {
        this.modelShow = false;
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
      playfn(item) {
        this.set_playing({ data: item, type: 'popup' })
      },
      playmodefn() {
        this.set_playmode()
        console.log('切换播放模式：' + this.playmode.name);
      },
      collection() {
        let uid=JSON.parse(localStorage.getItem('userinfo')).profile.userId
        this.$http.get(`/user/playlist?uid=${uid}`).then(res=>{
          console.log(res);
          if(res.data.code==200){}
        })
        this.actionShow=!this.actionShow;
      },
      clickmenu(key,item){
        console.log(key);
        console.log(item);
      },
      empty() {
        let _this = this;
        this.$vux.confirm.show({
          content: '确定要清空播放列表？',
          onConfirm(val) {
            console.log(val);
            _this.empty_songCatalogue();
          }
        })
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

  // 弹窗歌单列表
  .popupbox {
    position: absolute;
    top: 0.586667rem;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    background-color: #fcfcfc;
    transition-property: transform;
    transition-duration: 300ms;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .flex {
      padding-top: 0.133333rem;
      padding-bottom: 0.133333rem;
    }
    // .playImg {
    //   display: block;
    //   width: 0.266667rem;
    //   height: 0.266667rem;
    // }
    .icon-shengyin {
      margin-right: 5px;
      color: red;
    }
    .name {
      color: #000;
    }
    em {
      font-size: 0.16rem;
      color: #666;
    }
    .icon-guanbi {
      font-size: 12px;
      color: #666;
    }
    .active {
      color: red;
      .name,
      em {
        color: red;
      }
    }
  }
  .headlist {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding-top: 0.133333rem;
    padding-bottom: 0.133333rem;
    background-color: #fcfcfc;

    .flex_bd {
      line-height: 0.32rem;
    }
    .playtype {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
      width: 20px;
      height: 20px;
      background-color: #ccc;
    }
    .collection {
      margin-right: 10px;
      text-align: right;
      span {
        padding-right: 10px;
        border-right: 1px solid #eaeaea;
      }
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
  .playbarPopup.vux-popup-dialog {
    border-radius: 0.106667rem 0.106667rem 0 0;
    background: #fcfcfc;
  }
</style>
