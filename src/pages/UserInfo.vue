<template>
  <div class="userinfo">
    <x-header class="fixed-top" :left-options="{backText: ''}"></x-header>
    <div class="bg-blur" :style="{backgroundImage: `url(${userinfo.profile.backgroundUrl})`}"></div>
    <div class="clear-header">
      <div class="flex info">
        <div class="flex_hd">
          <img :src="`${userinfo.profile.avatarUrl}?param=200y200`" alt="" class="avatar">
        </div>
        <div class="flex_bd">

        </div>
      </div>
      <p class="name">{{userinfo.profile.nickname}}</p>
      <ul><li>关注 {{userinfo.profile.follows}}</li><li>粉丝 {{userinfo.profile.followeds}}</li></ul>
      <span class="leval">{{userinfo.level}}</span>
      <!-- <popupDetail ref="popupDetail" v-model="show" type="detail" :id="parseInt(id)"></popupDetail> -->
      <!-- <catalogue ref="catalogue"></catalogue> -->
    </div>
  </div>
</template>

<script>
  import { XHeader, Flexbox, FlexboxItem } from 'vux'
  import { mapState, mapMutations } from 'vuex';
  import popupDetail from '../components/popupDetail';
  import catalogue from '../components/Catalogue';

  import { userDetail, userPlaylist } from '../util/severAPI';

  export default {
    name: "userInfo",
    data() {
      return {
        userinfo: {
          profile: {}
        },
        userplay: {}
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      XHeader,
      popupDetail,
      catalogue
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.user(to.params.id)
      })
    },
    computed: {

    },
    created() {

    },
    methods: {
      user(id) {
        userDetail({ uid: id }).then(res => {
          console.log(res.data);
          this.userinfo = res.data
        })
        userPlaylist({uid: id}).then(res=>{
          console.log(res.data);
          this.userplay=res.data
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .userinfo {
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
  .info {
    .avatar {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .name {

    }
  }
</style>

<style lang="less">
  .userinfo .vux-header {
    background-color: transparent !important;
  }
</style>




