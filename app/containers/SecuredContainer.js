import React, {Component} from "react";
import {connect}          from "react-redux";
import {isStorage, getStorage, setStorage} from "app/api/auth_token";
import Header             from "app/containers/header";
import SidebarShortcuts   from "app/containers/sidebar/sidebarShortcuts";
import SidebarNav         from "app/containers/sidebar/sidebarNav";
import SidebarCollapse    from "app/containers/sidebar/sidebarCollapse";
import {
	Affix
} from "antd";

const select = (state) => ({

});
@connect()
export default class SecuredContainer extends Component {


	constructor (props) {
		super(props);
		//console.log(props);
	};

	static contextTypes = {
		"router": React.PropTypes.object.isRequired
	};

	componentWillMount() {
		const {dispatch} = this.props;
		if (!isStorage('token')) {
			// history.pushState(null, "/login");
			this.context.router.push("/login");
		}
		// if (isStorage('token') && !isStorage("userId")) {//获取用户信息
		// 	dispatch(userInfo()).then(result => {
		// 		if (result.apiError) return false;
		// 		const userInfo = result.apiResponse;
		// 		setStorage({ key: "userId", value: userInfo.partyId });
		// 		setStorage({ key: "userName", value: userInfo.name });
		// 	})
		// } 
	};

	render() {
		return (
			<div className="secured">
				<Header />
				<div id="main-container" className="main-container">
					<div id="sidebar" className="sidebar responsive">
						<SidebarShortcuts />
						<SidebarNav {...this.props} />
						<SidebarCollapse collapse="true" />
					</div>
					<div className="main-content">
						{ this.props.children }
					</div>
				</div>
			</div>
		)
	};
}
