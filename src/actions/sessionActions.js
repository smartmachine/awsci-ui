import fetch from 'cross-fetch'

export const REQUEST_SESSION = 'REQUEST_SESSION';

const requestSession = () => {
    return {
        type: REQUEST_SESSION,
    }
};

export const RECEIVE_SESSION = 'RECEIVE_SESSION';

const receiveSession = (json) => {
    return {
        type: RECEIVE_SESSION,
        //...json.data.children.map(child => child.data),
        session: json,
        receivedAt: Date.now()
    }
};

export const fetchSession = (code) => dispatch => {
    dispatch(requestSession(code));

    // curl -i  -H "Content-Type: application/json" -X POST https://api.awsci.io/login --data '{"authCode": "5300b61f9d17f536a226"}'
    return fetch('https://api.awsci.io/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"authCode": code})
    }).then(
        response => response.json(),
    ).then(json => {
        dispatch(receiveSession(json))
    });
};