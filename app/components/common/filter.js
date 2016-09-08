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
            "itemNumber": 16,
            "otherNumber": 8
        };
        this.itemCheckboxInit = {
            "status": true, // true Checkbox false Radio
            "btnName": ["", "hidden"], // button more
            "btnItem": ["hidden", ""], // button item submit cancel
            "checkboxName": ["","lbl"],
            "data": {}
        };
        this.itemLineInit = {
            "status": true, // true open false close
            "lineName": ["hidden",""]
        };
        this.relatedFilters = [];
        this.state = {
            "tool": {},
            "itemExpand": {},
            "itemCheckbox": {},
            "itemLine": {},
            "field": "",
            "startDate": {},
            "endDate": {},
            "tags": {},
            "optionData": null,
            "showTag": false
        };
        this.runField = [];
    };

    componentWillMount () {
        this.renderTagsSort();
    };

    renderTagsSort () {
        const {tags} = this.state;
        const {dataFilter,filterInit} = this.props;
        [...dataFilter].map((item)=>{
            const {field,type} = item;
            tags[field] = {
                "type": type?type:"text",
                "itemIsDisplay": true,
                "tagIsClosed": true,
                "field": field,
                "fieldText": item.text,
                "text": '',
                "id": ''
            };
            if(filterInit&&filterInit[field]){
                Object.assign(tags[field], filterInit[field]);
            }
        });
        this.setState({tags});
        this.handleOnSearch();
    };

    renderTags () {
        const tags = Object.values(this.state.tags);
        //console.log(tags);
        return (
            <span className="words">
                {tags.map((item, i) => {
                    if(!item.id&&!item.text){return false}
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

    renderText (item, line) {
        let {value,field} = item;
        if(this.relatedFilters[line] && this.relatedFilters[line].value){
            value = this.relatedFilters[line].value;
        }
        if(!value){return false}
        // status true Checkbox false Radio
        const {status,checkboxName,data} = this.state.itemCheckbox[field];
        //console.log('itemCheckbox',status,data);
        const label = data.map((label, col) => {
            const selectClass = label.status ? ' here' : ' ';
            return (
                <label key={col}>
                    {status && <input type="checkbox" value={label.id} defaultChecked={label.status} className="ace" />}
                    <span className={"hand " + checkboxName + selectClass}
                          data-field={field}
                          data-id={label.id}
                          onClick={this.onClickText.bind(this, line, col)}>{' ' + label.text}</span>
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
            "field": item.field,
            "text" : keyword,
            "id": keyword
        };
        this.addTags(params);
    };

    onSearch(item,value,option) {
        const params = {
            "field": item.field,
            "text" : value,
            "id": option.props.id
        };
        this.addTags(params);
    };
    
    renderLabel (item,i) {
        const {type, field} = item;
        let label = "";
        switch (type) {
            case "select":
                label = this.renderSelect(item, i);
                break;
            case "time":
                label = this.renderTime(item, i);
                break;
            case "search":
                label = this.renderSearch(item, i);
                break;
            case "keyword":
                label = this.renderKeyword(item, i);
                break;
            default:
                label = this.renderText(item, i);
        }
        //const lineName = (i == 0 ) ? "item h72" : "item h36";
        // status true Checkbox false Radio
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

    renderItem (item, line) {
        const {value, field, type} = item;
        if(!value){return false}
        const {tags,itemExpand,itemCheckbox} = this.state;
        const {filterInit} = this.props;
        if(!itemExpand[field]){
            this.setItemExpand({"field":field,"flag":false});
        }
        const {text,icon,itemName} = itemExpand[field];
        let data = [];
        value.length && [...value].map((item)=>{
            const obj  = {...item};
            // tags&&tags[field]&&tags[field].text==item.text filterInit&&filterInit[field]&&filterInit[field].text==item.text
            obj.status = tags&&tags[field]&&tags[field].text==item.text?true:false;
            data.push(obj);
        });
        //this.setItemCheckbox({"field":field,"flag":itemCheckbox[field]&&itemCheckbox[field].status||false,"data":data});
        if(!itemCheckbox[field]){
            this.setItemCheckbox({"field":field,"flag":false,"data":data});
        }else {
            //console.log(itemCheckbox[field].status,data[0],itemCheckbox[field].data[0]);
            if(!_.isEqual(data[0],itemCheckbox[field].data[0])){
                this.setItemCheckbox({"field":field,"flag":itemCheckbox[field].status,"data":data});
                tags[field].id = "";
                tags[field].text = "";
            }
        }
        const {btnName} = itemCheckbox[field];
        return (
            <div>
                <div className={"body " + itemName}>{this.renderLabel(item, line)}</div>
                <div className="foot">
                    {type=="checkbox" && <span className={"hand ace-icon fa smaller-20 fa-check-square-o " + btnName} data-field={field} onClick={this.onItemCheckbox.bind(this)}>多选</span>}
                    {type!="search" && value.length > this.itemExpandInit.itemNumber &&  <span className={"hand ace-icon fa smaller-20 "+ icon} data-field={field} onClick={this.onItemExpand.bind(this)}>{text}</span>}
                </div>
            </div>
        );
    };

    render () {
        //console.log(this.props.dataFilter);
        const group = [...this.props.dataFilter].map((item, i) => {
            let {field,text} = item;
            const {itemLine} = this.state;
            if(!itemLine[field]){
                this.setItemLine({"field":field,"flag":true});
            }
            const {lineName} = itemLine[field];
            if(item.children && typeof this.relatedFilters[i] == 'number'){
                this.relatedFilters[i+1] = item.children[this.relatedFilters[i]];
            }
            return (
                <li className={lineName} key={i}>
                    <h3>{text}</h3>
                    {this.renderItem(item, i)}
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
        this.setItemTime({"field":field,start,end});
        if(start&&end){
            const startStr = moment(start).startOf('day').format("YYYY-MM-DD HH:mm:ss");
            const endStr = moment(end).endOf('day').format("YYYY-MM-DD HH:mm:ss");
            const params = {
                "field": field,
                "text" :startStr + ' 至 ' + endStr,
                "id": startStr + ',' +endStr
            };
            this.addTags(params);
            const {itemCheckbox} = this.state;
            itemCheckbox[field].data.map((item)=>{
                item.status = false;
            });
            this.setItemCheckbox({"field":field,"flag":false,"type":"set"});
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

    setItemTime ({field,start,end}) {
        const {startDate,endDate} = this.state;
        startDate[field] = start?start:null;
        endDate[field] = end?end:null;
        this.setState({
            "startDate": startDate,
            "endDate": endDate
        });
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

    setItemCheckbox ({field,flag,data,type}) {
        const {btnName,btnItem,checkboxName} = this.itemCheckboxInit;
        const {itemCheckbox} = this.state;
        const index = Number(flag);
        itemCheckbox[field] = {
            "status": flag, // true Checkbox false Radio
            "btnName": btnName[index],
            "btnItem": btnItem[index],
            "checkboxName":checkboxName[index],
            "data": data?data:itemCheckbox[field].data
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
        this.setItemCheckbox({"field":field,"flag":true,"type":"set"});
    };

    onItemCheckboxSubmit (event) {
        const target = event.target;
        const field = target.getAttribute('data-field');

        const {itemCheckbox} = this.state;
        let textsArg = [],idsArg = [];
        itemCheckbox[field].data.map((item)=>{
            if(item.status){
                textsArg.push(item.text);
                idsArg.push(item.id);
            }
        });
        if(idsArg.length>0){
            const params = {
                "field": field,
                "text": textsArg.join('+'),
                "id": idsArg.join(',')
            };
            this.addTags(params);
            //this.setItemLine({"field":field,"flag":false,"type":"set"});
        }else{
            this.deleteTag(event);
            this.setItemExpand({"field":field,"flag":false,"type":"set"});
            this.setItemCheckbox({"field":field,"flag":false,"type":"set"});
        }
    };

    onItemCheckboxCancel (event) {
        //const target = event.target;
        //const field = target.getAttribute('data-field');
        this.deleteTag(event);
    };

    handleOnSearch (current) {
        const {tags} = this.state;
        let count = 0,params=[];
        const list = Object.values(tags);
        list.map((item,i)=>{
            if(item.id&&item.text){
                params.push(item);
                ++count;
            }
        });
        console.log('handleOnSearch:',this.runField,params,current);
        //this.setItemLine({"field":item.field,"flag":item.itemIsDisplay,"type":"set"});
        //const flag = count == listArr.length;
        //this.setTool({"field":"toolbar","flag":flag,"type":"set"});
        this.props.onSearch(params,current);
        this.runField = [];
    };

    addTags (tag) {
        const {field,text,id} = tag;
        const {tags} = this.state;
        console.log(field,tags[field],tags);
        Object.assign(tags[field], {
            "text": text,
            "id": id
        });
        this.setState(tags);
        const current = {"field":field,"id":id};
        this.handleOnSearch(current);
    };

    deleteTag (event) {
        const target = event.target;
        const field  = target.getAttribute('data-field');
        const {tags,itemCheckbox} = this.state;
        itemCheckbox[field].data.map((item)=>{
            item.status = false;
        });
        tags[field].id = "";
        tags[field].text = "";
        this.setState(tags);
        this.handleOnSearch();
        this.setItemLine({"field":field,"flag":true,"type":"set"});
        this.setItemExpand({"field":field,"flag":false,"type":"set"});
        this.setItemCheckbox({"field":field,"flag":false,"type":"set"});
        //this.setTool({"field":"expand","flag":true,"type":"set"});
        if(tags[field].type=="time"){
            this.setItemTime({"field":field});
        }
    };

    onClickText (row, col, event) {
        const target    = event.target;
        const field     = target.getAttribute('data-field');
        const text      = _.trim(target.textContent);
        const id        = target.getAttribute('data-id');
        const params = {
            "field": field,
            "text": text,
            "id": id
        };
        const {tags,itemCheckbox} = this.state;
        const {status,data} = itemCheckbox[field];
        console.log('data[col].status',data[col].status);
        if(!status) {
            data.map((item)=>{
                item.status = false;
            });
            data[col].status = true;
            this.addTags(params);
        }else {
            data[col].status = !data[col].status;
        }
        this.setItemCheckbox({"field":field,"flag":status,"type":"set"});
        if(tags[field].type=="time"){
            this.setItemTime({"field":field});
        }
        this.relatedFilters[row] = col;
    };

    onSelect () {

    };

}