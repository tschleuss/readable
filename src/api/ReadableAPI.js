import { apiHost, apiToken } from '../config'

const headers = {
    'Accept': 'application/json',
    'Authorization': apiToken
}

/**
 * Get all of the categories. 
 */
export const getCategories = () =>
    fetch(`${apiHost}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

/**
 * Get all posts for a category.
 * @param {String} category Category name.
 */
export const getPostsByCategory = category =>
    fetch(`${apiHost}/${category}/posts`, { headers })
    .then(res => res.json())

/**
 * Get all posts.
 */
export const getPosts = () =>
    fetch(`${apiHost}/posts`, { headers })
    .then(res => res.json())

/**
 * Insert a new post.
 * @param {Object} post Post model.
 */
export const addPost = post =>
    fetch(`${apiHost}/posts`, {
        method: 'POST',
        headers,
        body: JSON.stringify(post)
    })
    .then(res => res.json())
    .then(data => data)

/**
 * Get a post model by your id.
 * @param {String} id Post unique id.
 */
export const getPostsById = id =>
    fetch(`${apiHost}/posts/${id}`, { headers })
    .then(res => res.json())

/**
 * Vote in a post. It can be a up vote or a down vote.
 * @param {String} id Post unique id.
 * @param {String} option Specify it it is a up vote or a down vote.
 */
export const votePostById = (id, option) =>
    fetch(`${apiHost}/posts/${id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ option })
    })
    .then(res => res.json())

/**
 * Up vote a post.
 * @param {String} id Post unique id.
 */
export const upVotePostById = id =>
    votePostById(id, 'upVote')

/**
 * Down vote a post.
 * @param {String} id Post unique id.
 */
export const downVotePostById = id =>
    votePostById(id, 'downVote')

/**
 * Update a post content.
 * @param {Object} post Post model.
 */
export const editPost = post =>
    fetch(`${apiHost}/posts/${post.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(post)
    })
    .then(res => res.json())

/**
 * Delete a post by it's id.
 * @param {String} id Post unique id.
 */
export const deletePostById = id =>
    fetch(`${apiHost}/posts/${id}`, {
        method: 'DELETE',
        headers
    })
    .then(res => res.json())

/**
 * Get all comments for a post id.
 * @param {String} id Post unique id.
 */
export const getCommentsByPostId = id =>
    fetch(`${apiHost}/posts/${id}/comments`, { headers })
    .then(res => res.json())

/**
 * Insert a new comment.
 * @param {Object} comment Comment model.
 */
export const addComment = comment =>
    fetch(`${apiHost}/comments/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(comment)
    })
    .then(res => res.json())

/**
 * Get a comment model by your id.
 * @param {String} id Comment unique id.
 */
export const getCommentById = id =>
    fetch(`${apiHost}/comments/${id}`, { headers })
    .then(res => res.json())

/**
 * Vote in a comment. It can be a up vote or a down vote.
 * @param {String} id Comment unique id.
 * @param {String} option Specify it it is a up vote or a down vote.
 */
export const voteCommnetById = (id, option) =>
    fetch(`${apiHost}/comments/${id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ option })
    })
    .then(res => res.json())

/**
 * Up vote a comment.
 * @param {String} id Comment unique id.
 */
export const upVoteCommentById = id =>
    voteCommnetById(id, 'upVote')

/**
 * Down vote a comment.
 * @param {String} id Comment unique id.
 */
export const downVoteCommentById = id =>
    voteCommnetById(id, 'downVote')

/**
 * Update a comment content.
 * @param {Object} comment Comment model.
 */
export const editComment = comment =>
    fetch(`${apiHost}/comments/${comment.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(comment)
    })
    .then(res => res.json())

/**
 * Delete a comment by it's id.
 * @param {String} id Comment unique id.
 */
export const deleteCommentById = id =>
    fetch(`${apiHost}/comments/${id}`, {
        method: 'DELETE',
        headers
    })
    .then(res => res.json())
