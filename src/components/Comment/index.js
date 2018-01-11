import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import EditTextArea from '../EditTextArea'
import './index.css'

class Comment extends Component {

    constructor(props) {
        super(props)
        this.state = { editoMode: false }
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.cancelBodyChange = this.cancelBodyChange.bind(this)
    }

    toggleEditMode() {
        this.setState({ editMode: true })
    }

    deleteComment() {
        this.props.onRemove(this.props.data)
        this.cancelBodyChange()
    }

    handleBodyChange(value) {
        this.props.onChange({ ...this.props.data, body: value })
        this.cancelBodyChange()
    }

    cancelBodyChange() {
        this.setState({ editMode: false })
    }

    render() {

        const { data: comment = {} } = this.props
        const { editMode } = this.state

        return (
            <article className="comment-container">
                <span className="comment-score-container">
                    <button className="comment-score-vote-up" onClick={() => this.props.onUpVote(comment)}>
                        <em className="fa fa-arrow-up" aria-hidden="true"></em>
                    </button>
                    <span className="comment-score">{comment.voteScore}</span>
                    <button className="comment-score-vote-down" onClick={() => this.props.onDownVote(comment)}>
                        <em className="fa fa-arrow-down" aria-hidden="true"></em>
                    </button>
                </span>
                {!editMode && (
                    <div className="comment-body">{comment.body}</div>
                )}
                {editMode && (
                    <EditTextArea text={comment.body} onSave={this.handleBodyChange} onCancel={this.cancelBodyChange} />
                )}
                <div className="comment-metadata">
                    <span className="comment-author">by {comment.author}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span className="comment-time">
                        <TimeAgo date={comment.timestamp} />
                    </span>
                </div>
                <div className="comment-actions">
                    <button className="comment-action" onClick={() => this.toggleEditMode()}>edit</button>
                    <span>&nbsp;|&nbsp;</span>
                    <button className="comment-action" onClick={() => this.props.onRemove(this.props.data)}>delete</button>
                </div>
            </article>
        )
    }
}

Comment.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpVote: PropTypes.func.isRequired,
    onDownVote: PropTypes.func.isRequired
}

export default Comment
