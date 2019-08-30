import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import {connect} from 'react-redux';

import { parse as parseQueryString } from 'query-string';

import {fetchSession} from '../../actions/sessionActions'

import ghImage from '../../assets/GitHub-Mark-Light-120px-plus.png'
import Alert from "react-bootstrap/Alert";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { githubURL: '', loginError: false }
    }

    componentDidMount() {

        const params = parseQueryString(this.props.location.search);

        if ('code' in params && params.code != null) {
            console.log("Github Authorization Code: " + params.code);
            this.props.getSession(params.code);
            //this.props.history.push('/login')
        } else {
            this.generateGithubURL();
        }
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
    }

    generateGithubURL = () => {
        let host = "https://github.com/login/oauth/authorize?";
        let queryData = {
            client_id: "9ba972db1d356346f618",
            redirect_uri: "https://awsci.io/login",
            scope: "read:user repo",
            allow_signup: "false"
        };

        this.setState({githubURL: host + Login.encodeQueryData(queryData)});
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
                        {this.state.loginError &&
                        <Alert variant="danger" onClose={this.closeAlert} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                Change this and that and try again. Duis mollis, est non commodo
                                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                                Cras mattis consectetur purus sit amet fermentum.
                            </p>
                        </Alert>
                        }
                        <p/>
                        <Button href={this.state.githubURL} disabled={this.props.isFetching}><Image src={ghImage} width={20}/> Github Login</Button>
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
    getSession: (code) => dispatch(fetchSession(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);