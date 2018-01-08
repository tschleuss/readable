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
                ...state,
                isFetching: false,
                lastUpdated: action.receivedAt,
                items: action.comments
            }
        case ActionTypes.UP_VOTE_COMMENT:
            return {
                ...state,
                items: state.items.map(comment => {
                    if (comment.id === action.id) {
                        comment.voteScore++
                    }
                    return comment
                })
            }
        case ActionTypes.DOWN_VOTE_COMMENT:
            return {
                ...state,
                items: state.items.map(comment => {
                    if (comment.id === action.id) {
                        comment.voteScore--
                    }
                    return comment
                })
            }
        case ActionTypes.EDIT_COMMENT:
            return {
                ...state
            }
        case ActionTypes.DELETE_COMMENT_BY_ID:
            return {
                ...state
            }
        case ActionTypes.RECEIVE_UPDATED_COMMENT:
            {
                let updated = false
                const items = state.items.map(comment => {
                    if (comment.id === action.comment.id) {
                        updated = true
                        return action.comment
                    }
                    return comment
                })
                if (!updated) {
                    items.push(action.comment)
                }
                return {
                    ...state,
                    items
                }
            }
        default:
            return { ...state }
    }
}
