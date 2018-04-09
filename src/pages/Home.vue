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
        <div class="list">
          <span class="iconBox"></span>
          <p class="text">私人FM</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="list">
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
      <flexbox-item :span="1/3" v-for="list in resource" :key="list.id">
        <div class="gridBox">
          <img class="gridImg" :src="list.picUrl" :alt="list.copywriter">
          <p class="gridtext">{{list.name}}</p>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem, Grid, GridItem, GroupTitle } from 'vux'
  import $ from 'jquery';
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
      GroupTitle
    },
    data() {
      return {
        msg: 'Hello World!',
        index_entry: [],
        banners: [],
        resource: []
      }
    },
    created() {
      let _this = this;
      this.$axios.get('/banner').then(res => {
        _this.banners = res.data.banners
      })

      this.$axios.get('/personalized').then(res => {
        _this.resource = res.data.result
        _this.resource.length=6;
        console.log(res.data);
      })
      // withCredentials
      this.$axios({
        url: `/recommend/resource`,
        withCredentials: true
      }).then(res => {
        console.log(res.data);
      })

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
    // height: 26px;
    line-height: 26px;
    font-size: 16px;
    border-left: 3px solid #f93434;
  }
  .gridImg {
    display: block;
    width: 100%;
  }
  .gridBox {
    font-size: 14px;
    line-height: 20px;
    .gridImg {
      display: block;
      width: 100%;
    }
    .gridtext {
      display: -webkit-box;
      padding: 5px 0;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
</style>

