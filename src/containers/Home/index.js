import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories, getPosts } from '../../actions/actionApi'
import Forum from '../Forum'
import PropTypes from 'prop-types'
import './index.css'
import 'font-awesome/css/font-awesome.min.css'

class Home extends Component {

    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        const { categories, category } = this.props
        return (
            <div className="root">
                <header className="main-header">
                    <nav className="main-nav">
                        <NavLink to="/home" className="nav-item" activeClassName="active">Home</NavLink>
                        {categories.map(categorie => (
                            <NavLink key={categorie.name} to={`/${categorie.name}`} className="nav-item" activeClassName="active">{categorie.name}</NavLink>
                        ))}
                    </nav>
                </header>
                <nav className="page-nav">
                    <div className="page-nav-options">
                        <a className="page-nav-link disabled" href="/html/">&lt;&nbsp;prev</a>
                        <span>1/23</span>
                        <a className="page-nav-link" href="/html/">more&nbsp;&gt;</a>
                    </div>
                    <div className="page-nav-sort"></div>
                </nav>
                <main className="page-main">
                    <Route path="/:category" render={() => (
                        <Forum category={category} />
                    )} />
                </main>
            </div>
        )
    }
}

Home.propTypes = {
    getCategories: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired
}

const mapStateToProps = state => {
    const { posts, categories } = state
    return {
        posts: posts.items,
        categories: categories.items
    }
}

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    getPosts: category => dispatch(getPosts(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
