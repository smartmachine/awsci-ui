import fetch from 'cross-fetch'

export const REQUEST_ACCESS_TOKEN = 'REQUEST_ACCESS_TOKEN';

const requestAccessToken = () => {
    return {
        type: REQUEST_ACCESS_TOKEN
    }
};

export const REFRESH_ACCESS_TOKEN = 'REFRESH_ACCESS_TOKEN';

const refreshAccessToken = () => {
    return {
        type: REFRESH_ACCESS_TOKEN
    }
};

export const RECEIVE_ACCESS_TOKEN = 'RECEIVE_ACCESS_TOKEN';

const receiveAccessToken = (json) => {
    return {
        type: RECEIVE_ACCESS_TOKEN,
        session: json,
        receivedAt: Date.now()
    }
};

export const ERROR_ACCESS_TOKEN = 'ERROR_ACCESS_TOKEN';

const errorAccessToken = (message) => {
    return {
        type: ERROR_ACCESS_TOKEN,
        error: message,
        receivedAt: Date.now()
    }
};

export const getAccessToken = (code) => dispatch => {
    dispatch(requestAccessToken());

    // curl -i  -H "Content-Type: application/json" -X POST https://api.awsci.io/cognito/login --data '{"authCode": "5300b61f9d17f536a226"}'
    return fetch('https://api.awsci.io/cognito/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"authCode": code})
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.state === "ok") {
            sessionStorage.setItem('AccessToken', json.access_token);
            dispatch(receiveAccessToken(json))
        } else {
            dispatch(errorAccessToken(json.message))
        }
    });
};

export const updateAccessToken = () => dispatch => {
    dispatch(refreshAccessToken());
    return fetch('https://api.awsci.io/cognito/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"access_token": sessionStorage.getItem('AccessToken')})
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.state === "ok") {
            sessionStorage.setItem('AccessToken', json.access_token);
            dispatch(receiveAccessToken(json))
        } else {
            dispatch(errorAccessToken(json.message))
        }
    });
};