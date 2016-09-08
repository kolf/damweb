import Types         from "app/action_types";
import matchesAction from "./utils/matches_action";
import * as ih       from "./utils/immutable_helpers";

const initialState = ih.immutable({
  "doing": false,
  "error": null,
  "data": {},
  "pushtoData": {},
  "special": {},
  "specialList": {},
  "groupList": {},
  "favoriteList": {},
  "keywords": null
});

export default function edit (state = initialState, action) {
  
  // EDIT_DATA
  if (matchesAction(action, Types.EDIT_DATA.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.EDIT_DATA.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "error", false);
    state = ih.set(state, "data", action.apiResponse);
  }
  if (matchesAction(action, Types.EDIT_DATA.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  // GET_PUSHTODATA
  if (matchesAction(action, Types.GET_PUSHTODATA.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.GET_PUSHTODATA.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "error", false);
    state = ih.set(state, "pushtoData", action.apiResponse);
  }
  if (matchesAction(action, Types.GET_PUSHTODATA.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }
  
  //EDIT_JOINTOSPECIAL/加入专题推荐
  if (matchesAction(action, Types.EDIT_JOINTOSPECIAL.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.EDIT_JOINTOSPECIAL.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "error", false);
    state = ih.set(state, "special", action.apiResponse);
  }
  if (matchesAction(action, Types.EDIT_JOINTOSPECIAL.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  //EDIT_JOINTOSPECIAL_LIST/加入专题下拉
  if (matchesAction(action, Types.EDIT_JOINTOSPECIAL_LIST.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.EDIT_JOINTOSPECIAL_LIST.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "error", false);
    state = ih.set(state, "specialList", action.apiResponse);
  }
  if (matchesAction(action, Types.EDIT_JOINTOSPECIAL_LIST.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  //EDIT_JOINTOGROUP_LIST/加入组照下拉
  if (matchesAction(action, Types.EDIT_JOINTOGROUP_LIST.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.EDIT_JOINTOGROUP_LIST.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "error", false);
    state = ih.set(state, "groupList", action.apiResponse);
  }
  if (matchesAction(action, Types.EDIT_JOINTOGROUP_LIST.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  //GET_FAVORITE_LIST/获取收藏夹名列表
  if (matchesAction(action, Types.GET_FAVORITE_LIST.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.GET_FAVORITE_LIST.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "error", false);
    state = ih.set(state, "favoriteList", action.apiResponse);
  }
  if (matchesAction(action, Types.GET_FAVORITE_LIST.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  //GET_KEYWORDBYID/根据id获取关键词
  if (matchesAction(action, Types.GET_KEYWORDBYID.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.GET_KEYWORDBYID.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "error", false);
    state = ih.set(state, "keywords", action.apiResponse);
  }
  if (matchesAction(action, Types.GET_KEYWORDBYID.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  //EDIT_POSTDATA


  return state;
  
}
