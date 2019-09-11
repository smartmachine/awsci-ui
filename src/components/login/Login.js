import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import {connect} from 'react-redux';

import { parse as parseQueryString } from 'query-string';

import { fetchCognitoInfo } from '../../actions/cognitoActions'

import ghImage from '../../assets/GitHub-Mark-Light-120px-plus.png'
import Alert from "react-bootstrap/Alert";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { cognitoURL: '', loginError: false }
    }

    componentDidMount() {
        this.props.getCognitoInfo()
    }

    static encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Login.componentDidUpdate()');
        console.log('  Properties:', this.props);
        console.log('  State:     ', this.state);
        if (this.props.cognito.state === "ok" && prevProps.cognito.isFetching) {
            let { clientId, callbackURL } = this.props.cognito;
            this.generateCognitoURL(clientId, callbackURL)
        }
        /**
        if (typeof this.props.session.state !== "undefined" && this.props.session.state === "error" && prevProps.session.isFetching) {
            console.log("  Login Error!");
            this.setState({loginError: true})
        }
        if (typeof this.props.session.state !== "undefined" && this.props.session.state === "ok") {
            console.log("  Logged in!");
            sessionStorage.setItem("session", this.props.session)
            this.setState({loginError: false});
            this.props.history.push('/');
        }
         */
    }

    generateCognitoURL = (clientId, callbackURL) => {
        let host = 'https://auth.awsci.io/oauth2/authorize?';
        let queryData = {
            response_type: 'code',
            client_id: clientId,
            redirect_uri: callbackURL
        };
        this.setState({cognitoURL: host + Login.encodeQueryData(queryData)});
    };

    closeAlert = () => {
        this.setState({loginError: false});
        this.props.history.push('/login');
        this.generateGithubURL();
    };

    render() {

        return (
            <div>
                <Container className="p-3">
                    <Jumbotron>
                        <h1 className="header">Welcome To AWSci</h1>
                        <p/>
                        <p/>
                        <Button href={this.state.cognitoURL} disabled={this.props.cognito.state !== "ok"}><Image src={ghImage} width={20}/> Github Login</Button>
                        <p/>
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
    getCognitoInfo: () => dispatch(fetchCognitoInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);