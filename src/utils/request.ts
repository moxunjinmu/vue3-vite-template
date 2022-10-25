// http.js统一封装接口
/*
 * @Author
 * @Date
 */
import axios from 'axios';

const token = '';
// create an axios instance
const service = axios.create({
  baseURL: '/api',
  timeout: 80000, // request timeout
});
 
// request interceptor
service.interceptors.request.use(
  (config:any) => {
    // Do something before request is sent
    if (token) {
      // 让每个请求携带token-- ['X-Token']为自定义key
      config.headers.Authorization = token;
    }
    console.log('service', service);
    
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
