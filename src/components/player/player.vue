<template>
  <div class="player-wrapper">
    <audio id="myPlayer" :src="musicUrl" @canplay="play"></audio>
    <span v-show="!onplaying" @click="play">播放</span>
    <span v-show="onplaying" @click="pause">暂停</span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      musicId: '',
      musicUrl: '',
      onplaying: false,
    };
  },
  methods: {
    getMusic() {
      axios.get('ajax/music/url', {
        params: {
          id: this.musicId,
        },
      }).then((reponse) => {
        const res = reponse.data;
        console.log(res);
      });
    },
    play() {
      document.getElementById('myPlayer').play();
      this.onplaying = true;
    },
    pause() {
      document.getElementById('myPlayer').pause();
      this.onplaying = false;
    },
  },
};
</script>

<style type="text/less" lang="less">
.player-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
