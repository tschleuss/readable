import React, { Component } from 'react';
import * as ReadableAPI from '../../api/ReadableAPI';
import './index.css';

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
                        {categories.map(categorie => (
                            <a key={categorie.name} className="nav-item active" href="/html/">{categorie.name}</a>
                        ))}
                    </nav>
                </header>
                <nav className="page-nav">
                    <a className="page-nav-link disabled" href="/html/">&lt;&nbsp;prev</a>
                    <span>1/23</span>
                    <a className="page-nav-link" href="/html/">more&nbsp;&gt;</a>
                </nav>
                <main className="page-main">
                    <ul className="post-list">
                        {posts.map(post => (
                            <li key={post.id}>
                                <article className="post-compact">
                                    <span className="post-score">{post.voteScore}</span>
                                    <a className="post-title" href="/">{post.title}</a>
                                    <div className="post-metadata">
                                        <span className="post-time">2 hour ago</span>
                                        <span>&nbsp;|&nbsp;</span>
                                        <span className="post-comments">
                                            <a href="/">{post.commentCount} comments</a>
                                        </span>
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        );
    }
}

export default App;
