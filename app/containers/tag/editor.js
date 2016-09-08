import React, {Component} from "react";
import ReactDOM           from "react-dom";
import {connect}          from "react-redux";
import moment             from "moment";
import _                  from "lodash";

import CrumbsBox          from "app/components/common/crumbs"
import FilterBox          from "app/components/common/filter";
import TagForm            from "app/components/tag/form";

import {
    Modal,
    Button,
    Table,
    Tooltip
} from 'antd';


import {
    tagQuery,  // query
    tagSave,   // create edit
    tagView,   // view
    tagExpand, // expand pid
    tagDelete  // delete
} from "app/action_creators/tag_action_creator";

const select = (state) => ({
    "tagDoing":      state.tag.doing,
    "tagError":      state.tag.error,
    "tagQueryData":  state.tag.queryData,
    "tagSaveData":   state.tag.saveData,
    "tagViewData":   state.tag.viewData,
    "tagExpandData": state.tag.expandData,
    "tagDeleteData": state.tag.deleteData
});
@connect(select)
export default class TagEditorContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "crumbs": [
                { "path": "/home", "text": "首页" },
                { "path": "/editor/tag", "text": "编辑类：关键词管理" }
            ],
            "dataFilter":[
                {
                    "field": "kind",
                    "text": "类型：",
                    "value": [
                        {
                            "text": "主题",
                            "id": 0
                        },
                        {
                            "text": "概念",
                            "id": 1
                        },
                        {
                            "text": "规格",
                            "id": 2
                        },
                        {
                            "text": "人物",
                            "id": 3
                        },
                        {
                            "text": "地点",
                            "id": 4
                        }
                    ]

                }
                //{
                //    "field": "name",
                //    "text": "关键词：",
                //    "type": "keyword",
                //    "placeholder": "请输入关键词ID、中文名、英文名",
                //    "value": []
                //}
            ],
            "filterParams": {},
            "tag": {
                //"role": 1,  // role 1 销售 2 财务 3 运营
                "page": 1,
                "perpage": 10
                //"total": ""
            },
            "columns": [
                {
                    "title": "ID",
                    "dataIndex": "id",
                    "key": "id",
                    "width": 80
                },
                {
                    "title": "中文名",
                    "dataIndex": "cnname",
                    "key": "cnname",
                    "width": 200,
                    "sorter": (a, b) => (a.cnname.length - b.cnname.length)
                },
                {
                    "title": "中文同义词",
                    "dataIndex": "cnsyno",
                    "key": "cnsyno",
                    "width": 200,
                    "render": (text, record) => (text.join(';'))
                },
                {
                    "title": "英文名",
                    "dataIndex": "enname",
                    "key": "enname",
                    "width": 200,
                    "sorter": (a, b) => (a.enname.length - b.enname.length)
                },
                {
                    "title": "英文同义词",
                    "dataIndex": "ensyno",
                    "key": "ensyno",
                    "width": 200,
                    "render": (text, record) => (text.join(';'))
                },
                {
                    "title": "类型 ",
                    "dataIndex": "kind",
                    "key": "kind",
                    "width": 80,
                    "render": (id, record) => {
                        const kind = record.kind;
                        let text = "";
                        if(kind==0){text="主题";}
                        if(kind==1){text="概念";}
                        if(kind==2){text="规格";}
                        if(kind==3){text="人物";}
                        if(kind==4){text="地点";}
                        return text;
                    }
                },
                {
                    "title": "备注",
                    "dataIndex": "memo",
                    "key": "memo",
                    "width": 100
                },
                {
                    "title": "添加时间",
                    "dataIndex": "addtime",
                    "key": "addtime",
                    "width": 100,
                    "sorter": (a, b) => (a.addtime.length - b.addtime.length)
                },
                {
                    "title": "创建人",
                    "dataIndex": "creater",
                    "key": "creater",
                    "width": 80
                },
                {
                    "title": "操作",
                    "key": "operation",
                    "width": 80,
                    "fixed": "right",
                    "render": (text, record) => (
                        <span>
                            <Tooltip title="查看">
                                <i className="ace-icon fa hand blue bigger-110 fa-eye" onClick={this.viewTag.bind(this,record)}></i>
                            </Tooltip>
                            <Tooltip title="编辑">
                                <i className="ace-icon fa hand blue bigger-110 fa-edit" onClick={this.editTag.bind(this,record)}></i>
                            </Tooltip>
                        </span>
                    )
                }
            ],
            "dataSource": [],
            "loading": false,
            "modal":{
                "title": "",
                "visible": false,
                "confirmLoading": false,
                "onOk": this.onOk.bind(this),
                "onCancel": this.onCancel.bind(this),
                "okText": "确定",
                "cancelText": "取消",
                "body": ""
            }
        };
    };

    componentDidMount() {

    };

    componentWillUnmount() {

    };

    render() {
        const target = this;
        const {crumbs,modal,dataFilter,tag,columns,dataSource,loading} = this.state;
        const pagination = {
            "page": tag.page,
            "total": tag.total,
            "showSizeChanger": true,
            "showQuickJumper": true,
            onShowSizeChange(page, perpage) {
                target.refresh("pagination",{"page":page,"perpage":perpage});
            },
            onChange(page) {
                target.refresh("pagination",{"page":page});
            }
        };
        return (
            <div className="main-content-inner">

                <CrumbsBox crumbs={crumbs} />

                <Modal {...modal}>{modal.body}</Modal>

                <div className="page-content">

                    <div className="row"><div className="col-xs-12">
                        <FilterBox dataFilter={dataFilter} onSearch={this.handleOnSearch.bind(this)} />
                    </div></div>

                    <div className="row operate">
                        <div className="col-xs-6">
                            <button className="btn btn-sm btn-info" onClick={this.refresh.bind(this)}>
                                <i className="ace-icon fa fa-refresh"></i>刷新
                            </button>
                        </div>
                        <div className="col-xs-6 text-right">
                            <button className="btn btn-sm btn-info" onClick={this.addTag.bind(this,{})}>
                                <i className="ace-icon fa fa-file-o bigger-80"></i>添加关键词
                            </button>
                        </div>
                    </div>

                    <div className="row"><div className="space-8"></div></div>

                    <Table columns={columns} dataSource={dataSource} loading={loading} pagination={pagination}  size="small" expandedRowRender={this.expandedRowRender.bind(this)} scroll={{ x: 1500 }} />

                </div>
            </div>
        );
    }

    queryTag (params) {
        params.type = "tagEditor";
        const {dispatch} = this.props;
        this.setState({ loading: true });
        dispatch(tagQuery(params)).then((result) => {
            if (result.apiError) {
                Modal.error({
                    title: '系统提示：',
                    content: (
                        <p>{JSON.stringify(result.apiError)}</p>
                    )
                });
                return false;
            }
            const {tag} = this.state;
            const dataSource = result.apiResponse.data;
                  tag.total = result.apiResponse.total;
            this.setState({loading: false,"dataSource":dataSource,"tag":tag})
        });
    };

    refresh (type,dataParams) {
        const {tag,filterParams} = this.state;
        let tempParams = {};
        if(type == "pagination") { // pagination
            tag.page = dataParams.page;
            Object.assign(tempParams,tag,filterParams,dataParams);
        }
        if(type == "filter") { // filter
            tag.page = 1;
            Object.assign(tempParams,tag,dataParams,{"page":1});
        }
        this.setState({"filterParams":tempParams,"tag":tag});
        if(!dataParams){ // refresh
            Object.assign(tempParams,tag,filterParams);
        }
        //console.log(tempParams);
        this.queryTag(tempParams);
    };

    handleOnSearch (params) {
        let dataParams = {};
        params.map((item)=>{
            if(item.field == "createDate"){
                const ids = item.id.split(',');
                if(ids[0]<6){
                    dataParams.searchTimeType = ids[0];
                }else{
                    dataParams.applyDate = ids[0] + ' 00:00:00';
                    dataParams.tagDate = ids[1] + ' 23:59:59';
                }
            }else{
                dataParams[item.field] = item.id;
            }
        });
        //console.log(dataParams);
        this.refresh("filter",dataParams);
    };

    closeModal () {
        const modal = Object.assign(this.state.modal, {"visible":false});
        this.setState({"modal": modal});
    };

    openModal(config) {
        const modal = Object.assign(this.state.modal, {"visible":true}, config);
        this.setState({"modal": modal});
    };

    onOk () {
        this.closeModal();
    };

    onCancel () {
        this.closeModal();
    };

    onAddTag (params) {
        params.type = "tagEditor";
        const {dispatch} = this.props;
        dispatch(tagSave({"data":params})).then((result) => {
            if (result.apiError) {
                Modal.error({
                    title: '系统提示：',
                    content: (
                        <p>{JSON.stringify(result.apiError)}</p>
                    )
                });
                return false;
            }
            this.closeModal();
            this.refresh();
        });
    };

    addTag (record) {
        record.kind= "0";
        record.cnsyno= [];
        record.ensyno= [];
        this.openModal({
            "title": "添加关键词",
            "width": 800,
            "body": <TagForm onSubmit={this.onAddTag.bind(this)} initialValues={record} operateType="create" />,
            "footer": null
        });
    };

    viewTag (record) {
        this.openModal({
            "title": "查看关键词",
            "width": 800,
            "body": <TagForm onSubmit={this.onAddTag.bind(this)} initialValues={record} operateType="view" />,
            "footer": null
        });
    };

    editTag (record) {
        this.openModal({
            "title": "编辑关键词",
            "width": 800,
            "body": <TagForm onSubmit={this.onAddTag.bind(this)} initialValues={record} operateType="edit" />,
            "footer": null
        });
    };

    expandedRowRender (record) {
        const {dataSource} = this.state;
        console.log(dataSource);
        console.log(record);
    };

}
/*
<Modal title={Modal.title}
visible={Modal.visible}
confirmLoading={Modal.confirmLoading}
onOk={Modal.onOk}
okText={Modal.okText}
onCancel={Modal.onCancel}
cancelText={Modal.cancelText}
>
{Modal.body}
</Modal>
 */