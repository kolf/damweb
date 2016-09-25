import React, {Component} from 'react';

import {connect} from 'react-redux';
import './style.scss';

class AudioDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>page</div>;
    }
}

AudioDetails.propTypes = {};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(AudioDetails);
