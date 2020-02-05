import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import './CompanyProfile.css'
import proven from '../../assets/img/user.png';
import manicon from '../../assets/img/man-icon-2.png';
import Header from '../Header/Header'
import Footer from '../Header/Footer'
import axios from 'axios'
import Exception from 'ant-design-pro/lib/Exception';
import { Form } from 'antd';
import Review from '../Review/Review'
import { Rate } from 'antd';
import { Player } from 'video-react';
import thumbnail from '../../assets/img/thumbnail.png'

const reviewDesc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

class Company extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			company: '',
			success: true,
			visible: false
		}
	}

	handleCancel = () => {
		this.setState({ visible: false });
	};

	async handleCreate(values) {
		const { user } = this.props
		const { company } = this.state
		if (!values.video) {
			delete values.video
		}
		values.companyName = company.name
		values.companyId = company._id
		values.ownerId = company.user._id
		values.ownerName = company.user.name
		values.reveiwerName = user.name
		values.reveiwerId = user._id
		var formData = new FormData();
		for (var i in values) {
			formData.append(i, values[i])
		}
		formData.append('video', values.video[0].originFileObj)
		await axios.post('https://star-rating123.herokuapp.com/post/add-review', formData)
			.then((response) => {
				const { data } = response
				this.handleCancel()
				if (data.success) {
					this.props.loginUser(data.data)
					setTimeout(() => {
						window.location.reload()
					})
				}
			})

	};

	async componentWillMount() {
		await axios.post('https://star-rating123.herokuapp.com/post/search-company', {
			_id: this.props.match.params.id
		})
			.then((response) => {
				console.log(response)
				var { data } = response
				if (data.data && data.data.reviews) {
					data.data.reviews = data.data.reviews.reverse()
				}
				this.setState({
					company: data.data,
					success: data.success
				})
			})
	}


	render() {
		const { company, success } = this.state
		const { user } = this.props
		if (!company) {
			return (
				<div className="main-body">
					<Header {...this.props} />
					{!success && <Exception type="404" style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }} desc="User profile Not Found!!!" />}
				</div>
			)
		}
		return (
			<div className="main-body">
				<Header {...this.props} />
				<section id="inside-banner">
					<div className="wrapper">
						<div className="inside-banner-image">
							<div className="inside-content">
								<button className="btn-blue ff-primary"><i className="fa fa-phone"></i> Callback request</button>
								<button className="btn-blue ff-primary"><i className="fa fa-envelope"></i> Write a message</button>
							</div>
							<div className="social-icons">
								<ul>
									<li><a href="#"><i className="fa fa-facebook-f"></i></a></li>
									<li><a href="#"><i className="fa fa-twitter"></i></a></li>
									<li><a href="#"><i className="fa fa-linkedin"></i></a></li>
									<li><a href="#"><i className="fa fa-xing-square"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
				</section>


				<section id="expert">
					<div className="wrapper">
						<div className="expert-main">
							<div className="row">
								<div className="col-lg-2">
									<div className="exp-con-left">
										<div className="row">
											<div className="col-lg-12">
												<div className="proven-con">
													<img src={company.profilePic.url} alt="image" />
												</div>
											</div>
											<div className="col-lg-12">
												<div className="proven-botm">
													<span className="ff-primary">4.66/5.00</span>
													<div className="starr">
														<ul>
															<li><i className="fa fa-star"></i></li>
															<li><i className="fa fa-star"></i></li>
															<li><i className="fa fa-star"></i></li>
															<li><i className="fa fa-star"></i></li>
															<li><i className="fa fa-star"></i></li>
														</ul>
													</div>
													<h4 className="ff-secondary">{company.name}</h4>
													<h6 className="ff-secondary">3.853 Bewertungen</h6>
													<div className="pproven-bottom-last">
														<span className="line-top"></span>
														<span className="lie-botm"></span>
														<a className="a-tg-h ff-primary" href="#"><span>637</span>
															Reviews <br></br> </a>
														<a className="a-tg-h ff-primary" href="#"><span>4</span>
															other sources</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-10">
									<div className="exp-main">
										<div className="exp-con">
											<h3 className="ff-secondary">{company.url}</h3>
											<h4 className="ff-secondary">Customer satisfaction analysis & referral marketing</h4>
										</div>


										<div className="col-lg-12 clearfix">
											<div className="center-proven clearfix">
												<div className="col-lg-7 flrt-r">
													<div className="center-first">
														<div className="col-lg-12">
															<div className="center-first-sub ">
																<p className="ff-primary ideal" style={{
																	overflow: 'hidden'
																}}>{company.description}</p>
																{/* <a href="#">View full description <i className="fa fa-chevron-circle-down fc-blue"></i></a> */}
															</div>
														</div>
														<div className="col-lg-6 col-md-6 flrt-r">
															<div className="centr-sub-1">
																<div className="centr-sub-1-main">
																	<h5 className="ff-secondary">Contact information</h5>
																	<span className="ff-primary">{company.url}</span>
																	<span className="ff-primary">{company.address}</span>
																	<span className="ff-primary">{company.city}</span>
																	<span className="ff-primary">{company.country}</span>
																	{/* <span className="ff-primary direction"><i className="fa fa-map-marker"></i><a href="#" className="fc-blue"> Direction</a></span> */}
																</div>
																<div className="centr-sub-2-main">
																	<h5 className="ff-secondary">Contact person</h5>
																	{/* <span className="ff-primary">Remo Fyda</span> */}
																	<ul>
																		<li className="ff-primary"><i className="fa fa-phone"></i><a href="#" className="fc-blue">{company.contactNo}</a></li>
																		<li className="ff-primary"><a href="#" className="fc-blue">{company.contactEmail}</a></li>
																	</ul>
																</div>
															</div>
														</div>
														<div className="col-lg-6 col-md-6 flrt-r">
															{/* <div className="centr-sub-2">
											<h5 className="ff-secondary">Opening hours</h5>
											<span className="col-lg-6 col-xs-6 ff-primary">Donnerstag</span>
											<span className="col-lg-6 col-xs-6 ff-primary">09:00-18:00</span>
											<a className="col-lg-12 ff-primary" href="#">Alle Zeiten anzeigen</a>
										</div> */}
															<div className="centr-subs-2">
																<h5 className="ff-secondary">Websites & Profiles</h5>
																<p><i className="fa fa-window-maximize"></i><a className="ff-primary fc-blue" target="_blank" href={`https://${company.url}`}>{company.url}</a></p>
																<div className="social-icons-proven">
																	<ul>
																		<li><a href="#"><i className="fa fa-facebook-f"></i></a></li>
																		<li><a href="#"><i className="fa fa-twitter"></i></a></li>
																		<li><a href="#"><i className="fa fa-linkedin"></i></a></li>
																		<li><a href="#"><i className="fa fa-xing-square"></i></a></li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-lg-5 flrt-r">
													<div className="center-second">
														<div className="center-second-main">
															{/* <p className="ff-primary">Bewertungen vom 14.12.2019 </p> */}
															<div className="row">
																<div className="col-lg-6 col-md-6">
																	<div className="for-main">
																		<span className="ff-primary">5,00 von 5</span>
																		<div className="starr">
																			<ul>
																				<li><i className="fa fa-star"></i></li>
																				<li><i className="fa fa-star"></i></li>
																				<li><i className="fa fa-star"></i></li>
																				<li><i className="fa fa-star"></i></li>
																				<li><i className="fa fa-star"></i></li>
																			</ul>
																		</div>
																		<h4 className="ff-secondary">{company.name}</h4>
																	</div>
																</div>
																<div className="col-lg-6 col-md-6">
																	<div className="icon-image">
																		<img src={manicon} />
																		<h5>recommendation</h5>
																	</div>

																</div>
															</div>
															<div className="star-rating">
																<div className="star-first">
																	<div className="row">
																		<div className="col-lg-8 col-md-8 col-sm-8 col-8">
																			<p className="ff-primary fc-blue"><a href="#">Possible applications</a></p>
																		</div>
																		<div className="col-lg-4 col-md-4 col-sm-4 col-4">
																			<div className="starrs">
																				<ul>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="star-first">
																	<div className="row">
																		<div className="col-lg-8 col-md-8 col-sm-8 col-8">
																			<p className="ff-primary fc-blue"><a href="#">Features</a></p>
																		</div>
																		<div className="col-lg-4 col-md-4 col-sm-4 col-4">
																			<div className="starrs">
																				<ul>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="star-first">
																	<div className="row">
																		<div className="col-lg-8 col-md-8 col-sm-8 col-8">
																			<p className="ff-primary fc-blue"><a href="#">Transparency</a></p>
																		</div>
																		<div className="col-lg-4 col-md-4 col-sm-4 col-4">
																			<div className="starrs">
																				<ul>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="star-first">
																	<div className="row">
																		<div className="col-lg-8 col-md-8 col-sm-8 col-8">
																			<p className="ff-primary fc-blue"><a href="#">Privacy</a></p>
																		</div>
																		<div className="col-lg-4 col-md-4 col-sm-4 col-4">
																			<div className="starrs">
																				<ul>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="star-first">
																	<div className="row">
																		<div className="col-lg-8 col-md-8 col-sm-8 col-8">
																			<p className="ff-primary fc-blue"><a href="#">Value</a></p>
																		</div>
																		<div className="col-lg-4 col-md-4 col-sm-4 col-4">
																			<div className="starrs">
																				<ul>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																					<li><i className="fa fa-star"></i></li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														{!user.buyPlan ? <div className="inputcol-2">
															<a href="/createcompany" className="btn-blue ff-primary">Register Your Company</a>
														</div> : null}
														<div className="inputcol-2">
															<button className="btn-blue ff-primary" style={{ width: '100%' }} onClick={() => this.setState({ visible: true })}>Add Review</button>
														</div>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="reviews">
					<div className="wrapper">
						<div className="reviews-main">
							<div className="row">
								<div className="col-lg-8 col-md-8 col-sm-12">
									{company.reviews ? <div className="reviews-head">
										<h5 className="fc-blue">{company.reviews.length} Reviews on star-rating.com</h5>
									</div> : null}
								</div>
								<div className="stars1 col-sm-12" style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
									<div className="star-center">
										<span className="ff-primary">4.66/5.00</span>
										<div className="starress">
											<ul>
												<li><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
											</ul>
										</div>
										<span className="ff-primary">EXCELLENT</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{company.reviews ? <section id="customer-service">
					{company.reviews.map((v, i) => {
						var count = (v.applicationStars + v.featuresStars + v.clarityStars + v.privacyStars + v.customerService) / 5
						return (
							<div className="wrapper" key={i}>
								<div className="customer-service-main">
									{user && user._id === v.reveiwerId ? <div className="inputcol-2 edit1">
										<button className="btn-blue ff-primary" style={{ width: '120px' }}>Edit</button>
									</div> : null}
									<div className="row">
										<div className="col-lg-2">
											<div className="two-str-main-dv">
												<div className="two-star">
													<span className="ff-primary">{count}/5.00</span>
													<div className="starress">
														<Rate disabled defaultValue={count} allowHalf={true} style={{ color: '#0c94ac' }} />
													</div>
													{/* <span className="ff-primary">EXCELLENT</span> */}
													<span className="ant-rate-text">{reviewDesc[parseInt(count) - 1]}</span>
												</div>
												<div className="two-icon">
													<img src={manicon} />
													<h5>Recommendation</h5>
												</div>
											</div>
										</div>
										<div className="col-lg-10">
											<div className="two-main-r">
												<div className="two-r-main clearfix">
													<h3 className="ff-secondary">{v.reveiwerName}</h3>
													<p className="ff-primary coment">{v.feedback}</p>

													<div className="col-lg-5 col-md-6 col-sm-12 flrt-r">
														<div className="star-rating-second">
															<div className="star-third">
																<div className="row">
																	<div className="col-lg-6 col-md-6 col-sm-6 col-6">
																		<p className="ff-primary">Possible</p>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-6 col-6">
																		<div className="starrsd">
																			<Rate disabled defaultValue={v.applicationStars} style={{ color: '#0c94ac' }} />
																		</div>
																	</div>
																</div>
															</div>
															<div className="star-third">
																<div className="row">
																	<div className="col-lg-6 col-md-6 col-sm-6 col-6">
																		<p className="ff-primary">Features</p>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-6 col-6">
																		<div className="starrsd">
																			<Rate disabled defaultValue={v.featuresStars} style={{ color: '#0c94ac' }} />
																		</div>
																	</div>
																</div>
															</div>
															<div className="star-third">
																<div className="row">
																	<div className="col-lg-6 col-md-6 col-sm-6 col-6">
																		<p className="ff-primary">Clarity</p>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-6 col-6">
																		<div className="starrsd">
																			<Rate disabled defaultValue={v.clarityStars} style={{ color: '#0c94ac' }} />
																		</div>
																	</div>
																</div>
															</div>
															<div className="star-third">
																<div className="row">
																	<div className="col-lg-6 col-md-6 col-sm-6 col-6">
																		<p className="ff-primary">Privacy</p>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-6 col-6">
																		<div className="starrsd">
																			<Rate disabled defaultValue={v.privacyStars} style={{ color: '#0c94ac' }} />
																		</div>
																	</div>
																</div>
															</div>
															<div className="star-third">
																<div className="row">
																	<div className="col-lg-6 col-md-6 col-sm-6 col-6">
																		<p className="ff-primary">Customer Service</p>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-6 col-6">
																		<div className="starrsd">
																			<Rate disabled defaultValue={v.customerService} style={{ color: '#0c94ac' }} />
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													{v.video ? <div className="col-lg-3 col-md-6 col-sm-12 flrt-r">
														<div className="mrtpt clearfix">
															<Player>
																<source src={v.video.url} />
															</Player>
														</div>
													</div> : null}
												</div>
												<div className="two-d-main clearfix">
													<div className="col-lg-12">
														<div className="prove-centre">
															<p className="ff-primary">Customer review & rating for:</p>
															<span className="ff-primary">Star Rating</span>
														</div>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</section> : null}
				<Review
					// wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onCancel={this.handleCancel}
					openNotification={this.openNotification}
					handleCreate={this.handleCreate.bind(this)}
				/>
				<Footer {...this.props} />
			</div>
		)
	}
}


const CompanyForm = Form.create({ name: 'Company' })(Company);



const mapStateToProps = (state) => {
	console.log("mapToState", state.authReducer)
	return {
		user: state.authReducer.user,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loginUser: (user) => dispatch(loginUser(user)),
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm)