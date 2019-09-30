import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRoute from "./components/private-route/PrivateRoute";
import Admin from "./layouts/admin/Admin";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";

const App = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/admin" component={Admin}/>
                <PrivateRoute path="/logout" component={Logout}/>
                <Route path="/login" component={Login}/>
                <Redirect from="/" to="/admin" exact push/>
            </Switch>
        </Router>
    );
};

export default App;
