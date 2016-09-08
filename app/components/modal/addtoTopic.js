import React, {Component} from "react";
import ReactDOM           from "react-dom";
import {connect}          from "react-redux";
import Input              from "antd/lib/input";
import ComboBox           from "app/components/provider/combobox";
import {editJoinToSpecial, editJoinToSpecialList} from "app/action_creators/edit_action_creator";

import "./css/addtoTopic.css";
// input:{}
// output: returnTopicId(id);

const select = (state) => ({});
@connect(select)

export default class AddToTopic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            value: "",
            promoteList: []
        }
    };

    componentWillMount() {
        const {dispatch} = this.props;

        dispatch(editJoinToSpecial()).then(result => {
            if (result.apiError) return false;
            const res = result.apiResponse;
            let arr_tmp = [];
            if(res.length > -1) [...res[0]].map(((a,b)=>{
                arr_tmp.push(<li key={b} data-id={a.id} onClick={(id)=>{this.setState({id:a.id, value: a.title}); this.props.returnTopicId(a.id)}}>{a.title}</li>);
            }));
            this.setState({promoteList: arr_tmp});
        });
    };

    render() {
        const {dispatch} = this.props;
        const {value, promoteList} = this.state;
        return (
            <div id="addToTopic" className="addToTopic">
                <ComboBox
                    type={"topicId"}
                    defaultValue={value}
                    dispatch={dispatch}
                    dispatchAct={editJoinToSpecialList}
                    handOnSelect={this.onSelect.bind(this)}/>
                <ul className="promoteList">{promoteList}</ul>
            </div>
        )
    };

    onSelect(value, option) {
        const {returnTopicId} = this.props;

        let id = option.props.id;
        this.state.id = id; 
        this.state.value = option.props.children;

        returnTopicId(id);
    };
}