<template>
  <div class="player-wrapper ignore">
    <div class="player-bg" :style="'background-image:url('+albumPic+')'"></div>
    <div class="player-header">
      <div @click="changeShowPlayer" class="back"></div>
      <div class="title">{{songName}}</div>
      <div class="more"></div>
    </div>
    <div class="player-pic-wrapper" :class="{'onstop': !onplaying}">
      <div class="player-turn">
        <div class="player-pic">
          <img class="rotating" :class="{'playing': onplaying}" :src="albumPic">
        </div>
      </div>
    </div>
    <div class="zujian">
      <audio id="myPlayer" :src="audioUrl" @canplay="canplay"
      @timeupdate="timeupdate" @ended="nextSong"></audio>
      <div class="range">
        <mt-range @ v-model="rangeValue" :min="0" :max="100"
        :step="1" :bar-height="5">
          <div slot="start" class="time">{{startTime}}</div>
          <div slot="end" class="time">{{endTime}}</div>
        </mt-range>
      </div>
      <div class="control">
        <span class="prev" @click="prevSong"></span>
        <span class="play" v-show="!onplaying" @click="play"></span>
        <span class="stop" v-show="onplaying" @click="pause"></span>
        <span class="next" @click="nextSong"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast, Range } from 'mint-ui';

export default {
  data() {
    return {
      playList: [],
      index: -1,
      audioUrl: '',
      albumPic: '../../../static/placeholder_disk_play_song.png',
      songName: '暂无歌曲',
      onplaying: false,
      rangeValue: 0,
      startTime: '00:00',
      endTime: '00:00',
    };
  },
  components: {
    [Range.name]: Range,
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
  },
  beforeUpdated() {
    console.log('beforeUpdated');
  },
  updated() {
    console.log('updated');
  },
  methods: {
    // 初始化
    initPlayer(song) {
      console.log(song);
      let flag = 0;
      this.playList.forEach((d, i) => {
        if (d.id === song.id) {
          this.index = i;
          flag = 1;
        }
      });
      if (!flag) {
        this.playList.push(song);
        this.index = this.playList.length - 1;
        this.playSong(song);
      } else {
        this.playSong(this.playList[this.index]);
      }
    },
    // 播放一个音乐
    playSong(song) {
      if (song.audioUrl !== undefined) {
        this.audioUrl = song.audioUrl;
        this.albumPic = song.albumPic;
        this.songName = song.songName;
      } else {
        this.getMusic(song);
      }
    },
    prevSong() {
      const thisindex = this.index - 1;
      this.index = thisindex < 0 ? this.playList.length - 1 : thisindex;
      this.playSong(this.playList[this.index]);
    },
    nextSong() {
      const thisindex = this.index + 1;
      this.index = thisindex > this.playList.length - 1 ? 0 : thisindex;
      this.playSong(this.playList[this.index]);
    },
    changeShowPlayer() {
      this.$emit('changeShowPlayer');
    },
    getMusic(song) {
      axios.get('ajax/music/url', {
        params: {
          id: song.id,
        },
      }).then((response) => {
        const res = response.data;
        if (res.code === 200) {
          this.audioUrl = res.data[0].url;
          this.albumPic = song.albumPic;
          this.songName = song.songName;
        } else {
          console.log('歌曲加载失败');
          Toast('歌曲加载失败');
        }
      });
    },
    canplay() {
      const player = document.getElementById('myPlayer');
      // const range = document.querySelector('.zujian .mt-range-thumb');
      player.play();
      const songTime = player.duration;
      const seconds = Math.floor(songTime % 60);
      const minute = Math.floor(songTime / 60);
      this.endTime = `${minute}:${seconds}`;
      this.onplaying = true;
    },
    timeupdate() {
      const player = document.getElementById('myPlayer');
      const songTime = player.duration;
      const currentTime = player.currentTime;
      const seconds = Math.floor(currentTime % 60);
      const minute = Math.floor(currentTime / 60);
      this.startTime = `${minute}:${seconds}`;
      this.rangeValue = (currentTime / songTime) * 100;
    },
    play() {
      const player = document.getElementById('myPlayer');
      player.play();
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
@import 'mint-ui/lib/toast/style.css';
@import 'mint-ui/lib/range/style.css';
.player-wrapper.ignore{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #eee;
  .player-bg {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
    filter: blur(10px);
    z-index: -1;
    &:after {
      content: ' ';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,.5);
    }
  }
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
    .player-pic-wrapper {
      position: relative;
      width: 300px;
      height: 300px;
      margin: 0 auto;
      padding-top: 70px;
      &:after {
        content: ' ';
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 2;
        background: url("./stick_bg.png") no-repeat;
        background-size: 100%;
        width: 70px;
        height: 140px;
        margin-left: -15px;
        transition: all .5s;
        transform-origin: 10px 10px;
      }
      &.onstop:after {
        transform: rotate(-40deg);

      }
      .player-turn {
        width: 300px;
        height: 300px;
        &:before {
          content: ' ';
          position: absolute;
          top: 35px;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 2;
          background: url("./cd_wrapper.png") no-repeat;
          background-size: 100%;
        }
        .player-pic {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          border-radius: 100px;
          overflow: hidden;

          img {
            width: 200px;
            &.rotating {
              animation: picRoating 20s infinite linear;
              animation-play-state: paused;
            }
            &.rotating.playing {
              animation-play-state: running;
            }
          }
        }
      }
    }
    .zujian {
      position: fixed;
      bottom: 0;
      width: 100%;
      text-align: center;
      .range {
        font-size: 12px;
        color: #fff;
        .time {
          padding: 0 10px;
        }
      }
      span {
        width: 60px;
        height: 60px;
        display: inline-block;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 60px 60px;
      }
      .play {
        background-image: url('./play.png');
      }
      .stop {
        background-image: url('./pause.png');
      }
      .prev {
        background-size: 30px 30px;
        background-image: url('./pre_l.png');
      }
      .next {
        background-size: 30px 30px;
        background-image: url('./pre_r.png');
      }
    }
}
@keyframes picRoating {
  from {
    transform: roate(0deg);
  }
  to {
    transform: roate(1turn);
  }
}
</style>
