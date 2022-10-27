export default [
  // GetUserInfo
  {
    url: '/api/getUsers',
    method: 'get',
    response: () => ({
      code: 0,
      message: 'ok',
      data: {
        'rows|10': [{
          id: '@guid',
          name: '@cname',
          'age|20-30': 23,
          'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师'],
        }],
      },
    }),
  },
  // GetToken
  {
    url: '/api/oauth/token',
    method: 'post',
    response: (option: any) => {
      const $name = option.body.name;
      if ($name) {
        return {
          code: 200,
          message: 'ok',
          data: {
            name: 'testToken',
          },
        };
      } 
      return {
        code: 400,
        message: '未提交参数',
      };
    },
  },
];
