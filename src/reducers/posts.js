import * as ActionTypes from '../actions/actionTypes'

const postsState = {
    isFetching: false,
    lastUpdated: null,
    category: null,
    items: []
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
                isFetching: false,
                lastUpdated: action.receivedAt,
                category: action.category,
                items: action.posts
            }

        default:
            return { ...state }
    }
}
