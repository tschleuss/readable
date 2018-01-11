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

    componentDidMount() {
        this.mTextArea.focus()
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    render() {
        const { onSave, onCancel } = this.props
        const { value } = this.state
        return (
            <div className="edit-textarea-container">
                <textarea 
                    ref={input => { this.mTextArea = input }} 
                    className="edit-textarea" 
                    value={value} 
                    onChange={this.handleChange}>
                </textarea>
                <div className="edit-textarea-actions">
                    <button onClick={() => onSave(value)} className="edit-textarea-action">save</button>
                    <button onClick={() => onCancel()} className="edit-textarea-action">cancel</button>
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
