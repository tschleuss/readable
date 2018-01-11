import React from 'react'
import PropTypes from 'prop-types'
import Post from '../Post'
import './index.css'

const PostList = props => {
    const noop = () => {}
    const { posts = [], onChange = noop, onRemove = noop, onUpVote = noop, onDownVote = noop, onAddComment = noop } = props
    return (
        <ul className="post-list">
            {posts.length === 0 && (
                <h1 className="no-posts">No posts yet!</h1>
            )}
            {posts.map(post => (
                <li key={post.id}>
                    <Post data={post} 
                        compact={true} 
                        onChange={onChange} 
                        onRemove={onRemove}
                        onUpVote={onUpVote}
                        onDownVote={onDownVote}
                        onAddComment={onAddComment}/>
                </li>
            ))}
        </ul>
    )
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    onUpVote: PropTypes.func,
    onDownVote: PropTypes.func,
    onAddComment: PropTypes.func
}

export default PostList
