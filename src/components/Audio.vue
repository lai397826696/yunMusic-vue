<template>
  <div class="audioBox">
    <audio :src="url" controls="controls" ref="ading">
      <source :src="url" type="audio/ogg" />
      <source :src="url" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <button @click="audioPlay('28314062')">播放/暂停</button>
  </div>
</template>

<script>
import { Group, Cell } from "vux";

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      msg: "Hello World!"
    };
  },
  props: {
    id: {
      type: String,
    }
  },
  computed: {
    url(){
      return `http://music.163.com/song/media/outer/url?id=${this.id}.mp3`;
    }
  },
  methods: {
    audioPlay(id) {
      let _this=this;
      let ading = this.$refs.ading;
      console.log(this.transTime(ading.duration));
      if(ading.paused) {
        ading.play();
      } else {
        ading.pause();
      }
      
      // ading.addEventListener("loadedmetadata", function() {
      //   console.log(ading.duration);
      // });
      ading.addEventListener("timeupdate", function() {
        var value = Math.round(Math.floor(this.currentTime) / Math.floor(this.duration) * 100, 0);
        console.log(this.currentTime);
      }, false);
    },
    transTime(time) {
      var duration = parseInt(time);
      var minute = parseInt(duration / 60);
      var sec = duration % 60 + "";
      var isM0 = ":";
      if (minute == 0) {
        minute = "00";
      } else if (minute < 10) {
        minute = "0" + minute;
      }
      if (sec.length == 1) sec = "0" + sec
      return minute + isM0 + sec;
    }
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
