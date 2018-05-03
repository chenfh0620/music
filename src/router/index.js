import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import Music from '@/components/music/music';
import Video from '@/components/video/video';
import Station from '@/components/station/station';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/index/music',
  },
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: 'music',
        component: Music,
      },
      {
        path: 'video',
        component: Video,
      },
      {
        path: 'station',
        component: Station,
      },
    ],
  },
];
export default new Router({
  routes,
});
