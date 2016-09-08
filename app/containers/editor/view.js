import React, {Component} from "react";
import _                  from "lodash";
import {connect}          from "react-redux";
import ReactDOM           from "react-dom";

import CrumbsBox from "app/components/common/crumbs";
import ThumbnailBox from "app/components/provider/thumbnail";

import Spin from 'antd/lib/spin';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tag from 'antd/lib/tag';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';

import {Modal} from "react-bootstrap/lib";

import {getPostilData, Postil} from "app/action_creators/provider_action_creator";

import {getKeywordbyId} from "app/action_creators/edit_action_creator";

const Panel = Collapse.Panel;

const select = (state) => ({
    "group": state.provider.postilData.group,
    "resource":  state.provider.postilData.resource,
});
@connect(select)

export default class PostilContainer extends Component {

    constructor (props) {
        super(props);
        this.state = {
            "id": this.props.routeParams.id,
            "groupData": {},
            "dataList": [],
            "classifyValue":[],
            "keywordsdoc_name": [],
            "keywordsdoc_kind": [],
            "postil": "",
            "crumbs": [
                {"path": "/home", "text": "首页"},
                {"path": "/editor/view/:id", "text": "图片详情"}
            ],
            "alert":{
				"show": false,
				"isButton": true,
				"bsSize": "small",
				"onHide": this.closeAlert.bind(this),
				"title": null,
				"body": null,
                "param": null,
				"submitAlert": null
			}
        };
        // console.info(this.state);
    };

    componentDidMount() {
        this.queryList();
    };

    render () {
        const {crumbs, id, groupData, dataList, alert} = this.state;
        const {title, category, classifyName, keywords, keywords_group_name, caption} = groupData;

        let _keywordTag = [];
        if(!_.isEmpty(groupData)){
            Object.values(classifyName).map((item,i)=>{
                if (item) _keywordTag.push(<Tag key={"category_"+i}>{item}</Tag>);
            });
            Object.values(keywords_group_name).map((item,i)=>{
                if (item) _keywordTag.push(<Tag key={"keywords_"+i}>{item}</Tag>);
            });
        }

        const alertBox = (
            <Modal {...alert}>
                <Modal.Header closeButton>
                    <Modal.Title>{alert.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{"overflow":"hidden"}} className="textcenter">{alert.body}</Modal.Body>
                {alert.isButton &&
                <Modal.Footer>
                    <Button type="primary" onClick={alert.submitAlert}>确认</Button>
                    <Button type="ghost" onClick={alert.onHide} className="ml-5">取消</Button>
                </Modal.Footer>}
            </Modal>
        );

        return (
            <div className="main-content-inner">

                {alertBox}
				<CrumbsBox crumbs={crumbs} />

                <div className="page-content">
                    <div className="row"><div className="space-6"></div></div>
                    <Button onClick={this.openPostil.bind(this)} type="primary" className="postilButton">批注</Button>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header={"组照ID：" + id} className="postilGroup" key="1">
                            {groupData &&
                                <div>
                                    <Row>
                                        <Col  sm={3} className="textright">组照标题：</Col> 
                                        <Col  sm={18} className="textleft" title={title}>{title}</Col>
                                    </Row>
                                    <Row>
                                        <Col  sm={3} className="textright">分类/关键词：</Col> 
                                        <Col  sm={18} className="textleft">{_keywordTag}</Col> 
                                    </Row>
                                    <Row>
                                        <Col  sm={3} className="textright">组照说明：</Col> 
                                        <Col  sm={18} className="textleft">{caption}</Col> 
                                    </Row>
                                </div>
                            }
                        </Panel>
                    </Collapse>

                    <div className="row"><div className="space-8"></div></div>

                    <ThumbnailBox types="postil" lists={dataList} onThumbnail={this.handleOnThumbnail.bind(this)} />

                </div>
            </div>
        );
    };

    queryList() {
        const {dispatch,params} = this.props;
        console.log(this.props);
        dispatch(getPostilData(params.id)).then(result => {
            if (result.apiError) {
                message.error(result.apiError, 3);
                return false;
            }
            const {resource, group} = this.props;
            let listTmp = [];
            [...resource].map((item, i) => {
                let tmp = {};
                _.mapKeys(item,(val, key)=>{
                    tmp[key] = val;
                });
                listTmp.push(tmp);
            });
            this.state.dataList = listTmp;

            let groupTmp = {};
            _.mapKeys(group, (val, key) => {
                groupTmp[key] = val;
            });
            this.state.groupData = groupTmp;

            this.setKeyword_doc();
        });
    };

    //生成字典&初始化生成字段
    setKeyword_doc() {
        const {dispatch, resource, group} = this.props;
        const List = resource;
        let keywordtag_tmp = "";
        if(group.keywords) {
            keywordtag_tmp += group.keywords + ",";
        }
        if(group.category) {
            keywordtag_tmp += group.category + ",";
        }
        [...List].map((item, i) => {
            if (item.keywords) keywordtag_tmp += item.keywords;
        });
        let keywordsdoc_kind_tmp = {}, keywordsdoc_name_tmp = {}, keywordsgroup_tmp = [];
        dispatch(getKeywordbyId({ 'data': _.uniq( keywordtag_tmp.split(',') ).join(',') })).then(result => {
            if (result.apiError) return false;

            //创建字典
            [...result.apiResponse].map((item, i) => {
                keywordsdoc_name_tmp[item.id] = item.cnname;
                keywordsdoc_kind_tmp[item.id] = item.kind; //种类
            });
            this.state.keywordsdoc_name = keywordsdoc_name_tmp;
            this.state.keywordsdoc_kind = keywordsdoc_kind_tmp;

            //替换分类关键词
            let classifyValue = [],classifyName = {};
            if(group.category)
                [...group.category.split(",")].map(item => {
                    if (item) classifyValue.push({ value: item, label: keywordsdoc_name_tmp[item], halfChecked: true});
                    if(keywordsdoc_name_tmp[item]) { classifyName[item] = keywordsdoc_name_tmp[item]; }
                });
            this.state.classifyValue = classifyValue;
            this.state.groupData.classifyName = classifyName;

            //替换组关键词
            let groupkeywords_arr = [], classify_arr = [],keywords_group_name = {};
            if(group.keywords) groupkeywords_arr = group.keywords.split(",");
            if(group.category) classify_arr = group.category.split(",");
            _.remove(groupkeywords_arr, item => { if (!item || _.indexOf(classify_arr, item) != -1) return true; });

            [...groupkeywords_arr].map(item => {
                if (item) keywordsgroup_tmp.push({ id: item, label: keywordsdoc_name_tmp[item] });
                if(keywordsdoc_name_tmp[item]) { keywords_group_name[item] = keywordsdoc_name_tmp[item]; }
            });
            this.state.groupData.keywords_tag = keywordsgroup_tmp;
            this.state.groupData.keywords_group_name = keywords_group_name;

            //替换图片关键词
            [...List].map((item, i) => {
                let localtion_tmp = [], // 地点
                    people_tmp = [], // 人物
                    format_tmp = [], // 规格
                    theme_tmp = [], // 主题
                    concept_tmp = [], // 概念
                    keywords_name = {};

                //keywords
                [...item.keywords.split(",")].map(item => {
                    if (item) {
                        switch (keywordsdoc_kind_tmp[item]) {
                            case 4://地点
                                localtion_tmp.push({ id: item, label: keywordsdoc_name_tmp[item] });
                                break;
                            case 3://人物
                                people_tmp.push({ id: item, label: keywordsdoc_name_tmp[item] });
                                break;
                            case 2://规格
                                format_tmp.push({ id: item, label: keywordsdoc_name_tmp[item] });
                                break;
                            case 0://主题
                                theme_tmp.push({ id: item, label: keywordsdoc_name_tmp[item] });
                                break;
                            case 1://概念
                                concept_tmp.push({ id: item, label: keywordsdoc_name_tmp[item] });
                                break;
                            default:
                                theme_tmp.push({ id: item, label: keywordsdoc_name_tmp[item] });
                                break;
                        }
                        if(keywordsdoc_name_tmp[item]) { keywords_name[item] = keywordsdoc_name_tmp[item]; }
                    }
                });

                //keywordsAudit
                let keywordsAudit_tmp = [];
                if(item.keywordsAudit)
                    [...item.keywordsAudit.match(/[a-zA-Z\W]+\|[0-9|\,]*\|\d+/g)].map((item, i)=>{
                        console.log(item);
                        const arr = item.split("|");
                        const param = {
                            label: _.trim(arr[0], ","),
                            id: arr[1],
                            type: arr[2]
                        };
                        if(param.type === "3"){//没检测
                            param.label += "✲";
                        }
                        if(param.type === "2"){//多义词
                            param.label += "✻";
                        }
                        if(param.type === "0"){//新词
                            param.label += "✳";
                        }
                        console.log(param.label);
                        keywordsAudit_tmp.push(param);
                    });

                theme_tmp = _.uniq(keywordsAudit_tmp.concat(theme_tmp), "id");
                this.state.dataList[i].keywordsAudit_tmp = keywordsAudit_tmp;
                this.state.dataList[i].localtion_tag = localtion_tmp;
                this.state.dataList[i].people_tag = people_tmp;
                this.state.dataList[i].format_tag = format_tmp;
                this.state.dataList[i].theme_tag = theme_tmp;
                this.state.dataList[i].concept_tag = concept_tmp;
                this.state.dataList[i].keywords_name = keywords_name;

                this.setState({
                    groupData: this.state.groupData,
                    dataList: this.state.dataList
                });

            });

            //this.ThumbnailboxRender();
        });
    };

    handleOnThumbnail({operate ,id, key, value}) {
        const {resource} = this.state;
        resource[key].postil = value;
        this.setState(resource);
    };

    openPostil() {
        const config = {
            "bsSize": "small",
            "title": <samll style={{"fontSize":"14px"}}>批注</samll>,
            "body": <Input type="textarea" placeholder="请输入图片批注" autoComplete="off" row={5} onChange={e => {this.state.postil = e.target.value}}/>,
            "submitAlert": this.submitPostil.bind(this),
            "isButton": true
        };
        this.openAlert(config);
    };

    submitPostil() {
        const {dispatch,params} = this.props;
        const {postil} = this.state;
        
        //{groupId, msg, userId, type}

        dispatch(Postil({
            groupId: params.id,
            msg: postil,
            type: 1
        })).then(result=>{
            if(result.apiError) return false;
            this.closeAlert();
        });

    };

    closeAlert () {
		const alert = Object.assign(this.state.alert, {"show":false});
		this.setState({"alert": alert});
	};

	openAlert(config) {
		const alert = Object.assign(this.state.alert, {"show":true}, config);
		this.setState({"alert": alert});
	};

}




