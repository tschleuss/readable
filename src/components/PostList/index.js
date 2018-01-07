import React from 'react'
import PropTypes from 'prop-types'
import Post from '../Post'
import './index.css'

const PostList = ({ posts = [] }) => (
    <ul className="post-list">
        {posts.map(post => (
            <li key={post.id}>
                <Post data={post} compact={true} />
            </li>
        ))}
    </ul>
)

PostList.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList
