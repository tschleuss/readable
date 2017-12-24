import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories } from '../../actions/actionApi'
import PostList from '../PostList'
import PropTypes from 'prop-types'
import './index.css'
import 'font-awesome/css/font-awesome.min.css'

class App extends Component {

    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        const { posts, categories } = this.props
        return (
            <div className="root">
                <header className="main-header">
                    <nav className="main-nav">
                        <NavLink to="/home" className="nav-item" activeClassName="active">Home</NavLink>
                        {categories.map(categorie => (
                            <NavLink key={categorie.name} to={'/' + categorie.name} className="nav-item" activeClassName="active">{categorie.name}</NavLink>
                        ))}
                    </nav>
                </header>
                <nav className="page-nav">
                    <div className="page-nav-options">
                        <a className="page-nav-link disabled" href="/html/">&lt;&nbsp;prev</a>
                        <span>1/23</span>
                        <a className="page-nav-link" href="/html/">more&nbsp;&gt;</a>
                    </div>
                    <div className="page-nav-sort">
                        
                    </div>
                </nav>
                <main className="page-main">
                    <Route path="/:category" render={({match}) => (
                        <PostList posts={posts} match={match} />
                    )} />
                </main>
            </div>
        )
    }
}

App.propTypes = {
    getCategories: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    const { posts, categories } = state
    return {
        posts: posts.items,
        categories: categories.items
    }
}

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
