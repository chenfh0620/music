<template>
  <div id="app">
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Footer from '@/components/footer/footer';

export default {
  data() {
    return {};
  },
  components: {
    'v-footer': Footer,
  },
};
</script>
<style lang="less">
</style>
