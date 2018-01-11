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
        const { editMode = false, replyMode = false } = props
        this.state = { editMode, replyMode }
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.cancelBodyChange = this.cancelBodyChange.bind(this)
    }

    handleBodyChange(value) {
        const { onChange, data: post } = this.props
        onChange({ ...post, body: value })
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

    onClickEdit() {
        const { onClickEdit: outerCallback = () => {}, data: post } = this.props
        this.setState({ editMode: true })
        outerCallback(post)
    }

    onClickDelete() {
        const { onClickDelete: outerCallback = () => {}, data: post } = this.props
        outerCallback(post)
    }

    onClickReply() {
        const { onClickReply: outerCallback = () => {}, data: post } = this.props
        this.setState({ replyMode: true })
        outerCallback(post)
    }

    render() {

        const { data: post = {}, compact = false, onUpVote, onDownVote, onClickDelete } = this.props
        const { editMode, replyMode } = this.state

        const containerClass = classNames({
            'post-container': true,
            'compact': compact
        })

        return (
            <div>
                <article className={containerClass}>
                    <span className="post-score-container">
                        <button className="post-score-vote-up" onClick={() => onUpVote(post)}>
                            <em className="fa fa-arrow-up" aria-hidden="true"></em>
                        </button>
                        <span className="post-score">{post.voteScore}</span>
                        <button className="post-score-vote-down" onClick={() => onDownVote(post)}>
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
                        <button className="post-action" onClick={() => this.onClickEdit()}>edit</button>
                        <span>&nbsp;|&nbsp;</span>
                        <button className="post-action" onClick={() => onClickDelete(post)}>delete</button>
                        <span>&nbsp;|&nbsp;</span>
                        <button className="post-action" onClick={() => this.onClickReply()}>reply</button>
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
    onUpVote: PropTypes.func.isRequired,
    onDownVote: PropTypes.func.isRequired,
    onAddComment: PropTypes.func.isRequired,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickReply: PropTypes.func,
    compact: PropTypes.bool,
    editMode: PropTypes.bool,
    replyMode: PropTypes.bool
}

export default Post
