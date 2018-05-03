<template>
  <div class="page index">
    <v-index-header></v-index-header>
    <router-view></router-view>
  </div>
</template>

<script>
import IndexHeader from '@/components/indexHeader/indexHeader';

export default {
  data() {
    return {
      say: 'haha',
    };
  },
  created() {
  },
  methods: {
  },
  components: {
    'v-index-header': IndexHeader,
  },
};
</script>

<style type="text/less" lang="less">
#app {
}
</style>
