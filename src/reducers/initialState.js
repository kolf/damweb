// 统一声明默认State
import cookie from 'js-cookie';

export default {
  auth: {
    isFetching: false,
    isAuthenticated: cookie.get('token') ? true : false
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
  resources: {
    isFetching: false,
    meta: {
      total: 0,
      pageSize: 10,
      pageNum: 1
    },
    data: []
  },
  audio: {
    isFetching: false,
    data: {}
  },
  video: {
    isFetching: false,
    data: {}
  },
  image: {
    isFetching: false,
    data: {}
  }
};
