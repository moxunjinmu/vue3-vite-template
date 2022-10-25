import { App } from 'vue';
import NProgress from 'nprogress';
import { router } from '@/router/index';

export default (app: App) => {
  router.beforeEach(() => {
    console.log('sdfdsffff');
		
    NProgress.start();
  });
  router.afterEach(() => {
    NProgress.done();
  });
};
