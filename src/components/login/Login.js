import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';

import { parse as parseQueryString } from 'query-string';

import { fetchCognitoInfo } from '../../actions/cognitoActions'
import { getAccessToken } from '../../actions/sessionActions'

import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { loginError: false }
    }

    componentDidMount() {
        const params = parseQueryString(this.props.location.search);

        if ('code' in params && params.code != null) {
            console.log("Cognito Authorization Code: " + params.code);
            this.props.getAccessToken(params.code);
            //this.props.history.push('/login')
        } else {
            this.props.getCognitoInfo()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Login.componentDidUpdate()');
        console.log('  Properties:', this.props);
        console.log('  State:     ', this.state);
        if (!this.props.session.loggedIn && prevProps.session.isFetching) {
            console.log("  Login Error!");
            this.setState({loginError: true})
        }
        if (this.props.session.loggedIn) {
            console.log("  Logged in!");
            this.setState({loginError: false});
            this.props.history.push('/');
        }
    }

    closeAlert = () => {
        this.setState({loginError: false});
        this.props.history.push('/login');
        this.props.getCognitoInfo()
    };

    render() {

        return (
            <div>
                <Container className="p-3">
                    <Jumbotron>
                        <h1 className="header">Welcome To AWSci</h1>
                        <p/>
                        {this.state.loginError &&
                        <Alert variant="danger" onClose={this.closeAlert} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                Login error!  Some message: {this.props.session.error}
                            </p>
                        </Alert>
                        }
                        <p/>
                        {!this.props.session.isFetching &&
                        <Button href={this.props.cognito.url} disabled={!this.props.cognito.hasInfo}>Login</Button>
                        }
                        {this.props.session.isFetching &&
                        <Spinner animation={"border"}/>
                        }
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
    getCognitoInfo: () => dispatch(fetchCognitoInfo()),
    getAccessToken: (code) => dispatch(getAccessToken(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);