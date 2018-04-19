<template>
  <div class="tuijian">
    <x-header :left-options="{backText: ''}" :right-options="{showMore: true}">每日歌曲推荐</x-header>
    <div class="bannBig">
      <img :src="bigImg.pic" :alt="bigImg.typeTitle">
      <span class="tag">{{bigImg.typeTitle}}</span>
      <div class="tips">根据你的音乐口味生成,每天6:00更新</div>
      <div class="bg"></div>
    </div>
    <Audios :id="''+songs[0].id"></Audios>
    <Playlist :songData="songs"></Playlist>
  </div>
</template>

<script>
  import { XHeader, Cell, Group, Popup, TransferDom } from 'vux';
  import Playlist from '../components/playlist.vue';
  import Audios from '../components/Audio.vue';
  import { mapState } from 'vuex';

  export default {
    name: "tuijian",
    data() {
      return {
        idurl: '455358996',
      }
    },
    created() {
      let _this = this
    },
    components: {
      XHeader,
      Cell,
      Group,
      Popup,
      Playlist,
      Audios
    },
    directives: {
      TransferDom
    },
    computed: {
      ...mapState([
        'banners',
        'songs'
      ]),
      bigImg(){
        return this.banners.find(item=>{
          return item.typeTitle=="广告"
        })
      }
    },
    methods: {
      fn(){
        console.log(111);
      },
    }
  }
</script>

<style lang="less" scoped>
  .tuijian {
    margin-bottom: 55px;
  }
  .bannBig {
    position: relative;
    img {
      display: block;
      width: 100%;
    }
    .tag {
      position: absolute;
      right: 20px;
      top: 10px;
      z-index: 1;
      color: #fff;
    }
    .tips {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 7px;
      z-index: 1;
      padding-left: 20px;
      font-size: 14px;
      color: #fff;
    }
    .bg {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 0;
      background-color: rgba(0, 0, 0, .15);
      background-image: linear-gradient(to top, #dcdcdc 0%, transparent 50%);
    }
  }
  .weui-cell {
    padding-left: 10px;
    padding-right: 10px;
  }
  .artistsImg {
    margin-right: 10px;
    width: 50px;
    height: 50px;
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
  .alias {
    font-size: 12px;
    font-style: normal;
    color: #aaa;
  }
  
  .icn_more {
    width: 20px;
    height: 20px;
    background-color: #ff5c5c;
    img {
      display: block;
      width: 100%;
    }
  }
  .checkbox {
    font-size: 14px;
  }
  .allplayIcon {
    margin-right: 5px;
    vertical-align: middle;
    width: 24px;
    height: 24px;
  }
  
</style>
<style lang="less">
  .songs {
    .weui-cells {
      margin-top: 0;
      background-color: #fbfbfb;
    }
    .vux-cell-primary {
      padding-right: 15px;
      overflow: hidden;
      .vux-label {
        // height: 26px;
        line-height: 26px  ;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        }
      .vux-label-desc {
        display: block;
        // height: 22px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .songPopup {
    .weui-cells {
      margin-top: 5px;
    }
  }
</style>




