import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

import Select from "antd/lib/select";

import "./css/combobox.css"
const Option = Select.Option;

// props:
// 1: placeholder
// 2: className
// 3: dispatch
// 4: key [require, digital]
// 4: dispatchAct [require,fun]
// 5: getValue [require,fun]

export default class ComboBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "data": [],
            "value": "",
            "focus": false,
            "timer": null,
            "hasSelect": false
        };

    };

    componentDidMount() {
        console.info(this.props)
    };

    componentWillReceiveProps(nextprops) {
        const {defaultValue} = nextprops;
        if (defaultValue) this.setState({ value: defaultValue });
        else this.render();
    };

    getValue() {
        const {getValue, keys} = this.props;
        if (getValue && keys) getValue({
            "keys": this.props.keys,
            "value": this.state.value
        });
        else if (getValue) getValue({
            "value": this.state.value
        });
    };

    handleChange(value) {
        const {hasSelect} = this.state;
        if(!hasSelect) {
            this.setState({ value });
            if (this.state.timer) {
                clearTimeout(this.state.timer)
            }
            this.state.timer = setTimeout(() => {
                this.getValue();
                this.getList(value);
            }, 300);
        }

        this.state.hasSelect = false;
    };

    getList(value) {
        const {dispatchAct, dispatch, type} = this.props;
        let param = { value };
        let typeId = 0, apifield = type;
        if (type) {
            if (type === "providerId") {
                param = {
                    paramType: 3,
                    param: {
                        searchName: value
                    }
                };
            }
            if (type === "editUserId") {
                param = {
                    paramType: 4,
                    param: {
                        searchName: value
                    }
                };
            }
            if (type === "topicId") {
                param = {
                    phrase: value,
                    per_page: 20
                    // page
                };
            }
        }
        if (!dispatchAct) return false;
        dispatch(dispatchAct(param)).then(result => {
            if (result.apiError) return false;
            //暂时不用reducer
            let data = [<Option key={" "} id={null}>{"找不到数据"}</Option>];
            if (type === "providerId") {
                data = result.apiResponse["photographer"].map(d => <Option key={d.nameCn} id={d.id}>{d.nameCn}</Option>);
            }
            else if (type === "editUserId") {
                data = result.apiResponse["user"].map(d => <Option key={d.name} id={d.id}>{d.name}</Option>);
            }
            else if (type === "provider") {
                data = result.apiResponse.map(d => <Option key={d.name} id={d.id}>{d.name}</Option>);
            }
            else if (type === "topicId") {
                if(result.apiResponse.list) data = result.apiResponse.list.map(d => <Option key={d.id} id={d.id}>{d.title}</Option>);
            }
            else {
                data = result.apiResponse;
            }

            this.setState({ data });
        });
    };

    handleFocusBlur(e) {
        if (e) {
            this.setState({ focus: e.target === document.activeElement });
        } else {
            this.setState({ focus: false });
            this.setState({ data: [] });
        }
    };

    onSelect(value, option) {
        const {handOnSelect, type} = this.props;

        //if(type && type === "topicId") this.setState({value: option.props.children});
        this.setState({value: option.props.children});
        if(handOnSelect) handOnSelect(value, option);

        this.state.hasSelect = true;
    };

    render() {
        const {className, placeholder, defaultValue, optionData, type} = this.props;
        const {data} = this.state;

        let options = null;
        if (data) options = data.map(d => <Option key={d.value}>{d.text}</Option>);
        if (type) options = data;

        return (
            <Select
                combobox
                value={this.state.value}
                allowClear={true}
                className={className}
                placeholder={defaultValue ? false : this.props.placeholder}
                notFoundContent=""
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onChange={this.handleChange.bind(this) }
                onFocus={this.handleFocusBlur.bind(this) }
                onBlur={this.handleFocusBlur.bind(this) }
                onSelect={this.onSelect.bind(this) }
                >
                {options}
            </Select>
        );
    };

}
