import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import { connect } from 'react-redux'
import { upVotePost, downVotePost } from '../../actions/actionApi'
import './index.css'

const Post = props => {
    const { data: post = {}, upVote, downVote } = props
    return (
        <article className="post-compact">
            <span className="post-score-container">
                <button className="post-score-vote-up" onClick={() => upVote(post.id)}>
                    <em className="fa fa-arrow-up" aria-hidden="true"></em>
                </button>
                <span className="post-score">{post.voteScore}</span>
                <button className="post-score-vote-down" onClick={() => downVote(post.id)}>
                    <em className="fa fa-arrow-down" aria-hidden="true"></em>
                </button>
            </span>
            <Link to={`/${post.category}/${post.id}`} className="post-title">{post.title}</Link>
            <div className="post-metadata">
                <span className="post-author">by {post.author}</span>
                <span>&nbsp;|&nbsp;</span>
                <span className="post-time">
                    <TimeAgo date={post.timestamp} />
                </span>
                <span>&nbsp;|&nbsp;</span>
                <span className="post-comments">
                    <Link to={`/${post.category}/${post.id}`}>{post.commentCount} comments</Link>
                </span>
            </div>
        </article>
    )
}

Post.propTypes = {
    data: PropTypes.object.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    upVote: id => dispatch(upVotePost(id)),
    downVote: id => dispatch(downVotePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
