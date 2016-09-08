import React, {Component} from "react"
import {Link}             from "react-router";
import {Tooltip, OverlayTrigger, Well} from "react-bootstrap/lib";
import createHashHistory  from 'history/lib/createHashHistory';

import LoadingBox         from "app/components/common/loading";

import "./table.css"

export default class TableBox extends Component {

    constructor (props) {
        super(props);
        this.state = {
            "id": "",
            "checkbox": {
                "status": false,
                "text": "全选",
                "ids": [],
                "checked": []
            },
            "expand": {
                "init": {
                    "open": false,
                    "icon": "arrow fa fa-plus blue bigger-110 hand",
                    "tr": "hidden"
                },
                "data": {}
            },
            "viewTimer": null
        };
        // console.log(this.props);
    };

    componentDidMount () {

    };

    setSelectStatus () {
        const {selectStatus,list} = this.props;
        const {checkbox} = this.state;
        if(selectStatus) {
            checkbox.checked = [...selectStatus];
        } else {
            [...list].map((item,i)=>{
                checkbox.checked[i] = false;
            });
        }
    };

    renderHead () {
        const {idField, head} = this.props;
        const len = head.length;
        let tdWidth = Math.floor((1/len) * 100) + 1.2 + '%';
        return (
            <thead><tr id={idField+'_head'}>
                {[...head].map((item,i) => {
                    const {field, text, type, status} = item;
                    let th;
                    switch (type) {
                        case "checkbox":
                            // {this.state.checkbox.text}
                            th = (
                                <span>
                                    {status && <label className="hand" onClick={this.handleOnCheckboxAll.bind(this)}>
                                        <input type="checkbox" checked={this.state.checkbox.status} className="ace" />
                                        <span className="lbl"> </span>
                                    </label>}
                                    {text}
                                </span>
                            );
                            break;
                        default :
                            th = text;
                    }
                    if(i==len-1){
                        tdWidth = "";
                    }
                    return (
                        <th key={i} width={tdWidth}>{th}</th>
                    )
                })}
            </tr></thead>
        )
    };

    renderBody () {
        const {isExpand, isTitle, idField, head, list} = this.props;
        const colSpan = head.length;
        this.setSelectStatus();
        const body = [...list].map((tr, row) => {
            const element = this.renderBodyTr(tr,row);
            const id = tr[idField];
            if(isExpand){
                const {expand} = this.state;
                const trName = expand.data[id] ? expand.data[id].tr : expand.init.tr;
                const expandElement = (
                    <tr className={trName} key={row}><td colSpan={colSpan}>
                        <div id={idField + '_' + id +"_expand"} className="position-relative"></div>
                    </td></tr>
                );
                return [element, expandElement];
            }else if(isTitle){
                //const title = (<tr key={id+'_0'}><th colSpan={colSpan}>{tr[isTitle]}</th></tr>);
                //return (
                //<tr key={id+'_1'}><td colSpan={colSpan} style={{"padding":"0px"}}><div className={trStyle}><table className="table-editor"><tbody>
                //    {title}
                //    {element}
                //</tbody></table></div></td></tr>
                //);
                return [
                    <tr
                        key={id+row}
                        className={this.state.checkbox.checked[row] && "border-active"}
                        onMouseDown={this.handleOnClick.bind(this,{"operate":"checkbox",idField,row:row})}
                        onDoubleClick={this.handleOnDouble.bind(this,id)}
                        >
                        <th colSpan={colSpan}><p>{tr[isTitle]}</p></th>
                    </tr>, element];
            }else{
                return [element];
            }
        });
        return (
            <tbody className="table-editor">
                {body}
            </tbody>
        )
    };

    renderBodyTr ({...tr},row) {
        const {idField, head} = this.props;
        const id  = tr[idField];
        const len = head.length;
        let tdWidth = Math.floor((1/len) * 100) + 1.2 + '%';
        return (
            <tr
                key={row}
                className={this.state.checkbox.checked[row] && "border-active"}
                onMouseDown={this.handleOnClick.bind(this,{"operate":"checkbox",idField,row:row})}
                onDoubleClick={this.handleOnDouble.bind(this,id)}
                >
                {[...head].map((item, i) => {
                    const {field, type, status, isFun} = item;
                    //console.log(type,status,isFun);
                    let td_tag;
                    const text = tr[field];
                    switch (type) {
                        case "checkbox":
                            td_tag = (
                                <label>
                                    {status && <input type="checkbox" value={id} defaultChecked={this.state.checkbox.checked[row]} className="ace" />}
                                    <span className={this.state.checkbox.checked[row]?"checkbox_focus checkbox_active":"checkbox_focus"}> {text}</span>
                                </label>
                            );
                            break;
                        case "image":
                            // const image = require('app/assets/images/gallery/thumb-5.jpg');
                            td_tag = (
                                <div className="ace-thumbnails">
                                    <img width="150" height="150" alt="找不到图片" src={text} />
                                </div>
                            );
                            break;
                        case "expand":
                            const {expand} = this.state;
                            const icon = expand.data[id] ? expand.data[id].icon : expand.init.icon;
                            td_tag = (
                                <span>
                                    <i className={icon} onClick={this.handleOnExpand.bind(this,id)}
                                        ></i> {text}
                                </span>
                            );
                            break;
                        case "field":
                            td_tag = (
                                <span onClick={this.handleOnClick.bind(this,{"operate":field,"item":tr,idField})} className="text-primary hand" title={text}>{text}</span>
                            );
                            break;
                        case "link":
                            const href = item.href ? item.href + id: '/'+ idField + '/' + id;
                            td_tag = (<a href={href} title={text}>{text}</a>);
                            break;
                        case "status":
                            if (isFun) {
                                td_tag = this.props[isFun](tr);
                            }else {
                                td_tag = item.value[text];
                            }
                            break;
                        case "select":
                            td_tag = this.renderSelect({"operate":field,"item":tr,"idField":idField,"value":[...item.value]});
                            break;
                        case "operate":
                            td_tag = this.renderOperate({"item":tr,"idField":idField,"value":[...item.value]});
                            break;
                        default:
                            td_tag = text;
                    }
                    if(i==len-1){
                        tdWidth = "";
                    }
                    return (<td key={i} width={tdWidth}>{td_tag}</td>);
                })}
            </tr>
        )
    };

    renderSelect ({operate,item,idField,value}) {
        const html = value.map((item, i) => {
            return (
                <option value={item.id} key={i}>{item.text}</option>
            )
        });
        return (
            <select id={'j_select_' + operate + '_' + item[idField]} defaultValue={item[operate]}
                onChange={this.handleOnClick.bind(this,{operate,item,idField})}>
                {html}
            </select>
        )
    };

    renderOperateIcon ({item,idField,val},i) {
        const {operate,text,icon} = val;
        const tooltip = (<Tooltip id={'j_'+operate+'_'+item[idField]}>{text}</Tooltip>);
        return (
            <OverlayTrigger placement="top" trigger={['click', 'hover', 'focus']} overlay={tooltip} key={i}>
                <i
                    onMouseDown={this.handleOnClick.bind(this,{operate,item,idField})}
                    className={"ace-icon fa hand blue bigger-110 "+ icon}></i>
            </OverlayTrigger>
        );
    };

    renderOperateText ({item,idField,val},i) {
        const id = item[idField];
        const {operate,text,href} = val;
        let text_tag;
        if(operate =="link"){
            const url = href ? href + id: '/'+ idField + '/' + id;
            text_tag = (<a href={url} title={text} className="hand" key={i}>{text}</a>);
        } else {
            text_tag = (
                <span id={'j_'+operate+'_'+id}
                      onClick={this.handleOnClick.bind(this,{operate,item,idField})}
                      className="text-primary hand" key={i}>{text}</span>
            );
        }
        return text_tag;
    };

    renderOperate ({item,idField,value}) {
        const item_tag = [];
        value.map(({...val},i) => {
            let text_tag = [];
            const opt = {item,idField,val};
            if(val.icon){
                text_tag = this.renderOperateIcon(opt,i);
            }else{
                text_tag = this.renderOperateText(opt,i);
            }
            item_tag.push(text_tag);
        });
        return (
            <span id={'j_operate_'+item[idField]}>{item_tag}</span>
        )
    };

    render () {
        const {idField, list} = this.props;
        return (
            <div id={idField?idField:"list"+'_div'} className="table-responsive">
                {!list && <LoadingBox />}
                {list && list.length === 0 && <Well style={{"marginBottom":"12px"}}>暂无相关数据!</Well> }
                {list && list.length > 0 &&
                    <table className="table table-striped table-bordered table-hover table-condensed">
                        {this.renderHead()}
                        {this.renderBody()}
                    </table>
                }
            </div>
        );
    };

    handleOnClick (params,self) {
        self.preventDefault();
        self.stopPropagation();
        // {operate,item,idField}
        //console.log("handleOnClick::",params);
        //console.log("self::",self.Target);
        //console.log("self::",this);
        this.props.onTable(params);
    };

    handleOnExpand (event,{id,operate}) {
        event.preventDefault();
        const {expand} = this.state;
        const open = !(expand.data[id] ? expand.data[id].open : expand.init.icon.open);
        const {idField,list} = this.props;
        list.forEach((item)=>{
            const idn = item[idField];
            this.state.expand.data[idn] = expand.init;
        });
        this.setState({
            "expand": {
                "init": expand.init,
                "data": expand.data
            }
        });
        this.state.expand.data[id] = {
            "open": open,
            "icon": open ? "arrow fa fa-minus blue bigger-110 hand" : "arrow fa fa-plus blue bigger-110 hand",
            "tr": open ? "fade in" : "hidden"
        };
        this.setState({
            "expand": {
                "init": expand.init,
                "data": expand.data
            }
        });
        this.handleOnClick(event);
    };

    handleOnDouble (params,self) {
        console.log("handleOnDouble::",params,self.target);
        window.open("/editor/view/" + params);
    };

}