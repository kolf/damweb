import React, {Component} from "react";
import _                  from "lodash";
import {connect}          from "react-redux";
import LoginComponent     from "app/components/login";
import {isStorage}        from "app/api/auth_token";

import {signIn, getUserInfo} from "app/action_creators/passport_action_creator";

const select = (state) => ({
  "passportError": state.passport.error,
  "user": state.passport.user
});
@connect(select)
export default class LoginContainer extends Component {

  static contextTypes = {
    "router": React.PropTypes.object.isRequired
  };

  componentWillMount() {
    const {user, history} = this.props;
    // console.log(user);
    if (isStorage("token")) {
      this.context.router.push("/home");
    }
  };

  render() {
    return (
      <LoginComponent onSubmit={this.handleSubmit.bind(this)} passportError={this.props.passportError} />
    );
  };

  handleSubmit(params) {
    const {dispatch} = this.props;
    dispatch(signIn(params)).then((result) => {
      if (result.apiError) return;
      this.context.router.push("/home");
      const token = result.apiResponse.TGT;
      dispatch(getUserInfo({"token":token})).then((res) => {
        if (res.apiError) return;
        this.context.router.push("/home");
      });
    });
  };
}




