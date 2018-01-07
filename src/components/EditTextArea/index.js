import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

class EditTextArea extends Component {

    constructor(props) {
        super(props)
        this.state = { value: this.props.text }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    render() {
        return (
            <div className="edit-textarea-container">
                <textarea className="edit-textarea" value={this.state.value} onChange={this.handleChange}></textarea>
                <div className="edit-textarea-actions">
                    <button onClick={() => this.props.onSave(this.state.value)} className="edit-textarea-action">save</button>
                    <button onClick={() => this.props.onCancel()} className="edit-textarea-action">cancel</button>
                </div>
            </div>
        )
    }
}

EditTextArea.propTypes = {
    text: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

export default EditTextArea
