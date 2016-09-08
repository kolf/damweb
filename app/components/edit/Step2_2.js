import React, {Component, PropTypes}    from "react";
import {connect}                        from "react-redux";
import ReactDOM                         from "react-dom";

import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import QueueAnim from 'rc-queue-anim';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Card from 'antd/lib/card';
import DatePicker from "antd/lib/date-picker";
import Cascader from "antd/lib/cascader";

const FormItem = Form.Item;
const Option = Select.Option;

export let EditStep2_2 = React.createClass({
    getInitialState: function () {
        return {
            time: null,
            area: [],
            tags: [],
            people: [],
            caption: ""
        };
    },

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    },

    timeChange(value) {
        this.setState({ time: value });
        const time = moment(value).format("YYYY-MM-DD HH:mm:ss");
        this.props.handOnchange({ key: "time", value: time });
        // console.log(time);
    },

    areaChange(value) {
        this.setState({ area: value });
        this.props.handOnchange({ key: "area", value });
    },

    tagsChange(value) {
        this.setState({ tags: value });
        this.props.handOnchange({ key: "tags", value });
    },

    peopleChange(value) {
        this.setState({ people: value });
        this.props.handOnchange({ key: "people", value });
    },

    captionChange(e) {
        const value = e.target.value;
        this.setState({ caption: value });
        // this.props.handOnchange({key: "caption", value});
    },

    render() {
        const { getFieldProps} = this.props.form;
        const AreaOptions = require("../../assets/json/areaCountry.json");

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 18 }
        };

        // 时间
        const timeProps = getFieldProps('timeTag', {
            // initialValue: "2015-12-12 12:12:12"
            initialValue: this.state.time
        });

        // 地点
        const areaProps = getFieldProps('areaTag', {
            // initialValue: ["中国", "北京市", "北京市"]
            initialValue: this.state.area
        });

        //关键词
        const kewwordTagProps = getFieldProps('keywordTag', {
            initialValue: this.state.tags
        });

        // 人物
        const peopleTagProps = getFieldProps('peopleTag', {
            initialValue: this.state.people
        });

        //组照说明
        const describeProps = getFieldProps('describe', {
            // initialValue: "",
            initialValue: this.state.caption
        });

        return (
            <Form horizontal form={this.props.form}>
                <FormItem
                    {...formItemLayout}
                    label="拍摄时间">
                    <DatePicker
                        {...timeProps}
                        showTime
                        format={"yyyy-MM-dd HH:mm:ss"}
                        onChange={this.timeChange}/>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="拍摄地点">
                    <Cascader
                        {...areaProps}
                        style={{ width: 200 }}
                        options={AreaOptions}
                        placeholder="请选择拍摄地点"
                        onChange={this.areaChange}/>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="关键词">
                    <Select tags
                        {...kewwordTagProps}
                        style={{ width: '100%' }}
                        onChange={this.tagsChange}
                        searchPlaceholder=" 输入关键词后回车或空格添加新的关键词">
                    </Select>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="人物">
                    <Select tags
                        {...peopleTagProps}
                        style={{ width: '100%' }}
                        onChange={this.peopleChange}
                        searchPlaceholder=" 输入关键词后回车或空格添加新的人物名称">

                    </Select>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="图片说明">
                    <Input {...describeProps} onChange={this.captionChange} placeholder="请输入图片说明" type="textarea" autoComplete="off" autosize/>
                </FormItem>

                <FormItem
                    wrapperCol={{ span: 12, offset: 3 }} >
                    <Button type="primary" size="small" onClick={e => this.props.handOnchange({ key: "caption_sync", value: this.state.caption }) }>同步</Button>
                    &nbsp; &nbsp; &nbsp;
                    <Button type="ghost" size="small" onClick={e => this.props.handOnchange({ key: "caption_before", value: this.state.caption }) }>图片说明前追加</Button>
                    &nbsp; &nbsp; &nbsp;
                    <Button type="ghost" size="small" onClick={e => this.props.handOnchange({ key: "caption_after", value: this.state.caption }) }>图片说明后追加</Button>
                </FormItem>
            </Form>
        );
    },
});
