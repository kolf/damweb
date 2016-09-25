import React, {Component} from 'react';

import {connect} from 'react-redux';
import './style.scss';

class AudioUpload extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div><div className="ant-layout-content">page</div></div>;
    }
}

AudioUpload.propTypes = {};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(AudioUpload);
