import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/actionApi'
import PostList from '../../components/PostList'
import Select from 'react-select';
import PropTypes from 'prop-types'
import 'react-select/dist/react-select.css';
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
        let { category, posts } = this.props
        category = category === 'home' ? '' : category
        return (
            <div>
                <nav className="page-nav">
                    <div className="page-nav-options">
                        <Link className="page-nav-link" to={`${category}/submit`}>new text post</Link>
                        <Select className="page-nav-sort" 
                                name="sort"
                                placeholder="Show first..."
                                onChange={(selectedOption) => { console.log(selectedOption) }}
                                options={[
                                    { value: 'date_desc', label: 'New ones' },
                                    { value: 'date_asc', label: 'Old ones' },
                                    { value: 'score_desc', label: 'High scores' },
                                    { value: 'score_asc', label: 'Low scores' },
                                ]}/>
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
