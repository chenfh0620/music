import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import Music from '@/views/Music';
import Station from '@/views/Station';
import Rank from '@/views/Rank';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/music',
    component: Music,
  },
  {
    path: '/station',
    component: Station,
  },
  {
    path: '/rank',
    component: Rank,
  },
];
export default new Router({
  routes,
});
