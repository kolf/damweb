import React               from "react";
import {connect}           from "react-redux"
import {initializeSession} from "app/action_creators/session_action_creator";
import {isTokenSet}        from "app/api/auth_token";

const select = (state) => ({
  layoutsError: state.application.layoutsError,
  isInitializingSession: state.application.isInitializingSession,
  sessionValid: state.application.sessionValid
});

@connect(select)
export default class Application extends React.Component {

  componentWillMount() {

  }

  render () {
    return this.props.children;
  }

}
