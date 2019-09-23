import {RECEIVE_USER_INFO, REQUEST_USER_INFO, ERROR_USER_INFO} from "../actions/userInfoActions";

const defaultState = {
    isFetching: false,
    hasContent: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_USER_INFO:
            return Object.assign({}, state, {
                isFetching: true,
                hasContent: false,
                error:      undefined,
            });
        case RECEIVE_USER_INFO:
            return Object.assign({}, state, {
                isFetching:  false,
                hasContent:  true,
                ...action.profile,
                lastUpdated: action.receivedAt
            });
        case ERROR_USER_INFO:
            return Object.assign({}, state, {
                isFetching:  false,
                error: action.error,
                hasContent:  false,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}