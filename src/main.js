// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Lazyload } from 'mint-ui';
import '@/common/style/index.less';
import App from './App';
import router from './router';

Vue.use(Lazyload, {
  preLoad: 1.3,
  error: '../static/error.jpg',
  loading: '../static/loading.gif',
  attempt: 1,
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>',
}).$mount('#app');

