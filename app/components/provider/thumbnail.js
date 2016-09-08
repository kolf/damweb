import React, {Component} from "react"
import ReactDOM           from "react-dom";
import {Link}             from "react-router";
import _                  from "lodash";
import moment             from "moment";

import LoadingBox         from "app/components/common/loading";

import {
    Grid,
    Row,
    Col,
    Tooltip,
    OverlayTrigger,
    Well
} from "react-bootstrap/lib";

import QueueAnim from 'rc-queue-anim';

import {
    Card, Button, Radio, DatePicker,
    Input, Select, Cascader, Tag, Modal, Upload, message
} from 'antd';

import "./css/thumbnail.css";

const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

export default class ThumbnailBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "searchParams": {},
            "timer": null,
            "selectStatus": this.props.selectStatus,
            "operateConfig": [
                {
                    "title": "置顶",
                    "operate": "goTop",
                    "icon": "arrow-up"
                },
                {
                    "title": "向左旋转",
                    "operate": "turnLeft",
                    "icon": "rotate-left"
                },
                {
                    "title": "向右旋转",
                    "operate": "turnRight",
                    "icon": "rotate-right"
                },
                {
                    "title": "收藏",
                    "operate": "star",
                    "icon": "star"
                },
                {
                    "title": "下载",
                    "operate": "download",
                    "icon": "cloud-download"
                },
                {
                    "title": "替换",
                    "operate": "upload",
                    "icon": "cloud-upload"
                },
                {
                    "title": "查看原图",
                    "operate": "originPicture",
                    "icon": "picture-o"
                },
                {
                    "title": "查看中图",
                    "operate": "middlePicture",
                    "icon": "file-image-o"
                }
            ],
            "editGroup": {},
            "ViewTimer": null,
            "modal": {
                "show": false,
                "_title": "12312",
                "body": null,
                "okBtn": this.closeModal.bind(this),
                "cancelBtn": this.closeModal.bind(this),
                "oktext": null,
                "type": null,
                "loading": false,
                "param": {}
            },
            "hasSelect": false,//tag OnSelect
            "lists": [],
            "tagClickTimer": null
        };

        this.modalInit = {
            "show": false,
            "_title": "信息确认",
            "param": {},
            "body": false,
            "loading": false,
            "okBtn": this.closeModal.bind(this),
            "cancelBtn": this.closeModal.bind(this),
            "oktext": "",
            "type": ""

        };

    };

    static contextTypes = {
        "router": React.PropTypes.object.isRequired
    };

    componentWillMount() {

    };

    componentDidMount() {
        // console.log("thumbnailBox componentDidMount")
        // const {searchParams, dispatch} = this.props;
        // if(this.props.updateStatus){
        //     this.state.timer = setTimeout(()=>{
        //         dispatch(this.props.updateStatus(searchParams)).then((result)=>{
        //             if (result.apiError) return false;  
        //             // this.compareStatus();                 
        //         });
        //     },5000);
        // }

        // [...document.querySelectorAll(".themwTag")].addEventListener("click", (e) => {
        //     if (e.target && e.target.className === "ant-select-selection__choice__content") {
        //         if (this.state.tagClickTimer) {
        //             console.error("asdad");
        //         }
        //         this.state.grouptimer = setTimeout(() => {
        //             clearTimeout(this.state.tagClickTimer);
        //             this.state.tagClickTimer = null;
        //         }, 300);
        //     }
        // });

    };

    componentWillUnmount() {
        // const {timer} = this.state;
        // if(timer){
        //     clearInterval(this.state.timer);
        //     this.state.timer = null;
        // }
        // console.error('thumbnailBox unmount!!!!!')
    };

    compareStatus() {
        const {lists} = this.props;
        const status = this.props.getStatus();
        if (!_.isMatch(lists, status)) {
            this.props.renderself();
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ selectStatus: nextProps.selectStatus });
        this.setState({ searchParams: nextProps.searchParams });
    };

    toggleSelect(event) {
        const {ViewTimer} = this.state;
        const target = event.target;
        let key = target.getAttribute('data-key');
        let _selectStatus = this.state.selectStatus;
        if (!key) key = target.parentNode.getAttribute('data-key');

        _selectStatus[key] = !_selectStatus[key];
        this.setState({ selectStatus: _selectStatus });
        this.props.setSelectStatus(_selectStatus);
    };

    selectAndView(event) {
        //const {ViewTimer} = this.state;
        const target = event.target;
        let key = target.getAttribute('data-key');
        let id = target.getAttribute('data-id');
        let _selectStatus = this.state.selectStatus;
        if (!key) key = target.parentNode.getAttribute('data-key');
        if (!id) id = target.parentNode.getAttribute('data-id');

        if (this.state.ViewTimer) {
            clearTimeout(this.state.ViewTimer);
            this.state.ViewTimer = null;
            window.open("/editor/view/" + id);
        } else {
            _selectStatus[key] = !_selectStatus[key];
            this.setState({ selectStatus: _selectStatus });
            this.props.setSelectStatus(_selectStatus);
        }
        this.state.ViewTimer = setTimeout(() => {
            clearTimeout(this.state.ViewTimer);
            this.state.ViewTimer = null;
        }, 300);
    };

    storageRender() {
        const {lists} = this.props;
        this.state.lists = lists;

        return (
            [...lists].map((item, i) => {
                // const {id, src, alt, day, time, num, describe, edit, ifToedit, sort} = item;
                const edit = false;
                const {id, firstUrl, collectionName, groupId, createTime, groupState, resCount, onlineCount, title, onlineState, providerType} = item;

                const op_config = {
                    config_1: [
                        { tip: "加入专题", icon: "puzzle-piece", op: "addtoTopic" },
                        { tip: "批注记录", icon: "list", op: "postilRecord" },
                        { tip: "编审记录", icon: "outdent", op: "editRecord" },
                        { tip: "下线", icon: "arrow-circle-down", op: "offline" },
                        { tip: "推送", icon: "h-square", op: "push" },
                        { tip: "添加到海外", icon: "ship", op: "abroad" }
                    ],
                    config_2: [
                        { tip: "加入专题", icon: "puzzle-piece", op: "addtoTopic" },
                        { tip: "批注记录", icon: "list", op: "postilRecord" },
                        { tip: "编审记录", icon: "outdent", op: "editRecord" },
                        { tip: "上线", icon: "arrow-circle-up", op: "publish" }
                    ]
                };

                return (
                    <Col xs={12} sm={4} md={3} lg={3} key={String.fromCharCode(i + 96) } className="thumbnailBox storage" >
                        <Card className={ this.state.selectStatus[i] ? "storageCard selected" : "storageCard" }>
                            <div className="custom-image"  onClick={this.selectAndView.bind(this) } data-key={i} data-id={id}>
                                <img alt="找不到图片" src={firstUrl} />
                            </div>
                            <div className="custom-card" onClick={e => { e.stopPropagation() } }>
                                <Row className="mb-10">
                                    <span className="fl">{createTime ? createTime : "0000-00-00 00:00:00"}</span>
                                    <span className="num fr">
                                        <OverlayTrigger
                                            key={"resCount"+i}
                                            overlay={<Tooltip id={"j_resCount_"+i}>{"总数"}</Tooltip>}
                                            placement="top"
                                            delayShow={150}
                                            delayHide={50}>
                                            <span style={{"cursor":"default"}}>{resCount}</span>
                                        </OverlayTrigger>
                                    </span>
                                    <span className="onlineNum fr">
                                        <OverlayTrigger
                                            key={"onlineCount"+i}
                                            overlay={<Tooltip id={"j_onlineCount_"+i}>{"上线数"}</Tooltip>}
                                            placement="top"
                                            delayShow={150}
                                            delayHide={50}>
                                            <span style={{"cursor":"default"}}>{onlineCount}</span>
                                        </OverlayTrigger>
                                    </span>
                                </Row>
                                <Row className="mb-5">ID：{groupId}</Row>
                                <Row className="mb-10">
                                    <p style={{ "height":"54px","overflow":"auto"}}>
                                        标题：{_.escape(title)}
                                    </p>
                                </Row>
                                <Row className="mb-5">
                                    {!edit &&
                                        <OverlayTrigger
                                            key={"edit"+i}
                                            overlay={<Tooltip id={"j_edit_" + i}>编审</Tooltip>}
                                            placement="top"
                                            delayShow={150}
                                            delayHide={50}>
                                            <i
                                                className={"tip fa fa-pencil-square"}
                                                onClick={this.handleOnClick.bind(this) }
                                                data-operate={"edit"}
                                                data-listkey={i}
                                                data-id={id}
                                                ></i>
                                        </OverlayTrigger>
                                    }
                                    {/*未编审*/}
                                    {!edit && providerType == "1" && groupState == "1" &&//1 机构 2 个人
                                        <OverlayTrigger
                                            key={"noEdit"+i}
                                            overlay={<Tooltip id={"j_noEdit_" + i}>添加到未编审</Tooltip>}
                                            placement="top"
                                            delayShow={150}
                                            delayHide={50}>
                                            <i
                                                className={"tip fa fa-plus-circle"}
                                                onClick={this.handleOnClick.bind(this) }
                                                data-operate={"toedit"}
                                                data-listkey={i}
                                                data-id={id}
                                                ></i>
                                        </OverlayTrigger>
                                    }
                                    {/*已编审&&已上线*/}
                                    {!edit && onlineState == "1" && groupState == "4" &&
                                        [...op_config.config_1].map((item, _i) => {
                                            return (
                                                <OverlayTrigger
                                                    key={_i}
                                                    overlay={<Tooltip id={"j_" + item.icon + id}>{item.tip}</Tooltip>}
                                                    placement="top"
                                                    delayShow={150}
                                                    delayHide={50}>
                                                    <i
                                                        className={"tip fa fa-" + item.icon}
                                                        onClick={this.handleOnClick.bind(this) }
                                                        data-operate={item.op}
                                                        data-listkey={i}
                                                        data-id={id}
                                                        ></i>
                                                </OverlayTrigger>
                                            )
                                        })
                                    }
                                    {/*已编审&&已下线*/}
                                    {!edit && onlineState != "1" && groupState == "4" &&
                                        [...op_config.config_2].map((item, _i) => {
                                            return (
                                                <OverlayTrigger
                                                    key={_i}
                                                    overlay={<Tooltip id={"j_" + item.icon + id}>{item.tip}</Tooltip>}
                                                    placement="top"
                                                    delayShow={150}
                                                    delayHide={50}>
                                                    <i
                                                        className={"tip fa fa-" + item.icon}
                                                        onClick={this.handleOnClick.bind(this) }
                                                        data-operate={item.op}
                                                        data-listkey={i}
                                                        data-id={id}
                                                        ></i>
                                                </OverlayTrigger>
                                            )
                                        })
                                    }
                                    {edit &&
                                        <span className="status">{edit + "正在编审中..."}</span>
                                    }
                                    <h4 className="order fr">{i + 1}</h4>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                );
            })
        );

    };

    editRender() {
        const {lists,groupId} = this.props;
        this.state.lists = lists;
        const token = window.localStorage.getItem('token');
        return (
            [...lists].map((item, i) => {
                const imgSrc = "http://pic.vcg.cn/bigimg/800bigwater/16318000/gic16318414.jpg";
                const { id, resId, qualityRank, creditLine, rotate, ossId2, providerName,
                    imageState, onlineState, rejectReason, productPrice, keywords, oneCategory, keywords_name} = item;
                const tagWords = (()=>{
                    let temp=[];
                    [...keywords.split(',')].map((id)=>{
                        if(keywords_name && keywords_name[id] && oneCategory != id){
                            temp.push(keywords_name[id]);
                        }
                    });
                    return temp.join(' | ');
                })();
                const uploadProps = {
                    "name": "file",
                    "showUploadList": false,
                    "action": 'http://111.200.62.68:8005/resource/replace?groupId='+groupId+'&resourceId='+id +'&token='+token,
                    "accept":"image/*",
                    "onChange": (info) => {
                        console.log(info);
                        if (info.file.status !== 'uploading') {
                            console.log(info.file, info.fileList);
                        }
                        if (info.file.status === 'done') {
                            message.success(`${info.file.name} 上传成功。`);
                            this.props.refresh();
                        } else if (info.file.status === 'error') {
                            message.error(`${info.file.name} 上传失败。`);
                        }
                    },
                    "beforeUpload": (file) => {
                        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
                        if (!isJPG) {
                            message.error('只能上传 JPG/PNG 文件哦！');
                        }
                        return isJPG;
                    }
                };
                return (
                    <Col xs={12} sm={4} md={3} lg={3} key={i} className="thumbnailBox edit">
                        <Card className={ this.state.selectStatus[i] ? "editCard selected" : "editCard" }>
                            <div className="custom-image"  onClick={this.toggleSelect.bind(this) }  data-key={i}>
                                <div className={rotate && rotate !== 0 ? "rotate" : "hide"}>{rotate + "°"}</div>
                                <img alt="找不到图片" src={ossId2} className={"imgRotate_" + rotate}/>
                                <div className="operateCantainer" onClick={e => { e.stopPropagation() } }>
                                    {[...this.state.operateConfig].map((_item, _i) => {
                                        let operateBar = "";
                                        if(_item.operate=="upload"){
                                            operateBar =  (
                                                <Upload {...uploadProps}>
                                                <i className={"fa fa-" + _item.icon}></i>
                                                </Upload>
                                            );
                                        }else{
                                            operateBar = (
                                                <i
                                                className={"fa fa-" + _item.icon}
                                                onClick={this.handleOnClick.bind(this) }
                                                data-operate={_item.operate}
                                                data-listkey={i}
                                                data-id={id}
                                                ></i>
                                            );
                                        }
                                        return (<OverlayTrigger
                                            key={_i}
                                            overlay={<Tooltip id="operate">{_item.title}</Tooltip>}
                                            placement="top"
                                            delayShow={150}
                                            delayHide={50}>{operateBar}</OverlayTrigger>);
                                    }) }
                                </div>
                            </div>
                            <div  className="custom-card" onClick={e => { e.stopPropagation() } }>
                                <Row>
                                    <div className="fl">
                                        <span>{"图片ID：" + resId}</span>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="grade">
                                        图片等级：
                                        <RadioGroup
                                            value={parseInt(qualityRank) }
                                            onChange={this.handleOnClick.bind(this) }
                                            >
                                            <Radio key="a" value={1} id={id} listkey={i} operate="radio">A</Radio>
                                            <Radio key="b" value={2} id={id} listkey={i} operate="radio">B</Radio>
                                            <Radio key="c" value={3} id={id} listkey={i} operate="radio">C</Radio>
                                            <Radio key="d" value={4} id={id} listkey={i} operate="radio">D</Radio>
                                            <Radio key="e" value={5} id={id} listkey={i} operate="radio">E</Radio>
                                        </RadioGroup>
                                    </div>
                                </Row>
                                <Row className="mt-5" title={providerName}>{providerName}</Row>
                                <Row className="mt-5">
                                    <OverlayTrigger
                                        key={i}
                                        overlay={<Tooltip id="j_modify_creditLine">修改署名</Tooltip>}
                                        placement="right"
                                        delayShow={300}
                                        delayHide={150}>
                                        <Input
                                            value={creditLine}
                                            placeholder="请输入署名"
                                            type="text"
                                            onChange={this.hangleOnchange.bind({"operate":"input","key":i,"id":id,_this:this}) } />
                                    </OverlayTrigger>
                                </Row>
                                <hr className="mt-10" />
                                <Row className="mt-5">
                                    <div className="info fl">
                                        {(()=>{
                                            let tpl,reason = "";
                                            if(imageState == 3){
                                                switch (rejectReason){
                                                    case "1":
                                                        reason = "图片质量有待提升";
                                                        break;
                                                    case "2":
                                                        reason = "请勿重复上传";
                                                        break;
                                                    case "3":
                                                        reason = "此类图片市场需求较小";
                                                        break;
                                                    case "4":
                                                        reason = "缺乏文字说明，请与编辑部门联系";
                                                        break;
                                                    case "5":
                                                        reason = "图片精度未达到要求";
                                                        break;
                                                    case "6":
                                                        reason = "拍摄角度/场景单一";
                                                        break;
                                                    case "7":
                                                        reason = "请控制传图数量";
                                                        break;
                                                    case "8":
                                                        reason = "题材敏感";
                                                        break;
                                                    case "9":
                                                        reason = "版权问题";
                                                        break;
                                                    case "10":
                                                        reason = "部分图片已拆分发布，其余图片审核未通过";
                                                        break;
                                                    default:
                                                        reason = rejectReason;
                                                        break;
                                                }
                                                tpl = (<OverlayTrigger
                                                    overlay={<Tooltip id="j_image_state">{reason}</Tooltip>}
                                                    placement="bottom"
                                                    delayShow={300}
                                                    delayHide={150}>
                                                <span className="label label-danger icon middle">
                                                    <i className="ace-icon fa fa-times"></i>
                                                </span>
                                                </OverlayTrigger>);
                                            }
                                            if(onlineState == 1){
                                                tpl = (<OverlayTrigger
                                                    overlay={<Tooltip id="j_online_state">{tagWords}</Tooltip>}
                                                    placement="bottom"
                                                    delayShow={300}
                                                    delayHide={150}>
                                                <span className="label label-success icon middle">
                                                   {keywords_name && keywords_name[oneCategory]}
                                                </span>
                                                </OverlayTrigger>);
                                            }
                                            if(productPrice == 2){
                                                tpl = (<OverlayTrigger
                                                    overlay={<Tooltip id="j_online_state">高价图</Tooltip>}
                                                    placement="bottom"
                                                    delayShow={300}
                                                    delayHide={150}>
                                                <span className="label label-inverse icon middle">
                                                   高
                                                </span>
                                                </OverlayTrigger>);
                                            }
                                            if (tpl) return tpl;
                                        })()}
                                    </div>
                                    <h4 className="order fr">{i + 1}</h4>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                );
            })
        );

    };

    editGroupRender() {
        const {lists} = this.props;
        this.state.lists = lists;
        const AreaOptions = require("../../assets/json/areaCountry.json");

        return (
            [...lists].map((item, i) => {
                const info = [0];
                const {id, ossId2, createTime, caption, country, province, city} = item;
                const {location_tag, people_tag, format_tag, theme_tag, concept_tag} = item;

                let _location = [];
                if (location_tag) {
                    [...location_tag].map((item, i) => {
                        if (item && item.label) _location.push({ key: item.label + "  (" + item.id + ")", label: item.label })
                    });
                }
                let _people = [];
                if (people_tag) {
                    [...people_tag].map((item, i) => {
                        if (item && item.label) _people.push({ key: item.label + "  (" + item.id + ")", label: item.label })
                    });
                }
                let _format = [];
                if (format_tag) {
                    [...format_tag].map((item, i) => {
                        if (item && item.label) _format.push({ key: item.label + "  (" + item.id + ")", label: item.label })
                    });
                }
                let _theme = [];
                if (theme_tag) {
                    [...theme_tag].map((item, i) => {
                        if (item && item.label) _theme.push({ key: item.label + "  (" + item.id + ")", label: item.label })
                    });
                }
                let _concept = [];
                if (concept_tag) {
                    [...concept_tag].map((item, i) => {
                        if (item && item.label) _concept.push({ key: item.label + "  (" + item.id + ")", label: item.label })
                    });
                }

                let area = null;
                if (country && province && city) area = [country, province, city]

                return (
                    <Col xs={12} sm={4} md={3} lg={3} key={i} className="thumbnailBox editGroup">
                        <Card className={ "editCard" }>
                            <div className="custom-image" data-key={i}>
                                <img alt="找不到图片" src={ossId2} />
                            </div>
                            <div  className="custom-card">
                                <Row className="pb-5">
                                    <Col xs={6} className="pr-5">
                                        <DatePicker
                                            showTime
                                            format={"yyyy-MM-dd HH:mm:ss"}
                                            value={createTime}
                                            onChange={this.onChange.bind({ op: "time", key: i, id: id, _this: this }) }
                                            style={{ width: "100%" }}/>
                                    </Col>
                                    <Col xs={6} className="pl-5">
                                        <Cascader
                                            value={area}
                                            onChange={this.onChange.bind({ op: "area", key: i, id: id, _this: this }) }
                                            style={{ width: "100%" }}
                                            options={AreaOptions}
                                            placeholder="请选择拍摄地点"/>
                                    </Col>
                                </Row>
                                <Row className="mt-17" onClick={this.TagDoubelClick.bind({ op: "location_tag", key: i, id: id, _this: this }) }>
                                    <Select tags labelInValue
                                        className="people-tag tag"
                                        style={{ width: '100%' }}
                                        value={_location}
                                        onChange={this.onChange.bind({ op: "location_tag", key: i, id: id, _this: this }) }
                                        onSelect={this.tagOnSelect.bind({ op: "location_tag", key: i, id: id, _this: this }) }
                                        searchPlaceholder=" 输入关键词后回车添加新的地点关键词"
                                        placeholder=" 输入关键词后回车添加新的地点关键词"
                                        >
                                    </Select>
                                </Row>
                                <Row className="mt-17" onClick={this.TagDoubelClick.bind({ op: "people_tag", key: i, id: id, _this: this }) }>
                                    <Select tags labelInValue
                                        className="people-tag tag"
                                        style={{ width: '100%' }}
                                        value={_people}
                                        searchPlaceholder=" 输入人物后回车添加新的人物名称"
                                        placeholder=" 输入人物后回车添加新的人物名称"
                                        onChange={this.onChange.bind({ op: "people_tag", key: i, id: id, _this: this }) }
                                        onSelect={this.tagOnSelect.bind({ op: "people_tag", key: i, id: id, _this: this }) }>
                                    </Select>
                                </Row>
                                <Row className="mt-17 tag" onClick={this.TagDoubelClick.bind({ op: "format_tag", key: i, id: id, _this: this }) }>
                                    <Select tags labelInValue
                                        className="people-tag tag"
                                        style={{ width: '100%' }}
                                        value={_format}
                                        onChange={this.onChange.bind({ op: "format_tag", key: i, id: id, _this: this }) }
                                        onSelect={this.tagOnSelect.bind({ op: "format_tag", key: i, id: id, _this: this }) }
                                        searchPlaceholder=" 输入关键词后回车添加新的事件关键词"
                                        placeholder=" 输入参数后回车添加新的参数关键词"
                                        >
                                    </Select>
                                </Row>
                                <Row className="mt-17 themTag" onClick={this.TagDoubelClick.bind({ op: "theme_tag", key: i, id: id, _this: this }) }>
                                    <Select tags labelInValue
                                        className="keyword-tag tag"
                                        style={{ width: '100%' }}
                                        value={_theme}
                                        onChange={this.onChange.bind({ op: "theme_tag", key: i, id: id, _this: this }) }
                                        onSelect={this.tagOnSelect.bind({ op: "theme_tag", key: i, id: id, _this: this }) }
                                        searchPlaceholder=" 输入关键词后回车添加新的事件关键词"
                                        placeholder=" 输入主题（事件）后回车添加新的关键词"
                                        >
                                    </Select>
                                </Row>
                                <Row className="mt-17" onClick={this.TagDoubelClick.bind({ op: "concept_tag", key: i, id: id, _this: this }) }>
                                    <Select tags labelInValue
                                        className="people-tag tag"
                                        style={{ width: '100%' }}
                                        value={_concept}
                                        searchPlaceholder=" 输入人物后回车添加新的人物名称"
                                        placeholder=" 输入概念后回车添加新的概念关键词"
                                        onChange={this.onChange.bind({ op: "concept_tag", key: i, id: id, _this: this }) }
                                        onSelect={this.tagOnSelect.bind({ op: "concept_tag", key: i, id: id, _this: this }) }>
                                    </Select>
                                </Row>
                                <Row className="mt-10 mb-10">
                                    <Input
                                        value={caption}
                                        placeholder="请输入图片说明"
                                        type="textarea"
                                        autoComplete="off"
                                        rows="5"
                                        onChange={this.onChange.bind({ op: "caption", key: i, id: id, _this: this }) }/>
                                </Row>
                                <hr/>
                                <Row>
                                    <div className="info fl">
                                        {[...info].map((item, i) => {
                                            let tpl, tooltip;
                                            switch (item) {
                                                case 0:
                                                    tpl = (<OverlayTrigger
                                                        key={i}
                                                        overlay={<Tooltip id="imgId">高价图</Tooltip>}
                                                        placement="top"
                                                        delayShow={300}
                                                        delayHide={150}>
                                                        <span className="black icon mr-5" key={i}>高</span>
                                                    </OverlayTrigger>);
                                                    break;
                                                case 1:
                                                    break;
                                                default:
                                                    break;
                                            }
                                            if (tpl) return tpl;
                                        }) }
                                    </div>
                                    <h4 className="order fr">{i + 1}</h4>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                );
            })
        );
    };

    offlineRender({type}) {
        const {lists} = this.props;
        this.state.lists = lists;

        return (
            [...lists].map((item, i) => {
                const {id, firstUrl, ossId2, rejectReason, createTime, title} = item;
                const reason = this.rejectReason(rejectReason);

                return (
                    <Col xs={12} sm={4} md={3} lg={3} key={i} className="thumbnailBox offline">
                        <Card className={"editCard"}>
                            <div className="custom-image">
                                <img alt="找不到图片" src={firstUrl ? firstUrl : ossId2} />
                            </div>
                            <div  className="custom-card" onClick={e => { e.stopPropagation() } }>
                                <Row>
                                    <div className="time-tag fl">
                                        <span>{createTime}</span>
                                    </div>
                                </Row>
                                <Row>
                                    {type === "resource" && <p className="describe" style={{ "height":"54px","overflow":"auto"}}>{reason}</p>}
                                    {type === "group" &&  _.trunc("标题："+{title},20)}
                                </Row>
                                <hr />
                                <Row className="mt-10 mb-5">
                                    <Button
                                        size="small"
                                        type="primary"
                                        data-operate="edit"
                                        data-id={id}
                                        data-listkey={i}
                                        onClick={this.handleOnClick.bind(this) }>
                                        编审
                                    </Button>
                                    <Button
                                        size="small"
                                        type="primary"
                                        data-operate="reviewRecords"
                                        data-id={id}
                                        data-listkey={i}
                                        onClick={this.handleOnClick.bind(this) }>
                                        编审记录
                                    </Button>
                                    {type === "group" &&
                                        <Button
                                            size="small"
                                            type="primary"
                                            data-operate="postil"
                                            data-id={id}
                                            data-listkey={i}
                                            onClick={this.handleOnClick.bind(this) }>
                                            批注
                                        </Button>
                                    }
                                    {type === "group" &&
                                        <Button
                                            className="mt-5"
                                            size="small"
                                            type="primary"
                                            data-operate="publish"
                                            data-id={id}
                                            data-listkey={i}
                                            onClick={this.handleOnClick.bind(this) }>
                                            上线
                                        </Button>
                                    }
                                    {type === "group" &&
                                        <Button
                                            className="mt-5"
                                            size="small"
                                            type="primary"
                                            data-operate="topic"
                                            data-id={id}
                                            data-listkey={i}
                                            onClick={this.handleOnClick.bind(this) }>
                                            已加入专题
                                        </Button>
                                    }
                                    <h4 className="order fr">{i + 1}</h4>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                );
            })
        );
    };

    liveRender() {
        const {lists} = this.props;
        this.state.lists = lists;

        return (
            [...lists].map((item, i) => {
                const {imgId, imgSrc, grade, info} = item;
                return (
                    <Col xs={12} sm={4} md={3} lg={3} key={i} className="thumbnailBox edit">
                        <Card className={ this.state.selectStatus[i] ? "editCard selected" : "editCard" }>
                            <div className="custom-image"  onClick={this.toggleSelect.bind(this) }  data-key={i}>
                                <img alt="找不到图片" src={imgSrc} />
                            </div>
                            <div  className="custom-card" onClick={e => { e.stopPropagation() } }>
                                <Row>
                                    <div className="fl">
                                        <span>{"图片ID：" + imgId}</span>
                                    </div>
                                </Row>
                                <Row className="mb-10">
                                    <div className="grade">
                                        图片等级：
                                        <RadioGroup
                                            value={grade}
                                            onChange={this.handleOnClick.bind(this) }
                                            operate="radio"
                                            >
                                            <Radio key="a" value={1} id={imgId} listkey={i}>A</Radio>
                                            <Radio key="b" value={2} id={imgId} listkey={i}>B</Radio>
                                            <Radio key="c" value={3} id={imgId} listkey={i}>C</Radio>
                                            <Radio key="d" value={4} id={imgId} listkey={i}>D</Radio>
                                            <Radio key="e" value={5} id={imgId} listkey={i}>E</Radio>
                                        </RadioGroup>
                                    </div>
                                </Row>
                                <hr />
                                <Row className="mt-5">
                                    <div className="info fl">
                                        {[...info].map((item, i) => {
                                            let tpl, tooltip;
                                            switch (item) {
                                                case 0:
                                                    tpl = (<OverlayTrigger
                                                        key={i}
                                                        overlay={<Tooltip id="imgId">高价图</Tooltip>}
                                                        placement="top"
                                                        delayShow={300}
                                                        delayHide={150}>
                                                        <span className="black icon mr-5" key={i}>高</span>
                                                    </OverlayTrigger>);
                                                    break;
                                                case 1:
                                                    break;
                                                default:
                                                    break;
                                            }
                                            if (tpl) return tpl;
                                        }) }
                                    </div>
                                    <h4 className="order fr">{i + 1}</h4>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                );
            })
        );
    };

    postilRender() {
        const {lists} = this.props;
        this.state.lists = lists;

        return (
            [...lists].map((item, i) => {
                const info = [0],
                    imgSrc = "http://pic.vcg.cn/bigimg/800bigwater/16318000/gic16318414.jpg";
                const {resId, qualityRank, createTime, caption, country, province, city, ossId2} = item;
                const {location_tag, people_tag, format_tag, theme_tag, concept_tag} = item;

                let _location = [];
                if (location_tag) {
                    [...location_tag].map((item) => {
                        if (item && item.label) _location.push(<Tag key={"location_"+item.id}>{item.label}</Tag>);
                    });
                }
                let _people = [];
                if (people_tag) {
                    [...people_tag].map((item) => {
                        if (item && item.label) _people.push(<Tag key={"people_"+item.id}>{item.label}</Tag>);
                    });
                }
                let _format = [];
                if (format_tag) {
                    [...format_tag].map((item) => {
                        if (item && item.label) _format.push(<Tag key={"format_"+item.id}>{item.label}</Tag>);
                    });
                }
                let _theme = [];
                if (theme_tag) {
                    [...theme_tag].map((item) => {
                        if (item && item.label) _theme.push(<Tag key={"theme_"+item.id}>{item.label}</Tag>);
                    });
                }
                let _concept = [];
                if (concept_tag) {
                    [...concept_tag].map((item) => {
                        if (item && item.label) _concept.push(<Tag key={"concept_"+item.id}>{item.label}</Tag>);
                    });
                }

                return (
                    <Col xs={12} sm={4} md={3} lg={3} key={i} className="thumbnailBox postil">
                        <Card className={ "postilCard" }>
                            <div className="custom-image" data-key={i}>
                                <img alt="找不到图片" src={ossId2} />
                            </div>
                            <div  className="custom-card">
                                <Row className="pb-5">
                                    <div className="fl">
                                        <span>{"图片ID：" + resId}</span>
                                    </div>
                                </Row>
                                <Row className="pb-5">
                                    <div className="fl">
                                        <span>{"等级：" + String.fromCharCode(qualityRank + 96).toUpperCase() }</span>
                                    </div>
                                </Row>
                                <Row className="pb-5">
                                    <div className="fl">
                                        <span>{"创建时间：" + createTime}</span>
                                    </div>
                                </Row>
                                <Row className="pb-5">
                                    <div className="fl">
                                        <span>{"地区：" + country + "/" + province + "/" + city}</span>
                                    </div>
                                </Row>
                                <Row className="pb-5">
                                    <p className="describe" style={{ "height":"54px","overflow":"auto"}}>
                                        地点：{_location}
                                    </p>
                                </Row>
                                <Row className="pb-5">
                                    <p className="describe" style={{ "height":"54px","overflow":"auto"}}>
                                        人物：{_people}
                                    </p>
                                </Row>
                                <Row className="pb-5">
                                    <p className="describe" style={{ "height":"54px","overflow":"auto"}}>
                                        规格：{_format}
                                    </p>
                                </Row>
                                <Row className="pb-5">
                                    <p className="describe" style={{ "height":"54px","overflow":"auto"}}>
                                        主题：{_theme}
                                    </p>
                                </Row>
                                <Row className="pb-5">
                                    <p className="describe" style={{ "height":"54px","overflow":"auto"}}>
                                        概念：{_concept}
                                    </p>
                                </Row>
                                <Row className="mb-5">
                                    <p className="describe" style={{ "height":"54px","overflow":"auto"}}>
                                        图片说明：{_.escape(caption)}
                                    </p>
                                </Row>
                                <hr/>
                                <Row>
                                    <div className="info fl">
                                        {[...info].map((item, i) => {
                                            let tpl, tooltip;
                                            switch (item) {
                                                case 0:
                                                    tpl = (<OverlayTrigger
                                                        key={i}
                                                        overlay={<Tooltip id="imgId">高价图</Tooltip>}
                                                        placement="top"
                                                        delayShow={300}
                                                        delayHide={150}>
                                                        <span className="black icon mr-5" key={i}>高</span>
                                                    </OverlayTrigger>);
                                                    break;
                                                case 1:
                                                    break;
                                                default:
                                                    break;
                                            }
                                            if (tpl) return tpl;
                                        }) }
                                    </div>
                                    <h4 className="order fr">{i + 1}</h4>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                );
            })
        );

    };

    favoriteRender() {
        const {lists} = this.props;
        this.state.lists = lists;

        return (
            [...lists].map((item, i) => {
                const edit = false;
                const {id, ossId2, createTime, caption, creditLine, onlineState, imageState} = item;
                //console.log(item);
                let onlineStateClass = "",onlineStateText=""; //  '1已上线2未上线3撤图4冻结 ',
                if(onlineState==1){
                    onlineStateClass="text-success";onlineStateText="已上线";
                }else if(onlineState==2&&imageState==3||onlineState==3&&imageState==2){
                    // '1未编审 2已编审/创意类关键词审核 3 不通过 4 图片审核通过',
                    onlineStateClass="text-danger";onlineStateText="不通过";
                }else{
                    onlineStateText="未上线";
                }
                return (
                    <Col xs={12} sm={4} md={3} lg={3} key={String.fromCharCode(i + 96) } className="thumbnailBox storage" >
                        <Card className={ this.state.selectStatus[i] ? "favoriteCard selected" : "favoriteCard" }>
                            <div className="custom-image"  onClick={this.toggleSelect.bind(this) } data-key={i} >
                                <img alt="找不到图片" src={ossId2} />
                            </div>
                            <div className="custom-card" onClick={e => { e.stopPropagation() } }>
                                <Row>
                                    <div className="time-tag fl">
                                        <span>{createTime ? createTime : "数据为空"}</span>
                                    </div>
                                </Row>
                                <Row className="mb-10">
                                    <p className="describe" style={{ "height":"54px","overflow":"auto"}}>
                                        {_.escape(caption)}
                                    </p>
                                </Row>
                                <Row className="mt-17">
                                    <p className="auth fl">{}</p>
                                    <p className="autograph fr">{creditLine}</p>
                                </Row>
                                <Row className="mb-5 ml--5">
                                    {!edit &&
                                        <OverlayTrigger
                                            key={i}
                                            overlay={<Tooltip id="j_delete">删除</Tooltip>}
                                            placement="top"
                                            delayShow={150}
                                            delayHide={50}>
                                            <i
                                                className={"tip fa fa-trash-o"}
                                                onClick={this.handleOnClick.bind(this) }
                                                data-operate="delete"
                                                data-id={id}
                                                data-listkey={i}
                                                ></i>
                                        </OverlayTrigger>
                                    }
                                    <h4 className="order fr">
                                        <OverlayTrigger
                                            key={"onlineState"}
                                            overlay={<Tooltip id="j_overlay_onlineState">{onlineStateText}</Tooltip>}
                                            placement="top"
                                            delayShow={150}
                                            delayHide={50}>
                                            <span className={onlineStateClass}>{i + 1}</span>
                                        </OverlayTrigger>
                                    </h4>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                );
            })
        );
    };

    creativeRender() {
        const {lists} = this.props;
        this.state.lists = lists;

        return (
            [...lists].map((item, i) => {
                const title = "国外公路";

                const {id, ossId2, createTime, licenseType, qualityRank, onlineState, propertyRelease, modelRelease, providerName, creditLine, publishLoading, undoLoading, confirmLoading} = item;

                return (
                    <Col xs={12} sm={4} md={3} lg={3} key={String.fromCharCode(i + 96) } className="thumbnailBox storage" >
                        <Card className={ this.state.selectStatus[i] ? "createCard selected" : "create" }>
                            <div className="custom-image"  onClick={this.toggleSelect.bind(this) } data-key={i} >
                                <img alt="找不到图片" src={ossId2} />
                            </div>
                            <div  className="custom-card" onClick={e => { e.stopPropagation() } }>
                                <Row>
                                    <p className="auth fl">{_.trunc(providerName,20)}</p>
                                    <p className="autograph fr">{_.trunc(creditLine,20)}</p>
                                </Row>
                                <Row className="mb-5">ID：{id}</Row>
                                <Row className="mb-5">标题： {_.trunc(title,20)}</Row>
                                <Row className="mb-5">
                                    授权：
                                    {licenseType==1 && "RF"}
                                    {licenseType==2 && "RM"}
                                </Row>
                                <Row className="mb-5">
                                    信息：
                                    <span className="mr-5">{propertyRelease ? <a className={propertyRelease ? "red pointer" : ""} href={"/flie/id=" + id + "&type=propertyRelease"} target="_blank">肖像权</a> : "肖像权"}</span>{" "}
                                    <span>{modelRelease ? <a className={modelRelease ? "red pointer" : ""} href={"/flie/id=" + id + "&type=modelRelease"} target="_blank">物权</a> : "物权"}</span>
                                </Row>
                                <Row className="mb-5">
                                    等级：
                                    {qualityRank==1 && "A"}
                                    {qualityRank==2 && "B"}
                                    {(!qualityRank||qualityRank==3) && "C"}
                                    {qualityRank==4 && "D"}
                                    {qualityRank==5 && "E"}
                                </Row>
                                <Row className="mb-5">上传时间：{createTime}</Row>
                                <hr className="mt-15"/>
                                <Row className="mb-5 ml--5 mt-10">
                                    {onlineState === 2 &&
                                        <Button
                                            loading={publishLoading}
                                            size="small"
                                            type="primary"
                                            data-operate="publish"
                                            data-id={id}
                                            data-listkey={i}
                                            onClick={this.handleOnClick.bind(this) }>
                                            {"发布"}
                                        </Button>
                                    }
                                    {onlineState !== 2 && onlineState !== 5 &&
                                        <Button
                                            loading={undoLoading}
                                            size="small"
                                            type="primary"
                                            data-operate="offline"
                                            data-id={id}
                                            data-listkey={i}
                                            onClick={this.handleOnClick.bind(this) }>
                                            {"标记撤图"}
                                        </Button>
                                    }
                                    {onlineState === 5 &&
                                        <Button
                                            loading={confirmLoading}
                                            size="small"
                                            type="primary"
                                            data-operate="confirm"
                                            data-id={id}
                                            data-listkey={i}
                                            onClick={this.handleOnClick.bind(this) }>
                                            {"确认撤图"}
                                        </Button>
                                    }
                                    {onlineState === 5 &&
                                        <Button
                                            size="small"
                                            type="primary"
                                            data-operate="cancel"
                                            data-id={id}
                                            data-listkey={i}
                                            onClick={this.handleOnClick.bind(this) }>
                                            {"取消撤图"}
                                        </Button>
                                    }
                                    <h4 className="order fr">{i + 1}</h4>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                );
            })
        );
    };

    photosRender() {
        const {lists} = this.props;
        this.state.lists = lists;

        return (
            [...lists].map((item, i) => {
                const {id, resId, ossId2, caption, createTime, providerName, onlineState, imageState, creditLine} = item;
                const edit = false;
                let onlineStateClass = "",onlineStateText=""; //  '1已上线2未上线3撤图4冻结 ',
                if(onlineState==1){
                    onlineStateClass="text-success";onlineStateText="已上线";
                }else if(onlineState==2&&imageState==3||onlineState==3&&imageState==2){
                    // '1未编审 2已编审/创意类关键词审核 3 不通过 4 图片审核通过',
                    onlineStateClass="text-danger";onlineStateText="不通过";
                }else{
                    onlineStateText="未上线";
                }
                return (
                    <Col xs={12} sm={4} md={3} lg={3} key={i} className="thumbnailBox offline">
                        <Card className={ this.state.selectStatus[i] ? "photosCard selected" : "editCard" }>
                            <div className="custom-image" onClick={this.toggleSelect.bind(this) } data-key={i}>
                                <img alt="找不到图片" src={ossId2} />
                            </div>
                            <div  className="custom-card" onClick={e => { e.stopPropagation() } }>
                                <Row className="mb-10">
                                    <span className="fl">{createTime ? createTime : "0000-00-00 00:00:00"}</span>
                                </Row>
                                <Row className="mb-5">ID：{resId}</Row>
                                <Row className="mb-10">
                                    <p style={{ "height":"54px","overflow":"auto"}}>
                                        图说：{_.escape(caption)}
                                    </p>
                                </Row>
                                <Row>
                                    <p className="autograph fr">{creditLine}</p>
                                </Row>
                                <hr />
                                <Row className="mt-10 mb-5">
                                    {!edit &&
                                    <OverlayTrigger
                                        key={"edit"}
                                        overlay={<Tooltip id={"j_pencil-square" + id}>{"编审"}</Tooltip>}
                                        placement="top"
                                        delayShow={150}
                                        delayHide={50}>
                                        <i
                                            className={"tip fa fa-pencil-square"}
                                            onClick={this.handleOnClick.bind(this) }
                                            data-operate={"edit"}
                                            data-listkey={i}
                                            data-id={id}
                                            ></i>
                                    </OverlayTrigger>
                                    }
                                    {!edit &&
                                    <OverlayTrigger
                                        key={"addInFavorite"}
                                        overlay={<Tooltip id={"j_star-o" + id}>{"收藏"}</Tooltip>}
                                        placement="top"
                                        delayShow={150}
                                        delayHide={50}>
                                        <i
                                            className={"tip fa fa-star-o"}
                                            onClick={this.handleOnClick.bind(this) }
                                            data-operate={"addInFavorite"}
                                            data-listkey={i}
                                            data-id={id}
                                            ></i>
                                    </OverlayTrigger>
                                    }
                                    <h4 className="order fr">
                                        <OverlayTrigger
                                            key={"onlineState"}
                                            overlay={<Tooltip id={"j_overlay_onlineState" + id}>{onlineStateText}</Tooltip>}
                                            placement="top"
                                            delayShow={150}
                                            delayHide={50}>
                                            <span className={onlineStateClass}>{i + 1}</span>
                                        </OverlayTrigger>
                                    </h4>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                );
            })
        );
    };

    cmsTopicSingleRender() {
        const {lists} = this.props;
        this.state.lists = lists;

        return (
            [...lists].map((item, i) => {
                const info = [0],
                    imgSrc = "http://pic.vcg.cn/bigimg/800bigwater/16318000/gic16318414.jpg",
                    downloadHref = "http://pic.vcg.cn/bigimg/800bigwater/16318000/gic16318414.jpg";
                const { id, resId, qualityRank, src, title, width, height, onlineState} = item;
                let onlineStateClass = "",onlineStateText=""; //  '1已上线2未上线3撤图4冻结 ',
                if(onlineState==1){
                    onlineStateClass="text-success";onlineStateText="已上线";
                }else if(onlineState==2&&imageState==3||onlineState==3&&imageState==2){
                    // '1未编审 2已编审/创意类关键词审核 3 不通过 4 图片审核通过',
                    onlineStateClass="text-danger";onlineStateText="不通过";
                }else{
                    onlineStateText="未上线";
                }

                return (
                    <Col xs={12} sm={4} md={3} lg={3} key={i} className="thumbnailBox edit">
                        <Card className={ this.state.selectStatus[i] ? "editCard selected" : "editCard" }>
                            <div className="custom-image"  onClick={this.toggleSelect.bind(this) }  data-key={i}>
                                <img alt="找不到图片" src={src}/>
                            </div>
                            <div  className="custom-card" onClick={e => { e.stopPropagation() } }>
                                <Row>{"图片ID：" + resId}</Row>
                                <Row>
                                    <div className="grade">
                                        图片等级：
                                        <RadioGroup
                                            value={parseInt(qualityRank || 1) }
                                            onChange={this.handleOnClick.bind(this) }>
                                            <Radio key="A" value={1} id={id} listkey={i} operate="radio">A</Radio>
                                            <Radio key="B" value={2} id={id} listkey={i} operate="radio">B</Radio>
                                            <Radio key="C" value={3} id={id} listkey={i} operate="radio">C</Radio>
                                            <Radio key="D" value={4} id={id} listkey={i} operate="radio">D</Radio>
                                            <Radio key="E" value={5} id={id} listkey={i} operate="radio">E</Radio>
                                        </RadioGroup>
                                    </div>
                                </Row>
                                <Row className="mt-17">"标题："{_.trunc(title,20)}</Row>
                                <h4 className="order">
                                    <OverlayTrigger
                                        key={"onlineState"}
                                        overlay={<Tooltip id="j_overlay_onlineState">{onlineStateText}</Tooltip>}
                                        placement="top"
                                        delayShow={150}
                                        delayHide={50}>
                                        <span className={onlineStateClass}>{i + 1}</span>
                                    </OverlayTrigger>
                                </h4>
                            </div>
                        </Card>
                    </Col>
                );
            })
        );
    };

    cmsTopicGrpRender() {
        const {lists} = this.props;
        this.state.lists = lists;

        return (
            [...lists].map((item, i) => {
                const edit = false;
                const {id, src, collectionName, createTime, groupState, resCount, onlineCount, title, onlineState, providerType} = item;
                return (
                    <Col xs={12} sm={4} md={3} lg={3} key={String.fromCharCode(i + 96) } className="thumbnailBox storage" >
                        <Card className={ this.state.selectStatus[i] ? "storageCard selected" : "storageCard" }>
                            <div className="custom-image"  onClick={this.toggleSelect.bind(this) } data-key={i} data-id={id}>
                                <img alt="找不到图片" src={src} />
                            </div>
                            <div  className="custom-card" onClick={e => { e.stopPropagation() } }>
                                <Row>
                                    <span className="num fr">{resCount}</span>
                                    <span className="onlineNum fr">{onlineCount}</span>
                                </Row>
                                <Row className="mb-10">
                                    "标题：" {_.trunc(title,20)}
                                </Row>
                                <Row className="mb-5 ml--5">
                                    <Button
                                        size="small"
                                        type="primary"
                                        data-operate="pushto"
                                        data-id={id}
                                        data-listkey={i}
                                        onClick={this.handleOnClick.bind(this) }>
                                        {"推送"}
                                    </Button>
                                    <Button
                                        size="small"
                                        type="primary"
                                        data-operate="toedit"
                                        data-id={id}
                                        data-listkey={i}
                                        onClick={this.handleOnClick.bind(this) }>
                                        {"添加到未编审"}
                                    </Button>
                                    <a>
                                        <Button
                                            size="small"
                                            type="primary"
                                            data-operate="edit"
                                            data-id={id}
                                            data-listkey={i}
                                            onClick={this.handleOnClick.bind(this) }>
                                            编审
                                        </Button>
                                    </a>
                                    <h4 className="order fr">{i + 1}</h4>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                );
            })
        );
    }

    render() {
        const {lists, types, selectStatus, animate} = this.props;
        const {show, _title, type, body, okBtn, oktext, cancelBtn, param, loading} = this.state.modal;
        let tpl, modal = false;

        if (!selectStatus) this.state.selectStatus = [];

        if (!lists) {
            tpl = <LoadingBox />;
        }else if(lists.length === 0){
            tpl = <div className="col-xs-12"><Well style={{"marginBottom":0}}>暂无相关数据!</Well></div>;
        }else{
            switch (types) {
                case "storage":
                    tpl = this.storageRender();
                    modal = true;
                    break;
                case "edit":
                    tpl = this.editRender();
                    break;
                case "editGroup":
                    tpl = this.editGroupRender();
                    modal = true;
                    break;
                case "offline":
                    tpl = this.offlineRender({ type: "resource" });
                    break;
                case "offlineGroup":
                    tpl = this.offlineRender({ type: "group" });
                    break;
                case "live":
                    tpl = this.liveRender();
                    break;
                case "postil":
                    tpl = this.postilRender();
                    break;
                case "favorite":
                    tpl = this.favoriteRender();
                    break;
                case "creative":
                    tpl = this.creativeRender();
                    break;
                case "photos":
                    tpl = this.photosRender();
                    break;
                case "cmsTopicSingle":
                    tpl = this.cmsTopicSingleRender();
                    break;
                case "cmsTopicGrp":
                    tpl = this.cmsTopicGrpRender();
                    break;
                default:
                    break;
            }
        }
        // console.log("thumbnailBox", animate)
        return (
            <div className="row">
                {animate &&
                    <QueueAnim  delay={100} interval={70}>
                        {lists && types && tpl}
                    </QueueAnim>
                }
                {!animate && lists && types && tpl}
                {modal &&
                    <Modal
                        maskClosable={false}
                        confirmLoading={loading}
                        title={_title}
                        visible={show}
                        onOk={okBtn}
                        onCancel={cancelBtn}>
                        {body && body}
                        {!body && type === "select" &&
                            <RadioGroup onChange={e => this.setParam("value", e.target.value) } value={param.value}>
                                {[...param.option].map((item, i) => {
                                    return (<Radio key={i} value={i}>{item.cnname} ({item.id}) </Radio>)
                                }) }
                            </RadioGroup>
                        }
                        {!body && type === "edit" &&
                            <div>
                                {console.log(param) }
                                <Row className="mt-10">
                                    <Col xs={2} className="textright">中文名</Col>
                                    <Col xs={10}><Input type="text" value={param.cnname} onChange={e => this.setParam("cnname", e.target.value) }/></Col>
                                </Row>
                                <Row className="mt-10">
                                    <Col xs={2} className="textright">中文同义词</Col>
                                    <Col xs={10}>
                                        <Select labelInValue value={param.cnsyno} style={{ width: "100%" }} tags onChange={value => this.setParam("cnsyno", value) }></Select>
                                    </Col>
                                </Row>
                                <Row className="mt-10">
                                    <Col xs={2} className="textright">英文名</Col>
                                    <Col xs={10}><Input type="text" value={param.enname} onChange={e => this.setParam("enname", e.target.value) }/></Col>
                                </Row>
                                <Row className="mt-10">
                                    <Col xs={2} className="textright">英文同义词</Col>
                                    <Col xs={10}>
                                        <Select labelInValue value={param.ensyno} style={{ width: "100%" }} tags onChange={value => this.setParam("ensyno", value) }></Select>
                                    </Col>
                                </Row>
                                <Row className="mt-15">
                                    <Col xs={2} className="textright">类型</Col>
                                    <Col xs={10}>
                                        <RadioGroup onChange={e => this.setParam("kind", e.target.value) } value={param.kind}>
                                            <Radio key="a" value={"0"}>主题</Radio>
                                            <Radio key="b" value={"1"}>概念</Radio>
                                            <Radio key="c" value={"3"}>人物</Radio>
                                            <Radio key="d" value={"4"}>地点</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-15 mb-10">
                                    <Col xs={2} className="textright">备注</Col>
                                    <Col xs={10}><Input type="text" value={param.memo} onChange={e => this.setParam("memo", e.target.value) }/></Col>
                                </Row>
                            </div>
                        }
                    </Modal>
                }
            </div>
        );
    };

    //打开新页面
    // openblank(url) {
    //     let _url = url.indexOf("http://")>-1? url: window.location.origin + url;
    //     var a = document.createElement("a");
    //     a.setAttribute("href", _url);
    //     a.setAttribute("target", "_blank");
    //     a.setAttribute("id", "openwin");
    //     document.body.appendChild(a);
    //     a.click();
    // };

    handleOnClick(event) {
        event.stopPropagation();
        const target = event.target;
        let Dom;
        if (target instanceof HTMLElement) {
            if (target.getAttribute('data-operate')) Dom = target;
            else Dom = target.parentNode;
            const operate = Dom.getAttribute('data-operate');
            const key = Dom.getAttribute('data-listkey');
            const id = Dom.getAttribute('data-id');

            const params = {
                operate,
                key,
                id
            };

            switch (operate) {
                case "download":
                    this.props.onThumbnail(params);
                    break;
                case "edit":
                    const {types} = this.props;
                    const typeText = types == "storage"?"group":"photos";
                    window.open("/editor/edit/"+typeText+"/edit/" + id);
                    break;
                default:
                    this.props.onThumbnail(params);
            }
        } else {
            let params;
            //console.log(target);

            if (target.prefixCls == "ant-radio") {
                params = {
                    "operate": target.operate,
                    "value": target.value,
                    "key": target.listkey,
                    "id": target.id
                }
            }

            //console.log(params);

            // this.setState({params});
            this.state.params = params;
            this.props.onThumbnail(params);
        }

    };

    hangleOnchange(value) {
        const {operate, key, id, _this} = this;

        const params = {
            operate,
            key,
            id
        };

        if (value.target) {
            params.value = value.target.value
        }
        else {
            if (operate === "tags" || operate === "people") {
                let _value = [];
                [...value].map((item, i) => {
                    _value.push(item.label);
                });
                params.value = _value;
            }
            else if (operate === "time") {
                let _value = moment(value).format("YYYY-MM-DD HH:mm:ss");
                params.value = _value;
            }
            else {
                params.value = value;
            }
        }

        _this.props.onThumbnail(params);
    };

    handleClick(param) {
        const {operate} = param;
        switch (operate) {
            case "portrait":
                this.context.router.push("/file/id=" + param.id + "&type=portrait");
                break;
            case "realright":
                this.context.router.push("/file/id=" + param.id + "&type=realright");
                break;
            default:
                this.props.onThumbnail(param);
                break;
        }
    };

    rejectReason(reason) {
        switch (reason) {
            case "1":
                return "图片质量欠佳";
            case "2":
                return "图片精度较低";
            case "3":
                return "重复图片";
            case "4":
                return "题材敏感";
            case "5":
                return "图片市场需求小";
            case "6":
                return "版权问题";
            case "7":
                return "拍摄角度场景单一、无法构成图片故事";
            default:
                return reason;
        }
    }

    //tag筛选
    setModal(config) {
        const modal = Object.assign({}, this.state.modal, { "show": true }, config);
        this.setState({ modal });
    };

    openModal(config) {
        const modal = Object.assign({}, this.modalInit, { "show": true }, config);
        this.setState({ modal });
    };

    closeModal(config) {
        const modal = Object.assign({}, this.modalInit, { "show": false }, config);
        this.setState({ modal });
    };

    onChange(value) {
        const {op, key, id, _this} = this;
        const {lists, hasSelect} = _this.state;

        console.error(value, "onchange");
        if (lists[key].id === id) {//保证数据准确
            if (op.indexOf("_tag") > 0 && !hasSelect) {//只有减少tag时触发,select在change之前执行
                let keywords = [];
                [...value].map((item, i) => {
                    let key = item.key.match(/(\d+)/g);
                    keywords.push({ label: item.label, id: key ? key[0] : [] });//item_key 必须带id
                });
                lists[key][op] = keywords;
            } else {
                switch (op) {
                    case "time":
                        lists[key].createTime = moment(value).format("YYYY-MM-DD HH:mm:ss");
                        break;
                    case "area":
                        lists[key].country = value[0];
                        lists[key].province = value[1];
                        lists[key].city = value[2];
                        break;
                    case "caption":
                        lists[key].caption = value.target.value;
                        break;
                    default:
                        break;
                }
            }

            if (!hasSelect) {
                _this.setState({ lists });
                _this.props.onThumbnail(lists);
            }
            _this.state.hasSelect = false;
        }
    }

    tagOnSelect(value) {
        const {op, key, id, _this} = this;
        console.log(value, this, "onSelect");
        const {dispatch, findKeyword, addKeyword, modifyKeyword} = _this.props;
        const {lists} = _this.state;
        _this.state.hasSelect = true;//是否触发了onselect

        console.log(modifyKeyword);
        if (dispatch) {
            dispatch(findKeyword({ name: value.label })).then(result => {
                if (result.apiError) return false;
                const res = result.apiResponse
                console.log(res);
                if (res.length === 0) {//没有匹配到的词
                    _this.openModal({
                        _title: "没有匹配到的词",
                        type: "edit",
                        ontext: "新建",
                        param: {
                            "cnname": value.label,
                            "kind": "0"
                        },
                        okBtn: () => {
                            const {dispatch} = _this.props;
                            _this.setModal({ loading: true });

                            dispatch(addKeyword(_this.state.modal.param)).then(result => {
                                const kind = _this.state.modal.param.kind;
                                _this.closeModal({ loading: false });
                                if (result.apiError) {
                                    _this.setModal({
                                        _title: "添加失败请重新尝试",
                                    })
                                    return false;
                                }
                                _this.setValue({ type: "add", value: { label: value.label, id: result.apiResponse.insert_id }, key, kind })
                            });
                        }
                    });
                }
                else if (res.length === 1 && res[0].cnname !== value.label) {//有一个匹配的关键词但是和输入不一样
                    _this.openModal({
                        _title: "输入确认",
                        body: <p>你想输入的是这个词吗？<b> {res[0].cnname} ({res[0].id}) </b></p>,
                        okBtn: () => { _this.setValue({ type: "add", value: { label: res[0].cnname, id: res[0].id }, key, kind: res[0].kind }); _this.closeModal() }
                    });
                }
                else if (res.length > 1) {//匹配到多个关键词
                    _this.openModal({
                        _title: "请选择一个关键词",
                        type: "select",
                        param: {
                            value: 0,
                            option: res
                        },
                        okBtn: () => {
                            let val = _this.state.modal.param.value;
                            _this.setValue({ type: "add", value: { label: res[val].cnname, id: res[val].id }, key, kind: res[val].kind });
                            _this.closeModal()
                        }
                    });
                }
                else if (res.length === 1 && res[0].cnname === value.label) {//有一个匹配的关键词
                    _this.setValue({ type: "add", value: { label: res[0].cnname, id: res[0].id }, key, kind: res[0].kind });
                    // _this.closeModal();
                }
            });
        }
    };

    //向外传值
    setValue({type, value, key, kind, oldOp}) {
        const {onThumbnail, addKeyworddoc} = this.props;
        const {lists} = this.state;
        const op = this.map_kind(kind);

        let index = _.findIndex(lists[key][op], 'id', value.id);// -1新词
        console.log(index, lists[key][op], value.id)
        if (type === "edit") {
            const taglist = lists[key][oldOp];
            const listkey = _.findIndex(taglist, "label", value);
            console.log(taglist[listkey]);

            if (taglist[listkey].kind === kind) {//原kind等于编辑过的kind
                lists[key][oldOp][listkey].label = value.label;
            } else {
                delete lists[key][oldOp][listkey];
                lists[key][op].push(value);
            }
            addKeyworddoc(value, kind);//改变字典
        }
        else if (index > -1) {
            this.openModal({
                _title: "提示信息",
                body: <p>关键词：<b> {value.label} ({value.id}) </b>已存在~</p>,
            });
        } else {
            if (type === "add") {
                lists[key][op].push(value);
                addKeyworddoc(value, kind);
            }
            else {
                lists[key][op] = value;
            }
            onThumbnail(lists);
            this.setState({ lists });
        }
        // console.error(lists[key], op);
    };

    map_kind(kind) {
        let op = "theme_tag";
        console.log(kind)
        switch (parseInt(kind)) {
            case 0:
                op = "theme_tag";
                break;
            case 1:
                op = "concept_tag";
                break;
            case 2:
                op = "format_tag";
                break;
            case 3:
                op = "people_tag";
                break;
            case 4:
                op = "location_tag";
                break;
            default:
                break;
        }
        return op;
    }
    //modal param set
    setParam(key, value) {
        let modal = this.state.modal;
        modal.param[key] = value;
        this.setState(modal);
    };

    TagDoubelClick(e) {
        const {_this} = this;
        const {target} = e;
        const text = target.innerHTML;

        if (e.target && e.target.className.indexOf("ant-select-selection__choice__content") > -1) {
            if (_this.state.tagClickTimer) {
                _this.TagEdit({ key: this.key, op: this.op, value: text });
            }
            _this.state.tagClickTimer = setTimeout(() => {
                clearTimeout(_this.state.tagClickTimer);
                _this.state.tagClickTimer = null;
            }, 300);
        }
    }

    //修改tag
    TagEdit({key, op, value}) {
        const {dispatch, modifyKeyword, findKeyword, getKeywordbyId} = this.props;
        const {lists} = this.state;
        const error = this.tagError(value);
        const taglist = lists[key][op];
        const listkey = _.findIndex(taglist, "label", value);

        // 没有匹配到错误
        if (!error) {
            dispatch(getKeywordbyId(taglist[listkey].id)).then(result => {
                if (result.apiError) return false;
                const res = result.apiResponse;
                const param = res[0];
                console.log(result.apiResponse);

                let ensyno = [];
                if (param.ensyno) {
                    [...param.ensyno].map((item, i) => {
                        if (item) ensyno.push({ key: item, label: item });
                    });
                }

                let cnsyno = [];
                if (param.cnsyno) {
                    [...param.cnsyno].map((item, i) => {
                        if (item) cnsyno.push({ key: item, label: item });
                    });
                }

                this.openModal({
                    _title: "修改关键词",
                    type: "edit",
                    ontext: "确认修改",
                    param: {
                        cnname: param.cnname,
                        enname: param.enname,
                        cnsyno: cnsyno,
                        ensyno: ensyno,
                        id: param.id.toString(),
                        kind: param.kind.toString(),
                        memo: param.memo
                    },
                    okBtn: () => {
                        const {dispatch} = this.props;
                        this.setModal({ loading: true });
                        let modalparam = this.state.modal.param;

                        modalparam.cnsyno = _.pluck(modalparam.cnsyno, 'key');
                        modalparam.ensyno = _.pluck(modalparam.ensyno, 'key');
                        console.log(modalparam);

                        dispatch(modifyKeyword(modalparam)).then(result => {
                            const kind = this.state.modal.param.kind;
                            this.closeModal({ loading: false });
                            if (result.apiError) {
                                this.setModal({
                                    _title: "添加失败请重新尝试"
                                });
                                return false;
                            }
                            console.log(result.apiResponse);
                            this.setValue({ type: "edit", value: { label: modalparam.cnname, id: modalparam.id }, key, kind, oldOp: op })
                        });
                    }
                });
            });
        }
        else if (error === 0) {//没检测

        }
        else if (error === 1) {//多义词

        }
        else if (error === 2) {//新词

        }
    };

    //检测tag错误
    tagError(tag) {
        if (tag.indexOf("✲") > 0) return 0;//没检测
        if (tag.indexOf("✻") > 0) return 1;//多义词
        if (tag.indexOf("✳") > 0) return 2;//新词
        else return false;
    }
}