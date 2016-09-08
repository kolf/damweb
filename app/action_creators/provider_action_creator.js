import Types from "app/action_types";

import {
  Postil as PostilCall,
  addInEditPost as addInEditPostCall,
  reviewRecordsView as reviewRecordsViewCall,
  getPostilData as getPostilDataCall,
  getProviderList as getProviderListCall,
  getProviderById as getProviderByIdCall,
  postProviderData as postProviderDataCall,
  postdownLoadphoto as postdownLoadphotoCall,
  getProductId as getProductIdCall,
  addtoTopic as addtoTopicCall,
  addToOverseas as addToOverseasCall
} from "app/api/api_calls";

//添加到未编审
export function addInEditPost(params) {
  return {
    type: Types.ADDINEDIT,
    callAPI: () => addInEditPostCall(params)
  }
};

//编审记录
export function reviewRecordsView(params) {
  return {
    type: Types.REVIEWRECORDSVIEW,
    callAPI: () => reviewRecordsViewCall(params)
  }
};

//编审记录
export function getPostilData(params) {
  return {
    type: Types.GET_POSTILDATA,
    callAPI: () => getPostilDataCall(params)
  }
};

// 获取摄影师列表
export function getProviderList(params) {
  return {
    type: Types.GET_PROVIDERLIST,
    callAPI: () => getProviderListCall(params)
  }
};

// 获取摄影师信息
export function getProviderById(params) {
  return {
    type: Types.GET_PROVIDERBYID,
    callAPI: () => getProviderByIdCall(params)
  }
};

// 提交图片信息
export function postProviderData(params) {
  return {
    type: Types.POST_PROVIDERDATA,
    callAPI: () => postProviderDataCall(params)
  }
};

// 根据ID下载getty图片
export function postdownLoadphoto(params) {
  return {
    type: Types.POST_DOWNLOADDATA,
    callAPI: () => postdownLoadphotoCall(params)
  }
};

//批注
export function Postil(params) {
  return {
    type: Types.POST_POSTIL,
    callAPI: () => PostilCall(params)
  }
};

// 获取专题对应的产品
export function getProductId(params) {
  return {
    type: Types.GET_PRODUCTID,
    callAPI: () => getProductIdCall(params)
  }
};

//添加到专题
export function addtoTopic(params) {
  return {
    type: Types.POST_ADDTOTOPIC,
    callAPI: () => addtoTopicCall(params)
  }
};

//添加到海外
export function addToOverseas(params) {
  return {
    type: Types.GET_ADDTOOVERSEA,
    callAPI: () => addToOverseasCall(params)
  }
};



