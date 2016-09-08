import React, {Component} from "react";
import ReactDOM           from "react-dom";
import {connect}          from "react-redux";

import CrumbsBox          from "app/components/common/crumbs"
import FilterBox          from "app/components/common/filter";
import TableBox           from "app/components/common/table";
import LoadingBox         from "app/components/common/loading";
import SearchBox		  from "app/components/provider/searchBox";

import {Pagination, Modal, Button, Tooltip, Overlay} from "react-bootstrap/lib";
import {cmsFilter, cmsSearch, topicFrequency} 		  from "app/action_creators/cms_action_creator";

import { Radio, Select, Input} 		  from "antd"

const RadioGroup = Radio.Group;
const Option = Select.Option;

class OnlineStateConfiger extends Component {
	constructor (props) {
		super(props);

		this.state = {
			selectDisplay : (this.props.onlineState == '在线' ? 'none' : '')
		}
	};

	render () {
		return (<table><tbody>
					<tr><td colSpan="2"><p>说明：专题下线后将不在被搜索引擎搜到，请谨慎操作</p></td></tr>
					<tr><td>目前状态：</td><td>{this.props.onlineState}</td></tr>
					<tr><td>状态操作：</td>
						<td><RadioGroup onChange={this.lineStateChange.bind(this)} defaultValue={this.props.onlineState}>
					        <Radio key="online" value="在线">上线</Radio>
					        <Radio key="offline" value="下线">下线</Radio>
					     </RadioGroup></td>
					</tr>
			      	<tr style={{display:this.state.selectDisplay}}><td>下线原因：</td>
			      		<td><Select size="large" defaultValue="1" style={{ width: 200 }}>
				      	<Option value="1">专题图片不合规范</Option>
				      	<Option value="2">内容包含色情</Option>
				      	<Option value="3">包含未申</Option>
				    	</Select></td>
				    </tr>
				</tbody></table>);
	}

	lineStateChange (e) {
		if(e.target.value == '下线'){
			this.setState({
				selectDisplay : ''
			})
		}else{
			this.setState({
				selectDisplay : 'none'
			})
		}
	}
};

const select = (state) => ({
	"error": state.cms.error,
	"dataFilter": state.cms.dataFilter,
	"dataList": state.cms.dataList
});
@connect(select)

export default class CmsContainer extends Component {
	constructor (props) {
		super(props);
		this.state = {
			"crumbs": [
				{"path": "/home", "text": "首頁"},
				{"path": "/cms/topicManage", "text": "内容运营平台：专题管理"}
			],
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
			keyword:''
		};
		this.paramsInit = {pageNum:1,groupState:5};
	};

	static contextTypes = {
		"router": React.PropTypes.object.isRequired
	};

	componentDidMount () {
		this.filterForm();
	};

	render () {
		const {dataList} = this.props;
		const {crumbs,maxButtons,activePage,loadingShow,loadingTarget} = this.state;
		const pages = dataList.pages ? dataList.pages : activePage;
		const toolTipLoading = <Tooltip id="j_loading"><i className="ace-icon fa fa-spinner fa-spin orange bigger-100"></i> 更新中...</Tooltip>;
		const {alert} = this.state;
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
		return (
			<div className="main-content-inner">
				<CrumbsBox crumbs={crumbs} />
				<div className="page-content">
					{alertBox}

					<Overlay show={loadingShow}
							 target={()=> ReactDOM.findDOMNode(loadingTarget)}
							 placement="right">
						{toolTipLoading}
					</Overlay>

					<div className="row">
						<div className="searchbox">
							<div style={{ marginTop: 8, width: "60%" }}>
								<Input addonAfter={
									<Button bsStyle="info" style={{ padding: "7px 35px" }} onClick={this.keywordSearch.bind(this) }> 搜 索</Button>
								} value={this.state.keyword} style={{ height: "37px", paddingLeft: "15px" }} onChange={e => { this.setState({ keyword: e.target.value }) } }/>
							</div>
						</div>
					</div>

					<div className="row"><div id="j_filter" className="col-xs-12"></div></div>

					<div className="row"><div className="space-8"></div></div>

					<div className="row">
						<div className="col-xs-6">
							<button className="btn btn-sm btn-info" onClick={this.configPage.bind(this)}>
								<i className="ace-icon fa fa-plus bigger-120"></i>创建专题
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.refresh.bind(this)}>
								<i className="ace-icon fa fa-refresh bigger-120"></i>刷新
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
						<div id="j_table" className="col-xs-12"></div>
					</div>

					<div className="row">
						<div className="col-xs-6">
							<button className="btn btn-sm btn-info" onClick={this.configPage.bind(this)}>
								<i className="ace-icon fa fa-plus bigger-120"></i>创建专题
							</button>{' '}
							<button className="btn btn-sm btn-info" onClick={this.refresh.bind(this)}>
								<i className="ace-icon fa fa-refresh bigger-120"></i>刷新
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
		const {dispatch} = this.props;
		const container = document.getElementById('j_filter');
		ReactDOM.render(<LoadingBox />, container);
		dispatch(cmsFilter()).then((result) => {
			if (result.apiError) return false;

			ReactDOM.render(<FilterBox dataFilter={this.props.dataFilter} onSearch={this.handleOnSearch.bind(this)} searchError={this.props.error} />, container);

			// if(!this.props.dataFilter) {
			this.queryList(this.paramsInit);
			// }
		}); 
	};

	handleOnPagination (eventKey) {
		this.setState({activePage: eventKey});
		const {params} = this.props.dataList;
		const paramsData = Object.assign({}, params, {"pageNum": eventKey});
		this.queryList(paramsData);
	};

	refresh () {
		const {params} = this.props.dataList;
		this.queryList(params);
	};

	queryList (params) {
		const {dispatch} = this.props;
		const container = document.getElementById('j_table');
		ReactDOM.render(<LoadingBox />, container);
		dispatch(cmsSearch(params)).then((result) => {
			if (result.apiError) return false;
			ReactDOM.render(<TableBox onTable={this.handleOnTable.bind(this)} {...this.props.dataList} />, container);
		});
	};

	configPage (){
		const data = this.state.params;
		const idField = data.idField;
		const id    = idField && data.item[idField] || '0';
		this.context.router.push("/cms/topicManage/" + id);
	};

	handleOnTable ({operate, data, rowIndex}) {
		Object.assign(this.state.params, data);
		switch (operate) {
			case "configPage":
				this.configPage();
				break;
			// case "moveTo":
			// 	this.moveTo();
			// 	break;
			// case "createLink":
			// 	this.createLink();
			// 	break;
			// case "onlineStateConfig":
			// 	this.onlineStateConfig(data);
			// 	break;
			case "manageContent":
				this.manageContent();
				break;
			case "changeUsingState":
				this.changeUsingState(data, rowIndex);
				break;
			default:
				break;
		}
	};

	handleOnSearch (params) {
		let dataParams = {};
		params.map((item)=>{
			if(item.field == 'onlineDate'){
				const dates = item.id.split(',');
				dataParams.start_day = dates[0];
				dataParams.end_day = dates[1];
			}else{
				dataParams[item.field] = item.id;
			}
		});
		this.setState({"activePage": 1});
		Object.assign(dataParams, this.paramsInit);
		this.queryList(dataParams);
	};

	openAlert(config) {
		const alert = Object.assign(this.state.alert, {"show":true}, config);
		this.setState({"alert": alert});
	};

	closeAlert () {
		const alert = Object.assign(this.state.alert, {"show":false});
		this.setState({"alert": alert});
	};

	searchListRule () {

	}

	manageContent () {
		const data = this.state.params;
		const idField = data.idField;
		const id    = idField && data.item[idField] || '0';
		this.context.router.push("/cms/topicManage/" + id + '/4');
	}

	changeUsingState (data, rowIndex) {
		const {dispatch, params:{topicId}} = this.props;

		dispatch(topicFrequency({
			topicId : data.topicId,
			focus : 3 - data.usingState
		})).then((result) => {
			if (result.apiError) return false;
			this.refresh();
		});
	};

	keywordSearch(){
		const {params} = this.props.dataList;
		this.queryList({
			...params,
			keyword:this.state.keyword
		});
	}
}