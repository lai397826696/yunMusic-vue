<template>
  <div class="songs">
    <div class="flex allbox">
      <div class="flex_hd">
        <img src="../../static/images/pl-playall.png" alt="play" class="allplayIcon">
      </div>
      <div class="flex_bd">
        <p class="name" @click="allPlay">播放全部</p>
      </div>
      <div class="flex_ft checkbox" @click="checkboxfn">多选</div>
    </div>
    <playlist :datas="songData"></playlist>
    <div v-transfer-dom>
      <popup class="songPopup" v-model="show" height="100%">
        <popup-header left-text="返回" right-text="全选" title="" :show-bottom-border="false" @on-click-left="show = false" @on-click-right="show = false"></popup-header>
        <div class="listDetail">
          <div class="flex vux-1px-b" v-for="item in song_catalogue" :key="item.id">
            <div class="flex_hd">
              <div class="mg_r10">
                
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
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import { Popup, TransferDom, PopupHeader, Checker, CheckerItem } from 'vux'
  import playlist from '../components/playlist.vue';
  import { mapMutations, mapState } from 'vuex';

  export default {
    name: 'list',
    data() {
      return {
        show: false
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
    created() {
      console.log(this.playdatasing);
      // console.log(this.song_catalogue);
    },
    computed: {
      ...mapState([
        'song_catalogue',
        'playdatasing'
      ])
    },
    methods: {
      ...mapMutations([
        'set_changePlaylist'
      ]),
      allPlay() {
        this.$router.push('/detail')
        this.set_changePlaylist({ key: 'songs' })
      },
      checkboxfn() {
        this.show = !this.show
        console.log(222);
      },
    }
  }
</script>

<style lang="less" scoped>
  .songs {
    background-color: #fafafa;
    .allplayIcon {
      margin-right: 10px;
      vertical-align: middle;
      width: 24px;
      height: 24px;
    }
    .checkbox {
      font-size: 14px;
    }
  }
</style>