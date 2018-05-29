<template>
  <div class="songlist">
    <div class="flex" v-for="(item, index) of datas" :key="item.id" @click="playfn(item, index)">
      <div class="flex_hd">
        <div class="mg_r10 artistsImg">
          <img v-if="playdatasing.id==item.id" src="../../static/images/aal.png" alt="play" class="playImg">
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
        <div class="icn_more" @click.stop="detailsfn(item)">
          <img src="../../static/images/cm2_play_icn_more@2x.png" alt="more">
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup class="songPopup" v-model="show" height="45%">
        <div class="listDetail">
          <div class="flex">
            <div class="flex_hd"></div>
            <div class="flex_bd">歌曲：{{detail.name}}</div>
          </div>
          <div class="flex">
            <div class="flex_hd"></div>
            <div class="flex_bd">下一首播放</div>
          </div>
          <div class="flex">
            <div class="flex_hd"></div>
            <div class="flex_bd">收藏到歌单</div>
          </div>
          <div class="flex">
            <div class="flex_hd"></div>
            <div class="flex_bd">下载</div>
          </div>
          <div class="flex">
            <div class="flex_hd"></div>
            <div class="flex_bd">评论（{{comment.total}}）</div>
          </div>
          <div class="flex">
            <div class="flex_hd"></div>
            <div class="flex_bd">歌手：<span v-for="(ai, index) of detail.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span></div>
          </div>
          <div class="flex">
            <div class="flex_hd"></div>
            <div class="flex_bd">专辑：{{detail.album.name}}</div>
          </div>
          <div class="flex">
            <div class="flex_hd"></div>
            <div class="flex_bd">查看视频</div>
          </div>
          <div class="flex">
            <div class="flex_hd"></div>
            <div class="flex_bd">不感兴趣</div>
          </div>
        </div>
      </popup>
    </div>
  </div>

</template>

<script>
  import { Popup, TransferDom } from 'vux'
  import { mapState, mapMutations, mapGetters } from 'vuex';

  export default {
    name: 'list',
    data() {
      return {
        show: false,
        detail: {
          album: {}
        },
        comment: {}
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
      Popup
    },
    directives: {
      TransferDom
    },
    computed: {
      ...mapState([
        'audiodata'
      ]),
      ...mapGetters([
        'playdatasing'
      ])
    },
    created() {
    },
    methods: {
      ...mapMutations([
        'set_playing',
      ]),
      playfn(item, index) {
        this.set_playing({ playing: true, id: item.id })
      },
      detailsfn(item) {
        console.log(item);
        this.show = true;
        if(!!this.detail.id && this.detail.id==item.id) return false;
        this.detail=item;
        // this.$http.get('/song/detail',{
        //   params: {
        //     ids: item.id
        //   }
        // }).then(res=>{
        //   console.log(res.data);
        // })
        this.$http.get('/comment/music',{
          params: {
            id: item.id,
            limit: 1
          }
        }).then(res=>{
          console.log(res);
          if(res.data.code==200) this.comment=res.data
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .songlist {
    .artistsImg {
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

  .listDetail {
    background-color: #fff;
  }
</style>