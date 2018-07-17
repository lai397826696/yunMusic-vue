<template>
  <div class="flex dragPage">
    <label class="flex_hd">
      <span class="min">00:00</span>
    </label>
    <div class="flex_bd dragBox" @click="selectDrop">
      <div class="slide-bar">
        <div class="slide-quantity" :style="{width: `${styleLeft}px`}"></div>
        <span class="drop" ref="drop" :style="{left: `${styleLeft-defaultnum}px`}" @touchstart.prevent="touchstart" @touchmove.prevent="touchmove" @touchend.prevent="touchend"></span>
      </div>
    </div>
    <label class="flex_ft">
      <span class="max">05:30</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: "drag",
    data() {
      return {
        defaultnum: 7,
        styleLeft: 0,
        clientX: 0,
        offsetWidth: 0
      };
    },
    created() {

    },
    mounted() {
      this.offsetWidth = this.$refs.drop.parentNode.offsetWidth
      this.clientX = this.$refs.drop.getBoundingClientRect().left + this.defaultnum
    },
    methods: {
      touchmove(event) {
        let target = event.changedTouches[0]
        let moveX = this.boundary(target.clientX - this.clientX)
        this.styleLeft = moveX
      },
      touchstart(event) {
        let startX = event.changedTouches[0].clientX
        // this.clientX = startX
      },
      touchend(event) {
      },
      boundary(num) { //边界判定
        if (num <= 0) return 0
        if (num >= this.offsetWidth) return this.offsetWidth
        return num
      },
      selectDrop(event) {
        this.styleLeft = event.offsetX
      }
    }
  };
</script>

<style lang="less" scoped>
  .flex.dragPage {
    margin: 10px;
    padding: 0;
    font-size: 12px;
  }

  .flex_hd,
  .flex_ft {
    padding: 0 2px;
  }
  .dragBox {
    position: relative;
    margin: 0 10px;
    padding: 10px 0;
    overflow: visible;
  }

  .slide-bar {
    position: relative;
    height: 2px;
    background-color: #ccc;
  }
  .slide-quantity {
    width: 0px;
    height: 100%;
    background-color: red;
  }
  .drop {
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 1;
    margin-top: -7px;
    width: 14px;
    height: 14px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      margin: -2px;
      width: 4px;
      height: 4px;
      background-color: red;
      border-radius: 50%;
    }
  }
</style>

