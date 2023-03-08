// http.js统一封装接口
/*
 * @Author
 * @Date
 */
import axios from 'axios';
import { useUserStore } from '@/stores';

const userStore = useUserStore();
// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_APIHOST || '',
  timeout: 80000, // request timeout
});
 
// request interceptor
service.interceptors.request.use(
  (config:any) => {
    // Do something before request is sent
    if (userStore.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key
      config.headers.Authorization = userStore.token;
    }
    console.log('config', config);
    
    return config;
  },
  error => {
    // Do something with request error
    // console.log("出错啦",error)
    Promise.reject(error);
  },
); 
// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log(`err${ error }`); // for debug
    return Promise.reject(error);
  },
);
 
export default service;
