import React, {Component, PropTypes}    from "react";
import {connect}                        from "react-redux";
import ReactDOM                         from "react-dom";

import ComboBox from "app/components/provider/combobox";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Radio from "antd/lib/radio";

import {Collapse} from "react-bootstrap/lib";
import {    
    editJoinToSpecial,
    editJoinToSpecialList,
    editJoinToGroupList
} from "app/action_creators/edit_action_creator";

const RadioGroup = Radio.Group;

export let WizardStep3 = React.createClass({

    getInitialState() {
        return {
            value: 5,
            jointoSpecial: {},
            combobox: [],
            topic: ""
        };
    },

    componentDidMount() {
        this.getSpecialList();
    },

    //radio点击事件
    onChange(e) {
        const {handleOnPubulish} = this.props;

        this.setState({
            value: e.target.value
        });

        handleOnPubulish({
            "type": e.target.value,
            "data": this.state.combobox
        });
    },

    //获取推荐专题
    getSpecialList() {
        const {dispatch} = this.props;
        dispatch(editJoinToSpecial()).then(result => {
            if (result.apiError) return false;
            this.state.jointoSpecial = result.apiResponse[0];
            console.log(this.state.jointoSpecial)
            this.ComboBoxRender_1(null);
        })
    },

    setComboboxValue(e) {
        const value = e.target.getAttribute("data-list");
        this.ComboBoxRender_1(value);
    },

    ComboBoxRender_1(value) {
        ReactDOM.render(
            <div>
                <ComboBox
                    keys = {1}
                    defaultValue = {value}
                    placeholder="请输入专题名称或ID"
                    dispatch = {this.props.dispatch}
                    dispatchAct={editJoinToSpecialList}
                    getValue = {value => {
                        // let {combobox} = this.state;
                        // combobox[parseInt(value.keys) - 1] = value.value;
                        // this.setState({ combobox })
                        // console.log(combobox)

                        const {handleOnPubulish} = this.props;
                        handleOnPubulish({
                            "type": 3,
                            "data": value.value
                        });
                    } }
                    >
                </ComboBox>
                <h4>推荐专题</h4>
                <ul className="specialList">
                    {[...this.state.jointoSpecial].map((item, i) => {
                        return (
                            <li key={i}
                                data-title={item.id}
                                onClick={e => {
                                    const value = e.target.getAttribute("data-title");
                                    this.ComboBoxRender_1(value);

                                    const {combobox} = this.state;
                                    combobox[0] = value;
                                    const {handleOnPubulish} = this.props;
                                    console.log("推荐专题", value)
                                    handleOnPubulish({
                                        "type": 3,
                                        "data": value
                                    });
                                } }>
                                {item.title}
                            </li>
                        )
                    }) }
                </ul>
            </div>
            , document.getElementById("join-to-special"));
    },

    render() {
        const {className} = this.props;

        const radioStyle = {
            fontSize: '14px',
            height: '40px',
            display: 'block',
            lineHeight: '40px',
        };

        function getCombomValue(value) {
            const {handleOnPubulish} = this.props;
            let {combobox} = this.state;
            combobox[parseInt(value.keys) - 1] = value.value;
            this.setState({ combobox })
            console.log(combobox)

            handleOnPubulish({
                "type": 1,
                "data": combobox
            });
        };

        return (
            <div className={className}>
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <Radio style={radioStyle} key="a" value={5}>直接发布</Radio>
                    <Radio style={radioStyle} key="b" value={4}>二审</Radio>
                    <Radio style={radioStyle} key="c" value={3}>加入专题</Radio>
                    <Collapse in={this.state.value === 3 ? true : false} key="1">
                        <div id="join-to-special"></div>
                    </Collapse>
                    <Radio style={radioStyle} key="e" value={2}>加入组照</Radio>
                    <Collapse in={this.state.value === 2 ? true : false} key="2">
                        <div id="join-to-group">
                            <Input  onChange={e => {
                                this.props.handleOnPubulish({
                                    type: 2,
                                    data: e.target.value
                                })
                            } }/>
                        </div>
                    </Collapse>
                </RadioGroup>
            </div>
        );
    }

})