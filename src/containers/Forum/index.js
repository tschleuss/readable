import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/actionApi'
import PostList from '../../components/PostList'
import PropTypes from 'prop-types'
import './index.css'

class Forum extends Component {

    componentWillMount() {
        this.fetchPosts(this.props.category)
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
        const { posts } = this.props
        return (
            <div>
                <nav className="page-nav">
                    <div className="page-nav-options">
                        <Link className="page-nav-link" to="/submit">new text post</Link>
                    </div>
                </nav>
                <main className="page-main">
                    <PostList posts={posts} />
                </main>
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
