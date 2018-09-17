<template>
  <div v-transfer-dom>
    <popup class="playbarPopup songPopup" @on-hide="onHide" @on-show="onShow" v-model="show" height="45%">
      <div class="listDetail" v-if="type=='sheet'">
        <div class="flex">
          <div class="flex_bd ellipsis">歌曲：{{audioPlaying.name}}</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-bofnag2"></i>
          </div>
          <div class="flex_bd">下一首播放</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-shoucang"></i>
          </div>
          <div class="flex_bd">收藏到歌单</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-download"></i>
          </div>
          <div class="flex_bd">下载</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-pinglun2"></i>
          </div>
          <div class="flex_bd">评论（{{comment.total}}）</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-geshou"></i>
          </div>
          <div class="flex_bd">歌手：
            <span v-for="(ai, index) of audioPlaying.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span>
          </div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-zhuanji"></i>
          </div>
          <div class="flex_bd">专辑：{{audioPlaying.album.name}}</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-play1"></i>
          </div>
          <div class="flex_bd">查看视频</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-tubiao06"></i>
          </div>
          <div class="flex_bd">不感兴趣</div>
        </div>
      </div>
      <div class="listDetail" v-if="type=='detail'">
        <div class="flex">
          <div class="flex_bd ellipsis">歌曲：{{audioPlaying.name}}</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-shoucang"></i>
          </div>
          <div class="flex_bd">收藏到歌单</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-geshou"></i>
          </div>
          <div class="flex_bd">歌手：
            <span v-for="(ai, index) of audioPlaying.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span>
          </div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-zhuanji"></i>
          </div>
          <div class="flex_bd">专辑：{{audioPlaying.album.name}}</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-links"></i>
          </div>
          <div class="flex_bd">来源：{{'开发中...'}}</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-yinzhi"></i>
          </div>
          <div class="flex_bd">音质：自动选择</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-musicbg"></i>
          </div>
          <div class="flex_bd">相似推荐</div>
        </div>
        <div class="flex">
          <div class="flex_hd">
            <i class="iconfont icon-shizhong"></i>
          </div>
          <div class="flex_bd">定时停止播放</div>
        </div>
        <!-- <div class="flex">
          <div class="flex_hd">
            <i class="iconfont"></i>
          </div>
          <div class="flex_bd">打开驾驶模式(开发中...)</div>
        </div> -->
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
        show: this.value
      }
    },
    props: {
      type: {
        type: String,
        default: 'sheet'
      },
      value: {
        type: Boolean,
        default: false
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
      // shows: {
      //   get(){
      //     return this.value
      //   },
      //   set(val){
      //     if(!val) this.$emit("input", val)
      //   }
      // }
    },
    methods: {
      onHide() {
        console.log("关闭");
        this.$emit("onhide")
      },
      onShow() {
        console.log("打开");
        this.$emit("onshow")
        this.detailsfn();
      },
      detailsfn() {
        // this.detail = item;
        this.$http.get('/comment/music', {
          params: {
            id: this.audioPlaying.id,
            limit: 1
          }
        }).then(res => {
          console.log(res.data);
          if (res.data.code == 200) this.comment = res.data
        })
      }
    },
    watch: {
      value(newval, oldval){
        this.show=newval
      },
      show(newval, oldval){
        this.$emit("input", newval)
      }
    }
  }
</script>

<style lang="less" scoped>
  .listDetail {
    background-color: #fff;
  }

  .flex_hd {
    .iconfont {
      margin-right: 8px;
      color: red;
    }
  }
</style>