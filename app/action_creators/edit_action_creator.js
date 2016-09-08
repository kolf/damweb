import Types from "app/action_types";

import {
  viewEditPic as viewEditPicCall,
  editData as editDataCall,
  allNoPass as allNoPassCall,
  editJoinToSpecial as editJoinToSpecialCall,
  editJoinToSpecialList as editJoinToSpecialListCall,
  editJoinToGroupList as editJoinToGroupListCall,
  editSavePostData as editSavePostDataCall,
  editPostData as editPostDataCall,
  getFavoriteList as getFavoriteListCall,
  postFavoriteItem as postFavoriteItemCall,
  getKeywordbyId as getKeywordbyIdCall,
  findKeyword as findKeywordCall,
  addKeyword as addKeywordCall,
  modifyKeyword as modifyKeywordCall,
  findlocaltion as findlocaltionCall,
  publishPushto as publishPushtoCall,
  pushtoData as pushtoDataCall
} from "app/api/api_calls";

// 查看原图、中图
export function viewEditPic(params) {
  return {
    type: Types.viewEditPic,
    callAPI: () => viewEditPicCall(params)
  }
};

//编审/获取组照数据
export function getEditData(params) {
  return {
    type: Types.EDIT_DATA,
    callAPI: () => editDataCall(params)
  }
};

//编审/获取获取加入专题推荐
export function editJoinToSpecial(params) {
  return {
    type: Types.EDIT_JOINTOSPECIAL,
    callAPI: () => editJoinToSpecialCall(params)
  }
};

//编审/获取加入专题下拉
export function editJoinToSpecialList(params) {
  return {
    type: Types.EDIT_JOINTOSPECIAL_LIST,
    callAPI: () => editJoinToSpecialListCall(params)
  }
};

//编审/获取加入组照下拉
export function editJoinToGroupList(params) {
  return {
    type: Types.EDIT_JOINTOGROUP_LIST,
    callAPI: () => editJoinToGroupListCall(params)
  }
};

//编审/获取收藏夹列表
export function getFavoriteList(params) {
  return {
    type: Types.GET_FAVORITE_LIST,
    callAPI: () => getFavoriteListCall(params)
  }
};

//编审/添加到收藏夹/新建并添加到收藏夹
export function postFavoriteItem(params) {
  return {
    type: Types.POST_FAVORITE_ITEM,
    callAPI: () => postFavoriteItemCall(params)
  }
};

//编审/发布
export function editPostData(params) {
  return {
    type: Types.EDIT_POSTDATA,
    callAPI: () => editPostDataCall(params)
  }
};

//编审/保存
export function editSavePostData(params) {
  return {
    type: Types.EDIT_SAVEDATA,
    callAPI: () => editSavePostDataCall(params)
  }
};

//编审/全部不通过
export function allNoPass(params) {
  return {
    type: Types.POST_ALLNOPASS,
    callAPI: () => allNoPassCall(params)
  }
};

//根据id返回关键词
export function getKeywordbyId(params) {
  return {
    type: Types.GET_KEYWORDBYID,
    callAPI: () => getKeywordbyIdCall(params)
  }
};

// 查看数据库关键词
export function findKeyword(params) {
  return {
    type: Types.FIND_KEYWORDID,
    callAPI: () => findKeywordCall(params)
  }
};

// 新增关键词
export function addKeyword(params) {
  return {
    type: Types.ADD_KEYWORDID,
    callAPI: () => addKeywordCall(params)
  }
};

//查询地点关键词
export function findlocaltion(params) {
  return {
    type: Types.FIND_LOCALTION,
    callAPI: () => findlocaltionCall(params)
  }
};

// 修改关键词
export function modifyKeyword(params) {
  return {
    type: Types.MODIFY_KEYWORDID,
    callAPI: () => modifyKeywordCall(params)
  }
};

//推送
export function pushtoData(params) {
  return {
    type: Types.GET_PUSHTODATA,
    callAPI: () => pushtoDataCall(params)
  }
};

//发布推送
export function publishPushto(params) {
  return {
    type: Types.POST_PUSHTODATA,
    callAPI: () => publishPushtoCall(params)
  }
};