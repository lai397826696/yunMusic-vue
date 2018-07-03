<template>
  <div class="songs">
    <div class="flex allbox">
      <div class="flex_hd">
        <i class="iconfont icon-bofang1"></i>
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
        <popup-header class="popup-header-bgred" left-text="返回" :title="`已选择${datas.length}项`" :right-text="rightText" :show-bottom-border="false" @on-click-left="show = false" @on-click-right="clickRight"></popup-header>
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
  import { Popup, TransferDom, PopupHeader, Checker, CheckerItem } from 'vux'
  import playlist from '../components/playlist.vue';
  import { mapMutations, mapState, mapGetters } from 'vuex';

  export default {
    name: 'list',
    data() {
      return {
        show: false,
        datas: [],
        dataRecord: [],
        // song_catalogues: [],
        index: 0,
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
      Popup,
      playlist,
      PopupHeader,
      Checker,
      CheckerItem
    },
    directives: {
      TransferDom
    },
    computed: {
      ...mapState([
        'song_catalogue',
      ]),
      rightText() {
        return this.datas.length != this.song_catalogue.length ? '全选' : '取消全选'
      },
      song_catalogues() {
        this.index++
        if (this.index == 2) {
          this.index=2
          return this.song_catalogue
        }
      }
    },
    methods: {
      ...mapMutations([
        'set_changePlaylist',
        'next_songCatalogue'
      ]),
      allPlay() {
        this.$router.push('/detail')
        this.set_changePlaylist({ key: 'songs' })
      },
      checkboxfn() {
        this.datas = []
        this.show = !this.show
      },
      clickRight() {
        if (this.datas.length != this.song_catalogue.length) {
          this.empty()
          this.song_catalogue.forEach(v => {
            this.add(v)
          })
        } else {
          this.empty()
        }
      },
      selectfn(item, index) {
        let i = this.datas.indexOf(item.id)
        if (i == -1) {
          this.add(item)
        } else {
          this.datas.splice(i, 1)
          this.dataRecord.splice(i, 1)
        }
      },
      add(item) {
        this.datas.push(item.id)
        this.dataRecord.push(item)
      },
      empty() {
        this.datas = []
        this.dataRecord = []
      },
      isCheck(id) {
        return this.datas.indexOf(id) >= 0
      },
      nextPlay() {
        this.next_songCatalogue({ data: this.dataRecord })
      },
    },
  }
</script>

<style lang="less" scoped>
  .iconfont {
    font-size: 20px;
  }
  .songs {
    background-color: #f5f5f5;
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
    vertical-align: middle;
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
    }
    span {
      display: block;
    }
  }
</style>
