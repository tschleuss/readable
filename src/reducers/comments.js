import * as ActionTypes from '../actions/actionTypes'

const commentsState = {
    isFetching: false,
    lastUpdated: null,
    items: []
}

export const comments = (state = commentsState, action) => {
    switch (action.type) {
        case ActionTypes.GET_COMMENTS_BY_POST_ID:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.RECEIVE_COMMENTS:
            return {
                isFetching: false,
                lastUpdated: action.receivedAt,
                items: action.comments
            }
        default:
            return { ...state }
    }
}
