import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPostById, getCommentsByPostId } from '../../actions/actionApi'
import PropTypes from 'prop-types'
import Post from '../Post'
import CommentList from '../CommentList'
import './index.css'

class Topic extends Component {

    componentWillMount() {
        this.props.getPostById(this.props.id)
        this.props.getCommentsByPostId(this.props.id)
    }

    getPost(id) {
        return this.props.posts.find(post => post.id === id)
    }

    render() {
        const { id, comments } = this.props
        const post = this.getPost(id)
        return (
            <div className="topic">
                {post && <Post data={post} />}
                {comments && <CommentList comments={comments}/>}
            </div>
        )
    }
}

Topic.propTypes = {
    id: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    getPostById: PropTypes.func.isRequired,
    getCommentsByPostId: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    const { posts, comments } = state
    return {
        posts: posts.items,
        comments: comments.items
    }
}

const mapDispatchToProps = dispatch => ({
    getPostById: id => dispatch(getPostById(id)),
    getCommentsByPostId: id => dispatch(getCommentsByPostId(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Topic)
