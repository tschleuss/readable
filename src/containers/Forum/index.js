import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts, upVotePost, downVotePost } from '../../actions/actionApi'
import { sortPosts } from '../../actions/actionCreators'
import { postComparator } from '../../utils/sortHelper'
import PostList from '../../components/PostList'
import Select from 'react-select'
import PropTypes from 'prop-types'
import 'react-select/dist/react-select.css'
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

    sortPostsBy(sortType) {
        const value = sortType ? sortType.value : null
        this.props.sortPosts(value)
    }

    onUpVotePost(post) {
        this.props.upVotePost(post.id)
    }

    onDownVotePost(post) {
        this.props.downVotePost(post.id)
    }

    render() {
        let { category, posts } = this.props
        category = category === 'home' ? '' : category
        return (
            <div>
                <nav className="page-nav">
                    <div className="page-nav-options">
                        <Link className="page-nav-link" to={`${category}/submit`}>new text post</Link>
                        <Select className="page-nav-sort" 
                                name="sort"
                                value={this.props.sortBy}
                                placeholder="Show first..."
                                onChange={selected => this.sortPostsBy(selected)}
                                options={this.props.sortTypes}/>
                    </div>
                </nav>
                <main className="page-main">
                    <PostList posts={posts} 
                           onUpVote={post => this.onUpVotePost(post)}
                           onDownVote={post => this.onDownVotePost(post)}/>
                </main>
            </div>
        )
    }
}

Forum.propTypes = {

    // Values
    posts: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    sortTypes: PropTypes.array.isRequired,
    sortBy: PropTypes.string,

    // Posts functions
    getPosts: PropTypes.func.isRequired,
    upVotePost: PropTypes.func,
    downVotePost: PropTypes.func,
    sortPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { posts, parameters } = state
    return {
        posts: Array.from(posts.items).sort(postComparator(posts.sortBy)),
        sortBy: posts.sortBy,
        sortTypes: parameters.sortTypes
    }
}

const mapDispatchToProps = dispatch => ({
    getPosts: category => dispatch(getPosts(category)),
    sortPosts: sortType => dispatch(sortPosts(sortType)),
    upVotePost: id => dispatch(upVotePost(id)),
    downVotePost: id => dispatch(downVotePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Forum)
