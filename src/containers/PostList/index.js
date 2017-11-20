import React, { Component } from 'react';
import './index.css';

const PostList = ({ posts = [], match }) => (
    <ul className="post-list">
        {posts.map(post => (
            <li key={post.id}>
                <article className="post-compact">
                    <span className="post-score-container">
                        <button className="post-score-vote-up">
                            <em className="fa fa-arrow-up" aria-hidden="true"></em>
                        </button>
                        <span className="post-score">{post.voteScore}</span>
                        <button className="post-score-vote-down">
                            <em className="fa fa-arrow-down" aria-hidden="true"></em>
                        </button>
                    </span>
                    <a className="post-title" href="/">{post.title}</a>
                    <div className="post-metadata">
                        <span className="post-author">by {match.params.category}</span>
                        <span>&nbsp;|&nbsp;</span>
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
);

export default PostList;
