import Types         from "app/action_types";
import matchesAction from "./utils/matches_action";
import * as ih       from "./utils/immutable_helpers";

const tableInit = {
  "idField": "id",
  "isTitle": "title",
  "head": [
    {
      "field": "id",
      "text": "ID",
      "status": false,
      "type": "checkbox"
    },
    {
      "field": "ossId2",
      "text": "组照",
      "type": "image"
    },
    {
      "field": "total",
      "text": "数量",
      "type": "status",
      "isFun": "callbackStatusTotal"
    },
    //{
    //  "field": "groupState",
    //  "text": "状态",
    //  "type": "status",
    //  "value": {1:"新入库",2:"未编审",3:"二审",4:"已编审"}
    //},
    {
      "field": "createTime",
      "text": "上传时间"
    },
    {
      "field": "editTime",
      "text": "编审时间"
    },
    {
      "field": "providerName",
      "text": "供应商"
    },
    {
      "field": "collectionName",
      "text": "品牌"
    },
    {
      "field": "accountName",
      "text": "编审人"
    },
    {
      "field": "operate",
      "text": "操作",
      "type": "operate",
      "value": []
    }
  ],
  "list": null,
  "pages": 1,
  "params": null
};

const tableInit2 = [
  //{"operate":"view", "icon":"fa-eye", "text":"查看"},
  {"operate":"editor", "icon":"fa-pencil-square", "text":"编审"},
  {"operate":"comment", "icon":"fa-list", "text":"批注记录"},
  {"operate":"reviewRecords", "icon":"fa-outdent", "text":"编审记录"}
];

const tableInit1 = [
  //{"operate":"view", "icon":"fa-eye", "text":"查看"},
  {"operate":"editor", "icon":"fa-pencil-square", "text":"编审"}
];

const tableInit3 = [
  //{"operate":"view", "icon":"fa-eye", "text":"查看"},
  {"operate":"editor", "icon":"fa-pencil-square", "text":"编审"},
  {"operate":"addTopics", "icon":"fa-puzzle-piece", "text":"添加到专题"},
  {"operate":"comment", "icon":"fa-list", "text":"批注记录"},
  {"operate":"reviewRecords", "icon":"fa-outdent", "text":"编审记录"},
  {"operate":"offline", "icon":"arrow-circle-down", "text":"下线"}
];


const initialState = ih.immutable({
  "doing": false,
  "error": null,
  "dataList": {}
});

export default function editorReducer (state = initialState, action) {

  // EDIT_STORAGE_DATA
  if (matchesAction(action, Types.EDIT_STORAGE_DATA.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.EDIT_STORAGE_DATA.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "dataList", action.apiResponse);
  }
  if (matchesAction(action, Types.EDIT_STORAGE_DATA.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  // EDIT_OFFLINE_DATA
  if (matchesAction(action, Types.EDIT_OFFLINE_DATA.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.EDIT_OFFLINE_DATA.done)) {
    state = ih.set(state, "doing", false);
    state = ih.set(state, "dataList", action.apiResponse);
  }
  if (matchesAction(action, Types.EDIT_OFFLINE_DATA.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  // EDIT_TOEDIT_DATA
  if (matchesAction(action, Types.EDIT_TOEDIT_DATA.request)) {
    state = ih.set(state, "doing", true);
  }
  if (matchesAction(action, Types.EDIT_TOEDIT_DATA.done)) {
    state = ih.set(state, "doing", false);
    const params = action.apiResponse.params;
    // groupState  '1 新入库、2未编审、3二审,4已编审',
    // onlineState '1已上线2未上线3撤图4冻结 ',
    if(params.groupState==3){ // 二审
      const len = tableInit.head.length;
      tableInit.head[1].field = "firstUrl";
      tableInit.head[len-1].value = tableInit2;
    }
    if(params.onlineState==1){ // 已上线
      const len = tableInit.head.length;
      tableInit.head[1].field = "firstUrl";
      tableInit.head[len-1].value = tableInit3;
    }
    if(params.onlineState==3){ // 已下线
      const len = tableInit.head.length;
      tableInit.head[1].field = "ossId2";
      tableInit.head[len-1].value = tableInit1;
    }
    Object.assign(tableInit, action.apiResponse);
    state = ih.set(state, "dataList", tableInit);
  }
  if (matchesAction(action, Types.EDIT_TOEDIT_DATA.fail)) {
    state = ih.set(state, "error", action.apiError);
    state = ih.set(state, "doing", false);
  }

  return state;
}