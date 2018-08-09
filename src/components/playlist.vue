<template>
  <div class="songlist">
    <div class="flex" v-for="(item, index) of datas" :key="item.id" @click="playfn(item, index)">
      <div class="flex_hd">
        <div class="mg_r10 artistsImg">
          <i v-if="audioPlaying.id==item.id" class="iconfont icon-shengyin"></i>
          <img v-else :src="`${item.album.blurPicUrl}?param=250y250`" :alt="item.name">
        </div>
      </div>
      <div class="flex_bd">
        <p class="ellipsis name">{{item.name}}
          <em class="alias">{{item.alias.length>0?`(${item.alias[0]})`:''}}</em>
        </p>
        <p class="ellipsis desc">
          <span v-for="(ai, index) of item.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span>-{{item.album.name}}
        </p>
      </div>
      <div class="flex_ft">
        <i class="iconfont icon-more" @click.stop="detailsfn(item)"></i>
      </div>
    </div>
    <popupDetail ref="popupDetail" v-model="show"></popupDetail>
  </div>

</template>

<script>
  import { Popup, TransferDom } from 'vux'
  import { mapState, mapMutations, mapGetters } from 'vuex';
  import popupDetail from './popupDetail';

  export default {
    name: 'list',
    data() {
      return {
        show: false,
        id: '',
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
      Popup,
      popupDetail
    },
    directives: {
      TransferDom
    },
    computed: {
      ...mapState([
        'audioPlaying'
      ])
    },
    methods: {
      ...mapMutations([
        'set_playing',
      ]),
      playfn(item, index) {
        this.set_playing({data: item, index: index})
      },
      detailsfn(item) {
        this.show=true
        this.$refs.popupDetail.onShow(item)
      },
    }
  }
</script>

<style lang="less" scoped>
  .songlist {
    .artistsImg {
      width: 50px;
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      text-align: center;
      img {
        display: block;
        width: 100%;
      }
      .icon-shengyin {
          font-size: 26px;
          color: red;
        }
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
      // margin-top: 3px;
      font-size: 14px;
      color: #999;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .icon-more {
      padding: 5px 0 5px 5px;
      font-size: 16px;
      color: #999;
    }
  }

  .listDetail {
    background-color: #fff;
  }
</style>