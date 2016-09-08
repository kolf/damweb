import React, {Component} from "react";
import ReactDOM           from "react-dom";
import {connect}          from "react-redux";
import moment             from "moment";
import _                  from "lodash";
import {getStorage}       from "app/api/auth_token";

import CrumbsBox          from "app/components/common/crumbs"
import FilterBox          from "app/components/common/filter";
import LoadingBox         from "app/components/common/loading";
import ThumbnailBox       from "app/components/provider/thumbnail";
import EditRecord         from "app/components/modal/editRecord";
import AddToTopic         from "app/components/modal/addtoTopic";

// import SearchBox		  from "app/components/provider/searchBox";

import {Pagination, Modal, Button, Tooltip, Overlay} from "react-bootstrap/lib";

import {
	isEdit,
	getStorageFilter,
	getStorageData,
	reviewRecordsView,
	getPostilhistory,
	editgroupOffline,
	editgrouppublish
} from "app/action_creators/editor_action_creator";

import {
	addInEditPost as addInEditPostCall,
	addtoTopic,
	getProductId,
	addToOverseas
} from "app/action_creators/provider_action_creator";

import {getFavoriteList, postFavoriteItem} from "app/action_creators/edit_action_creator";

import Affix from "antd/lib/affix";
import Spin from "antd/lib/spin";
import Switch from "antd/lib/switch";
import Select from "antd/lib/select";
import Input from "antd/lib/input";
const Option = Select.Option;

import {
	Grid,
	Row,
	Col,
	Thumbnail
} from "react-bootstrap/lib";

const select = (state) => ({
	"dataFilter": state.filter.data,
	"dataList": state.editor.dataList
});
@connect(select)


export default class EditorStorageContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			"crumbs": [
				{ "path": "/home", "text": "首页" },
				{ "path": "/editor/storage", "text": "编辑类：全部资源" }
			],
			"filterInit": {
				"resGroup": {
					"tagIsClosed": false,
					"field": "resGroup",
					"fieldText": "搜索类型：",
					"text": "组照",
					"id": 1
				}
			},
			"filterParams": {
				"resGroup": 1
			},
			"editor": {
				"role": 2, // role 1 销售 2 财务 3 运营
				"pageNum": 1,
				"pageSize": 30,
				"resGroup": 1,
				"maxButtons": 3
			},
			"params": {},
			"tooltip": {
				"show": false,
				"target": null,
				"text": "更新中...",
				"placement": "right"
			},
			"alert": {
				"show": false,
				"isButton": true,
				"bsSize": "small",
				"onHide": this.closeAlert.bind(this),
				"title": null,
				"body": null,
				"submitAlert": null,
				"msg": "",
				"param": {},
				"isLoading": false
			},
			"Lists": {},
			"selectStatus": [],
			"orderByDate": false,
			"keyword": "",
			"keywordType": 2
		};
		this.paramsInit = {
			pageNum: 1,
			pageSize: 50
		};
		this.filterParam = {
			paramType: 0,
			param: { "graphicalType": 1,"resGroup": 1 }
		};
	};

	componentDidMount() {
		this.filterForm();
	};

	componentWillUnmount() {
		const filter = document.getElementById('j_filter');
		const list = document.getElementById('j_table');
		ReactDOM.render(<div></div>, filter);
		ReactDOM.render(<div></div>, list);
		// unmountComponentAtNode(DOMElement, list);
	};

	render() {
		const {dataList} = this.props;
		const {crumbs, editor, tooltip, alert, orderByDate} = this.state;
		const editorPages = dataList ? (dataList.total>editor.pageSize?Math.floor(dataList.total / editor.pageSize):editor.pageNum) : editor.pageNum;
		const selectAfter = (
			<div>
				<Select defaultValue="关键词" style={{ width: 80, height: "37px", marginRight: "15px", marginTop: "-1px" }} onSelect={value => { this.state.keywordType = value } }>
					<Option value="2">关键词</Option>
					<Option value="1">ID</Option>
				</Select>
				<Button bsStyle="info" style={{ padding: "7px 35px" }} onClick={this.search.bind(this) }> 搜 索</Button>
			</div>
		);

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

					<div className="searchbox">
						<div style={{ marginTop: 8, width: "60%" }}>
							<Input addonAfter={selectAfter} value={this.state.keyword} style={{ height: "37px", paddingLeft: "15px" }} onChange={e => { this.setState({ keyword: e.target.value }) } }/>
						</div>
					</div>

					<div className="row"><div id="j_filter" className="col-xs-12"></div></div>

					<Affix className="row operate">
						<div className="col-xs-8">

							<button className="btn btn-sm btn-info" onClick={this.selectAll.bind(this) }>
								<i className="ace-icon fa fa-copy"></i>全选
							</button>
							<button className="btn btn-sm btn-info" onClick={this.selectToggle.bind(this) }>
								<i className="ace-icon fa fa-clipboard"></i>反选
							</button>
							<button className="btn btn-sm btn-info" onClick={this.refresh.bind(this) }>
								<i className="ace-icon fa fa-refresh"></i>刷新
							</button>
							<button className="btn btn-sm btn-info" onClick={this.orderByDate.bind(this) }>
								上传时间 <i className={ orderByDate ? "ace-icon fa fa-long-arrow-up" : "ace-icon fa fa-long-arrow-down"}></i>
							</button>
							<span className="line-c"></span>
							<button className="btn btn-sm btn-info" onClick={this.createGroup.bind(this) }>
								新建组照
							</button>
							{this.state.filterParams.resGroup==1 && <span>
								<button className="btn btn-sm btn-info" onClick={this.mergeGroup.bind(this) }>
									合并组照
								</button>
								<button className="btn btn-sm btn-info" onClick={this.addInEdit.bind(this) }>
									添加到未编审
								</button>
							</span>}
							{this.state.filterParams.resGroup==2 && <button className="btn btn-sm btn-info" onClick={() => this.favoriteModal(false) }>
								添加至收藏夹
							</button>}

							<span className="line-c"></span>
							<button className="btn btn-sm btn-info" onClick={this.refresh.bind(this, "filter", { "isEn": 1 }) }>
								涉华审核
							</button>
							<button className="btn btn-sm btn-info" onClick={this.refresh.bind(this, "filter", { "bestDay": 1 }) }>
								每日精选
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
								onSelect={this.handleOnPagination.bind(this) } />
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
		//ReactDOM.render(<LoadingBox />, container);
		dispatch(getStorageFilter(this.filterParam)).then((result) => {
			if (result.apiError) return false;
			ReactDOM.render(
				<FilterBox
					dispatch={this.props.dispatch}
					comboboxSearch={getStorageFilter}
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
				tmp.timeByOrder = moment(item.createTime).unix();
				_dataList.push(tmp);
			});
			this.state.Lists = _dataList;

			this.thumbnailRender();
		});
	};

	refresh(type, dataParams) {
		const {editor, filterParams} = this.state;
		let tempParams = {};
		//Object.assign(tempParams, editor, filterParams);
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

	search() {
		const {params} = this.props.dataList;
		const {keyword, keywordType} = this.state;
		this.paramsInit.searchType = keywordType;
		this.paramsInit.searchName = keyword;

		const param = Object.assign({}, params, this.paramsInit);
		this.queryList(param);
	};

	thumbnailRender(data) {
		const {filterParams} = this.state;
		const container = document.getElementById('j_table');
		let _list, types = filterParams.resGroup==1?"storage":"photos";

		if (data) { _list = data; }
		else {
			_list = this.state.Lists;
		}
		const config = {

			//即时状态
			// "updateStatus": editstatusUpdate.bind(this),
			// "searchParams": this.state.params,
			// "dispatch": this.props.dispatch,
			// "getStatus": this.getStatus.bind(this),
			// "renderself": this.queryList.bind(this),

			//选择
			selectStatus: this.state.selectStatus,
			setSelectStatus: this.setSelectStatus.bind(this)

			// dispatch:this.props.dispatch,
			// isEdit:isEdit
		};
		// console.info(dataList);
		ReactDOM.render(
			<ThumbnailBox
				types= {types}
				lists={_list}
				onThumbnail={this.handleOnThumbnail.bind(this) }
				{...config}
				/>, container
		);
	};

	setSelectStatus(params) {
		this.setState({ selectStatus: params });
		//console.log(params, this.getSelectId());
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

	getSelectId(operate,type) {
		const {selectStatus} = this.state;
		const list = this.state.Lists;
		let selectIdList = [],selectOneCategory=[];
		[...selectStatus].map((item, i) => {
			if (item) {
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
					if(type=="photos"){
						const onlineState = list[i].onlineState;
						if(onlineState!=1){ //  '1已上线2未上线3撤图4冻结 ',
							selectStatus[i] = false;
						}else{
							selectIdList.push(list[i].id);
						}
					}
				}else if(operate=="add"&&type=="group") {
					const providerType = list[i].providerType;
					const groupState = list[i].groupState;
					if(providerType == 1 && groupState == 1){
						// providerType 1 机构 2 个人 groupState '1 新入库、2未编审、3二审,4已编审',
						selectIdList.push(list[i].id);
					}else{
						selectStatus[i] = false;
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
			if(flag){
				_.fill(selectStatus, false);
				selectIdList = [];
			}
		}

		if(operate=="new"||operate=="add"||operate=="merge"){
			this.setSelectStatus(selectStatus);
			this.thumbnailRender();
		}

		return selectIdList;
	};

	handleOnThumbnail(param) {
		const {operate, key, id} = param;

		switch (operate) {
			case "toedit":
				let _key = [];
				_key[key] = true;
				this.addInEditPost(_key, [id]);
				break;
			case "addInFavorite":
				this.favoriteModal(id);
				break;
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
			case "push":
				window.open("/editor/push/"+id);
				break;
			default:
				console.log(operate);
		}
	};

	favoriteModal(e) {
        const {dispatch} = this.props;

        let body = <div className="text-center"><Spin /></div>;
		const userId = getStorage('userId');

		if (!e) {
			if (this.state.filterParams.resGroup === 1) {
				this.message("收藏夹只对图片有效哦~");
				return false;
			}
			if (this.getSelectId().length === 0) {
				this.message("请至少选择一张图片~");
				return false;
			}
		}
        dispatch(getFavoriteList(userId)).then(result => {
			if (result.apiError) {
				this.message(result.apiError.errorMessage);
				return false
			}

            this.state.alert.param = {
                "target": e,
                "switch": false,
                "value_1": "",
                "value_2": ""
            };
            let favoite = result.apiResponse;
            let favoiteList = [];
            [...favoite].map((item, i) => {
                favoiteList.push(
                    <Option key={item.id}>{item.name}</Option>
                )
            });

            let body = <div className="favoriteModal">
                <span className="fl" id="favoiteLabel">添加至收藏夹</span>
                <Switch className="fr" defaultChecked={false} onChange={this.favoriteSwitch.bind(this) }/>
                <div className="slideBox mt-10">
                    <div className="slideBox-inner" id="favoiteBox">
                        <div className="slideBox-context">
                            <Select style={{ "width": "100%" }} onChange={value => { this.state.alert.param.value_1 = value } }>
                                {favoiteList}
                            </Select>
                        </div>
                        <div className="slideBox-context">
                            <Input placeholder="请输入新的收藏夹名"  onChange={e => { this.state.alert.param.value_2 = e.target.value } }/>
                        </div>
                    </div>
                </div>
            </div>;

            let {alert} = this.state;
            alert.body = body;
            this.setState({ alert });
        });

        const config = {
            "bsSize": "small",
            "title": <samll style={{ "fontSize": "14px" }}>批量收藏</samll>,
            "body": body,
            "isKeyword": true,
            "submitAlert": this.favoriteSubmit.bind(this),
            "isButton": true
        };

        this.openAlert(config);

    };

    favoriteSwitch() {
        const {alert} = this.state;
        alert.param.switch = !alert.param.switch;
        this.setState({ alert });

        const box = document.getElementById("favoiteBox");
        const label = document.getElementById("favoiteLabel");
        if (alert.param.switch) {
            box.className = "slideBox-inner next";
            label.innerHTML = "新建收藏夹并加入";
        }
        else {
            box.className = "slideBox-inner";
            label.innerHTML = "添加至收藏夹";
        }
    };

    favoriteSubmit() {
        const {alert} = this.state;
		let id = alert.param.value_1;
		let name = alert.param.value_2;
        if (alert.param.switch) {
			id = "";
			if(!name) {
				this.errorAlert("请输入新的收藏夹名");
				return false;
			} else {
				this.loadingAlert();
			}
		} else {
			name = "";
			if(!id) {
				this.errorAlert("请选择收藏夹");
				return false;
			} else {
				this.loadingAlert();
			}
		}
		const userId = getStorage('userId');
		const params = {
			"favorite": {
				"id": id,
				"name": name,
				"userId": userId
			},
			"resourceIds": alert.param.target?[alert.param.target]:this.getSelectId()
		};
		const {dispatch} = this.props;
        dispatch(postFavoriteItem(params)).then(result => {
			if (result.apiError) {
				this.message(result.apiError.errorMessage);
				return false
			}
			const {selectStatus} = this.state;
			[...selectStatus].map((flag,i) => { if(flag){selectStatus[i]=!flag} });
			this.setState(selectStatus);
			this.thumbnailRender();
			this.closeAlert();
		});
    };

	handleOnSearch(params,current) {
		if(current){
			//const {filterInit} = this.state;
			//console.log('handleOnSearch', params, current,filterInit);
			//const field = current.field;
			//params.map((item,i)=>{
			//	if(field==item.field){
			//		filterInit[field] = item
			//	}
			//	if(
			//		field=="resGroup"&&(item.field=="graphicalType"||item.field=="category"||item.field=="agency") ||
			//		field=="graphicalType"&&(item.field=="category"||item.field=="agency") ||
			//		field=="category"&&item.field=="agency"
			//	){
			//		delete params[i]
			//	}
			//});
			//if(field=="resGroup"){
			//	if(filterInit.graphicalType){delete filterInit.graphicalType;}
			//}
			//if(field=="resGroup"||field=="graphicalType"){
			//	if(filterInit.category){delete filterInit.category;}
			//}
			//if(field=="resGroup"||field=="graphicalType"||field=="category"){
			//	if(filterInit.agency){delete filterInit.agency;}
			//}
			//this.setState(filterInit);
			//console.log('handleOnSearch2', params, current,filterInit);
		}
		if(current && current.field == "graphicalType") {
			this.filterParam.param.graphicalType = parseInt(current.id);
			this.filterForm();
		}
		if(current && current.field == "category") {
			this.filterParam.param.category = parseInt(current.id);
			this.filterParam.param.picType = 1;
			this.filterForm();
		}
		if(current && current.field == "resGroup") {
			this.filterParam.param.resGroup = parseInt(current.id);
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

	closeAlert() {
		const alert = Object.assign(this.state.alert, { "show": false, "isLoading": false });
		this.setState({ "alert": alert });
	};

	openAlert(config) {
		const alert = Object.assign(this.state.alert, { "show": true, "isLoading": false, "msg": "" }, config);
		this.setState({ "alert": alert });
	};

	errorAlert(msg) {
		const alert = Object.assign(this.state.alert, { "msg": msg });
		this.setState({ "alert": alert });
	};

	loadingAlert() {
		const config = {};
		config.body = <div className="text-center"><Spin /></div>;
		config.isLoading = true;
		this.openAlert(config);
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

	//根据id和key返回list
	getList({id, key}) {
		const {Lists} = this.state;
		if (Lists && Lists[key] && Lists[key].id == id) return Lists[key];
		else return false;
	};

	//合并组照
	mergeGroup() {
		const {filterParams} = this.state;
		const type = filterParams.resGroup==1?"group":"photos";
		const ids = this.getSelectId('merge',type);
		if (ids && ids.length > 1) {
			window.open("/editor/edit/"+type+"/merge/" + ids.join("&"))
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
		const {filterParams} = this.state;
		const type = filterParams.resGroup==1?"group":"photos";
		const ids = this.getSelectId('new',type);
		if (ids && ids.length > 1) {
			window.open("/editor/edit/"+type+"/new/" + ids.join("&"));
		} else {
			const config = {
				"bsSize": "small",
				"title": <samll style={{ "fontSize": "14px" }}>{"新建组照"}</samll>,
				"body": <p className="bolder center grey">
					<i className="ace-icon fa fa-hand-o-right blue bigger-120"></i>
					请选择2个以上{filterParams.resGroup==1?'【已编审】的组照':'【已上线】的图片'}~
				</p>,
				"isButton": false
			};
			this.openAlert(config);
		}
	};

	//推送
	pushGroup() {
		const ids = this.getSelectId();

		if (ids && ids.length > 0) {
			window.open("/editor/edit/ids=" + ids.join("&") + "&type=new")
		} else {
			const config = {
				"bsSize": "small",
				"title": <samll style={{ "fontSize": "14px" }}>{"新建组照"}</samll>,
				"body": <p className="bolder center grey"><i className="ace-icon fa fa-hand-o-right blue bigger-120"></i>{"请选择1个以上组照~"}</p>,
				"isButton": false
			};
			this.openAlert(config);
		}
	};

	//添加至未编审
	addInEdit() {
		const {selectStatus,filterParams} = this.state;
		const type = filterParams.resGroup==1?"group":"photos";
		const ids = this.getSelectId('add',type);
		if (ids && ids.length > 0) {
			this.addInEditPost(selectStatus, ids);
		} else {
			const config = {
				"bsSize": "small",
				"title": <samll style={{ "fontSize": "14px" }}>{"添加至未编审"}</samll>,
				"body": <p className="bolder center grey"><i className="ace-icon fa fa-hand-o-right blue bigger-120"></i>{"请选择1个以上【新入库机构】的组照~"}</p>,
				"isButton": false
			};
			this.openAlert(config);
		}
	};

	addInEditPost(items, ids) {
		const {dispatch} = this.props;
		const {Lists} = this.state;

		let param = [];
		[...items].map((item, i) => {
			if (item) param.push({
				"id": Lists[i].id,
				"groupState": 2
			});
		});
		// console.error(items,ids)
		dispatch(addInEditPostCall(param)).then(result => {
			if (result.apiError) return false;
			[...items].map((item, i) => {
				if (item) Lists[i].groupState = 2;
			});
			console.log(Lists, "Lists");
			this.state.Lists = Lists;
			this.thumbnailRender();
		});

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
			Lists[key].onlineState = 1;
			this.thumbnailRender(Lists);
			this.message("上线成功");
		});
	};

	//下线
	offline({id, key}) {
		const {dispatch} = this.props;
		const {Lists} = this.state;

		dispatch(editgroupOffline({ groupId: id })).then(result => {
			if (result.apiError) return false;
			Lists[key].onlineState = 3;
			this.thumbnailRender(Lists);
			this.message("下线成功");
		});
	};

	//时间排序
	orderByDate() {
		const {Lists, orderByDate} = this.state;
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
}
