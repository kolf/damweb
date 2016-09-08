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

const FormItem = Form.Item;
const Option = Select.Option;

export let Uploadform = React.createClass({
    getInitialState: function () {
        return {
            photoList: [],
            time: null,
            area: [],
            tags: [],
            people: [],
            caption: ""
        };
    },
    componentDidMount() {

        console.log(this.props, "will")
    },

    componentWillReceiveProps(nextProps) {
        const {} = nextProps
        console.log(nextProps);
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
            this.props.submit(values);
        });
    },

    render() {
        const {getFieldProps} = this.props.form;
        const {List} = this.props;

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 18 }
        };

        // 组照标题
        const titleProps = getFieldProps('title', {
            // initialValue: "2015-12-12 12:12:12"
            initialValue: this.state.time
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
            <QueueAnim className="ant-form ant-form-horizontal" type="bottom" leaveReverse>
                <div key="item1" style={{ padding: "20px", border: "1px dashed #ddd", marginTop: "30px", marginBottom: "30px" }}>
                    <FormItem
                        {...formItemLayout}
                        label="组照标题">
                        <Input {...titleProps} placeholder="请输入图片说明" type="text" autoComplete="off" autosize/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="关键词">
                        <Select tags
                            {...kewwordTagProps}
                            style={{ width: '100%' }}
                            searchPlaceholder=" 输入关键词后回车或空格添加新的关键词">
                        </Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="人物">
                        <Select tags
                            {...peopleTagProps}
                            style={{ width: '100%' }}
                            searchPlaceholder=" 输入关键词后回车或空格添加新的人物名称">
                        </Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="图片说明">
                        <Input {...describeProps} placeholder="请输入图片说明" type="textarea" autoComplete="off" autosize/>
                    </FormItem>
                    <FormItem
                        wrapperCol={{ span: 12, offset: 3 }} >
                        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        &nbsp; &nbsp; &nbsp;
                        <Button type="ghost" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                </div>
                {
                    [...List].map((item, i) => {
                        const {id, src} = item;
                        return (
                            <div key={"item" + i + 1} className="thumbnailBox storage fl" >
                                <Card>
                                    <div className="custom-image">
                                        <img alt="找不到图片" src={src} />
                                    </div>
                                    <div  className="custom-card">
                                        <FormItem
                                            {...formItemLayout}>
                                            <Select showSearch
                                                {...getFieldProps('channel_' + (i + 1), {
                                                }) }
                                                style={{ width: 100, margin: "0 10px 5px" }}
                                                placeholder="请选择所属频道"
                                                optionFilterProp="children"
                                                notFoundContent="无法找到"
                                                >
                                                <Option value="jack">新闻</Option>
                                                <Option value="lucy">体育</Option>
                                                <Option value="tom">娱乐</Option>
                                                <Option value="jack1">时尚</Option>
                                                <Option value="lucy1">图表</Option>
                                                <Option value="tom1">档案</Option>
                                            </Select>
                                        </FormItem>     
                                        <FormItem
                                            {...formItemLayout}>
                                            <Input {...getFieldProps('title_' + (i + 1), {
                                            }) } placeholder="请输入图片说明" type="text" autoComplete="off"/>
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}>
                                            <Input {...getFieldProps('info_' + (i + 1), {
                                            }) } placeholder="请输入图片分说明" type="textarea" autoComplete="off"/>
                                        </FormItem>

                                        <Row className="mb-10">
                                            <p className="describe"></p>
                                        </Row>
                                        <Row className="mb-5 ml--5">

                                            <h4 className="order fr">{i + 1}</h4>
                                        </Row>
                                    </div>
                                </Card>
                            </div>

                        )
                    })
                }
                <div></div>
            </QueueAnim>
        );
    },
});

// <div key={"item" + i + 1} style={{ padding: "35px", marginTop: "20px", border: "1px dashed #ddd" }}>
//                                 <FormItem
//                                     {...formItemLayout}
//                                     label="组照标题">
//                                     <Input {...getFieldProps('title' + i, {
//                                         initialValue: this.state.tags
//                                     }) } placeholder="请输入图片说明" type="text" autoComplete="off"/>
//                                 </FormItem>
//                                 <FormItem
//                                     {...formItemLayout}
//                                     label="图片分说明">
//                                     <Input {...getFieldProps('info' + i, {
//                                         initialValue: this.state.tags
//                                     }) } placeholder="请输入图片说明" type="textarea" autoComplete="off"/>
//                                 </FormItem>
//                                 <FormItem
//                                     {...formItemLayout}
//                                     label="所属频道">
//                                     <Select showSearch
//                                         {...getFieldProps('channel' + i, {
//                                             initialValue: this.state.tags
//                                         })}
//                                         style={{ width: 100, margin: "0 10px 5px" }}
//                                         placeholder="请选择产品"
//                                         optionFilterProp="children"
//                                         notFoundContent="无法找到"
//                                         onChange={value => { console.log(value) } }
//                                         >
//                                         <Option value="jack">新闻</Option>
//                                         <Option value="lucy">体育</Option>
//                                         <Option value="tom">娱乐</Option>
//                                         <Option value="jack1">时尚</Option>
//                                         <Option value="lucy1">图表</Option>
//                                         <Option value="tom1">档案</Option>
//                                     </Select>
//                                 </FormItem>

//                             </div>