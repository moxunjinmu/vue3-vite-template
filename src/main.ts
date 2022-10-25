import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import './styles/main.css';

const app = createApp(App);
// 插件自动加载
const modules = import.meta.globEager('./modules/*.ts');
Object.values(modules).map(v => v.default?.(app));
app.use(router).use(store);
app.mount('#app');
