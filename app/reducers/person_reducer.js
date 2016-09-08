import Types  from "app/action_types";
import matchesAction from "./utils/matches_action";
import * as ih       from "./utils/immutable_helpers";

const draftInit = {
    "idField": "groupId",
    "isTitle": "title",
    "head": [
        {
            "field": "groupId",
            "text": "组照 ID",
        },
        {
            "field": "firstUrl",
            "text": "组照",
            "type": "image"
        },
        {
            "field": "resCount",
            "text": "组照数量"
        },
        {
            "field": "createTime",
            "text": "上传时间"
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
            "field": "operate",
            "text": "操作",
            "type": "operate",
            "value": [
                { "operate": "editor", "icon": "fa-pencil-square", "text": "编审" },
                { "operate": "relieve", "icon": "fa-hand-peace-o", "text": "解除绑定" }
            ]
        }
    ],
    "list": null,
    "pages": 1,
    "params": null
};

const newsInit = {
    "idField": "groupId",
    "head": [
        {
            "field": "receiveTime",
            "text": "收到时间",
            "type": "checkbox"
        },
        {
            "field": "subject",
            "text": "主题"
        },
        {
            "field": "context",
            "text": "内容"
        },
        {
            "field": "user",
            "text": "发送人"
        },
        {
            "field": "operate",
            "text": "操作",
            "type": "operate",
            "value": [
                { "operate": "delete", "icon": "fa-pencil-square", "text": "删除" },
            ]
        }
    ],
    "list": null,
    "pages": 1,
    "params": null
};

const initialState = ih.immutable({
    "doing": false,
    "error": null,
    "data": null,
    "draftList": null, //获取草稿箱数据
    "tagList": null, //收藏夹列表
    "favoriteList": null, //收藏夹数据
    "newsTable": null //我的消息
});

export default function providerReducer(state = initialState, action) {

    // GET_DRAFTDATA
    if (matchesAction(action, Types.GET_DRAFTDATA.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.GET_DRAFTDATA.done)) {
        state = ih.set(state, "doing", false);
        draftInit.list = action.apiResponse;
        state = ih.set(state, "draftList", draftInit);
    }
    if (matchesAction(action, Types.GET_DRAFTDATA.fail)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "error", action.apiError);
    }

    // POST_RELIEVEDRAFT
    if (matchesAction(action, Types.POST_RELIEVEDRAFT.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.POST_RELIEVEDRAFT.done)) {
        state = ih.set(state, "doing", false);
    }
    if (matchesAction(action, Types.POST_RELIEVEDRAFT.fail)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "error", action.apiError);
    }

    // GET_FAVORITETAGS
    if (matchesAction(action, Types.GET_FAVORITETAGS.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.GET_FAVORITETAGS.done)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "tagList", action.apiResponse);
    }
    if (matchesAction(action, Types.GET_FAVORITETAGS.fail)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "error", action.apiError);
    }

    // GET_FAVORITELIST
    if (matchesAction(action, Types.GET_FAVORITELIST.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.GET_FAVORITELIST.done)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "favoriteList", action.apiResponse);
    }
    if (matchesAction(action, Types.GET_FAVORITELIST.fail)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "error", action.apiError);
    }

    // POST_DELETEFAVOROTE
    if (matchesAction(action, Types.POST_DELETEFAVOROTE.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.POST_DELETEFAVOROTE.done)) {
        state = ih.set(state, "doing", false);
    }
    if (matchesAction(action, Types.POST_DELETEFAVOROTE.fail)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "error", action.apiError);
    }

    // POST_DELETERESROUCE
    if (matchesAction(action, Types.POST_DELETERESROUCE.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.POST_DELETERESROUCE.done)) {
        state = ih.set(state, "doing", false);
    }
    if (matchesAction(action, Types.POST_DELETERESROUCE.fail)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "error", action.apiError);
    }

    // POST_ADDFAVORITE
    if (matchesAction(action, Types.POST_ADDFAVORITE.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.POST_ADDFAVORITE.done)) {
        state = ih.set(state, "doing", false);
    }
    if (matchesAction(action, Types.POST_ADDFAVORITE.fail)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "error", action.apiError);
    }

    // GET_MYNEWSLIST
    if (matchesAction(action, Types.GET_MYNEWSLIST.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.GET_MYNEWSLIST.done)) {
        state = ih.set(state, "doing", false);
        newsInit.list = action.apiResponse;
        state = ih.set(state, "newsTable", newsInit);
    }
    if (matchesAction(action, Types.GET_MYNEWSLIST.fail)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "error", action.apiError);
    }

    // POST_DELETEMYNEWS
    if (matchesAction(action, Types.POST_DELETEMYNEWS.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.POST_DELETEMYNEWS.done)) {
        state = ih.set(state, "doing", false);
    }
    if (matchesAction(action, Types.POST_DELETEMYNEWS.fail)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "error", action.apiError);
    }

    // POST_TOMYNEWS
    if (matchesAction(action, Types.POST_TOMYNEWS.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.POST_TOMYNEWS.done)) {
        state = ih.set(state, "doing", false);
    }
    if (matchesAction(action, Types.POST_TOMYNEWS.fail)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "error", action.apiError);
    }

    // GET_PERSONALDATA
    if (matchesAction(action, Types.GET_PERSONALDATA.request)) {
        state = ih.set(state, "doing", true);
    }
    if (matchesAction(action, Types.GET_PERSONALDATA.done)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "data", action.apiResponse);
    }
    if (matchesAction(action, Types.GET_PERSONALDATA.fail)) {
        state = ih.set(state, "doing", false);
        state = ih.set(state, "error", action.apiError);
    }



    return state;
}