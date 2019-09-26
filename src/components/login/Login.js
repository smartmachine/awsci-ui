import React, {useEffect} from 'react';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import {useDispatch, useSelector} from 'react-redux';
import {parse as parseQueryString} from 'query-string';
import {withRouter} from "react-router-dom";


import {fetchCognitoInfo} from '../../actions/cognitoActions'
import {getAccessToken, updateAccessToken} from '../../actions/sessionActions'

import './Login.css';

const hasSessionToken = () => {
    return sessionStorage.getItem('AccessToken') != null;
};

const Login = (props) => {

    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.session.loggedIn);
    const loginError = useSelector(state => state.session.loginError);
    const errorMessage = useSelector(state => state.session.error);
    const sessionFetching = useSelector(state => state.session.isFetching);
    const hasCognitoInfo = useSelector(state => state.cognito.hasInfo);
    const cognitoURL = useSelector(state => state.cognito.url);

    useEffect(() => {

        const params = parseQueryString(props.location.search);
        if ('code' in params && params.code != null) {
            props.history.push('/login');
            dispatch(getAccessToken(params.code));
        } else if (sessionFetching) {
            console.log("Waiting for session data.")
        } else if (loggedIn) {
            props.history.push('/admin');
        } else if (loginError) {
            console.log("Error logging in!");
        } else if (hasSessionToken()) {
            dispatch(updateAccessToken())
        } else {
            dispatch(fetchCognitoInfo())
        }
    }, [props.location.search, props.history, loggedIn, dispatch, loginError, sessionFetching]);

    const closeAlert = () => {
        props.history.push('/login');
        dispatch(fetchCognitoInfo());
    };

    return (
        <Container className="p-3">
            <Jumbotron>
                <h1 className="header">Welcome To AWSci</h1>
                <p/>
                {loginError &&
                <Alert variant="danger" onClose={closeAlert} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        Login error!  Some message: {errorMessage}
                    </p>
                </Alert>
                }
                <p/>
                {!sessionFetching &&
                <Button href={cognitoURL} disabled={!hasCognitoInfo}>Login</Button>
                }
                {sessionFetching &&
                <Spinner animation={"border"}/>
                }
                <p/>
            </Jumbotron>
        </Container>
    );
};

export default withRouter(Login);