import Types         from "app/action_types";
import matchesAction from "./utils/matches_action";
import * as ih       from "./utils/immutable_helpers";

const filterInit = [
    {//0
        "field": "graphicalType",
        "text": "内容类型：",
        //"type": "checkbox",
        "value": [
            {
                "text": "摄影图片",
                "id": 1
            },
            {
                "text": "插画/漫画",
                "id": 2
            },
            {
                "text": "图表",
                "id": 4
            }
            //,
            //{
            //    "text": "涉华审核",
            //    "id": 5
            //},
            //{
            //    "text": "每日精选",
            //    "id": 6
            //}
        ]
    },
    {//1
        "field": "category",
        "text": "分类：",
        //"type": "checkbox",
        "value": []

    },
    {//2
        "field": "agency",
        "text": "机构：",
        //"type": "checkbox",
        "value": []

    },
    {//3
        "field": "providerId",
        "text": "摄影师：",
        "type": "search",
        "value": []

    },
    {//4
        "field": "uploadTime",
        "text": "上传时间：",
        "type": "time",
        "value": [
            {
                "text": "今日",
                "id": 1
            },
            {
                "text": "昨日",
                "id": 2
            },
            {
                "text": "本周",
                "id": 3
            },
            {
                "text": "上周",
                "id": 4
            }
        ]
    },
    {//5
        "field": "editTime",
        "text": "编审时间：",
        "type": "time",
        "value": [
            {
                "text": "今日",
                "id": 1
            },
            {
                "text": "昨日",
                "id": 2
            },
            {
                "text": "本周",
                "id": 3
            },
            {
                "text": "上周",
                "id": 4
            }
        ]
    },
    {//6
        "field": "editUserId",
        "text": "编审人：",
        "type": "search",
        "value": []
    },
    {//7
        "field": "timeliness",
        "text": "资料/时效：",
        "value": [
            {
                "text": "时效",
                "id": 0
            },
            {
                "text": "资料",
                "id": 1
            }
        ]
    },
    {//8
        "field": "isPostil",
        "text": "批注状态：",
        "value": [
            {
                "text": "未批注",
                "id": 1
            },
            {
                "text": "已批注",
                "id": 0
            }
        ]
    },
    {//9
        "field": "onlineType",
        "text": "上线方式：",
        "value": [
            {
                "text": "人工审核",
                "id": 0
            },
            {
                "text": "系统免审",
                "id": 1
            },
            {
                "text": "下线审核",
                "id": 2
            }
        ]
    },
    {//10
        "field": "graphicalType_create",
        "text": "内容类型：",
        "value": [
            {
                "text": "摄影图片",
                "id": 1
            },
            {
                "text": "插画/漫画",
                "id": 2
            },
            {
                "text": "图表",
                "id": 4
            }
        ]
    },
    {//11
        "field": "qualityRank",
        "text": "图片等级：",
        "value": [
            {
                "text": "A",
                "id": 1
            },
            {
                "text": "B",
                "id": 2
            },
            {
                "text": "C",
                "id": 3
            },
            {
                "text": "D",
                "id": 4
            }
        ]
    },
    {//12
        "field": "authority",
        "text": "图片授权：",
        "value": [
            {
                "text": "RF",
                "id": 1
            },
            {
                "text": "RM",
                "id": 0
            }
        ]
    },
    {//13
        "field": "rejectReason",
        "text": "不通过原因：",
        "value": [
            {
                "text": "创意不通过",
                "id": 0
            },
            {
                "text": "肖像权/物权不通过",
                "id": 1
            }
        ]
    },
    {//14
        "field": "onlineType",
        "text": "入库方式：",
        "value": [
            {
                "text": "非机构免审",
                "id": 1
            },
            {
                "text": "机构免审",
                "id": 0
            }
        ]
    },
    {//15
        "field": "offlineReason",
        "text": "下线原因：",
        "value": [
            {
                "text": "编审未通过",
                "id": 0
            },
            {
                "text": "机构下线",
                "id": 1
            }
        ]
    },
    {//16
        "field": "resGroup",
        "text": "搜索类型：",
        "value": [
            {
                "text": "组照",
                "id": 1
            },
            {
                "text": "图片",
                "id": 2
            }
        ]
    },
    {//17
        "field": "editType",
        "text": "审核类型：",
        "value": [
            {
                "text": "创意审核",
                "id": 1
            },
            {
                "text": "关键词审核",
                "id": 0
            }
        ]
    },
    {//18
        "field": "groupState",
        "text": "编审状态：",
        "value": [
            {
                "text": "未编审",
                "id": 1
            },
            {
                "text": "已编审",
                "id": 4
            }
        ]
    }

];

const takeArray = (array, take) => {
    let tmp = [];
    [...take].map(item => {
        if (array[item]) tmp.push(array[item]);
    });

    return tmp;
};

const editor_storage_1 = takeArray(filterInit, [16,0, 1, 2, 3, 4, 5, 6, 18, 7, 8]);
const editor_storage_2 = takeArray(filterInit, [16,0, 1, 2, 3, 4]);
const editor_publish = takeArray(filterInit, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
const editor_toedit = takeArray(filterInit, [0, 1, 2, 3, 4, 14]);
const editor_offline = takeArray(filterInit, [0, 1, 2, 3, 4, 15, 5, 6, 7, 8]);

const create_toedit = takeArray(filterInit, [0, 2, 3, 4]);
const create_publish = takeArray(filterInit, [17, 9, 10, 2, 3, 4, 5, 6, 11, 12]);
const create_offline = takeArray(filterInit, [17, 10, 2, 3, 4, 5, 6, 11, 12]);
const create_nopass = takeArray(filterInit, [17, 10, 2, 3, 4, 5, 6, 13]);


const initialState = ih.immutable({
    "doing": false,
    "error": null,
    "data": {},
    "searchList": {}
});

export default function filterReducer(state = initialState, action) {

    // EDIT_STORAGE_FILTER
    if (matchesAction(action, Types.EDIT_STORAGE_FILTER.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.EDIT_STORAGE_FILTER.done)) {
        state = ih.set(state, "doing", false);
        const params = action.apiResponse.params;
        if(params.paramType !== 0) {
            state = ih.set(state, "searchList", action.apiResponse);
        }else{
            const resGroup = params.param.resGroup;
            if(resGroup==1){
                state = ih.set(state, "data", editData(editor_storage_1, action.apiResponse));
            }
            if(resGroup==2){
                state = ih.set(state, "data", editData(editor_storage_2, action.apiResponse));
            }
        }
    }
    if (matchesAction(action, Types.EDIT_STORAGE_FILTER.fail)) {
        state = ih.set(state, "error", action.apiError);
        state = ih.set(state, "doing", false);
    }

    // EDIT_PUBLISH_FILTER
    if (matchesAction(action, Types.EDIT_PUBLISH_FILTER.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.EDIT_PUBLISH_FILTER.done)) {
        state = ih.set(state, "doing", false);
        if(action.apiResponse.params.paramType !== 0) {
            state = ih.set(state, "searchList", action.apiResponse);
        }else{
            state = ih.set(state, "data", editData(editor_publish, action.apiResponse));
        }
    }
    if (matchesAction(action, Types.EDIT_PUBLISH_FILTER.fail)) {
        state = ih.set(state, "error", action.apiError);
        state = ih.set(state, "doing", false);
    }

    // EDIT_TOEDIT_FILTER
    if (matchesAction(action, Types.EDIT_TOEDIT_FILTER.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.EDIT_TOEDIT_FILTER.done)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "data", editData(editor_toedit, action.apiResponse));
    }
    if (matchesAction(action, Types.EDIT_TOEDIT_FILTER.fail)) {
        state = ih.set(state, "error", action.apiError);
        state = ih.set(state, "doing", false);
    }

    // EDIT_OFFLINE_FILTER
    if (matchesAction(action, Types.EDIT_OFFLINE_FILTER.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.EDIT_OFFLINE_FILTER.done)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "data", editData(editor_offline, action.apiResponse));
    }
    if (matchesAction(action, Types.EDIT_OFFLINE_FILTER.fail)) {
        state = ih.set(state, "error", action.apiError);
        state = ih.set(state, "doing", false);
    }

    // CREATE_TOEDIT_FILTER
    if (matchesAction(action, Types.CREATE_TOEDIT_FILTER.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.CREATE_TOEDIT_FILTER.done)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "data", editData(create_toedit, action.apiResponse));
    }
    if (matchesAction(action, Types.CREATE_TOEDIT_FILTER.fail)) {
        state = ih.set(state, "error", action.apiError);
        state = ih.set(state, "doing", false);
    }

    // CREATE_PUBLISH_FILTER
    if (matchesAction(action, Types.CREATE_PUBLISH_FILTER.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.CREATE_PUBLISH_FILTER.done)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "data", editData(create_publish, action.apiResponse));
    }
    if (matchesAction(action, Types.CREATE_PUBLISH_FILTER.fail)) {
        state = ih.set(state, "error", action.apiError);
        state = ih.set(state, "doing", false);
    }

    // CREATE_OFFLINE_FILTER
    if (matchesAction(action, Types.CREATE_OFFLINE_FILTER.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.CREATE_OFFLINE_FILTER.done)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "data", editData(create_offline, action.apiResponse));
    }
    if (matchesAction(action, Types.CREATE_OFFLINE_FILTER.fail)) {
        state = ih.set(state, "error", action.apiError);
        state = ih.set(state, "doing", false);
    }

    // CREATE_NOPASS_FILTER
    if (matchesAction(action, Types.CREATE_NOPASS_FILTER.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.CREATE_NOPASS_FILTER.done)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "data", editData(create_nopass, action.apiResponse));
    }
    if (matchesAction(action, Types.CREATE_NOPASS_FILTER.fail)) {
        state = ih.set(state, "error", action.apiError);
        state = ih.set(state, "doing", false);
    }
    return state;
}

const editData = (filterInit, result) => {
    filterInit.map((item, i) => {
        let fieldValue = [];
        if (item.field == "editUserId") {
            fieldValue = result["user"];
        }
        else if (item.field == "providerId") {
            fieldValue = result["photographer"];
        }
        // else if (item.field == "agency") {
        //     fieldValue = result["categoryProviders"];
        // }
        else {
            fieldValue = result[item.field];
        }

        // console.log(item.field,fieldValue);
        let arg = [];
        if (item.field == "category" || item.field == "editUserId") {
            fieldValue.map((item) => {
                const obj = {};
                obj.id = item.id;
                obj.text = item.name;
                arg.push(obj);
            })
        }
        if (item.field == "providerId" || item.field == "agency") {
            fieldValue.map((item) => {
                const obj = {};
                obj.id = item.id + ",";
                obj.text = item.nameCn;
                arg.push(obj);
            })
        }
        if (fieldValue) {
            filterInit[i].value = arg;
        }
    });

    return filterInit;
};

