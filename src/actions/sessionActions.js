import fetch from 'cross-fetch'

export const REQUEST_ACCESS_TOKEN = 'REQUEST_ACCESS_TOKEN';

const requestAccessToken = (code) => {
    return {
        type: REQUEST_ACCESS_TOKEN,
        code: code
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
    dispatch(requestAccessToken(code));

    // curl -i  -H "Content-Type: application/json" -X POST https://api.awsci.io/cognito/login --data '{"authCode": "5300b61f9d17f536a226"}'
    return fetch('https://api.awsci.io/cognito/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"authCode": code})
    }).then(response => {
        return response.json();
        },
    ).then(json => {
        if (json.state === "ok") {
            dispatch(receiveAccessToken(json))
        } else {
            dispatch(errorAccessToken(json.message))
        }
    });
};