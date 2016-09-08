import Api from "./api";
import { passportUrl, editorUrl, cmsTopicUrl, cmsAdUrl } from "./api_config.js"

//editGroup/startEdit?editType=1&groupIds=1%2C2 编审列表
//editGroup/pageList 结果集
//editGroup/batchUpdate 添加到未编审
//editGroup/allNoPass 全部不通过
//editGroup/save 编审保存 >0 张上线的就隐藏按钮
//editGroup/publish 编审发布 2加入组照移动  3 加入专题 4 二审 5直接发布
//favorite/list?userId=1 收藏夹列表
//favorite/create 新建/新建并加入收藏夹
//favorite/delete 删除收藏夹
//favorite/deleteResource 删除收藏夹图片
//favorite/findResourceById?id=123 收藏夹数据x
//param/pageList?paramType=3 筛选列表0 全部 1 分类 {"graphicalType":4}（分类1、2、4） 2 供应商 3 个人摄影师 {"size":10,"searchName":"Yonhap"//搜索框} 4 编审人 5 机构 {picType：1编辑 2创意, category: 父id} 
//editHistory/list?groupId=x&&type=1 编审记录 type:{1:中文，2:英文} 
//userBox/delete 收藏夹解除绑定
//userBox/list 收藏夹列表
//editGroup/unOnline 下线 {groupId：}
//editGroup/isCurrentEdit?groupIds= 判断是否在编审
//editGroup/view?groupId=100455 批注数据
//postilHistory/list?groupId=x 批注历史 get
//postilHistory/create 批注 {groupId，msg，userId, type}
//user/viewByToken?token= 获取用户信息
//editGroup/joinTopic 加入专题接口 {groupId:,topicId,productId}
//vcgCategoryTopicProduct/listByTopic?topicId= 获取专题对应的产品 get
//enEditGroup/addEnGroup?gid= post 添加到海外
//thirdEditGroup/startEdit?groupId= 推送数据

const dev = true;

const ApiCalls = {

    signIn(params) {
        return Api.post({
            absolutePath: passportUrl + "/vcglogin/login",
            body: params,
            ignoreAuthFailure: true,
            ContentType: 'application/x-www-form-urlencoded',
            parse: function (res) {
                if (res.body && res.body.status == 200) {
                    this.done(res.body);
                } else {
                    // res.body.message
                    this.fail({ errorMessage: "用户名或密码错误，请重新试试" });
                }
            }
        });
    },

    // 获取用户信息
    getUserInfo(params) {
        let stringify = [], key;
        for (key in params) {
            stringify.push(key + "=" + params[key]);
        }
        return Api.get({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/user/viewByToken?" + stringify.join('&')),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body && res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    // res.body.message
                    this.fail({ errorMessage: res.body.msg });
                }
            }
        });
    },

    // 筛选列表
    filterList(params) {
        return Api.post({
            path: "/param/filter?paramType=" + params.paramType,
            absolutePath: dev && (editorUrl + "/param/pageList?paramType=" + params.paramType),
            body: params.param,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    // 筛选结果集
    storageSearch(params) {
        return Api.post({
            path: "/editor/list",
            absolutePath: dev && (editorUrl + "/editGroup/pageList"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    // 下线结果集
    getOfflineData(params) {
        return Api.post({
            path: "/editor/nopass",
            absolutePath: dev && (editorUrl + "/resource/noPass"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    // 创意类筛选结果集
    createSearch(params) {
        console.log(params)
        return Api.post({
            path: "/create/list",
            absolutePath: dev && (editorUrl + "/resource/creativeList"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    // 添加到未编审
    addInEditPost(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/editGroup/batchUpdate"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 编审数据
    editData(params) {
        const {type,operate, ids, isDraft} = params;
        let api;
        if (isDraft) api = "startBoxEdit?groupId=" + ids;
        if (type=="group") api = "startEdit?editType=" + operate + "&groupIds=" + ids.join("\%2C");
        if (type=="photos") api = "startEditFromResIds?editType=" + operate + "&ids=" + ids.join("\%2C");
        return Api.get({
            path: "/edit/examine_test",
            absolutePath: dev && (editorUrl + "/editGroup/" + api),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200 && res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 查看原图、中图
    viewEditPic(params) {
        console.log(params);
        const url = params.type === 'origin' ? '/resource/viewYuantu' : '/resource/viewMidTu';
        return Api.get({
            absolutePath: dev && (editorUrl + url + '?resouceId=' + params.resouceId),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200 && res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 发布
    editPostData(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/editGroup/publish"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //编审状态判断
    isEdit(params) {
        return Api.get({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/editGroup/isCurrentEdit?groupIds=" + params.groupIds),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 保存
    editSavePostData(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/editGroup/save"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200 && res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 编辑类组下线
    editgroupOffline(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/editGroup/unOnline"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 编辑类组上线
    editgrouppublish(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/editGroup/online"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },


    // 关键词查询
    getKeywordbyId(params) {
        return Api.post({
            path: "/person/index",
            absolutePath: dev && (editorUrl + "/proxy/post?url=cfp/keyword/get/ids"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.ifSuccess) {
                    this.fail({ errorMessage: res.body.message });
                } else {
                    this.done(res.body);
                }
            }
        });
    },

    // 查看关键词
    findKeyword(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/proxy/post?url=cfp/kw/find"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.ifSuccess) {
                    this.fail({ errorMessage: res.body.message });
                } else {
                    this.done(res.body);
                }
            }
        });
    },
    // {"name":"无人","kind":0}
    // 0：主题1：概念2：规格3：人物4：地点9：分类
    // 创意类有个规格

    //新增关键词
    addKeyword(params) {
        let _params = {
            "ensyno": [],
            "memo": "",
            "cnname": "",
            "cnsyno": [],
            "kind": "0",
            "enname": ""
        };
        Object.assign(_params, params);
        return Api.post({
            path: "/person/index",
            absolutePath: dev && (editorUrl + "/proxy/post?url=cfp/keyword/add"),
            body: _params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.success) {
                    this.done(res.body);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 修改关键词
    modifyKeyword(params) {
        let _params = {
            "id": "",
            "ensyno": [],
            "memo": "",
            "cnname": "",
            "cnsyno": [],
            "kind": "0",
            "enname": ""
        };
        Object.assign(_params, params);
        return Api.post({
            path: "/person/index",
            absolutePath: dev && (editorUrl + "/proxy/post?url=cfp/keyword/modify"),
            body: _params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.success) {
                    this.done(res.body);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 地点查询 编辑类
    findlocaltion(params) {
        // {"id":"123","pid":"456","type":"1","name":"中国"}
        Object.assign(_params, params);
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/proxy/post?url=location/find"),
            body: _params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.success) {
                    this.done(res.body);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 全部不通过
    allNoPass(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/editGroup/allNoPass"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //收藏夹列表
    getFavoriteList(params) {
        return Api.get({
            path: "/edit/favoriteList",
            // absolutePath: dev? editorUrl + "/favorite/list?userId="+params),
            absolutePath: dev && (editorUrl + "/favorite/list?userId=" + params),
            //body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200 && res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //新建并加入收藏夹
    postFavoriteItem(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/favorite/create"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //收藏夹列表
    getFavoriteItem(params) {
        return Api.get({
            path: "/person/favoriteSource",
            absolutePath: dev && (editorUrl + "/favorite/findResourceById?id=" + params),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200 && res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //删除收藏夹
    deleteFavorite(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/favorite/delete"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //删除收藏夹图片
    deleteResource(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/favorite/deleteResource"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //编审记录
    reviewRecordsView(params) {
        // console.error("reviewRecordsView");
        return Api.get({
            path: "/param/reviewRecordsList",
            absolutePath: dev && (editorUrl + "/editHistory/list?groupId=" + params.id + "&&type=" + params.type),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },


    //批注
    Postil(params) {
        return Api.post({
            path: "/edit/examine_test",
            absolutePath: dev && (editorUrl + "/postilHistory/create"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    //获取批注数据
    getPostilData(params) {
        return Api.get({
            path: "/edit/examine_test",
            absolutePath: dev && (editorUrl + "/editGroup/view?groupId=" + params),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    //批注历史
    getPostilhistory(params) {
        return Api.get({
            path: "/param/reviewRecordsList",
            absolutePath: dev && (editorUrl + "/postilHistory/list?groupId=" + params.id + "&&type=" + params.type),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    //获取草稿箱数据
    getDraftData(params) {
        return Api.get({
            path: "/person/draft",
            absolutePath: dev && (editorUrl + "/userBox/list?userId=" + params),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    //草稿箱解除绑定
    postRelieveDraft(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + "/userBox/delete"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    //我的消息列表
    getMyNewsList(params) {
        return Api.get({
            path: "/person/news",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    //删除我的消息
    postDeleteMyNews(params) {
        return Api.post({
            path: "/param/postdata",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    //发送我的消息
    postToMyNews(params) {
        return Api.post({
            path: "/param/postdata",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    // 个人中心数据
    getpersonalData(params) {
        return Api.post({
            path: "/person/index",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },



    // 创意类发布
    postCreativeState(params) {
        return Api.post({
            path: "/param/postdata",
            absolutePath: dev && (editorUrl + '/resource/creativePublish'),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 获取摄影师列表
    getProviderList(params) {
        return Api.post({
            path: "/provider/providerList",
            // absolutePath: dev? editorUrl + '/resource/creativePublish),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 获取摄影师信息
    getProviderById(params) {
        return Api.post({
            path: "/provider/provider",
            // absolutePath: dev? editorUrl + '/resource/creativePublish),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 提交上传信息
    postProviderData(params) {
        return Api.post({
            path: "/param/postdata",
            // absolutePath: dev? editorUrl + '/resource/creativePublish),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 下载getty图片
    postdownLoadphoto(params) {
        return Api.post({
            path: "/param/postdata",
            // absolutePath: dev? editorUrl + '/resource/creativePublish),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    // 获取常用专题列表
    editJoinToSpecial(params) {
        return Api.get({
            path: "/edit/jointospecial",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/list_topic_info?page=1&nums=20&focus=2'),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //专题模糊搜索下拉
    editJoinToSpecialList(params) {
        return Api.post({
            path: "/edit/jointospeciallist",
            absolutePath: dev && (cmsAdUrl + '/v1/search/topic'),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.status == 1) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //获取专题对应的产品
    getProductId(params) {
        return Api.get({
            path: "/edit/jointospeciallist",
            absolutePath: dev && (editorUrl + '/vcgCategoryTopicProduct/listByTopic?topicId=' + params),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //添加到专题
    //{groupId:,topicId,productId}
    addtoTopic(params) {
        return Api.post({
            path: "/edit/jointospeciallist",
            absolutePath: dev && (editorUrl + '/editGroup/joinTopic'),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //添加到海外
    addToOverseas(params) {
        return Api.get({
            path: "/edit/jointospeciallist",
            absolutePath: dev && (editorUrl + '/enEditGroup/addEnGroup?gid=' + params),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    //推送
    pushtoData(params) {
        return Api.get({
            path: "/edit/jointospeciallist",
            absolutePath: dev && (editorUrl + '/thirdEditGroup/startEdit?groupId=' + params),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    }, 

    //发布推送
    publishPushto(params) {
        return Api.post({
            path: "/edit/jointospeciallist",
            absolutePath: dev && (editorUrl + '/thirdEditGroup/publish'),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    invalid() {
        return Api.get({
            path: "/login/invalid",
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    topicsFilter() {
        return Api.get({
            path: "/param/filter",
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    topicsSearch(params) {
        return Api.post({
            path: "/topics/topicsList",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    topicsAuto(params) {
        return Api.post({
            path: "/topics/topicsAuto",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    topicsView(params) {
        return Api.post({
            path: "/topics/topicsView",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    topicsDelete(params) {
        return Api.post({
            path: "/editor/editorMerge",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    topicsUpdate(params) {
        return Api.post({
            path: "/editor/editorMerge",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    storageEditStatus(params) {
        return Api.post({
            path: "/storage/editstatus",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    searchRsList(params) {
        return Api.post({
            path: params.api,
            body: params.data,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200 && res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    editJoinToGroupList(params) {
        return Api.post({
            path: "/edit/jointogrouplist",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200 && res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    cmsTopicUrlStatus(params) {
        return Api.get({
            path: "/param/filter",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms/topicStatus/' + params.topicId),
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    cmsSearch(params) {
        let stringify = [], key;
        for (key in params) {
            stringify.push(key + "=" + params[key]);
        }
        return Api.get({
            path: "/cms/topicsList",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms_topic_list?' + stringify.join('&')),
            // body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.status == 1) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    cmsFilter(params) {
        return Api.get({
            path: "/param/filter",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/list_category_by_pid?pid=0'),
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.status == 1) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    topicFrequency(params) {
        return Api.post({
            path: "/param/filter",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms/topicUseRate/' + params.topicId),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    topicCfg(params) {
        return Api.post({
            path: "/cms/topicCfg",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    getBasicInfo(params) {
        return Api.get({
            path: "/cms/topicCfg",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms/topicBaseInfo/' + params.topicId),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    saveBasicInfo(params) {
        console.log("data1",params);
        let method = 'post', topicPath = '';
        if (params.topicId != 0) {
            method = 'put';
            topicPath = '/' + params.topicId;
        }
        return Api[method]({
            path: "/cms/topicCfg",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms/topicBaseInfo' + topicPath),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                console.log("data",res.body);
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    bsFetch(params) {
        return Api.get({
            path: "/cms/topicCfg",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms/topicCatchInfo/' + params.topicId),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    saveFetch(params) {
        return Api.post({
            path: "/cms/topicCfg",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms/topicCatchInfo/' + params.topicId),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    feFilter(params) {
        return Api.get({
            path: "/cms/topicCfg",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms/topicFilterInfo/' + params.topicId),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    saveFilter(params) {
        return Api.post({
            path: "/cms/topicCfg",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms/topicFilterInfo/' + params.topicId),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    publicTopic(params) {
        return Api.post({
            path: "/cms/topicCfg",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms/publicTopic/' + params.topicId),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    publicAd(params) {
        return Api.post({
            path: "/cms/topicCfg",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/channel/publicAdInfo/' + params.id),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    publicRecommend(params) {
        return Api.post({
            path: "/cms/topicCfg",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/channel/publicRecommendList/' + params.id),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    picInfo(params) {
        return Api.get({
            path: "/cms/topicCfg",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/channel/getPicInfoById/' + params.resourceId + '?resourceType=' + params.resourceType),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    cmsChannelList(params) {
        return Api.get({
            path: "/cms/channelList",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/' + params.pageClass + '/list'),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    channelCfg(params) {
        return Api.post({
            path: "/cms/channelCfg",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    scrollList(params) {
        return Api.post({
            path: "/cms/scrollList",
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    picList(params) {
        let method = params.method || 'get';
        return Api[method]({
            path: "/cms/picList",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/page/' + params.id + '/' + params.type),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    adPicList(params) {
        let method = params.method || 'get';
        return Api[method]({
            path: "/cms/picList",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/channel/channelAdInfo/' + params.id),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    recommendPicList(params) {
        let method = params.method || 'get';
        return Api[method]({
            path: "/cms/picList",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/channel/channelRecommend/' + params.id),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    deletePic(params) {
        return Api.delete({
            path: "/cms/picList",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/page/' + params.id),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    deleteAdPic(params) {
        return Api.delete({
            path: "/cms/picList",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/channel/channelAdInfo/' + params.id),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },

    cmsContentFilter(params) {
        return Api.get({
            path: "/cms/contentFilter",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms/topicFilterInfo/' + params.topicId),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    cmsContentSearch(params) {
        return Api.post({
            path: "/cms/contentList",
            absolutePath: dev && (cmsTopicUrl + '/v1/topic/cms/topicContentManage/' + params.topicId),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    tagData(params) {
        let method = params.method || 'get';

        return Api[method]({
            path: "/cms/contentList",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/pageTabs/' + params.id),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    tagPicList(params) {
        let method = params.method || 'get';
        const pathDic = {
            'get': 'get',
            'post': 'set'
        };
        return Api[method]({
            path: "/cms/contentList",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/' + pathDic[method] + 'TabPic/' + params.id),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    deleteTag(params) {
        return Api.delete({
            path: "/cms/contentList",
            absolutePath: dev && (cmsAdUrl + '/v1/cms/pageTabs/' + params.id),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200) {
                    res.body.data.params = params;
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }

            }
        });
    },

    // tag bengin
    tagQuery(params) { // query [use]
        const type = params.type == "tagEditor" ? "cfp" : "gc";
        delete params.type;
        return Api.post({
            path: "/tag/query",
            absolutePath: dev && (editorUrl + "/proxy/post?url=" + type + "/keyword/find/list"),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body && res.body.total > 0) {
                    this.done(res.body);
                } else {
                    this.fail({ errorMessage: res.body.msg });
                }
                //console.log(res.body);
            }
        })
    },

    tagSave(params) { // create edit [use]
        const flag = params.data.id ? "edit" : "create";
        const type = params.data.type == "tagEditor" ? "cfp" : "gc";
        let url = "";
        if (flag == "create") {
            url = type + "/keyword/add";
        }
        if (flag == "edit") {
            url = type + "/keyword/modify";
        }
        delete params.data.type;
        return Api.post({
            path: "/tag/save",
            absolutePath: dev && (editorUrl + "/proxy/post?url=" + url),
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.success) {
                    this.done(res.body);
                }
                if (!res.body.ifSuccess) {
                    this.fail({ errorMessage: res.body.msg });
                }
                //console.log(res.body);
            }
        });
    },
    tagView(params) { // view id [not use]
        return Api.post({
            path: "/tag/view",
            //absolutePath: tagURL + '/cfp/keyword/get/id',
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200 && res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },
    tagExpand(params) { // expand pid [not use]
        return Api.post({
            path: "/tag/expand",
            //absolutePath: tagURL + '/tag/expand',
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200 && res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },
    tagDelete(params) { // delete id [not use]
        return Api.post({
            path: "/tag/delete",
            //absolutePath: tagURL + '/cfp/keyword/delete',
            body: params,
            ignoreAuthFailure: true,
            parse: function (res) {
                if (res.body.code == 200 && res.body.data) {
                    this.done(res.body.data);
                } else {
                    this.fail({ errorMessage: res.body.message });
                }
            }
        });
    },
    // tag end


};


export default ApiCalls;