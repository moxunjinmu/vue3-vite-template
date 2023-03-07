import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import BasicLayout from '@/layouts/BasicLayout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录页' },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/index',
    name: 'index',
    meta: { title: 'index' },
    component: BasicLayout,
    children: [{
      path: '/home',
      name: 'home',
      meta: { title: '首页' },
      component: () => import('@/views/home/index.vue'),
    }],
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo.vue'),
  },

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;