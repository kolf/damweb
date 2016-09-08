import React, {Component} from "react"
import _                  from "lodash";
import DatePicker         from "react-datepicker"
import moment             from "moment"

import {getStorageFilter} from "app/action_creators/editor_action_creator";
import {Collapse} from "react-bootstrap/lib";
import ComboBox  from "app/components/provider/combobox";

import Select from "antd/lib/select";
const Option = Select.Option;

import 'react-datepicker/dist/react-datepicker.css'
import "./filter.css"

export default class FilterBox extends Component {
    constructor (props) {
        super(props);
        this.toolInit = {
            "status": true, // true Open false Close
            "text": ["显示筛选", "收起筛选"],
            "icon": ["fa-chevron-down", "fa-chevron-up"],
            "toolName": ["hidden",""]
        };
        this.itemExpandInit = {
            "status": true, // true Open false Close
            "text": ["更多", "收起"],
            "icon": ["fa-chevron-down", "fa-chevron-up"],
            "itemName": ["", "expand"],
            "itemNumber": 16
        };
        this.itemCheckboxInit = {
            "status": false, // true Checkbox false Radio
            "btnName": ["", "hidden"], // button more
            "btnItem": ["hidden", ""], // button item submit cancel
            "checkboxName": ["","lbl"],
            "data": [] // select true/false
        };
        this.itemLineInit = {
            "status": true, // true open false close
            "lineName": ["hidden",""]
        };
        this.state = {
            "allLineStatus": true,    // true open false close
            "tool": {},
            "itemExpand": {},
            "itemCheckbox": {},
            "itemLine": {},
            "tags": {}
        };
    };

    componentDidMount () {
        this.renderTagsSort();
    };

    renderTagsSort () {
        let tags={};
        const {dataFilter,filterInit} = this.props;
        [...dataFilter].map((item)=>{
            const {field,text} = item;
            tags[field] = {
                "checked": false,
                "itemIsDisplay": itemIsDisplay!=undefined?itemIsDisplay:true,
                "tagIsClosed": tagIsClosed!=undefined?tagIsClosed:true,
                "field": field,
                "fieldText": text,
                "text": '',
                "id": ''
            }
        });
        Object.assign(tags, filterInit);
        this.setTags(tags);
    };

    renderTags () {
        const tags = Object.values(this.state.tags);
        return (
            <span className="words">
                {tags.map((item, i) => {
                    if(!item.checked){return false}
                    return (
                        <span className="tag" key={i}>
                            <span className="txt">{item.fieldText + item.text}</span>
                            {item.tagIsClosed && <i className="fa fa-times"
                                                    data-field={item.field}
                                                    onClick={this.deleteTag.bind(this)}></i>}
                        </span>
                    );
                })}
            </span>
        );
    };

    renderText (item, row) {
        let {value, field,itemIsDisplay} = item;
        if(!value){return false}
        const {status,checkboxName,data} = this.state.itemCheckbox[field];
        const label = [...value].map((label, col) => {
            const checked = data[col].status,activeClass = checked ? ' here' : '';
            return (
                <label key={row+'_'+col}>
                    {status && <input type="checkbox" value={label.id} checked={checked} className="ace" />}
                    <span className={"hand " + checkboxName + activeClass}
                          data-field={field}
                          data-id={label.id}
                          data-col={col}
                          data-itemIsDisplay={itemIsDisplay!=undefined?itemIsDisplay:true}
                          onClick={this.onClickText.bind(this)}>{' ' + label.text}</span>
                </label>
            )
        });
        return [label];
    };

    renderSelect (item, i) {
        const text = this.renderText(item);
        const select = (
            <div className="input-daterange input-group" key={i}>
                <select className="form-control" onchange={this.onSelect.bind(this)}>
                    {
                        [...item.option].map((option, j) => {
                            return (
                                <option value={option.id} key={j}>{option.text}</option>
                            )
                        })
                    }
                </select>
            </div>
        );
        return [text, select];
    };

    renderTime (item, i) {
        const field = item.field;
        const text = this.renderText(item);
        const time = (
            <span data-field={field} onClick={this.onDatePickerField.bind(this)} key={i}>
                <DatePicker
                    selected={this.state.startDate[field]}
                    startDate={this.state.startDate[field]}
                    endDate={this.state.endDate[field]}
                    dateFormat="YYYY/MM/DD"
                    placeholderText="请选择开始时间"
                    locale="zh-cn"
                    todayButton={"今天"}
                    className={field}
                    tabIndex={1}
                    onChange={this.onDatePickerStart.bind(this)} />
                <span style={{"padding":"0 8px"}}>至</span>
                <DatePicker
                    selected={this.state.endDate[field]}
                    startDate={this.state.startDate[field]}
                    endDate={this.state.endDate[field]}
                    dateFormat="YYYY/MM/DD"
                    placeholderText="请选择结束时间"
                    locale="zh-cn"
                    todayButton={"今天"}
                    className={field}
                    tabIndex={2}
                    onChange={this.onDatePickerEnd.bind(this)} />
            </span>
        );
        return [text, time];
    };

     renderSearch(item, i) {
        return (
            <ComboBox 
                handOnSelect = {(value,option) => this.onSearch(item,value,option)}
                type = {item.field}
                dispatchAct = {getStorageFilter}
                dispatch = {this.props.dispatch}
                key={i}
                >
            </ComboBox>
        );
    };

    renderKeyword (item, i) {
        return (
            <div className="input-group">
                <input type="text" ref={'j_keyword_'+item.field} name={item.field} placeholder={item.placeholder} className="form-control input-mask-product" />
                <span className="input-group-addon hand" onClick={() => this.onKeyword(item)}>
                    <i className="ace-icon fa fa-search"></i>
                </span>
            </div>
        );
    };

    onKeyword (item){
        const keyword = this.refs['j_keyword_'+item.field].value;
        const params = {
            "checked": true,
            "field": item.field,
            "fieldText": item.text,
            "text" : keyword,
            "id": keyword
        };
        this.state.itemCheckbox[item.field].data = {};
        this.addTags(params);
    };

    onSearch(item,value,option) {
        console.log(item);
        const params = {
            "checked": true,
            "field": item.field,
            "fieldText": item.text,
            "text" : value,
            "id": option.props.id
        };
        this.state.itemCheckbox[item.field].data = {};
        this.addTags(params);
    };
    
    renderLabel (item, row) {
        const {type, field} = item;
        let label = "";
        switch (type) {
            case "select":
                label = this.renderSelect(item, row);
                break;
            case "time":
                label = this.renderTime(item, row);
                break;
            case "search":
                label = this.renderSearch(item, row);
                break;
            case "keyword":
                label = this.renderKeyword(item, row);
                break;
            default:
                label = this.renderText(item, row);
        }
        // const lineName = (i == 0 ) ? "item h72" : "item h36";
        const {status,btnItem} = this.state.itemCheckbox[field];
        return (
            <div>
                <div className="item h36">{label}</div>
                {status && <div className={"text-center " + btnItem}>
                    <button className="btn btn-minier btn-danger" data-field={field} onClick={this.onItemCheckboxSubmit.bind(this)}>提交</button>
                    <button className="btn btn-minier" data-field={field} onClick={this.onItemCheckboxCancel.bind(this)}>取消</button>
                </div>}
            </div>
        );
    };

    renderItem (item, row) {
        const {value, field, type} = item;
        if(!value){return false}
        const {itemExpand,itemCheckbox} = this.state;
        if(!itemExpand[field]){
            this.setItemExpand({"field":field,"flag":false});
        }
        if(!itemCheckbox[field]){
            this.setItemCheckbox({"field":field,"status":(type=="checkbox"),"data":[...value],"type":"init"});
        }
        const btnExpandFlag = value.length > this.itemExpandInit.itemNumber;
        const {status,btnName} = itemCheckbox[field];
        const {text,icon,itemName} = itemExpand[field];
        return (
            <div>
                <div className={"body " + itemName}>{this.renderLabel(item, row)}</div>
                <div className="foot">
                    {status && <span className={"btn btn-white btn-xs " + btnName} data-field={field} onClick={this.onItemCheckbox.bind(this)}>多选</span>}
                    {btnExpandFlag && <span className={"hand ace-icon fa smaller-20 "+ icon} data-field={field} onClick={this.onItemExpand.bind(this)}>{text}</span>}
                </div>
            </div>
        );
    };

    render () {
        const group = [...this.props.dataFilter].map((item, row) => {
            let {field,text} = item;
            // true open false close
            const {allLineStatus,itemLine} = this.state;
            if(!itemLine[field]){
                this.setItemLine({"field":field,"flag":allLineStatus});
            }
            const {lineName} = itemLine[field];
            return (
                <li className={lineName} key={row}>
                    <h3>{text}</h3>
                    {this.renderItem(item, row)}
                </li>
            );
        });
        const {tool} = this.state;
        if(!tool["expand"]){
            this.setTool({"field":"expand","flag":false});
        }
        if(!tool["toolbar"]){
            this.setTool({"field":"toolbar","flag":true});
        }
        const {status, text, icon} = tool["expand"];
        const {toolName} = tool["toolbar"];
        return (
            <div className="widget-box transparent ui-sortable-handle filter">
                <div className="widget-header widget-header-small gray">
                    <h6 className="widget-title smaller">
                        <i className="fa fa-tags" aria-hidden="true"></i>
                        {" 所有分类 "}
                        {this.renderTags()}
                    </h6>
                    <div className={"widget-toolbar " + toolName}>
                        <span className={"hand ace-icon fa " + icon} onClick={this.onExpand.bind(this)}>
                            {text}
                        </span>
                    </div>
                </div>
                <Collapse in={status}>
                    <div className="widget-body"><div className="widget-main padding-0">
                        <ul>{group}</ul>
                    </div></div>
                </Collapse>
            </div>
        )
    };

    onDatePicker ({ start, end }) {
        const {field,startDate,endDate} = this.state;
        console.log(start,end,"data");
        if(start&&start[field]){
            start = start[field];
        }else{
            start = startDate[field]||null;
        }
        if(end&&end[field]){
            end = end[field];
        }else{
            end = endDate[field]||null;
        }
        if (start&&start.isAfter(end)) {
            var temp = start;
            start = end;
            end = temp
        }
        const data = {};
        data[field] = start;
        const data2 = {};
        data2[field] = end;
        Object.assign(startDate, data);
        Object.assign(endDate, data2);
        this.setState({
            "startDate": startDate,
            "endDate": endDate
        });
        if(start&&end){
            const startStr = moment(start).startOf('day').format("YYYY-MM-DD HH:mm:ss");
            const endStr = moment(end).endOf('day').format("YYYY-MM-DD HH:mm:ss");
            const params = {
                "checked": true,
                "field": field,
                "text" :startStr + ' 至 ' + endStr,
                "id": startStr + ',' +endStr
            };
            this.addTags(params);
        }
    };

    onDatePickerStart (startDate) {
        const data = {};
        data[this.state.field] = startDate;
        this.onDatePicker({"start":data});
    };

    onDatePickerEnd (endDate) {
        const data = {};
        data[this.state.field] = endDate;
        this.onDatePicker({"end":data});
    };

    onDatePickerField (event) {
        this.state.field = event.target.className.split(' ')[0];
    };

    onExpand () {
        this.setTool({"field":"expand","type":"set"});
    };

    setTool ({field,flag,type}) {
        const {text,icon,toolName} = this.toolInit;
        const {tool} = this.state;
        if(flag==undefined){
            flag = !tool[field].status;
        }
        const index = Number(flag);
        let init;
        if(field == "expand"){
            init = {
                "status": flag,
                "text": text[index],
                "icon": icon[index]
            };
        }
        if(field == "toolbar"){
            init = {
                "status": flag,
                "toolName": toolName[index]
            };
        }
        tool[field] = init;
        if(type=="set") {
            this.setState({ "tool": tool });
        }
    };

    setItemLine ({field,flag,type}) {
        const {lineName} = this.itemLineInit;
        const {itemLine} = this.state;
        if(flag==undefined){
            flag = !itemLine[field].status;
        }
        const index = Number(flag);
        itemLine[field] = {
            "status": flag,
            "lineName": lineName[index]
        };
        if(type=="set"){
            this.setState({ "itemLine": itemLine });
        }
    };

    setItemExpand ({field,flag,type}) {
        const {text,icon,itemName} = this.itemExpandInit;
        const {itemExpand} = this.state;
        if(flag==undefined){
            flag = !itemExpand[field].status;
        }
        const index = Number(flag);
        itemExpand[field] = {
            "status": flag,
            "text": text[index],
            "icon": icon[index],
            "itemName": itemName[index]
        };
        if(type=="set"){
            this.setState({ "itemExpand": itemExpand });
        }
    };

    setItemCheckbox ({field,status,data,type}) {
        console.log(field,status,data,type);
        const {btnName,btnItem,checkboxName} = this.itemCheckboxInit;
        const {itemCheckbox} = this.state;
        let itemCheckboxData = [];
        if(type=="init") {
            data.map((item)=>{
                const params  = {...item};
                params.status = false;
                itemCheckboxData.push(params);
            })
        }
        const index = Number(status);
        itemCheckbox[field] = {
            "status": status,
            "btnName": btnName[index],
            "btnItem": btnItem[index],
            "checkboxName":checkboxName[index],
            "data": itemCheckboxData
        };
        if(type=="set"){
            this.setState({ "itemCheckbox": itemCheckbox });
        }
    };

    onItemExpand (event) {
        const target = event.target;
        const field = target.getAttribute('data-field');
        this.setItemExpand({"field":field,"type":"set"});
        this.setItemCheckbox({"field":field,"flag":false,"type":"set"});
    };

    onItemCheckbox (event) {
        const target = event.target;
        const field = target.getAttribute('data-field');
        this.setItemExpand({"field":field,"flag":true,"type":"set"});
        this.setItemCheckbox({"field":field,"type":"set"});
    };

    onItemCheckboxSubmit (event) {
        const target = event.target;
        const field = target.getAttribute('data-field');

        const {itemCheckbox} = this.state;
        const {data} = itemCheckbox[field];
        let textsArg = [],idsArg = [],fieldText = "";
        Object.values(data).map((item)=>{
            console.log(item);
            if(item.checked){
                fieldText = item.fieldText;
                textsArg.push(item.text);
                idsArg.push(item.id);
            }
        });

        if(idsArg.length>0){
            const params = {
                "checked": true,
                "field": field,
                "fieldText": fieldText,
                "text": textsArg.join('+'),
                "id": idsArg.join(',')
            };
            this.addTags(params);
            this.setItemLine({"field":field,"flag":false,"type":"set"});
        }else{
            this.setItemExpand({"field":field,"flag":false,"type":"set"});
            this.setItemCheckbox({"field":field,"type":"set"});
        }
    };

    onItemCheckboxCancel (event) {
        const target = event.target;
        const field = target.getAttribute('data-field');
        this.setItemExpand({"field":field,"flag":false,"type":"set"});
        this.setItemCheckbox({"field":field,"type":"set"});
    };

    setTags (tags) {
        const listArr = Object.values(tags);
        let count = 0,params=[];
        this.setState({ "tags": tags});
        [...listArr].map((item,i)=>{
            if(item.checked) {
                params.push(item);
                ++count;
                if(item.itemIsDisplay){
                    this.setItemLine({"field":item.field,"flag":false,"type":"set"});
                }
            }
        });
        const flag = count == listArr.length;
        this.setTool({"field":"toolbar","flag":flag,"type":"set"});
        this.props.onSearch(params);
    };

    addTags (tag) {
        const {tags} = this.state;
        console.log(tags);
        //Object.assign(tags[tag.field], {
        //    "checked": tag.checked,
        //    "text": tag.text,
        //    "id": tag.id
        //});
        //this.setTags(tags);
    };

    deleteTag (event) {
        const target = event.target;
        const field  = target.getAttribute('data-field');
        const {tags} = this.state;
        tags[field].checked = false;
        this.setTags(tags);
        this.setItemLine({"field":field,"flag":true,"type":"set"});
        this.setItemExpand({"field":field,"flag":false,"type":"set"});
        this.setItemCheckbox({"field":field,"flag":false,"type":"set"});

        const {startDate,endDate} = this.state;
        if(startDate&&endDate){
            const data = {};
            data[field] = null;
            Object.assign(startDate, data);
            Object.assign(endDate, data);
            this.setState({
                "startDate": startDate,
                "endDate": endDate
            });
        }
        this.setTool({"field":"expand","flag":true,"type":"set"});

    }

    onClickText (event) {
        const target    = event.target;
        const field     = target.getAttribute('data-field');
        const text      = _.trim(target.textContent);
        const id        = target.getAttribute('data-id');
        const col       = target.getAttribute('data-col');

        const params = {
            "field": field,
            "text": text,
            "id": id
        };
        const {itemCheckbox} = this.state;
        const {status,data} = itemCheckbox[field];
        console.log(itemCheckbox[field]);
        if(!status){ // true Checkbox false Radio
            data.map((item,i)=>{
                data[i].status = false;
            });
            data[col].status = true;
        }{
            data[col].status = !data[col].status;
        }
        //params.checked = !data[id] ? true : !data[id].checked;
        params.checked = status;
        const dataParams = {};
        dataParams[id] = params;
        itemCheckbox[field].data = dataParams;
        this.setState({ "itemCheckbox": itemCheckbox });
        if(!status){
            this.addTags(params);
        }
    };

    onSelect () {

    }

}