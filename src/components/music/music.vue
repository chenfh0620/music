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
      <div class="music-list">
        <div class="list-title">
          <span>推荐歌单</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="list-loop">
          <div v-for="( item, index ) in playLists" :key="index" class="list-item"
          @click="showListFun(item)">
            <img class="item-img" v-lazy="item.coverImgUrl" alt="">
            <div class="item-desc">{{item.name}}</div>
            <span class="play-num">{{intToWan(item.playCount)}}</span>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <lists-detail  v-if="showList" @changeShowList="showList = false"
       :chooseList="chooseList"></lists-detail>
    </transition>
    <transition name="fade">
      <player  v-if="showPlayer"></player>
    </transition>
  </div>
</template>

<script>
import ListsDetail from '@/components/listsDetail/listsDetail';
import Player from '@/components/player/player';
import axios from 'axios';
import BScroll from 'better-scroll';
import { Swipe, SwipeItem, MessageBox } from 'mint-ui';

export default {
  data() {
    return {
      playLists: [],
      showList: false,
      chooseList: {},
      showPlayer: false,
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
    ListsDetail,
    Player,
  },
  methods: {
    initscroll() {
      if (!this.musicScroll) {
        this.musicScroll = new BScroll(this.$refs.musicWrapper, {
          click: true,
        });
      } else {
        this.musicScroll.refresh();
      }
    },
    getPlayList() {
      axios.get('/ajax/top/playlist/highquality', {
        params: {
          limit: 6,
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
    intToWan(arg) {
      const number = parseInt(arg, 10);
      if (number >= 100000) {
        const newNum = Math.floor(number / 100000);
        return `${newNum}万`;
      }
      return number;
    },
    showListFun(list) {
      this.chooseList = list;
      this.showList = true;
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
  &:before {
    content: '别拉了，没有东西了';
    font-size: 24px;
    position: absolute;
    width: 100%;
    padding-top: 20px;
    text-align:center;
  }
  &>.bs-wrapper {
    background-color: #fff;
  }
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
  .music-list {
    .list-title {
      padding: 20px 0;
      span {
        display: inline-block;
        vertical-align: middle;
        border-left: 4px solid #d33a31;
        padding-left: 20px;
        font-size: 28px;
      }
      .icon-keyboard_arrow_right {
        display: inline-block;
        vertical-align: middle;
        font-size: 50px;
      }
    }
    .list-loop {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .list-item {
        position: relative;
        width: 246px;
        margin-bottom: 30px;
        .item-img {
          width: 100%;
        }
        .item-desc {
          .elli(2);
          font-size: 28px;
          line-height: 32px;
          padding: 5px 10px 0 10px;
        }
        .play-num {
          position: absolute;
          right: 10px;
          top: 4px;
          z-index: 3;
          padding-left: 26px;
          font-size: 24px;
          background: url('./play-num.svg') no-repeat;
          background-position: 0;
          background-size: 24px 22px;
          text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
          color: #fff;
          line-height: 36px;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease-out;
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(100%);
  }
}
</style>
