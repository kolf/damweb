import React, {Component, PropTypes}    from "react";
import {connect}                        from "react-redux";
import ReactDOM           from "react-dom";
import moment             from "moment";
import _                  from "lodash";

import CrumbsBox          from "app/components/common/crumbs";
import ThumbnailBox       from "app/components/provider/thumbnail";
import Wizard, {Step}     from "app/components/provider/wizard";
import ComboBox           from "app/components/provider/combobox";
import {Panel, Collapse, Modal} from "react-bootstrap/lib";
import {editorUrl}        from "app/api/api_config.js"


import {
    Cascader, Affix, DatePicker, Form,
    Button, Input, Select, Radio, Switch,
    Spin, message, TreeSelect
} from 'antd';

import {EditStep2_1} from 'app/components/edit/Step2_1';
import {EditStep2_2} from 'app/components/edit/Step2_2';
import {WizardStep3} from 'app/components/edit/Step3';

import {
    viewEditPic,
    getEditData,
    editPostData,
    editSavePostData,
    getFavoriteList,
    postFavoriteItem,
    allNoPass,
    getKeywordbyId,
    findKeyword,
    addKeyword,
    modifyKeyword,
    findlocaltion
} from "app/action_creators/edit_action_creator";

const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const SHOW_ALL = TreeSelect.SHOW_ALL;
const SHOW_CHILD  = TreeSelect.SHOW_CHILD ;

const Step2_1 = createForm()(EditStep2_1);
const Step2_2 = createForm()(EditStep2_2);

function noop() {
    return false;
}

const edit = (state) => ({
    "List": state.edit.data.resource,
    "group": state.edit.data.group,
    "keywords": state.edit.keywords
});
@connect(edit)

export default class EditorEditContainer extends Component {

    constructor(props) {
        super(props);
        //{type,operate, ids}
        const operate = props.params.operate;
        let crumbsText = "";
        if(operate=="new"){crumbsText="新建组照：";}
        if(operate=="merge"){crumbsText="合并组照：";}
        //if(operate=="edit"){crumbsText="？？？";}
        const crumbsValue = crumbsText +"共"+props.params.ids.split("&").length+"个" + (props.params.type == "group"?"组照":"图片") + "编审";
        this.state = {
            "dataList": null,//所有的图片信息
            "selectedItem": {},//被选的图片ID
            "selectedList": [],//第二步中dataList
            "pubulishData": {},//发布选项
            "groupData": {},
            "keywords": [],
            "keywordsdoc_name": [],
            "keywordsdoc_kind": [],
            "routeParams": {},
            "crumbs": [
                { "path": "/home", "text": "首页" },
                { "path": "editor/edit/:type/:operate/:ids", "text": crumbsValue }
            ],
            "selectStatus": [],
            "classifyValue": [],
            "wizardConfig": [
                {
                    "title": "图片审核",
                    "contentText": <h3 className="green">组照审核的内容（如果没有render方法则显示这个。。。</h3>,
                    "stepRender": this.RenderStep_1.bind(this),
                    "componentDid": this.ThumbnailboxRender.bind(this)
                },
                {
                    "title": "文字编辑",
                    "contentText": <h3 className="green"> 加载失败... </h3>,
                    "stepRender": this.RenderStep_2.bind(this)
                },
                {
                    "title": "发布操作",
                    "contentText": <h3 className="green">发布成功了喂~</h3>,
                    "stepRender": this.RenderStep_3.bind(this)
                }
            ],
            "param": {
                "nextAction_1": this.nextAction_1.bind(this),
                "pubulish": this.pubulish.bind(this)
            },
            "alert": {
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
    };

    componentDidMount() {
        const {group, params} = this.props;
        const {type,operate, ids} = params;

        let _operate, _ids, isDraft = false;
        switch (operate) {
            case "new":
                _operate = 1;
                break;
            case "merge":
                _operate = 2;
                break;
            case "edit":
                _operate = 3;
                break;
            default:
                _operate = 3;
                break;
        }

        if (operate.indexOf("draft") >= 0) { isDraft = true }

        _ids = ids.split("&");
        this.state.routeParams = {
            type: type,
            operate: _operate,
            ids: _ids,
            isDraft
        };
        this.queryList();
        this.state.groupData = group;

    };

    componentWillUnmount () {
        if (document.getElementById('classify')) ReactDOM.render(<div></div>, document.getElementById('classify'));//分类
        if (document.getElementById('selectNum')) ReactDOM.render(<div></div>, document.getElementById('selectNum'));//数字标记
        if (document.getElementById('step2_1')) ReactDOM.render(<div></div>, document.getElementById('step2_1'));//组照第二步第一
        if (document.getElementById('thumbnailBox')) ReactDOM.render(<div></div>, document.getElementById('thumbnailBox'));//第一步
        //if (document.getElementById('wizard-container')) ReactDOM.render(<div></div>, document.getElementById('wizard-container'));
    };

    render() {
        const {crumbs, alert,param,wizardConfig} = this.state;
        const alertBox = (
            <Modal {...alert}>
                <Modal.Header closeButton>
                    <Modal.Title>{alert.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ "overflow": "hidden" }} className="textcenter">{alert.body}</Modal.Body>
                {alert.isButton &&
                    <Modal.Footer>
                        <Button type="primary" onClick={alert.submitAlert}>确认</Button>
                        <Button type="ghost" onClick={alert.onHide} className="ml-5">取消</Button>
                    </Modal.Footer>}
            </Modal>
        );
        return (
            <div className="main-content-inner">

                <CrumbsBox crumbs={crumbs} />

                {alertBox}

                <Wizard {...param}>
                    {[...wizardConfig].map((step, i) => {
                        return (
                            <Step key={i + 1} {...step} />
                        )
                    }) }
                </Wizard>

            </div>
        );
    };

    refresh () {
        this.queryList();
    };

    queryList() {
        const {dispatch} = this.props;
        const {routeParams} = this.state;
        //const container = document.getElementById('wizard-container');
        console.log('routeParams',routeParams);
        dispatch(getEditData(routeParams)).then((result) => {
            if (result.apiError) {
                message.error(result.apiError.errorMessage, 3);
                return false;
            }
            const {List, group} = this.props;
            console.log('List',List);
            const len = [...List].length;
            let listTmp = [];
            [...List].map((item, i) => {
                let tmp = {};
                _.mapKeys(item, (val, key) => {
                    tmp[key] = val;
                });
                if(Number(tmp.qualityRank) != 5 && tmp.rejectReason){
                    tmp.rejectReason = ""
                }
                listTmp.push(tmp);
            });
            this.state.dataList = listTmp;

            let grouptmp = {};
            _.mapKeys(group, (val, key) => {
                grouptmp[key] = val;
            });
            this.state.groupData = grouptmp;

            this.state.selectStatus = _.fill(Array(len), false);
            // console.info(List);
            this.setKeyword_doc();
        });
    };

    //生成字典&初始化生成字段
    setKeyword_doc() {
        const {dispatch, List, group} = this.props;
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
                keywordsdoc_kind_tmp[item.id] = item.kind;
            });
            this.state.keywordsdoc_name = keywordsdoc_name_tmp;
            this.state.keywordsdoc_kind = keywordsdoc_kind_tmp;

            //替换分类关键词
            let classifyValue = [];
            if(group.category)
            [...group.category.split(",")].map(item => {
                if (item) classifyValue.push({ value: item, label: keywordsdoc_name_tmp[item], halfChecked: true});
            });
            this.state.classifyValue = classifyValue;

            //替换组关键词
            let groupkeywords_arr = [], classify_arr = [];
            if(group.keywords) groupkeywords_arr = group.keywords.split(",");
            if(group.category) classify_arr = group.category.split(",");
            _.remove(groupkeywords_arr, item => { if (!item || _.indexOf(classify_arr, item) != -1) return true; });

            [...groupkeywords_arr].map(item => {
                if (item) keywordsgroup_tmp.push({ id: item, label: keywordsdoc_name_tmp[item] });
            });
            this.state.groupData.keywords_tag = keywordsgroup_tmp;

            //替换图片关键词
            [...List].map((item, i) => {
                let localtion_tmp = [],
                    people_tmp = [],
                    format_tmp = [],
                    theme_tmp = [],
                    concept_tmp = [],
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
                    //console.log(param.label);
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
            });

            this.ThumbnailboxRender();
        });
    };

    closeAlert() {
        const alert = Object.assign(this.state.alert, { "show": false });
        this.setState({ "alert": alert });
    };

    openAlert(config) {
        const alert = Object.assign(this.state.alert, { "show": true }, config);
        this.setState({ "alert": alert });
    };

    //step_1

    RenderStep_1() {

        return (
            <div>
                <Affix className="row operate">
                    <div className="col-xs-12 pr-200">
                        <button className="btn btn-sm btn-info" onClick={this.selectAll.bind(this) }>
                            <i className="ace-icon fa fa-copy"></i>全选
                        </button>
                        <button className="btn btn-sm btn-info" onClick={this.selectToggle.bind(this) }>
                            <i className="ace-icon fa fa-clipboard"></i>反选
                        </button>

                        <span className="line-c"></span>

                        <button className="btn btn-sm btn-info" onClick={this.setLevel.bind(this) }>
                            <i className="ace-icon fa fa-bug"></i>等级设置
                        </button>
                        <button className="btn btn-sm btn-info" onClick={this.AllStar.bind(this) }>
                            <i className="ace-icon fa fa-star"></i>收藏
                        </button>
                        <button className="btn btn-sm btn-info" onClick={this.AllTurnLeft.bind(this) }>
                            <i className="ace-icon fa fa-rotate-left"></i>向左旋转
                        </button>
                        <button className="btn btn-sm btn-info" onClick={this.AllTurnRight.bind(this) }>
                            <i className="ace-icon fa fa-rotate-right"></i>向右旋转
                        </button>
                        <button className="btn btn-sm btn-info" onClick={this.AllNoPass.bind(this,'all') }>
                            <i className="ace-icon fa fa-hand-stop-o"></i>不通过原因
                        </button>
                        <button className="btn btn-sm btn-info" onClick={this.allDownloadPicture.bind(this) }>
                            <i className="ace-icon fa fa-cloud-download"></i>下载
                        </button>
                        <button className="btn btn-sm btn-info" onClick={this.refresh.bind(this) }>
                            <i className="ace-icon fa fa-refresh"></i>刷新
                        </button>
                        {/* <button className="btn btn-sm btn-info" onClick={this.selectToggle.bind(this) }>
                                <i className="ace-icon fa fa-ship"></i>添加到其他分类
                            </button>
                            
                            <button className="btn btn-sm btn-info" onClick={this.selectToggle.bind(this) }>
                                <i className="ace-icon fa fa-ship"></i>推送
                            </button>

                            <div id="selectNum" className="fr"></div>*/}
                    </div>

                </Affix>

                <div className="row"><div className="space-8"></div></div>

                <div id="thumbnailBox" className="thumbnail-container"></div>
            </div>
        );
    };

    ThumbnailboxRender() {
        const {dataList} = this.state;
        const container = document.getElementById('thumbnailBox');

        const config = {
            "groupId": this.props.params.ids,
            "refresh": this.refresh.bind(this),
            //选择
            "selectStatus": this.state.selectStatus,
            "setSelectStatus": this.setSelectStatus.bind(this)
        };
        ReactDOM.render(
            <ThumbnailBox
                types="edit"
                animate
                lists={dataList}
                onThumbnail={this.handleOnThumbnail.bind(this) }
                {...config}
                />, container
        );
        // this.selectNumRender();
    };

    selectNumRender() {
        const container = document.getElementById('selectNum');
        const length = this.state.dataList.length;
        const {selectStatus} = this.state;
        let len = 0;
        [...selectStatus].map((item, i) => {
            if (item) len++;
        });
        ReactDOM.render(
            <span className="selectAndTotal">{len + " / " + length}</span>, container
        );
    };

    setSelectStatus(params) {
        const {selectStatus} = this.state;
        const _selectStatus = Object.assign(selectStatus, params);
        this.setState({
            selectStatus: _selectStatus
        });
        this.setState({ selectedItem: this.getSelectId });
        // this.selectNumRender();
    };

    selectAll() {
        const {selectStatus} = this.state;
        let len = this.state.dataList.length;
        this.state.selectStatus = _.fill(Array(len), true);
        this.ThumbnailboxRender();
        this.setState({ selectedItem: this.getSelectId });
        // this.selectNumRender();
    };

    selectToggle() {
        const {selectStatus} = this.state;
        this.state.selectStatus = [...selectStatus].map((val, i) => { return !val });
        this.ThumbnailboxRender();
        this.setState({ selectedItem: this.getSelectId });
        // this.selectNumRender();
    };

    getSelectId() {
        const {selectStatus,dataList} = this.state;
        let selectIdList = [];
        [...selectStatus].map((item, i) => {
            if (item) selectIdList.push(dataList[i].id);
        });
        return selectIdList;
    };

    handleOnThumbnail(params) {
        const {operate, key} = params;
        switch (operate) {
            case "expand":
                this.expandContract();
                break;
            case "radio":
                this.radioChange(params);
                break;
            case "input":
                this.inputChange(params);
                break;
            case "turnRight":
                this.turnRight(params);
                break;
            case "turnLeft":
                this.turnLeft(params);
                break;
            case "star":
                this.favoriteModal(params.id);
                break;
            case "goTop":
                this.gotop(params);
                break;
            case "originPicture":
                this.viewPicture(params, "origin");
                break;
            case "middlePicture":
                this.viewPicture(params, "middle");
                break;
            //case "upload":
            //    this.uploadPicture(params);
            //    break;
            case "download":
                this.downloadPicture([params.id]);
                break;
            default:
                console.log(operate, params);
        }
    };

    radioChange(params) {
        const {id, key, value} = params;
        let {dataList} = this.state;
        if (dataList[key].id === id) dataList[key]['qualityRank'] = value;

        this.state.dataList = dataList;
        this.ThumbnailboxRender();
    };

    inputChange(params) {
        const {id, key, value} = params;
        let {dataList} = this.state;
        if (dataList[key].id === id) dataList[key]['creditLine'] = value;

        this.state.dataList = dataList;
        this.ThumbnailboxRender();
    };

    setLevel() { // 设置等级
        const {selectStatus} = this.state;
        this.state.alert.param = 1;
        let body, submitAlert;
        if (_.indexOf(selectStatus, true) < 0) {
            body = <p className="textcenter">你还没有选择任何图片~</p>;
            submitAlert = this.closeAlert.bind(this);
        } else {
            body = <RadioGroup
                value={this.state.alert.param}
                onChange={this.allRadioChange.bind(this) }
                operate="radio"
                >
                <Radio key="a" value={1}>A</Radio>
                <Radio key="b" value={2}>B</Radio>
                <Radio key="c" value={3}>C</Radio>
                <Radio key="d" value={4}>D</Radio>
                <Radio key="e" value={5}>E</Radio>
            </RadioGroup>;

            submitAlert = this.setRanksubmit.bind(this);
        }

        const config = {
            "bsSize": "small",
            "title": <samll style={{ "fontSize": "14px" }}>等级设置</samll>,
            "body": body,
            "isKeyword": true,
            "submitAlert": submitAlert,
            "isButton": true
        };
        this.openAlert(config);
    };

    allRadioChange(e) {
        let {alert} = this.state;
        // unmountComponentAtNode(DOMElement, list);
        alert.show = true;
        alert.param = e.target.value;
        alert.body = <RadioGroup
            value={e.target.value}
            onChange={this.allRadioChange.bind(this) }
            operate="radio"
            >
            <Radio key="a" value={1}>A</Radio>
            <Radio key="b" value={2}>B</Radio>
            <Radio key="c" value={3}>C</Radio>
            <Radio key="d" value={4}>D</Radio>
            <Radio key="e" value={5}>E</Radio>
        </RadioGroup>;
        this.setState({ alert });
    };

    setRanksubmit() {
        const {selectStatus, dataList} = this.state;
        const param = this.state.alert.param;
        if (_.isNumber(param)) {
            [...selectStatus].map((item, i) => {
                if (item) {
                    dataList[i].qualityRank = param;
                    dataList[i].rejectReason = "";
                }
            });
            this.ThumbnailboxRender();
            this.closeAlert();
        }
    };

    turnLeft({ id, key, value }) {
        let {dataList} = this.state;
        let rotate = 0;
        if (parseInt(dataList[key].id) === parseInt(id)) rotate = dataList[key]['rotate'];

        console.info('turnLeft', rotate, id, dataList[key].id, key);
        if (rotate) { rotate -= 90 }
        else { rotate = 270 }

        if (rotate > 270) rotate = 0;
        if (rotate < 0) rotate += 360;

        dataList[key]['rotate'] = rotate;
        this.state.dataList = dataList;
        console.info(this.state.dataList[key]);
        this.ThumbnailboxRender();
    };

    turnRight({ id, key, value }) {
        let {dataList} = this.state;
        let rotate = 0;

        if (parseInt(dataList[key].id) === parseInt(id)) rotate = dataList[key]['rotate'];

        if (rotate) { rotate += 90 }
        else { rotate = 90 }

        if (rotate > 270) rotate = 0;
        if (rotate < 0) rotate += 360;

        dataList[key]['rotate'] = rotate;
        this.state.dataList = dataList;
        this.ThumbnailboxRender();
    };

    AllTurnLeft() {
        let {dataList, selectStatus} = this.state;
        let done = false;
        [...selectStatus].map((item, i) => {
            if (!item) return false;
            let rotate = dataList[i].rotate;
            if (rotate) { rotate -= 90 }
            else { rotate = 270 }
            if (rotate > 270) rotate = 0;
            if (rotate < 0) rotate += 360;

            done = true;
            dataList[i].rotate = rotate;
        });
        if (done) {
            this.setState({ dataList });
            this.ThumbnailboxRender();
        }
    };

    AllTurnRight() {
        let {dataList, selectStatus} = this.state;
        let done = false;
        [...selectStatus].map((item, i) => {
            if (!item) return false;
            let rotate = dataList[i].rotate;
            if (rotate) { rotate += 90 }
            else { rotate = 90 }
            if (rotate > 270) rotate = 0;
            if (rotate < 0) rotate += 360;

            done = true;
            dataList[i].rotate = rotate;
        });

        if (done) {
            this.setState({ dataList });
            this.ThumbnailboxRender();
        }
    };

    AllNoPass(all) {
        const {selectStatus, alert} = this.state;
        let body, submitAlert, size, title;
        alert.param = {
            value: 1,
            rejectReason: "",
            error: false
        };
        if (_.indexOf(selectStatus, true) < 0 && all) { // 没有选择
            body = <p className="textcenter">你还没有选择任何图片~</p>;
            submitAlert = this.closeAlert.bind(this);
        } else {  // 有选择
            body = this.allNoPassBody();
            submitAlert = this.setNoPassSubmit.bind(this, all);
        }

        title = "批量设置不通过原因";
        if (all) title = "全部不通过原因";

        const config = {
            "bsSize": "small",
            "title": <samll style={{ "fontSize": "14px" }}>{title}</samll>,
            "body": body,
            "isKeyword": true,
            "submitAlert": submitAlert,
            "isButton": true
        };
        this.openAlert(config);
    };

    allNoPassBody() {
        const {param} = this.state.alert;
        return (
            <RadioGroup
                value={param.value}
                onChange={this.allNoPassChange.bind(this) }
                operate="radio"
                >
                <Radio key="a" value={1} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>图片质量有待提升</Radio>
                <Radio key="b" value={2} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>请勿重复上传</Radio>
                <Radio key="c" value={3} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>此类图片市场需求较小</Radio>
                <Radio key="d" value={4} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>缺乏文字说明，请与编辑部门联系</Radio>
                <Radio key="e" value={5} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>图片精度未达到要求</Radio>
                <Radio key="f" value={6} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>拍摄角度/场景单一</Radio>
                <Radio key="g" value={7} style={{ "width": " 100%", "float": "left" }} className={"textleft margin-0 mt-5"}>请控制传图数量</Radio>
                <Radio key="h" value={8} style={{ "width": " 100%", "float": "left" }} className={"textleft margin-0 mt-5"}>题材敏感</Radio>
                <Radio key="i" value={9} style={{ "width": " 100%", "float": "left" }} className={"textleft margin-0 mt-5"}>版权问题</Radio>
                <Radio key="j" value={10} style={{ "width": " 100%", "float": "left" }} className={"textleft margin-0 mt-5"}>部分图片已拆分发布，其余图片审核未通过</Radio>
                <Radio key="k" value={11} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>
                    其他原因
                    {param.value === 11 ?
                        <Input
                            className= {param.error ? "error" : ""}
                            style={{ width: 100, marginLeft: 10 }}
                            onChange={this.allNoPassInputChange.bind(this) }
                            onFocus={e => {
                                this.state.alert.param.error = false;
                                console.log(this.state.alert.param);
                                if (param.value === 11)
                                    this.allNoPassBody();
                            } }
                            /> : null}
                </Radio>
            </RadioGroup>
        );
    }

    allNoPassChange(e) {
        let {alert} = this.state;
        // unmountComponentAtNode(DOMElement, list);
        alert.show = true;
        alert.param.value = e.target.value;
        alert.body = this.allNoPassBody();
        this.setState({ alert });
    };

    allNoPassInputChange(e) {
        this.state.alert.param.rejectReason = e.target.value;
    };

    setNoPassSubmit(all) {
        const {selectStatus, dataList, alert} = this.state;

        if (alert.param.value === 11 && !alert.param.rejectReason) {
            alert.param.error = true;
            alert.body = this.allNoPassBody();
            this.setState({ alert });
        } else {
            const rejectReason = alert.param.rejectReason ? alert.param.rejectReason : alert.param.value;
            if(all){
                [...selectStatus].map((item, i) => {
                    if (item) {
                        dataList[i].qualityRank = 5;
                        dataList[i].rejectReason = rejectReason
                    }
                });
            }else{
                dataList.map((item, i) => {
                    dataList[i].rejectReason = rejectReason
                });
            }
            this.ThumbnailboxRender();
            this.closeAlert();
        }
    }

    AllStar() {
        const {selectStatus} = this.state;

        if (_.indexOf(selectStatus, true) < 0) {
            const config = {
                "bsSize": "small",
                "title": <samll style={{ "fontSize": "14px" }}>批量收藏</samll>,
                "body": <p className="textcenter">你还没有选择任何图片~</p>,
                "isKeyword": true,
                "submitAlert": this.closeAlert.bind(this),
                "isButton": true
            };
            this.openAlert(config);

        } else {
            this.favoriteModal(false);
        }

    };

    favoriteModal(e) {
        const {dispatch} = this.props;

        let body = (<Spin />);
        const user = "邓超";

        dispatch(getFavoriteList(user)).then(result => {
            if (result.apiError) return false;

            this.state.alert.param = {
                target: e,
                switch: false,
                value_1: "",
                value_2: ""
            };
            let favoite = result.apiResponse;
            let favoiteList = [];
            [...favoite].map((item, i) => {
                favoiteList.push(
                    <Option key={item.id}>{item.name}</Option>
                )
            });

            let body = <div className="favoriteModal">
                <span className="fl" id="favoiteLabel">添加至收藏夹</span>
                <Switch className="fr" defaultChecked={false} onChange={this.favoriteSwitch.bind(this) }/>
                <div className="slideBox mt-10">
                    <div className="slideBox-inner" id="favoiteBox">
                        <div className="slideBox-context">
                            <Select style={{ "width": "100%" }} onChange={value => { this.state.alert.param.value_1 = value } }>
                                {favoiteList}
                            </Select>
                        </div>
                        <div className="slideBox-context">
                            <Input placeholder="输入新的收藏夹名"  onChange={e => { this.state.alert.param.value_2 = e.target.value } }/>
                        </div>
                    </div>
                </div>
            </div>;

            let {alert} = this.state;
            alert.body = body;
            this.setState({ alert });
        });

        const config = {
            "bsSize": "small",
            "title": <samll style={{ "fontSize": "14px" }}>批量收藏</samll>,
            "body": body,
            "isKeyword": true,
            "submitAlert": this.favoriteSubmit.bind(this),
            "isButton": true
        };

        this.openAlert(config);

    };

    favoriteSwitch() {
        const {alert} = this.state;
        alert.param.switch = !alert.param.switch;
        this.setState({ alert });

        const box = document.getElementById("favoiteBox");
        const label = document.getElementById("favoiteLabel");
        if (alert.param.switch) {
            box.className = "slideBox-inner next";
            label.innerHTML = "新建收藏夹并加入";
        }
        else {
            box.className = "slideBox-inner";
            label.innerHTML = "添加至收藏夹";
        }
    };

    favoriteSubmit() {
        const {dispatch} = this.props;
        const {alert} = this.state;

        const params = {
            "favorite": {
                "id": 0,
                "name": "",
                "userId": 1
            },
            "resourceIds": [0]
        };
        if (alert.param.switch) params.favorite.name = alert.param.value_2;
        else params.favorite.id = alert.param.value_1;

        if (alert.param.target) params.resourceIds[0] = alert.param.target;
        else {
            params.resourceIds = this.getSelectId();
        }

        dispatch(postFavoriteItem(params)).then(result => {
            if (result.apiError) return false;
            this.closeAlert();
        });
    }

    gotop(params) {
        const {key, id} = params;
        const {dataList, selectStatus} = this.state;

        const item = dataList.splice(key, 1);
        this.state.dataList = item.concat(dataList);

        const select = selectStatus.splice(key, 1);
        this.state.selectStatus = select.concat(selectStatus);

        this.ThumbnailboxRender();
    };

    viewPicture(param, type) {
        const {dispatch} = this.props;
        const dataParams = type === "origin"?{"resouceId":param.id,"type":"origin"}:{"resouceId":param.id};
        dispatch(viewEditPic(dataParams)).then((result) => {
            if (result.apiError) return false;
            const title = type === "origin"?"查看原图":"查看中图";
            this.openAlert({
                "bsSize": "lg",
                "title": <samll style={{ "fontSize": "14px" }}>{title}</samll>,
                "body": <img width="100%" src={result.apiResponse} />,
                "isKeyword": true,
                "isButton": false
            });
        });
    };

    //uploadPicture(param) {
    //    const groupId = this.props.params.ids;
    //    const resouceId = param.id;
    //    const token = window.localStorage.getItem('token');
    //    console.log(param);
    //    const Dragger = Upload.Dragger;
    //    const props = {
    //        "name": "file",
    //        "showUploadList": false,
    //        "action": 'http://111.200.62.68:8005/resource/viewMidTu?groupId='+groupId+'&resourceId='+resouceId +'&token='+token,
    //        "beforeUpload": (file) => {
    //            const isJPG = file.type === 'image/jpeg';
    //            if (!isJPG) {
    //                message.error('只能上传 JPG 文件哦！');
    //            }
    //            return isJPG;
    //        }
    //    };
    //    this.openAlert({
    //        "bsSize": "small",
    //        "title": <samll style={{ "fontSize": "14px" }}>替换图片:ID-{resouceId}</samll>,
    //        "body":  (<div style={{ "width": "100%", "height": "140px" }}>
    //            <Dragger {...props}>
    //                <Icon type="plus" />
    //            </Dragger>
    //        </div>),
    //        "isButton": false
    //    });
    //};

    allDownloadPicture () {
        const selectIds = this.publishData().selectIds;
        const len = selectIds.length;
        let body, submitAlert;
        if (len==0) {
            body = "请选择图片。";
            submitAlert = this.closeAlert.bind(this);
        } else {
            body = "确定要下载这"+len+"个图片？";
            submitAlert =  this.submitAllDownloadPicture.bind(this,selectIds);
        }
        this.openAlert({
            "bsSize": "small",
            "title": <samll style={{ "fontSize": "14px" }}>下载多个图片</samll>,
            "body": <p className="textcenter">{body}</p>,
            "isKeyword": true,
            "submitAlert": submitAlert,
            "isButton": true
        });
    };

    submitAllDownloadPicture (selectIds) {
        this.downloadPicture(selectIds);
        this.closeAlert();
    };

    downloadPicture(resourceIds) {
        const groupId = this.props.params.ids;
        const token = window.localStorage.getItem('token');
        window.open( editorUrl + '/resource/downLoadYuantu?groupId='+groupId+'&resourceIds='+resourceIds.join(',')+ '&token='+token
        );
    };

    nextAction_1() {
        const {dataList, selectStatus} = this.state;
        let _selectedList = [];
        if (_.indexOf(selectStatus, true) < 0) { // 没有选择
            [...dataList].map((item, i) => {
                item.key = i;
                if (Number(item.qualityRank) !== 5) _selectedList.push(item);
            });
        } else { // 有选择
            [...selectStatus].map((item, i) => {
                if (item && Number(dataList[i].qualityRank) !== 5) _selectedList.push(dataList[i]);
            });
        }
        this.state.selectedList = _selectedList;
        //console.log(_selectedList);
        if (_selectedList.length>0) {
            this.RenderStep2_3();
            this.classifyRender();
            this.RenderStep2_1();
        }else{
            let flag = true;
            [...dataList].map((item, i) => {
                if(item.rejectReason) flag = false;
            });
            if(flag){
                this.AllNoPass();
            }else{
                const {dispatch} = this.props;
                if(_.indexOf(selectStatus, true) < 0){ // 没有选择
                    this.selectAll();
                }
                const params = this.publishData();
                const len = params.selectIds.length;
                const total = selectStatus.length;
                delete params.publishType;
                //console.log(selectStatus);
                //console.log(len);
                if(len!=total){
                    const config = {
                        "bsSize": "small",
                        "title": <samll style={{ "fontSize": "14px" }}>操作提示</samll>,
                        "body": (<p className="text-warning samll orange">
                            <i className="ace-icon fa fa-exclamation-triangle"></i> 请选择{len}个图片等级不为E发布！
                        </p>),
                        "isButton": false
                    };
                    this.openAlert(config);
                }else{
                    dispatch(allNoPass(params)).then(result => {
                        if (result.apiError) {
                            message.error("选择"+len+"个全部不通过，提交失败", 3);
                            return false;
                        }
                        message.success("选择"+len+"个全部不通过，提交成功！3秒后自动关闭窗口。");
                        setTimeout(() => {window.close();}, 3000);
                    });
                }
            }
            return true;
        }
    };

    //step_2

    RenderStep_2() {
        return (
            <div>
                <Affix className="row operate">
                    <div className="col-xs-12 pr-200">
                        <button className="btn btn-sm btn-info" onClick={this.save.bind(this) }>
                            <i className="ace-icon fa fa-bug"></i>保存
                        </button>
                        <button className="btn btn-sm btn-info">
                            <i className="ace-icon fa fa-star"></i>检测人物关键词
                        </button>

                        <span className="line-c"></span>

                        <Select showSearch
                            style={{ width: 100, margin: "0 10px 5px" }}
                            placeholder="请选择产品"
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            onChange={value => { console.log(value) } }
                            >
                            <Option value="jack">新闻</Option>
                            <Option value="lucy">体育</Option>
                            <Option value="tom">娱乐</Option>
                            <Option value="jack1">时尚</Option>
                            <Option value="lucy1">图表</Option>
                            <Option value="tom1">档案</Option>
                        </Select>

                        <div id="classify" className="classify"></div>
                    </div>
                </Affix>

                <div className="row">
                    <div className="space-8"></div>
                </div>

                <Panel header="组照内容编辑">
                    <div id="step2_1"></div>

                </Panel>
                <Panel header="批量内容编辑">
                    <Step2_2 handOnchange={this.setStep2_2.bind(this) }/>
                </Panel>
                <Panel header="图片内容编辑">
                    <div id="textEdit_container"></div>
                </Panel>
            </div>
        );
    };

    RenderStep2_1() {
        const {groupData, classifyValue} = this.state;
        const container = document.getElementById("step2_1");
        ReactDOM.render(
            <Step2_1
                title={groupData.title}
                dispatch={this.props.dispatch}
                keywords={groupData.keywords_tag}
                classify={this.state.classifyValue}
                handonChange={this.setStep2_1.bind(this) }
                caption={groupData.caption}/>
            , container);
    };

    RenderStep2_3() {
        const {selectedList} = this.state;
        //console.log('RenderStep2_3',selectedList);
        const container = document.getElementById("textEdit_container");
        ReactDOM.render(
            <ThumbnailBox
                types="editGroup"
                lists={selectedList}
                onThumbnail={value =>{this.state.dataList = value}}
                dispatch={this.props.dispatch}
                findKeyword={findKeyword}
                addKeyword={addKeyword}
                modifyKeyword={modifyKeyword}
                getKeywordbyId={getKeywordbyId}
                addKeyworddoc={this.addKeyworddoc.bind(this)}
                />, container
        );

        this.findErrorTag();
    };

    findErrorTag() {
        var themTag = document.querySelectorAll(".themTag");
        for(let i=0; i<themTag.length; i++){
            let tags = themTag[i].querySelectorAll(".ant-select-selection__choice");
            for(let i=0; i<tags.length; i++){
                let tag = tags[i];
                let title = tag.title;
                
                if(title.indexOf("✲")>0) {//没检测
                    tag.className+=" red";
                }
                if(title.indexOf("✻")>0) {//多义词
                    tag.className+=" green";
                }
                if(title.indexOf("✳")>0) {//新词
                    tag.className+=" gray";
                }

                // let tag_context = tag.querySelector(".ant-select-selection__choice__content")
                // tag_context.addEventListener("click", (e)=>{console.log(e.target)});
            }
        }
    };

    //添加关键词字典
    addKeyworddoc({label, id}, kind) {
        const {keywordsdoc_name, keywordsdoc_kind} = this.state;
        if(label) this.state.keywordsdoc_name[id] = label;
        if(kind) this.state.keywordsdoc_kind[id] = kind;
    };

    classifyChange(value) {
        const {dispatch} = this.props;
        console.error("classifyChange", value);
        let class_tmp = [];
        // if(value && value.length>0) {
        //     dispatch(getKeywordbyId({data: value.join(",")})).then(result=>{
        //         if(result.apiError) return false;
        //         [...result.apiResponse].map((item, i)=>{
        //             class_tmp.push({label: item.cnname, value: item.id, halfChecked: true});
        //         })
        //         this.state.classifyValue = class_tmp;
        //         console.log(this.state.classifyValue,class_tmp)
        //         this.classifyRender();
        //         this.RenderStep2_1();
        //     });
        // }else{
        //     this.state.classifyValue = value;
        //     this.classifyRender();
        //     this.RenderStep2_1();
        // }

        [...value].map((item, i)=>{
            value.halfChecked = true;
        });
        this.state.classifyValue = value;
        this.classifyRender();
        this.RenderStep2_1();
    };

    classifyRender() {
        const {classifyValue} = this.state;
        const container = document.getElementById("classify");
        const treeData = require("../../assets/json/classify_test.json");

        //自动脚本
        // let tmp =[];
        //   function trunjson(json){
        //     return [...json].map((item,i)=>{
        //         item.key = item.value;
        //         if(item.chlidren) {
        //             item.children =  trunjson(item.chlidren);
        //         }
        //         return item;
        //     });
        // }
        // console.log(JSON.stringify(trunjson(treeData)));
        // console.log(JSON.stringify(treeData));

        // let classifyValue_tmp = [];
        // [...classifyValue].map((item, i) => {
        //     if (item && item.id) classifyValue_tmp.push(item.id.toString())
        // });
        //console.error(classifyValue,"classifyRender");
        const tProps = {
            treeData,
            labelInValue: true,
            value: classifyValue,
            onChange: this.classifyChange.bind(this),
            multiple: true,
            treeCheckable: true,
            treeCheckStrictly: true,
            // checkStrictly: true,
            showCheckedStrategy: SHOW_CHILD,
            searchPlaceholder: '请选择',
            dropdownMatchSelectWidth: false,
            style: {
                width: 70
            },
            dropdownStyle: {
                width: 150
            }
        };

        ReactDOM.render(
            <div className="classify">
                <TreeSelect {...tProps}/>
                <span className="dropdownicon">分类选择</span>
            </div>
            , container);
    };

    setStep2_1({ key, value, label, id}) {
        switch (key) {
            case "classify":
                this.state.classifyValue = value;
                this.classifyRender();
                break;
            case "keywords":
                this.setKeyword({value, label, id});
                break;
            case "title":
                this.state.groupData.title = value;
                break;
            case "caption":
                this.state.groupData.caption = value;
                break;
            default:
                console.log(param);
                break;
        }
    };

    setKeyword({value, label, id}) {
        const {keywords_tag} = this.state.groupData;
        console.error(this,value,label,id);
        if(value){
            this.state.groupData.keywords_tag = value;
        }
        else if(label || id){
            this.state.groupData.keywords_tag.push({label: label, id});
            this.state.keywordsdoc_name.id = label;
        }
    };

    setStep2_2({ key, value }) {
        switch (key) {
            case "time":
                this.setSelectedList({ key: "createTime", value });
                break;
            case "area":
                this.setSelectedList({ key: "country", value: value[0] });
                this.setSelectedList({ key: "province", value: value[1] });
                this.setSelectedList({ key: "city", value: value[2] });
                break;
            case "tags":
                this.setSelectedList({ key: "keywords", value: value.join(",") });
                break;
            case "people":
                this.setSelectedList({ key: "people", value: value.join(",") });
                break;
            case "caption_sync":
                this.setSelectedList({ key: "caption", value });
                break;
            case "caption_before":
                this.setSelectedList({ key: "caption", value, position: "before" });
                break;
            case "caption_after":
                this.setSelectedList({ key: "caption", value, position: "after" });
                break;
            default:
                console.log(key, value);
                break;
        }
    };

    //批量设置
    setSelectedList({ key, value, position }) {
        const {selectedList} = this.state;

        if (position === "before") {
            [...selectedList].map((item, i) => {
                selectedList[i][key] = value + selectedList[i][key];
            });
        }
        else if (position === "after") {
            [...selectedList].map((item, i) => {
                selectedList[i][key] = selectedList[i][key] + value;
            });
        }
        else {
            [...selectedList].map((item, i) => {
                selectedList[i][key] = value;
            });
        }

        // console.error(key,value,selectedList);
        this.state.selectedList = selectedList;
        this.RenderStep2_3()
    };

    //step_3
    RenderStep_3() {

        return (
            <WizardStep3
                className="wrapperStep3"
                dispatch = {this.props.dispatch}
                handleOnPubulish={this.setPubulishData.bind(this) }/>
        )
    };

    setPubulishData(data) {
        this.state.pubulishData = data;
        console.log(data)
    };

    publishData() {
        const {dataList, groupData, pubulishData, routeParams, selectedList, selectStatus} = this.state;

        [...selectedList].map((item, i) => {
            dataList[item.key] = item;
        });

        return {
            "editType": routeParams.operate,
            "group": groupData,
            "resourcs": dataList,
            "selectIds": this.getSelectId(),
            "publishType": pubulishData.type,
            "groupId": pubulishData.type === 2 ? parseInt(pubulishData.data) : null,
            "topicId": pubulishData.type === 3 ? parseInt(pubulishData.data) : null
        };
    };

    pubulish() {
        const {dispatch} = this.props;
        const {selectStatus} = this.state;
        if(_.indexOf(selectStatus, true) < 0){
            this.selectAll();
        }
        const params = this.publishData();
        dispatch(editPostData(params)).then(result => {
            if (result.apiError) {
                message.error("发布失败", 3);
                return false;
            }
            message.success("发布成功！3秒后自动关闭窗口。");
            setTimeout(() => {window.close();}, 3000);
        });
    };

    save() {
        const {dispatch} = this.props;
        const params = this.publishData();

        dispatch(editSavePostData(params)).then(result => {
            if (result.apiError) return false;
        });
    };
}
