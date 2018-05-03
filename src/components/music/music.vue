<template>
  <div class="music-wrapper ignore" ref="musicWrapper">
    <div class="bs-wrapper">
      <mt-swipe :auto="3000">
        <mt-swipe-item><img class="my-swipe-img" src="./1df.png"></mt-swipe-item>
        <mt-swipe-item><img class="my-swipe-img" src="./3ds.png"></mt-swipe-item>
        <mt-swipe-item><img class="my-swipe-img" src="./4fd.png"></mt-swipe-item>
        <mt-swipe-item><img class="my-swipe-img" src="./8ds.png"></mt-swipe-item>
      </mt-swipe>
      <div class="fun">
        <div class="fun-item personal">
          <div class="fun-img"></div>
          <p class="fun-text">私人FM</p>
        </div>
        <div class="fun-item daily">
          <div class="fun-img">20</div>
          <p class="fun-text">每日推荐</p>
        </div>
        <div class="fun-item rank">
          <div class="fun-img"></div>
          <p class="fun-text">排行榜</p>
        </div>
      </div>
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
@import '../../common/style/mixin.less';
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
  .fun {
    display: flex;
    height: 208.5px;
    padding-top: 30px;
    .border-1px(#ddd);
    .fun-item {
      display: display;
      flex: 1;
      text-align: center;
      &.personal {
        .fun-img {
          background: url('./fm.png') no-repeat;
          background-size: 100px 100px;
          background-position: 50%;
        }
      }
      &.daily {
        .fun-img {
          color: #d33a31;
          line-height: 134.5px;
          text-align: center;
          font-size: 40px;
        }
      }
      &.rank {
        .fun-img {
          background: url('./ph.png') no-repeat;
          background-size: 100px 100px;
          background-position: 50%;
        }
      }
      .fun-img {
        display: block;
        width: 134.5px;
        height: 134.5px;
        border: 1px solid #d33a31;
        border-radius: 68px;
        margin: 0 auto;
      }
      .fun-text {
        display: block;
        padding-top: 10px;
        font-size: 20px;
      }
    }
  }
}
</style>
