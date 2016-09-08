import React, {Component} from "react";

export default class HomeContainer extends Component {
	
	componentWillMount() {
		
	}

	render () {
		console.log('home')
		console.log(this.state)
		console.log(this.props)
		console.log(this.props.children)
		return (
			<div>首页</div>
		);
	}
}




