<template>
  <div>
    <div class="flex vux-1px-b allbox">
      <div class="flex_hd">
        <i class="iconfont icon-play1 mg_r5"></i>
      </div>
      <div class="flex_bd">
        <p class="name" @click="allPlay">播放全部</p>
      </div>
      <div class="flex_ft checkbox" @click="checkboxfn">
        <i class="iconfont icon-more1"></i>多选
      </div>
    </div>
    <playlist :datas="songData"></playlist>
    <div v-transfer-dom>
      <popup class="songPopup" v-model="show" height="100%">
        <popup-header class="popup-header-bgred" left-text="返回" :title="`已选择${selectData.length}项`" :right-text="rightText" :show-bottom-border="false" @on-click-left="clickLeft" @on-click-right="clickRight"></popup-header>
        <div class="listDetail">
          <div class="flex vux-1px-b" v-for="(item,index) in song_catalogues" :key="item.id" @click="selectfn(item, index)">
            <div class="flex_hd mg_r10">
              <i class="iconfont icon-checkbox-unchecked" :class="{'icon-checkbox-checked': isCheck(item.id), 'text-color-red': isCheck(item.id)}"></i>
            </div>
            <div class="flex_bd">
              <p class="ellipsis name">{{item.name}}
                <em class="alias">{{item.alias.length>0?`(${item.alias[0]})`:''}}</em>
              </p>
              <p class="ellipsis desc">
                <span v-for="(ai, i) of item.artists" :key="ai.id+i">{{i==0?ai.name:'/'+ ai.name}}</span>-{{item.album.name}}
              </p>
            </div>
          </div>
          <div class="poput-footer">
            <div class="flex">
              <div class="flex_bd" @click="nextPlay">
                <i class="iconfont icon-bofnag2"></i>
                <span>下一首播放</span>
              </div>
              <div class="flex_bd">
                <i class="iconfont icon-liebiaoshouqi"></i>
                <span>加入歌单</span>
              </div>
              <div class="flex_bd">
                <i class="iconfont icon-download"></i>
                <span>下载</span>
              </div>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import { Checker, CheckerItem } from 'vux'
  import playlist from '../components/playlist.vue';
  import { mapMutations, mapState, mapGetters } from 'vuex';

  export default {
    name: 'list',
    data() {
      return {
        show: false,
        song_catalogues: [], //初始化多选页面数据
        index: 0,
        selectData: [], //多选时选中的歌曲id
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
      playlist,
      Checker,
      CheckerItem
    },
    beforeUpdate() {
      if (this.song_catalogues.length == 0) this.song_catalogues = [...this.songData]
    },
    computed: {
      ...mapState([
        'song_catalogue',
        'playIndex'
      ]),
      rightText() {
        return this.selectData.length != this.song_catalogues.length ? '全选' : '取消全选'
      },
    },
    methods: {
      ...mapMutations([
        'set_changePlaylist',
        'next_songCatalogue',
      ]),
      allPlay() {
        this.$router.push('/detail')
        this.set_changePlaylist({ key: 'songs' })
      },
      checkboxfn() {
        this.selectData=[]
        this.show = !this.show
      },
      clickLeft() {
        this.selectData=[]
        this.show = !this.show
      },
      clickRight() {
        if (this.selectData.length != this.song_catalogues.length) {
          this.song_catalogues.forEach((v, index) => {
            if(!this.selectData.some(key=>key.id==v.id)) this.selectData.push(v)
          })
        } else {
          this.selectData=[]
        }
      },
      selectfn(item, index) {
        // let i = this.selectData.indexOf(item.id)
        let i = this.selectData.findIndex(v=>v.id==item.id)
        if (i == -1) {
          this.selectData.push(item)
        } else {
          this.selectData.splice(i, 1)
        }
      },
      isCheck(id) {
        return this.selectData.findIndex(v=>v.id==id) >= 0
      },
      nextPlay() {
        if (this.selectData.length > 0) {
          this.$vux.toast.text('已添加到下一首播放')
        } else {
          this.$vux.toast.text('请选择要播放的歌曲')
        }
        this.next_songCatalogue({ data: this.selectData })
      },
    },
  }
</script>

<style lang="less" scoped>
  .iconfont {
    font-size: 20px;
  }
  .songs {
    .icon-bofang1 {
      font-size: 24px;
      margin-right: 5px;
    }
    .checkbox {
      font-size: 14px;
    }
  }
  .icon-more1 {
    margin-right: 5px;
    font-size: 18px;
  }
  .listDetail {
    margin-bottom: 55px;
    background-color: #f5f5f5;
  }
  .poput-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: #fff;
    text-align: center;
    .flex {
      padding: 0;
      padding-top: 4px;
    }
    span {
      display: block;
    }
  }
</style>
