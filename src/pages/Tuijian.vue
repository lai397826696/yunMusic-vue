<template>
  <div>
    <x-header :left-options="{backText: '每日推荐'}" :right-options="{showMore: true}">每日歌曲推荐</x-header>
    <group>
      <cell class="Tcell" v-for="item of songs" :key="item.id">
        <div class="artistsImg" slot="icon">
          <img :src="`${item.album.blurPicUrl}?param=250y250`" :alt="item.name">
        </div>
        <span>右侧</span>
        <div class="title" slot="title">
          <p class="name">{{item.name}}</p>
          <p class="desc">{{item.artists[0].name+'-'+item.album.name}}</p>
        </div>
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
      }
    },
    created() {
      let _this = this
      this.$http.get('/recommend/songs', { withCredentials: true }).then(res => {
        console.log(res.data);
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
  .weui-cell {
    padding-left: 10px;
    padding-right: 10px;
  }
  .Tcell {
    .name {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .desc {
      font-size: 14px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }
  }
  .artistsImg {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
    }
  }
</style>
<style lang="less">
  .vux-cell-primary {
    padding-right: 15px;
    overflow: hidden;
  }
</style>




