<template>
  <div class="play-list-wrapper ignore" ref="playListWrapper">
    <div class="bs-wrapper">
    <div class="play-list-top">
      <img class="plhead_bg" :src="chooseList.coverImgUrl">
      <div class="play-list-header">
        <div @click="changeShowList" class="back"></div>
        <div class="title">歌单</div>
        <div class="more"></div>
      </div>
      <div class="play-list-img">
        <div class="img">
          <img :src="chooseList.coverImgUrl">
          <span class="play-num">{{intToWan(chooseList.playCount)}}</span>
        </div>
        <div class="name">
          <p>{{chooseList.name}}</p>
        </div>
      </div>
      <div class="list-info">
        <div class="info-item">
          <img src="/static/list-3.png">
          <span>{{intToWan(chooseList.trackCount)}}</span>
        </div>
        <div class="info-item">
          <img src="/static/list-2.png">
          <span>{{intToWan(chooseList.commentCount)}}</span>
        </div>
        <div class="info-item">
          <img src="/static/list-1.png">
          <span>{{intToWan(chooseList.shareCount)}}</span>
        </div>
        <div class="info-item">
          <img src="/static/list-4.png">
          <span>下载</span>
        </div>
      </div>
    </div>
      <div class="play-lists">
        <h3 class="play-lists-title">歌曲列表</h3>
        <div v-if="loading" class="loading">
          <img src="./rage_loading.png">
        </div>
        <ul>
          <li v-for="(item, index) in tracks" class="play-lists-item"
           :key="item.id" @click.stop.prevent="playMusic(item, $event)">
            <span>{{index + 1}}</span>
            <div class="music-item">
              <h2>{{item.name}}</h2>
              <span>{{item.artists[0].name}}-{{item.album.name}}</span>
            </div>
            <img src="./start.png">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BScroll from 'better-scroll';

export default {
  props: ['chooseList'],
  data() {
    return {
      tracks: [],
      loading: true,
    };
  },
  created() {
    this.getListDetail();
  },
  mounted() {
    this.listscroll = new BScroll(this.$refs.playListWrapper);
  },
  methods: {
    getListDetail() {
      axios.get('/ajax/playlist/detail', {
        params: {
          id: this.chooseList.id,
        },
      }).then((response) => {
        this.loading = false;
        const res = response.data;
        if (res.code === 200) {
          this.tracks = res.result.tracks;
        }
      });
    },
    changeShowList() {
      this.$emit('changeShowList');
    },
    intToWan(arg) {
      const number = parseInt(arg, 10);
      if (number >= 100000) {
        const newNum = Math.floor(number / 100000);
        return `${newNum}万`;
      }
      return number;
    },
    playMusic(item, event) {
      console.log(event);
      this.$emit('play', item);
    },
  },
};
</script>

<style type="text/less" lang="less">
@import '../../common/style/mixin.less';
  .play-list-wrapper.ignore {
    position: fixed;
    top: 0;
    bottom: 40px;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #f8f8f8;
    overflow: hidden;
    .play-list-top {
      position: relative;
      background-color: #000;
      overflow: hidden;
      .plhead_bg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        filter: blur(20px);
        width: 100%;
        height: 100%;
      }
    }
    .play-list-header {
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
    .play-list-img {
      position: relative;
      margin-top: 10px;
      display: flex;
      .img {
        position: relative;
        width: 123px;
        padding-left: 15px;
        img {
          width: 100%;
        }
        .play-num {
          position: absolute;
          right: 5px;
          top: 2px;
          z-index: 3;
          padding-left: 13px;
          font-size: 12px;
          background: url('./play-num.svg') no-repeat;
          background-position: 0;
          background-size: 12px 11px;
          text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
          color: #fff;
          line-height: 18px;
        }
      }
      .name {
        flex: 1;
        font-size: 14px;
        color: #fff;
        padding: 20px 15px;
        line-height: 20px;
      }
    }
    .list-info {
      position: relative;
      display: flex;
      margin-top: 10px;
      padding-bottom: 10px;
      .info-item {
        flex: 1;
        text-align: center;
        color: #fff;
        font-size: 12px;
        img {
          display: block;
          width: 24px;
          margin: 5px auto;
        }
      }
    }
    .play-lists {
      .loading {
        height: 100px;
        width: 100px;
        margin: 10px auto;
        img {
          width: 100%;
          animation: musicRotating 3s linear .3s infinite;
        }
      }
      .play-lists-title {
        height: 23px;
        line-height: 23px;
        background-color: #eeeff0;
        color: #666;
        font-size: 12px;
        padding: 0 10px;
      }
      .play-lists-item {
        display: flex;
        align-items: center;
        height: 55px;
        .border-1px(#ddd);
        &:after {
          left: 40px;
        }
        span {
          width: 40px;
          text-align: center;
          font-size: 16px;
          color: #999;
        }
        .music-item {
          flex: 1;
          h2 {
            color: #333;
            font-size: 16px;
            margin: 5px 0;
          }
          span {
            font-size: 12px;
            color: #888;
          }
        }
        img {
          width: 22px;
          height: 22px;
          margin-right:8px;
        }
      }
    }
  }
  @keyframes musicRotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
