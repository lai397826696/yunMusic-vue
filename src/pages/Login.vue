<template>
  <div>
    <input type="text" class="username" v-model="phone">
    <input type="password" class="password" v-model="password">
    <button @click="loginIn">登录</button>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        phone: '',
        password: '',
      }
    },
    methods: {
      loginIn() {
        let _this = this;
        // this.$http.get('/login/refresh').then(res => {
        //   console.log(res.data);
        // })
        this.$http.get('/login/cellphone', {
          params: {
            phone: _this.phone,
            password: _this.password
          },
          // withCredentials: true
        }).then(res => {
          console.log(res);
          let ress = res.data;
          if (!!ress.code && ress.code == 200) {
            this.$router.push('/')
            localStorage.setItem("userinfo", JSON.stringify(res.data))
          } else {
            this.$vux.alert.show({
              title: '登录失败！',
              content: ress.msg,
              onShow () {

              },
              onHide () {

              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>

