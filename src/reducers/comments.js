import * as ActionTypes from '../actions/actionTypes'
import * as SortTypes from '../constants/sortTypes'

const commentsState = {
    isFetching: false,
    lastUpdated: null,
    items: [],
    sortBy: SortTypes.SORT_BY_SCORE_DESC.value
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
                isFetching: true,
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
                isFetching: true,
                items: state.items.map(comment => {
                    if (comment.id === action.id) {
                        comment.voteScore--
                    }
                    return comment
                })
            }
        case ActionTypes.EDIT_COMMENT:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.DELETE_COMMENT_BY_ID:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.COMMENT_CREATED:
            return {
                ...state,
                isFetching: false,
                items: state.items.concat(action.comment)
            }
        case ActionTypes.COMMENT_EDITED:
            {
                const { id } = action.comment
                const index = state.items.findIndex(comment => comment.id === id)
                return {
                    ...state,
                    isFetching: false,
                    items: (index === -1) ?
                        state.items.concat(action.comment) : state.items.map(comment =>
                            comment.id === id ? action.comment : comment)
                }
            }
        case ActionTypes.COMMENT_DELETED:
            return {
                ...state,
                isFetching: false,
                items: state.items.filter(comment => comment.id !== action.id)
            }
        case ActionTypes.ADD_COMMENT:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.SORT_COMMENTS:
            return {
                ...state,
                sortBy: action.sortBy
            }
        default:
            return { ...state }
    }
}
