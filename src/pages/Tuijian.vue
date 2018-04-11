<template>
  <div>
    <x-header :left-options="{backText: ''}" :right-options="{showMore: true}">每日歌曲推荐</x-header>
    <div class="bannBig">
      <img :src="bigImg.pic" :alt="bigImg.typeTitle">
      <span class="tag">{{bigImg.typeTitle}}</span>
      <div class="tips">根据你的音乐口味生成,每天6:00更新</div>
      <div class="bg"></div>
    </div>

    <group class="songs">
      <cell title="播放全部" value="多选"></cell>
      <cell class="songsCell"  v-for="item of songs" :key="item.id" :inline-desc="item.artists[0].name+'-'+item.album.name">
        <div class="artistsImg" slot="icon">
          <img v-if="!isplay" :src="`${item.album.blurPicUrl}?param=250y250`" :alt="item.name">
          <img v-else src="../../static/images/aal.png" alt="play" class="playImg">
        </div>
        <div class="icn_more">
          <img src="../../static/images/cm2_play_icn_more@2x.png" alt="more">
        </div>
        <span class="name" slot="title">{{item.name}}
          <i class="alias">{{item.alias.length>0?`(${item.alias[0]})`:''}}</i>
        </span>
      </cell>
    </group>
  </div>
</template>

<script>
  import { XHeader, Cell, Group } from 'vux';
  export default {
    name: "tuijian",
    data() {
      return {
        songs: [],
        isplay: false,
        bigImg: {}
      }
    },
    created() {
      let _this = this
      let _axios = this.$http;
      _axios.get('/banner').then(res => {
        _this.bigImg = res.data.banners.find(item=>{
          return item.typeTitle=="广告"
        })
        console.log(_this.bigImg);
      })

      this.$http.get('/recommend/songs', { withCredentials: true }).then(res => {
        _this.songs = res.data.recommend
      })
    },
    components: {
      XHeader,
      Cell,
      Group
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
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
      margin: 9px auto;
      width: auto;
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
  
</style>
<style lang="less">
  .songsCell {
    .weui-cells {
      background-color: #fbfbfb;
    }
    .vux-cell-primary {
      padding-right: 15px;
      overflow: hidden;

      .vux-label {
        height: 26px;
        line-height: 26px  ;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        }
      .vux-label-desc {
        display: block;
        height: 22px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  
</style>




