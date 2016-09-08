import React, {Component} from "react";
import ReactDOM           from "react-dom";
import {connect}          from "react-redux";
import _                  from "lodash";
import moment			  from "moment";

import CrumbsBox          from "app/components/common/crumbs"
import FilterBox          from "app/components/common/filter";
import TableBox           from "app/components/common/table";
import LoadingBox         from "app/components/common/loading";
import ThumbnailBox       from "app/components/provider/thumbnail";
import SearchBox		  from "app/components/provider/searchBox";

import {Pagination, Modal, Button, Tooltip, Overlay} from "react-bootstrap/lib";
import {cmsContentFilter, cmsContentSearch, publicTopic} from "app/action_creators/cms_action_creator";
import { Input, Upload, Tabs, Switch, Select, DatePicker, Icon } 			  from "antd"
import 'antd/dist/antd.css';

import {
	Grid,
	Row,
	Col,
	Thumbnail
} from "react-bootstrap/lib";


const select = (state) => ({
	"error": state.cms.error,
	"dataFilter": state.cms.dataFilter,
	"dataList": state.cms.dataList
});
@connect(select)

export default class ContentManage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			"activePage": 1,
			"pageSize": 5,
			"maxButtons": 5,
			"params":{},
			"loadingShow": false,
			"loadingTarget": "",
			"alert":{
				"show": false,
				"isButton": true,
				"bsSize": "small",
				"onHide": this.closeAlert.bind(this),
				"title": null,
				"body": null,
				"submitAlert": null
			},
			"selectStatus": [],
			"isSingle": true,
			"orderByDate": false
		};
		this.paramsInit = {pageNum:1,groupState:4};
	}

	static contextTypes = {
        "router": React.PropTypes.object.isRequired
    };

	componentDidMount () {
		 this.filterForm();
	};
	
	componentWillUnmount () {
		const list = document.getElementById('j_table');
		ReactDOM.render(<div></div>,list);
	};

	render () {
		const {dataList} = this.props;
		const {alert,crumbs,maxButtons,activePage,loadingShow,loadingTarget,orderByDate, keyword, isSingle} = this.state;
		const pages = dataList.pages?dataList.pages:activePage;
		const toolTipLoading = <Tooltip id="j_loading"><i className="ace-icon fa fa-spinner fa-spin orange bigger-100"></i> 更新中...</Tooltip>;
		const alertBox = (<Modal {...alert}>
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
		</Modal>);
		const btnAfter = <Button bsStyle="info" style={{ padding: "7px 35px" }} onClick={this.keywordSearch.bind(this) }> 搜 索</Button>;
		
		return (
			<div>
				<div className="page-content">

					{alertBox}

					<Overlay show={loadingShow}
							 target={()=> ReactDOM.findDOMNode(loadingTarget)}
							 placement="right">
						{toolTipLoading}
					</Overlay>

					<div className="row"><div className="col-xs-12">
						<div className="searchbox">
							<div style={{ marginTop: 8, width: "60%" }}>
								<Input addonAfter={btnAfter} value={this.state.keyword} style={{ height: "37px", paddingLeft: "15px" }} onChange={e => { this.setState({ keyword: e.target.value }) } }/>
							</div>
						</div>
					
							
						<div className="widget-box transparent ui-sortable-handle">
							
							<div className="widget-body">
								<div id="j_filter" className="widget-main padding-6 no-padding-left no-padding-right"></div>
							</div>
						</div>

					</div></div>

					<div className="row"><div className="space-8"></div></div>

					<div className="row">
						<div className="col-xs-6">
							<button className="btn btn-sm btn-info" onClick={this.selectAll.bind(this)}>
								<i className="ace-icon fa fa-file-o"></i>全选
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.selectToggle.bind(this)}>
								<i className="ace-icon fa fa-file-o"></i>反选
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.newGroup.bind(this)} style={{display:(isSingle ? '' : 'none')}}>
								<i className="ace-icon fa fa-file-o"></i>新建组照
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.joinGroup.bind(this)} style={{display:'none'}}>
								<i className="ace-icon fa fa-file-o"></i>加入组照
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.mergeGroup.bind(this)} style={{display:'none'}}>
								<i className="ace-icon fa fa-file-o"></i>合并组照
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.orderByDate.bind(this)}>
								上传时间<i className={ orderByDate ? "ace-icon fa fa-long-arrow-up":"ace-icon fa fa-long-arrow-down"}></i>
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.refresh.bind(this)}>
								<i className="ace-icon fa fa-refresh"></i>刷新
							</button>
						</div>
						<div className="dataTables_paginate">
							<Pagination
								prev
								next
								first
								last
								ellipsis
								boundaryLinks
								items={pages}
								maxButtons={maxButtons}
								activePage={activePage}
								onSelect={this.handleOnPagination.bind(this)} />
						</div>
					</div>

					<div className="row"><div className="space-8"></div></div>
					
					<div className="row">
						<div id="j_table" className="col-xs-12">{this.props.children}</div>
					</div>

					<div className="row">
						<div className="col-xs-6">
							<button className="btn btn-sm btn-info" onClick={this.selectAll.bind(this)}>
								<i className="ace-icon fa fa-file-o"></i>全选
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.selectToggle.bind(this)}>
								<i className="ace-icon fa fa-file-o"></i>反选
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.newGroup.bind(this)} style={{display:(this.state.isSingle ? '' : 'none')}}>
								<i className="ace-icon fa fa-file-o"></i>新建组照
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.joinGroup.bind(this)} style={{display:'none'}}>
								<i className="ace-icon fa fa-file-o"></i>加入组照
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.mergeGroup.bind(this)} style={{display:'none'}}>
								<i className="ace-icon fa fa-file-o"></i>合并组照
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.orderByDate.bind(this)}>
								上传时间<i className={ orderByDate ? "ace-icon fa fa-long-arrow-up":"ace-icon fa fa-long-arrow-down"}></i>
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.refresh.bind(this)}>
								<i className="ace-icon fa fa-refresh"></i>刷新
							</button>
						</div>
						<div className="dataTables_paginate">
							<Pagination
								prev
								next
								first
								last
								ellipsis
								boundaryLinks
								items={pages}
								maxButtons={maxButtons}
								activePage={activePage}
								onSelect={this.handleOnPagination.bind(this)} />
						</div>
					</div>

				</div>
			</div>
		);
	};

	filterForm () {
		const {dispatch,params} = this.props;
		const container = document.getElementById('j_filter');
		ReactDOM.render(<LoadingBox />, container);
		dispatch(cmsContentFilter({
			topicId:params.topicId
		})).then((result) => {
			if (result.apiError) return false;
			ReactDOM.render(<FilterBox dataFilter={this.props.dataFilter} onSearch={this.handleOnSearch.bind(this)} searchError={this.props.error} />, container);

			if(!this.props.filterInit) {
				this.queryList(this.paramsInit);
			}
		});
	};

	refresh () {
		const {params} = this.props.dataList;
		this.queryList(params);
	};

	orderByDate () {
		const {Lists, orderByDate} = this.state;
		let newLists = _.sortByOrder(Lists, ["timeByOrder"], [orderByDate ? "asc":"desc"]);

		this.setState({orderByDate: !orderByDate});
		this.state.Lists = newLists;
		this.thumbnailRender();
	}

	queryList (params) {
		const {dispatch, params:{topicId}} = this.props;

		const container = document.getElementById('j_table');
		ReactDOM.render(<LoadingBox />, container);

		if(!params.topicId){
			params.topicId = topicId;
		}
		this.setState({selectStatus: []});

		dispatch(cmsContentSearch(params)).then((result) => {
			if (result.apiError) {
				this.alertMsg(result.apiError.errorMessage);
				return false;
			}
			let len = this.props.dataList.list.length;
			this.state.selectStatus = _.fill(Array(len) , false);

			const {dataList} = this.props;
			let _dataList = [];
			[...dataList.list].map((item,i) => {
				let tmp = {};
				_.mapKeys(item,(val, key)=>{
					tmp[key] = val;
				});
				tmp.timeByOrder = moment(item.createTime).unix();
				_dataList.push(tmp);
			});
			this.state.Lists = _dataList;

			this.thumbnailRender();
		});
	};
	
	thumbnailRender() {
		const {dataList} = this.props;
		const container = document.getElementById('j_table');
		
		const config = {
			//选择
			"selectStatus": this.state.selectStatus,
			"setSelectStatus": this.setSelectStatus.bind(this)
		};
		
		ReactDOM.render(
			<ThumbnailBox 
				types={dataList.params.picType == 2 ? 'cmsTopicGrp' : 'cmsTopicSingle'}
				lists={this.props.dataList.list} 
				onThumbnail={this.handleOnThumbnail.bind(this)}
				{...config}/>, container
		);	
	};
	
	setSelectStatus(params) {
		this.setState({selectStatus: params});
	};
	
	getStatus() {
		return this.props.dataList.status;	
	};
	
	selectAll() {
		const {selectStatus} = this.state;
		let len = this.props.dataList.list.length;
		this.state.selectStatus = _.fill(Array(len) , true);
		this.thumbnailRender();
	};
	
	selectToggle() {
		const {selectStatus} = this.state;
		this.state.selectStatus = [...selectStatus].map((val,i)=>{return !val});
		this.thumbnailRender();
	};
	
	getSelectId() {
		const {selectStatus} = this.state;
		const list = this.props.dataList.list;
		let selectIdList = [];
		[...selectStatus].map((item, i) => {
			if(item) selectIdList.push(list[i].id);
		})
		
		return selectIdList;
	};
	
	handleOnThumbnail (param) {
		console.log(param)
	};

	handleOnSearch (params) {
		let dataParams = {}, others = [];
		params.map((item)=>{
			if(item.field.indexOf('other') != -1){
				others.push(item.id);
			}else if(item.field == 'uploadTime'){
				const times = item.id.split(',');
				dataParams.inDateFrom = times[0];
				dataParams.inDateEnd = times[1];
			}else{
				dataParams[item.field] = item.id;
			}
		});
		dataParams.contentOther = others;
		this.setState({"activePage": 1});
		Object.assign(dataParams, this.paramsInit);
		this.setState({
			isSingle : dataParams.picType != 2
		});
		this.queryList(dataParams);
	};

	handleOnPagination (eventKey) {
		this.setState({activePage: eventKey});
		const {params} = this.props.dataList;
		const paramsData = Object.assign({}, params, {"pageNum": eventKey});
		this.queryList(paramsData);
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
	};

	keywordSearch(){
		const {params} = this.props.dataList;
		this.queryList({
			...params,
			keyword:this.state.keyword
		});
	}
	
	searchListRule(word) {
		if(word.match(/^HT[A-Z]+[a-z]+\d+/g)){
			return {
				"title": "单张合同",
				"type": "constract",
				"area": word.match(/[A-Z]+/g)[0].substr(2),
				"name": word.match(/[a-z]+/g)[0],
				"date": word.match(/\d+/g)[0].substr(0,8),
				"id": word.match(/\d+/g)[0].substr(9)
			}
		}
		if(word.match(/^HT\d+/g)){
			return {
				"title": "合同ID",
				"type": "constractId",
				"id": word.match(/\d+/g)[0]
			}
		}
		if(word.match(/^DD\d+/g)){
			return {
				"title": "订单ID",
				"type": "orderId",
				"id": word.match(/\d+/g)[0]
			}
		}
		if(word.match(/^DZD\d+/g)){
			return {
				"title": "对账单ID",
				"type": "balanceId",
				"id": word.match(/\d+/g)[0]
			}
		}
		if(word.match(/^HK\d+/g)){
			return {
				"title": "回款ID",
				"type": "paymentId",
				"id": word.match(/\d+/g)[0]
			}
		}
		if(word.match(/^XZ\d+/g)){
			return {
				"title": "下载明细",
				"type": "paymentId",
				"id": word.match(/\d+/g)[0]
			}
		}
		return {
			"title": "关键词查询",
			"type": "keyword",
			"keyword": word
		}
	};
	
	submitMergeGroup(){
		
	};

	newGroup () {
		const {selectStatus} = this.state, {dataList:{list}} = this.props;
		let selectedIDS = [];

		[...selectStatus].map((item, i)=>{
			if(item && list[i].onlineState == 1){
				selectedIDS.push(list[i].resId);
			}
		});

		if(selectedIDS.length < 2){
			this.alertMsg('请选择2个以上【已上线】的图片');
			return;
		}

		window.open('/editor/edit/group/new/' + selectedIDS.join('&'));
	}

	joinGroup () {

	}
	
	// 合并组照
	mergeGroup () {
		
	}

}
