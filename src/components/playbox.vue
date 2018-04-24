<template>
  <div class="songs">
    <group class="allbox">
      <cell-box class="checkbox_all" @click.native="allPlay">
        <img src="../../static/images/pl-playall.png" alt="play" class="allplayIcon">
        <div class="flex_bd">
          <p class="name">播放全部</p>
        </div>
        <div class="checkbox" @click.stop="checkboxfn">多选</div>
      </cell-box>
    </group>
      <playlist :datas="songData"></playlist>
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
  import { Cell, CellBox, Group, Popup, TransferDom } from 'vux'
  import playlist from '../components/playlist.vue';
  import {mapMutations} from 'vuex';

  export default {
    name: 'list',
    data() {
      return {
        show: false,
        isplay: {
          id: '',
          bool: false
        }
      }
    },
    props: {
      songData: {
        type: Array,
        default: function () {
          return [{}]
        }
      }
    },
    components: {
      Group,
      Cell,
      Popup,
      CellBox,
      playlist
    },
    directives: {
      TransferDom
    },
    methods: {
      ...mapMutations([
        'changePlaylistfn'
      ]),
      allPlay() {
        this.changePlaylistfn()
        this.$router.push('/detail')
        console.log('allplay');
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
  
  .checkbox_all {
    padding-top: 15px;
    padding-bottom: 15px;
    .checkbox {
      font-size: 14px;
    }
    .allplayIcon {
      margin-right: 10px;
      vertical-align: middle;
      width: 24px;
      height: 24px;
    }
  }

  .flex_bd {
    flex: 1;
    padding-right: 10px;
    overflow: hidden;
  }
</style>
<style lang="less">
  .songs {
    .allbox {
      margin-bottom: -1px;
    }
    .weui-cells {
      margin-top: 0;
      background-color: #fbfbfb;
    }
    .vux-cell-primary {
      padding-right: 15px;
      overflow: hidden;
      .vux-label {
        line-height: 26px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .vux-label-desc {
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