import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import {connect} from "react-redux";
import {simpleAction} from "./actions/simpleAction";

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = { githubURL: '' };
    }
    
    componentDidMount() {

        let host = "https://github.com/login/oauth/authorize?";

        let queryData = {
            client_id: "9ba972db1d356346f618",
            redirect_uri: "https://awsci.io",
            scope: "read:user repo",
            allow_signup: "false"
        };

        this.setState({githubURL: host + App.encodeQueryData(queryData)});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate()');
        console.log('Properties:', this.props);
        console.log('State:', this.state);
    }


    simpleAction = (event) => {
      this.props.simpleAction()
    };

    static encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    render() {
        return (
            <div>
                <Container className="p-3">
                    <Jumbotron>
                        <h1 className="header">Welcome To AWSci</h1>
                        <p/>
                        <p/>
                        <Button    onClick={this.simpleAction}>Test redux action</Button>
                    </Jumbotron>
                </Container>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
