<template>
  <div>
    <tab :line-width="2" class="tab" bar-active-color="">
      <tab-item selected>发现</tab-item>
      <tab-item>我的</tab-item>
      <tab-item>电台</tab-item>
    </tab>
    <swiper auto loop :interval="2000" :aspect-ratio="420/1080" class="text-scroll" :show-desc-mask="false" dots-position="center">
      <swiper-item v-for="item in banners" :key="item.encodeId">
        <img :src="item.pic" :alt="item.typeTitle" class="autoImage">
      </swiper-item>
    </swiper>
    <flexbox class="myself vux-1px-b" :gutter="0">
      <flexbox-item>
        <div class="list" @click="funfm('/fm')">
          <span class="iconBox"></span>
          <p class="text">私人FM</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="list" @click="funfm('/tuijian')">
          <span class="iconBox"></span>
          <p class="text">每日推荐</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="list">
          <span class="iconBox"></span>
          <p class="text">歌单</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="list">
          <span class="iconBox"></span>
          <p class="text">排行榜</p>
        </div>
      </flexbox-item>
    </flexbox>
    <group-title class="groupTitle">每日推荐
      <x-icon type="ios-arrow-right" size="18" class="icon-red"></x-icon>
    </group-title>
    <flexbox align="flex-start" :gutter="0" wrap="wrap">
      <flexbox-item :span="1/3" v-for="list in resources" :key="list.id">
        <div class="gridBox">
          <span class="playcount">{{integ(list.playCount)}}</span>
          <img class="gridImg" :src="`${list.picUrl}?param=200y200`" :alt="list.copywriter">
          <div class="gridtext">{{list.name}}</div>
        </div>
      </flexbox-item>
    </flexbox>
    <group-title class="groupTitle">独家放送</group-title>
    <flexbox align="flex-start" :gutter="0" wrap="wrap">
      <flexbox-item :span="(index+1)==sole.length?12:1/2" v-for="(list, index) of sole" :key="list.id">
        <div class="gridBox">
          <img class="gridImg" :src="(index+1)==sole.length?`${list.picUrl}?param=540y200`:`${list.sPicUrl}?param=320y180`" :alt="list.copywriter">
          <div class="gridtext">{{list.name}}</div>
        </div>
      </flexbox-item>
    </flexbox>
    <group-title class="groupTitle">最新音乐
      <x-icon type="ios-arrow-right" size="18" class="icon-red"></x-icon>
    </group-title>
    <flexbox align="flex-start" :gutter="0" wrap="wrap">
      <flexbox-item :span="1/3" v-for="list in newMusic" :key="list.id">
        <div class="gridBox">
          <img class="gridImg" :src="`${list.song.album.picUrl}?param=200y200`" :alt="list.copywriter">
          <div class="gridtext">
            <p class="ellipsis">{{list.name}}</p>
            <p>{{list.song.artists[0].name}}</p>
          </div>
        </div>
      </flexbox-item>
    </flexbox>
    <!-- <group-title class="groupTitle">主播电台
      <x-icon type="ios-arrow-right" size="18" class="icon-red"></x-icon>
    </group-title>
    <flexbox align="flex-start" :gutter="0" wrap="wrap">
      <flexbox-item :span="1/3" v-for="list in dj" :key="list.id">
        <div class="gridBox">
          <img class="gridImg" :src="`${list.song.album.picUrl}?param=200y200`" :alt="list.copywriter">
          <div class="gridtext">
            <p class="ellipsis">{{list.name}}</p>
            <p>{{list.song.artists[0].name}}</p>
          </div>
        </div>
      </flexbox-item>
    </flexbox> -->
    <flexbox class="videoBar" :gutter="0">
      <flexbox-item span="50px">
        img
      </flexbox-item>
      <flexbox-item>
        img
      </flexbox-item>
      <flexbox-item span="100px">
        <x-circle :percent="100" stroke-color="#04BE02"></x-circle>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem, Grid, GridItem, GroupTitle, XCircle } from 'vux'
  import { integ } from '../util/util.js'
  export default {
    name: "home",
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Flexbox,
      FlexboxItem,
      Grid,
      GridItem,
      GroupTitle,
      XCircle
    },
    data() {
      return {
        msg: 'Hello World!',
        index_entry: [],
        banners: [],
        resource: [],
        newMusic: [],
        sole: [],
        dj: []
      }
    },
    created() {
      let _this = this;
      let _axios = this.$http;
      _axios.get('/banner').then(res => {
        _this.banners = res.data.banners
      })
      _axios.all([
        _axios.get('/personalized', { params: { limit: 2 } }),
        _axios.get('/recommend/resource', { withCredentials: true }),
        _axios.get('/personalized/newsong'),
        _axios.get('/personalized/privatecontent'),
        _axios.get('/dj/recommend', { withCredentials: true }),
        _axios.get('/program/recommend'),
        _axios.get('/personalized/djprogram'),
      ]).then(_axios.spread((res1, res2, res3, res4, res5, res6, res7) => {
        _this.resource = _this.resource.concat(res1.data.result, res2.data.recommend);
        _this.newMusic = res3.data.result;
        _this.newMusic.length = 6;
        _this.sole = res4.data.result.reverse();
        _this.dj = res5.data.result;
        console.log(res5.data);
        console.log(res6.data);
        console.log(res7.data);
      }))
    },
    computed: {
      resources() {
        this.resource.forEach(v => {
          if (!v.hasOwnProperty('playCount')) {
            v['playCount'] = v.playcount
          }
        })
        return this.resource;
      }
    },
    methods: {
      integ(num) {
        return integ(num);
      },
      funfm(str){
        this.$router.push(str)
      }
    }
  }
</script>


<style lang="less" scoped>
  .tab {
    margin: 0 auto;
    background: #fff;
    border: none;
    .vux-tab-container {
      border: none;
    }
  }
  .autoImage {
    display: block;
    width: 100%;
  }
  .myself {
    font-size: 14px;
    text-align: center;
    .list {
      padding: 10px 0;
      .iconBox {
        margin: 0 auto;
        display: block;
        width: 50px;
        height: 50px;
        line-height: 30px;
        border: 1px solid #f93434;
        border-radius: 50%;
      }
      .text {
        margin-top: 7px;
      }
    }
  }
  .card-padding {
    padding: 15px;
  }
  .icon-red {
    font-size: 12px;
    vertical-align: middle;
  }
  .groupTitle {
    line-height: 26px;
    font-size: 16px;
    border-left: 3px solid #f93434;
  }
  .gridImg {
    display: block;
    width: 100%;
  }
  .gridBox {
    position: relative;
    font-size: 12px;
    line-height: 20px;
    .gridImg {
      display: block;
      width: 100%;
    }
    .gridtext {
      display: -webkit-box;
      padding: 10px 5px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;

      .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .playcount {
      position: absolute;
      top: 0;
      right: 6px;
      z-index: 1;
      color: #fff;
    }
  }
  .videoBar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    height: 40px;
    line-height: 40px;
    background-color: rgba(255, 255, 255, .8);
  }
</style>

