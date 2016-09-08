import React, {Component, PropTypes}    from "react";
import {connect}                        from "react-redux";
import ReactDOM                         from "react-dom";

import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import Checkbox from "antd/lib/checkbox"
import "./css/pushto_step3.css";

import {

} from "app/action_creators/edit_action_creator";

const Option = Select.Option;

//handleOnPubulish: setpubulishData()
export let PushToStep3 = React.createClass({

    getInitialState() {
        return {
            params: {
                check1: false,
                check2: false,
                check3: false,
                option: false
            }
        };
    },

    componentDidMount() {
    },

    onChange(value, field) {
        const {handleOnPubulish} = this.props;
        const {params} = this.state;

        if(field) params[field] = value;
        this.setState({params});
        handleOnPubulish(params);
    },

    render() {
        const {params} = this.state;
        const {check1, check2, check3} = params;

        return (
            <div className="pushto-step3" >
                <h3 className="fl">请选择推送方：</h3>
                <div className="checkGroup fl">
                    <div className="checkblock">
                        <Checkbox checked={check1} onChange={(e)=>{this.onChange(e.target.checked,"check1")}}>{"今日头条"}</Checkbox>
                        {check1 &&
                            <Select defaultValue="0" style={{ width: 170, marginLeft: 33 }} onChange={(value)=>{this.onChange(value,"option")}}>
                                <Option value="0">{"请选择"}</Option>
                                <Option value="1">{"图播快报"}</Option>
                                <Option value="2">{"图说赛事"}</Option>
                                <Option value="4">{"图话历史"}</Option>
                                <Option value="5">{"最星动"}</Option>
                                <Option value="6">{"智游12301"}</Option>
                            </Select>
                        }
                    </div>
                    <div className="checkblock">
                        <Checkbox checked={check2} onChange={(e)=>{this.onChange(e.target.checked,"check2")}}>{"人民日报"}</Checkbox>
                    </div>
                    <div className="checkblock">
                        <Checkbox checked={check3} onChange={(e)=>{this.onChange(e.target.checked,"check3")}}>{"百度"}</Checkbox>
                    </div>
                </div>
            </div>
        )
    }

})