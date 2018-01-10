import React, { Component } from 'react'
import { toast } from 'react-toastify'
import uniqid from 'uniqid'
import PropTypes from 'prop-types'
import './index.css'

class Reply extends Component {

    constructor(props) {
        super(props)
        this.state = { body: '', author: '' }
    }

    onSave() {
        const { body, author } = this.state
        if (body && author) {
            const id = uniqid()
            const timestamp = Date.now()
            this.props.onSave({id, timestamp, body, author})
        } else {
            toast.error(`Some fields are missing`)
        }
    }

    onCancel() {
        this.props.onCancel()
    }

    render() {
        return (
            <div className="reply-topic">
                <article className="reply-container">
                    <span className="reply-body">
                        <label className="reply-label">text</label>
                        <textarea name="body" 
                                    className="reply-body-textarea" 
                                    rows="3" 
                                    value={this.state.body} 
                                    onChange={event => this.setState({ body: event.target.value })}/>
                    </span>
                    <span className="reply-author">
                        <label className="reply-label">author</label>
                        <input type="text" 
                                name="author" 
                                className="reply-title-input" 
                                value={this.state.author} 
                                onChange={event => this.setState({ author: event.target.value })}/>
                    </span>
                    <div className="reply-actions">
                        <button onClick={() => this.onSave()} className="edit-textarea-action">comment</button>
                        <button onClick={() => this.onCancel()} className="edit-textarea-action">cancel</button>
                    </div>
                </article>
            </div>
        )
    }
}

Reply.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

export default Reply
