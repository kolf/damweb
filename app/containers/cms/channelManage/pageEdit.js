import React, {Component} from "react";
import ReactDOM           from "react-dom";

import CrumbsBox          from "app/components/common/crumbs";
import TableBox          from "app/components/common/table";

import {Pagination, Modal, Tooltip, Overlay} from "react-bootstrap/lib";
import {channelCfg, scrollList, picList} 		  from "app/action_creators/cms_action_creator";
import {Steps} 		  	  from "app/containers/cms/steps";

import SeoConfig		  from "app/containers/cms/channelManage/seoConfig"
import FontPage		  	  from "app/containers/cms/channelManage/mainFontPage"
import CreativeFontpage	  from "app/containers/cms/channelManage/creativeFontpage"
import NologFontPage	  from "app/containers/cms/channelManage/notLogged"
import ChannelPage	  from "app/containers/cms/channelManage/ChannelPage"
import ScrollPage	  from "app/containers/cms/channelManage/scrollPage"


import { Upload, Tabs, Switch, Select, DatePicker, Icon, Button } 			  from "antd"

import "../cms.css"
import 'antd/dist/antd.css';

const Tabpane = Tabs.TabPane;
const Option = Select.Option;


let Content = FontPage;
let currentPath = "网站首页";

export default class ChannelConfig extends Component {
	constructor (props) {
		super(props);

		switch(this.props.params.id){
			case "139":
				Content = FontPage;
				break;
			case "138":
				Content = CreativeFontpage;
				currentPath = "创意首页";
				break;
			case "137":
				Content = NologFontPage;
				currentPath = "未登录首页";
				break;
			case "34":
				Content = ScrollPage;
				currentPath = "滚动";
				break;
			default:
				Content = ChannelPage;
				currentPath = "频道页设置";
				break;
		}

		this.state = {
			"crumbs": [
				{"path": "/home", "text": "首頁"},
				{"path": "/cms/channelManage", "text": '内容运营平台：' + currentPath}
			],
			"params": {},
			"operate":'',
			"alert":{
				"show": false,
				"isButton": true,
				"bsSize": "small",
				"onHide": this.closeAlert.bind(this),
				"title": null,
				"body": null,
				"submitAlert": null
			},
			"stepButtons" : [{
				"className" : "btn-success",
				"icon" : "fa-save",
				"text" : "保存",
				"handler" : this.save.bind(this)
			},/*{
				"className" : "btn-search",
				"icon" : "fa-eye",
				"text" : "预览",
				"handler" : this.goPreview.bind(this)
			},*/
			{
				"className" : "btn-danger",
				"icon" : "fa-send",
				"text" : "发布",
				"handler" : this.submit.bind(this)
			}
			]
		};
	};

	static contextTypes = {
		"router": React.PropTypes.object.isRequired
	};

	componentDidMount () {
		this.init();
	};

	render () {
		const {crumbs, topicInfo, banner, operate} = this.state;
		const alert = this.state.alert;
		return (
			<div className="main-content-inner">
				<CrumbsBox crumbs={crumbs} />
				<Modal {...alert}>
					<Modal.Header closeButton>
						<Modal.Title>{alert.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body style={{"overflow":"hidden"}}>{alert.body}</Modal.Body>
					{alert.isButton &&
					<Modal.Footer>
						<Button bsClass="btn btn-sm btn-info btn-round" onClick={alert.submitAlert}>确认</Button>
						<Button bsClass="btn btn-sm btn-light btn-round" onClick={alert.onHide}>取消</Button>
					</Modal.Footer>
					}
				</Modal>
				<SeoConfig />
				<div id="tabs"><Content id={this.props.params.id} operate={operate} resetOperate={this.resetOperate.bind(this)}/></div>
				<Steps className="text-right" stepButtons={this.state.stepButtons}/>
			</div>
		)
	};

	init () {
		
	};

	handleOnTable () {

	};

	closeAlert () {
		const alert = Object.assign(this.state.alert, {"show":false});
		this.setState({"alert": alert});
	};

	openAlert(config) {
		const alert = Object.assign(this.state.alert, {"show":true}, config);
		this.setState({"alert": alert});
	};

	save(){
		this.setState({
			operate:'save'
		});
	}

	submit(){
		this.setState({
			operate:'submit'
		});
	}

	resetOperate(){
		this.setState({
			operate:''
		});
	}

	goPreview () {
		this.context.router.push("/cms/channelManage/channelPreview");
	}
}