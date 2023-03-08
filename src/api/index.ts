import request from '@/utils/request';
import { Login } from '@/Type';

export function getLogin(data: any) {
  return request({
    url: '/api/v1/token/',
    method: 'post',
    data,
  });
}

export function test() {
  return request({
    url: '/api/v1/user/user_options/add_user/',
    method: 'get',
  });
}