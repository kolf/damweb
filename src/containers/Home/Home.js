import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>登陆成功！</div>;
  }
}

Home.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Home);
