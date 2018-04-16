<template>
  <div class="videoBar">
    <flexbox :gutter="10">
      <flexbox-item span="40px">
        <div class="artistsImg">
          <img v-if="isplay.bool && isplay.id==datas_one.id" src="../../static/images/aal.png" alt="play" class="playImg">
          <img v-else :src="`${datas_one.album.blurPicUrl}?param=250y250`" :alt="datas_one.name">
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="name">{{datas_one.name}}
          <i class="alias">{{datas_one.alias.length>0?`(${datas_one.alias[0]})`:''}}</i>
        </div>
        <div class="desc">{{datas_one.artists.length>0?datas_one.artists[0].name+'-'+datas_one.album.name:''}}</div>
      </flexbox-item>
      <flexbox-item span="70px">
        <div class="circleBox" @click="start">
          <x-circle :percent="percent" :stroke-width="7" :trail-width="7" trail-color="#4d4d4d" stroke-color="#d33a31">
            <i class="jiao"></i>
          </x-circle>
        </div>
        <span class="musicList">列表</span>
        <!-- <div class="line"></div> -->
      </flexbox-item>
    </flexbox>
    <div v-transfer-dom>
      <popup class="songPopup" v-model="show" height="45%">
        <group>
          <cell title="歌曲：把酒倒满"></cell>
          <cell title="下一首播放"></cell>
          <cell title="收藏到歌单"></cell>
          <cell title="下载"></cell>
          <cell title="评论(1111)"></cell>
          <cell title="歌手：张张"></cell>
          <cell title="专辑：一一一"></cell>
          <cell title="查看视频"></cell>
          <cell title="不感兴趣"></cell>
        </group>
      </popup>
    </div>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, XCircle, Cell, Group, Popup, TransferDom } from 'vux'

  export default {
    name: 'playbar',
    data() {
      return {
        msg: 'Hello World!',
        percent: 10,
        datas: [],
        datas_one: {
          album: {},
          alias:[],
          artists: []
        },
        isplay: {
          id: '',
          bool: false
        },
        show: false
      }
    },
    created() {
      // let _this=this;
      this.$http.get('/recommend/songs', { withCredentials: true }).then(res => {
        this.datas = res.data.recommend;
        this.datas_one=this.datas[0]
        console.log(this.datas_one);
      })
    },
    components: {
      Flexbox,
      FlexboxItem,
      XCircle,
      Group,
      Cell,
      Popup,
    },
    directives: {
      TransferDom
    },
    methods: {
      start() {
        let clear = setInterval(() => {
          if (this.percent >= 100) {
            clearInterval(clear);
          } else {
            this.percent += 0.5;
          }
        }, 500)
      }
    }
  }
</script>

<style lang="less" scoped>
  .videoBar {
    position: fixed;
    bottom: 0;
    left: 10px;
    right: 10px;
    z-index: 2;
    padding: 6px 0;
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
  }
</style>
