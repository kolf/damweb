import Types from "app/action_types";

import {
  getDraftData as getDraftDataCall,
  postRelieveDraft as postRelieveDraftCall,
  getFavoriteItem as getFavoriteItemCall,
  getFavoriteList as getFavoriteListCall,
  deleteFavorite as deleteFavoriteCall,
  deleteResource as deleteResourceCall,
  postFavoriteItem as postFavoriteItemCall,
  getMyNewsList as getMyNewsListCall,
  postDeleteMyNews as postDeleteMyNewsCall,
  postToMyNews as postToMyNewsCall,
  getpersonalData as getpersonalDataCall,
} from "app/api/api_calls";

//获取草稿箱数据
export function getDraftData(params) {
  return {
    type: Types.GET_DRAFTDATA,
    callAPI: () => getDraftDataCall(params)
  }
};

// 草稿箱解除绑定
export function postRelieveDraft(params) {
  return {
    type: Types.POST_RELIEVEDRAFT,
    callAPI: () => postRelieveDraftCall(params)
  }
};

//新建收藏夹
export function postFavoriteItem(params) {
  return {
    type: Types.POST_ADDFAVORITE,
    callAPI: () => postFavoriteItemCall(params)
  }
};

//获取收藏夹列表
export function getFavoriteList(params) {
  return {
    type: Types.GET_FAVORITETAGS,
    callAPI: () => getFavoriteListCall(params)
  }
};

//收藏夹数据
export function getFavoriteItem(params) {
  return {
    type: Types.GET_FAVORITELIST,
    callAPI: () => getFavoriteItemCall(params)
  }
};

//删除收藏夹
export function deleteFavorite(params) {
  return {
    type: Types.POST_DELETEFAVOROTE,
    callAPI: () => deleteFavoriteCall(params)
  }
};

//删除收藏夹图片
export function deleteResource(params) {
  return {
    type: Types.POST_DELETERESROUCE,
    callAPI: () => deleteResourceCall(params)
  }
};

//我的消息列表
export function getMyNewsList(params) {
  return {
    type: Types.GET_MYNEWSLIST,
    callAPI: () => getMyNewsListCall(params)
  }
};

//删除我的消息
export function postDeleteMyNews(params) {
  return {
    type: Types.POST_DELETEMYNEWS,
    callAPI: () => postDeleteMyNewsCall(params)
  }
};

//发送我的消息
export function postToMyNews(params) {
  return {
    type: Types.POST_TOMYNEWS,
    callAPI: () => postToMyNewsCall(params)
  }
};

//获取个人中心数据
export function getpersonalData(params) {
  return {
    type: Types.GET_PERSONALDATA,
    callAPI: () => getpersonalDataCall(params)
  }
};
