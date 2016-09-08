import React, {Component} from "react";
import {Link}             from "react-router";



export default class SidebarCollapse extends Component {

    constructor (props) {
        super(props)
        this.state = {collapse: props.collapse}
    }

    _handleCollapse (event) {
        // event.preventDefault();
        var btn = event.target;
        var sidebar = document.getElementById('sidebar');
        var collapse = this.state.collapse;
        btn.className= (collapse) ? btn.getAttribute("data-icon2") : btn.getAttribute("data-icon1");
        sidebar.className= (collapse) ? "sidebar menu-min" : "sidebar";
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render () {
        return (
            <div className="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
                <i onClick={this._handleCollapse.bind(this)} className="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
            </div>
        )
    }


}




