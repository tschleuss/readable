import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { toast } from 'react-toastify'
import {
    getPostById,
    upVotePost,
    downVotePost,
    editPost,
    deletePostById,
    getCommentsByPostId,
    addComment,
    upVoteComment,
    downVoteComment,
    editComment,
    deleteCommentById,
    getCommentById
} from '../../actions/actionApi'
import { sortComments } from '../../actions/actionCreators'
import { commentComparator } from '../../utils/sortHelper'
import PropTypes from 'prop-types'
import Select from 'react-select'
import Post from '../../components/Post'
import CommentList from '../../components/CommentList'
import 'react-select/dist/react-select.css'
import './index.css'

class Topic extends Component {

    componentWillMount() {
        this.updatePostAndComments()
    }

    updatePostAndComments() {
        this.props.getPostById(this.props.id)
        this.props.getCommentsByPostId(this.props.id)
    }

    getPost(id) {
        return this.props.posts.find(post => post.id === id)
    }

    sortCommentsBy(sortType) {
        const value = sortType ? sortType.value : null
        this.props.sortComments(value)
    }

    onPostChange(post) {
        this.props.editPost(post)
            .then(() => toast.success(`Post edited successfully`))
    }

    onPostDeleted(post) {
        this.props.deletePostById(post.id)
            .then(() => {
                toast.success(`Post deleted successfully`)
                this.props.goToCategoryPage(post.category)
            })
    }

    onUpVotePost(post) {
        this.props.upVotePost(post.id)
    }

    onDownVotePost(post) {
        this.props.downVotePost(post.id)
    }

    onCommentChange(comment) {
        this.props.editComment(comment)
            .then(() => toast.success(`Comment edited successfully`))
    }

    onAddComment(comment) {
        const { id: parentId } = this.props
        this.props.addComment({ ...comment, parentId })
            .then(() => toast.success(`Comment created successfully`))
    }

    onUpVoteComment(comment) {
        this.props.upVoteComment(comment.id)
    }

    onDownVoteComment(comment) {
        this.props.downVoteComment(comment.id)
    }

    onCommentDeleted(comment) {
        this.props.deleteCommentById(comment.id)
            .then(() => toast.success(`Comment deleted successfully`))
    }

    render() {
        const { id, comments } = this.props
        const post = this.getPost(id)
        return (
            <div>
                <nav className="page-nav">
                    <div className="page-nav-options">
                        {post && (
                            <Select className="page-nav-sort" 
                                name="sort"
                                value={this.props.sortBy}
                                placeholder="Show first..."
                                onChange={selected => this.sortCommentsBy(selected)}
                                options={this.props.sortTypes}/>
                        )}
                    </div>
                </nav>
                <main className="page-main">
                    <div className="topic">
                        {!post && (
                            <h1 className="post-not-found">Post not found!</h1>
                        )}
                        {post && 
                            <Post data={post} 
                                onChange={post => this.onPostChange(post)}
                                onRemove={post => this.onPostDeleted(post)}
                                onUpVote={post => this.onUpVotePost(post)}
                                onDownVote={post => this.onDownVotePost(post)}
                                onAddComment={comment => this.onAddComment(comment)}/>
                        }
                        {post && comments.length > 0 && 
                            <CommentList comments={comments} 
                                onChange={comment => this.onCommentChange(comment)}
                                onRemove={comment => this.onCommentDeleted(comment)}
                                onUpVote={comment => this.onUpVoteComment(comment)}
                                onDownVote={comment => this.onDownVoteComment(comment)}/>
                        }
                    </div>
                </main>
            </div>
        )
    }
}

Topic.propTypes = {

    // Values
    id: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    sortTypes: PropTypes.array.isRequired,
    sortBy: PropTypes.string,

    // Posts functions
    upVotePost: PropTypes.func,
    downVotePost: PropTypes.func,
    editPost: PropTypes.func,
    deletePostById: PropTypes.func,
    addComment: PropTypes.func,
    getPostById: PropTypes.func,
    goToCategoryPage: PropTypes.func,

    // Comments functions
    getCommentsByPostId: PropTypes.func,
    sortComments: PropTypes.func,
    upVoteComment: PropTypes.func,
    downVoteComment: PropTypes.func,
    editComment: PropTypes.func,
    deleteCommentById: PropTypes.func,
    getCommentById: PropTypes.func
}

const mapStateToProps = state => {
    const { posts, comments, parameters } = state
    return {
        posts: posts.items,
        comments: Array.from(comments.items).sort(commentComparator(comments.sortBy)),
        sortBy: comments.sortBy,
        sortTypes: parameters.sortTypes
    }
}

const mapDispatchToProps = dispatch => ({

    // Posts functions
    upVotePost: id => dispatch(upVotePost(id)),
    downVotePost: id => dispatch(downVotePost(id)),
    editPost: post => dispatch(editPost(post)),
    deletePostById: id => dispatch(deletePostById(id)),
    addComment: comment => dispatch(addComment(comment)),
    getPostById: id => dispatch(getPostById(id)),
    goToCategoryPage: category => dispatch(push(`/${category}`)),

    // Comments functions
    getCommentsByPostId: id => dispatch(getCommentsByPostId(id)),
    sortComments: sortType => dispatch(sortComments(sortType)),
    upVoteComment: id => dispatch(upVoteComment(id)),
    downVoteComment: id => dispatch(downVoteComment(id)),
    editComment: comment => dispatch(editComment(comment)),
    deleteCommentById: id => dispatch(deleteCommentById(id)),
    getCommentById: id => dispatch(getCommentById(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Topic)
