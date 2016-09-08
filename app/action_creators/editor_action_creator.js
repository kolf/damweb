import Types from "app/action_types";

import {
  filterList as filterListCall,
  getOfflineData as getOfflineDataCall,
  storageSearch as storageSearchCall,

  isEdit as isEditCall,
  reviewRecordsView as reviewRecordsViewCall,
  getPostilhistory as getPostilhistoryCall,
  addInEditPost as addInEditPostCall,
  editgrouppublish as editgrouppublishCall,
  editgroupOffline as editgroupOfflineCall,
} from "app/api/api_calls";


// 全部资源筛选
export function getStorageFilter (params) {
  return {
    type: Types.EDIT_STORAGE_FILTER,
    callAPI: () => filterListCall(params)
  }
}

// 已上线筛选
export function getPublishFilter (params) {
  return {
    type: Types.EDIT_PUBLISH_FILTER,
    callAPI: () => filterListCall(params)
  }
}

// 未编审筛选
export function getToeditFilter (params) {
  return {
    type: Types.EDIT_TOEDIT_FILTER,
    callAPI: () => filterListCall(params)
  }
}

// 已下线筛选
export function getOfflineFilter (params) {
  return {
    type: Types.EDIT_OFFLINE_FILTER,
    callAPI: () => filterListCall(params)
  }
}

// 全部资源结果集
export function getStorageData (params) {
  return {
    type: Types.EDIT_STORAGE_DATA,
    callAPI: () => storageSearchCall(params)
  }
}

// 未编审结果集
export function getToeditData (params) {
  return {
    type: Types.EDIT_TOEDIT_DATA,
    callAPI: () => storageSearchCall(params)
  }
}

// 下线结果集
export function getOfflineData (params) {
  return {
    type: Types.EDIT_OFFLINE_DATA,
    callAPI: () => getOfflineDataCall(params)
  }
}

//编审记录
export function reviewRecordsView (params) {
  return {
    type: Types.REVIEWRECORDSVIEW,
    callAPI: () => reviewRecordsViewCall(params)
  }
}

// 添加到未编审
export function addInEditPost (params) {
  return {
    type: Types.ADDINEDIT,
    callAPI: () => addInEditPostCall(params)
  }
}

// 判断编审状态
export function isEdit (params) {
  return {
    type: Types.EDIT_GET_ISEDIT,
    callAPI: () => isEditCall(params)
  }
}

//批注历史
export function getPostilhistory (params) {
  return {
    type: Types.GET_POSTILHISTORY,
    callAPI: () => getPostilhistoryCall(params)
  }
}

//下线
export function editgroupOffline (params) {
  return {
    type: Types.POST_EDITOFFLINE,
    callAPI: () => editgroupOfflineCall(params)
  }
}

//上线
export function editgrouppublish (params) {
  return {
    type: Types.POST_EDITONLINE,
    callAPI: () => editgrouppublishCall(params)
  }
}