import * as ActionTypes from './actionTypes'

export const getPosts = () =>
    ({ type: ActionTypes.GET_POSTS })

export const getPostById = id =>
    ({ type: ActionTypes.GET_POST_BY_ID, id })

export const getPostsByCategory = category =>
    ({ type: ActionTypes.GET_POSTS_BY_CATEGORY, category })

export const receivePosts = (posts, category = null) =>
    ({ type: ActionTypes.RECEIVE_POSTS, category, posts, receivedAt: Date.now() })

export const getCategories = () =>
    ({ type: ActionTypes.GET_CATEGORIES })

export const receiveCategories = categories =>
    ({ type: ActionTypes.RECEIVE_CATEGORIES, categories, receivedAt: Date.now() })

export const upVotePost = id =>
    ({ type: ActionTypes.UP_VOTE_POST, id })

export const downVotePost = id =>
    ({ type: ActionTypes.DOWN_VOTE_POST, id })

export const receiveUpdatedPost = post =>
    ({ type: ActionTypes.RECEIVE_UPDATED_POST, post })

export const getCommentsByPostId = id =>
    ({ type: ActionTypes.GET_COMMENTS_BY_POST_ID, id })

export const receiveComments = comments =>
    ({ type: ActionTypes.RECEIVE_COMMENTS, comments, receivedAt: Date.now() })

export const upVoteComment = id =>
    ({ type: ActionTypes.UP_VOTE_COMMENT, id })

export const downVoteComment = id =>
    ({ type: ActionTypes.DOWN_VOTE_COMMENT, id })

export const receiveUpdatedComment = comment =>
    ({ type: ActionTypes.RECEIVE_UPDATED_COMMENT, comment })
