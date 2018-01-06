import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import './index.css'

const PostList = ({ posts = [] }) => (
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
                        <span className="post-author">by {post.author}</span>
                        <span>&nbsp;|&nbsp;</span>
                        <span className="post-time">
                            <TimeAgo date={post.timestamp} />
                        </span>
                        <span>&nbsp;|&nbsp;</span>
                        <span className="post-comments">
                            <a href="/">{post.commentCount} comments</a>
                        </span>
                    </div>
                </article>
            </li>
        ))}
    </ul>
)

PostList.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList
