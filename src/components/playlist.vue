<template>
  <div class="songs">
    <group>
      <cell-box class="checkbox_all" @click.native="allPlay">
        <img src="../../static/images/pl-playall.png" alt="play" class="allplayIcon">
        <div class="flex_bd">
          <p class="name">播放全部</p>
        </div>
        <div class="checkbox" @click.stop="checkboxfn">多选</div>
      </cell-box>
      <cell-box v-for="item of songData" :key="item.id" @click.native="play(item)">
        <div class="artistsImg">
          <img v-if="isplay.bool && isplay.id==item.id" src="../../static/images/aal.png" alt="play" class="playImg">
          <img v-else :src="`${item.album.blurPicUrl}?param=250y250`" :alt="item.name">
        </div>
        <div class="flex_bd">
          <p class="name">{{item.name}}
            <i class="alias">{{item.alias.length>0?`(${item.alias[0]})`:''}}</i>
          </p>
          <p class="desc">
            <span v-for="(ai, index) of item.artists" :key="ai.id">{{index==0?ai.name:'/'+ ai.name}}</span>-{{item.album.name}}
          </p>
        </div>
        <div class="icn_more" @click.stop="detailsfn">
          <img src="../../static/images/cm2_play_icn_more@2x.png" alt="more">
        </div>
      </cell-box>
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
  import { Cell, CellBox, Group, Popup, TransferDom } from 'vux'

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
      CellBox
    },
    directives: {
      TransferDom
    },
    methods: {
      allPlay() {
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
  .weui-cell {
    padding-left: 10px;
    padding-right: 10px;
  }
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
      margin: 15px auto;
      width: 24px;
      height: 24px;
    }
  }

  .flex_bd {
    flex: 1;
    padding-right: 10px;
    overflow: hidden;
  }
  .name {
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    .alias {
      font-size: 12px;
      font-style: normal;
      color: #aaa;
    }
  }
  .desc {
    margin-top: 4px;
    font-size: 14px;
    color: #999;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
  .songs {
    .weui-cells {
      margin-top: 0;
      background-color: #fbfbfb;
    }
    .vux-cell-primary {
      padding-right: 15px;
      overflow: hidden;
      .vux-label {
        // height: 26px;
        line-height: 26px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .vux-label-desc {
        display: block;
        // height: 22px;
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