import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories } from '../../actions/actionApi'
import { ToastContainer } from 'react-toastify'
import Forum from '../Forum'
import Topic from '../Topic'
import Submit from '../Submit'
import PropTypes from 'prop-types'
import 'font-awesome/css/font-awesome.min.css'
import './index.css'

class Home extends Component {

    componentWillMount() {
        this.props.getCategories()
    }

    render() {
        const { categories } = this.props
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
                <Switch>
                    <Route exact path="/submit" render={({match}) => (
                        <Submit />
                    )} />
                    <Route exact path="/:category/submit" render={({match}) => (
                        <Submit />
                    )} />
                    <Route exact path="/:category" render={({match}) => (
                        <Forum category={match.params.category}/>
                    )} />
                    <Route exact path="/:category/:postId" render={({match}) => (
                        <Topic id={match.params.postId}/>
                    )} />
                </Switch>
                <ToastContainer
                    position="bottom-left"
                    hideProgressBar={true}
                    newestOnTop={true}/>
            </div>
        )
    }
}

Home.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    const { categories } = state
    return {
        categories: categories.items
    }
}

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
