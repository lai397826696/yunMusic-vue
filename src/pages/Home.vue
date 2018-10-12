<template>
  <div class="clear-header home" :class="{'clear-audio': !!audioPlaying.id}">
    <tab :line-width="2" class="tab" bar-active-color="">
      <tab-item selected>发现</tab-item>
      <tab-item>我的</tab-item>
      <tab-item>电台</tab-item>
    </tab>
    <swiper auto loop :interval="2000" :aspect-ratio="420/1080" class="text-scroll" :show-desc-mask="false" dots-position="center">
      <swiper-item v-for="item in banners" :key="item.encodeId">
        <img :src="item.picUrl" :alt="item.typeTitle" class="autoImage">
      </swiper-item>
    </swiper>
    <flexbox class="myself vux-1px-b" :gutter="0">
      <flexbox-item>
        <div class="list" @click="funfm('/fm')">
          <span class="iconBox">
            <i class="iconfont icon-FM"></i>
          </span>
          <p class="text">私人FM</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="list" @click="funfm('/tuijian')">
          <span class="iconBox">
            <i class="iconfont icon-rili2"></i>
          </span>
          <p class="text">每日推荐</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="list" @click="funfm('/songsheet')">
          <span class="iconBox">
            <i class="iconfont icon-gedan"></i>
          </span>
          <p class="text">歌单</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="list" @click="funfm('/rankings')">
          <span class="iconBox">
            <i class="iconfont icon-paihangbang"></i>
          </span>
          <p class="text">排行榜</p>
        </div>
      </flexbox-item>
    </flexbox>
    <group-title class="groupTitle">每日推荐
      <x-icon type="ios-arrow-right" size="18" class="icon-red"></x-icon>
    </group-title>

    <div class="flex items-start flex_index">
      <div class="flex_bd" v-for="list in resources" :key="list.id">
        <div class="gridBox">
          <span class="playcount">
            <img src="../../static/images/p0.png" alt="icon" class="playCountIcon"> {{list.playCount | num_format}}
          </span>
          <img class="gridImg" :src="`${list.picUrl}?param=200y200`" :alt="list.copywriter">
        </div>
        <div class="gridtext">{{list.name}}</div>
      </div>
    </div>
    <group-title class="groupTitle">独家放送</group-title>
    <div class="flex items-start flex_index2">
      <div class="flex_bd" :class="(index+1)==sole.length?'flex_bd1':''" v-for="(list, index) of sole" :key="list.id">
        <div class="gridBox">
          <img class="gridImg" :src="(index+1)==sole.length?`${list.picUrl}?param=540y200`:`${list.sPicUrl}?param=320y180`" :alt="list.copywriter">
        </div>
        <div class="gridtext">{{list.name}}</div>
      </div>
    </div>
    <group-title class="groupTitle">最新音乐
      <x-icon type="ios-arrow-right" size="18" class="icon-red"></x-icon>
    </group-title>

    <div class="flex item-start flex_index">
      <div class="flex_bd" v-for="list in newMusic" :key="list.id">
        <div class="gridBox">
          <img class="gridImg" :src="`${list.song.album.picUrl}?param=200y200`" :alt="list.copywriter">
        </div>
        <div class="gridtext">
          <p class="ellipsis">{{list.name}}</p>
          <p>{{list.song.artists[0].name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem, Grid, GridItem, GroupTitle } from 'vux'
  import { mapState, mapActions } from 'vuex';

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
    },
    data() {
      return {
      }
    },
    created() {
      this.indexapi();
    },
    computed: {
      ...mapState([
        'banners',
        'resource',
        'newMusic',
        'sole',
        'dj',
        'audioPlaying'
      ]),
      resources() {
        let arr = [];
        this.resource.forEach(v => {
          if (!!v) {
            if (!v.playCount) v['playCount'] = v.playcount
            arr.push(v)
          }
        })
        return arr;
      }
    },
    methods: {
      ...mapActions([
        'indexapi'
      ]),
      funfm(str) {
        this.$router.push(str)
      }
    }
  }
</script>


<style lang="less" scoped>
  @import url("../assets/css/mixin.less");
  .home {
    top: 0;
  }
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
        line-height: 50px;
        border: 1px solid #f93434;
        border-radius: 50%;
        color: #f93434;
      }
      .iconfont {
        line-height: 1.6;
        font-size: 30px;
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
    height: 26px;
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
    border-radius: 3px;
    overflow: hidden;
    .shadow(all);

    .gridImg {
      display: block;
      width: 100%;
    }
    .playcount {
      position: absolute;
      top: 0;
      right: 6px;
      z-index: 1;
      color: #fff;
    }
  }
  .gridtext {
    display: -webkit-box;
    margin: 4px 0;
    padding: 6px 5px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
  }
  .playCountIcon {
    width: 14px;
    vertical-align: middle;
  }
  .flex_index,
  .flex_index2 {
    padding: 0 3px;
    flex-wrap: wrap;
    .flex_bd {
      flex: 0 0 33.33%;
      margin-bottom: 5px;
      min-width: 20px;
      padding: 0 3px;
      box-sizing: border-box;
    }
  }
  .flex_index2 {
    .flex_bd {
      flex: 0 0 50%;
    }
    .flex_bd1 {
      flex: 1;
    }
  }
</style>

