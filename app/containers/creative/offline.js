import React, {Component} from "react";
import ReactDOM           from "react-dom";
import {connect}          from "react-redux";
import moment             from "moment";
import _                  from "lodash";

import CrumbsBox          from "app/components/common/crumbs"
import FilterBox          from "app/components/common/filter";
import TableBox           from "app/components/common/table";
import LoadingBox         from "app/components/common/loading";
import ThumbnailBox       from "app/components/provider/thumbnail";
import EditRecord         from "app/components/modal/editRecord";
import AddToTopic         from "app/components/modal/addtoTopic";

import Affix from "antd/lib/affix";

import {Pagination, Modal, Button, Tooltip, Overlay} from "react-bootstrap/lib";

import {getOfflineFilter, getOfflineData, getStorageData,editgroupOffline,editgrouppublish} from "app/action_creators/editor_action_creator";
import {reviewRecordsView} from "app/action_creators/provider_action_creator";

import {
	Grid,
	Row,
	Col,
	Thumbnail
} from "react-bootstrap/lib";

const select = (state) => ({
	"error": state.editor.error,
	"dataFilter": state.filter.data,
	"dataList": state.editor.dataList,
	"reviewRecordsDataList": state.provider.reviewRecordsDataList
});
@connect(select)


export default class CreativeOfflineContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			"crumbs": [
				{ "path": "/home", "text": "首页" },
				{ "path": "/creative/offline", "text": "创意类：已下线" }
			],
			"filterInit": {},
			"filterParams": {
				"resGroup": 1
			},
			"editor": {
				"role": 2, // role 1 销售 2 财务 3 运营
				"pageNum": 1,
				"pageSize": 30,
				"onlineState": 3, // 1已上线2未上线3撤图4冻结 ',
				"maxButtons": 3
			},
			"params": {},
			"tooltip": {
				"show": false,
				"target": null,
				"text": "更新中...",
				"placement": "right"
			},
			"alert":{
				"show": false,
				"isButton": true,
				"bsSize": "small",
				"onHide": this.closeAlert.bind(this),
				"title": null,
				"body": null,
				"msg": "",
				"param": {},
				"isLoading": false,
				"submitAlert": null
			},
			"selectStatus": [],
			"Lists": {},
			"orderByDate": false
		};
		this.filterParam = {
			paramType: 0,
			param: { "graphicalType": 1,"resGroup": 1, "onlineState": 3 }
		};
	}

	componentDidMount() {
		this.filterForm();
	};

	componentWillUnmount() {
		const list = document.getElementById('j_table');
		ReactDOM.render(<div></div>, list);
	};

	render() {
		const {dataList} = this.props;
		const {crumbs, editor, tooltip, alert, orderByDate} = this.state;
		const editorPages = dataList ? (dataList.total>editor.pageSize?Math.floor(dataList.total / editor.pageSize):editor.pageNum) : editor.pageNum;
		return (
			<div className="main-content-inner">
				<CrumbsBox crumbs={crumbs} />
				<div className="page-content">

					<Modal {...alert}>
						<Modal.Header closeButton={true}>
							<Modal.Title>{alert.title}</Modal.Title>
						</Modal.Header>
						<Modal.Body style={{ "overflow": "hidden" }}>{alert.body}</Modal.Body>
						{alert.isButton &&
						<Modal.Footer>
							{alert.msg && <span className="orange pr-10"><i className="ace-icon fa fa-hand-o-right"></i> {alert.msg}</span>}
							{alert.submitAlert &&
							<Button bsClass="btn btn-sm btn-info btn-round" disabled={alert.isLoading} onClick={!alert.isLoading ? alert.submitAlert : null}>
								{alert.isLoading ? 'Loading...' : '确认'}
							</Button>
							}
							<Button bsClass="btn btn-sm btn-light btn-round" onClick={alert.onHide}>取消</Button>
						</Modal.Footer>
						}
					</Modal>

					<Overlay show={tooltip.show} target={() => ReactDOM.findDOMNode(tooltip.target) } placement={tooltip.placement}>
						<Tooltip id="j_tooltip_loading"><i className="ace-icon fa fa-spinner fa-spin orange bigger-100"></i> {tooltip.text}</Tooltip>
					</Overlay>

					<div className="row"><div className="col-xs-12">

						<div className="widget-box transparent ui-sortable-handle">

							<div className="widget-body">
								<div id="j_filter" className="widget-main padding-6 no-padding-left no-padding-right"></div>
							</div>
						</div>

					</div></div>

					<Affix className="row operate">
						<div className="col-xs-6">
							<button className="btn btn-sm btn-info" onClick={this.refresh.bind(this) }>
								<i className="ace-icon fa fa-refresh"></i>刷新
							</button>
							<button className="btn btn-sm btn-info" onClick={this.orderByDate.bind(this) }>
								编审时间 <i className={ orderByDate ? "ace-icon fa fa-long-arrow-up" : "ace-icon fa fa-long-arrow-down"}></i>
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
								items={editorPages}
								maxButtons={editor.maxButtons}
								activePage={editor.pageNum}
								onSelect={this.handleOnPagination.bind(this)} />
						</div>
					</Affix>

					<div className="row"><div className="space-8"></div></div>

					<div id="j_table">{this.props.children}</div>

					<div className="row operate">
						<div className="col-xs-6">
						</div>
						<div className="dataTables_paginate">
							<Pagination
								prev
								next
								first
								last
								ellipsis
								boundaryLinks
								items={editorPages}
								maxButtons={editor.maxButtons}
								activePage={editor.pageNum}
								onSelect={this.handleOnPagination.bind(this)} />
						</div>
					</div>

				</div>
			</div>
		);
	};

	filterForm() {
		const {dispatch} = this.props;
		const container = document.getElementById('j_filter');
		dispatch(getOfflineFilter(this.filterParam)).then((result) => {
			if (result.apiError) return false;
			ReactDOM.render(
				<FilterBox
					filterInit={this.state.filterInit}
					dataFilter={this.props.dataFilter}
					onSearch={this.handleOnSearch.bind(this) }
					searchError={this.props.error}/>, container);
		});
	};

	queryList(params) {
		const {dispatch} = this.props;
		const container = document.getElementById('j_table');
		ReactDOM.render(<LoadingBox />, container);
		dispatch(getStorageData(params)).then((result) => {
			if (result.apiError) {
				this.message(result.apiError.errorMessage);
				return false
			}
			const dataList = result.apiResponse;
			let len = dataList.list.length;
			this.state.selectStatus = _.fill(Array(len), false);

			let _dataList = [];
			dataList.list.map((item, i) => {
				let tmp = {};
				_.mapKeys(item, (val, key) => {
					tmp[key] = val;
				});
				tmp.timeByOrder = moment(item.editTime).unix();
				_dataList.push(tmp);
			});
			this.state.Lists = _dataList;

			this.thumbnailRender();
		});
	};

	refresh(type, dataParams) {
		const {editor, filterParams} = this.state;
		let tempParams = {};

		if (type == "pagination") { // pagination
			editor.pageNum = dataParams.pageNum;
			Object.assign(tempParams, editor);
		}
		if (type == "filter") { // filter
			Object.assign(tempParams, editor, dataParams, { "pageNum": 1 });
		}
		this.setState({ "filterParams": tempParams, "editor": editor });
		if (!dataParams) { // refresh
			Object.assign(tempParams, editor, filterParams);
		}
		delete tempParams.maxButtons;
		this.queryList(tempParams);
	};

	thumbnailRender() {
		const {Lists} = this.state;
		const container = document.getElementById('j_table');

		const config = {
			//选择
			"selectStatus": this.state.selectStatus,
			"setSelectStatus": this.setSelectStatus.bind(this)
		};

		ReactDOM.render(
			<ThumbnailBox
				types="storage"
				lists={Lists}
				onThumbnail={this.handleOnThumbnail.bind(this) }
				{...config}
				/>, container
		);
	};

	setSelectStatus(params) {
		this.setState({ selectStatus: params });
		// console.log(params);
	};

	getStatus() {
		return this.props.dataList.status;
	};

	selectAll() {
		const {selectStatus} = this.state;
		let len = this.props.dataList.list.length;
		this.state.selectStatus = _.fill(Array(len), true);
		this.thumbnailRender();
	};

	selectToggle() {
		const {selectStatus} = this.state;
		this.state.selectStatus = [...selectStatus].map((val, i) => { return !val });
		this.thumbnailRender();
	};

	handleOnThumbnail(param) {
		// Object.assign(this.state.params, key);
		const {operate, key, id} = param;
		switch (operate) {
			case "editRecord"://编审记录
				this.editRecord({
					type: 1,//中文
					id: id
				});
				break;
			case "postilRecord":
				this.postilHistory({
					type: 1,
					id: id,
					key: key
				});
				break;
			case "offline":
				this.offline({ id, key });
				break;
			case "publish":
				this.publish({ id, key });
				break;
			case "addtoTopic":
				this.addtoTopic({ id });
				break;
			case "abroad":
				this.toAbroad({ id });
				break;
			default:
				console.log(operate);
				console.log(key);

		}
		//this.state.tableParams = Object.assign(this.state.tableParams, params);
	};

	//根据id和key返回list
	getList({id, key}) {
		const {Lists} = this.state;
		if (Lists && Lists[key] && Lists[key].id == id) return Lists[key];
		else return false;
	};

	//编审记录
	editRecord({type, id}) {
		const {dispatch} = this.props;

		dispatch(reviewRecordsView({ type, id })).then(result => {
			if (result.apiError) return false;
			const config = {
				"bsSize": "large",
				"title": <samll style={{ "fontSize": "14px" }}>{"编审记录"}</samll>,
				"body": <EditRecord Lists={result.apiResponse.reverse().slice(0, 20) }/>,//记录太多倒序取20个
				"isButton": false
			};
			this.openAlert(config);
		});
	};

	//批注记录
	postilHistory({type, id, key}) {
		const {dispatch} = this.props;
		const list = this.getList({ id, key });

		if (list) {
			if (list.isPostil && list.isPostil == "1") {//批注过
				dispatch(getPostilhistory({ type, id })).then(result => {
					if (result.apiError) return false;
					const config = {
						"bsSize": "large",
						"title": <samll style={{ "fontSize": "14px" }}>{"批注记录"}</samll>,
						"body": <EditRecord Lists={result.apiResponse}/>,
						"isButton": false
					};
					this.openAlert(config);
				});
			} else {
				this.message("还没有被批注过哦~");
			}
		}
	};

	//加入专题
	addtoTopic({id}) {
		const config = {
			"bsSize": "lg",
			"title": <samll style={{ "fontSize": "14px" }}>{"加入专题"}</samll>,
			"body": <AddToTopic returnTopicId={id => { this.state.alert.param.id = id; console.log(id) } }/>,
			"isButton": true,
			"submitAlert": this.addtoTopicSubmit.bind(this, id)
		};
		this.openAlert(config);
	};

	addtoTopicSubmit(id) {
		const {dispatch} = this.props;
		const topicId = this.state.alert.param.id;


		if (topicId) {
			dispatch(getProductId(topicId)).then(result => {
				if (result.apiError) return false;
				let productId = result.apiResponse.productId;
				const param = {
					groupId: id,
					topicId,
					productId: productId ? productId : null
				};

				dispatch(addtoTopic(param)).then(result => {
					if (result.apiError) {
						this.errorAlert("请重新选择并确认.");
						return false;
					}
					this.closeAlert();
				});
			});

		} else {
			this.errorAlert("请重新选择并确认.");
		}
	};

	//上线
	publish({id, key}) {
		const {dispatch} = this.props;
		const {Lists} = this.state;

		dispatch(editgrouppublish({ groupId: id })).then(result => {
			if (result.apiError) return false;
			this.refresh();
			this.message("上线成功");
		});
	};

	//下线
	offline({id, key}) {
		const {dispatch} = this.props;
		const {Lists} = this.state;

		dispatch(editgroupOffline({ groupId: id })).then(result => {
			if (result.apiError) return false;
			this.refresh();
			this.message("下线成功");
		});
	};

	//时间排序
	orderByDate() {
		const {Lists, orderByDate} = this.state;
		console.log(Lists);
		let newLists = _.sortByOrder(Lists, ["timeByOrder"], [orderByDate ? "asc" : "desc"]);
		this.setState({ orderByDate: !orderByDate });
		this.state.Lists = newLists;
		this.thumbnailRender();
	};

	//添加到海外
	toAbroad({id}) {
		const {dispatch} = this.props;
		dispatch(addToOverseas(id)).then(result => {
			if (result.apiError) {
				this.message("已经加入海外，请刷新页面");
				return falsel;
			}
			this.message("添加成功");
		});
	};

	handleOnSearch (params,current) {
		if(current && current.field == "graphicalType") {
			this.filterParam.param.graphicalType = parseInt(current.id);
			this.filterForm();
		}
		if(current && current.field == "category") {
			this.filterParam.param.category = parseInt(current.id);
			this.filterParam.param.picType = 1;
			this.filterForm();
		}
		let dataParams = {};
		params.map((item) => {
			dataParams[item.field] = item.id;
		});
		this.refresh("filter", dataParams);
	};

	handleOnPagination(pageNum) {
		this.refresh("pagination", { "pageNum": pageNum });
	};

	closeAlert () {
		const alert = Object.assign(this.state.alert, {"show":false});
		this.setState({"alert": alert});
	};

	openAlert(config) {
		const alert = Object.assign(this.state.alert, {"show":true}, config);
		this.setState({"alert": alert});
	};

	message(msg) {
		const config = {
			"bsSize": "small",
			"title": <samll style={{ "fontSize": "14px" }}>{"提示信息"}</samll>,
			"body": <p className="bolder center grey">{msg}</p>,
			"isButton": false
		};
		this.openAlert(config);
	};

}
