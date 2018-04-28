<template>
  <div class="index">
    <div>Index say{{say}}</div>
    <router-link to="/music">go</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      say: 'haha',
    };
  },
};
</script>

<style type="text/less" lang="less" scoped>
#app {
  .index {
    color: #eeeeee;
  }
}
</style>
