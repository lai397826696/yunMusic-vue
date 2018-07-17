<template>
  <div>
    <x-header :left-options="{backText: ''}">私人FM</x-header>
  </div>
</template>

<script>
  import { XHeader } from 'vux';
  export default {
    name: "fm",
    data() {
      return {
        phone: '',
        password: '',
      }
    },
    components: {
      XHeader,
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
</style>

