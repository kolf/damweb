import React, {Component} from "react";
import ReactDOM           from "react-dom";
import {connect}          from "react-redux";

import CrumbsBox          from "app/components/common/crumbs"
import FilterBox          from "app/components/common/filter";
import TableBox           from "app/components/common/table";
import LoadingBox         from "app/components/common/loading";

import {Pagination, Modal, Button, Tooltip, Overlay} from "react-bootstrap/lib";
import {cmsChannelList} 		  from "app/action_creators/cms_action_creator";

const pageTexts = {
	'page' : '首页管理',
	'channel' : '频道页管理'
};

const select = (state) => ({
	"error": state.cms.error,
	"dataList": state.cms.dataList
});
@connect(select)

export default class ChannelList extends Component {
	constructor (props) {
		super(props);

		const pageClass = props.params.pageClass;

		this.state = {
			"crumbs": [
				{"path": "/home", "text": "首頁"},
				{"path": "/cms/channelManage/" + pageClass, "text": '内容运营平台：' + pageTexts[pageClass]}
			],
			"lastPage":pageClass,
			"dataList": {},
			"activePage": 1,
			"pageSize": 5,
			"maxButtons": 5,
			"params":{},
			"loadingShow": false,
			"loadingTarget": ""
		};
		this.paramsInit = {pageNum:1,groupState:5};
	};

	static contextTypes = {
		"router": React.PropTypes.object.isRequired
	};

	componentDidMount () {
		this.queryList({});
	};

	componentWillReceiveProps(props){
		if(props.params.pageClass != this.state.lastPage){
			const pageClass = props.params.pageClass;
			this.state.crumbs[1] = {"path": "/cms/channelManage/" + pageClass, "text": '内容运营平台：' + pageTexts[pageClass]}
			this.queryList({});
		}
	};

	render () {
		const {dataList} = this.props;
		const {crumbs,maxButtons,activePage,loadingShow,loadingTarget} = this.state;
		const pages = dataList.pages ? dataList.pages : activePage;
		const toolTipLoading = <Tooltip id="j_loading"><i className="ace-icon fa fa-spinner fa-spin orange bigger-100"></i> 更新中...</Tooltip>;
		return (
			<div className="main-content-inner">
				<CrumbsBox crumbs={crumbs} />
				<div className="page-content">

					<Overlay show={loadingShow}
							 target={()=> ReactDOM.findDOMNode(loadingTarget)}
							 placement="right">
						{toolTipLoading}
					</Overlay>

					<div className="row"><div id="j_filter" className="col-xs-12"></div></div>

					<div className="row"><div className="space-8"></div></div>

					<div className="row">
						<div className="col-xs-6">
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
		const {dispatch, params:{pageClass}} = this.props;
		params.pageClass = pageClass;
		this.state.lastPage = pageClass;
		const container = document.getElementById('j_table');
		ReactDOM.render(<LoadingBox />, container);
		dispatch(cmsChannelList(params)).then((result) => {
			if (result.apiError) return false;
			ReactDOM.render(<TableBox onTable={this.handleOnTable.bind(this)} {...this.props.dataList} />, container);
		});
	};

	configPage (){
		const data = this.state.params;
		const idField = data.idField;
		const id    = data.item[idField];
		this.context.router.push("/cms/channelManage/config/" + id);
	};

	handleOnTable ({operate, data}) {
		Object.assign(this.state.params, data);
		switch (operate) {
			case "configPage":
				this.configPage();
				break;
			default:
				break;
		}
	};
}