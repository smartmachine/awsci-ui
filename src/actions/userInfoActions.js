import fetch from 'cross-fetch'

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';

const requestUserInfo = () => {
    return {
        type: REQUEST_USER_INFO,
    }
};

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';

const receiveUserInfo = (json) => {
    return {
        type: RECEIVE_USER_INFO,
        profile: json,
        receivedAt: Date.now()
    }
};

export const ERROR_USER_INFO = 'ERROR_USER_INFO';

const errorUserInfo = (message) => {
    return {
        type: ERROR_USER_INFO,
        error: message,
        receivedAt: Date.now()
    }
};

export const getUserInfo = (accessToken) => dispatch => {
    dispatch(requestUserInfo());

    // curl -i  -H "Content-Type: application/json" -X POST https://api.awsci.io/cognito/login --data '{"authCode": "5300b61f9d17f536a226"}'
    return fetch('https://api.awsci.io/cognito/userInfo', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.state === "ok") {
            dispatch(receiveUserInfo(json))
        } else {
            dispatch(errorUserInfo(json.message))
        }
    }).catch( err => {
        console.log(err);
    });
};