<template>
  <group class="songlist">
    <cell-box v-for="item of datas" :key="item.id" @click.native="playfn(item)">
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
</template>

<script>
  import { CellBox, Group } from 'vux'
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
      datas: {
        type: Array,
        default: function () {
          return [{}]
        }
      }
    },
    components: {
      Group,
      CellBox
    },
    methods: {
      ...mapMutations([
        'barListfn'
      ]),
      playfn(item) {
        this.barListfn({data: item});
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
  .songlist {
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
  }
</style>