<template>
  <div>
    <x-header :left-options="{backText: ''}" :right-options="{showMore: true}">
      <div solt="overwrite-title">每日歌曲推荐</div>
    </x-header>
    <div class="turntable">
      <img src="../../static/images/play.png" alt="" class="playbg">
      <img src="../../static/images/AppIcon57x57@2x.png" alt="" class="playimg">
      <img src="../../static/images/aag.png" alt="" class="aag">
    </div>
    <div class="foot">
      <flexbox :gutter="0" class="tools">
        <flexbox-item>喜欢</flexbox-item>
        <flexbox-item>下载</flexbox-item>
        <flexbox-item>评论</flexbox-item>
        <flexbox-item>更多</flexbox-item>
      </flexbox>
      <div class="range"><range v-model="data1" @on-change="onChange"></range></div>
      <flexbox :gutter="0" class="original">
        <flexbox-item>随机</flexbox-item>
        <flexbox-item>上一首</flexbox-item>
        <flexbox-item>播放/暂停</flexbox-item>
        <flexbox-item>下一首</flexbox-item>
        <flexbox-item>列表</flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import { XHeader, Flexbox, FlexboxItem, Range } from 'vux'

  export default {
    name: "fm",
    data() {
      return {
        phone: '',
        password: '',
        data1: 10,
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      XHeader,
      Range
    },
    created() {

    },
    beforeRouteEnter: (to, from, next) => {
      console.log(to);
      console.log(from);
      next();
    },
    methods: {
      onChange(value){
        console.log(value);
      }
    }
  }
</script>

<style lang="less" scoped>
  .turntable {
    position: relative;
    padding-top: 22%;
    overflow: hidden;
    .playbg {
      margin: 0 auto ;
      display: block;
      width: 80%;
      max-width: 100%;
    }
    .playimg {
      position: absolute;
      top: 46%;
      left: 50%;
      z-index: 1;
      margin-left: -15%;
    }

    .aag {
      position: absolute;
      top: -9%;
      right: 15%;
      z-index: 10;
      width: 28%;
      transform: rotateZ(-20deg)
    }
  }
  .foot {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    .tools {
      margin: 0 auto;
      width: 90%;
      text-align: center;
      line-height: 30px;
    }

    .range {
      margin: 30px auto;
      width: 90%;
    }

    .original {
      line-height: 50px;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
<style lang="less">
  .range .range-handle {
    // width: 20px;
    // height: 20px;
    // top: 10px;
  }
</style>


