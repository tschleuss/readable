import * as ReadableAPI from '../api/ReadableAPI'
import * as ActionCreators from './actionCreators'

export function getCategories() {
    return dispatch => {
        dispatch(ActionCreators.getCategories())
        return ReadableAPI.getCategories()
            .then(categories =>
                dispatch(ActionCreators.receiveCategories(categories)))
    }
}

export function getPosts(category = null) {
    if (category !== null && category !== 'home') {
        return getPostsByCategory(category)
    }
    return getAllPosts()
}

export function getAllPosts() {
    return dispatch => {
        dispatch(ActionCreators.getPosts())
        return ReadableAPI.getPosts()
            .then(posts =>
                dispatch(ActionCreators.receivePosts(posts)))
    }
}

export function getPostsByCategory(category) {
    return dispatch => {
        dispatch(ActionCreators.getPostsByCategory(category))
        return ReadableAPI.getPostsByCategory(category)
            .then(posts =>
                dispatch(ActionCreators.receivePosts(posts, category)))
    }
}

export function upVotePost(id) {
    return dispatch => {
        dispatch(ActionCreators.upVotePost(id))
        return ReadableAPI.upVotePostById(id)
            .then(post =>
                dispatch(ActionCreators.receiveUpdatedPost(post)))
    }
}

export function downVotePost(id) {
    return dispatch => {
        dispatch(ActionCreators.downVotePost(id))
        return ReadableAPI.downVotePostById(id)
            .then(post =>
                dispatch(ActionCreators.receiveUpdatedPost(post)))
    }
}
