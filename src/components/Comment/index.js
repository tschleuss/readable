import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import { connect } from 'react-redux'
import { upVoteComment, downVoteComment } from '../../actions/actionApi'
import './index.css'

const Comment = props => {
    const { data: comment = {}, upVote, downVote } = props
    return (
        <article className="comment-compact">
            <span className="comment-score-container">
                <button className="comment-score-vote-up" onClick={() => upVote(comment.id)}>
                    <em className="fa fa-arrow-up" aria-hidden="true"></em>
                </button>
                <span className="comment-score">{comment.voteScore}</span>
                <button className="comment-score-vote-down" onClick={() => downVote(comment.id)}>
                    <em className="fa fa-arrow-down" aria-hidden="true"></em>
                </button>
            </span>
            <div className="comment-body">{comment.body}</div>
            <div className="comment-metadata">
                <span className="comment-author">by {comment.author}</span>
                <span>&nbsp;|&nbsp;</span>
                <span className="comment-time">
                    <TimeAgo date={comment.timestamp} />
                </span>
            </div>
        </article>
    )
}

Comment.propTypes = {
    data: PropTypes.object.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    upVote: id => dispatch(upVoteComment(id)),
    downVote: id => dispatch(downVoteComment(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
