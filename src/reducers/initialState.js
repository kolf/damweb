// 统一声明默认State
import cookie from 'js-cookie';

export default {
  auth: {
    isFetching: false,
    isAuthenticated: cookie.get('access_token') ? true : false
  },
  users: {
    isFetching: false,
    meta: {
      total: 0,
      pageSize: 10,
      pageNum: 1
    },
    data: []
  },
  products: {
    isFetching: false,
    meta: {
      total: 0,
      pageSize: 10,
      pageNum: 1
    },
    data: []
  },
  productsOpts: {
    isFetching: false,
    data: []
  },
  res: {
    isFetching: false,
    data: []
  },
  sysRes: {
    isFetching: false,
    data: []
  }
};
