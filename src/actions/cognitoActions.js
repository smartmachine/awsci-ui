import fetch from 'cross-fetch'

export const REQUEST_COGNITO_INFO = 'REQUEST_COGNITO_INFO';

const requestCognitoInfo = () => {
    return {
        type: REQUEST_COGNITO_INFO,
    }
};

export const RECEIVE_COGNITO_INFO = 'RECEIVE_COGNITO_INFO';

const receiveCognitoInfo = (json) => {
    return {
        type: RECEIVE_COGNITO_INFO,
        cognitoInfo: json,
        receivedAt: Date.now()
    }
};

export const fetchCognitoInfo = () => dispatch => {
    dispatch(requestCognitoInfo());

    // curl -i  -H "Content-Type: application/json" -X POST https://api.awsci.io/cognito/info'
    return fetch('https://api.awsci.io/cognito/info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(
        response => response.json(),
    ).then(json => {
        dispatch(receiveCognitoInfo(json))
    });
};