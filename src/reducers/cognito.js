import {RECEIVE_COGNITO_INFO, REQUEST_COGNITO_INFO} from "../actions/cognitoActions";

const defaultState = {
    isFetching: false,
    hasInfo: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_COGNITO_INFO:
            return Object.assign({}, state, {
                isFetching: true,
                hasInfo: false,
            });
        case RECEIVE_COGNITO_INFO:
            return Object.assign({}, state, {
                isFetching: false,
                hasInfo: true,
                url: generateCognitoURL(action.clientId, action.callbackURL),
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

const encodeQueryData = (data) => {
    const ret = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
    }
    return ret.join('&');
};

const generateCognitoURL = (clientId, callbackURL) => {
    let host = 'https://auth.awsci.io/oauth2/authorize?';
    let queryData = {
        response_type: 'code',
        client_id: clientId,
        scope: 'https://api.awsci.io/user email openid profile',
        redirect_uri: callbackURL
    };
    return host + encodeQueryData(queryData);
};