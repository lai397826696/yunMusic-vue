<template>
  <div v-transfer-dom>
    <popup class="songPopup" @on-hide="onHide" v-model="show" height="45%">
      <div class="listDetail" v-if="type=='sheet'">
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
          <div class="flex_bd">歌手：
            <span v-for="(ai, index) of detail.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span>
          </div>
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
      <div class="listDetail" v-if="type=='detail'">
        <div class="flex">
          <div class="flex_hd"></div>
          <div class="flex_bd">歌曲：{{detail.name}}</div>
        </div>
        <div class="flex">
          <div class="flex_hd"></div>
          <div class="flex_bd">收藏到歌单</div>
        </div>
        <div class="flex">
          <div class="flex_hd"></div>
          <div class="flex_bd">歌手：
            <span v-for="(ai, index) of detail.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span>
          </div>
        </div>
        <div class="flex">
          <div class="flex_hd"></div>
          <div class="flex_bd">专辑：{{detail.album.name}}</div>
        </div>
        <div class="flex">
          <div class="flex_hd"></div>
          <div class="flex_bd">来源：{{detail.album.name}}</div>
        </div>
        <div class="flex">
          <div class="flex_hd"></div>
          <div class="flex_bd">音质：自动选择</div>
        </div>
        <div class="flex">
          <div class="flex_hd"></div>
          <div class="flex_bd">查看视频</div>
        </div>
        
        
        <div class="flex">
          <div class="flex_hd"></div>
          <div class="flex_bd">相似推荐</div>
        </div>
        <div class="flex">
          <div class="flex_hd"></div>
          <div class="flex_bd">定时停止播放</div>
        </div>
        <div class="flex">
          <div class="flex_hd"></div>
          <div class="flex_bd">打开驾驶模式(开发中...)</div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import { Popup, TransferDom } from 'vux'
  import { mapState, mapMutations, mapGetters } from 'vuex';

  export default {
    name: 'list',
    data() {
      return {
        detail: {
          album: {}
        },
        comment: {},
      }
    },
    model: {
      prop: 'show',
      event: 'change'
    },
    props: {
      id: Number,
      show: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'sheet'
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
        'audioPlaying'
      ]),
    },
    methods: {
      ...mapMutations([
        'set_playing',
      ]),
      onHide(){
        this.$emit('change', !this.show)
        console.log(this.show);
      },
      detailsfn(item) {
        if (!!this.detail.id && this.detail.id == item.id) return false;
        // this.detail = item;
        // this.$http.get('/comment/music', {
        //   params: {
        //     id: item.id,
        //     limit: 1
        //   }
        // }).then(res => {
        //   console.log(res);
        //   if (res.data.code == 200) this.comment = res.data
        // })
      }
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