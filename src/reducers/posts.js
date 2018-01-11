import * as ActionTypes from '../actions/actionTypes'
import * as SortTypes from '../constants/sortTypes'

const postsState = {
    isFetching: false,
    lastUpdated: null,
    category: null,
    items: [],
    sortBy: SortTypes.SORT_BY_SCORE_DESC
}

export const posts = (state = postsState, action) => {
    switch (action.type) {
        case ActionTypes.GET_POSTS:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.GET_POSTS_BY_CATEGORY:
            return {
                ...state,
                isFetching: true,
                category: action.category
            }
        case ActionTypes.RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                lastUpdated: action.receivedAt,
                category: action.category,
                items: action.posts
            }
        case ActionTypes.UP_VOTE_POST:
            return {
                ...state,
                isFetching: true,
                items: state.items.map(post => {
                    if (post.id === action.id) {
                        post.voteScore++
                    }
                    return post
                })
            }
        case ActionTypes.DOWN_VOTE_POST:
            return {
                ...state,
                isFetching: true,
                items: state.items.map(post => {
                    if (post.id === action.id) {
                        post.voteScore--
                    }
                    return post
                })
            }
        case ActionTypes.EDIT_POST:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.DELETE_POST_BY_ID:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.POST_CREATED:
            return {
                ...state,
                isFetching: false,
                items: state.items.concat(action.post)
            }
        case ActionTypes.POST_EDITED:
            {
                const { id } = action.post
                const index = state.items.findIndex(post => post.id === id)
                return {
                    ...state,
                    isFetching: false,
                    items: (index === -1) ?
                        state.items.concat(action.post) : state.items.map(post =>
                            post.id === id ? action.post : post)
                }
            }
        case ActionTypes.POST_DELETED:
            return {
                ...state,
                isFetching: false,
                items: state.items.filter(post => post.id !== action.id)
            }
        case ActionTypes.ADD_POST:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.SORT_POSTS:
            return {
                ...state,
                sortBy: action.sortBy
            }
        default:
            return { ...state }
    }
}
