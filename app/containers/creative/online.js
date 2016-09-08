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

import {Pagination, Modal, Button, Tooltip, Overlay} from "react-bootstrap/lib";

import Affix from "antd/lib/affix";
import Radio from "antd/lib/radio";
import Input from "antd/lib/input";

import {
	Grid,
	Row,
	Col,
	Thumbnail
} from "react-bootstrap/lib";

import {getPublishFilter, createSearch, postCreativeState} from "app/action_creators/create_action_creator";

const RadioGroup = Radio.Group;

const select = (state) => ({
	"filter": state.filter.data,
	"dataList": state.create.data
});
@connect(select)


export default class CreativeOnlineContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			"crumbs": [
				{ "path": "/home", "text": "首页" },
				{ "path": "/creative/online", "text": "创意类：已上线" }
			],
			"filterInit": {},
			"filterParams": {
				"resGroup": 2
			},
			"editor": {
				"role": 2, // role 1 销售 2 财务 3 运营
				"pageNum": 1,
				"pageSize": 30,
				"onlineState": 1, // 1已上线2未上线3撤图4冻结 ',
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
			"Lists": {},
			"selectStatus": [],
			"orderByDate": false
		};

		this.filterParam = {
			paramType: 0,
			param: { "graphicalType": 1, "resGroup": 2, "onlineState": 1 }
		};

	};

	componentDidMount() {
		this.filterForm();
	};

	componentWillUnmount() {
		const filter = document.getElementById('j_filter');
		const list = document.getElementById('j_table');
		// unmountComponentAtNode(DOMElement, list);
		ReactDOM.render(<div></div>, filter);
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
							<button className="btn btn-sm btn-info" onClick={this.orderByDate.bind(this) }>
								上传时间 <i className={ orderByDate ? "ace-icon fa fa-long-arrow-up" : "ace-icon fa fa-long-arrow-down"}></i>
							</button>
							<span className="line-c"></span>
							<button className="btn btn-sm btn-info" onClick={this.AllOffline.bind(this)}>
								标记撤图
							</button>
							<button className="btn btn-sm btn-info" onClick={this.AllCancel.bind(this)}>
								取消撤图
							</button>
							<button className="btn btn-sm btn-info" onClick={this.AllRankSet.bind(this)}>
								等级设置
							</button>
                            <button className="btn btn-sm btn-info" onClick={this.AllLicenseSet.bind(this)}>
								授权
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
		dispatch(getPublishFilter(this.filterParam)).then((result) => {
			if (result.apiError) {
				this.message(result.apiError.errorMessage);
				return false
			}
			ReactDOM.render(
				<FilterBox
					filterInit={this.state.filterInit}
					dataFilter={this.props.filter}
					onSearch={this.handleOnSearch.bind(this) }
					searchError={this.props.error} />, container);
		});
	};

	queryList(params) {
		const {dispatch} = this.props;
		dispatch(createSearch(params)).then((result) => {
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
				types="creative"
				lists={Lists}
				onThumbnail={this.handleOnThumbnail.bind(this) }
				{...config}
				/>, container
		);
	};

	setSelectStatus(params) {
		this.setState({ selectStatus: params });
		console.log(params, this.getSelectId());
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

	getSelectId() {
		const {selectStatus} = this.state;
		const list = this.state.Lists;
		let selectIdList = [];
		[...selectStatus].map((item, i) => {
			if (item) selectIdList.push(list[i].id);
		});
		return selectIdList;
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

	//时间排序
	orderByDate() {
		const {Lists, orderByDate} = this.state;
		let newLists = _.sortByOrder(Lists, ["timeByOrder"], [orderByDate ? "asc" : "desc"]);
		this.setState({ orderByDate: !orderByDate });
		this.state.Lists = newLists;
		this.thumbnailRender();
	};

	
	handleOnThumbnail(param) {
		// Object.assign(this.state.params, key);
		const {operate, key, id} = param;
		console.log(param);
		switch (operate) {
			case "licenseType":
				this.radioChange(param);
				break;
			case "qualityRank":
				this.radioChange(param);
				break;
			case "publish":
				this.publish(param);
				break;
			case "offline":
				this.offline(param);
				break;
			case "confirm":
				this.confirm(param);
				break;
			case "cancel":
				this.cancel(param);
				break;
			default:
			// console.log(operate);
			// console.log(key);
		}
	};

	radioChange(params) {
        const {id, key, value, operate} = params;
        let {Lists} = this.state;
        if (Lists[key].id === id) Lists[key][operate] = value;
        this.state.Lists = Lists;
        this.thumbnailRender();
    };

	publish(params) {
		const {dispatch} = this.props;
        const {id, key, operate} = params;
        const {Lists} = this.state;
		console.log(Lists[key]);
		const {licenseType, qualityRank, rejectReason} = Lists[key];
		let title, body, submitAlert;
		console.log(licenseType);
		if (licenseType !== 1 && licenseType !== 2) {
			this.message("请授权后发布~");
		} else if (qualityRank === 5) {
			console.log('rejectReason')
			this.AllNoPass(params);
		}
		else {
			this.setLists(key, 'publishLoading', true);
			const param = {
				id: Lists[key].id,
				imageState: 2,
				onlineState: 1,
				licenseType: licenseType,
				qualityRank: qualityRank,
			};
			dispatch(postCreativeState(param)).then(result => {
				if (result.apiError) return false;
				Lists[key].imageState = 2;
				Lists[key].onlineState = 1;

				this.setLists(key, 'publishLoading', false);
			});
		}
	};

	offline(params) {
		const {dispatch} = this.props;
        const {id, key, operate} = params;
        const {Lists} = this.state;

		this.setLists(key, 'undoLoading', true);
		const param = {
			id: Lists[key].id,
			onlineState: 5,
		};
		dispatch(postCreativeState(param)).then(result => {
			if (result.apiError) return false;
			Lists[key].onlineState = 5;

			this.setLists(key, 'undoLoading', false);
		});
	};

	confirm(params) {
		const {dispatch} = this.props;
        const {id, key, operate} = params;
        const {Lists} = this.state;

		this.setLists(key, 'confirmLoading', true);
		const param = {
			id: Lists[key].id,
			onlineState: 2,
		};
		dispatch(postCreativeState(param)).then(result => {
			if (result.apiError) return false;
			Lists[key].onlineState = 2;

			this.setLists(key, 'confirmLoading', false);
		});
	};

	cancel(params) {
		const {dispatch} = this.props;
        const {id, key, operate} = params;
        const {Lists} = this.state;

		const param = {
			id: Lists[key].id,
			onlineState: 1,
		};
		dispatch(postCreativeState(param)).then(result => {
			if (result.apiError) return false;
			Lists[key].onlineState = 1;
			this.thumbnailRender();
		});
	};

	setLists(key, type, tag) {
        const {Lists} = this.state;
		Lists[key][type] = tag;
		this.state.Lists = Lists;
		// console.log(Lists[key]);
		this.thumbnailRender();
	};

	AllNoPass({id, key, operate}) {
        const {alert} = this.state;
        this.state.alert.param = {
            value: 1,
            rejectReason: "",
            error: false
        };
        // if ( _.indexOf(selectStatus, true) < 0) {
		// 	this.message('你还没有选择任何图片~')
        //     return false;
        // } 

        const config = {
			"bsSize": "small",
			"title": <samll style={{ "fontSize": "14px" }}>{"设置不通过原因"}</samll>,
            "body": this.allNoPassBody(),
			"isKeyword": true,
			"submitAlert": this.setNoPassSubmit.bind({_this:this, key}),
			"isButton": true
		};
		this.openAlert(config);
    };

    allNoPassBody() {
        const {param} = this.state.alert
        return (
            <RadioGroup
                value={param.value}
                onChange={this.allNoPassChange.bind(this) }
                operate="radio"
                >
                <Radio key="a" value={1} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>拍摄问题</Radio>
                <Radio key="b" value={2} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>后期问题</Radio>
                <Radio key="c" value={3} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>模特道具问题</Radio>
                <Radio key="d" value={4} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>创意问题</Radio>
                <Radio key="e" value={5} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>法律问题</Radio>
                <Radio key="h" value={6} style={{ "width": " 50%", "float": "left" }} className={"textleft margin-0 mt-5"}>
					其他原因
					{param.value === 6 ?
						<Input
							className= {param.error ? "error" : ""}
							style={{ width: 100, marginLeft: 10 }}
							onChange={e => { this.state.alert.param.rejectReason = e.target.value } }
							onFocus={e => {
								this.state.alert.param.error = false;
								console.log(this.state.alert.param);
								if (param.value === 6)
									this.allNoPassBody();
							} }
							/> : null}
                </Radio>
            </RadioGroup>
        );
    }

    allNoPassChange(e) {
        let {alert} = this.state;
        // unmountComponentAtNode(DOMElement, list);
        alert.show = true;
        alert.param.value = e.target.value;
        alert.body = this.allNoPassBody();
        this.setState({ alert });
    };

	setNoPassSubmit() {
        const {_this, key} = this;
		const {dispatch} = _this.props;
        const {Lists, alert} = _this.state;

		console.log(alert.param);
		const param = {
			id: Lists[key].id,
			onlineState: 2,
			imageState: 3,
			rejectReason: alert.param.value,
		};
		dispatch(postCreativeState(param)).then(result => {
			if (result.apiError) return false;
			Lists[key].rejectReason = alert.param.value;
			Lists[key].imageState = 3;
			Lists[key].onlineState = 2;
			_this.thumbnailRender();
		});
		console.log(Lists[key],key);
		_this.closeAlert();
	};

	AllOffline() {
        const {selectStatus, Lists} = this.state;

		if (_.indexOf(selectStatus, true) < 0) {
			this.message('至少选择一张图片~');
			return false;
		}

		[...selectStatus].map((item, i) => {
			if (item && Lists[i].onlineState === 1) this.offline({ id: item.id, key: i });
		});
	};

	AllCancel() {
		const {selectStatus, Lists} = this.state;

		if (_.indexOf(selectStatus, true) < 0) {
			this.message('至少选择一张图片~');
			return false;
		}

		[...selectStatus].map((item, i) => {
			if (item && Lists[i].onlineState === 5) this.cancel({ id: item.id, key: i });
		});
	};

	AllRankSet() {
		const {selectStatus} = this.state;
		this.state.alert.param = 1;

		if (_.indexOf(selectStatus, true) < 0) {
			this.message('至少选择一张图片~');
			return false;
		}

		const config = {
			"bsSize": "small",
			"title": <samll style={{ "fontSize": "14px" }}>等级设置</samll>,
            "body": <RadioGroup
						value={this.state.alert.param}
						onChange={this.RankSetChange.bind(this)}
						operate="radio"
						>
						<Radio key="a" value={1}>A</Radio>
						<Radio key="b" value={2}>B</Radio>
						<Radio key="c" value={3}>C</Radio>
						<Radio key="d" value={4}>D</Radio>
						<Radio key="e" value={5}>E</Radio>
					</RadioGroup>,
			"isKeyword": true,
			"submitAlert": this.RankSetSubmit.bind(this),
			"isButton": true
		};
		this.openAlert(config);

	};

	RankSetChange(e) {
        let {alert} = this.state;
		// console.log(e.target.value);
        alert.show = true;
        alert.param = e.target.value
        alert.body = <RadioGroup 
                        value={e.target.value} 
                        onChange={this.RankSetChange.bind(this)} 
                        operate="radio"
                        >
                        <Radio key="a" value={1}>A</Radio>
                        <Radio key="b" value={2}>B</Radio>
                        <Radio key="c" value={3}>C</Radio>
                        <Radio key="d" value={4}>D</Radio>
                        <Radio key="e" value={5}>E</Radio>
                    </RadioGroup>
        this.setState({alert});
    };

	RankSetSubmit() {
		const {selectStatus, Lists} = this.state;
        const param = this.state.alert.param;
        if(_.isNumber(param)){
            [...selectStatus].map((item, i)=>{
                if(item) Lists[i].qualityRank = param
            });
            this.thumbnailRender();
            this.closeAlert();
        }
	};

	AllLicenseSet() {
		const {selectStatus} = this.state;

		if (_.indexOf(selectStatus, true) < 0) {
			this.message('至少选择一张图片~');
			return false;
		}

		const config = {
			"bsSize": "small",
			"title": <samll style={{ "fontSize": "14px" }}>批量授权</samll>,
            "body": <RadioGroup
						value={this.state.alert.param}
						onChange={this.LicenseSetChange.bind(this)}
						operate="radio"
						>
						<Radio key="a" value={1}>RF</Radio>
						<Radio key="b" value={2}>RM</Radio>
					</RadioGroup>,
			"isKeyword": true,
			"submitAlert": this.LicenseSetSubmit.bind(this),
			"isButton": true
		};
		this.openAlert(config);
	};

	LicenseSetChange(e) {
        let {alert} = this.state;
		// console.log(e.target.value);
        alert.show = true;
        alert.param = e.target.value
        alert.body = <RadioGroup
						value={this.state.alert.param}
						onChange={this.LicenseSetChange.bind(this)}
						operate="radio"
						>
						<Radio key="a" value={1}>RF</Radio>
						<Radio key="b" value={2}>RM</Radio>
					</RadioGroup>
        this.setState({alert});
    };

	LicenseSetSubmit() {
		const {selectStatus, Lists} = this.state;
        const param = this.state.alert.param;
        if(_.isNumber(param)){
            [...selectStatus].map((item, i)=>{
                if(item) Lists[i].licenseType = param
            });
            this.thumbnailRender();
            this.closeAlert();
        }
	};

}
