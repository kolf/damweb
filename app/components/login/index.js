import React, {Component, PropTypes} from "react";
import {Link}                        from "react-router";
import {reduxForm}                   from "redux-form";
import validation                    from 'app/components/login/validation';


@reduxForm({
	form: 'login',
	fields: ['userName', 'password'],
	validate: validation,
	//asyncValidate,
	asyncBlurFields: ['userName']
})
export default class LoginComponent extends Component {

	static propTypes = {
		active: PropTypes.string,
		asyncValidating: PropTypes.bool.isRequired,
		fields: PropTypes.object.isRequired,
		dirty: PropTypes.bool.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		resetForm: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
		pristine: PropTypes.bool.isRequired,
		valid: PropTypes.bool.isRequired
	};

	render() {
		const {
			asyncValidating,
			dirty,
			fields: {userName, password},
			active,
			handleSubmit,
			invalid,
			resetForm,
			pristine,
			valid,
			passportError
        } = this.props;

		return (
			<div className="login-layout">
				<div className="main-container">
					<div className="main-content">
						<div className="row">
							<div className="col-sm-10 col-sm-offset-1">
								<div className="login-container">
									<div className="center">
										<h1>
											<i className="ace-icon fa fa-leaf green"></i>
											<span className="red"> VCG </span>
											<span className="white" id="id-text2">编审系统</span>
										</h1>
										<h4 className="blue" id="id-company-text">&copy; 视觉中国</h4>
									</div>

									<div className="space-6"></div>

									<div className="position-relative">
										<div id="login-box" className="login-box visible widget-box no-border">
											<div className="widget-body">
												<div className="widget-main">
													<h4 className="header blue lighter bigger">
														<i className="ace-icon fa fa-coffee green"></i>
														请输入你的用户信息
													</h4>

													<div className="space-6"></div>

													<form onSubmit={handleSubmit}>
														<fieldset>
															<label className="block clearfix">
																<span className="block input-icon input-icon-right">
																	<input type="text" className="form-control" {...userName} placeholder="Username" />
																	<i className="ace-icon fa fa-user"></i>
																</span>
																{userName.error && userName.touched && <div className="text-danger">{userName.error}</div>}
															</label>

															<label className="block clearfix">
																<span className="block input-icon input-icon-right">
																	<input type="password" className="form-control" {...password} placeholder="Password" />
																	<i className="ace-icon fa fa-lock"></i>
																</span>
																{password.error && password.touched && <div className="text-danger">{password.error}</div>}
															</label>

															<div className="space"></div>

															<div className="clearfix">
																<label className="inline">
																	<input type="checkbox" className="ace" />
																	<span className="lbl"> Remember Me</span>
																</label>

																<button type="submit" className="width-35 pull-right btn btn-sm btn-primary">
																	<i className="ace-icon fa fa-key"></i>
																	<span className="bigger-110">Login</span>
																</button>
															</div>

															<div className="space-4"></div>
															{passportError && <p className="text-warning small orange text-center"><i className="ace-icon fa fa-exclamation-triangle"></i> {passportError.errorMessage}</p>}
														</fieldset>
													</form>

												</div>

												<div className="toolbar clearfix">
													<div>
														<Link to="#" data-target="#forgot-box" className="forgot-password-link">
															<i className="ace-icon fa fa-arrow-left"></i>
															I forgot my password
														</Link>
													</div>

													<div>
														<Link to="#" data-target="#signup-box" className="user-signup-link">
															I want to register
															<i className="ace-icon fa fa-arrow-right"></i>
														</Link>
													</div>
												</div>
											</div>
										</div>

										<div id="forgot-box" className="forgot-box widget-box no-border">
											<div className="widget-body">
												<div className="widget-main">
													<h4 className="header red lighter bigger">
														<i className="ace-icon fa fa-key"></i>
														Retrieve Password
													</h4>

													<div className="space-6"></div>
													<p>
														Enter your email and to receive instructions
													</p>

													<form>
														<fieldset>
															<label className="block clearfix">
																<span className="block input-icon input-icon-right">
																	<input type="email" className="form-control" placeholder="Email" />
																	<i className="ace-icon fa fa-envelope"></i>
																</span>
															</label>

															<div className="clearfix">
																<button type="button" className="width-35 pull-right btn btn-sm btn-danger">
																	<i className="ace-icon fa fa-lightbulb-o"></i>
																	<span className="bigger-110">Send Me!</span>
																</button>
															</div>
														</fieldset>
													</form>
												</div>

												<div className="toolbar center">
													<Link to="#" data-target="#login-box" className="back-to-login-link">
														Back to login
														<i className="ace-icon fa fa-arrow-right"></i>
													</Link>
												</div>
											</div>
										</div>

										<div id="signup-box" className="signup-box widget-box no-border">
											<div className="widget-body">
												<div className="widget-main">
													<h4 className="header green lighter bigger">
														<i className="ace-icon fa fa-users blue"></i>
														New User Registration
													</h4>

													<div className="space-6"></div>
													<p>error</p>

													<form>
														<fieldset>
															<label className="block clearfix">
																<span className="block input-icon input-icon-right">
																	<input type="email" className="form-control" placeholder="Email" />
																	<i className="ace-icon fa fa-envelope"></i>
																</span>
															</label>

															<label className="block clearfix">
																<span className="block input-icon input-icon-right">
																	<input type="text" className="form-control" placeholder="Username" />
																	<i className="ace-icon fa fa-user"></i>
																</span>
															</label>

															<label className="block clearfix">
																<span className="block input-icon input-icon-right">
																	<input type="password" className="form-control" placeholder="Password" />
																	<i className="ace-icon fa fa-lock"></i>
																</span>
															</label>

															<label className="block clearfix">
																<span className="block input-icon input-icon-right">
																	<input type="password" className="form-control" placeholder="Repeat password" />
																	<i className="ace-icon fa fa-retweet"></i>
																</span>
															</label>

															<label className="block">
																<input type="checkbox" className="ace" />
																<span className="lbl">
																	I accept the
																	<Link to="#">User Agreement</Link>
																</span>
															</label>

															<div className="space-24"></div>

															<div className="clearfix">
																<button type="reset" className="width-30 pull-left btn btn-sm">
																	<i className="ace-icon fa fa-refresh"></i>
																	<span className="bigger-110">Reset</span>
																</button>

																<button type="button" className="width-65 pull-right btn btn-sm btn-success">
																	<span className="bigger-110">Register</span>

																	<i className="ace-icon fa fa-arrow-right icon-on-right"></i>
																</button>
															</div>
														</fieldset>
													</form>
												</div>

												<div className="toolbar center">
													<Link to="#" data-target="#login-box" className="back-to-login-link">
														<i className="ace-icon fa fa-arrow-left"></i>
														Back to login
													</Link>
												</div>
											</div>
										</div>

									</div>

									<div className="navbar-fixed-top align-right">
										<br />
										&nbsp;
										<Link id="btn-login-dark" to="#">ch</Link>
										&nbsp;
										<span className="blue">/</span>
										&nbsp;
										<Link id="btn-login-blur" to="#">en</Link>
										&nbsp; &nbsp; &nbsp;
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}

}
