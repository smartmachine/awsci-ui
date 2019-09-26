import {RECEIVE_ACCESS_TOKEN, REQUEST_ACCESS_TOKEN, ERROR_ACCESS_TOKEN} from "../actions/sessionActions";

const defaultState = {
    isFetching: false,
    loggedIn: false,
    loginError: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_ACCESS_TOKEN:
            return Object.assign({}, state, {
                isFetching: true,
                loggedIn: false,
                loginError: false,
                error: undefined,
            });
        case RECEIVE_ACCESS_TOKEN:
            return Object.assign({}, state, {
                isFetching: false,
                ...action.session,
                loggedIn: true,
                loginError: false,
                lastUpdated: action.receivedAt
            });
        case ERROR_ACCESS_TOKEN:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                loggedIn: false,
                loginError: true,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}