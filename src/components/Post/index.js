import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { upVotePost, downVotePost, editPost, deletePostById } from '../../actions/actionApi'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import EditTextArea from '../EditTextArea'
import classNames from 'classnames'
import './index.css'

class Post extends Component {

    constructor(props) {
        super(props)
        this.state = { editMode: false }
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.cancelBodyChange = this.cancelBodyChange.bind(this)
    }

    toggleEditMode() {
        this.setState({ editMode: true })
    }

    handleBodyChange(value) {
        const { data: post = {} } = this.props
        this.props.editPost({ id: post.id, body: value })
        this.cancelBodyChange()
    }

    cancelBodyChange() {
        this.setState({ editMode: false })
    }

    render() {

        const { data: post = {}, compact = false, upVote, downVote } = this.props
        const { editMode } = this.state
        const containerClass = classNames({
            'post-container': true,
            'compact': compact
        })

        return (
            <article className={containerClass}>
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
                {!compact && (
                    <div className="post-actions">
                        <a href="javascript:void(0);" className="post-action" onClick={() => this.toggleEditMode()}>edit</a>
                        <span>&nbsp;|&nbsp;</span>
                        <a href="javascript:void(0);" className="post-action" onClick={() => {}}>delete</a>
                    </div>
                )}
            </article>
        )
    }
}

Post.propTypes = {
    data: PropTypes.object.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    compact: PropTypes.bool
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    upVote: id => dispatch(upVotePost(id)),
    downVote: id => dispatch(downVotePost(id)),
    editPost: post => dispatch(editPost(post)),
    deletePostById: id => dispatch(deletePostById(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
