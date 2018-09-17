<template>
  <div class="userinfo">
    <x-header class="fixed-top" :left-options="{backText: ''}">歌单</x-header>
    <div class="clear-header">
      <div class="flex">
        <div class="flex_hd">sdfsdf</div>
        <div class="flex_bd">sdfdsf</div>
      </div>
      <div class="flex">
        <div class="flex_bd">评论</div>
        <div class="flex_bd">分享</div>
        <div class="flex_bd">下载</div>
        <div class="flex_bd">多选</div>
      </div>
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
  
</style>

<style lang="less">
  // .userinfo .vux-header {
  //   background-color: transparent !important;
  // }
</style>




