import request from '@/utils/request';

export function get() {
  return request({
    url: 'get',
    method: 'GET',
    params: {
      test: '',
    },
  });
}