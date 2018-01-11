import React from 'react'
import PropTypes from 'prop-types'
import Post from '../Post'
import './index.css'

const PostList = props => {
    const noop = () => {}
    const {
        onChange = noop,
            onUpVote = noop,
            onDownVote = noop,
            onAddComment = noop,
            onClickEdit = noop,
            onClickDelete = noop,
            onClickReply = noop,
            posts = []
    } = props
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
                        onUpVote={onUpVote}
                        onDownVote={onDownVote}
                        onAddComment={onAddComment}
                        onClickEdit={onClickEdit}
                        onClickDelete={onClickDelete}
                        onClickReply={onClickReply}/>
                </li>
            ))}
        </ul>
    )
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onUpVote: PropTypes.func,
    onDownVote: PropTypes.func,
    onAddComment: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickReply: PropTypes.func
}

export default PostList
