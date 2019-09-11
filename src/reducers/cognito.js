import {RECEIVE_COGNITO_INFO, REQUEST_COGNITO_INFO} from "../actions/cognitoActions";

const defaultState = {
    isFetching: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_COGNITO_INFO:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_COGNITO_INFO:
            return Object.assign({}, state, {
                isFetching: false,
                ...action.cognitoInfo,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}