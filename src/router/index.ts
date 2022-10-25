import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index',
  }, {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index.vue'),
  }, {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo.vue'),
  }, {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;