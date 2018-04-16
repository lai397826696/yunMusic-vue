<template>
  <div class="songs">
    <group>
      <cell title="播放全部" @click.native="allPlay">
        <div slot="icon">
          <img src="../../static/images/pl-playall.png" alt="play" class="allplayIcon">
        </div>
        <div class="checkbox" @click.stop="checkboxfn">多选</div>
      </cell>

    </group>
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
  import { Cell, Group, Popup, TransferDom } from 'vux'
  import playlist from './playlist.vue';

  export default {
    name: 'playbox',
    data() {
      return {
        show: false,
      }
    },
    components: {
      Group,
      Cell,
      Popup,
    },
    directives: {
      TransferDom
    },
    methods: {
      allPlay() {

      },
      checkboxfn() {
        console.log(222);
      },
      
      play(item) {
        console.log(item);
        this.isplay.bool = true;
        this.isplay.id = item.id;
      },
      detailsfn() {
        this.show = true;
      }
    }
  }
</script>

<style lang="less" scoped>
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
  .songPopup {
    .weui-cells {
      margin-top: 5px;
    }
  }
</style>