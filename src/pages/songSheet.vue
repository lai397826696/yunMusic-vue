<template>
  <div>
    <x-header class="fixed-top" :left-options="{backText: ''}">歌单</x-header>
    <div class="clear-header" :class="{'clear-audio': !!audioPlaying.id}">
      <div class="quality">
        <div class="bg-blur" :style="{backgroundImage: `url(${quality_one.coverImgUrl})`}">
          <div class="flex">
            <div class="flex_hd mg_r10">
              <img :src="quality_one.coverImgUrl" alt="歌单封面" class="coverImgUrl">
            </div>
            <div class="flex_bd">
              <p class="text">
                <span class="iconbox">
                  <i class="iconfont icon-jingpin"></i>
                </span>
                <span>精品歌单</span>
                <i class="iconfont icon-mjiantou"></i>
              </p>
              <p class="ellipsis name">{{quality_one.name}}</p>
              <p class="copywriter">{{quality_one.copywriter}}</p>
            </div>
          </div>
        </div>

      </div>
      <div class="flex type">
        <div class="flex_bd">
          <label class="key" @click="keynamePopup">{{keyname}}
            <i class="iconfont icon-jiantouyou"></i>
          </label>
        </div>
        <div class="flex_ft">
          <span @click="selectfn('欧美')">欧美</span>
          <span @click="selectfn('电子')">电子</span>
          <span @click="selectfn('摇滚')">摇滚</span>
        </div>
      </div>
      <article class="dataCon">
        <router-link to="/" v-for="item in quality" :key="item.id" tag="figure">
          <div class="imgbox">
            <img :src="item.coverImgUrl" alt=" ">
            <p class="ellipsis creator">
              <i class="mg_r5 iconfont icon-yonghu"></i>{{item.creator.nickname}}</p>
            <span class="playcount">
              <i class="mg_r5 iconfont icon-erji"></i>{{item.playCount}}</span>
          </div>
          <figcaption>{{item.name}}</figcaption>
        </router-link>
      </article>
    </div>
    <div v-transfer-dom>
      <popup class="songPopup" v-model="show" height="100%">
        <popup-header class="popup-header-bgred" left-text="返回" title="选择分类" :right-text="rightText" :show-bottom-border="false" @on-click-left="clickLeft" @on-click-right="clickRight"></popup-header>
        <div class="whole" @click="selectfn('全部歌单')">
          <p class="text" :class="{'active': keyname=='全部歌单'}">全部歌单</p>
        </div>
        <div class="content">
          <ul class="typelist" v-for="(item,index) in datafor" :key="index">
            <li class="list firstlist">
              <i class="icon" :class="[`icon_${isclass(item.type)}`]"></i>
              <span class="text">{{item.type}}</span>
            </li>
            <li @click="selectfn(v.name)" class="list" v-for="(v, i) in item.data" :key="i" :class="{'hot': v.hot, 'select': v.name==keyname}">{{v.name}}</li>
          </ul>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
  import { XHeader, Popup, PopupHeader, TransferDom } from 'vux';
  import { mapState, mapActions } from 'vuex';
  import { highquality, playlist, catlist } from '../util/severAPI.js';

  export default {
    name: "songsheet",
    data() {
      return {
        quality: [],
        hotquality: [],
        show: false,
        rightText: '',
        typeData: [],
        type: {},
        keyname: '全部歌单',
      }
    },
    components: {
      XHeader,
      Popup,
      PopupHeader,
    },
    directives: {
      TransferDom
    },
    created() {
      this.highquality()
      this.playlist()
      this.catlist()
    },
    computed: {
      ...mapState([
        'audioPlaying'
      ]),
      quality_one() {
        if (this.hotquality.length > 0) return this.hotquality[0]
        return {}
      },
      datafor() {
        if (this.typeData.length > 0) {
          let obj = [];
          Object.keys(this.type).forEach(key => {
            obj.push({ type: this.type[key], data: [] })
          })
          this.typeData.forEach((data, i, arr) => {
            this.$set(arr[i], 'isselect', false)
            let index = obj.findIndex(v => v.type == this.type[data.category])
            obj[index].data.push(data)
          })
          obj.forEach(v => {
            let len = v.data.length
            if (len <= 6) {
              for (let i = 0; i < (6 - len); i++) {
                v.data.push({})
              }
            } else {
              let lg = (len - 6) % 4
              if (lg == 1) {
                v.data.push({})
                v.data.push({})
                v.data.push({})
              } else if (lg == 2) {
                v.data.push({})
                v.data.push({})
              } else if (lg == 3) {
                v.data.push({})
              }
            }
          })
          return obj;
        }
        return [{ data: [{ name: '' }] }]
      },
    },
    methods: {
      highquality() {
        highquality().then(res => {
          this.hotquality = res.data.playlists
        })
      },
      playlist(obj = {}) {

        playlist(obj).then(res => {
          this.quality = res.data.playlists
        })
      },
      catlist() {
        catlist().then(res => {
          this.type = res.data.categories
          this.typeData = res.data.sub
        })
      },
      keynamePopup() {
        this.show = true
      },
      clickLeft() {
        this.show = false
      },
      clickRight() {

      },
      selectfn(name) {
        this.keyname = name
        this.show = false
        this.playlist({ cat: name })
      },
      isclass(key) {
        let obj = {
          "语种": 'yuzhong',
          "风格": 'fengge',
          "场景": 'changjing',
          "情感": 'qinggan',
          "主题": 'zhuti',
        }
        return obj[key]
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("../assets/css/mixin.less");
  .quality {
    position: relative;
    color: #fff;
    .bg-blur {
      position: relative;
      background-size: cover;
      overflow: hidden;
      &::before {
        content: "";
        position: absolute;
        left: -20px;
        right: -20px;
        top: -20px;
        bottom: -20px;
        z-index: 1;
        background: inherit;
        background-size: cover;
        filter: blur(15px);
      }
    }
    .flex {
      position: relative;
      z-index: 10;
    }
    .coverImgUrl {
      display: block;
      width: 120px;
    }
    .text {
      height: 34px;
      line-height: 34px;
      font-size: 18px;
    }
    .iconbox {
      float: left;
      margin: 4px 8px 0 0;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 50%;
      border: 1px solid @ORANGE;
      background-color: rgba(255, 153, 19, 0.2);
      .icon-jingpin {
        font-size: 18px;
        color: @ORANGE;
      }
    }
    .icon-mjiantou {
      font-size: 20px;
    }
    .name {
      margin-bottom: 5px;
      font-size: 16px;
    }
    .copywriter {
      font-size: 14px;
      color: @FRONT_GRAY;
      line-height: 1.35;
    }
  }
  .dataCon {
    margin: 0;
    padding: 0;
    padding: 0 1.5%;
    box-sizing: border-box;
    figure {
      float: left;
      width: 49.25%;

      &:nth-child(2n + 1) {
        margin-right: 1.5%;
      }
      .imgbox {
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        color: #fff;

        // &::after,
        // &::before {
        //   content: "";
        //   position: absolute;
        //   left: 0;
        //   right: 0;
        //   z-index: 0;
        // }
        // &::before {
        //   top: 0;
        //   bottom: 60%;
        //   background: linear-gradient(to bottom,rgba(10, 10, 10, 0.6),rgba(0, 0, 0, 0));
        // }
        // &::after {
        //   top: 60%;
        //   bottom: 0;
        //   background: linear-gradient(to top,rgba(10, 10, 10, 0.6),rgba(0, 0, 0, 0));
        // }
        .shadow(all);
      }
      img {
        display: block;
        width: 100%;
      }
      .creator {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        padding: 4px 5px;
      }
      .playcount {
        position: absolute;
        top: 2px;
        right: 5px;
        z-index: 1;
      }
      figcaption {
        padding: 0 4px;
        margin-bottom: 10px;
      }
    }
  }
  .type {
    margin: 15px 0;
    .key {
      float: left;
      padding: 4px 10px 4px 15px;
      line-height: 22px;
      border: 1px solid #ccc;
      border-radius: 20px;
    }
    .flex_ft {
      font-size: 0;
    }
    span {
      border-left: 1px solid #ccc;
      padding: 0 10px;
      font-size: 14px;
      &:first-child {
        border-left: none;
      }
    }
  }
  .whole {
    padding: 5px;
    background-color: #fff;

    .text {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
    }

    .active {
      border: 1px solid @RED;
      background: url("/static/images/cm2_discover_slted@2x.png") no-repeat right bottom;
      background-size: 25px;
    }
  }
  .typelist {
    margin: 10px 0;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    .list {
      float: left;
      width: 25%;
      height: 42px;
      line-height: 42px;
      border-top: 1px solid #eaeaea;
      border-left: 1px solid #eaeaea;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        border-top: none;
      }
    }
    .firstlist {
      height: 84px;
      line-height: normal;
      color: @FRONT_BLACK2;

      .icon {
        display: block;
        margin: 14px auto 0;
        width: 30px;
        height: 30px;
        background-position: left top;
      }
      .icon_yuzhong {
        background: url("/static/images/cm2_discover_icn_0@2x.png") no-repeat;
        background-size: 30px;
      }
      .icon_fengge {
        background: url("/static/images/cm2_discover_icn_1@2x.png") no-repeat;
        background-size: 30px;
      }
      .icon_changjing {
        background: url("/static/images/cm2_discover_icn_2@2x.png") no-repeat;
        background-size: 30px;
      }
      .icon_qinggan {
        background: url("/static/images/cm2_discover_icn_3@2x.png") no-repeat;
        background-size: 30px;
      }
      .icon_zhuti {
        background: url("/static/images/cm2_discover_icn_4@2x.png") no-repeat;
        background-size: 30px;
      }
      .text {
        display: block;
        height: 26px;
        line-height: 26px;
        font-size: 16px;
      }
    }
    .hot {
      background: url("/static/images/cm2_lists_icn_hot_new@2x.png") no-repeat
        left top;
      background-size: 30px;
    }
    .select {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 0;
        border: 1px solid @RED;
        background: url("/static/images/cm2_discover_slted@2x.png") no-repeat
          right bottom;
        background-size: 20px;
      }
    }
  }
</style>




