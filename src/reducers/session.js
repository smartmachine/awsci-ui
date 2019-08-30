import {RECEIVE_SESSION, REQUEST_SESSION} from "../actions/sessionActions";

const defaultState = {
    isFetching: false,
    loggedIn: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_SESSION:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_SESSION:
            return Object.assign({}, state, {
                isFetching: false,
                ...action.session,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}