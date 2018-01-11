import * as ActionTypes from './actionTypes'

/** Posts */

export const getPosts = () =>
    ({ type: ActionTypes.GET_POSTS })

export const getPostById = id =>
    ({ type: ActionTypes.GET_POST_BY_ID, id })

export const getPostsByCategory = category =>
    ({ type: ActionTypes.GET_POSTS_BY_CATEGORY, category })

export const receivePosts = (posts, category = null) =>
    ({ type: ActionTypes.RECEIVE_POSTS, category, posts, receivedAt: Date.now() })

export const upVotePost = id =>
    ({ type: ActionTypes.UP_VOTE_POST, id })

export const downVotePost = id =>
    ({ type: ActionTypes.DOWN_VOTE_POST, id })

export const editPost = post =>
    ({ type: ActionTypes.EDIT_POST, post })

export const deletePostById = id =>
    ({ type: ActionTypes.DELETE_POST_BY_ID, id })

export const postDeleted = id =>
    ({ type: ActionTypes.POST_DELETED, id })

export const postEdited = post =>
    ({ type: ActionTypes.POST_EDITED, post })

export const addPost = post =>
    ({ type: ActionTypes.ADD_POST, post })

export const postCreated = post =>
    ({ type: ActionTypes.POST_CREATED, post })

export const sortPosts = sortBy =>
    ({ type: ActionTypes.SORT_POSTS, sortBy })

/** Categories */

export const getCategories = () =>
    ({ type: ActionTypes.GET_CATEGORIES })

export const receiveCategories = categories =>
    ({ type: ActionTypes.RECEIVE_CATEGORIES, categories, receivedAt: Date.now() })

export const saveCategory = category =>
    ({ type: ActionTypes.SAVE_CATEGORY, category })

/** Comments */

export const getCommentsByPostId = id =>
    ({ type: ActionTypes.GET_COMMENTS_BY_POST_ID, id })

export const getCommentById = id =>
    ({ type: ActionTypes.GET_COMMENTS_BY_ID, id })

export const receiveComments = comments =>
    ({ type: ActionTypes.RECEIVE_COMMENTS, comments, receivedAt: Date.now() })

export const upVoteComment = id =>
    ({ type: ActionTypes.UP_VOTE_COMMENT, id })

export const downVoteComment = id =>
    ({ type: ActionTypes.DOWN_VOTE_COMMENT, id })

export const editComment = comment =>
    ({ type: ActionTypes.EDIT_COMMENT, comment })

export const deleteCommentById = id =>
    ({ type: ActionTypes.DELETE_COMMENT_BY_ID, id })

export const commentDeleted = id =>
    ({ type: ActionTypes.COMMENT_DELETED, id })

export const commentEdited = comment =>
    ({ type: ActionTypes.COMMENT_EDITED, comment })

export const addComment = comment =>
    ({ type: ActionTypes.ADD_COMMENT, comment })

export const commentCreated = comment =>
    ({ type: ActionTypes.COMMENT_CREATED, comment })

export const sortComments = sortBy =>
    ({ type: ActionTypes.SORT_COMMENTS, sortBy })
