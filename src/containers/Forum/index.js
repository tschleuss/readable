import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/actionApi'
import PostList from '../PostList'
import PropTypes from 'prop-types'

class Forum extends Component {

    componentWillMount() {
        this.fetchPosts(this.props.category);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.category !== nextProps.category) {
            this.fetchPosts(nextProps.category)
        }
    }

    fetchPosts(category) {
        this.props.getPosts(category)
    }

    render() {
        const { posts, category } = this.props
        return (
            <div>
                <PostList posts={posts} />
            </div>
        )
    }
}

Forum.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired
}

const mapStateToProps = state => {
    const { posts } = state
    return {
        posts: posts.items
    }
}

const mapDispatchToProps = dispatch => ({
    getPosts: category => dispatch(getPosts(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(Forum)
