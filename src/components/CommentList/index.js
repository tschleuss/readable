import React from 'react'
import PropTypes from 'prop-types'
import Comment from '../Comment'
import './index.css'

const CommentList = props => {
    const noop = () => {}
    const { comments = [], onChange = noop, onRemove = noop, onUpVote = noop, onDownVote = noop } = props
    return (
        <ul className="comment-list">
            {comments.map(comment => (
                <li key={comment.id}>
                    <Comment data={comment} 
                        onChange={onChange} 
                        onRemove={onRemove}
                        onUpVote={onUpVote}
                        onDownVote={onDownVote}/>
                </li>
            ))}
        </ul>
    )
}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    onUpVote: PropTypes.func,
    onDownVote: PropTypes.func
}

export default CommentList
