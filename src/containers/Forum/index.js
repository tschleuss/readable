import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getPosts, upVotePost, downVotePost, deletePostById } from '../../actions/actionApi'
import { sortPosts } from '../../actions/actionCreators'
import { simpleSortComparator } from '../../utils/sortHelper'
import { toast } from 'react-toastify'
import PostList from '../../components/PostList'
import Select from 'react-select'
import PropTypes from 'prop-types'
import 'react-select/dist/react-select.css'
import './index.css'

class Forum extends Component {

    componentDidMount() {
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
        this.props.sortPosts(sortType)
    }

    onUpVote(post) {
        this.props.upVotePost(post.id)
    }

    onDownVote(post) {
        this.props.downVotePost(post.id)
    }

    onClickEdit(post) {
        this.props.goToPost(post.category, post.id, { editMode: true })
    }

    onClickDelete(post) {
        this.props.deletePostById(post.id)
            .then(() => toast.success(`Post deleted successfully`))
    }

    onClickReply(post) {
        this.props.goToPost(post.category, post.id, { replyMode: true })
    }

    render() {
        let { category = '', posts } = this.props
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
                           onUpVote={post => this.onUpVote(post)}
                           onDownVote={post => this.onDownVote(post)}
                           onClickEdit={post => this.onClickEdit(post)}
                           onClickDelete={post => this.onClickDelete(post)}
                           onClickReply={post => this.onClickReply(post)}/>
                </main>
            </div>
        )
    }
}

Forum.propTypes = {

    // Values
    posts: PropTypes.array.isRequired,
    sortTypes: PropTypes.array.isRequired,
    category: PropTypes.string,
    sortBy: PropTypes.object,

    // Posts functions
    getPosts: PropTypes.func.isRequired,
    upVotePost: PropTypes.func,
    downVotePost: PropTypes.func,
    sortPosts: PropTypes.func.isRequired,
    goToPost: PropTypes.func.isRequired,
    deletePostById: PropTypes.func.isRequired
}

const mapStateToProps = ({ posts, parameters }) => ({
    posts: Array.from(posts.items).sort(simpleSortComparator(posts.sortBy)),
    sortBy: posts.sortBy,
    sortTypes: parameters.sortTypes
})

const mapDispatchToProps = dispatch => ({
    getPosts: category => dispatch(getPosts(category)),
    sortPosts: sortType => dispatch(sortPosts(sortType)),
    upVotePost: id => dispatch(upVotePost(id)),
    downVotePost: id => dispatch(downVotePost(id)),
    deletePostById: id => dispatch(deletePostById(id)),
    goToPost: (category, id, params) => dispatch(push(`/${category}/${id}`, params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Forum)
