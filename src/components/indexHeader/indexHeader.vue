<template>
  <div class="index-header ignore">
    <div class="search">
      <div class="yuyin"></div>
      <div class="search-box">
        <input @click="changeSearchStatus(true)" type="text" name="kwd" placeholder="搜索音乐、歌曲、电台">
      </div>
      <div class="music">
        <span @click="changeSearchStatus(false)" v-show="inSearch" class="close">取消</span>
        <img v-show="!inSearch" src="./ph.png">
      </div>
    </div>
    <div class="header-menu">
      <router-link @click.native="currentBar=0" to="/index/music">音乐</router-link>
      <router-link @click.native="currentBar=1" to="/index/video">视频</router-link>
      <router-link @click.native="currentBar=2" to="/index/station">电台</router-link>
    </div>
    <div class="menu-bar" :class="currentBarClass">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inSearch: false,
      currentBar: 0,
    };
  },
  computed: {
    currentBarClass() {
      return `class${this.currentBar}`;
    },
  },
  methods: {
    changeSearchStatus(status) {
      this.inSearch = status;
    },
  },
};
</script>

<style type="text/less" lang="less">
.index-header.ignore {
  .search {
    display: flex;
    height: 46px;
    background-color: #d43c33;
    .yuyin {
      flex-basis: 40px;
      background: url('music.png') no-repeat;
      background-position: 50%;
      background-size: 32px 32px;
    }
    .search-box {
      flex: 1;
      input {
        width: 100%;
        height: 30px;
        box-sizing: border-box;
        border-radius: 5px;
        font-size: 12px;
        margin-top: 8px;
        padding-left: 60px;
      }
    }
    .music {
      flex-basis: 40px;
      text-align: center;
      .close {
        line-height: 46px;
        font-size: 14px;
        color: #fff;
      }
      img {
        margin-left: 10px;
        margin-top: 13px;
        width: 20px;
      }
    }
  }
  .header-menu {
    display: flex;
    align-items: center;
    text-align: center;
    height: 40px;
    background-color: rgba(248, 248, 249, .9);
    a{
      flex: 1;
      font-size: 14px;
      color: #333;
    }
    .router-link-active {
      color: #ff0200;
    }
  }
  .menu-bar {
    width: 33.33%;
    height: 2px;
    background-color: #ff0200;
    transition: all .375s;
    &.class0 {
      transform: translateX(0);
    }
    &.class1 {
      transform: translateX(100%);
    }
    &.class2 {
      transform: translateX(200%);
    }
  }
}
</style>
