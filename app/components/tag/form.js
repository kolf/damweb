import React, { Component, PropTypes } from 'react';
import {reduxForm}                     from 'redux-form';
import validation                      from "./validation";

import {
    Form, Input, Select, Radio, Button
} from 'antd';

@reduxForm(
    {
        "form": "tagForm",
        "fields":[
            'id',
            'pid',
            'cnname',
            'cnsyno',
            'enname',
            'ensyno',
            'kind',
            'memo',
            'operate'
        ],
        validate: validation
    }
)
export default class TagForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static propTypes = {
        "fields": PropTypes.object.isRequired,
        "handleSubmit": PropTypes.func.isRequired,
        "pristine": PropTypes.bool.isRequired,
        "resetForm": PropTypes.func.isRequired,
        "submitting": PropTypes.bool.isRequired
    };

    componentWillMount() {

    };


    render() {
        const {
            fields: {
                id,
                pid,
                cnname,
                cnsyno,
                enname,
                ensyno,
                kind,
                memo,
                operate
            },
            handleSubmit,
            pristine,
            resetForm,
            submitting,
            operateType
        } = this.props;

        const FormItem = Form.Item;
        const RadioGroup = Radio.Group;

        const Option = Select.Option;

        return (
            <Form horizontal onSubmit={handleSubmit}>

                <FormItem
                    label="* 中文名"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    className={cnname.touched && cnname.error && "has-error"}
                    >
                    <Input placeholder="请输入中文名" {...cnname} disabled={operateType=="view"} />
                    {cnname.touched && cnname.error && <span className="ant-form-explain">{cnname.error}</span>}
                </FormItem>

                <FormItem
                    label="中文同义词"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    className={cnsyno.touched && cnsyno.error && "has-error"}
                    >
                    <Select tags
                            style={{ width: '100%' }}
                            searchPlaceholder="输入中文同义词"
                            value={cnsyno.value}
                            onChange={this.onSelectCnsyno.bind(this)}
                            disabled={operateType=="view"}
                        >
                    </Select>
                    {cnsyno.touched && cnsyno.error && <span className="ant-form-explain">{cnsyno.error}</span>}
                </FormItem>

                <FormItem
                    label="* 英文名"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    className={enname.touched && enname.error && "has-error"}
                    >
                    <Input placeholder="请输入英文名" {...enname} disabled={operateType=="view"} />
                    {enname.touched && enname.error && <span className="ant-form-explain">{enname.error}</span>}
                </FormItem>

                <FormItem
                    label="英文同义词"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    className={ensyno.touched && ensyno.error && "has-error"}
                    >
                    <Select tags
                            style={{ width: '100%' }}
                            searchPlaceholder="输入英文同义词"
                            value={ensyno.value}
                            onChange={this.onSelectEnsyno.bind(this)}
                            disabled={operateType=="view"}
                        >
                    </Select>
                    {ensyno.touched && ensyno.error && <span className="ant-form-explain">{ensyno.error}</span>}
                </FormItem>

                <FormItem
                    label="* 类型"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    className={kind.touched && kind.error && "has-error"}
                    >
                    <RadioGroup disabled={operateType=="view"} onChange={this.onRadioKind.bind(this)}>
                        <Radio value="0" checked={kind.value === "0"}>主题</Radio>
                        <Radio value="1" checked={kind.value === "1"}>概念</Radio>
                        <Radio value="2" checked={kind.value === "2"}>规格</Radio>
                        <Radio value="3" checked={kind.value === "3"}>人物</Radio>
                        <Radio value="4" checked={kind.value === "4"}>地点</Radio>
                    </RadioGroup>
                    {kind.touched && kind.error && <div className="ant-form-explain">{kind.error}</div>}
                </FormItem>

                <FormItem
                    label="备注"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    >
                    <Input type="textarea" placeholder="输入备注" {...memo} disabled={operateType=="view"} />
                </FormItem>

                {operateType!="view" &&  <FormItem wrapperCol={{ span: 16, offset: 6 }}>
                    <Button type="primary" htmlType="submit" disabled={pristine || submitting}>
                        {submitting ? <i className="fa fa-cog fa-spin fa-fw" /> : <i className="fa fa-paper-plane" />} 确定
                    </Button>&nbsp;&nbsp;&nbsp;
                    <Button type="ghost" disabled={pristine || submitting} onClick={resetForm}>重置</Button>
                </FormItem>}

            </Form>
        )
    }

    onSelectCnsyno (value) {
        this.props.fields.cnsyno.onChange(value);
    };

    onSelectEnsyno (value) {
        this.props.fields.ensyno.onChange(value);
    };

    onRadioKind (e){
        this.props.fields.kind.onChange(e.target.value);
    };
}