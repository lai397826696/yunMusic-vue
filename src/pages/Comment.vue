<template>
  <div>
    <x-header class="fixed-top" :left-options="{backText: ''}">评论({{total}})</x-header>
    <div class="clear-header" @scroll="commentScroll">
      <router-link :to="{path: '/detail'}" class="flex musicPeople" tag="div">
        <div class="flex_hd">
          <img :src="audioPlaying.album.blurPicUrl" alt="" class="headportrait">
        </div>
        <div class="flex_bd">
          <p class="musicName">{{audioPlaying.name}}</p>
          <p class="musicUser">
            <span v-for="(ai, index) of audioPlaying.artists" :key="ai.id+index">{{index==0?ai.name:'/'+ ai.name}}</span>
          </p>
        </div>
        <div class="flex_ft">
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </router-link>
      <section class="music-list comments">
        <h3 class="title">精彩评论</h3>
        <article class="flex items-start mg_tb10" v-for="list in hotComments" :key="list.commentId">
          <div class="flex_hd">
            <router-link :to="{path: `/userinfo/${list.user.userId}`}">
              <img :src="list.user.avatarUrl" alt="" class="commentImg">
            </router-link>
          </div>
          <div class="flex_bd vux-1px-b pd_b5 commBox">
            <header class="flex items-start">
              <div class="flex_bd">
                <h4 class="name">{{list.user.nickname}}</h4>
                <div class="time">{{list.time | timeFormat}}</div>
              </div>
              <div class="flex_ft num" @click="commentLike(list)">
                <span :class="{'text-color-red': list.liked}">{{list.likedCount}}</span>
                <i class="iconfont icon-zan" :class="{'icon-dzan text-color-red': list.liked}"></i>
              </div>
            </header>
            <p class="mg_tb10 content">{{list.content}}</p>
            <p class="mg_tb10 reply" v-if="list.beReplied.length!=0">
              <router-link :to="{path: `/userinfo/${list.user.userId}`}">{{list.beReplied[0].user.nickname}}</router-link>:{{list.beReplied[0].content}}
            </p>
          </div>
        </article>
      </section>
      <section class="music-list comments">
        <h3 class="title">最新评论({{total}})</h3>
        <article class="flex items-start mg_tb10" v-for="list in comments" :key="list.commentId">
          <div class="flex_hd">
            <img :src="list.user.avatarUrl" alt="" class="commentImg">
          </div>
          <div class="flex_bd vux-1px-b pd_b5 commBox">
            <header class="flex items-start">
              <div class="flex_bd">
                <h4 class="name">{{list.user.nickname}}</h4>
                <div class="time">{{list.time | timeFormat}}</div>
              </div>
              <div class="flex_ft num">
                <span :class="{'text-color-red': list.liked}">{{list.likedCount}}</span>
                <i class="iconfont icon-zan" :class="{'icon-dzan text-color-red': list.liked}"></i>
              </div>
            </header>
            <p class="mg_tb10 content">{{list.content}}</p>
            <p class="mg_tb10 reply" v-if="list.beReplied.length!=0">
              <router-link :to="{path: `/userinfo/${list.user.userId}`}">{{list.beReplied[0].user.nickname}}</router-link>:{{list.beReplied[0].content}}
            </p>
          </div>
        </article>
        <div class="loading" v-show="loading">加载中...</div>
      </section>
    </div>
    <!-- <div class="commentK">
      <div class="flex">
        <div class="flex_bd">
          <input type="text" name="" placeholder="这一次也许就是你上热评了">
        </div>
        <div class="flex_ft pd_l10">发送</div>
      </div>
    </div> -->
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { musicComment, commentLiked } from '../util/severAPI';
  export default {
    name: "comment",
    data() {
      return {
        isreply: true,
        id: '',
        comments: [],
        hotComments: [],
        total: 0,
        params: {
          id: '',
          offset: 0,
          // timestamp: new Date().getTime()
        },
        loading: true
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.musicComment(to.params.id)
      })
    },
    created() {
    },
    computed: {
      ...mapState([
        'audioPlaying'
      ]),
    },
    methods: {
      musicComment(id) {
        if (!!id) this.params.id = id
        musicComment(this.params).then(res => {
          this.comments = this.comments.concat(res.data.comments)
          this.hotComments = res.data.hotComments
          this.total = res.data.total
          this.loading = false
        })
      },
      commentScroll(event) {
        let target = event.target
        if ((target.clientHeight + target.scrollTop) == target.scrollHeight) {
          this.loading = true
          this.params.offset = this.params.offset + 20
          this.musicComment()
        }
      },
      commentLike(list) {
        let obj={ id: this.params.id, cid: list.commentId, t: 1, type: 0 }
        if(!!list.liked) obj.t=0
        console.log(obj);
        commentLiked(obj).then(res => {
          console.log(res);
          list.liked=!list.liked;
        })
      }
    },
    filters: {
      timeFormat(val) {
        let lasttime = val;
        let newtime = (new Date().getTime() - lasttime) / 1000; //秒
        if (newtime < 60) {
          return Math.floor(newtime) + "秒前";
        } else if (newtime / 60 < 60) {
          return Math.floor(newtime / 60) + "分钟前";
        } else if (newtime / 3600 < 48) {
          let newMonth = new Date().getMonth()
          let newYear = new Date().getFullYear()
          let newDay = new Date().getDay()

          let Hours = String(new Date(val).getHours())
          let Minutes = String(new Date(val).getMinutes())
          if (Hours.length == 1) Hours = '0' + Hours
          if (Minutes.length == 1) Minutes = '0' + Minutes

          let day = '';
          if (newYear == new Date(val).getFullYear() && newMonth == new Date(val).getMonth() && (newDay - new Date(val).getDay() == 1)) {
            day = '昨天 '
          }
          return `${day}${Hours}:${Minutes}`
        } else if (newtime / 3600 / 24 / 30 < 12) {
          return new Date(val).toLocaleDateString().substring(5).replace(/\//g, '月') + '日'
        } else {
          return new Date(val).toLocaleDateString().replace(/(\/)/, '年').replace(/(\/)/, '月') + '日';
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/css/mixin.less";
  .musicPeople {
    .headportrait {
      display: block;
      margin-right: 10px;
      width: 80px;
      max-height: 80px;
      border-radius: 3px;
    }
    .musicName {
      font-size: 16px;
      color: #000;
    }
    .musicUser {
      color: @BLUE;
    }
  }
  .title {
    padding: 0 10px;
    line-height: 2.2;
    background-color: #dedede;
  }
  .commentImg {
    display: block;
    margin-right: 10px;
    width: 40px;
    border-radius: 50%;
  }
  .commBox {
    header {
      height: 40px;
    }
  }
  .time {
    font-size: 12px;
    color: @FRONT_BLACK2;
  }
  .content {
    color: #000;
  }
  .reply {
    padding: 8px;
    border-radius: 5px;
    background-color: #fff;

    .router-link-active {
      color: @BLUE;
    }
  }
  .icon-praise {
    font-size: 18px;
  }
  .num {
    color: @FRONT_BLACK2;
  }

  .commentK {
    .fixed();
    top: auto;
    bottom: 0;
    background-color: #fff;

    input {
      display: block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      border: none;
      border-bottom: 1px solid #ddd;
    }
  }
</style>

