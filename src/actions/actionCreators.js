import * as ActionTypes from './actionTypes'

export const getPosts = () =>
    ({ type: ActionTypes.GET_POSTS })

export const getPostsByCategory = category =>
    ({ type: ActionTypes.GET_POSTS_BY_CATEGORY, category })

export const receivePosts = (category, posts) =>
    ({ type: ActionTypes.RECEIVE_POSTS, category, posts, receivedAt: Date.now() })

export const getCategories = () =>
    ({ type: ActionTypes.GET_CATEGORIES })

export const receiveCategories = categories =>
    ({ type: ActionTypes.RECEIVE_CATEGORIES, categories, receivedAt: Date.now() })
