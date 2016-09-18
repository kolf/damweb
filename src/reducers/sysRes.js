import {
  SYS_RES_QERUEST, SYS_RES_SUCCESS, SYS_RES_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function sysRes(state = initialState.sysRes, action) {
  switch (action.type) {
    case SYS_RES_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SYS_RES_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        data: action.sysRes.data.subRes
      });
    case SYS_RES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}



/**

 <OptGroup label="Engineer">
 <Option value="yiminghe">yiminghe</Option>
 </OptGroup>
 **/
