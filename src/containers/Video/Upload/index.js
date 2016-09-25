import React, {Component} from 'react';

import {connect} from 'react-redux';
import './style.scss';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div><div className="ant-layout-content">page</div></div>;
    }
}

Page.propTypes = {};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Page);
