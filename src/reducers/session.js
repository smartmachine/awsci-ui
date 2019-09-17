import {RECEIVE_ACCESS_TOKEN, REQUEST_ACCESS_TOKEN, ERROR_ACCESS_TOKEN} from "../actions/sessionActions";

const defaultState = {
    isFetching: false,
    loggedIn: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_ACCESS_TOKEN:
            return Object.assign({}, state, {
                isFetching: true,
                loggedIn: false,
                error: undefined,
            });
        case RECEIVE_ACCESS_TOKEN:
            return Object.assign({}, state, {
                isFetching: false,
                ...action.session,
                loggedIn: true,
                lastUpdated: action.receivedAt
            });
        case ERROR_ACCESS_TOKEN:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                loggedIn: false,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}