import React, {Component} from "react";
import {Link}             from "react-router";


export default class SidebarShortcuts extends Component {

  // <i className="ace-icon fa fa-signal"></i>
  // <i className="ace-icon fa fa-pencil"></i>
  render() {
    return (
      <div className="sidebar-shortcuts" id="sidebar-shortcuts">
        <div className="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
          <button className="btn btn-success" style={{width:"30%",fontSize:"12px"}}>
            中文网
          </button>
          <button className="btn btn-info" style={{width:"30%",fontSize:"12px"}}>
            英文网
          </button>
          <button className="btn btn-warning" style={{width:"30%"}}>
            <i className="ace-icon fa fa-users"></i>
          </button>
        </div>

        <div className="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
          <span className="btn btn-success"></span>
          <span className="btn btn-info"></span>
          <span className="btn btn-warning"></span>
          <span className="btn btn-danger"></span>
        </div>
      </div>
    )
  }
}




