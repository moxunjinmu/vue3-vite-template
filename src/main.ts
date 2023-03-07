import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import pinia from '@/stores/index';
import '@unocss/reset/tailwind.css';
import './styles/main.css';
import 'uno.css';

const app = createApp(App);
// 插件自动加载
const modules = import.meta.globEager('./modules/*.ts');
Object.values(modules).map(v => v.default?.(app));
app.use(router).use(pinia);
app.mount('#app');
