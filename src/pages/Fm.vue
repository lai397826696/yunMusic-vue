<template>
  <div class="fm">
    <x-header class="fixed-top" :left-options="{backText: ''}">{{''}}</x-header>
    <div class="bg-blur" :style="{backgroundImage: `url(${fm_playing.album.blurPicUrl}?param=750y750)`}"></div>
    <div class="clear-header">
      <div class="turntable">
        <img :src="`${fm_playing.album.blurPicUrl}?param=750y750`" alt="" class="musicImg">
        <p class="ellipsis musicName">{{fm_playing.name}}</p>
        <p class="artists">
          <span v-for="(ai, index) of fm_playing.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span>
          <i class="iconfont icon-mjiantou-copy"></i>
        </p>
      </div>
      <div class="foot">
        <Drag></Drag>
        <flexbox :gutter="0" class="original">
          <flexbox-item>
            <i class="iconfont icon-icon-shanchu" @click="removelist"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-jushoucang" :class="{'icon-jushoucanggift text-color-red': collection}" @click="collectionfn"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-bofang1" @click="plays"></i>
          </flexbox-item>
          <flexbox-item>
            <i class="iconfont icon-next" @click="playNext"></i>
          </flexbox-item>
          <flexbox-item>
            <div class="totalBox">
              <i class="iconfont icon-pinglun" @click="pinglun"></i>
              <span class="total">{{totals}}</span>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader, Flexbox, FlexboxItem } from 'vux'
  import { mapState, mapMutations } from 'vuex';
  import Drag from '../components/Drag';

  import { personal_fm, fm_trash } from '../util/severAPI';

  export default {
    name: "fm",
    data() {
      return {
        fmdata: [],
        // fm_playing: { album: {}, },
        fm_index: 0,
        collection: false,
        totals: 1000
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      XHeader,
      Drag,
    },
    created() {
      personal_fm().then(res => {
        this.fmdata = res.data.data;
        // this.fm_playing = this.fmdata[this.fm_index]
        console.log(res.data);
      })
    },
    computed: {
      fm_playing() {
        if (this.fmdata.length > 0) {
          return this.fmdata[this.fm_index]
        }
        return { album: {} }
      }
    },
    methods: {
      personal_fms(obj) {
        personal_fm(obj).then(res => {
          this.fmdata = this.fmdata.concat(res.data.data);
        })
      },
      removelist(){
        fm_trash({id: this.fm_playing.id}).then(res=>{

        })
      },
      plays() {
        
      },
      playNext() {
        console.log(this.fm_index);
        if (this.fm_index == 1) this.personal_fms({ timestamp: new Date().getTime() })
        if (this.fm_index >= 2) {
          this.fmdata.splice(0, 3)
          this.fm_index = 0
        } else {
          this.fm_index++
        }
      },
      collectionfn() { },
      pinglun() {

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/css/mixin.less";
  .fm {
    width: 100%;
    height: 100%;
  }
  .bg-blur {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    filter: blur(70px);
    background-size: cover;
    background-position: center top;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  .turntable {
    margin: 0 auto;
    width: 90%;
    overflow: hidden;
    text-align: center;

    .musicImg {
      display: block;
      width: 100%;
      border-radius: 5px;
    }
    .musicName {
      margin: 30px 0 10px;
      color: #fff;
      font-size: 20px;
    }
    .artists {
      color: @FRONT_GRAY;
    }
    .icon-mjiantou-copy {
      margin-left: -3px;
    }
  }

  .foot {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 15px;
    z-index: 10;
    color: #fff;

    .original {
      // line-height: 50px;
      text-align: center;
      cursor: pointer;
      .iconfont {
        font-size: 24px;
      }
      .icon-bofang1 {
        font-size: 52px;
      }
    }

    .totalBox {
      position: relative;
      margin-left: -5px;
      display: inline-block;
      .total {
        position: absolute;
        top: -8px;
        left: 20px;
        z-index: 0;
        line-height: normal;
        font-size: 12px;
      }
    }
  }
</style>

<style lang="less">
  .fm .vux-header {
    background-color: transparent !important;
  }
</style>




