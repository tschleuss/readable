import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upVoteComment, downVoteComment, editComment, deleteCommentById } from '../../actions/actionApi'
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

    handleBodyChange(value) {
        const { data: comment = {} } = this.props
        this.props.editComment({ id: comment.id, body: value })
        this.cancelBodyChange()
    }

    cancelBodyChange() {
        this.setState({ editMode: false })
    }

    render() {

        const { data: comment = {}, upVote, downVote } = this.props
        const { editMode } = this.state

        return (
            <article className="comment-container">
                <span className="comment-score-container">
                    <button className="comment-score-vote-up" onClick={() => upVote(comment.id)}>
                        <em className="fa fa-arrow-up" aria-hidden="true"></em>
                    </button>
                    <span className="comment-score">{comment.voteScore}</span>
                    <button className="comment-score-vote-down" onClick={() => downVote(comment.id)}>
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
                    <a href="javascript:void(0);" className="comment-action" onClick={() => this.toggleEditMode()}>edit</a>
                    <span>&nbsp;|&nbsp;</span>
                    <a href="javascript:void(0);" className="comment-action" onClick={() => {}}>delete</a>
                </div>
            </article>
        )
    }
}

Comment.propTypes = {
    data: PropTypes.object.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    upVote: id => dispatch(upVoteComment(id)),
    downVote: id => dispatch(downVoteComment(id)),
    editComment: comment => dispatch(editComment(comment)),
    deleteCommentById: id => dispatch(deleteCommentById(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
