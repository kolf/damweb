import React, {Component} from 'react';

import {connect} from 'react-redux';
import './UploadVideo.scss';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>page</div>;
    }
}

Page.propTypes = {};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Page);
