import request from '@/utils/request';
import { Login } from '@/Type';

export function getLogin(params: Login) {
  return request({
    url: '/login',
    method: 'GET',
    params,
  });
}