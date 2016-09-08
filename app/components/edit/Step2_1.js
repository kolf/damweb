import React, {Component, PropTypes}    from "react";
import {connect}                        from "react-redux";
import ReactDOM                         from "react-dom";

import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Modal from 'antd/lib/modal';
import Radio from "antd/lib/radio";

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;

import { findKeyword, addKeyword } from "app/action_creators/edit_action_creator";

export let EditStep2_1 = React.createClass({

    //tag格式 [{id,label},...]
    getInitialState: function () {
        const {title, caption} = this.props;
        const tags = this.turnTags(this.props);

        this.modalInit = {
            show: false,
            _title: "信息确认",
            param: {},
            body: false,
            loading: false,
            okBtn: this.closeModal,
            cancelBtn: this.closeModal,
            oktext: false,
            canceltext: false,
            width: 520,
            type: "",
        };

        return {
            tags,
            title,
            caption,
            grouptimer: null,
            modal: {
                show: false,
                _title: "12312",
                body: null,
                okBtn: this.closeModal,
                cancelBtn: this.closeModal,
                oktext: null,
                canceltext: null,
                type: null,
                width: 520,
                loading: false,
                param: {

                }
            },
            hasSelect: false
        };
    },

    componentDidMount() {
        // 代理/双击/弹窗
        document.getElementById("grouppanel").addEventListener("click", (e) => {
            if (e.target && e.target.className === "ant-select-selection__choice__content") {
                if (this.state.grouptimer) {
                    console.error("asdad");
                }
                this.state.grouptimer = setTimeout(() => {
                    clearTimeout(this.state.grouptimer);
                    this.state.grouptimer = null;
                }, 300);
            }
        });
    },

    componentWillReceiveProps(nextProps) {
        console.info(nextProps);
        this.turnTags(nextProps)
    },

    turnTags(param) {
        const {keywords, classify} = param;

        let _keywords = [];
        if (keywords)
            [...keywords].map((item, i) => {
                if (item) _keywords.push({ key: "关键词：" + item.label + "  (" + item.id + ")", label: item.label })
            });

        if (classify) {
            let _classify = [];
            [...classify].map((item, i) => {
                if (item) _classify.push({ key: "分类：" + item.label + "  (" + item.value + ")", label: item.label });
            });
            _keywords = _classify.concat(_keywords);
        }

        if (this.state) this.state.tags = _keywords;
        return _keywords;
    },

    turnOption(listArr) {
        let option = [];
        if (listArr) {
            [...listArr].map(item => {
                option.push(<Option key={item.key}>{item.label}</Option>);
            })
        }
        return option;
    },

    titleChange(e) {
        const {handonChange} = this.props;
        const value = e.target.value;

        // console.info(value , "step2_1_title");
        this.setState({ title: value });
        handonChange({ key: "title", value });
    },

    captionChange(e) {
        const {handonChange} = this.props;
        const value = e.target.value;

        // console.info(value , "step2_1_describe");
        this.setState({ caption: value });
        handonChange({ key: "caption", value });
    },

    render() {
        const {getFieldProps} = this.props.form;
        const {title, caption, tags, modal} = this.state;
        const {show, _title, type, body, okBtn, oktext, cancelBtn, canceltext, param, loading, width} = modal;

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 18 }
        };

        // 组照标题
        const titleProps = getFieldProps('title', {
            initialValue: title,
            rules: [
                { required: true, message: '真的不打算写点什么吗？' }
            ]
        });

        //关键词
        const tagProps = getFieldProps('tag', {
            initialValue: tags,
            rules: [
                { required: true, message: '必须选择一些关键词', type: 'array' }
            ]
        });

        //组照说明
        const describeProps = getFieldProps('describe', {
            initialValue: caption,
            rules: [
                { required: true, message: '真的不打算写点什么吗？' }
            ]
        });

        return (
            <Form horizontal form={this.props.form} id="grouppanel">
                <FormItem
                    {...formItemLayout}
                    label="组照标题">
                    <Input
                        {...titleProps}
                        placeholder="请输入组照标题"
                        onChange={this.titleChange}
                        autoComplete="off"
                        type="text" />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="分类/关键词">
                    <Select tags labelInValue
                        {...tagProps}
                        onChange={this.tagsChange}
                        onSelect={this.onSelect}
                        style={{ width: '100%' }}>
                    </Select>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="组照说明"
                    autosize>
                    <Input
                        {...describeProps}
                        placeholder="请输入组照说明"
                        type="textarea"
                        autoComplete="off"
                        autosize={{ minRows: 5 }}
                        rows={9}
                        onChange={this.captionChange}/>
                </FormItem>
                <Modal
                    maskClosable={false}
                    confirmLoading={loading}
                    title={_title}
                    visible={show}
                    onOk={okBtn}
                    onCancel={cancelBtn}
                    width={width}
                    okText={oktext}
                    cancelText={canceltext}
                    >
                    {body && body}
                    {!body && type === "select" &&
                        <RadioGroup onChange={e => this.setParam("value", e.target.value) } value={param.value}>
                            {[...param.option].map((item, i) => {
                                // let type ;
                                // switch (item.kind) {
                                //     case 0:
                                //         type = ""
                                //         break;
                                
                                //     default:
                                //         break;
                                // }
                                return (
                                    <Radio style={{width:"100%", marginTop:"15px"}} key={i} value={i}>{item.cnname} ({item.id})</Radio>
                                )
                            }) }
                        </RadioGroup>
                    }
                    {!body && type === "edit" &&
                        <div>
                            <Row className="mt-10">
                                <Col xs={2} className="textright">中文名</Col>
                                <Col xs={10}><Input type="text" value={param.cnname} onChange={e => this.setParam("cnname", e.target.value)}/></Col>
                            </Row>
                            <Row className="mt-10">
                                <Col xs={2} className="textright">中文同义词</Col>
                                <Col xs={10}>
                                    <Select style={{ width: "100%" }} tags onChange={value => this.setParam("cnsyno", value) }></Select>
                                </Col>
                            </Row>
                            <Row className="mt-10">
                                <Col xs={2} className="textright">英文名</Col>
                                <Col xs={10}><Input type="text" value={param.enname} onChange={e => this.setParam("enname", e.target.value)}/></Col>
                            </Row>
                            <Row className="mt-10">
                                <Col xs={2} className="textright">英文同义词</Col>
                                <Col xs={10}>
                                    <Select style={{ width: "100%" }} tags onChange={value => this.setParam("ensyno", value) }></Select>
                                </Col>
                            </Row>
                            <Row className="mt-15">
                                <Col xs={2} className="textright">类型</Col>
                                <Col xs={10}>
                                    <RadioGroup onChange={e => this.setParam("kind", e.target.value.toString()) } value={param.kind}>
                                        <Radio key="a" value={"0"}>主题</Radio>
                                        <Radio key="b" value={"1"}>概念</Radio>
                                        <Radio key="c" value={"3"}>人物</Radio>
                                        <Radio key="d" value={"4"}>地点</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                            <Row className="mt-15 mb-10">
                                <Col xs={2} className="textright">备注</Col>
                                <Col xs={10}><Input type="text" value={param.memo} onChange={e => this.setParam("memo", e.target.value)}/></Col>
                            </Row>
                        </div>
                    }
                </Modal>
            </Form>
        );
    },

    setModal(config) {
        const modal = Object.assign({}, this.state.modal, { "show": true }, config);
        this.setState({ modal });
    },

    openModal(config) {
        const modal = Object.assign({}, this.modalInit, { "show": true }, config);
        this.setState({ modal });
    },

    closeModal(config) {
        const modal = Object.assign({}, this.modalInit, { "show": false }, config);
        this.setState({ modal });
    },

    onSelect(value) {
        console.log(value, "onSelect");
        const {dispatch} = this.props;
        this.state.hasSelect = true;//是否触发了onselect

        dispatch(findKeyword({ name: value.label })).then(result => {
            if (result.apiError) return false;
            const res = result.apiResponse
            console.log(res);
            if (res.length === 0) {//没有匹配到的词
                this.openModal({
                    _title: "没有匹配到的词",
                    type: "edit",
                    ontext: "新建",
                    param: {
                        "cnname": value.label,
                        "kind": "0"
                    },
                    okBtn: () => {
                        const {dispatch} = this.props;
                        this.setModal({loading: true});

                        dispatch(addKeyword(this.state.modal.param)).then(result=>{
                            if(result.apiError) return false;
                            this.closeModal({loading: false});
                            console.log(result.apiResponse);
                            this.setValue({ label: value.label, id: result.apiResponse.insert_id });
                        });
                    }
                });
            }
            else if (res.length === 1 && res[0].cnname !== value.label) {//有一个匹配的关键词但是和输入不一样
                this.openModal({
                    _title: "输入确认",
                    body: <p>你想输入的是这个词吗？<b> {res[0].cnname} ({res[0].id}) </b></p>,
                    okBtn: () => { this.setValue({ label: res[0].cnname, id: res[0].id }); this.closeModal() },
                    canceltext: "编辑新词条"
                });
            }
            else if (res.length > 1) {//匹配到多个关键词
                this.openModal({
                    _title: "请选择一个关键词",
                    type: "select",
                    param: {
                        value: 0,
                        option: res
                    },
                    okBtn: () => { this.setValue({ label: res[this.state.modal.param.value].cnname, id: res[this.state.modal.param.value].id }); this.closeModal() }
                });
            }
            else if (res.length === 1 && res[0].cnname === value.label) {//有一个匹配的关键词
                this.setValue({ label: res[0].cnname, id: res[0].id });
                this.closeModal();
            }
        });
    },

    tagsChange(value, id) {
        const {handonChange} = this.props;
        const {hasSelect} = this.state;
        let classify = [],
            keywords = [];

        console.log(value, "onchange");
        if (!hasSelect) {//只有减少tag时触发,select在change之前执行
            [...value].map((item, i) => {
                if (item.key.indexOf("分类") === 0) {
                    classify.push({ label: item.label, value: item.key.match(/(\d+)/g)[0] });
                }
                else if (item.key.indexOf("关键词") === 0) {
                    keywords.push({ label: item.label, id: item.key.match(/(\d+)/g)[0] });
                }
                else {
                    keywords.push({ label: item.label, id: item.key.match(/(\d+)/g)[0] });
                }
            });

            this.state.tags = value;
            this.setState({ tags: value });
            handonChange({ key: "classify", value: classify });
            handonChange({ key: "keywords", value: keywords });

        }
        this.state.hasSelect = false;
    },

    // 手动增加tag并向父组件传值
    setValue({value, label, id}) {
        const {handonChange} = this.props;
        const {tags} = this.state;
        if (!value) {//增加tag
            let _tags = _.uniq(tags.concat({ key: "关键词：" + label + " (" + id + ")", label: label }), "key");//去重
            this.setState({ tags: _tags });
            console.error(value);
        }
        handonChange({ key: "keywords", value, label, id });
    },

    setParam(key, value) {
        let modal = this.state.modal;
        modal.param[key] = value;
        this.setState(modal);
    }
});

