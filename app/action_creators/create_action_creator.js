import Types from "app/action_types";

import {
    filterList as filterListCall,
    createSearch as createSearchCall,
    postCreativeState as postCreativeStateCall

} from "app/api/api_calls";

//创意/未编审/筛选列表
export function getToeditFilter(params) {
    return {
        type: Types.CREATE_TOEDIT_FILTER,
        callAPI: () => filterListCall(params)
    }
};

//创意/已上线/筛选列表
export function getPublishFilter(params) {
    return {
        type: Types.CREATE_PUBLISH_FILTER,
        callAPI: () => filterListCall(params)
    }
};

//创意/已下线/筛选列表
export function getOfflineFilter(params) {
    return {
        type: Types.CREATE_OFFLINE_FILTER,
        callAPI: () => filterListCall(params)
    }
}; 

//创意/不通过/筛选列表
export function getNopassFilter(params) {
    return {
        type: Types.CREATE_NOPASS_FILTER,
        callAPI: () => filterListCall(params)
    }
};   

//创意/未编审/结果集
export function createSearch(params) {
    return {
        type: Types.CREATE_TOEDIT_LIST,
        callAPI: () => createSearchCall(params)
    }
};

// 发布/撤图/不通过
export function postCreativeState(params) {
    return {
        type: Types.CREATE_POST_STATE,
        callAPI: () => postCreativeStateCall(params)
    }
};