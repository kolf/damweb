import React, {Component} from "react";
import {Link}             from "react-router";

export default class Footer extends Component {

  render () {
    return (

        <div className="footer-inner">
            <div className="footer-content">
                <span className="bigger-120">
                    <span className="blue bolder">VCG</span> Application &copy; 2013-2014</span>
                    <span className="action-buttons">
                    <Link to="#"><i className="ace-icon fa fa-twitter-square light-blue bigger-150"></i></Link>

                    <Link to="#"><i className="ace-icon fa fa-facebook-square text-primary bigger-150"></i></Link>

                    <Link to="#"><i className="ace-icon fa fa-rss-square orange bigger-150"></i></Link>
                </span>
            </div>
        </div>

    )
  }
}




