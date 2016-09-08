import React, {Component} from "react";
import ReactDOM           from "react-dom";
import {connect}          from "react-redux";
import moment             from "moment";
import _                  from "lodash";

import CrumbsBox          from "app/components/common/crumbs"
import FilterBox          from "app/components/common/filter";
import TableBox           from "app/components/editor/table";
import LoadingBox         from "app/components/common/loading";
import EditRecord         from "app/components/modal/editRecord";
import AddToTopic         from "app/components/modal/addtoTopic";

import Affix from "antd/lib/affix";

import {Pagination, Modal, Button, Tooltip, Overlay, OverlayTrigger} from "react-bootstrap/lib";
import {getPublishFilter, getToeditData} from 'app/action_creators/editor_action_creator';
import {reviewRecordsView, addtoTopic} from "app/action_creators/provider_action_creator";
import {topicsAuto,topicsUpdate} from "app/action_creators/topics_action_creator";

const select = (state) => ({
	"dataFilter": state.filter.data,
	"dataList": state.editor.dataList,
	"reviewRecordsDataList": state.provider.reviewRecordsDataList,
	"topicsAutoDataList": state.topics.dataList
});
@connect(select)
export default class EditorSecondInstanceContainer extends Component {

	constructor (props) {
		super(props);
		this.state = {
			"crumbs": [
				{"path": "/home", "text": "首页"},
				{"path": "/editor/secondInstance", "text": "编辑类：二审"}
			],
			"filterInit": {},
			"filterParams": {
				"resGroup": 1
			},
			"editor": {
				"role": 2, // role 1 销售 2 财务 3 运营
				"pageNum": 1,
				"pageSize": 30,
				"groupState": 3, // '1 新入库、2未编审、3二审,4已编审',
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
			"tableInit": null,
			"createTimeByOrder": false,
			"editTimeByOrder": false
		};

		this.filterParam = {
			paramType: 0,
			param:{"graphicalType":1,"resGroup": 1,"groupState": 3}
		};

		this.callbackGroup = {
			"callbackStatusTotal": this.callbackStatusTotal.bind(this)
		};
	}

	static contextTypes = {
		"router": React.PropTypes.object.isRequired
	};

	componentDidMount () {
		this.filterForm();
	};

	render () {
		const {dataList} = this.props;
		const {crumbs, editor, tooltip, alert, createTimeByOrder, editTimeByOrder} = this.state;
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

					<div className="row"><div id="j_filter" className="col-xs-12"></div></div>

					<Affix className="row operate">
						<div className="col-xs-6">
							<button className="btn btn-sm btn-info" onClick={this.selectAll.bind(this) }>
								<i className="ace-icon fa fa-copy"></i>全选
							</button>
							<button className="btn btn-sm btn-info" onClick={this.selectToggle.bind(this) }>
								<i className="ace-icon fa fa-clipboard"></i>反选
							</button>
							<button className="btn btn-sm btn-info" onClick={this.refresh.bind(this)}>
								<i className="ace-icon fa fa-refresh"></i>刷新
							</button>
							<button className="btn btn-sm btn-info" onClick={this.orderByDate.bind(this,'createTimeByOrder') }>
								上传时间 <i className={ createTimeByOrder ? "ace-icon fa fa-long-arrow-up" : "ace-icon fa fa-long-arrow-down"}></i>
							</button>
							<button className="btn btn-sm btn-info" onClick={this.orderByDate.bind(this,'editTimeByOrder') }>
								编审时间 <i className={ editTimeByOrder ? "ace-icon fa fa-long-arrow-up" : "ace-icon fa fa-long-arrow-down"}></i>
							</button>
							<span className="line-c"></span>
							<button className="btn btn-sm btn-info" onClick={this.createGroup.bind(this)}>
								新建组照
							</button>
							<button className="btn btn-sm btn-info" onClick={this.mergeGroup.bind(this)}>
								合并组照
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

					<div className="row">
						<div id="j_table" className="col-xs-12 table-responsive text-nowrap">
							<TableBox onTable={this.handleOnTable.bind(this)} {...this.callbackGroup} {...this.state.tableInit} />
						</div>
					</div>

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

	filterForm () {
		const {dispatch} = this.props;
		const container = document.getElementById('j_filter');
		dispatch(getPublishFilter(this.filterParam)).then((result) => {
			if (result.apiError) {
				this.message(result.apiError.errorMessage);
				return false
			}
			ReactDOM.render(
				<FilterBox
					filterInit={this.state.filterInit}
					dataFilter={this.props.dataFilter}
					onSearch={this.handleOnSearch.bind(this) }
					searchError={this.props.error}/>, container);
		});
	};

	queryList (params) {
		const {dispatch} = this.props;
		dispatch(getToeditData(params)).then((result) => {
			if (result.apiError) {
				this.message(result.apiError.errorMessage);
				return false
			}
			const {dataList} = this.props;
			this.state.tableInit = {...dataList};
			let _dataList = [];
			[...dataList.list].map((item, i) => {
				let tmp = {};
				_.mapKeys(item, (val, key) => {
					tmp[key] = val;
				});
				tmp.createTimeByOrder = moment(item.createTime).unix();
				tmp.editTimeByOrder = moment(item.editTime).unix();
				_dataList.push(tmp);
			});
			this.state.tableInit.list = _dataList;
			this.selectCancel();
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

	callbackStatusTotal (item){
		 return (
			 <span>
				 <OverlayTrigger
					 key={item.id +"onlineCount"}
					 overlay={<Tooltip id={"j_onlineCount_"+item.id}>上线数</Tooltip>}
					 placement="top"
					 delayShow={150}
					 delayHide={50}>
					 <span style={{"cursor":"default"}}>{item.onlineCount?item.onlineCount:0}</span>
				 </OverlayTrigger>
				 <samp>|</samp>
				 <OverlayTrigger
					 key={item.id + "resCount"}
					 overlay={<Tooltip id={"j_resCount_"+item.id}>总数</Tooltip>}
					 placement="top"
					 delayShow={150}
					 delayHide={50}>
					 <span style={{"cursor":"default"}}>{item.resCount?item.resCount:0}</span>
				 </OverlayTrigger>
			</span>
		 );
	};

	handleOnTable ({operate,item,idField,row}) {
		Object.assign(this.state.params, {operate,item,idField,row});
		switch (operate) {
			case "comment":
				this.postilHistory({operate,item,idField});
				break;
			case "reviewRecords"://编审记录
				this.editRecord({
					type: 1,//中文
					id: item[idField]
				});
				break;
			case "offline":
				this.offline();
				break;
			case "addTopics":
				this.addTopics({ id: item[idField] });
				break;
			case "editor":
				window.open("/editor/edit/group/edit/" + item[idField]);
				//this.context.router.push("/edit/ids="+data.item.id+"&type=edit");
				break;
			case "view":
				window.open("/editor/view/" + item[idField]);
				break;
			case "checkbox":
				this.selectCheckbox(row);
				break;
			default:
				console.log({operate,item,idField,ids});
		}
		//this.state.tableParams = Object.assign(this.state.tableParams, params);
	};

	offline () {
		const data = this.state.params;
		const idField = data.idField;
		const id    = data.item[idField];
		const msg   = {"title": "下线：", "cite":"ID-"};
		const config = {
			"bsSize": "small",
			"title": <samll style={{"fontSize":"14px"}}>{msg.title + msg.cite + id}</samll>,
			"body": <p className="bolder center grey"><i className="ace-icon fa fa-hand-o-right blue bigger-120"></i>确定要下线此组图？</p>,
			"submitAlert": this.submitOffline.bind(this),
			"isButton": true
		};
		this.openAlert(config);
	};

	submitOffline () {
		const data = this.state.params;
		const idField = data.idField;
		const id      = data.item[idField];
		const params  = {};
		params[idField] = id;
		params.groupState = 6;
		const {dispatch} = this.props;
		dispatch(publishedUpdate(params)).then((result) => {
			if (result.apiError) return false;
			this.closeAlert();
			this.refresh();
		});
	};

	//加入专题
	addTopics ({id}) {
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

	selectCheckbox (row) {
		const {tableInit} = this.state;
		if(!tableInit){return}
		tableInit.selectStatus[row] = !tableInit.selectStatus[row];
		this.setState({tableInit});
	};

	selectCancel() {
		const {tableInit} = this.state;
		if(!tableInit){return}
		tableInit.selectStatus =  _.fill(Array(tableInit.list.length), false);
		this.setState({tableInit});
	};

	selectAll() {
		const {tableInit} = this.state;
		if(!tableInit){return}
		tableInit.selectStatus =  _.fill(Array(tableInit.list.length), true);
		this.setState({tableInit});
	};

	selectToggle() {
		const {tableInit} = this.state;
		if(!tableInit){return}
		tableInit.selectStatus = [...tableInit.selectStatus].map((val) => { return !val });
		this.setState({tableInit});
	};

	getSelectId (operate,type) {
		const {tableInit} = this.state;
		const selectStatus = tableInit.selectStatus;
		const list = tableInit.list;
		let selectIdList = [],selectOneCategory=[];
		[...selectStatus].map((item,i) => {
			if(item){
				if(operate=="new"){
					// "group":"photos"
					if(type=="group"){
						const groupState = list[i].groupState;
						if(groupState==1||groupState==2){ // '1 新入库、2未编审、3二审,4已编审',
							selectStatus[i] = false;
						}else{
							selectIdList.push(list[i].id);
						}
					}
				}else if(operate=="merge"&&type=="group"){
					const groupState = list[i].groupState;
					const oneCategory = list[i].oneCategory;
					if(groupState==1||groupState==2){
						selectIdList.push(list[i].id);
						selectOneCategory.push(oneCategory);
					}else{
						selectStatus[i] = false;
					}
				}else {
					selectIdList.push(list[i].id);
				}
			}
		});
		if(operate=="merge"&&selectOneCategory.length>1){
			const flag = _.difference(selectOneCategory,_.initial(selectOneCategory)).length>0;
			//console.log(flag,selectOneCategory,_.initial(selectOneCategory));
			if(flag){_.fill(selectStatus, false);selectIdList = [];}
		}
		return selectIdList;
	};

	// 合并组照
	mergeGroup () {
		const type = "group";
		const ids = this.getSelectId('merge',type);
		if (ids && ids.length > 1) {
			window.open("/editor/edit/"+type+"/merge/" + ids.join("&"));
		} else {
			const config = {
				"bsSize": "small",
				"title": <samll style={{ "fontSize": "14px" }}>{"合并组照"}</samll>,
				"body": <p className="bolder center grey"><i className="ace-icon fa fa-hand-o-right blue bigger-120"></i> 请选择2个以上【同分类未编审】的组照~</p>,
				"isButton": false
			};
			this.openAlert(config);
		}
	};

	//新建组照
	createGroup() {
		const type = "group";
		const ids = this.getSelectId('new',type);
		if (ids && ids.length > 1) {
			window.open("/editor/edit/"+type+"/new/" + ids.join("&"));
		} else {
			const config = {
				"bsSize": "small",
				"title": <samll style={{ "fontSize": "14px" }}>{"新建组照"}</samll>,
				"body": <p className="bolder center grey">
					<i className="ace-icon fa fa-hand-o-right blue bigger-120"></i> 请选择2个以上{type=="group"?'【已编审】的组照':'【已上线】的图片'}~
				</p>,
				"isButton": false
			};
			this.openAlert(config);
		}
	};

	//时间排序
	orderByDate(type) {
		const {tableInit} = this.state;
		if(!tableInit){return}
		tableInit.list = _.sortByOrder([...tableInit.list], [type], [this.state[type] ? "asc" : "desc"]);
		const params = {tableInit};
		params[type] = !this.state[type];
		this.setState(params);
		const container = document.getElementById('j_table');
		ReactDOM.render(<TableBox onTable={this.handleOnTable.bind(this)} {...this.state.tableInit} />, container);
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
	postilHistory({operate,item,idField}) {
		const {dispatch} = this.props;
		if (item) {
			if (item.isPostil && item.isPostil == "1") {//批注过
				dispatch(getPostilhistory({ type: 1, id:item[idField] })).then(result => {
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

}