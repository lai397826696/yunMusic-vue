<template>
  <div>
    <input type="text" class="username" v-model="phone">
    <input type="password" class="password" v-model="password">
    <button @click="loginIn">登录</button>
  </div>
</template>

<script>
  export default {
    name: "fm",
    data() {
      return {
        phone: '',
        password: '',
      }
    },
    created() {

    },
    methods: {
      
    }
  }
</script>

<style lang="less" scoped>

</style>

