<template>
  <div class="music-wrapper ignore" ref="musicWrapper">
    <div class="bs-wrapper">
      <mt-swipe :auto="3000">
        <mt-swipe-item><img class="my-swipe-img" src="./1df.png"></mt-swipe-item>
        <mt-swipe-item><img class="my-swipe-img" src="./3ds.png"></mt-swipe-item>
        <mt-swipe-item><img class="my-swipe-img" src="./4fd.png"></mt-swipe-item>
        <mt-swipe-item><img class="my-swipe-img" src="./8ds.png"></mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BScroll from 'better-scroll';
import { Swipe, SwipeItem, MessageBox } from 'mint-ui';

export default {
  data() {
    return {
      playLists: [],
    };
  },
  created() {
    this.getPlayList();
  },
  mounted() {
    this.$nextTick(() => {
      this.initscroll();
    });
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  methods: {
    initscroll() {
      if (!this.musicScroll) {
        this.musicScroll = new BScroll(this.$refs.musicWrapper, {});
      } else {
        this.musicScroll.refresh();
      }
    },
    getPlayList() {
      axios.get('/ajax/top/playlist/highquality', {
        params: {
          limit: 2,
        },
      }).then((response) => {
        const res = response.data;
        if (res.code === 200) {
          this.playLists = res.playlists;
        } else {
          MessageBox('提示', '获取歌单失败');
        }
      });
    },
  },
};
</script>

<style type="text/less" lang="less">
@import 'mint-ui/lib/swipe/style.css';
@import 'mint-ui/lib/swipe-item/style.css';
@import 'mint-ui/lib/message-box/style.css';
.music-wrapper.ignore {
  position: absolute;
  top: 87px;
  bottom: 40px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.music-wrapper {
  .mint-swipe {
    height: 278px;
    .my-swipe-img {
      width: 100%;
    }
  }
}
</style>
