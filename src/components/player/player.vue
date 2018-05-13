<template>
  <div class="player-wrapper ignore">
    <div class="player-header">
      <div @click="changeShowPlayer" class="back"></div>
      <div class="title">歌单</div>
      <div class="more">{{musicInfo.id}}{{musicId}}</div>
    </div>
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
  props: {
    musicInfo: Object,
  },
  beforeCreated() {
    console.log('beforeCreated');
  },
  created() {
    console.log('created');
  },
  beforeMounted() {
    console.log('beforeMounted');
  },
  mounted() {
    console.log('mounted');
    this.getMusic();
  },
  beforeUpdated() {
    console.log('beforeUpdated');
  },
  updated() {
    console.log('updated');
  },
  methods: {
    changeShowPlayer() {
      this.$emit('changeShowPlayer');
    },
    getMusic() {
      axios.get('ajax/music/url', {
        params: {
          id: this.musicInfo.id,
        },
      }).then((response) => {
        const res = response.data;
        if (res.code === 200) {
          this.musicUrl = res.data[0].url;
          setTimeout(() => {
            this.musicId = '132';
          }, 200);
        }
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
.player-wrapper.ignore{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #eee;
  .player-header {
      position: relative;
      display: flex;
      height: 46px;
      .back {
        width: 40px;
        background: url('../../../static/back.png') no-repeat;
        background-size: 32px 32px;
        background-position: 50%;
      }
      .title {
        flex: 1;
        color: #fff;
        font-size: 14px;
        text-align:center;
        line-height: 46px;
      }
      .more {
        width: 40px;
        background: url('../../../static/morew.png') no-repeat;
        background-size: 32px 32px;
        background-position: 50%;
        transform: rotate(90deg);
      }
    }
}
</style>
