// <!--
//  * @Author: wuwenjia
//  * @Date: 2022-07-012 20:12:37
//  * @LastModifiedBy: wuwenjia
//  * @LastEditTime: 2022-07-012 20:12:37
//  * @Description: 控制弹窗hooks
// -->

import axios from 'axios';
import { getLogin } from '@/api';
import { Login } from '@/Type';
import router from '@/router';
import { useUserStore } from '@/stores';

/** loginFile
 * 控制登录逻辑
 * @param modelName 相对应的弹窗组件名
 * @returns
 */
export function loginModal() {
  // 控制登录状态 flag
  const password = ref<string>('');
  const username = ref<string>('');
  const userStore = useUserStore();
  const { loginSuccess, loginout: storeLoginout } = userStore;
  
  /**
   * 登录
  */
  function login() {
    try {
      const newFormData = new FormData();
      newFormData.append('username', username.value);
      newFormData.append('password', password.value);
      const res = getLogin(newFormData);
      loginSuccess((res as any).data.data);
      router.push('/home');
    } catch (error) {
      console.log('error');
    }
  }

  /**
   * 退出登录
   */
  function loginout() {
    return storeLoginout();
  }
  /**
   * 退出登录成功带有回调函数
   * @param callback
   */
  function handleLogout(callback: () => object) {
    loginout();
    callback && callback();
  }
  return { username, password, login, loginout, handleLogout };
}
