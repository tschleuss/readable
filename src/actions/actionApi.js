import * as ReadableAPI from '../api/ReadableAPI'
import * as ActionCreators from './actionCreators'

/** Posts */

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

export function getPostById(id) {
    return dispatch => {
        dispatch(ActionCreators.getPostById(id))
        return ReadableAPI.getPostsById(id)
            .then(post =>
                dispatch(ActionCreators.receiveUpdatedPost(post)))
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

export function editPost(post) {
    return dispatch => {
        dispatch(ActionCreators.editPost(post))
        return ReadableAPI.editPost(post)
            .then(post => dispatch(ActionCreators.receiveUpdatedPost(post)))
    }
}

export function deletePostById(id) {
    return dispatch => {
        dispatch(ActionCreators.deletePostById(id))
        return ReadableAPI.deletePostById(id)
            .then(post => dispatch(ActionCreators.receiveUpdatedPost(post)))
    }
}

/** Categories */

export function getCategories() {
    return dispatch => {
        dispatch(ActionCreators.getCategories())
        return ReadableAPI.getCategories()
            .then(categories =>
                dispatch(ActionCreators.receiveCategories(categories)))
    }
}

/** Comments */

export function getCommentsByPostId(id) {
    return dispatch => {
        dispatch(ActionCreators.getCommentsByPostId(id))
        return ReadableAPI.getCommentsByPostId(id)
            .then(comments =>
                dispatch(ActionCreators.receiveComments(comments)))
    }
}

export function upVoteComment(id) {
    return dispatch => {
        dispatch(ActionCreators.upVoteComment(id))
        return ReadableAPI.upVoteCommentById(id)
            .then(comment =>
                dispatch(ActionCreators.receiveUpdatedComment(comment)))
    }
}

export function downVoteComment(id) {
    return dispatch => {
        dispatch(ActionCreators.downVoteComment(id))
        return ReadableAPI.downVoteCommentById(id)
            .then(comment =>
                dispatch(ActionCreators.receiveUpdatedComment(comment)))
    }
}

export function editComment(comment) {
    return dispatch => {
        dispatch(ActionCreators.editComment(comment))
        return ReadableAPI.editComment(comment)
            .then(comment => dispatch(ActionCreators.receiveUpdatedComment(comment)))
    }
}

export function deleteCommentById(id) {
    return dispatch => {
        dispatch(ActionCreators.deleteCommentById(id))
        return ReadableAPI.deleteCommentById(id)
            .then(comment => dispatch(ActionCreators.receiveUpdatedComment(comment)))
    }
}
