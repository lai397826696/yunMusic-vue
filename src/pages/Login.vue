<template>
  <div>
    <input type="text" class="username" v-model="phone">
    <input type="password" class="password" v-model="password">
    <button @click="loginIn">登录</button>
  </div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem, Grid, GridItem, GroupTitle } from 'vux'
  import axios from 'axios';

  export default {
    name: "home",
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Flexbox,
      FlexboxItem,
      Grid,
      GridItem,
      GroupTitle
    },
    data() {
      return {
        phone: '',
        password: '',
      }
    },
    created() {


    },
    methods: {
      loginIn() {
        let _this = this;
        axios.get('/login/cellphone', {
          params: {
            phone: _this.phone,
            password: _this.password
          },
          withCredentials: true
        }).then(res => {
          console.log(res.data);
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>

