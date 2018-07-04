<template>
  <div v-transfer-dom>
    <popup class="playbarPopup" v-model="modelShows" height="52%" @on-hide="popuphide">
      <div class="flex vux-1px-b headlist">
        <div class="flex_hd" @click="playmodefn">
          <i class="iconfont" :class="playmode.class"></i>
          {{`${playmode.name}（${song_catalogue.length}）`}}
        </div>
        <div class="flex_bd collection">
          <span @click="collection">
            <i class="iconfont icon-shoucang mg_r5"></i>收藏全部</span>
        </div>
        <div class="flex_ft" @click="empty">
          <i class="iconfont icon-icon-shanchu"></i>
        </div>
      </div>
      <div class="popupbox" @scroll="scrollpoput" ref="popupss">
        <div class="flex vux-1px-b" v-for="(item, index) in song_catalogue" :key="item.id">
          <div class="flex_hd" v-show="item.id==audioPlaying.id">
            <i class="iconfont icon-shengyin"></i>
          </div>
          <div class="flex_bd">
            <p class="ellipsis" :class="{'active':item.id==audioPlaying.id}" @click="playfn(item, index)">{{index}}
              <span class="name">{{item.name}}</span>
              -
              <em v-for="(ai, i) of item.artists" :key="ai.id+i">{{i==0?ai.name:'/'+ ai.name}}</em>
            </p>
          </div>
          <div class="flex_ft" @click="removePlay(index, item.id)">
            <i class="iconfont icon-guanbi mg_lr5"></i>
          </div>
        </div>
      </div>
    </popup>
    <Actionsheet v-model="actionShow" theme="android" :menus="menu7" @on-click-menu="clickmenu"></Actionsheet>
  </div>
</template>

<script>
  import { Popup, TransferDom, Actionsheet } from 'vux'
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
  export default {
    name: "catalogue",
    data() {
      return {
        modelShow: false,
        actionShow: false,
        menu7: {
          menu1: '北京烤鸭',
          menu2: '陕西油泼面',
          menu3: '西安肉夹馍'
        },
      };
    },
    components: {
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
      modelShows: {
        get(){
          if(this.song_catalogue.length==0) return false
          return this.modelShow
        },
        set(val){
          this.modelShow=val
        }
      }
    },
    methods: {
      ...mapMutations([
        'remove_songCatalogue',
        'set_playing',
        'set_playmode',
        'empty_songCatalogue'
      ]),
      show() {
        this.modelShow = true;
      },
      popuphide() {
        // this.modelShow = false;
      },
      playmodefn() {
        this.set_playmode()
      },
      collection() {
        let uid=JSON.parse(localStorage.getItem('userinfo')).profile.userId
        this.$http.get(`/user/playlist?uid=${uid}`).then(res=>{
          if(res.data.code==200){}
        })
        this.actionShow=!this.actionShow;
      },
      empty() {
        let _this = this;
        this.$vux.confirm.show({
          content: '确定要清空播放列表？',
          onConfirm(val) {
            _this.empty_songCatalogue();
          }
        })
      },
      scrollpoput(event){
      },
      playfn(item, index) {
        this.set_playing({ data: item, index: index, type: 'popup' })
      },
      removePlay(index, id) {
        this.remove_songCatalogue({ index: index, id: id })
      },
      clickmenu(key,item){
        console.log(key);
        console.log(item);
      },
    }
  };
</script>

<style lang="less" scoped>
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

