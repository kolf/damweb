/**
 * Created by lirui on 2016/9/29.
 */
import {
  ROLE_REQUEST, ROLE_LIST_SUCCESS, ROLE_LIST_FAIL,CREATE_ROLE_REQUEST,CREATE_ROLE_SUCCESS,CREATE_ROLE_FAIL
} from './../constants/actionTypes';
import cFetch from './../utils/cFetch'
import { API_CONFIG } from './../config/api';
import { message } from 'antd';

function requestRoles() {
  return {
    type: ROLE_REQUEST,
    isFetching: true
  };
}



export function listOrgRoles(params) {
  return dispatch => {
    dispatch(requestRoles());
    return cFetch(API_CONFIG.listOrgRoles, { method: "GET", params: params }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveRoles(res.jsonResult));
      } else {
        dispatch(rolesError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}





function receiveRoles(roles) {
  return {
    type: ROLE_LIST_SUCCESS,
    isFetching: false,
    roles
  };
}



function rolesError(message) {
  return {
    type: ROLE_LIST_FAIL,
    isFetching: false,
    message
  };
}





export function createRole(creds) {
  return dispatch => {
    dispatch(requestCreateRole());
    return cFetch(API_CONFIG.createRole,{ method: "POST", body: JSON.stringify(creds) }).then((res) => {
      if (res.jsonResult.returnCode === '1') {
        dispatch(receiveCreateRole(res.jsonResult));
      } else {
        dispatch(createRoleError(res.jsonResult.msg));
        message.error(res.jsonResult.msg);
      }
    });
  };
}




function requestCreateRole(roles) {
  return {
    type: CREATE_ROLE_REQUEST,
    isFetching: false,
    roles
  };
}


function receiveCreateRole() {
  return {
    type: CREATE_ROLE_SUCCESS,
    isFetching: false
  };
}


function createRoleError(message) {
  return {
    type: CREATE_ROLE_FAIL,
    isFetching: false,
    message
  };
}
