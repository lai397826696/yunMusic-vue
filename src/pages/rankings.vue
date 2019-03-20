<template>
  <div>
    <x-header class="fixed-top" :left-options="{backText: ''}">排行榜</x-header>
    <div class="clear-header" :class="{'clear-audio': !!audioPlaying.id}">
      <h3 class="title">官方榜</h3>
      <div class="flex" v-for="item in songrankings" :key="item.id">
        <div class="mg_r10 flex_hd imgbox">
          <img :src="item.coverImgUrl+'?param=200y200'" alt="" class="imgurl">
          <span class="updata">{{item.ToplistType=="O" || item.ToplistType=="H"?'刚刚更新':'每天更新'}}</span>
        </div>
        <div class="flex_bd">
          <p v-if="ind<3" class="ellipsis text" v-for="(list, ind) in item.tracks" :key="list.id">
            {{ind+1}}.{{list.name}} - <span v-for="(v,i) in list.ar" :key="v.id">{{i==0?'':'/'}}{{v.name}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import axios, { toplist, artist } from '../util/severAPI.js';

  export default {
    name: "rankings",
    data() {
      return {
        soar: [],
        newsong: [],
        hotsong: [],
        original: [],
        singer: [],
        songrankings: []
      }
    },
    created() {
      this.toplist()
    },
    computed: {
      ...mapState([
        'audioPlaying'
      ]),
      // soars(){
      //   let data=this.soar.tracks
      //   data.length=3
      //   return data
      // },
      // newsongs(){
      //   let data=this.newsong.tracks
      //   data.length=3
      //   return data
      // },
      // hotsongs(){
      //   let data=this.hotsong.tracks
      //   data.length=3
      //   return data
      // },
      // originals(){
      //   let data=this.original.tracks
      //   data.length=3
      //   return data
      // },
      // singers(){
      //   let data=this.singer.artists
      //   data.length=3
      //   return data
      // },
    },
    methods: {
      toplist() {
        artist().then(res => {
          // res.data.list.artists;
          this.singer = res.data.list
        })
        axios.all([
          toplist({ idx: 3}),
          toplist({ idx: 0}),
          toplist({ idx: 1}),
          toplist({ idx: 2})
        ]).then(axios.spread((res1,res2,res3,res4)=>{
          this.soar = res1.data.playlist
          this.newsong = res2.data.playlist
          this.hotsong = res3.data.playlist
          this.original = res4.data.playlist
          this.songrankings=[this.soar,this.newsong,this.original,this.hotsong]
        }))
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("../assets/css/mixin.less");
  .title {
    margin: 15px 0 10px; 
    padding: 0 10px;
    font-weight: bold;
    color: #000;
  }
  .imgbox {
    position: relative;
    z-index: 0;
    width: 33%;
    max-width: 200px;
    border-radius: 4px;
    overflow: hidden;
    color: #fff;
    .imgurl {
      display: block;
      width: 100%;
    }
    .updata {
      position: absolute;
      left: 8px;
      right: 0;
      bottom: 5px;
      z-index: 1;
    }
  }
  .text {
    height: 30px;
    line-height: 30px;
  }
  
</style>




