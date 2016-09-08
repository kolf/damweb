import Types  from "app/action_types";
import matchesAction from "./utils/matches_action";
import * as ih       from "./utils/immutable_helpers";

const reviewRecordsTableInit = {
  "idField": "recordsId",
  "head": [
    {
      "field": "createTime",
      "text": "编审时间"
    },
    {
      "field": "userName",
      "text": "编审人"
    },
    {
      "field": "message",
      "text": "具体操作"
    }
  ],
  "list": null,
  "pages": 1,
  "params": null
};

const initialState = ih.immutable({
  "doing": false,
  "error": null,
  "addInEdit": false, //添加到未编审
  "reviewRecordsDataList": {}, //编审记录
  "postilData": {}, //批注
  "providerList": null, //摄影师列表
  "providerdata": null //摄影师信息
});

export default function providerReducer(state = initialState, action) {

  // ADDINEDIT
  if (matchesAction(action, Types.ADDINEDIT.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.ADDINEDIT.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "addInEdit", "done");
  }
  if (matchesAction(action, Types.ADDINEDIT.fail)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "error", action.apiError);
  }

  // REVIEWRECORDSVIEW
  if (matchesAction(action, Types.REVIEWRECORDSVIEW.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.REVIEWRECORDSVIEW.done)) {
    state = ih.set(state, "doing", false);
    reviewRecordsTableInit.list = action.apiResponse;
    state = ih.set(state, "reviewRecordsDataList", reviewRecordsTableInit);
  }
  if (matchesAction(action, Types.REVIEWRECORDSVIEW.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  //GET_POSTILDATA
  if (matchesAction(action, Types.GET_POSTILDATA.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.GET_POSTILDATA.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "postilData", action.apiResponse);
  }
  if (matchesAction(action, Types.GET_POSTILDATA.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  // GET_PROVIDERLIST
  if (matchesAction(action, Types.GET_PROVIDERLIST.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.GET_PROVIDERLIST.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "providerList", action.apiResponse);
  }
  if (matchesAction(action, Types.GET_PROVIDERLIST.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  // GET_PROVIDERBYID
  if (matchesAction(action, Types.GET_PROVIDERBYID.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.GET_PROVIDERBYID.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "providerdata", action.apiResponse);
  }
  if (matchesAction(action, Types.GET_PROVIDERBYID.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  // POST_PROVIDERDATA
  if (matchesAction(action, Types.POST_PROVIDERDATA.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.POST_PROVIDERDATA.done)) {
    state = ih.set(state, "doing", false);
  }
  if (matchesAction(action, Types.POST_PROVIDERDATA.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  // POST_DOWNLOADDATA
  if (matchesAction(action, Types.POST_DOWNLOADDATA.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.POST_DOWNLOADDATA.done)) {
    state = ih.set(state, "doing", false);
  }
  if (matchesAction(action, Types.POST_DOWNLOADDATA.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  return state;
}