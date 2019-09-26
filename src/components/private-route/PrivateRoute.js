import React, {Fragment} from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from 'react-redux';


const PrivateRoute = (props) => {
    const loggedIn = useSelector(state => state.session.loggedIn);
    return (
        <Fragment>
            {loggedIn ? <Route {...props}/> : <Redirect to='/login' />}
        </Fragment>
    );
};

PrivateRoute.propTypes = Route.propTypes;
PrivateRoute.defaultProps = Route.defaultProps;

export default PrivateRoute;
