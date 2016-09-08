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

import {getNopassFilter, createSearch, postCreativeState} from "app/action_creators/create_action_creator";

const RadioGroup = Radio.Group;

const select = (state) => ({
	"filter": state.filter.data,
	"dataList": state.create.data
});
@connect(select)


export default class CreativeFailContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			"Lists": {},
			"crumbs": [
				{ "path": "/home", "text": "首页" },
				{ "path": "/creative/fail", "text": "创意类：不通过" }
			],
			"activePage": 1,
			"pageSize": 5,
			"maxButtons": 5,
			"params": {},
			"loadingShow": false,
			"loadingTarget": "",
			"alert": {
				"show": false,
				"isButton": true,
				"bsSize": "small",
				"onHide": this.closeAlert.bind(this),
				"title": null,
				"body": null,
				"param": null,
				"submitAlert": null
			},
			"selectStatus": [],
			"orderByDate": false
		};
		this.paramsInit = { pageNum: 1, pageSize:30, imageState: 3};
		this.filterParam = {
			paramType: 0,
			param: { "graphicalType": 1 }
		};
		this.filterInit = null;
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
		const {crumbs, maxButtons, activePage, loadingShow, loadingTarget, orderByDate} = this.state;
		const pages = this.paramsInit.pageSize ? Math.floor(dataList.total/this.paramsInit.pageSize) : activePage;
		// const pages = dataList ? (dataList.pages ? dataList.pages : activePage) : activePage;
		const toolTipLoading = <Tooltip id="j_loading"><i className="ace-icon fa fa-spinner fa-spin orange bigger-100"></i> 更新中...</Tooltip>;
		const {alert} = this.state;
		const alertBox = (<Modal {...alert}>
			<Modal.Header closeButton>
				<Modal.Title>{alert.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ "overflow": "hidden" }}>{alert.body}</Modal.Body>
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
						target={() => ReactDOM.findDOMNode(loadingTarget) }
						placement="right">
						{toolTipLoading}
					</Overlay>

					<div className="row"><div className="col-xs-12">

						<div className="widget-box transparent ui-sortable-handle">

							<div className="widget-body">
								<div id="j_filter" className="widget-main padding-6 no-padding-left no-padding-right"></div>
							</div>
						</div>

					</div></div>

					<div className="row"><div className="space-8"></div></div>

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
							<button className="btn btn-sm btn-info" onClick={this.AllPublish.bind(this)}>
								发布
							</button>
							<button className="btn btn-sm btn-info" onClick={this.AllRankSet.bind(this)}>
								等级设置
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
								onSelect={this.handleOnPagination.bind(this) } />
						</div>
					</Affix>

					<div className="row"><div className="space-8"></div></div>

					<div className="row">
						<div id="j_table" className="col-xs-12">{this.props.children}</div>
					</div>

					<div className="row operate">

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
								onSelect={this.handleOnPagination.bind(this) } />
						</div>
					</div>

				</div>
			</div>
		);
	};

	filterForm() {
		const {dispatch} = this.props;
		const container = document.getElementById('j_filter');
		// ReactDOM.render(<LoadingBox />, container);

		dispatch(getNopassFilter(this.filterParam)).then((result) => {
			if (result.apiError) return false;
			ReactDOM.render(
				<FilterBox
					filterInit={this.filterInit}
					dataFilter={this.props.filter}
					onSearch={this.handleOnSearch.bind(this) }
					searchError={this.props.error}/>, container);

			if (!this.filterInit) {
				// console.info(this.filterInit, "this.filterInit");
				this.queryList(this.paramsInit);
			}
		});
	};

	refresh() {
		const {params} = this.props.dataList;
		this.queryList(params);
	};

	queryList(params) {
		const {dispatch} = this.props;

		const container = document.getElementById('j_table');
		ReactDOM.render(<LoadingBox />, container);

		dispatch(createSearch(params)).then((result) => {
			if (result.apiError) return false;
			let len = this.props.dataList.list.length;
			this.state.selectStatus = _.fill(Array(len), false);

			const {dataList} = this.props;
			let _dataList = [];
			[...dataList.list].map((item, i) => {
				let tmp = {};
				_.mapKeys(item, (val, key) => {
					tmp[key] = val;
				});
				tmp.timeByOrder = moment(item.createTime).unix();
				_dataList.push(tmp);
			});
			this.state.Lists = _dataList;
			// console.error(_dataList);
			this.thumbnailRender();
		});
	};


	handleOnSearch(params) {
		console.log(params);
		let dataParams = {}, _filterInit = {};

		params.map((item, i) => {
			_filterInit[item.field] = item;
		});
		this.filterInit = _filterInit;

		if (this.filterInit["graphicalType"] && this.filterInit["graphicalType"]["noSearch"]) {
			this.filterInit["graphicalType"]["noSearch"] = "init";
			this.filterParam.param.graphicalType = parseInt(this.filterInit["graphicalType"].id);
			this.filterForm();
		} else {
			params.map((item) => {
				dataParams[item.field] = item.id
			});

			this.setState({ "activePage": 1 });
			Object.assign(dataParams, this.paramsInit);
			this.queryList(dataParams);
		}
	};

	thumbnailRender(data) {
		const container = document.getElementById('j_table');
		let _list;

		if (data) { _list = data; }
		else {
			_list = this.state.Lists;

		}

		const config = {

			//选择
			"selectStatus": this.state.selectStatus,
			"setSelectStatus": this.setSelectStatus.bind(this)
		};
		// console.info(dataList);
		ReactDOM.render(
			<ThumbnailBox
				types="creative"
				lists={_list}
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
		})

		return selectIdList;
	};

	handleOnPagination(eventKey) {
		this.setState({ activePage: eventKey });
		const {params} = this.props.dataList;
		const paramsData = Object.assign({}, params, { "pageNum": eventKey });
		this.queryList(paramsData);
	};

	closeAlert() {
		const alert = Object.assign(this.state.alert, { "show": false });
		this.setState({ "alert": alert });
	};

	openAlert(config) {
		const alert = Object.assign(this.state.alert, { "show": true }, config);
		this.setState({ "alert": alert });
	};

	message(msg) {
		const config = {
			"bsSize": "small",
			"title": <samll style={{ "fontSize": "14px" }}>{"提示信息"}</samll>,
			"body": <p className="bolder center grey"><i className="ace-icon fa fa-hand-o-right blue bigger-120"></i>{msg}</p>,
			"isButton": false
		};
		this.openAlert(config);
	}

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
		} else if (qualityRank === 5 ) {
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
        }
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

	AllPublish() {
        const {selectStatus, Lists} = this.state;

		if (_.indexOf(selectStatus, true) < 0) {
			this.message('至少选择一张图片~');
			return false;
		}

		[...selectStatus].map((item, i) => {
			if (item && Lists[i].onlineState === 2) this.publish({ id: item.id, key: i });
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
