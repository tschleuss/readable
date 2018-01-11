import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import EditTextArea from '../EditTextArea'
import Reply from '../Reply'
import classNames from 'classnames'
import './index.css'

class Post extends Component {

    constructor(props) {
        super(props)
        this.state = { editMode: false, replyMode: false }
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.cancelBodyChange = this.cancelBodyChange.bind(this)
    }

    toggleEditMode() {
        this.setState({ editMode: true })
    }

    toggleReplyMode() {
        this.setState({ replyMode: true })
    }

    handleBodyChange(value) {
        this.props.onChange({ ...this.props.data, body: value })
        this.cancelBodyChange()
    }

    cancelBodyChange() {
        this.setState({ editMode: false })
    }

    onSaveComment(comment) {
        this.props.onAddComment(comment)
        this.onCancelComment()
    }

    onCancelComment() {
        this.setState({ replyMode: false })
    }

    render() {

        const { data: post = {}, compact = false } = this.props
        const { editMode, replyMode } = this.state

        const containerClass = classNames({
            'post-container': true,
            'compact': compact
        })

        return (
            <div>
                <article className={containerClass}>
                    <span className="post-score-container">
                        <button className="post-score-vote-up" onClick={() => this.props.onUpVote(post)}>
                            <em className="fa fa-arrow-up" aria-hidden="true"></em>
                        </button>
                        <span className="post-score">{post.voteScore}</span>
                        <button className="post-score-vote-down" onClick={() => this.props.onDownVote(post)}>
                            <em className="fa fa-arrow-down" aria-hidden="true"></em>
                        </button>
                    </span>
                    <Link to={`/${post.category}/${post.id}`} className="post-title">{post.title}</Link>
                    {!compact && !editMode && (
                        <span className="post-body">{post.body}</span>
                    )}
                    {!compact && editMode && (
                        <EditTextArea text={post.body} onSave={this.handleBodyChange} onCancel={this.cancelBodyChange} />
                    )}
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
                    <div className="post-actions">
                        <button className="post-action" onClick={() => this.toggleEditMode()}>edit</button>
                        <span>&nbsp;|&nbsp;</span>
                        <button className="post-action" onClick={() => this.props.onRemove(this.props.data)}>delete</button>
                        <span>&nbsp;|&nbsp;</span>
                        <button className="post-action" onClick={() => this.toggleReplyMode()}>reply</button>
                    </div>
                </article>
                {!compact && replyMode && (
                    <Reply onSave={comment => this.onSaveComment(comment)} 
                           onCancel={() => this.onCancelComment()}/>
                )}
            </div>
        )
    }
}

Post.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpVote: PropTypes.func.isRequired,
    onDownVote: PropTypes.func.isRequired,
    onAddComment: PropTypes.func.isRequired,
    compact: PropTypes.bool
}

export default Post
