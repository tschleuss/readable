import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import * as ReadableAPI from '../../api/ReadableAPI';
import PostList from '../PostList'
import './index.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {

    state = {
        categories: [],
        posts: []
    }

    componentDidMount = () => {
        ReadableAPI.getPosts().then(posts => {
            console.log(posts);
            this.setState({ posts })
        });
        ReadableAPI.getCategories().then(categories => {
            console.log(categories);
            this.setState({ categories })
        });
    }

    render() {
        const { posts, categories } = this.state;
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
        );
    }
}

export default App;
