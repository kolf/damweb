import React, {Component} from "react";
import _                  from "lodash";
import {connect}          from "react-redux";

import CrumbsBox from "app/components/common/crumbs";

import Card from "antd/lib/card";
import Spin from "antd/lib/spin";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import classNames from 'classnames';

import {getpersonalData} from "app/action_creators/person_action_creator";

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
};

const select = (state) => ({
    authority: state.person.data
});
@connect(select)

export default class CreateAuthorityContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "crumbs": [
                { "path": "/home", "text": "首頁" },
                { "path": "/person", "text": "个人中心" }
            ]
        };
    };

    componentWillMount() {
        this.queryData();
    };

    render() {
        const {crumbs} = this.state;
        const {personalData} = this.props;
        return (
            <div className="main-content-inner">

                <CrumbsBox crumbs={crumbs} />
                <div className="page-content">
                    {personalData &&
                        <div></div>
                    }
                    {!personalData && <Spin/>}
                </div>
            </div>
        );
    };

    queryData() {
        const {dispatch} = this.props;

        dispatch(getpersonalData()).then(result => {
            if (result.apiError) return false;
            this.render();
        });
    }


}