import React, {useEffect} from "react";
import {Redirect, withRouter} from "react-router-dom";

const Logout = (props) => {
    useEffect(() => {
        localStorage.removeItem('AccessToken');
        props.history.push('/')
    });

    return <Redirect to='/' push={false}  />
};

export default withRouter(Logout);