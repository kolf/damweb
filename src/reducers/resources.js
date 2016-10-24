import {
  QUERY_RESOURCE_QERUEST, QUERY_RESOURCE_SUCCESS, QUERY_RESOURCE_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function resources(state = initialState.resources, action) {
  switch (action.type) {
    case QUERY_RESOURCE_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case QUERY_RESOURCE_SUCCESS:
      let data = action.resources.data || {};
      if(!data.list){
        // data.total: 0,
        //   data.pageSize: 24,
        //   pageNum: 1
        // data.list = []
        Object.assign(data, {
          total: 0,
          pageSize: 24,
          pageNum: 1,
          list: []
        })
      }
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        meta: {
          total: data.total,
          pageSize: data.pageSize,
          pageNum: data.pageNum
        },
        data: data.list
      });
    case QUERY_RESOURCE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
