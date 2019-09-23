import React, {Component, Fragment} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';


class PrivateRoute extends Component {
    render() {
        return (
            <Fragment>
            {this.props.loggedIn
                ? <Route {...this.props}/>
                : <Redirect to='/login' />
            }
            </Fragment>
        );
    }
}

PrivateRoute.propTypes = Route.propTypes;
PrivateRoute.defaultProps = Route.defaultProps;

const mapStateToProps = state => ({
    loggedIn: state.session.loggedIn
});

export default connect(mapStateToProps)(PrivateRoute);
