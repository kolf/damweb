import 'babel-polyfill';
import React, {Component}       from "react";
import ReactDOM                 from "react-dom";
import {Provider}               from "react-redux";
import renderRoutes             from "app/routes";
import configureStore           from "app/store";

// Apply the base styles for ALL the app
import "app/assets/font-awesome/4.6.2/css/font-awesome.min.css"
import "app/assets/fonts/fonts.googleapis.com.css"
import 'node_modules/antd/dist/antd.min.css'
import 'app/assets/ace/bootstrap.min.css'
import 'app/assets/ace/ace.min.css'
import 'app/assets/app.css'

// Make sure the static_content gets added to the bundle
// import "app/assets/static_content";

const store = configureStore();

class Root extends Component {

  constructor(props) {
    super(props);
  };

  render () {
    return (
      <Provider store={store}>
        {renderRoutes(store)}
      </Provider>
    )
  }

}

ReactDOM.render(<Root/>, document.getElementById("vcgApp"));