import React from 'react'
import PropTypes from 'prop-types'
import Comment from '../Comment'
import './index.css'

const CommentList = ({ comments = [] }) => (
    <ul className="comment-list">
        {comments.map(comment => (
            <li key={comment.id}>
                <Comment data={comment} />
            </li>
        ))}
    </ul>
)

CommentList.propTypes = {
    comments: PropTypes.array.isRequired
}

export default CommentList
