import React, {Component} from "react";
import ReactDOM           from "react-dom";
import {connect}          from "react-redux";

import CrumbsBox          from "app/components/common/crumbs";
import TableBox          from "app/components/common/table";

import {Pagination, Modal, Tooltip, Overlay} from "react-bootstrap/lib";
import {channelCfg, scrollList, picList, deletePic} 		  from "app/action_creators/cms_action_creator";
import {Steps} 		  	  from "app/containers/cms/steps";

// import {TableBox} 		  	  from "app/containers/cms/TableBox";
import {ExThumbnailBox} 		  	  from "app/containers/cms/exThumbnail";

import FocusPic		  	  from "app/containers/cms/channelManage/focusPic"
import Recommend		  	  from "app/containers/cms/channelManage/recommend"
import Hotpot		  	  from "app/containers/cms/channelManage/hotpot"
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
			"activedTab" : 1
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
		const {picListData} = this.state;

		//1轮播图 2网站宣传 3推荐（多标签）4广告 5seo
		return (
			<Tabs type="card" onChange={this.tabChange.bind(this)}>
				<Tabpane tab="按钮广告位" key="1">
					<FocusPic {...picListData} onUpdateData={this.updateData.bind(this,290,150)} addData={this.addData.bind(this)} deleteData={this.deleteData.bind(this)} sortAble={true}/>
				</Tabpane>
				<Tabpane tab="编辑推荐" key="4">
					<FocusPic {...picListData} onUpdateData={this.updateData.bind(this,0,0)} addData={this.addData.bind(this)} deleteData={this.deleteData.bind(this)} sortAble={true}/>
				</Tabpane>
			</Tabs>
		)
	};

	tabChange (tabKey) {
		this.state.activedTab = tabKey;

		switch (tabKey) {
			case "1": case "3": case "4":
				this.getPicList({});
				break;
			default:
				break;
		}
	};

	getPicList (params) {
		const {dispatch, id} = this.props;

		dispatch(picList({
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
		if(width!=0&&height!=0)
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

	addData(){
		this.state.picListData.list.push({});
		this.forceUpdate();
	}

	deleteData(index){
		const data = this.state.picListData.list[index];

		if(data.id){
			const {dispatch} = this.props;
			dispatch(deletePic({
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
		let _this=this;
		dispatch(picList({
			...params,
			id,
			type : this.state.activedTab,
			method:'post',
			content:picListData.list
		})).then((result) => {
			let msg = '标签保存成功';
			if (result.apiError){
				msg = result.apiError.errorMessage;
			}

			_this.alertMsg(msg);

			
		});
	}

	submit(){
		console.log('submit')
	}
}