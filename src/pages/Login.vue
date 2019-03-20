<template>
  <div>
    <group>
      <x-input class="clear" title="账号" is-type="china-mobile" :required="true" v-model="phone"></x-input>
      <x-input class="clear" title="密码" type="password" v-model="password"></x-input>
    </group>
    <group>
      <x-button type="primary" @click.native="loginIn">登录</x-button>
    </group>
  </div>
</template>

<script>
  import { XInput, Group, XButton } from 'vux';
  export default {
    name: "home",
    data() {
      return {
        phone: '',
        password: '',
      }
    },
    components: {
      XInput,
      Group,
      XButton
    },
    methods: {
      loginIn() {
        let _this = this;
        if (!this.phone || !this.password) {
          this.$vux.alert.show({
            title: '请输入正确的账号或密码',
          })
          return false;
        }
        this.$http.get('/login/cellphone', {
          params: {
            phone: _this.phone,
            password: _this.password
          },
          withCredentials: true
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
              onShow() {

              },
              onHide() {

              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .clear {
    input:-internal-autofill-selected {
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      background-color: rgba(0, 0, 0, 0) !important; // 透明背景
    }
  }
  input {
    -webkit-tap-highlight-color:rgba(255,0,0,0) !important;
  }
</style>

