import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from '../Screens/Login/Login';
import SignUp from '../Screens/Login/SignUp'
import { connect } from 'react-redux'
import SessionStorageManager from './SessionStorageManager';
import Home from '../Screens/Home/Home'
import CompanyProfile from '../Screens/CompanyProfile/CompanyProfile'
import Contact from '../Screens/Contact/Contact'
import Daten from '../Screens/Daten/Daten'
import Header from '../Screens/Header/Header'
import impressum from '../Screens/Impressum/Impressum'
import Plan from '../Screens/Plan/Plan'
import ReviewerProfile from '../Screens/ReviewerProfile/ReviewerProfile'
import Search from '../Screens/Search/Search'
import Privacy from '../Screens/privacy/privacy'

// import { loginUser } from '../Redux/actions/authActions'



function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => isLoggedIn === true ? (
                <Component {...props} />
            ) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
            }
        />
    );
}


class Routes extends Component {

    state = {
        isLoggedIn: false,
        user: null,
    }

    UNSAFE_componentWillMount() {
        const user = SessionStorageManager.getUser();
        if (user) {
            this.setState({ isLoggedIn: true, user })
        }
    }


    render() {
        const user = SessionStorageManager.getUser();


        return (
            <Router>

                {user && <React.Fragment>
                    {/* <Header user={this.state.user} /> */}
                    {/* <Navbar /> */}
                </React.Fragment>}



                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" exact component={SignUp} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/companyprofile" exact component={CompanyProfile} />
                    <Route path="/contact" exact component={Contact} />
                    <Route path="/daten" exact component={Daten} />
                    <Route path="/header" exact component={Header} />
                    <Route path="/impressum" exact component={impressum} />
                    <Route path="/plan" exact component={Plan} />
                    <Route path="/reviewerprofile" exact component={ReviewerProfile} />
                    <Route path="/profile" exact component={ReviewerProfile} />
                    <Route path="/search" exact component={Search} />
                    <Route path="/privacy" exact component={Privacy} />
                    {/* <Route path="/dashboard" exact component={Dashboard}/> */}
                    {/* <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/article" component={Article} /> */}
                    {/* <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/alljobs" component={AllJobs} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/postjob" component={PostJob} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/editjob" component={EditJob} /> */}

                </Switch>
            </Router>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("mapToState", state.authReducer)
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
    }
}

export default connect(mapStateToProps, null)(Routes)

