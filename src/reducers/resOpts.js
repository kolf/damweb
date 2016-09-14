import {
  RES_QERUEST, RES_SUCCESS, RES_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function resOpts(state = initialState.resOpts, action) {
  switch (action.type) {
    case RES_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RES_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        data: action.res.data.subRes
      });
    case RES_FAILURE:
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
