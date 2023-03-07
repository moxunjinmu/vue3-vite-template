// <!--
//  * @Author: wuwenjia
//  * @Date: 2022-07-012 20:12:37
//  * @LastModifiedBy: wuwenjia
//  * @LastEditTime: 2022-07-012 20:12:37
//  * @Description: 控制弹窗hooks
// -->

import { getLogin } from '@/api';
import { Login } from '@/Type';
import router from '@/router';
/** loginFile
 * 控制登录逻辑
 * @param modelName 相对应的弹窗组件名
 * @returns
 */
export function loginModal() {
  // 控制登录状态 flag
  const password = ref<string>('');
  const name = ref<string>('');
  
  /**
   * 登录
   */
  function login(params: Login) {
    if (!params) { getLogin(params); }
    getLogin({ password: password.value, name: name.value });
    router.push('/home');
  }

  /**
   * 退出登录
   */
  function logout() {
    password.value = '';
    name.value = '';
  }
  /**
   * 退出登录成功带有回调函数
   * @param callback
   */
  function handleLogout(callback: () => object) {
    logout();
    callback && callback();
  }
  return { name, password, login, logout, handleLogout };
}
