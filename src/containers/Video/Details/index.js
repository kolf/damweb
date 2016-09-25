import React, {Component} from 'react';

import {connect} from 'react-redux';
import './style.scss';

class VideoDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>page</div>;
    }
}

VideoDetails.propTypes = {};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(VideoDetails);
