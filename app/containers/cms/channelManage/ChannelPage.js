import React, {Component} from "react";
import ReactDOM           from "react-dom";
import {connect}          from "react-redux";

import CrumbsBox          from "app/components/common/crumbs";
import TableBox          from "app/components/common/table";

import {Pagination, Modal, Tooltip, Overlay} from "react-bootstrap/lib";
import {channelCfg, adPicList, recommendPicList, deleteAdPic, publicAd, picInfo, publicRecommend} 		  from "app/action_creators/cms_action_creator";
import {Steps} 		  	  from "app/containers/cms/steps";

// import {TableBox} 		  	  from "app/containers/cms/TableBox";
import {ExThumbnailBox} 		  	  from "app/containers/cms/exThumbnail";

import Recommend		  	  from "app/containers/cms/channelManage/recommend"
import Advertisement	  from "app/containers/cms/channelManage/advertisement"

import { Upload, Tabs, Switch, Select, DatePicker, Icon, Button } 			  from "antd"

import "../cms.css"
import 'antd/dist/antd.css';

const Tabpane = Tabs.TabPane;
const Option = Select.Option;

const select = (state) => ({
	"error": state.cms.error
});
@connect(select)

export default class ChannelPage extends Component {
	constructor (props) {
		super(props);
		this.state = {
			"picListData": {
			  	list: []
			},
			"activedTab" : 1,
			"alert":{
				"show": false,
				"isButton": true,
				"bsSize": "small",
				"onHide": this.closeAlert.bind(this),
				"title": null,
				"body": null,
				"submitAlert": null
			}
		};
	};

	componentDidMount () {
		this.getPicList({});
	};

	componentWillReceiveProps(props){
		const {operate} = props;

		if(operate){
			this[operate]({});
		}
	};

	render () {
		const {picListData, alert} = this.state;

		return (
			<div>
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
			<Tabs type="card" onChange={this.tabChange.bind(this)}>
				<Tabpane tab="按钮广告位" key="1">
					<Advertisement {...picListData} tipMessage={{isSame:1,message:["请上传宽/高比例为290/150的图"]}}
						onUpdateData={this.updateData.bind(this,290,150)}
						addData={this.addData.bind(this)}
						deleteData={this.deleteData.bind(this)}
						sortAble={true}/>
				</Tabpane>
				<Tabpane tab="编辑推荐" key="4">
					<Recommend {...picListData}  
						onUpdateData={this.updateData.bind(this,0,0)}
						updatePicInfo={this.onUpdatePicInfo.bind(this)}
						addData={this.addData.bind(this)}
						deleteData={this.deleteData.bind(this)}
						sortAble={true}/>
				</Tabpane>
			</Tabs>
			</div>
		)
	};

	closeAlert () {
		const alert = Object.assign(this.state.alert, {"show":false});
		this.setState({"alert": alert});
	};

	openAlert(config) {
		const alert = Object.assign(this.state.alert, {"show":true}, config);
		this.setState({"alert": alert});
	};

	alertMsg(msg){
		this.setState({operate:{}});
		this.openAlert({
			"bsSize": "small",
			"title": <samll style={{"fontSize":"14px"}}>提示：</samll>,
			"body": <p className="bolder center grey"><i className="ace-icon fa fa-exclamation-triangle blue bigger-120">{msg}</i></p>,
			"isButton": false
		});
	}

	tabChange (tabKey) {
		this.state.activedTab = tabKey;

		switch (tabKey) {
			case "1": case "4":
				this.getPicList({});
				break;
			default:
				break;
		}
	};

	getPicList (params) {
		const {dispatch, id} = this.props;
		let api = adPicList;

		if(this.state.activedTab == 4){
			api = recommendPicList;
		}

		dispatch(api({
			...params,
			id,
			type : this.state.activedTab
		})).then((result) => {
			if (result.apiError) return false;
			this.state.picListData.list = result.apiResponse.list || [];
			this.forceUpdate();
		});
	}

	updateData(width,height,index, field, value){
		
		let _this=this;
		if(width!=0&&height!=0&&field=="src")
		{
			let img=new Image();
	        img.src="http://bj-feiyuantu.oss-cn-beijing.aliyuncs.com"+value;
	        img.onload = function() {
	        	console.log("p",img.width/img.height);
	               
	            if(img.width/img.height!=width/height)
	            {
					_this.alertMsg("请上传宽/高比例为"+width+"/"+height+"的图");
	            }
	            else
	            {
	            	_this.state.picListData.list[index][field] = value;
					_this.forceUpdate();
	            }
	        }
		}
		else
		{
			_this.state.picListData.list[index][field] = value;
			_this.forceUpdate();
		}
	}

	onUpdatePicInfo(index){
		const {picListData:{list}} = this.state;
		const {dispatch} = this.props;

		dispatch(picInfo({
			...list[index]
		})).then((result) => {
			if (result.apiError) {
				this.alertMsg('获取图片信息失败：' + esult.apiError.errorMessage);
			}else{
				Object.assign(this.state.picListData.list[index], result.apiResponse);
				this.forceUpdate();
			}
		});
	}

	addData(){
		this.state.picListData.list.push({});
		this.forceUpdate();
	}

	deleteData(index){
		const data = this.state.picListData.list[index];

		if(data.id){
			const {dispatch} = this.props;
			dispatch(deleteAdPic({
				id : data.id
			})).then((result) => {
				this.getPicList({});
			});
		}else{
			this.state.picListData.list.splice(index, 1);
			this.forceUpdate();
		}
	}

	save(params){
		const {dispatch, id, resetOperate} = this.props,
			  {activedTab, picListData} = this.state;
		let api = adPicList;
		let _this=this;
		if(activedTab == 4){
			api = recommendPicList;
		}

		dispatch(api({
			...params,
			id,
			method:'post',
			dataList:picListData.list
		})).then((result) => {
			let msg = '标签保存成功';
			if (result.apiError){
				msg = result.apiError.errorMessage;
			}

			_this.alertMsg(msg);

			_this.getPicList();
			if (result.apiError) return false;
		});
	}

	submit(){
		const {dispatch, id, resetOperate} = this.props,
			  {activedTab, picListData} = this.state;
		let api = publicAd;

		if(activedTab == 4){
			api = publicRecommend;
		}

		// if(picListData.list.length != 4){
		// 	this.alertMsg('发布的广告个数必须为4个');
		// 	return;
		// }

		dispatch(api({
			id,
			dataList:picListData.list
		})).then((result) => {
			// this.props.resetOperate();
			if (result.apiError) {
				this.alertMsg(result.apiError.errorMessage);
				return false;
			}
		});
	}
}