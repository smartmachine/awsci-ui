import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {connect} from "react-redux";

import {BrowserRouter as Router, Route} from "react-router-dom";

import Home from "../home/Home";
import Login from '../login/Login'

class App extends Component {



    render() {
        return (
            <Router>
                <Route path="/" exact component={Home}/>
                <Route path="/login"  component={Login}/>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(App);
