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
                ...state,
                isFetching: false,
                lastUpdated: action.receivedAt,
                category: action.category,
                items: action.posts
            }
        case ActionTypes.UP_VOTE_POST:
            return {
                ...state,
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
                items: state.items.map(post => {
                    if (post.id === action.id) {
                        post.voteScore--
                    }
                    return post
                })
            }
        case ActionTypes.RECEIVE_UPDATED_POST:
            {
                let updated = false
                const items = state.items.map(post => {
                    if (post.id === action.post.id) {
                        updated = true
                        return action.post
                    }
                    return post
                })
                if (!updated) {
                    items.push(action.post)
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
