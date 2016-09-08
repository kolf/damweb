import React, {Component} from "react";
import _                  from "lodash";
import {connect}          from "react-redux";
import {getStorage}       from "app/api/auth_token";

import CrumbsBox from "app/components/common/crumbs";
import ThumbnailBox from "app/components/provider/thumbnail";

import Affix from "antd/lib/affix";
import Spin from 'antd/lib/spin';
import Tag from 'antd/lib/tag';
import ButtonAnt from 'antd/lib/button';
import Input from 'antd/lib/input';

import {Pagination, Modal, Button} from "react-bootstrap/lib";

import {
    getFavoriteItem,
    getFavoriteList,
    deleteFavorite,
    deleteResource,
    postFavoriteItem
} from "app/action_creators/person_action_creator";

const select = (state) => ({
    tagList: state.person.tagList,
    favoriteList: state.person.favoriteList
});
@connect(select)

export default class FavoritesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "tagList": null,
            "favoriteList": null,
            'selectStatus': [],
            "selectedItem": [],
            "crumbs": [
                {"path": "/home", "text": "首页"},
                {"path": "/user", "text": "用户中心"},
                {"path": "/user/favorites", "text": "我的收藏夹"}
            ],
            "favorites": {
                "currentId": "",
                "pageNum": 1,
                "pageSize": 10,
                "maxButtons": 5
            },
            "alert": {
                "show": false,
                "isButton": true,
                "bsSize": "small",
                "onHide": this.closeAlert.bind(this),
                "title": null,
                "body": null,
                "msg": "",
                "param": null,
                "isLoading": false,
                "submitAlert": null
            }
        };
    };

    componentWillMount() {
        this.queryTags();
    };

    render() {
        const {crumbs, favorites, tagList, favoriteList, alert} = this.state;
        const favoritesPages = favoriteList?(favoriteList.pages==0?1:favoriteList.pages):favorites.pageNum;
        return (
            <div className="main-content-inner">

                <CrumbsBox crumbs={crumbs} />

                <Modal {...alert}>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>{alert.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{"overflow":"hidden"}}>{alert.body}</Modal.Body>
                    {alert.isButton &&
                    <Modal.Footer>
                        {alert.msg && <span className="orange pr-10"><i className="ace-icon fa fa-hand-o-right"></i> {alert.msg}</span>}
                        {alert.submitAlert &&
                        <Button bsClass="btn btn-sm btn-info btn-round" disabled={alert.isLoading} onClick={!alert.isLoading ? alert.submitAlert : null}>
                            {alert.isLoading ? 'Loading...' : '确认'}
                        </Button>
                        }
                        <Button bsClass="btn btn-sm btn-light btn-round" onClick={alert.onHide}>取消</Button>
                    </Modal.Footer>
                    }
                </Modal>

                <Overlay show={tooltip.show} target={() => ReactDOM.findDOMNode(tooltip.target) } placement={tooltip.placement}>
                    <Tooltip id="j_tooltip_loading"><i className="ace-icon fa fa-spinner fa-spin orange bigger-100"></i> {tooltip.text}</Tooltip>
                </Overlay>

                <div className="page-content">

                    <div className="text-warning orange mt-10">
                        <i className="ace-icon fa fa-hand-o-right icon-animated-hand-pointer"></i> 收藏夹
                    </div>

                    <div className="dashed-container">
                        {tagList && tagList.map(
                            (tag, i) => <div key={i} className={favorites.currentId==tag.id?'ant-tag ant-tag-blue':'ant-tag'}>
                                <span className="ant-tag-text" onClick={this.handleQueryFavorites.bind(this,tag.id)}>
                                    <i className={favorites.currentId==tag.id?'fa fa-folder-open':'fa fa-folder'}></i> {tag.name}
                                </span>
                                <i className="anticon anticon-cross" onClick={this.deleteTag.bind(this,tag.id)}></i>
                            </div>
                        )}
                        <ButtonAnt size="small" type="dashed" onClick={this.addTag.bind(this) }>+ 新建收藏夹</ButtonAnt>
                    </div>


                    {favorites.currentId && tagList && tagList.length>0 && <div>
                        <Affix className="row operate">
                            <div className="col-xs-7">
                                <button className="btn btn-sm btn-info" onClick={this.selectAll.bind(this) }>
                                    <i className="ace-icon fa fa-copy"></i>全选
                                </button>
                                <button className="btn btn-sm btn-info" onClick={this.selectToggle.bind(this) }>
                                    <i className="ace-icon fa fa-clipboard"></i>反选
                                </button>
                                <span className="line-c"></span>
                                <button className="btn btn-sm btn-info" onClick={this.refresh.bind(this)}>
                                    <i className="ace-icon fa fa-refresh"></i>刷新
                                </button>
                                <button className="btn btn-sm btn-info" onClick={this.deletePhotoId.bind(this) }>
                                    <i className="ace-icon fa fa-trash-o"></i>删除
                                </button>
                                <button className="btn btn-sm btn-info" onClick={this.createGroup.bind(this) }>
                                    新建组照
                                </button>
                            </div>
                            <div className="dataTables_paginate">
                                {
                                    /*
                                     <Pagination
                                     prev
                                     next
                                     first
                                     last
                                     ellipsis
                                     boundaryLinks
                                     items={favoritesPages}
                                     maxButtons={favorites.maxButtons}
                                     activePage={favorites.pageNum}
                                     onSelect={this.favoritesPagination.bind(this)} />*/
                                }
                            </div>
                        </Affix>

                        <div className="row"><div className="space-8"></div></div>

                        <ThumbnailBox
                            types="favorite"
                            animate
                            lists={favoriteList}
                            onThumbnail={this.favoriteChange.bind(this) }
                            setSelectStatus={this.setSelectStatus.bind(this) }
                            selectStatus={this.state.selectStatus} />

                    </div>}

                </div>
            </div>
        );
    };

    queryTags() {
        const {dispatch} = this.props;
        const params = getStorage('userId');
        dispatch(getFavoriteList(params)).then(result => {
            if (result.apiError) {
                this.message(result.apiError.errorMessage);
                return false
            }
            const data = result.apiResponse;
            console.log('data',data,data.length>0);
            let {favorites,tagList} = this.state;
            if(data.length>0){
                favorites.currentId = favorites.currentId?favorites.currentId:data[0].id;
                tagList = data;
                this.setState({ tagList , favorites });
                this.queryFavorites(favorites.currentId);
            }else{
                favorites.currentId = "";
                this.setState({ "tagList": null, favorites });
            }
        });
    };

    queryFavorites(id) {
        const {dispatch} = this.props;
        dispatch(getFavoriteItem(id)).then(result => {
            if (result.apiError) {
                this.message(result.apiError.errorMessage);
                return false
            }
            const {favoriteList} = this.props;
            let len = favoriteList.length;
            this.state.selectStatus = _.fill(Array(len), false);
            this.setState({ favoriteList });
        });
    };

    handleQueryFavorites (id) {
        const {favorites} = this.state;
        if(favorites.currentId!=id) {
            favorites.currentId = id;
            this.setState(favorites);
            this.queryFavorites(id);
        }
    };

    refresh (type,dataParams) {
        const {favorites} = this.state;
        //let tempParams = {};
        //if(type == "pagination") { // pagination
        //    favorites.pageNum = dataParams.pageNum;
        //    Object.assign(tempParams,favorites,filterParams,dataParams);
        //}
        //this.setState({"filterParams":tempParams,"favorites":favorites});
        //if(!dataParams){ // refresh
        //    Object.assign(tempParams,favorites);
        //}
        //delete tempParams.maxButtons;
        this.queryFavorites(favorites.currentId);
    };

    favoritesPagination (pageNum) {
        this.refresh("pagination",{"pageNum":pageNum});
    };

    favoriteChange({key, id, operate}) {
        switch (operate) {
            case "delete":
                this.deletePhotoId(id);
                break;
            default:
                console.log(key, id, operate);
                break;
        }
    };

    setSelectStatus(params) {
        const {selectStatus} = this.state;
        const _selectStatus = Object.assign(selectStatus, params);
        this.setState({
            selectStatus: _selectStatus
        });
        this.setState({ selectedItem: this.getSelectId });
    };

    getSelectId(operate,type) {
        const {selectStatus} = this.state;
        const list = this.state.favoriteList;
        let selectIdList = [];
        [...selectStatus].map((item, i) => {
            if (item) {
                if(operate=="new"){
                    // "group":"photos"
                    if(type=="photos"){
                        const onlineState = list[i].onlineState;
                        if(onlineState!=1){ //  '1已上线2未上线3撤图4冻结 ',
                            selectStatus[i] = false;
                        }else{
                            selectIdList.push(list[i].id);
                        }
                    }
                }else {
                    selectIdList.push(list[i].id);
                }
            }
        });
        return selectIdList;
    };

    selectAll() {
        const {selectStatus} = this.state;
        let len = this.state.favoriteList.length;
        this.state.selectStatus = _.fill(Array(len), true);
        this.setState({ selectedItem: this.getSelectId });
    };

    selectToggle() {
        const {selectStatus} = this.state;
        this.state.selectStatus = [...selectStatus].map((val, i) => { return !val });
        this.setState({ selectedItem: this.getSelectId });
    };

    closeAlert() {
        const alert = Object.assign(this.state.alert, { "show": false, "isLoading": false });
        this.setState({ "alert": alert });
    };

    openAlert(config) {
        const alert = Object.assign(this.state.alert, { "show": true, "isLoading": false, "msg": "" }, config);
        this.setState({ "alert": alert });
    };

    errorAlert(msg) {
        const alert = Object.assign(this.state.alert, { "msg": msg });
        this.setState({ "alert": alert });
    };

    loadingAlert() {
        const config = {};
        config.body = <div className="text-center"><Spin /></div>;
        config.isLoading = true;
        this.openAlert(config);
    };

    submitDeleteTagId (id) {
        this.loadingAlert();
        const {dispatch} = this.props;
        dispatch(deleteFavorite({id})).then(result => {
            if (result.apiError) {
                this.message(result.apiError.errorMessage);
                return false
            }
            const {favorites} = this.state;
            if(favorites.currentId==id) {
                favorites.currentId = "";
                this.setState({ "favoriteList": null, favorites });
            }
            this.queryTags();
            this.closeAlert();
        });
    };

    deleteTag(id) {
        const config = {
            "bsSize": "small",
            "title": <samll style={{"fontSize":"14px"}}>删除收藏夹：ID-{id}</samll>,
            "body": <p className="bolder center grey"><i className="ace-icon fa fa-hand-o-right blue bigger-120"></i>确定要删除此收藏夹？</p>,
            "submitAlert": this.submitDeleteTagId.bind(this,id),
            "isButton": true
        };
        this.openAlert(config);
    };

    addTag() {
        const config = {
            "bsSize": "small",
            "title": <samll style={{"fontSize":"14px"}}>新建收藏夹</samll>,
            "body": <Input id="j_new_favorite" placeholder="请输入新的收藏夹名"/>,
            "submitAlert": this.newFavorite.bind(this),
            "isButton": true
        };
        this.openAlert(config);
    };

    newFavorite() {
        const {dispatch} = this.props;
        const newFavorite = document.getElementById('j_new_favorite').value;
        if(!newFavorite){
            this.errorAlert("请输入新的收藏夹名");
            return false;
        }else{
            this.loadingAlert();
        }
        const params = {
            "favorite": {
                "id": "",
                "name": newFavorite,
                "userId": getStorage('userId')
            },
            "resourceIds": []
        };
        dispatch(postFavoriteItem(params)).then(result=>{
            if(result.apiError) return false;
            this.queryTags();
            this.closeAlert();
        });
    };

    deletePhotoId (id) {
        const msg = _.isString(id)?
        {"title": "删除图片：ID-"+id, "body": "确定要删除此图片？"}:
        {"title": "删除多个图片：", "body": this.getSelectId().length==0?"请选择图片。":"确定要删除这"+this.getSelectId().length+"个图片？"};
        const config = {
            "bsSize": "small",
            "title": <samll style={{"fontSize":"14px"}}>{msg.title}</samll>,
            "body": <p className="bolder center grey"><i className="ace-icon fa fa-hand-o-right blue bigger-120"></i> {msg.body}</p>,
            "submitAlert": this.submitDeletePhotoId.bind(this,(_.isString(id)? parseInt(id):this.getSelectId().join(','))),
            "isButton": true
        };
        this.openAlert(config);
    };

    submitDeletePhotoId(id) {
        const {favorites} = this.state;
        const params = {
            favoriteId: favorites.currentId,
            resourceIds: id
        };
        const {dispatch} = this.props;
        this.loadingAlert();
        dispatch(deleteResource(params)).then(result=>{
            if (result.apiError) {
                this.message(result.apiError.errorMessage);
                return false
            }
            this.queryFavorites(favorites.currentId);
            this.closeAlert();
        });
    };

    createGroup() {
        const type = "photos";
        const ids = this.getSelectId('new',type);
        if (ids && ids.length > 1) {
            window.open("/editor/edit/"+type+"/new/" + ids.join("&"));
        } else {
            const config = {
                "bsSize": "small",
                "title": <samll style={{ "fontSize": "14px" }}>{"新建组照"}</samll>,
                "body": <p className="bolder center grey">
                    <i className="ace-icon fa fa-hand-o-right blue bigger-120"></i>
                    请选择2个以上{type=="group"?'【已编审】的组照':'【已上线】的图片'}~
                </p>,
                "isButton": false
            };
            this.openAlert(config);
        }
    };

    message(msg) {
        const config = {
            "bsSize": "small",
            "title": <samll style={{ "fontSize": "14px" }}>{"提示信息"}</samll>,
            "body": <p className="bolder center grey">{msg}</p>,
            "isButton": false
        };
        this.openAlert(config);
    };

}




